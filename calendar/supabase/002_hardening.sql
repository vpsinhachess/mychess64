-- Run AFTER schema.sql (safe to run more than once).

-- 1) Editing an approved/rejected event now sends it back to "pending" so organisers cannot
--    get a harmless event approved and then rewrite it. Only admin edits keep the status.
create or replace function guard_tournament() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if not is_admin() then
    if tg_op='INSERT' then
      new.status:='pending';
    else
      new.organiser_id:=old.organiser_id;
      if (to_jsonb(new)-'status') is distinct from (to_jsonb(old)-'status') then new.status:='pending';
      else new.status:=old.status; end if;
    end if;
  end if;
  return new;
end $$;

-- 2) One interest per phone number per tournament (stops duplicate / spam submissions).
create unique index if not exists interests_dup on interests(tournament_id, regexp_replace(phone,'\D','','g'));

-- 3) Input limits enforced in the database (NOT VALID = existing rows are not re-checked).
alter table interests drop constraint if exists i_limits,
  add constraint i_limits check (
    phone ~ '^[0-9+ \-]{7,15}$' and length(player_name)<=100 and length(coalesce(note,''))<=400
    and length(coalesce(email,''))<=120 and length(coalesce(fide_id,''))<=20 and length(coalesce(category,''))<=30) not valid;
alter table tournaments drop constraint if exists t_limits,
  add constraint t_limits check (
    length(state)<=60 and length(district)<=80 and length(coalesce(venue,''))<=200
    and length(coalesce(contact,''))<=30 and length(coalesce(brochure_url,''))<=500
    and (brochure_url is null or brochure_url='' or brochure_url ~* '^https?://')) not valid;
alter table ledger drop constraint if exists l_limits,
  add constraint l_limits check (length(head)<=80 and length(coalesce(note,''))<=200) not valid;

-- 4) Faster dashboards.
create index if not exists tournaments_org on tournaments(organiser_id);
