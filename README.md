# 학교 업무 원샷

교사들이 자주 쓰는 출판사 / 나이스 / 하이클래스 등을 한 페이지에 모은 포털.
`https://t.1you.kr` 운영 중.

## 구조
```
index.html          뼈대
css/style.css       디자인
js/app.js           검색/필터/즐겨찾기/인기/제안 로직
js/supabase.js      Supabase 래퍼 (키 없으면 자동 비활성화)
js/config.js        Supabase 접속 정보 (직접 입력)
js/config.example.js 입력 예시
data/sites.json     DB 미연결 시 폴백용 목록
supabase/schema.sql 테이블+RLS 스키마
supabase/seed.sql   초기 25개 이관용
vercel.json         Vercel 설정
```

## Supabase 연결 순서 (t 전용 프로젝트 권장)
1. Supabase 새 계정/조직 → `New Project` → 리전 `Northeast Asia (Seoul)`
2. `SQL Editor → New query`에 `supabase/schema.sql` 전체 붙여넣기 → `Run`
3. 같은 방법으로 `supabase/seed.sql` 실행 (25개 등록, 중복 실행해도 덮어씀)
4. `Project Settings → API`에서 `Project URL`, `anon public key` 복사
   (`service_role` 키는 절대 사용 금지)
5. `js/config.js`에 두 값 입력 후 커밋 → GitHub 푸시 → Vercel 자동 재배포
6. `t.1you.kr` 접속 → 필터 옆에 `🟢 실시간 DB 연결됨` 확인
7. 카드 클릭 몇 번 → `🔥 지금 많이 찾는 사이트` 노출 확인
8. 제안 폼 테스트 → `Table Editor → suggestions`에 행 쌓이는지 확인

## 데이터 보는 곳
- 인기: `site_popular` 뷰 (또는 SQL: `select * from site_popular order by clicks desc;`)
- 제안: `Table Editor → suggestions` (`status`를 `done`/`rejected`로 관리)
- 반영: `sites` 테이블 행 추가/수정 → 재배포 없이 즉시 반영. `is_active=false`면 숨김.

## 보안
- anon 키는 RLS 덕분에 안전: `sites` 읽기만, `site_clicks` 기록/조회만, `suggestions` 등록만 가능. 수정/삭제는 대시보드에서만.
