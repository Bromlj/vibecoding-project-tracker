-- Run once in the SQL editor of your own free Supabase project.
-- No service-role/secret key is needed by the browser application.

create or replace function public.valid_tracker_state(data jsonb)
returns boolean language plpgsql immutable set search_path = '' as $$
declare member jsonb; board jsonb; task jsonb; milestone jsonb; attempt jsonb;
begin
  if jsonb_typeof(data) is distinct from 'object' or data->'schemaVersion' is distinct from '2'::jsonb
    or jsonb_typeof(data->'name') is distinct from 'string'
    or length(btrim(coalesce(data->>'name',''))) not between 1 and 100
    or jsonb_typeof(data->'selectedBoardId') is distinct from 'string'
    or coalesce(data->>'palette','') not in ('default','violet','forest')
    or (data ? 'cardPalette' and coalesce(data->>'cardPalette','') not in ('traffic','blue','mono'))
    or jsonb_typeof(data->'members') is distinct from 'array'
    or jsonb_typeof(data->'boards') is distinct from 'array'
    or octet_length(data::text)>4194304 then return false; end if;
  if jsonb_array_length(data->'boards')=0 then return false; end if;
  if (select count(*)<>count(distinct x->>'id') from jsonb_array_elements(data->'members') x)
    or (select count(*)<>count(distinct x->>'id') from jsonb_array_elements(data->'boards') x)
    or (select count(*)<>count(distinct lower(btrim(x->>'name'))) from jsonb_array_elements(data->'boards') x)
    or not exists(select 1 from jsonb_array_elements(data->'boards') b where b->>'id'=data->>'selectedBoardId') then return false; end if;
  for member in select * from jsonb_array_elements(data->'members') loop
    if jsonb_typeof(member->'id') is distinct from 'string' or jsonb_typeof(member->'name') is distinct from 'string' or length(coalesce(member->>'id','')) not between 1 and 100 or length(btrim(coalesce(member->>'name',''))) not between 1 and 100 then return false; end if;
    if jsonb_typeof(member->'email') is distinct from 'string' or length(member->>'email')>254
      or ((member->>'email')<>'' and (member->>'email')!~'^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$') then return false; end if;
    if jsonb_typeof(member->'github') is distinct from 'string' or jsonb_typeof(member->'gitlab') is distinct from 'string'
      or ((member->>'github')<>'' and (member->>'github')!~'^[A-Za-z0-9_][A-Za-z0-9_.-]{0,99}$')
      or ((member->>'gitlab')<>'' and (member->>'gitlab')!~'^[A-Za-z0-9_][A-Za-z0-9_.-]{0,99}$') then return false; end if;
  end loop;
  for board in select * from jsonb_array_elements(data->'boards') loop
    if jsonb_typeof(board->'id') is distinct from 'string' or jsonb_typeof(board->'name') is distinct from 'string' or length(coalesce(board->>'id','')) not between 1 and 100 or length(btrim(coalesce(board->>'name',''))) not between 1 and 100
      or jsonb_typeof(board->'description') is distinct from 'string' or length(board->>'description')>2000
      or jsonb_typeof(board->'tasks') is distinct from 'array' or jsonb_typeof(board->'milestones') is distinct from 'array'
      or jsonb_typeof(board->'anchors') is distinct from 'array' then return false; end if;
    if (select count(*)<>count(distinct x->>'id') from jsonb_array_elements(board->'tasks') x)
      or (select count(*)<>count(distinct x->>'id') from jsonb_array_elements(board->'milestones') x)
      or jsonb_array_length(board->'anchors')<>4
      or (select count(distinct x->>'id')<>4 from jsonb_array_elements(board->'anchors') x) then return false; end if;
    if exists(select 1 from jsonb_array_elements(board->'anchors') a where
      coalesce(a->>'id','') not in ('presentation','demo','report','documentation')
      or a->>'label' is distinct from initcap(a->>'id') or not (a ? 'url')
      or (a->>'url' is not null and (length(a->>'url')>2048 or a->>'url'!~*'^https?://[^/@[:space:]]+([/?#]|$)' or a->>'url'~*'^https?://[^/?#]*@'))) then return false; end if;
    for task in select * from jsonb_array_elements(board->'tasks') loop
      if jsonb_typeof(task->'id') is distinct from 'string' or jsonb_typeof(task->'title') is distinct from 'string' or length(coalesce(task->>'id','')) not between 1 and 100 or length(btrim(coalesce(task->>'title',''))) not between 1 and 160
        or jsonb_typeof(task->'description') is distinct from 'string' or length(task->>'description')>4000
        or jsonb_typeof(task->'context') is distinct from 'string' or length(task->>'context')>30000
        or coalesce(task->>'type','') not in ('feature','bug') or coalesce(task->>'status','') not in ('todo','in-progress','review','done')
        or not (task ? 'assigneeId' and task ? 'dueDate' and task ? 'contextTool' and task ? 'contextUpdatedAt') then return false; end if;
      if task->>'assigneeId' is not null and not exists(select 1 from jsonb_array_elements(data->'members') m where m->>'id'=task->>'assigneeId') then return false; end if;
      if coalesce(task->>'createdDate','')!~'^[0-9]{4}-[0-9]{2}-[0-9]{2}$' then return false; end if;
      perform (task->>'createdDate')::date;
      if task->>'dueDate' is not null then
        if task->>'dueDate'!~'^[0-9]{4}-[0-9]{2}-[0-9]{2}$' then return false; end if;
        perform (task->>'dueDate')::date;
      end if;
      if task->>'contextTool' is not null and task->>'contextTool' not in ('Claude','ChatGPT','Codex','Cursor','Lovable','Replit','Other') then return false; end if;
      if task->>'contextUpdatedAt' is not null then perform (task->>'contextUpdatedAt')::timestamptz; end if;
      -- Optional manual timeline: legacy tasks without attempts remain valid.
      if task ? 'attempts' then
        if jsonb_typeof(task->'attempts') is distinct from 'array' then return false; end if;
        if jsonb_array_length(task->'attempts')>50 or
          (select count(*)<>count(distinct a->>'id') from jsonb_array_elements(task->'attempts') a) then return false; end if;
        for attempt in select * from jsonb_array_elements(task->'attempts') loop
          if jsonb_typeof(attempt->'id') is distinct from 'string' or length(coalesce(attempt->>'id','')) not between 1 and 100
            or jsonb_typeof(attempt->'prompt') is distinct from 'string' or length(btrim(coalesce(attempt->>'prompt','')))=0 or length(attempt->>'prompt')>12000
            or jsonb_typeof(attempt->'outcome') is distinct from 'string' or length(btrim(coalesce(attempt->>'outcome','')))=0 or length(attempt->>'outcome')>4000
            or jsonb_typeof(attempt->'lesson') is distinct from 'string' or length(btrim(coalesce(attempt->>'lesson','')))=0 or length(attempt->>'lesson')>2000
            or coalesce(attempt->>'result','') not in ('worked','partial','failed')
            or not (attempt ? 'tool') or (attempt->>'tool' is not null and attempt->>'tool' not in ('Claude','ChatGPT','Codex','Cursor','Lovable','Replit','Other'))
            or jsonb_typeof(attempt->'includeInBrief') is distinct from 'boolean'
            or (attempt ? 'author' and (jsonb_typeof(attempt->'author') is distinct from 'string' or length(attempt->>'author')>100))
            or jsonb_typeof(attempt->'createdAt') is distinct from 'string' or jsonb_typeof(attempt->'updatedAt') is distinct from 'string' then return false; end if;
          if not isfinite((attempt->>'createdAt')::timestamptz) or not isfinite((attempt->>'updatedAt')::timestamptz)
            or (attempt->>'updatedAt')::timestamptz < (attempt->>'createdAt')::timestamptz then return false; end if;
        end loop;
      end if;
    end loop;
    for milestone in select * from jsonb_array_elements(board->'milestones') loop
      if jsonb_typeof(milestone->'id') is distinct from 'string' or jsonb_typeof(milestone->'title') is distinct from 'string' or jsonb_typeof(milestone->'criterion') is distinct from 'string' or length(coalesce(milestone->>'id','')) not between 1 and 100 or length(btrim(coalesce(milestone->>'title',''))) not between 1 and 160
        or length(btrim(coalesce(milestone->>'criterion',''))) not between 1 and 2000
        or coalesce(milestone->>'status','') not in ('pending','reached') or not (milestone ? 'targetDate' and milestone ? 'reachedAt') then return false; end if;
      if milestone->>'targetDate' is not null then
        if milestone->>'targetDate'!~'^[0-9]{4}-[0-9]{2}-[0-9]{2}$' then return false; end if;
        perform (milestone->>'targetDate')::date;
      end if;
      if milestone->>'status'='reached' then
        if milestone->>'reachedAt' is null then return false; end if;
        perform (milestone->>'reachedAt')::timestamptz;
      elsif milestone->>'reachedAt' is not null then return false;
      end if;
    end loop;
  end loop;
  return true;
