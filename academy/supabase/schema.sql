-- MyChess64 Academy: COMPLETE database setup. Supabase > SQL Editor > paste ALL > Run (once).


-- ============ schema.sql ============
-- MyChess64 Academy: run once in Supabase > SQL Editor (free plan is enough)
create table profiles(id uuid primary key references auth.users on delete cascade,
  name text, role text check(role in('admin','coach','student','parent')) default 'student',
  approved boolean default false, created_at timestamptz default now());
create table batches(id uuid primary key default gen_random_uuid(), coach_id uuid references profiles not null,
  name text not null, level text, schedule text);
create table students(id uuid primary key default gen_random_uuid(), coach_id uuid references profiles not null,
  batch_id uuid references batches on delete set null, name text not null, rating int,
  student_email text, parent_email text, fee_due numeric default 0);
create table attendance(id uuid primary key default gen_random_uuid(), coach_id uuid references profiles not null,
  student_id uuid references students on delete cascade, day date default current_date, present boolean default true);
create table homework(id uuid primary key default gen_random_uuid(), coach_id uuid references profiles not null,
  batch_id uuid references batches, student_id uuid references students, title text not null,
  details text, due date, done boolean default false);
create table fees(id uuid primary key default gen_random_uuid(), coach_id uuid references profiles not null,
  student_id uuid references students on delete cascade, amount numeric, paid_on date default current_date, note text);

create function me() returns text language sql stable security definer as $$ select role from profiles where id=auth.uid() and approved $$;
-- auto profile on signup (role chosen at signup; coaches need admin approval)
create function new_user() returns trigger language plpgsql security definer as $$
begin insert into profiles(id,name,role,approved) values(new.id,new.raw_user_meta_data->>'name',
  case when new.raw_user_meta_data->>'role' in('coach','student','parent') then new.raw_user_meta_data->>'role' else 'student' end,
  coalesce(new.raw_user_meta_data->>'role','student')<>'coach'); return new; end $$;
create trigger on_signup after insert on auth.users for each row execute function new_user();

alter table profiles enable row level security; alter table batches enable row level security;
alter table students enable row level security; alter table attendance enable row level security;
alter table homework enable row level security; alter table fees enable row level security;

create policy p_self on profiles for select using(id=auth.uid() or me()='admin');
create policy p_admin on profiles for update using(me()='admin');
-- COACH WORKSPACE ISOLATION: each coach sees only own rows; admin sees all
create policy b_coach on batches for all using(coach_id=auth.uid() and me()='coach' or me()='admin') with check(coach_id=auth.uid() and me()='coach');
create policy s_coach on students for all using(coach_id=auth.uid() and me()='coach' or me()='admin') with check(coach_id=auth.uid() and me()='coach');
create policy s_family on students for select using(lower(student_email)=lower(auth.jwt()->>'email') or lower(parent_email)=lower(auth.jwt()->>'email'));
create policy a_coach on attendance for all using(coach_id=auth.uid() and me()='coach' or me()='admin') with check(coach_id=auth.uid() and me()='coach');
create policy a_family on attendance for select using(student_id in(select id from students));
create policy h_coach on homework for all using(coach_id=auth.uid() and me()='coach' or me()='admin') with check(coach_id=auth.uid() and me()='coach');
create policy h_family on homework for select using(student_id in(select id from students));
create policy h_done on homework for update using(student_id in(select id from students where lower(student_email)=lower(auth.jwt()->>'email')));
create policy f_coach on fees for all using(coach_id=auth.uid() and me()='coach' or me()='admin') with check(coach_id=auth.uid() and me()='coach');
create policy f_family on fees for select using(student_id in(select id from students));
-- After your own signup, make yourself admin:
-- update profiles set role='admin', approved=true where id=(select id from auth.users where email='YOU@EMAIL.COM');


-- ============ schema_v2.sql ============
-- Run AFTER schema.sql (Supabase > SQL Editor). Adds schedule + parent messages; fees become Academy-managed.
create table classes(id uuid primary key default gen_random_uuid(), coach_id uuid references profiles not null,
  batch_id uuid references batches on delete cascade, title text, day date, time text, link text);
create table messages(id uuid primary key default gen_random_uuid(), coach_id uuid references profiles not null,
  student_id uuid references students on delete cascade, kind text, body text, file_url text, created_at timestamptz default now());
alter table classes enable row level security; alter table messages enable row level security;
create policy c_coach on classes for all using(coach_id=auth.uid() and me()='coach' or me()='admin') with check(coach_id=auth.uid() and me()='coach');
create policy c_family on classes for select using(batch_id in(select batch_id from students));
create policy m_coach on messages for all using(coach_id=auth.uid() and me()='coach' or me()='admin') with check(coach_id=auth.uid() and me()='coach');
create policy m_family on messages for select using(student_id in(select id from students));
-- Fees: students pay the ACADEMY. Admin records payments; coaches can only view their students' fees.
drop policy f_coach on fees;
create policy f_coach_read on fees for select using(coach_id=auth.uid() and me()='coach');
create policy f_admin on fees for all using(me()='admin') with check(me()='admin');
create policy s_admin on students for all using(me()='admin') with check(me()='admin');


