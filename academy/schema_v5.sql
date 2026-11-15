-- Run AFTER v1-v4. Coach payouts: pay basis per coach + payout records (coaches see only their own).
alter table profiles add column pay_mode text default 'percent' check(pay_mode in('percent','class')), add column pay_rate numeric default 0;
create table payouts(id uuid primary key default gen_random_uuid(), coach_id uuid references profiles not null,
  month text not null, amount numeric not null check(amount>0), method text, paid_on date default current_date, note text, ref_no text);
alter table payouts enable row level security;
create policy po_admin on payouts for all using(me()='admin') with check(me()='admin');
create policy po_coach on payouts for select using(coach_id=auth.uid() and me()='coach');
-- Coaches already read their own profile (pay_mode / pay_rate) through policy p_self.