exception when others then return false;
end $$;

create table if not exists public.tracker_workspaces (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id),
  state jsonb not null check (public.valid_tracker_state(state)),
  revision bigint not null default 1 check (revision>0),
  updated_at timestamptz not null default now()
);
create table if not exists public.tracker_access (
  workspace_id uuid not null references public.tracker_workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  access_role text not null check (access_role in ('owner','editor')),
  primary key(workspace_id,user_id)
);
create table if not exists public.tracker_invites (
  workspace_id uuid not null references public.tracker_workspaces(id) on delete cascade,
  workspace_name text not null,
  email text not null check (email=lower(btrim(email)) and length(email)<=254),
  primary key(workspace_id,email)
);
create index if not exists tracker_access_user on public.tracker_access(user_id);
create index if not exists tracker_invites_email on public.tracker_invites(email);

alter table public.tracker_workspaces enable row level security;
alter table public.tracker_access enable row level security;
alter table public.tracker_invites enable row level security;
drop policy if exists tracker_access_self on public.tracker_access;
create policy tracker_access_self on public.tracker_access for select to authenticated using (user_id=(select auth.uid()));
drop policy if exists tracker_workspace_read on public.tracker_workspaces;
create policy tracker_workspace_read on public.tracker_workspaces for select to authenticated using (
  exists(select 1 from public.tracker_access a where a.workspace_id=id and a.user_id=(select auth.uid()))
);
drop policy if exists tracker_workspace_edit on public.tracker_workspaces;
create policy tracker_workspace_edit on public.tracker_workspaces for update to authenticated using (
  exists(select 1 from public.tracker_access a where a.workspace_id=id and a.user_id=(select auth.uid()))
) with check (
  exists(select 1 from public.tracker_access a where a.workspace_id=id and a.user_id=(select auth.uid()))
);

