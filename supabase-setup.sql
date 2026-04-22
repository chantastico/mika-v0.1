create table if not exists public.mika_waitlist (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  email text not null,
  location text not null,
  parent_type text,
  rating integer check (rating between 1 and 5),
  usefulness text,
  feedback_keywords text,
  family_snapshot text,
  comment text not null,
  language text not null default 'en',
  source text not null default 'github_pages_prototype',
  page_url text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.mika_waitlist
add column if not exists rating integer check (rating between 1 and 5);

alter table public.mika_waitlist
add column if not exists usefulness text;

alter table public.mika_waitlist
add column if not exists feedback_keywords text;

alter table public.mika_waitlist
add column if not exists family_snapshot text;

alter table public.mika_waitlist
add column if not exists language text not null default 'en';

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
