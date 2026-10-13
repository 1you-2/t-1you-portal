-- 강사카드 탭용 스키마 (구글 로그인 전제, 본인 데이터만 접근)
-- SQL Editor → New query → 붙여넣기 → Run
-- profiles: 1인 1행 (반복 입력 제거용), cards: 강의 건별 저장

create table if not exists instructor_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text default '',
  birthdate text default '',
  workplace text default '',
  position text default '',
  mobile text default '',
  office_phone text default '',
  email text default '',
  career_lines text[] default '{}',
  bank_name text default '',
  account_no text default '',
  tax_type text default '기타소득',
  consent_data boolean default true,
  consent_third boolean default true,
  updated_at timestamptz default now()
);

create table if not exists instructor_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  business_name text default '',
  org_dept text default '',
  lecture_at text default '',
  prep_teacher text default '',
  prep_center text default '',
  prep_trainee text default '',
  seating text default '2인 1조',
  seating_note text default '',
  manuscript_type text default '새 원고',
  manuscript_pages int default 0,
  manuscript_modified_pct int,
  prev_year text default '',
  prev_course text default '',
  consent_manuscript boolean default true,
  checklist jsonb default '{}',
  written_date text default '',
  created_at timestamptz default now()
);

alter table instructor_profiles enable row level security;
alter table instructor_cards enable row level security;

-- 본인 행만 전체 허용 (타인은 절대 불가, anon은 불가 → 로그인 필수)
drop policy if exists "own profile" on instructor_profiles;
create policy "own profile" on instructor_profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own cards" on instructor_cards;
create policy "own cards" on instructor_cards
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists idx_cards_user on instructor_cards (user_id, created_at desc);