create or replace function public.tracker_verified_email()
returns text language sql stable security definer set search_path='' as $$
  select lower(email) from auth.users where id=auth.uid() and email_confirmed_at is not null;
$$;
drop policy if exists tracker_invite_read on public.tracker_invites;
create policy tracker_invite_read on public.tracker_invites for select to authenticated using (
  email=(select public.tracker_verified_email()) or exists(select 1 from public.tracker_workspaces w where w.id=workspace_id and w.owner_id=(select auth.uid()))
);

create or replace function public.tracker_revision_guard()
returns trigger language plpgsql set search_path='' as $$
begin
  if new.owner_id<>old.owner_id or new.id<>old.id or new.revision<>old.revision+1 then
    raise exception 'Invalid workspace revision or owner change';
  end if;
  new.updated_at=now();return new;
end $$;
drop trigger if exists tracker_revision_guard on public.tracker_workspaces;
create trigger tracker_revision_guard before update on public.tracker_workspaces for each row execute function public.tracker_revision_guard();

create or replace function public.create_tracker_workspace(initial_state jsonb)
returns uuid language plpgsql security definer set search_path='' as $$
declare created uuid;
begin
  if auth.uid() is null or public.tracker_verified_email() is null then raise exception 'Sign in with a verified email first' using errcode='42501'; end if;
  insert into public.tracker_workspaces(owner_id,state) values(auth.uid(),initial_state) returning id into created;
  insert into public.tracker_access values(created,auth.uid(),'owner');
  return created;
