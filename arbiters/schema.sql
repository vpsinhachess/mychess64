-- MyChess64 Arbiters: Supabase schema (all objects prefixed arb_ so it can share a project with other apps).
-- Run once in Supabase > SQL Editor. Admins: insert into public.arb_admins(user_id) select id from auth.users where email='you@example.com';

create extension if not exists pgcrypto;

create table if not exists public.arb_arbiters(
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null, email text, phone text,
  fide_id text, title text check (title in ('IA','FA','NA')), title_year int,
  country text, city text,
  years_exp int not null default 0, events_count int not null default 0, norm_events int not null default 0,
  languages text[] not null default '{}', formats text[] not null default '{}',
  roles text[] not null default '{}', software text[] not null default '{}',
  bio text, fee text, availability text not null default 'Available' check (availability in ('Available','Limited')),
  travel_pref text, travel_km int, photo_url text, notify boolean not null default true,
  status text not null default 'pending' check (status in ('pending','approved','rejected','suspended')),
  verified boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());

create table if not exists public.arb_admins(user_id uuid primary key references auth.users(id) on delete cascade);

create or replace function public.arb_is_admin() returns boolean language sql stable security definer set search_path=public as
$$ select exists(select 1 from public.arb_admins where user_id = auth.uid()) $$;

create table if not exists public.arb_availability(
  id uuid primary key default gen_random_uuid(),
  arbiter_id uuid not null references public.arb_arbiters(id) on delete cascade,
  start_date date not null, end_date date not null,
  kind text not null check (kind in ('available','unavailable')), note text,
  created_at timestamptz not null default now());

create table if not exists public.arb_history(
  id uuid primary key default gen_random_uuid(),
  arbiter_id uuid not null references public.arb_arbiters(id) on delete cascade,
  event_name text not null, event_date date, category text, role text,
  norm_event boolean not null default false, participants int,
  created_at timestamptz not null default now());

create table if not exists public.arb_certificates(
  id uuid primary key default gen_random_uuid(),
  arbiter_id uuid not null references public.arb_arbiters(id) on delete cascade,
  name text not null, file_path text not null, created_at timestamptz not null default now());

create table if not exists public.arb_enquiries(
  id uuid primary key default gen_random_uuid(),
  arbiter_id uuid references public.arb_arbiters(id) on delete set null,
  organizer_name text not null, organization text, organizer_email text not null, organizer_phone text,
  event_name text not null, venue text, start_date date, end_date date,
  role text, format text, rounds int, participants int, fide_rated text, norms text,
  remuneration text, travel_lodging text, message text,
  status text not null default 'New' check (status in ('New','Under Discussion','Accepted','Confirmed','Completed','Cancelled','Declined')),
  arbiter_note text, agreed_fee numeric,
  payment_status text not null default 'Pending' check (payment_status in ('Pending','Partial','Paid')),
  review_token uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());

create table if not exists public.arb_reviews(
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid unique references public.arb_enquiries(id) on delete cascade,
  arbiter_id uuid not null references public.arb_arbiters(id) on delete cascade,
  organizer_name text, rating int not null check (rating between 1 and 5), comment text,
  status text not null default 'pending' check (status in ('pending','published','hidden')),
  created_at timestamptz not null default now());

create index if not exists arb_enq_idx on public.arb_enquiries(arbiter_id, status);
create index if not exists arb_rev_idx on public.arb_reviews(arbiter_id, status);

create or replace function public.arb_handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if coalesce(new.raw_user_meta_data->>'role','') <> 'arbiter' then return new; end if;
  insert into public.arb_arbiters(id, full_name, email, fide_id, title, country, city)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)), new.email,
          new.raw_user_meta_data->>'fide_id',
          nullif(new.raw_user_meta_data->>'title',''),
          new.raw_user_meta_data->>'country', new.raw_user_meta_data->>'city')
  on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists arb_on_auth_user_created on auth.users;
create trigger arb_on_auth_user_created after insert on auth.users for each row execute function public.arb_handle_new_user();

create or replace function public.arb_protect_arbiter() returns trigger language plpgsql security definer set search_path=public as $$
begin
  new.updated_at := now();
  if not public.arb_is_admin() then new.status := old.status; new.verified := old.verified; new.email := old.email; end if;
  if new.status <> 'approved' then new.verified := false; end if;
  return new;
end $$;
drop trigger if exists arb_protect_arbiter on public.arb_arbiters;
create trigger arb_protect_arbiter before update on public.arb_arbiters for each row execute function public.arb_protect_arbiter();

