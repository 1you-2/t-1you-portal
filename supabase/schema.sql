-- t.1you.kr 성장용 Supabase 스키마 (MVP)
-- Supabase Dashboard → SQL Editor → New query → 전체 붙여넣기 → Run
-- 로그인 없이도 동작하도록 anon에 최소 권한만 엽니다 (쓰기는 insert만, 수정/삭제는 불가).

-- 1) 사이트 목록 (읽기 전용 공개)
create table if not exists sites (
  id text primary key,
  name text not null,
  description text default '',
  url text not null,
  category text not null,
  tags text[] default '{}',
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2) 클릭 로그 (개인정보 없음: site_id + 시각만)
create table if not exists site_clicks (
  id bigint generated always as identity primary key,
  site_id text references sites(id) on delete set null,
  path text default '',
  clicked_at timestamptz default now()
);

-- 3) 사이트 제안함 (선생님들이 새 사이트 제보)
create table if not exists suggestions (
  id bigint generated always as identity primary key,
  name text not null,
  url text not null,
  reason text default '',
  status text default 'pending',
  created_at timestamptz default now()
);

-- 4) 인기 집계 뷰
create or replace view site_popular as
select site_id, count(*)::int as clicks
from site_clicks
where site_id is not null
group by site_id;

-- RLS 켜기
alter table sites enable row level security;
alter table site_clicks enable row level security;
alter table suggestions enable row level security;

-- 정책: sites는 전원 읽기만
drop policy if exists "sites public read" on sites;
create policy "sites public read" on sites
  for select using (true);

-- 정책: 클릭은 누구나 기록, 집계 조회는 누구나 가능 (개인정보 없음)
drop policy if exists "clicks public insert" on site_clicks;
create policy "clicks public insert" on site_clicks
  for insert with check (true);
drop policy if exists "clicks public read" on site_clicks;
create policy "clicks public read" on site_clicks
  for select using (true);

-- 정책: 제안은 누구나 등록만 (목록 조회는 대시보드에서만 → 스팸 수집 방지)
drop policy if exists "suggestions public insert" on suggestions;
create policy "suggestions public insert" on suggestions
  for insert with check (true);

-- 정렬/비활성용 인덱스
create index if not exists idx_sites_cat on sites (category);
create index if not exists idx_sites_active on sites (is_active);
create index if not exists idx_clicks_site on site_clicks (site_id);