end $$;

create or replace function public.allow_tracker_email(workspace uuid,member_email text)
returns void language plpgsql security definer set search_path='' as $$
declare label text; address text=lower(btrim(member_email));
begin
  select state->>'name' into label from public.tracker_workspaces where id=workspace and owner_id=auth.uid();
  if label is null then raise exception 'Only the workspace owner can manage access' using errcode='42501'; end if;
  if address is null or length(address)>254 or address!~'^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then raise exception 'Invalid email'; end if;
  insert into public.tracker_invites values(workspace,label,address) on conflict(workspace_id,email) do update set workspace_name=excluded.workspace_name;
end $$;

create or replace function public.join_tracker_workspace(workspace uuid)
returns void language plpgsql security definer set search_path='' as $$
declare address text=public.tracker_verified_email();
begin
  if address is null or not exists(select 1 from public.tracker_invites where workspace_id=workspace and email=address) then raise exception 'This email is not allowed to join' using errcode='42501'; end if;
  insert into public.tracker_access values(workspace,auth.uid(),'editor') on conflict do nothing;
  delete from public.tracker_invites where workspace_id=workspace and email=address;
end $$;

create or replace function public.tracker_workspace_access(workspace uuid)
returns table(user_id uuid,email text,access_role text) language plpgsql stable security definer set search_path='' as $$
begin
  if not exists(select 1 from public.tracker_workspaces where id=workspace and owner_id=auth.uid()) then raise exception 'Only the owner can list sign-in access' using errcode='42501'; end if;
  return query select a.user_id,u.email::text,a.access_role from public.tracker_access a join auth.users u on u.id=a.user_id where a.workspace_id=workspace;
end $$;

create or replace function public.revoke_tracker_access(workspace uuid,member_user uuid)
returns void language plpgsql security definer set search_path='' as $$
begin
  if not exists(select 1 from public.tracker_workspaces where id=workspace and owner_id=auth.uid()) then raise exception 'Only the owner can remove access' using errcode='42501'; end if;
  delete from public.tracker_access where workspace_id=workspace and user_id=member_user and access_role='editor';
end $$;

create or replace function public.remove_tracker_email(workspace uuid,member_email text)
returns void language plpgsql security definer set search_path='' as $$
begin
  if not exists(select 1 from public.tracker_workspaces where id=workspace and owner_id=auth.uid()) then raise exception 'Only the owner can remove allowed emails' using errcode='42501'; end if;
  delete from public.tracker_invites where workspace_id=workspace and email=lower(btrim(member_email));
end $$;

-- Explicit column grants prevent a browser client from changing ownership or IDs.
revoke all on public.tracker_workspaces,public.tracker_access,public.tracker_invites from anon,authenticated;
grant select on public.tracker_workspaces,public.tracker_access,public.tracker_invites to authenticated;
grant update(state,revision) on public.tracker_workspaces to authenticated;
revoke all on function public.valid_tracker_state(jsonb),public.tracker_verified_email(),public.tracker_revision_guard(),public.create_tracker_workspace(jsonb),public.allow_tracker_email(uuid,text),public.join_tracker_workspace(uuid),public.tracker_workspace_access(uuid),public.revoke_tracker_access(uuid,uuid),public.remove_tracker_email(uuid,text) from public,anon;
grant execute on function public.valid_tracker_state(jsonb),public.tracker_verified_email(),public.create_tracker_workspace(jsonb),public.allow_tracker_email(uuid,text),public.join_tracker_workspace(uuid),public.tracker_workspace_access(uuid),public.revoke_tracker_access(uuid,uuid),public.remove_tracker_email(uuid,text) to authenticated;
