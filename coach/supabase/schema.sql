-- =====================================================================
--  MyChess64 – Supabase schema (tables, Row Level Security, storage)
--  Run this whole file once: Supabase dashboard → SQL Editor → New query → Run
--  Safe to re-run.
-- =====================================================================
create extension if not exists pgcrypto;

-- ---------- admins (add your own row by hand, see README) ----------
create table if not exists public.admins (user_id uuid primary key references auth.users(id) on delete cascade);
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as
$$ select exists (select 1 from public.admins where user_id = auth.uid()) $$;

-- ---------- coaches (public profile; id = the coach's auth user id) ----------
create table if not exists public.coaches (
  id uuid primary key default gen_random_uuid(),
  name text not null, title text not null default '', city text default '', mode text default 'Online',
  cats text[] default '{}', price int default 500, exp int default 0, students_count int default 0,
  langs text default 'English', bio text default '', photo_url text default '',
  c1 text default '#0b6bde', c2 text default '#19c3ff', status text default 'active',
  created_at timestamptz default now()
);
create table if not exists public.coach_private (id uuid primary key references public.coaches(id) on delete cascade, email text);

-- ---------- public-facing data ----------
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(), coach_id uuid references public.coaches(id) on delete cascade,
  name text not null, text text not null, stars int default 5, created_at timestamptz default now());
create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(), coach_id uuid not null references public.coaches(id) on delete cascade,
  title text not null, class_date date not null, class_time time not null, dur int default 60, mode text default 'Online',
  cap int default 5, level text default 'Beginner', link text default '', created_at timestamptz default now());
create table if not exists public.availability (
  id uuid primary key default gen_random_uuid(), coach_id uuid not null references public.coaches(id) on delete cascade,
  weekday int not null check (weekday between 0 and 6), start_time time not null, end_time time not null);

-- ---------- visitor submissions ----------
create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(), created_at timestamptz default now(),
  name text not null, phone text not null, cat text, coach_id uuid references public.coaches(id) on delete set null,
  class_id uuid references public.classes(id) on delete set null, slot text, status text default 'new', note text);
create table if not exists public.apps (
  id uuid primary key default gen_random_uuid(), created_at timestamptz default now(),
  name text not null, rating text, email text, city text, status text default 'new');

-- ---------- coach workspace (private to each coach + admin) ----------
create table if not exists public.students (
  id uuid primary key default gen_random_uuid(), coach_id uuid not null references public.coaches(id) on delete cascade,
  name text not null, phone text, email text, age int, level text default 'Beginner', started_on date default current_date,
  notes text, created_at timestamptz default now());
create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(), coach_id uuid not null references public.coaches(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade, session_date date not null,
  status text not null default 'present', note text, unique (student_id, session_date));
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(), coach_id uuid not null references public.coaches(id) on delete cascade,
  student_id uuid references public.students(id) on delete set null, amount numeric(10,2) not null,
  paid_on date default current_date, method text default 'UPI', status text default 'paid', note text);
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(), coach_id uuid not null references public.coaches(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade, report_date date default current_date,
  level text, topics text, strengths text, improve text, homework text);
create table if not exists public.coach_docs (
  id uuid primary key default gen_random_uuid(), coach_id uuid not null references public.coaches(id) on delete cascade,
  title text not null, path text not null, created_at timestamptz default now());

-- seats already booked per class (no personal data) – readable by everyone
create or replace view public.class_booked with (security_invoker = off) as
  select class_id, count(*)::int as n from public.requests where class_id is not null group by class_id;
grant select on public.class_booked to anon, authenticated;

-- ---------- protect fields coaches must not change ----------
create or replace function public.protect_coach() returns trigger language plpgsql security definer set search_path = public as $$
begin if not public.is_admin() then new.status := old.status; new.id := old.id; end if; return new; end $$;
drop trigger if exists trg_protect_coach on public.coaches;
create trigger trg_protect_coach before update on public.coaches for each row execute function public.protect_coach();

create or replace function public.protect_request() returns trigger language plpgsql security definer set search_path = public as $$
declare s text; n text;
begin if not public.is_admin() then s := new.status; n := new.note; new := old; new.status := s; new.note := n; end if; return new; end $$;
drop trigger if exists trg_protect_request on public.requests;
create trigger trg_protect_request before update on public.requests for each row execute function public.protect_request();

-- ---------- Row Level Security ----------
alter table public.admins enable row level security;
alter table public.coaches enable row level security;       alter table public.coach_private enable row level security;
alter table public.reviews enable row level security;       alter table public.classes enable row level security;
alter table public.availability enable row level security;  alter table public.requests enable row level security;
alter table public.apps enable row level security;          alter table public.students enable row level security;
alter table public.attendance enable row level security;    alter table public.payments enable row level security;
alter table public.reports enable row level security;       alter table public.coach_docs enable row level security;

do $$ declare r record; begin
  for r in select policyname, tablename from pg_policies where schemaname = 'public' loop
    execute format('drop policy if exists %I on public.%I', r.policyname, r.tablename);
  end loop; end $$;

