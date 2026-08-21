create extension if not exists pgcrypto;

create type public.account_role as enum ('dealer', 'owner');

create table if not exists public.dealer_accounts (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.account_role not null default 'dealer',
  dealership_name text,
  contact_name text,
  phone text,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.ai_search_missions (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.dealer_accounts (id) on delete cascade,
  mission_id text not null,
  status text not null default 'Mission Created',
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (account_id, mission_id)
);

create index if not exists ai_search_missions_account_id_idx
  on public.ai_search_missions (account_id);

create table if not exists public.saved_opportunities (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.dealer_accounts (id) on delete cascade,
  mission_row_id uuid references public.ai_search_missions (id) on delete set null,
  opportunity_id text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (account_id, opportunity_id)
);

create index if not exists saved_opportunities_account_id_idx
  on public.saved_opportunities (account_id);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null unique references public.dealer_accounts (id) on delete cascade,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  plan_name text,
  status text not null default 'inactive',
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists subscriptions_account_id_idx
  on public.subscriptions (account_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create trigger set_updated_at_dealer_accounts
before update on public.dealer_accounts
for each row
execute procedure public.set_updated_at();

create trigger set_updated_at_ai_search_missions
before update on public.ai_search_missions
for each row
execute procedure public.set_updated_at();

create trigger set_updated_at_saved_opportunities
before update on public.saved_opportunities
for each row
execute procedure public.set_updated_at();

create trigger set_updated_at_subscriptions
before update on public.subscriptions
for each row
execute procedure public.set_updated_at();

create or replace function public.is_owner(user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.dealer_accounts da
    where da.id = user_id
      and da.role = 'owner'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.dealer_accounts (id, role)
  values (new.id, 'dealer')
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();

alter table public.dealer_accounts enable row level security;
alter table public.ai_search_missions enable row level security;
alter table public.saved_opportunities enable row level security;
alter table public.subscriptions enable row level security;

create policy "dealer_accounts_select_self_or_owner"
  on public.dealer_accounts
  for select
  using (
    id = auth.uid()
    or public.is_owner(auth.uid())
  );

create policy "dealer_accounts_insert_self_or_owner"
  on public.dealer_accounts
  for insert
  with check (
    id = auth.uid()
    or public.is_owner(auth.uid())
  );

create policy "dealer_accounts_update_self_or_owner"
  on public.dealer_accounts
  for update
  using (
    id = auth.uid()
    or public.is_owner(auth.uid())
  )
  with check (
    id = auth.uid()
    or public.is_owner(auth.uid())
  );

create policy "dealer_accounts_delete_owner_only"
  on public.dealer_accounts
  for delete
  using (public.is_owner(auth.uid()));

create policy "ai_search_missions_select_own_or_owner"
  on public.ai_search_missions
  for select
  using (
    account_id = auth.uid()
    or public.is_owner(auth.uid())
  );

create policy "ai_search_missions_insert_own_or_owner"
  on public.ai_search_missions
  for insert
  with check (
    account_id = auth.uid()
    or public.is_owner(auth.uid())
  );

create policy "ai_search_missions_update_own_or_owner"
  on public.ai_search_missions
  for update
  using (
    account_id = auth.uid()
    or public.is_owner(auth.uid())
  )
  with check (
    account_id = auth.uid()
    or public.is_owner(auth.uid())
  );

create policy "ai_search_missions_delete_own_or_owner"
  on public.ai_search_missions
  for delete
  using (
    account_id = auth.uid()
    or public.is_owner(auth.uid())
  );

create policy "saved_opportunities_select_own_or_owner"
  on public.saved_opportunities
  for select
  using (
    account_id = auth.uid()
    or public.is_owner(auth.uid())
  );

create policy "saved_opportunities_insert_own_or_owner"
  on public.saved_opportunities
  for insert
  with check (
    account_id = auth.uid()
    or public.is_owner(auth.uid())
  );

create policy "saved_opportunities_update_own_or_owner"
  on public.saved_opportunities
  for update
  using (
    account_id = auth.uid()
    or public.is_owner(auth.uid())
  )
  with check (
    account_id = auth.uid()
    or public.is_owner(auth.uid())
  );

create policy "saved_opportunities_delete_own_or_owner"
  on public.saved_opportunities
  for delete
  using (
    account_id = auth.uid()
    or public.is_owner(auth.uid())
  );

create policy "subscriptions_select_own_or_owner"
  on public.subscriptions
  for select
  using (
    account_id = auth.uid()
    or public.is_owner(auth.uid())
  );

create policy "subscriptions_insert_own_or_owner"
  on public.subscriptions
  for insert
  with check (
    account_id = auth.uid()
    or public.is_owner(auth.uid())
  );

create policy "subscriptions_update_own_or_owner"
  on public.subscriptions
  for update
  using (
    account_id = auth.uid()
    or public.is_owner(auth.uid())
  )
  with check (
    account_id = auth.uid()
    or public.is_owner(auth.uid())
  );

create policy "subscriptions_delete_own_or_owner"
  on public.subscriptions
  for delete
  using (
    account_id = auth.uid()
    or public.is_owner(auth.uid())
  );

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.dealer_accounts to authenticated;
grant select, insert, update, delete on public.ai_search_missions to authenticated;
grant select, insert, update, delete on public.saved_opportunities to authenticated;
grant select, insert, update, delete on public.subscriptions to authenticated;