create or replace function public.arb_protect_enquiry() returns trigger language plpgsql security definer set search_path=public as $$
begin
  new.updated_at := now();
  if not public.arb_is_admin() then
    new.organizer_name:=old.organizer_name; new.organizer_email:=old.organizer_email; new.organizer_phone:=old.organizer_phone;
    new.organization:=old.organization; new.event_name:=old.event_name; new.venue:=old.venue; new.start_date:=old.start_date;
    new.end_date:=old.end_date; new.role:=old.role; new.format:=old.format; new.rounds:=old.rounds; new.participants:=old.participants;
    new.fide_rated:=old.fide_rated; new.norms:=old.norms; new.remuneration:=old.remuneration; new.travel_lodging:=old.travel_lodging;
    new.message:=old.message; new.arbiter_id:=old.arbiter_id; new.review_token:=old.review_token; new.created_at:=old.created_at;
    if new.status is distinct from old.status then
      if not ((old.status in ('New','Under Discussion') and new.status in ('Under Discussion','Accepted','Declined'))
           or (old.status='Confirmed' and new.status='Completed')
           or (old.status='Accepted' and new.status in ('Under Discussion','Declined'))) then
        raise exception 'Status change from % to % is not allowed', old.status, new.status;
      end if;
    end if;
  end if;
  return new;
end $$;
drop trigger if exists arb_protect_enquiry on public.arb_enquiries;
create trigger arb_protect_enquiry before update on public.arb_enquiries for each row execute function public.arb_protect_enquiry();

alter table public.arb_arbiters enable row level security;
alter table public.arb_admins enable row level security;
alter table public.arb_availability enable row level security;
alter table public.arb_history enable row level security;
alter table public.arb_certificates enable row level security;
alter table public.arb_enquiries enable row level security;
alter table public.arb_reviews enable row level security;

create policy arb_sel on public.arb_arbiters for select to authenticated using (id = auth.uid() or public.arb_is_admin());
create policy arb_upd on public.arb_arbiters for update to authenticated using (id = auth.uid() or public.arb_is_admin()) with check (id = auth.uid() or public.arb_is_admin());
create policy arb_del on public.arb_arbiters for delete to authenticated using (public.arb_is_admin());
create policy adm_sel on public.arb_admins for select to authenticated using (user_id = auth.uid() or public.arb_is_admin());

create policy av_all on public.arb_availability for all to authenticated using (arbiter_id = auth.uid() or public.arb_is_admin()) with check (arbiter_id = auth.uid() or public.arb_is_admin());
create policy hi_all on public.arb_history for all to authenticated using (arbiter_id = auth.uid() or public.arb_is_admin()) with check (arbiter_id = auth.uid() or public.arb_is_admin());
create policy ce_all on public.arb_certificates for all to authenticated using (arbiter_id = auth.uid() or public.arb_is_admin()) with check (arbiter_id = auth.uid() or public.arb_is_admin());

create policy enq_ins on public.arb_enquiries for insert to anon, authenticated with check (status = 'New' and agreed_fee is null and arbiter_note is null);
create policy enq_sel on public.arb_enquiries for select to authenticated using (arbiter_id = auth.uid() or public.arb_is_admin());
create policy enq_upd on public.arb_enquiries for update to authenticated using (arbiter_id = auth.uid() or public.arb_is_admin()) with check (arbiter_id = auth.uid() or public.arb_is_admin());
create policy enq_del on public.arb_enquiries for delete to authenticated using (public.arb_is_admin());

create policy rev_sel on public.arb_reviews for select to authenticated using ((arbiter_id = auth.uid() and status = 'published') or public.arb_is_admin());
create policy rev_upd on public.arb_reviews for update to authenticated using (public.arb_is_admin()) with check (public.arb_is_admin());
create policy rev_del on public.arb_reviews for delete to authenticated using (public.arb_is_admin());

create or replace view public.arb_public_arbiters as
select a.id as uid, a.full_name as n, a.title as t, a.country as c, a.city as ci, a.years_exp as x, a.events_count as ev,
       a.norm_events as nm, a.fide_id as fid, a.languages as lg, a.formats as f, a.roles as r, a.availability as av,
       a.software as sw, a.bio as b, a.fee, a.verified, a.photo_url,
       array(select h.event_name || coalesce(' (' || h.role || ')','') from public.arb_history h where h.arbiter_id = a.id order by h.event_date desc nulls last limit 3) as ev2,
       (select round(avg(r.rating)::numeric,1) from public.arb_reviews r where r.arbiter_id = a.id and r.status='published') as rating,
       (select count(*) from public.arb_reviews r where r.arbiter_id = a.id and r.status='published') as review_count
