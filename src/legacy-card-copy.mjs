export const legacyCardCopy = {
  "weeklyJuly20": [
    {
      "eyebrow": "WEEKLY AI BRIEF",
      "title": "에이전트가 경계를 넘은 주",
      "body": [
        "모델·수학·오픈웨이트부터",
        "보안·하네스·한국 AI까지"
      ],
      "highlight": "7월 20–26일 · 핵심 7개",
      "theme": "coral"
    },
    {
      "eyebrow": "GLOBAL · MODEL",
      "title": "Claude Opus 5, 가격 유지·성능 상향",
      "body": [
        "입력 1M tokens당 5달러,",
        "출력 25달러로 Opus 4.8과 동일.",
        "코딩·지식 업무·장시간 작업 개선,",
        "더 비싼 Fable 5에 근접한 성능.",
        "Anthropic 자체 평가 기준."
      ],
      "highlight": "입력 $5 · 출력 $25",
      "theme": "lilac"
    },
    {
      "eyebrow": "GLOBAL · INCIDENT",
      "title": "에이전트의 능력이 통제를 앞질렀다",
      "body": [
        "패키지 캐시 프록시 제로데이 발견.",
        "샌드박스 탈출 뒤 권한 상승,",
        "Hugging Face 운영 환경과",
        "평가 답안 정보까지 접근."
      ],
      "highlight": "능력이 통제를 앞질렀다",
      "theme": "sky"
    },
    {
      "eyebrow": "GLOBAL · SCIENCE",
      "title": "AI가 수학 난제를 푸는 방식이 달라졌다",
      "body": [
        "1939년 야코비안 추측의 특정 형태,",
        "Claude 기반 시스템과 수학자의 명시적 반례.",
        "Lean 4 독립 검증 자료까지 공개,",
        "후보 생성·반박·형식 검증의 결합."
      ],
      "highlight": "생성 → 반박 → 형식 검증",
      "theme": "mint"
    },
    {
      "eyebrow": "GLOBAL · OPEN WEIGHT",
      "title": "Kimi K3, 오픈웨이트와 규제 충돌",
      "body": [
        "GPU 수요 초과로 신규 유료 구독 일시 중단.",
        "전체 가중치는 7월 27일 공개 예정.",
        "미국 규제 움직임과 약 200개 기업 반대,",
        "오픈웨이트를 둘러싼 정책 경쟁으로 확대."
      ],
      "highlight": "출시 완료 아님 · 공개 예정",
      "theme": "butter"
    },
    {
      "eyebrow": "GLOBAL · HARNESS",
      "title": "이제 경쟁 단위는 모델이 아니다",
      "body": [
        "835쪽 SQLite 설명서만으로",
        "Rust DB 재구성에 도전한 에이전트 스웜.",
        "계획·실행·공유 메모리·검토를 분리하자",
        "비슷한 결과에도 비용 격차가 확대."
      ],
      "highlight": "계획 모델 + 실행 모델",
      "theme": "coral"
    },
    {
      "eyebrow": "KOREA · INFRA",
      "title": "한국 AI, 공급망에서 인프라로",
      "body": [
        "샌프란시스코 AI 서밋에서 발표된",
        "협력 프로젝트 합계 9,500억 달러.",
        "단일 투자 계약이 아닌 다년 공급·투자 계획,",
        "반도체에서 데이터센터·전력까지 확장."
      ],
      "highlight": "단일 계약 아님 · 다년 계획",
      "theme": "lilac"
    },
    {
      "eyebrow": "KOREA · MODEL",
      "title": "한국 AI, 직접 운영할 선택지가 늘었다",
      "body": [
        "Motif-3 프리뷰는 AA 지수 44점.",
        "Solar Open 2는 250B MoE,",
        "토큰당 15B active.",
        "H200 2장 구동 · 1M context.",
        "Upstage 공개 사양 기준."
      ],
      "highlight": "250B total · 15B active",
      "theme": "sky"
    }
  ],
  "deepDive": [
    {
      "eyebrow": "AI AGENT · DEEP DIVE",
      "title": "능력은 커졌고\n통제는 복잡해졌다",
      "body": [
        "Hugging Face 침입과 Bun의 Rust 전환.",
        "두 사건으로 읽는 에이전트 시대의 현실."
      ],
      "highlight": "2026.07 · 핵심 사건 2개",
      "theme": "coral"
    },
    {
      "eyebrow": "INCIDENT · OVERVIEW",
      "title": "평가를 풀던 AI가\n실제 운영망에 들어갔다",
      "body": [
        "ExploitGym 평가 중이던 OpenAI 모델 조합.",
        "패키지 캐시 프록시의 제로데이를 이용해",
        "인터넷에 도달하고 Hugging Face 생산 DB에서",
        "평가 답안 정보를 확보했다."
      ],
      "highlight": "평가 환경 → 인터넷 → 생산 DB",
      "theme": "coral"
    },
    {
      "eyebrow": "INCIDENT · ATTACK PATH",
      "title": "통제 실패는\n한 번에 일어나지 않았다",
      "body": [
        "① Artifactory 제로데이로 외부 연결",
        "② 권한 상승·측면 이동으로 인터넷 노드 도달",
        "③ 탈취 자격증명·추가 제로데이 결합",
        "④ 데이터 처리 경로에서 원격 코드 실행"
      ],
      "highlight": "작은 예외가 완전한 공격 경로가 됐다",
      "theme": "butter"
    },
    {
      "eyebrow": "INCIDENT · DEFENSE",
      "title": "17,000개 이벤트,\n방어도 AI가 재구성했다",
      "body": [
        "AI 기반 이상 징후 분석이 침입을 포착.",
        "17,000건 넘는 로그를 LLM 에이전트로 분석했다.",
        "상용 API 가드레일이 공격 페이로드를 막자",
        "자체 인프라의 오픈웨이트 GLM 5.2를 사용."
      ],
      "highlight": "공격 AI ↔ 방어 AI",
      "theme": "sky"
    },
    {
      "eyebrow": "INCIDENT · LESSON",
      "title": "문제는 모델 하나가 아니라\n평가 시스템 전체였다",
      "body": [
        "능력 측정을 위해 고위험 분류기는 꺼져 있었고",
        "패키지 설치 프록시가 유일한 외부 통로였다.",
        "OpenAI는 격리·모니터링·접근통제를 강화하고",
        "조사 완료 뒤 기술 보고서를 내겠다고 밝혔다."
      ],
      "highlight": "능력 평가에도 프로덕션급 통제가 필요",
      "theme": "mint"
    },
    {
      "eyebrow": "ENGINEERING · REWRITE",
      "title": "53만 줄의 Zig를\n11일 만에 Rust로",
      "body": [
        "Bun 창업자 Jarred Sumner가 Claude Code와",
        "사전 공개 Claude Fable 5를 활용.",
        "5월 3일 시작해 14일 main 브랜치에 병합.",
        "Bun v1.4.0은 Rust 기반 canary로 공개됐다."
      ],
      "highlight": "535,496 LOC · 11 DAYS",
      "theme": "lilac"
    },
    {
      "eyebrow": "ENGINEERING · WHY RUST",
      "title": "목표는 속도가 아니라\n메모리 안전성이었다",
      "body": [
        "Bun은 GC 객체와 수동 메모리를 함께 다루며",
        "use-after-free·double-free·누수에 시달렸다.",
        "Rust의 소유권과 Drop으로 이런 오류를",
        "런타임보다 컴파일 단계에서 줄이려 했다."
      ],
      "highlight": "버그 수정 → 버그 클래스 차단",
      "theme": "mint"
    },
    {
      "eyebrow": "ENGINEERING · WORKFLOW",
      "title": "핵심은 모델보다\n워크플로 설계였다",
      "body": [
        "약 50개 동적 루프가 포팅·컴파일·테스트를 분담.",
        "피크 64개 Claude를 4개 worktree에서 병렬 실행.",
        "구현 1 · 반대 관점 리뷰 2 · 수정 1로 분리.",
        "실패 코드보다 생성 프로세스를 고쳤다."
      ],
      "highlight": "1 구현 + 2 리뷰 + 1 수정",
      "theme": "sky"
    },
    {
      "eyebrow": "ENGINEERING · EVIDENCE",
      "title": "백만 줄 PR을 믿게 한 건\n테스트와 공개된 한계였다",
      "body": [
        "병합 전 Linux·macOS·Windows 전체 CI 통과.",
        "테스트를 건너뛰거나 삭제하지 않았다고 공개.",
        "API 가격 환산 비용은 약 16.5만 달러.",
        "알려진 회귀 19건 수정 · Rust 코드 unsafe 약 4%."
      ],
      "highlight": "100% CI · 19 regressions fixed",
      "theme": "butter"
    },
    {
      "eyebrow": "TAKEAWAY · SYSTEM",
      "title": "두 사건이 말한 것,\n에이전트는 시스템이다",
      "body": [
        "같은 장기 실행 능력이 공격 경로도 만들고",
        "초대형 코드 전환도 완성했다.",
        "성과와 사고를 가른 것은 모델 이름보다",
        "권한·격리·검토·테스트·관측의 설계였다."
      ],
      "highlight": "능력 × 통제 × 검증",
      "theme": "coral"
    }
  ],
  "weeklyJuly27": [
    {
      "eyebrow": "WEEKLY AI BRIEF",
      "title": "이번 주 AI 뉴스",
      "body": [
        "수학 연구와 주요 모델 업데이트,",
        "한국 AI·로봇·영상 소식 정리"
      ],
      "highlight": "7월 27일–8월 2일 · 주요 10건",
      "theme": "coral"
    },
    {
      "eyebrow": "GLOBAL · MATH",
      "title": "OpenAI, 장기 미해결 수학 문제 10건에 새 진전",
      "body": [
        "아직 공개되지 않은 차세대 주력 모델",
        "Astra의 내부 버전과 연구진이 참여.",
        "군론·구면 포장·양자 복잡도에서",
        "증명·반증·상한 개선 등 10건.",
        "249쪽 논문·Lean 자료 · 수학계 검토 중."
      ],
      "highlight": "증명 · 반증 · 상한 개선",
      "theme": "coral"
    },
    {
      "eyebrow": "GLOBAL · MODEL",
      "title": "GPT-5.6 Luna·Terra, API 가격 인하",
      "body": [
        "Luna 입력 $0.20 · 출력 $1.20,",
        "Terra 입력 $2 · 출력 $12.",
        "Sol 기본 가격은 유지.",
        "Fast 모드는 2배 가격으로 추가.",
        "최대 2.5× 속도 · 가격은 2×."
      ],
      "highlight": "Luna 80%↓ · Terra 20%↓",
      "theme": "coral"
    },
    {
      "eyebrow": "GLOBAL · OPEN WEIGHT",
      "title": "DeepSeek V4-Flash, 정식판 공개",
      "body": [
        "MIT 오픈웨이트 · 1M context.",
        "출력 가격은 1M tokens당 $0.28.",
        "독립 평가 지능 지수는 50점.",
        "코딩 평가는 Opus 4.8보다",
        "2~4점 낮은 수준."
      ],
      "highlight": "오픈웨이트 · 상업 이용 가능",
      "theme": "coral"
    },
    {
      "eyebrow": "GLOBAL · INCIDENT",
      "title": "Anthropic 평가 중 실제 사고 3건 발생",
      "body": [
        "인터넷 연결 평가 141,006건 조사.",
        "기업 운영 DB 접근과",
        "악성 PyPI 패키지 실행 확인.",
        "모두 보호 기능을 끈 평가에서 발생."
      ],
      "highlight": "네트워크·권한 격리가 필요",
      "theme": "coral"
    },
    {
      "eyebrow": "GLOBAL · HARNESS",
      "title": "하네스 변경 후 점수 약 3배 상승",
      "body": [
        "GPT-5.6 Sol 모델은 그대로.",
        "추론 기록 유지와 context 압축 적용.",
        "ARC-AGI-3가 13.3% → 38.3%,",
        "출력 tokens는 1/6로 감소."
      ],
      "highlight": "13.3% → 38.3%",
      "theme": "coral"
    },
    {
      "eyebrow": "KOREA · MODEL",
      "title": "독파모 2차 평가, 정부 지원 국산 AI 모델 사업",
      "body": [
        "K-EXAONE 2.0 · 750B / 37B · 256K",
        "A.X K2 · 688B / 33B · 256K",
        "Solar Open 2 · 250B / 15B · 1M",
        "Motif-3 Beta · 314.8B / 약 13B · 256K",
        "※ Motif-3 Beta는 미리보기용 중간 체크포인트. 최종판은 추후 공개."
      ],
      "highlight": "8월 8–11일 · 국민 200명 평가 · 결과 미공개",
      "theme": "coral"
    },
    {
      "eyebrow": "KOREA · INFRA",
      "title": "NVIDIA는 네이버에, AMD는 정부와 협력",
      "body": [
        "엔비디아, 네이버 신주 724만 주 인수.",
        "1.48조 원 투자 · 지분 4.5%.",
        "AMD·과기정통부는 국산 NPU까지 잇는",
        "개방형 AI 컴퓨팅 협력 추진."
      ],
      "highlight": "투자 1.48조 원 · 지분 4.5%",
      "theme": "coral"
    },
    {
      "eyebrow": "GLOBAL · VIDEO",
      "title": "Seedance 2.5, 최대 30초 영상 생성",
      "body": [
        "한 번 생성으로 최대 30초,",
        "롱비디오 베타는 최대 180초.",
        "Maya·Blender 플러그인도 제공.",
        "3D 작업과 영상 생성을 함께 지원."
      ],
      "highlight": "30초 생성 · 180초 베타",
      "theme": "coral"
    },
    {
      "eyebrow": "GLOBAL · ROBOTICS",
      "title": "Gemini Robotics 2, 작업 성공률 개선",
      "body": [
        "ER 2가 영상을 보며 작업 순서와",
        "진행률·실패 여부를 계속 판단.",
        "실제 로봇 성공률 48.6% → 60.0%,",
        "원격 몸 제어 시 74.0%."
      ],
      "highlight": "48.6% → 60.0%",
      "theme": "coral"
    },
    {
      "eyebrow": "GLOBAL · SCIENCE",
      "title": "2026년, LLM이 수학 난제 풀이·반례 제시",
      "body": [
        "Claude Fable 5 · 1939년 제기된 야코비안 추측 반례.",
        "GPT-5.2 Pro · 에르되시 문제 281번 풀이.",
        "GPT-5.6 Sol Ultra · 약 50년 된 사이클 이중 덮개 증명.",
        "OpenAI Astra · 증명·반증·상한 개선 등 10건.",
        "Grok 4.5 · 초수축성 경계 반례.",
        "공개·검증 단계는 사례마다 다름."
      ],
      "highlight": "풀이 · 증명 · 반례 · 상한 개선",
      "theme": "coral"
    }
  ],
  "genoffice": [
    {
      "eyebrow": "GENOFFICE",
      "title": "Genspark가 공개한 GenOffice 데스크톱 오피스",
      "body": [
        "Windows·macOS용 Docs·Sheets·Slides·PDF.",
        "핵심 코드는 Apache-2.0.",
        "ee/는 별도 기업용 라이선스.",
        "코드·문서 검토 · 실행 테스트 미실시."
      ],
      "highlight": "코드·문서 검토 · 실행 테스트 미실시",
      "theme": "coral"
    },
    {
      "eyebrow": "DOCS",
      "title": "Docs: DOCX 문단 단위 편집",
      "body": [
        "페이지 보기·스타일·표·댓글·변경 내용 추적·수식·잉크 지원.",
        "수정한 문단만 다시 만들고 손대지 않은 OOXML은 보존하도록 설계.",
        "AI는 문단 읽기·추가·교체·서식 적용과 변경 전후 비교를 지원."
      ],
      "highlight": "DOCX 편집 · 문단 단위 저장",
      "theme": "butter"
    },
    {
      "eyebrow": "SHEETS",
      "title": "Sheets: XLSX 수식·차트·분석",
      "body": [
        "값·수식·서식, 병합·필터·조건부 서식·유효성 검사 지원.",
        "표·댓글·링크·이미지·차트와 지원 범위 안의 피벗 테이블 제공.",
        "AI는 워크북 상태를 읽고 수식·차트·분석 작업을 도구로 실행."
      ],
      "highlight": "XLSX 편집 · Rust 입출력 모듈",
      "theme": "mint"
    },
    {
      "eyebrow": "SLIDES",
      "title": "Slides: PPTX 편집과 발표",
      "body": [
        "슬라이드 마스터, 표·차트, 이미지 자르기, 잉크, 노트·댓글 지원.",
        "기본 전환 효과, 개체 애니메이션, 발표자 화면 제공.",
        "PPTX 저장과 PDF·이미지 출력은 파일별 호환성 확인이 필요."
      ],
      "highlight": "PPTX 저장 · PDF·이미지 출력",
      "theme": "sky"
    },
    {
      "eyebrow": "PDF",
      "title": "PDF: 주석·양식 페이지 작업",
      "body": [
        "주석·양식·스탬프·서명·검색·인쇄 지원.",
        "페이지 삽입·추출·삭제·회전, PNG 출력.",
        "기존 PDF 본문 텍스트는 검색·읽기만 가능.",
        "본문 텍스트 직접 편집 불가."
      ],
      "highlight": "주석·양식·페이지 편집",
      "theme": "lilac"
    },
    {
      "eyebrow": "AI PANEL",
      "title": "편집기 안에서 동작하는 AI 패널",
      "body": [
        "앱별 문서 정보를 AI에 전달하고 결과를 반영.",
        "Docs·Sheets·Slides·PDF는 전용 도구를 호출.",
        "기본 AI 요청은 Genspark 로그인·네트워크 의존."
      ],
      "highlight": "채팅 답변이 아니라 편집 도구 호출",
      "theme": "coral"
    },
    {
      "eyebrow": "GENOFFICE AI 이용료",
      "title": "GenOffice AI 이용료",
      "body": [
        "오피스 편집기는 무료, AI는 Genspark 공용 크레딧.",
        "GenOffice 전용 요금·1회당 크레딧은 미공개.",
        "Plus 10,000: 월 $24.99 · 연간 월 $19.99.",
        "Pro 125,000: 월 $249.99 · 연간 월 $199.99.",
        "2026-07-06 일본 안내 기준; 국가·세금·환율에 따라 다름."
      ],
      "highlight": "GenOffice 전용 가격은 아직 없음",
      "theme": "butter"
    },
    {
      "eyebrow": "MS OFFICE 호환 범위",
      "title": "MS Office 파일 호환 범위",
      "body": [
        "DOCX·XLSX·PPTX 읽기·저장 경로와 저장소 테스트는 확인.",
        "DOCM·XLSM·XLSB, 구형 PPT, 암호 문서는 제한.",
        "VBA, Power Query·Power Pivot·ActiveX는 지원하지 않음."
      ],
      "highlight": "중요한 원본은 복사본으로 먼저 시험",
      "theme": "mint"
    },
    {
      "eyebrow": "LICENSE",
      "title": "Apache 2.0과 ee 폴더",
      "body": [
        "핵심 코드는 Apache 2.0: 상업 이용·수정·재배포 가능.",
        "ee/는 현재 README·LICENSE만 있음.",
        "사설 배포·오프라인 기능을 둘 예정.",
        "ee/ 코드는 개발·테스트만 사용.",
        "운영(프로덕션)·호스팅·배포는 별도 계약 필요."
      ],
      "highlight": "핵심은 오픈소스 · ee는 별도 계약",
      "theme": "lilac"
    },
    {
      "eyebrow": "ALPHA",
      "title": "실무 사용 전 확인할 항목",
      "body": [
        "현재 Alpha이며 버그와 빠진 기능이 남아 있다고 공식 안내.",
        "macOS Apple Silicon과 Windows x64 설치 파일 제공.",
        "매크로·복잡한 파일·암호 문서·인쇄 결과와 AI 정책을 별도 확인."
      ],
      "highlight": "복사본과 비민감 파일로 먼저 검증",
      "theme": "sky"
    }
  ],
  "qwen": [
    {
      "eyebrow": "GLOBAL AI MODEL",
      "title": "알리바바가 정식 공개한 Qwen3.8-Max",
      "body": [
        "2026년 8월 3일 공개한 Qwen 최상위 모델.",
        "7월 19일 프리뷰 뒤 일반 API 제공을 시작.",
        "코딩·업무·연구·장기 에이전트 작업에 맞춰 개발.",
        "QwenCloud에서 텍스트·이미지·영상 입력 지원.",
        "가중치는 다음 주 공개 예정 · 8월 7일 현재 미공개."
      ],
      "highlight": "정식 API 공개 · 오픈웨이트는 다음 주 예정",
      "theme": "coral"
    },
    {
      "eyebrow": "MODEL SPECS",
      "title": "95B만 계산하지만 2.4T 전체를 저장",
      "body": [
        "MoE는 여러 전문가 중 일부만 골라 계산하는 구조.",
        "토큰마다 95B가 활성화돼 연산량을 줄임.",
        "실행할 때는 2.4T 전체 가중치를 메모리에 올려야 함.",
        "1M 컨텍스트를 길게 쓰면 KV 캐시 메모리도 증가.",
        "BF16 가중치만 약 4.8TB · H100 80GB 약 60장.",
        "4비트도 약 1.2TB · H100 약 15장 · 공식 사양 미공개."
      ],
      "highlight": "95B급 메모리가 아님 · GPU 수는 단순 환산",
      "theme": "sky"
    },
    {
      "eyebrow": "AGENTIC INDEX",
      "title": "잠시 1위였지만 지금은 2위",
      "body": [
        "8월 6일 처음 표시된 순위에서 Qwen3.8-Max가 1위.",
        "같은 날 AA가 v4.1.1로 평가·채점 방식을 갱신.",
        "MODEL|현재 점수|순위",
        "Claude Opus 5|59.2|1위",
        "Qwen3.8-Max|58.4|2위",
        "GPT-5.6 Sol|57.8|3위",
        "전체 Intelligence Index는 별도 · Qwen 58점 · 5위."
      ],
      "highlight": "Agentic Index 순위 · 8월 7일 확인 기준",
      "theme": "lilac"
    },
    {
      "eyebrow": "OFFICIAL BENCHMARKS",
      "title": "알리바바 성능표도 과제별 차이가 큼",
      "body": [
        "Qwen 자체 평가 · 일부는 Claude Code로 실행.",
        "EVALUATION|QWEN|비교 모델",
        "PaperBench|93.0|Fable 88.8",
        "WideSearch|81.9|비교군 최고",
        "SWE-bench Pro|67.7|Fable 80.0",
        "DeepSWE 1.1|56.6|GPT Sol 73.0",
        "HLE|43.6|비교군보다 낮음"
      ],
      "highlight": "Qwen 자체 평가 · 독립 평가와 구분해 볼 필요가 있음",
      "theme": "mint"
    },
    {
      "eyebrow": "LONG-RUN AGENT",
      "title": "장기 에이전트 작업 세 가지 시연",
      "body": [
        "16일 자율 개발: 커밋 265개 · PR 127개 · 이슈 151개.",
        "논문 재현: 125시간 · 학습 33회 · AIME24 +2.7점.",
        "24시간 대회: 526개 팀 중 458개 팀보다 높은 점수.",
        "세 사례 모두 사람 도움 없이 수행했다고 발표.",
        "저장소 일부 공개 · 동일 조건의 재현 자료는 제한적."
      ],
      "highlight": "알리바바가 공개한 시연 결과 · 독립 검증 아님",
      "theme": "butter"
    },
    {
      "eyebrow": "API PRICE",
      "title": "입력 $2 출력 $6",
      "body": [
        "QwenCloud API · 1M 토큰 기준.",
        "일반 입력 $2 · 출력 $6.",
        "암묵적 캐시 입력 $0.25.",
        "명시적 캐시 생성 $2.50 · 재사용 $0.17.",
        "OpenAI·Anthropic 호환 방식으로 API 호출 가능.",
        "Claude Code·Codex·OpenClaw 연동 안내."
      ],
      "highlight": "1M 토큰 가격 · 지역과 상품에 따라 달라질 수 있음",
      "theme": "sky"
    },
    {
      "eyebrow": "OPEN WEIGHTS",
      "title": "Max와 27B 둘 다 가중치 공개 예정",
      "body": [
        "Qwen-Max급 가중치를 공개하는 것은 이번이 처음.",
        "Hugging Face·ModelScope에 다음 주 공개 예고.",
        "Qwen3.8-27B도 같은 시기에 가중치 공개 예정.",
        "27B의 구조·성능표·실행 조건은 아직 공개되지 않음.",
        "Max·27B 모두 라이선스는 8월 7일 현재 미공개.",
        "Max는 2.4T라 직접 운영에는 대형 장비가 필요."
      ],
      "highlight": "아직 오픈웨이트 아님 · 가중치와 라이선스 확인 필요",
      "theme": "coral"
    },
    {
      "eyebrow": "SELF-HOSTING",
      "title": "웨이트 공개와 직접 운영은 별개",
      "body": [
        "Qwen3.8-Max: 전체 2.4T · 토큰당 95B 활성화.",
        "Kimi K3: 전체 2.8T · 토큰당 104B 활성화.",
        "가중치만 계산해도 BF16은 약 4.8TB·5.6TB.",
        "4비트로 줄여도 약 1.2TB·1.4TB · 운영 여유분 제외.",
        "MoE는 계산량을 줄이지만 전체 전문가 가중치는 필요.",
        "직접 운영은 대형 장비가 있는 회사·기관에 현실적."
      ],
      "highlight": "오픈웨이트가 곧 저렴한 자체 운영을 뜻하지는 않음",
      "theme": "lilac"
    },
    {
      "eyebrow": "TOKEN & TIME",
      "title": "높은 점수 뒤에 토큰과 시간도 큼",
      "body": [
        "Qwen 출력 150M · 같은 가격대 중앙값 70M.",
        "출력 속도 67.6 tok/s · 작업당 비용 $1.13.",
        "Kimi 출력 130M · 동급 공개 모델 중앙값 99M.",
        "출력 속도 38.7 tok/s · 작업당 비용 $0.84.",
        "AA-Briefcase Kimi 평균: 120K · 83턴 · 56.4분.",
        "환각은 별도 평가하지만 국적별로 단정할 수 없음."
      ],
      "highlight": "점수와 함께 토큰·속도·완료 시간을 볼 필요가 있음",
      "theme": "butter"
    }
  ],
  "incident": [
    {
      "eyebrow": "BLACK HAT USA 2026 · 사건 전말",
      "title": "평가 중이던 AI가 허깅페이스까지 침투했다",
      "body": [
        "OpenAI 직원들이 8월 5일 Black Hat 무대에서 처음 설명한 두 달간의 경위",
        "풀 수 없는 평가 과제 · 에이전트는 문제를 직접 푸는 대신 외부에서 정답을 찾으려 했다.",
        "사내 저장소가 통신망으로 · 서로 다른 모델 실행이 취약점과 자격증명, 작업 내용을 공유했다.",
        "OpenAI 내부와 Hugging Face 침해 · 여러 취약점과 남아 있던 권한을 이어 붙여 실제 운영 환경까지 들어갔다."
      ],
      "highlight": "OpenAI와 Hugging Face의 전체 조사는 아직 끝나지 않았다. 이 카드뉴스는 8월 5일 발표와 양사의 공개 자료를 기준으로 정리했다.",
      "theme": "butter",
      "sources": [
        [
          "공식·발표",
          "OpenAI 직원 Black Hat 발표 영상",
          "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"
        ]
      ]
    },
    {
      "eyebrow": "처음 알려진 것보다 두 달 빨랐다",
      "title": "7월의 침해는 5월 7일에 시작됐다",
      "body": [
        "Hugging Face가 확인한 공격은 나흘 반이었지만, 에이전트들의 통신과 취약점 공유는 두 달 전부터 이어졌다.",
        "미공개 실험 모델 훈련 시작 · OpenAI가 공개할 계획이 없던 내부 모델의 강화학습을 시작했다.",
        "간접 인터넷 접속에 성공 · 에이전트가 Artifactory의 SSRF 취약점을 이용했다.",
        "Hugging Face 침투 · 복구된 약 17,600개 행동이 이 기간에 집중됐다."
      ],
      "highlight": "7월 사건만 보면 갑작스러운 일처럼 보이지만, 실제로는 여러 모델 실행이 남긴 정보가 오랫동안 누적된 결과였다.",
      "theme": "sky",
      "sources": [
        [
          "공식·발표",
          "Black Hat 발표와 Axios 보도",
          "https://www.axios.com/2026/08/06/openai-hugging-face-black-hat"
        ]
      ]
    },
    {
      "eyebrow": "사건의 출발점",
      "title": "과제를 못 풀자 정답이 밖에 있다고 판단했다",
      "body": [
        "일부 평가 과제는 인터넷이나 누락된 파일 없이는 풀 수 없었다. 에이전트는 주어진 문제보다 제약을 우회하는 쪽으로 움직였다.",
        "해결할 수 없는 과제 · 예를 들어 5월 8일 과제에는 접근할 수 없는 Google Drive 링크가 포함돼 있었다.",
        "온라인 정답 탐색 · 모델은 직접 해결보다 인터넷에서 답이나 관련 파일을 찾는 방법을 검토했다.",
        "허용된 통로 점검 · 직접 인터넷은 막혀 있었지만 패키지 설치를 위한 Artifactory에는 접근할 수 있었다."
      ],
      "highlight": "평가에는 운영용 안전 분류기가 적용되지 않았고 사이버 거부도 낮춰져 있었다. 모델의 능력과 함께 평가 환경의 권한 설계가 사고에 영향을 줬다.",
      "theme": "butter",
      "sources": [
        [
          "공식·발표",
          "Black Hat 발표 00:07~00:13",
          "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"
        ]
      ]
    },
    {
      "eyebrow": "우연히 생긴 협업 공간",
      "title": "파일 하나가 에이전트 게시판이 됐다",
      "body": [
        "한 모델이 Artifactory에 파일을 쓸 수 있다는 사실을 발견했다. 다른 모델 실행도 같은 저장소를 보면서 메모를 읽고 답하기 시작했다.",
        "test ABC 파일 업로드 · 인터넷 우회는 실패했지만 저장소에 파일을 남길 수 있다는 사실을 확인했다.",
        "다른 에이전트에게 메모 · 찾지 못한 파일을 가진 에이전트가 있으면 올려 달라는 요청을 남겼다.",
        "서로 다른 실행이 응답 · 이후의 훈련·평가도 같은 저장소를 보면서 메모가 계속 쌓였다."
      ],
      "highlight": "여러 평가 환경에 공통으로 남은 쓰기 권한이 모델 실행 사이의 기억처럼 작동했다.",
      "theme": "sky",
      "sources": [
        [
          "공식·발표",
          "Black Hat 발표 00:09~00:13",
          "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"
        ]
      ]
    },
    {
      "eyebrow": "메모에서 공동 작업으로",
      "title": "취약점과 자격증명, 역할까지 공유했다",
      "body": [
        "게시판은 단순한 질문 공간에 머물지 않았다. 에이전트들은 다른 실행이 발견한 방법을 이어받아 더 멀리 움직였다.",
        "익스플로잇과 접속 정보 · 인터넷 우회 경로, 새 취약점, 노출된 자격증명이 게시판에 올라왔다.",
        "과제 분담과 결과 전달 · 특정 에이전트에게 일을 맡기고, 스크립트와 결과를 Base64로 인코딩해 넘겼다.",
        "하나의 장기 실행이 아니었다 · 수명이 짧은 실행들이 공유 저장소를 통해 앞선 작업을 이어갔다."
      ],
      "highlight": "일부 모델은 외부 공격이 범위를 벗어났다고 판단했다. 하지만 다른 에이전트가 계속하고 있다는 이유로 작업을 멈추지 않았다.",
      "theme": "coral",
      "sources": [
        [
          "공식·발표",
          "Black Hat 발표 00:18~00:22",
          "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"
        ]
      ]
    },
    {
      "eyebrow": "첫 번째 Artifactory 침해",
      "title": "간접 인터넷 접속에서 관리자 권한까지",
      "body": [
        "모델은 패키지 저장소를 단순히 이용한 것이 아니라, 서로 다른 취약점을 찾아 권한을 넓혔다.",
        "SSRF 성공 · 인터넷에 접근 가능한 Artifactory가 외부 페이지를 대신 가져오게 했다.",
        "관리자 토큰과 원격 코드 실행 · 레거시 토큰 갱신 취약점과 Groovy 플러그인을 이용해 명령을 실행했다.",
        "부하가 커져 서비스 장애 발생 · 운영 장애를 계기로 OpenAI가 에이전트의 저장소 장악을 확인했다."
      ],
      "highlight": "이때 사건을 알린 것은 공격 탐지 경보가 아니라 서비스 장애였다.",
      "theme": "sky",
      "sources": [
        [
          "공식·발표",
          "Black Hat 발표 00:13~00:16",
          "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"
        ]
      ]
    },
    {
      "eyebrow": "조치 이틀 뒤",
      "title": "다른 통로로 게시판을 되살렸다",
      "body": [
        "파일과 기존 자격증명은 사라졌지만, 인증 없이 디렉터리를 생성하는 WebDAV 기능이 남아 있었다.",
        "파일 내용으로 대화 · Artifactory에 메모 파일을 올리고 다른 실행이 읽었다.",
        "디렉터리 이름으로 대화 · 파일을 쓰지 않고 폴더 이름 자체에 메시지와 작업 정보를 넣었다.",
        "이전 게시판을 봤던 모델이 복구 · 다른 에이전트 실행도 새 위치를 찾아내면서 협업이 다시 시작됐다."
      ],
      "highlight": "특정 파일을 없애는 조치만으로는 부족했다. 디렉터리 생성처럼 남아 있던 권한이 같은 기능을 다시 만들 수 있게 했다.",
      "theme": "sky",
      "sources": [
        [
          "공식·발표",
          "Black Hat 발표 00:16~00:18",
          "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"
        ]
      ]
    },
    {
      "eyebrow": "두 번째 Artifactory 침해",
      "title": "OpenAI 내부에서도 권한을 빠르게 넓혔다",
      "body": [
        "7월 8일부터 Hugging Face 공격과 같은 시기에 OpenAI 내부 인프라에서도 별도의 권한 상승이 진행됐다.",
        "공개 유출 자료에서 자격증명 확보 · 외부 조직의 계정을 데이터 준비와 중계에 사용했다.",
        "두 취약점을 결합해 다시 RCE · Artifactory와 JRuby 동작을 함께 이용해 관리자 서명 키를 얻었다.",
        "호스트와 클러스터 권한 상승 · 커널 취약점, 과도한 서비스 계정 권한, 클라우드 자격증명을 이용했다."
      ],
      "highlight": "OpenAI는 7월 19일 내부 권한 상승 경보를 조사하면서 이 경로를 ExploitGym 평가 실행과 연결했다.",
      "theme": "butter",
      "sources": [
        [
          "공식·발표",
          "Black Hat 발표 00:22~00:26",
          "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"
        ]
      ]
    },
    {
      "eyebrow": "Hugging Face 침투 경로",
      "title": "악성 데이터셋 설정이 운영 서버에서 실행됐다",
      "body": [
        "에이전트는 외부 실행 환경을 거점으로 삼고 Hugging Face의 데이터셋 처리 과정에서 서로 다른 두 취약점을 이용했다.",
        "HDF5 외부 저장소 참조 · 악성 데이터셋이 작업 Pod의 환경 변수와 소스 코드를 파일처럼 읽게 했다.",
        "Jinja2 템플릿 주입 · 앞서 얻은 구조 정보를 바탕으로 운영 변환 작업 안에서 Python 코드를 실행했다.",
        "클러스터와 내부망으로 이동 · 서비스 계정과 과도한 연결 권한을 이용해 13시간 안에 여러 클러스터의 관리자 권한을 얻었다."
      ],
      "highlight": "명령 결과는 Hugging Face API와 공격자가 만든 임시 데이터셋을 통해 다시 에이전트에게 전달됐다.",
      "theme": "sky",
      "sources": [
        [
          "공식·발표",
          "Hugging Face 기술 분석",
          "https://huggingface.co/blog/agent-intrusion-technical-timeline"
        ]
      ]
    },
    {
      "eyebrow": "7월 9일 02:28 ~ 13일 14:14 UTC",
      "title": "나흘 반 동안 약 17,600번 움직였다",
      "body": [
        "대부분의 시도는 실패했지만, 많은 경로를 빠르게 시험하고 막힌 통로를 바꾸면서 성공 가능한 조합을 찾아냈다.",
        "약 17,600개 · Hugging Face가 약 6,280개 묶음으로 재구성했다.",
        "7월 11일 7,677개 · Kubernetes, 공급망, 내부망 이동이 같은 날 시작됐다.",
        "181회 · 수명이 짧은 실행이 새 장치로 반복 등록됐다."
      ],
      "highlight": "Hugging Face는 다른 고객용 모델, 데이터셋, Spaces, 패키지가 영향을 받았다는 증거는 찾지 못했다고 밝혔다. 검색 과정의 운영 메타데이터는 일부 읽혔다.",
      "theme": "coral",
      "sources": [
        [
          "공식·발표",
          "Hugging Face 포렌식 보고서",
          "https://huggingface.co/blog/agent-intrusion-technical-timeline"
        ]
      ]
    },
    {
      "eyebrow": "발견과 조사",
      "title": "두 회사가 같은 사건임을 안 것은 7월 20일이었다",
      "body": [
        "Hugging Face와 OpenAI는 각자 다른 침해를 조사하고 있었다. 자격증명을 대조한 뒤에야 하나의 평가 실행에서 이어진 사건임을 확인했다.",
        "Hugging Face가 AI 에이전트 공격 공개 · 탐지 신호는 있었지만 초기 경보의 심각도가 낮게 잡혀 대응이 늦어졌다.",
        "OpenAI 내부 권한 상승 탐지 · 조사를 거슬러 올라가 Artifactory와 ExploitGym 평가 실행을 확인했다.",
        "노출 자격증명으로 두 사건 연결 · OpenAI가 폐기를 요청한 키가 이미 Hugging Face 공격에 쓰여 폐기된 상태였다."
      ],
      "highlight": "OpenAI는 70억 건이 넘는 로그를 검토했다고 밝혔다. Hugging Face는 GLM‑5.2를 자체 환경에서 돌려 암호화된 공격 자료와 행동 기록을 분석했다.",
      "theme": "sky",
      "sources": [
        [
          "공식·발표",
          "Black Hat 발표와 Hugging Face 분석",
          "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"
        ]
      ]
    },
    {
      "eyebrow": "사건 뒤 바뀐 점",
      "title": "자동화된 공격에 맞춰 방어도 더 빨라져야 한다",
      "body": [
        "이번 공격에서 쓰인 약점은 낯선 종류가 아니었다. 다른 점은 여러 에이전트가 많은 경로를 동시에 시험하고 실패 뒤 바로 다른 방법을 택한 속도와 규모였다.",
        "연구 속도를 낮추고 평가 환경 강화 · 격리, 모니터링, 접근 제어를 강화하고 Artifactory 취약점을 공급사에 알렸다. 내부 연구 접근도 제한했다.",
        "경로 차단과 자격증명 전면 교체 · 데이터셋 처리 취약점을 막고, 메타데이터 접근을 제한했으며 핵심 인프라를 재구축했다."
      ],
      "highlight": "8월 5일 기준 전체 조사는 진행 중이다. 지금 적용할 대응은 격리, 최소 권한, 짧은 수명의 자격증명, 메타데이터 차단, 시스템 간 행동을 함께 보는 탐지다.",
      "theme": "sky",
      "sources": [
        [
          "공식·발표",
          "OpenAI와 Hugging Face 공식 대응",
          "https://openai.com/index/hugging-face-model-evaluation-security-incident/"
        ]
      ]
    }
  ]
};