-- ============ schema_v3.sql ============
-- Run AFTER schema.sql and schema_v2.sql. Admin tools: suspend, assign, parents, invites, activity log.
alter table profiles add column phone text, add column suspended boolean default false;
create or replace function me() returns text language sql stable security definer as $$
  select role from profiles where id=auth.uid() and approved and not coalesce(suspended,false) $$;
alter table students add column phone text, add column parent_name text, add column parent_phone text,
  add column approved boolean default true, add column suspended boolean default false;
alter table students alter column coach_id drop not null;
alter table classes add column status text default 'scheduled';
create table parents(id uuid primary key default gen_random_uuid(), name text not null, phone text, email text,
  coach_id uuid references profiles, approved boolean default true, suspended boolean default false);
create table invites(email text primary key, name text, role text, phone text);
create table activity_log(id uuid primary key default gen_random_uuid(), actor_id uuid, actor_name text,
  action text, entity text, detail text, at timestamptz default now());
alter table parents enable row level security; alter table invites enable row level security; alter table activity_log enable row level security;
create policy pa_admin on parents for all using(me()='admin') with check(me()='admin');
create policy pa_coach on parents for select using(coach_id=auth.uid() and me()='coach');
create policy inv_admin on invites for all using(me()='admin') with check(me()='admin');
create policy log_ins on activity_log for insert with check(actor_id=auth.uid());
create policy log_read on activity_log for select using(me()='admin' or actor_id=auth.uid());
create policy p_admin_del on profiles for delete using(me()='admin');
-- suspended/unapproved students lose family access
drop policy s_family on students;
create policy s_family on students for select using(approved and not coalesce(suspended,false) and
  (lower(student_email)=lower(auth.jwt()->>'email') or lower(parent_email)=lower(auth.jwt()->>'email')));
-- invited coaches are auto-approved when they sign up with the invited email
create or replace function new_user() returns trigger language plpgsql security definer as $$
declare i invites; r text;
begin select * into i from invites where lower(email)=lower(new.email);
  r:=coalesce(i.role, case when new.raw_user_meta_data->>'role' in('coach','student','parent') then new.raw_user_meta_data->>'role' else 'student' end);
  insert into profiles(id,name,role,approved,phone) values(new.id,coalesce(i.name,new.raw_user_meta_data->>'name'),r,
    i.email is not null or r<>'coach', i.phone);
  return new; end $$;


-- ============ schema_v4.sql ============
-- Run AFTER schema.sql, v2, v3. Fee ledger: invoices + payments. Balance is CALCULATED (billed - paid), never typed in.
create table invoices(id uuid primary key default gen_random_uuid(), student_id uuid references students on delete cascade not null,
  coach_id uuid references profiles, description text, amount numeric not null check(amount>0), due_date date, created_at timestamptz default now());
alter table fees add column method text, add column receipt_no text;
alter table fees alter column coach_id drop not null;
alter table fees add constraint fees_amt_pos check(amount>0);
alter table invoices enable row level security;
create policy i_admin on invoices for all using(me()='admin') with check(me()='admin');
-- Anyone who can see a student (that coach, the student, the parent, admin) can see that student's fees: one source of truth.
create policy i_view on invoices for select using(student_id in(select id from students));
drop policy if exists f_coach_read on fees; drop policy if exists f_family on fees;
create policy f_view on fees for select using(student_id in(select id from students));
-- Only the admin can create/change/delete invoices and payments (policy f_admin from v2). Coaches are read-only.


-- ============ schema_v5.sql ============
-- Run AFTER v1-v4. Coach payouts: pay basis per coach + payout records (coaches see only their own).
alter table profiles add column pay_mode text default 'percent' check(pay_mode in('percent','class')), add column pay_rate numeric default 0;
create table payouts(id uuid primary key default gen_random_uuid(), coach_id uuid references profiles not null,
  month text not null, amount numeric not null check(amount>0), method text, paid_on date default current_date, note text, ref_no text);
alter table payouts enable row level security;
create policy po_admin on payouts for all using(me()='admin') with check(me()='admin');
create policy po_coach on payouts for select using(coach_id=auth.uid() and me()='coach');
-- Coaches already read their own profile (pay_mode / pay_rate) through policy p_self.


-- ============ schema_v6.sql ============
-- Run AFTER v1-v5. Adds payout option 3 (fixed per month), effective-from month and a note shown to the coach.
alter table profiles drop constraint if exists profiles_pay_mode_check;
alter table profiles add constraint profiles_pay_mode_check check(pay_mode in('percent','class','month'));
alter table profiles add column pay_from text, add column pay_note text;
