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