from public.arb_arbiters a where a.status = 'approved';
grant select on public.arb_public_arbiters to anon, authenticated;

create or replace function public.arb_review_info(t uuid) returns table(event_name text, arbiter_name text, can_review boolean)
language sql security definer set search_path=public as $$
  select e.event_name, a.full_name, (e.status='Completed' and not exists(select 1 from public.arb_reviews r where r.enquiry_id=e.id))
  from public.arb_enquiries e join public.arb_arbiters a on a.id=e.arbiter_id where e.review_token=t $$;
create or replace function public.arb_submit_review(t uuid, stars int, note text, who text) returns void
language plpgsql security definer set search_path=public as $$
begin
  insert into public.arb_reviews(enquiry_id, arbiter_id, organizer_name, rating, comment)
  select e.id, e.arbiter_id, coalesce(nullif(who,''), e.organizer_name), stars, left(note,1500)
  from public.arb_enquiries e where e.review_token=t and e.status='Completed' and e.arbiter_id is not null;
  if not found then raise exception 'This review link is not valid or the event is not completed'; end if;
end $$;
grant execute on function public.arb_review_info(uuid), public.arb_submit_review(uuid,int,text,text), public.arb_is_admin() to anon, authenticated;

insert into storage.buckets(id,name,public) values ('arb-avatars','arb-avatars',true) on conflict do nothing;
insert into storage.buckets(id,name,public) values ('arb-certificates','arb-certificates',false) on conflict do nothing;
create policy arb_av_read on storage.objects for select using (bucket_id='arb-avatars');
create policy arb_av_write on storage.objects for all to authenticated using (bucket_id='arb-avatars' and (storage.foldername(name))[1]=auth.uid()::text) with check (bucket_id='arb-avatars' and (storage.foldername(name))[1]=auth.uid()::text);
create policy arb_ce_rw on storage.objects for all to authenticated using (bucket_id='arb-certificates' and ((storage.foldername(name))[1]=auth.uid()::text or public.arb_is_admin())) with check (bucket_id='arb-certificates' and ((storage.foldername(name))[1]=auth.uid()::text or public.arb_is_admin()));

insert into public.arb_admins(user_id) select user_id from public.admins on conflict do nothing;

-- v2: tournament details, fee management, certificate metadata, become-arbiter for existing accounts
alter table public.arb_arbiters
  add column if not exists fee_per_day numeric, add column if not exists fee_per_event numeric, add column if not exists fee_notes text,
  add column if not exists headline text, add column if not exists achievements text, add column if not exists education text;
alter table public.arb_history
  add column if not exists venue text, add column if not exists end_date date, add column if not exists organizer text,
  add column if not exists fee numeric, add column if not exists received numeric not null default 0, add column if not exists notes text,
  add column if not exists enquiry_id uuid references public.arb_enquiries(id) on delete set null;
alter table public.arb_certificates
  add column if not exists cert_type text, add column if not exists issued_on date, add column if not exists expires_on date;
alter table public.arb_enquiries add column if not exists received_amount numeric not null default 0;

create or replace function public.arb_become_arbiter(p_name text, p_fide text, p_title text, p_country text, p_city text) returns void
language plpgsql security definer set search_path=public as $$
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  insert into public.arb_arbiters(id, full_name, email, fide_id, title, country, city)
  values (auth.uid(), coalesce(nullif(p_name,''),'Arbiter'), (select email from auth.users where id = auth.uid()), p_fide, nullif(p_title,''), p_country, p_city)
  on conflict (id) do nothing;
end $$;
revoke execute on function public.arb_become_arbiter(text,text,text,text,text) from public, anon;
grant execute on function public.arb_become_arbiter(text,text,text,text,text) to authenticated;

create or replace view public.arb_public_arbiters as
select a.id as uid, a.full_name as n, a.title as t, a.country as c, a.city as ci, a.years_exp as x, a.events_count as ev,
       a.norm_events as nm, a.fide_id as fid, a.languages as lg, a.formats as f, a.roles as r, a.availability as av,
       a.software as sw, a.bio as b, a.fee, a.verified, a.photo_url,
       array(select h.event_name || coalesce(' (' || h.role || ')','') from public.arb_history h where h.arbiter_id = a.id order by h.event_date desc nulls last limit 3) as ev2,
       (select round(avg(r.rating)::numeric,1) from public.arb_reviews r where r.arbiter_id = a.id and r.status='published') as rating,
       (select count(*) from public.arb_reviews r where r.arbiter_id = a.id and r.status='published') as review_count,
       a.headline, a.fee_per_day, a.fee_per_event
from public.arb_arbiters a where a.status = 'approved';
