create table if not exists public.mika_waitlist (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  email text not null,
  location text not null,
  parent_type text,
  comment text not null,
  source text not null default 'github_pages_prototype',
  page_url text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.mika_waitlist enable row level security;

drop policy if exists "Allow public waitlist inserts" on public.mika_waitlist;

create policy "Allow public waitlist inserts"
on public.mika_waitlist
for insert
to anon
with check (true);

create index if not exists mika_waitlist_created_at_idx
on public.mika_waitlist (created_at desc);

create index if not exists mika_waitlist_email_idx
on public.mika_waitlist (email);
