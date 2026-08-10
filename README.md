# AI Trend Note Archive

주간 AI 뉴스와 단일 주제 카드뉴스를 모아 보는 공개 아카이브입니다.

## 구조

- `src/news-data.mjs`: 뉴스 제목, 날짜, 요약, 태그, 출처
- `src/styles.css`: 아카이브 디자인 시스템 구현
- `src/app.js`: 필터, 검색, 카드 캐러셀
- `scripts/build.mjs`: 정적 HTML 생성
- `docs/`: GitHub Pages 공개 파일과 카드 이미지

## 새 뉴스 추가

1. `docs/assets/<slug>/`에 `01.webp`부터 카드 이미지를 넣습니다.
2. `src/news-data.mjs`에 뉴스 정보를 추가합니다.
3. `node scripts/build.mjs`를 실행합니다.

카드뉴스 상세 화면은 첫 화면에서 카드 전체와 이동 컨트롤을 바로 볼 수 있습니다. 방향키, Space, Home, End와 터치 스와이프를 지원합니다.
