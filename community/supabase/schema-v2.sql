-- =====================================================================
-- MyChess64 Community: v2 migration. Run AFTER supabase/schema.sql.
-- Adds: editing your own posts and replies, notifications, @mentions.
-- =====================================================================

-- ---------- EDITING ----------
alter table public.threads add column if not exists edited_at timestamptz;
alter table public.replies add column if not exists edited_at timestamptz;

create policy "authors edit own replies" on public.replies for update to authenticated
  using (author_id = auth.uid()) with check (author_id = auth.uid());

revoke update on public.replies from anon, authenticated;
grant update (body, edited_at) on public.replies to authenticated;
grant update (title, body, category, level, edited_at) on public.threads to authenticated;

-- ---------- NOTIFICATIONS ----------
create table if not exists public.notifications (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  kind text not null check (kind in ('mention', 'reply')),
  thread_id uuid not null references public.threads(id) on delete cascade,
  reply_id uuid references public.replies(id) on delete cascade,
  title text not null default '',
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists notifications_user_idx on public.notifications (user_id, created_at desc);

alter table public.notifications enable row level security;
create policy "read own notifications" on public.notifications for select to authenticated
  using (user_id = auth.uid());
create policy "mark own notifications read" on public.notifications for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "clear own notifications" on public.notifications for delete to authenticated
  using (user_id = auth.uid());
revoke update on public.notifications from anon, authenticated;
grant update (is_read) on public.notifications to authenticated;

-- Notifications are created only by these triggers (never by the browser).
create or replace function public.notify_on_reply()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  t_title text; t_author uuid; mention_name text; target uuid; mentioned uuid[] := '{}';
begin
  select title, author_id into t_title, t_author from public.threads where id = new.thread_id;

  for mention_name in select distinct lower(m[1]) from regexp_matches(new.body, '@([A-Za-z0-9_]{1,32})', 'g') as m loop
    for target in select p.id from public.profiles p
      where lower(p.display_name) = mention_name and p.id <> new.author_id loop
      insert into public.notifications (user_id, actor_id, kind, thread_id, reply_id, title)
      values (target, new.author_id, 'mention', new.thread_id, new.id, t_title);
      mentioned := mentioned || target;
    end loop;
  end loop;

  if t_author is not null and t_author <> new.author_id and not (t_author = any (mentioned)) then
    insert into public.notifications (user_id, actor_id, kind, thread_id, reply_id, title)
    values (t_author, new.author_id, 'reply', new.thread_id, new.id, t_title);
  end if;
  return new;
end $$;

create or replace function public.notify_on_thread()
returns trigger language plpgsql security definer set search_path = public as $$
declare mention_name text; target uuid;
begin
  for mention_name in select distinct lower(m[1]) from regexp_matches(new.body, '@([A-Za-z0-9_]{1,32})', 'g') as m loop
    for target in select p.id from public.profiles p
      where lower(p.display_name) = mention_name and p.id <> new.author_id loop
      insert into public.notifications (user_id, actor_id, kind, thread_id, reply_id, title)
      values (target, new.author_id, 'mention', new.id, null, new.title);
    end loop;
  end loop;
  return new;
end $$;

drop trigger if exists notify_reply_trg on public.replies;
create trigger notify_reply_trg after insert on public.replies
  for each row execute function public.notify_on_reply();

drop trigger if exists notify_thread_trg on public.threads;
create trigger notify_thread_trg after insert on public.threads
  for each row execute function public.notify_on_thread();

-- Live notifications in the browser
alter publication supabase_realtime add table public.notifications;
