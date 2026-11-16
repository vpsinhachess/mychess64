-- MyChess64 — run once in Supabase > SQL Editor
-- Then: Authentication > Providers > Email (enabled). Optional: turn off "Confirm email" while testing.
-- Make yourself admin AFTER you sign up once (any account): 
--   update profiles set role='admin' where email='you@example.com';

create table profiles(
  id uuid primary key references auth.users on delete cascade,
  full_name text, email text,
  role text not null default 'player' check (role in ('player','organiser','admin'))
);

create or replace function is_admin() returns boolean language sql security definer stable set search_path=public as
$$ select exists(select 1 from profiles where id=auth.uid() and role='admin') $$;

-- Sign-up can only ever create 'organiser' or 'player'. Admin is set manually (SQL above).
create or replace function handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into profiles(id,full_name,email,role) values(new.id,new.raw_user_meta_data->>'full_name',new.email,
    case when new.raw_user_meta_data->>'role'='organiser' then 'organiser' else 'player' end);
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function handle_new_user();

create table tournaments(
  id uuid primary key default gen_random_uuid(),
  organiser_id uuid not null default auth.uid() references profiles(id) on delete cascade,
  title text not null check (length(title) between 5 and 200),
  start_date date not null, end_date date not null,
  state text not null, district text not null, venue text,
  format text not null check (format in ('Classical','Rapid','Blitz')),
  entry_fee numeric(10,2) not null default 0 check (entry_fee>=0),
  contact text, brochure_url text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz default now(),
  check (end_date>=start_date)
);

-- Organisers can never approve their own event or change its owner; only admin can.
create or replace function guard_tournament() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if not is_admin() then
    if tg_op='INSERT' then new.status:='pending';
    else new.status:=old.status; new.organiser_id:=old.organiser_id; end if;
  end if;
  return new;
end $$;
create trigger t_guard before insert or update on tournaments for each row execute function guard_tournament();

create table interests(
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references tournaments(id) on delete cascade,
  player_name text not null check (length(trim(player_name))>0),
  phone text not null, email text, fide_id text, category text, note text,
  status text not null default 'interested' check (status in ('interested','contacted','registered','withdrawn')),
  fee_paid numeric(10,2) not null default 0 check (fee_paid>=0),
  created_at timestamptz default now()
);

create table ledger(
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references tournaments(id) on delete cascade,
  kind text not null check (kind in ('income','expense')),
  head text not null, amount numeric(12,2) not null check (amount>0),
  entry_date date not null default current_date, note text,
  created_at timestamptz default now()
);

create or replace function owns(tid uuid) returns boolean language sql security definer stable set search_path=public as
$$ select exists(select 1 from tournaments where id=tid and (organiser_id=auth.uid() or is_admin())) $$;

alter table profiles enable row level security;
alter table tournaments enable row level security;
alter table interests enable row level security;
alter table ledger enable row level security;

create policy p_read on profiles for select using (id=auth.uid() or is_admin());      -- no update policy: nobody can change their own role

create policy t_read on tournaments for select using (status='approved' or organiser_id=auth.uid() or is_admin());
create policy t_ins  on tournaments for insert to authenticated with check (
  organiser_id=auth.uid() and exists(select 1 from profiles where id=auth.uid() and role in ('organiser','admin')));
create policy t_upd  on tournaments for update to authenticated using (organiser_id=auth.uid() or is_admin());
create policy t_del  on tournaments for delete to authenticated using (organiser_id=auth.uid() or is_admin());

-- Players (no login needed) may only ADD an interest for an approved tournament; they cannot read anyone's data.
create policy i_public on interests for insert to anon, authenticated with check (
  status='interested' and fee_paid=0 and exists(select 1 from tournaments where id=tournament_id and status='approved'));
create policy i_owner on interests for all to authenticated using (owns(tournament_id)) with check (owns(tournament_id));

create policy l_owner on ledger for all to authenticated using (owns(tournament_id)) with check (owns(tournament_id));

create index on tournaments(status,end_date);
create index on interests(tournament_id);
create index on ledger(tournament_id);