create policy admins_self on public.admins for select to authenticated using (user_id = auth.uid());

-- public sees only APPROVED coaches; a coach also sees their own (pending) row; admin sees all
create policy coaches_read   on public.coaches for select to anon, authenticated using (status = 'active' or id = auth.uid() or public.is_admin());
-- coaches may create ONLY their own profile and ONLY as 'pending' (admin approves it later)
create policy coaches_insert on public.coaches for insert to authenticated with check (public.is_admin() or (id = auth.uid() and status = 'pending'));
create policy coaches_update on public.coaches for update to authenticated using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());
create policy coaches_delete on public.coaches for delete to authenticated using (public.is_admin());

create policy cpriv_select on public.coach_private for select to authenticated using (public.is_admin() or id = auth.uid());
create policy cpriv_insert on public.coach_private for insert to authenticated with check (public.is_admin() or id = auth.uid());
create policy cpriv_update on public.coach_private for update to authenticated using (public.is_admin() or id = auth.uid()) with check (public.is_admin() or id = auth.uid());
create policy cpriv_delete on public.coach_private for delete to authenticated using (public.is_admin());

create policy reviews_read  on public.reviews for select to anon, authenticated using (true);
create policy reviews_write on public.reviews for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy classes_read  on public.classes for select to anon, authenticated using (true);
create policy classes_write on public.classes for all to authenticated using (coach_id = auth.uid() or public.is_admin()) with check (coach_id = auth.uid() or public.is_admin());
create policy avail_read    on public.availability for select to anon, authenticated using (true);
create policy avail_write   on public.availability for all to authenticated using (coach_id = auth.uid() or public.is_admin()) with check (coach_id = auth.uid() or public.is_admin());

-- visitors can create requests / applications; only admin (and the chosen coach for requests) can read them
create policy req_insert on public.requests for insert to anon, authenticated
  with check (char_length(name) between 1 and 100 and char_length(phone) between 7 and 20 and status = 'new' and note is null);
create policy req_select on public.requests for select to authenticated using (public.is_admin() or coach_id = auth.uid());
create policy req_update on public.requests for update to authenticated using (public.is_admin() or coach_id = auth.uid()) with check (public.is_admin() or coach_id = auth.uid());
create policy req_delete on public.requests for delete to authenticated using (public.is_admin());

create policy apps_insert on public.apps for insert to anon, authenticated with check (char_length(name) between 1 and 100 and status = 'new');
create policy apps_admin  on public.apps for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy students_own   on public.students   for all to authenticated using (coach_id = auth.uid() or public.is_admin()) with check (coach_id = auth.uid() or public.is_admin());
create policy attendance_own on public.attendance for all to authenticated using (coach_id = auth.uid() or public.is_admin()) with check (coach_id = auth.uid() or public.is_admin());
create policy payments_own   on public.payments   for all to authenticated using (coach_id = auth.uid() or public.is_admin()) with check (coach_id = auth.uid() or public.is_admin());
create policy reports_own    on public.reports    for all to authenticated using (coach_id = auth.uid() or public.is_admin()) with check (coach_id = auth.uid() or public.is_admin());
create policy docs_own       on public.coach_docs for all to authenticated using (coach_id = auth.uid() or public.is_admin()) with check (coach_id = auth.uid() or public.is_admin());

-- ---------- Storage: photos (public) and documents (private) ----------
insert into storage.buckets (id, name, public) values ('coach-photos', 'coach-photos', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('coach-docs', 'coach-docs', false) on conflict (id) do nothing;

drop policy if exists photos_read   on storage.objects; drop policy if exists photos_write  on storage.objects;
drop policy if exists photos_update on storage.objects; drop policy if exists photos_delete on storage.objects;
drop policy if exists docs_read     on storage.objects; drop policy if exists docs_write   on storage.objects; drop policy if exists docs_delete on storage.objects;

create policy photos_read   on storage.objects for select using (bucket_id = 'coach-photos');
create policy photos_write  on storage.objects for insert to authenticated with check (bucket_id = 'coach-photos' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));
create policy photos_update on storage.objects for update to authenticated using (bucket_id = 'coach-photos' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));
create policy photos_delete on storage.objects for delete to authenticated using (bucket_id = 'coach-photos' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));
create policy docs_read     on storage.objects for select to authenticated using (bucket_id = 'coach-docs' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));
create policy docs_write    on storage.objects for insert to authenticated with check (bucket_id = 'coach-docs' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));
create policy docs_delete   on storage.objects for delete to authenticated using (bucket_id = 'coach-docs' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));

-- ---------- Realtime (live dashboards) ----------
do $$ declare t text; begin
  foreach t in array array['coaches','reviews','classes','availability','requests','apps','students','attendance','payments','reports','coach_docs'] loop
    begin execute format('alter publication supabase_realtime add table public.%I', t); exception when others then null; end;
  end loop; end $$;
