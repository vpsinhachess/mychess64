-- =====================================================================
-- MyChess64 Community: Supabase schema, security rules and realtime.
-- Run this whole file once in: Supabase Dashboard > SQL Editor > New query.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------- PROFILES (one per signed-in user) ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Member' check (char_length(display_name) between 1 and 32),
  role text not null default 'member' check (role in ('member', 'moderator', 'admin')),
  created_at timestamptz not null default now()
);

-- Create a profile automatically when someone signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, left(coalesce(nullif(new.raw_user_meta_data->>'display_name', ''), split_part(new.email, '@', 1), 'Member'), 32))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- True when the current user is a moderator or admin.
create or replace function public.is_mod()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role in ('moderator', 'admin'));
$$;

-- ---------- CLUBS ----------
create table if not exists public.clubs (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 60),
  description text not null default '' check (char_length(description) <= 200),
  owner_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.club_members (
  club_id uuid not null references public.clubs(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (club_id, user_id)
);

-- ---------- DISCUSSIONS ----------
create table if not exists public.threads (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 120),
  body text not null check (char_length(body) between 1 and 5000),
  category text not null,
  level text not null default 'Any level',
  club_id uuid references public.clubs(id) on delete set null,
  author_id uuid references public.profiles(id) on delete set null,
  pinned boolean not null default false,
  locked boolean not null default false,
  reply_count integer not null default 0,
  upvotes integer not null default 0,
  created_at timestamptz not null default now(),
  last_activity timestamptz not null default now()
);

create table if not exists public.replies (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.threads(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  author_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);
alter table public.replies replica identity full;   -- lets realtime filter DELETE events too

create table if not exists public.votes (
  thread_id uuid not null references public.threads(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (thread_id, user_id)
);

create table if not exists public.reactions (
  target_type text not null check (target_type in ('thread', 'reply')),
  target_id uuid not null,
  user_id uuid not null references public.profiles(id) on delete cascade,
  kind text not null check (kind in ('great', 'insight', 'solved', 'fire')),
  created_at timestamptz not null default now(),
  primary key (target_type, target_id, user_id, kind)
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  target_type text not null check (target_type in ('thread', 'reply')),
  target_id uuid not null,
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  reason text not null default '' check (char_length(reason) <= 300),
  resolved boolean not null default false,
  created_at timestamptz not null default now(),
  unique (target_type, target_id, reporter_id)
);

-- ---------- COUNTERS (kept by the database, so they are never wrong) ----------
create or replace function public.on_reply_change()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    update public.threads set reply_count = reply_count + 1, last_activity = now() where id = new.thread_id;
    return new;
  elsif tg_op = 'DELETE' then
    update public.threads set reply_count = greatest(reply_count - 1, 0) where id = old.thread_id;
    return old;
  end if;
  return null;
end $$;

drop trigger if exists replies_count_trg on public.replies;
create trigger replies_count_trg after insert or delete on public.replies
  for each row execute function public.on_reply_change();

create or replace function public.on_vote_change()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    update public.threads set upvotes = upvotes + 1 where id = new.thread_id;
    return new;
  elsif tg_op = 'DELETE' then
    update public.threads set upvotes = greatest(upvotes - 1, 0) where id = old.thread_id;
    return old;
  end if;
  return null;
end $$;

drop trigger if exists votes_count_trg on public.votes;
create trigger votes_count_trg after insert or delete on public.votes
  for each row execute function public.on_vote_change();

-- ---------- MODERATOR ACTIONS (pin / lock) ----------
create or replace function public.mod_set_thread(p_id uuid, p_pinned boolean, p_locked boolean)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_mod() then
    raise exception 'Only moderators can pin or lock discussions';
  end if;
  update public.threads set pinned = p_pinned, locked = p_locked where id = p_id;
end $$;

-- ---------- ROW LEVEL SECURITY ----------
alter table public.profiles enable row level security;
alter table public.clubs enable row level security;
alter table public.club_members enable row level security;
alter table public.threads enable row level security;
alter table public.replies enable row level security;
alter table public.votes enable row level security;
alter table public.reactions enable row level security;
alter table public.reports enable row level security;

-- Column-level locks: users can only change the fields they own.
revoke update on public.profiles from anon, authenticated;
grant update (display_name) on public.profiles to authenticated;
revoke update on public.threads from anon, authenticated;
grant update (title, body, category, level) on public.threads to authenticated;

-- profiles
create policy "profiles are public" on public.profiles for select using (true);
create policy "edit own name" on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

-- clubs
create policy "clubs are public" on public.clubs for select using (true);
create policy "create clubs as yourself" on public.clubs for insert to authenticated
  with check (owner_id = auth.uid());
create policy "owners and mods manage clubs" on public.clubs for update to authenticated
  using (owner_id = auth.uid() or public.is_mod()) with check (owner_id = auth.uid() or public.is_mod());
create policy "owners and mods delete clubs" on public.clubs for delete to authenticated
  using (owner_id = auth.uid() or public.is_mod());

create policy "memberships are public" on public.club_members for select using (true);
create policy "join clubs as yourself" on public.club_members for insert to authenticated
  with check (user_id = auth.uid());
create policy "leave clubs as yourself" on public.club_members for delete to authenticated
  using (user_id = auth.uid());

-- threads
create policy "threads are public" on public.threads for select using (true);
create policy "post threads as yourself" on public.threads for insert to authenticated
  with check (author_id = auth.uid() and pinned = false and locked = false and reply_count = 0 and upvotes = 0);
create policy "authors edit own threads" on public.threads for update to authenticated
  using (author_id = auth.uid()) with check (author_id = auth.uid());
create policy "authors and mods delete threads" on public.threads for delete to authenticated
  using (author_id = auth.uid() or public.is_mod());

-- replies (no editing; locked threads accept replies only from moderators)
create policy "replies are public" on public.replies for select using (true);
create policy "reply as yourself" on public.replies for insert to authenticated
  with check (author_id = auth.uid() and exists (
    select 1 from public.threads t where t.id = thread_id and (not t.locked or public.is_mod())));
create policy "authors and mods delete replies" on public.replies for delete to authenticated
  using (author_id = auth.uid() or public.is_mod());

-- votes and reactions (one per person per item)
create policy "votes are public" on public.votes for select using (true);
create policy "vote as yourself" on public.votes for insert to authenticated with check (user_id = auth.uid());
create policy "remove your vote" on public.votes for delete to authenticated using (user_id = auth.uid());

create policy "reactions are public" on public.reactions for select using (true);
create policy "react as yourself" on public.reactions for insert to authenticated with check (user_id = auth.uid());
create policy "remove your reaction" on public.reactions for delete to authenticated using (user_id = auth.uid());

-- reports (reporters see their own, moderators see all and resolve them)
create policy "report as yourself" on public.reports for insert to authenticated with check (reporter_id = auth.uid());
create policy "read own reports or all if mod" on public.reports for select to authenticated
  using (reporter_id = auth.uid() or public.is_mod());
create policy "mods resolve reports" on public.reports for update to authenticated
  using (public.is_mod()) with check (public.is_mod());

-- ---------- REALTIME (live updates in the browser) ----------
alter publication supabase_realtime add table public.threads, public.replies, public.clubs,
  public.club_members, public.votes, public.reactions, public.reports, public.profiles;

-- ---------- AFTER YOUR FIRST SIGN-IN ----------
-- Make yourself the site admin (replace the UUID with yours from Authentication > Users):
-- update public.profiles set role = 'admin' where id = 'YOUR-USER-UUID';
