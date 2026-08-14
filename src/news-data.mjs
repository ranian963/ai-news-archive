import { legacyCardCopy } from "./legacy-card-copy.mjs";
import { legacyCardSources } from "./legacy-card-sources.mjs";

function sourceType(label) {
  if (/Artificial Analysis|벤치마크|분석/.test(label)) return "분석";
  if (/공식|Upstage|Qwen|GitHub|OpenAI|Hugging Face/.test(label)) return "공식";
  if (/전사|영상|유튜브/.test(label)) return "전사";
  return "참고";
}

const editorialScenes = {
  weekly: "../editorial-scenes-v2/weekly-roundup.webp",
  model: "../editorial-scenes-v2/frontier-model.webp",
  math: "../editorial-scenes-v2/math-research.webp",
  security: "../editorial-scenes-v2/security-access.webp",
  attack: "../editorial-scenes-v2/attack-path.webp",
  defense: "../editorial-scenes-v2/incident-analysis.webp",
  coding: "../editorial-scenes-v2/code-rewrite.webp",
  harness: "../editorial-scenes-v2/agent-harness.webp",
  infrastructure: "../editorial-scenes-v2/ai-infrastructure.webp",
  media: "../editorial-scenes-v2/video-image.webp",
  voice: "../editorial-scenes-v2/voice-transcription.webp",
  pricing: "../editorial-scenes-v2/model-pricing.webp",
  benchmark: "../editorial-scenes-v2/model-benchmark.webp",
  openWeight: "../editorial-scenes-v2/open-weights.webp",
  moe: "../editorial-scenes-v2/moe-architecture.webp",
  longContext: "../editorial-scenes-v2/long-context.webp",
  selfHosting: "../editorial-scenes-v2/self-hosting.webp",
  office: "../editorial-scenes-v2/office-suite.webp",
  docs: "../editorial-scenes-v2/document-editing.webp",
  sheets: "../editorial-scenes-v2/spreadsheet-analysis.webp",
  slides: "../editorial-scenes-v2/presentation-editing.webp",
  pdf: "../editorial-scenes-v2/pdf-pages.webp",
  assistant: "../editorial-scenes-v2/office-ai-panel.webp",
  license: "../editorial-scenes-v2/open-source-license.webp",
  compatibility: "../editorial-scenes-v2/compatibility-testing.webp",
  organization: "../editorial-scenes-v2/ai-organization.webp",
  tokens: "../editorial-scenes-v2/token-latency.webp",
  koreanModel: "../editorial-scenes-v2/korean-model.webp",
  industrialRobot: "../editorial-scenes-v2/industrial-robot.webp",
  agentEvaluation: "../editorial-scenes-v2/agent-evaluation.webp",
  walletSecurity: "../editorial-scenes-v2/wallet-security.webp",
  longRunningCode: "../editorial-scenes-v2/long-running-code.webp",
  robotics: "../editorial-scenes-v2/robotics-lab.webp"
};

const robotSceneFiles = new Set([editorialScenes.industrialRobot, editorialScenes.robotics]);

export function isRobotScene(background) {
  return robotSceneFiles.has(background);
}

function editorialSceneFor(card) {
  const subject = `${card.eyebrow} ${card.title}`;
  if (/WEEKLY AI BRIEF/.test(subject)) return editorialScenes.weekly;
  if (/SHEETS|XLSX|스프레드시트|수식·차트/.test(subject)) return editorialScenes.sheets;
  if (/SLIDES|PPTX|프레젠테이션|발표/.test(subject)) return editorialScenes.slides;
  if (/PDF/.test(subject)) return editorialScenes.pdf;
  if (/AI PANEL|AI 패널/.test(subject)) return editorialScenes.assistant;
  if (/LICENSE|라이선스|Apache|ee 폴더/.test(subject)) return editorialScenes.license;
  if (/ALPHA|호환|확인할 항목|실무 사용 전/.test(subject)) return editorialScenes.compatibility;
  if (/DOCS|DOCX|문단 단위|문서 편집/.test(subject)) return editorialScenes.docs;
  if (/GENOFFICE|OFFICE|오피스/.test(subject)) return editorialScenes.office;
  if (/VOICE|음성|전사|자막/.test(subject)) return editorialScenes.voice;
  if (/VIDEO|IMAGE|영상|이미지|Grok Imagine|Seedance/.test(subject)) return editorialScenes.media;
  if (/API PRICE|가격|PRICE|TOKEN & TIME|토큰과 시간/.test(subject)) return /TOKEN & TIME|토큰과 시간/.test(subject) ? editorialScenes.tokens : editorialScenes.pricing;
  if (/BENCHMARK|INDEX|EVIDENCE|성능표|점수|ARC-AGI/.test(subject)) return /ARC-AGI/.test(subject) ? editorialScenes.agentEvaluation : editorialScenes.benchmark;
  if (/ATTACK PATH|침투 경로|공격 경로|통로|자격증명|정답이 밖|과제를 못 풀자/.test(subject)) return editorialScenes.attack;
  if (/DEFENSE|발견과 조사|방어|이벤트|조사|움직였다|나흘 반/.test(subject)) return editorialScenes.defense;
  if (/MATH|SCIENCE|수학|난제|증명/.test(subject)) return editorialScenes.math;
  if (/OPEN WEIGHT|OPEN WEIGHTS|오픈웨이트|가중치 공개/.test(subject)) return editorialScenes.openWeight;
  if (/SELF-HOSTING|직접 운영/.test(subject)) return editorialScenes.selfHosting;
  if (/LONG-RUN|장기 에이전트|장시간 코딩|Muse Code/.test(subject)) return editorialScenes.longRunningCode;
  if (/2\.4T|95B|124B|MoE|활성 5\.1B/.test(subject)) return editorialScenes.moe;
  if (/LONG CONTEXT|512K|128K 출력|긴 문서/.test(subject)) return editorialScenes.longContext;
  if (/조직|리더십|Google AI|Jeff Dean/.test(subject)) return editorialScenes.organization;
  if (/WALLET|Coldcard|지갑|난수/.test(subject)) return editorialScenes.walletSecurity;
  if (/INCIDENT|SECURITY|BLACK HAT|침해|취약점|통제|위험|GitHub|Artifactory|Hugging Face/.test(subject)) return editorialScenes.security;
  if (/HARNESS|WORKFLOW|워크플로|하네스|경쟁 단위/.test(subject)) return editorialScenes.harness;
  if (/REWRITE|WHY RUST|ENGINEERING|Bun|Zig|Rust|코딩/.test(subject)) return editorialScenes.coding;
  if (/INFRA|인프라|NVIDIA|AMD|공급망/.test(subject)) return editorialScenes.infrastructure;
  if (/ROBOTICS|로봇|조선소|용접/.test(subject)) return /조선소|용접/.test(subject) ? editorialScenes.industrialRobot : editorialScenes.robotics;
  if (/KOREA · MODEL|독파모|한국 AI|국산 AI/.test(subject)) return editorialScenes.koreanModel;
  if (/AGENT|에이전트/.test(subject)) return editorialScenes.harness;
  return editorialScenes.model;
}

function editorialDetails(cards, sources) {
  return Object.fromEntries(cards.map((card, index) => [index + 1, {
    background: editorialSceneFor(card),
    category: card.eyebrow,
    theme: card.theme,
    variant: index === 0 ? "cover" : undefined,
    eyebrow: card.eyebrow,
    title: card.title,
    cardBody: card.body,
    highlight: card.highlight,
    visual: card.visual,
    summary: card.body.join(" "),
    sources: card.sources ?? sources[index].slice(0, 3).map(([label, url]) => [sourceType(label), label, url])
  }]));
}

function setCardVisuals(details, visuals) {
  for (const [number, visual] of Object.entries(visuals)) details[number].visual = visual;
  return details;
}

function cardVisuals({ weeklyJuly20, deepDive, weeklyJuly27, genoffice, qwen, incident }) {
  setCardVisuals(weeklyJuly20, {
    2: { type: "compare", items: [["입력", "$5"], ["출력", "$25"]] },
    3: { type: "flow", items: ["샌드박스", "권한 상승", "운영 환경", "평가 답안"] },
    4: { type: "flow", items: ["후보 생성", "반박", "Lean 4 검증"] },
    8: { type: "metric", items: [["전체", "250B"], ["활성", "15B"], ["Context", "1M"]] }
  });
  setCardVisuals(deepDive, {
    3: { type: "flow", items: ["SSRF", "권한 상승", "자격증명", "RCE"] },
    4: { type: "compare", items: [["공격 기록", "17K+"], ["분석 모델", "GLM 5.2"]] },
    6: { type: "metric", items: [["코드", "535K LOC"], ["기간", "11일"]] },
    9: { type: "metric", items: [["CI", "100%"], ["회귀 수정", "19건"], ["비용", "$165K"]] }
  });
  setCardVisuals(weeklyJuly27, {
    2: { type: "metric", items: [["연구 결과", "10건"], ["논문", "249쪽"], ["상태", "검토 중"]] },
    3: { type: "bars", items: [["Luna", 80, "80% 인하"], ["Terra", 20, "20% 인하"]] },
    4: { type: "metric", items: [["Context", "1M"], ["출력 가격", "$0.28"], ["AA 지수", "50"]] },
    6: { type: "compare", items: [["변경 전", "13.3%"], ["변경 후", "38.3%"]] },
    7: { type: "table", columns: ["모델", "전체/활성", "Context"], rows: [["K-EXAONE", "750B/37B", "256K"], ["A.X K2", "688B/33B", "256K"], ["Solar Open 2", "250B/15B", "1M"], ["Motif-3 Beta", "314.8B/≈13B", "256K"]] },
    9: { type: "timeline", items: [["단일 생성", "30초"], ["롱비디오 베타", "180초"]] },
    10: { type: "bars", items: [["기본", 49, "48.6%"], ["개선", 60, "60.0%"], ["원격 제어", 74, "74.0%"]] },
    11: { type: "timeline", items: [["1939", "야코비안"], ["약 50년", "사이클 덮개"], ["2026", "AI 증명·반례"]] }
  });
  setCardVisuals(genoffice, {
    2: { type: "flow", items: ["문단 읽기", "수정", "OOXML 보존"] },
    5: { type: "compare", items: [["가능", "주석·양식·페이지"], ["불가", "본문 직접 편집"]] },
    7: { type: "compare", items: [["Plus", "$24.99/월"], ["Pro", "$249.99/월"]] },
    8: { type: "compare", items: [["지원", "DOCX·XLSX·PPTX"], ["제한", "VBA·Power Query"]] },
    9: { type: "compare", items: [["핵심", "Apache 2.0"], ["ee/", "별도 계약"]] }
  });
  setCardVisuals(qwen, {
    2: { type: "metric", items: [["전체", "2.4T"], ["활성", "95B"], ["BF16", "약 4.8TB"]] },
    3: { type: "ranking", items: [["1", "Claude Opus 5", "59.2"], ["2", "Qwen3.8-Max", "58.4"], ["3", "GPT-5.6 Sol", "57.8"]] },
    4: { type: "bars", items: [["PaperBench", 93, "93.0"], ["WideSearch", 82, "81.9"], ["SWE-bench Pro", 68, "67.7"], ["HLE", 44, "43.6"]] },
    5: { type: "timeline", items: [["16일", "자율 개발"], ["125시간", "논문 재현"], ["24시간", "대회"]] },
    6: { type: "compare", items: [["입력", "$2"], ["출력", "$6"], ["캐시 재사용", "$0.17"]] },
    8: { type: "compare", items: [["Qwen 4bit", "≈1.2TB"], ["Kimi 4bit", "≈1.4TB"]] },
    9: { type: "compare", items: [["Qwen", "150M · 67.6 tok/s"], ["Kimi", "130M · 38.7 tok/s"]] }
  });
  setCardVisuals(incident, {
    2: { type: "timeline", items: [["5월 7일", "통신 시작"], ["7월", "침해 집중"], ["8월 5일", "Black Hat 공개"]] },
    3: { type: "flow", items: ["풀 수 없는 과제", "온라인 정답 탐색", "Artifactory 점검"] },
    5: { type: "flow", items: ["취약점", "자격증명", "역할 분담", "결과 공유"] },
    6: { type: "flow", items: ["SSRF", "관리자 토큰", "RCE", "서비스 장애"] },
    8: { type: "flow", items: ["유출 계정", "RCE", "호스트", "클러스터"] },
    9: { type: "flow", items: ["악성 데이터셋", "Jinja2 주입", "클러스터 이동"] },
    10: { type: "metric", items: [["행동", "17,600"], ["최다 하루", "7,677"], ["장치 등록", "181회"]] },
    11: { type: "timeline", items: [["7월 19일", "OpenAI 탐지"], ["7월 20일", "사건 연결"], ["70억+", "로그 검토"]] }
  });
}

const solarPro4Sources = [
  ["공식", "Upstage 출시 블로그", "https://www.upstage.ai/blog/en/solar-pro-4"],
  ["공식", "Upstage 모델 문서", "https://console.upstage.ai/docs/models/solar-pro-4"],
  ["분석", "Artificial Analysis", "https://artificialanalysis.ai/articles/upstage-solar-pro-4"]
];

const solarPro4Details = {
  1: {
    background: editorialScenes.koreanModel,
    category: "한국 · AI 모델",
    theme: "coral",
    variant: "cover",
    eyebrow: "KOREAN AI MODEL",
    title: "업스테이지가 공개한 Solar Pro 4",
    cardBody: ["모델 문서에는 8월 6일 공개로 기록됐고,", "공식 출시 블로그는 8월 11일 올라왔습니다.", "긴 문서와 도구 사용이 필요한 에이전트 업무에 초점을 맞췄습니다."],
    highlight: "API 전용 상용 모델 · 공식 블로그 8월 11일",
    summary: "Upstage 모델 문서는 Solar Pro 4 버전을 2026년 8월 6일 공개로 표시합니다. 공식 출시 블로그는 8월 11일, Artificial Analysis의 독립 분석은 8월 12일에 공개됐습니다.",
    points: [["제공 방식", "가중치를 공개한 모델이 아니라 Upstage Console과 OpenRouter 등에서 이용하는 상용 API 모델입니다."], ["직접 시험", "SolarChat에서는 API 키 없이 브라우저에서 모델을 확인할 수 있습니다."]],
    sources: solarPro4Sources
  },
  2: {
    background: editorialScenes.longContext,
    category: "모델 사양",
    theme: "sky",
    eyebrow: "MODEL SPECS",
    title: "512K 컨텍스트와 최대 128K 출력",
    cardBody: ["공식 문서 기준 컨텍스트 512K, 최대 출력 128K.", "영어·한국어·일본어 입출력을 지원합니다.", "reasoning effort, 도구 호출, 구조화 출력을 제공합니다."],
    highlight: "512K context · 128K output",
    summary: "공식 문서는 512K 컨텍스트와 최대 128K 출력을 안내합니다. 영어·한국어·일본어를 지원하고, 작업에 따라 reasoning effort를 조절할 수 있습니다.",
    points: [["에이전트 기능", "채팅과 추론, 구조화 출력, 도구 호출을 한 모델에서 지원합니다."], ["표기 차이", "Artificial Analysis는 측정 환경을 384K/256K로 적었습니다. 공식 제공 사양과 독립 측정 환경을 구분해 봐야 합니다."]],
    sources: [["공식", "Upstage 모델 문서", "https://console.upstage.ai/docs/models/solar-pro-4"], ["분석", "Artificial Analysis", "https://artificialanalysis.ai/articles/upstage-solar-pro-4"]]
  },
  3: {
    background: editorialScenes.pricing,
    category: "API 가격",
    theme: "butter",
    eyebrow: "API PRICE",
    title: "프로모션 가격과 정가를 나눠 봐야 합니다",
    cardBody: ["정가: 입력 $0.30 · 출력 $1.20 / 1M tokens.", "9월 10일까지 90% 할인 프로모션을 진행합니다.", "할인가만 보고 장기 원가를 계산하면 차이가 커집니다."],
    highlight: "정가 $0.30 / $1.20 · 9월 10일까지 90% 할인",
    summary: "Artificial Analysis가 표시한 정가는 1M 토큰당 입력 0.30달러, 출력 1.20달러입니다. Upstage는 9월 10일까지 90% 할인 프로모션을 안내했습니다.",
    points: [["프로모션", "할인 기간의 서드파티 가격과 프로모션 종료 뒤 정가를 구분해야 합니다."], ["캐시 입력", "Artificial Analysis는 캐시 히트를 1M 토큰당 0.06달러로 표시합니다."]],
    sources: [["공식", "Upstage 출시 블로그", "https://www.upstage.ai/blog/en/solar-pro-4"], ["분석", "Artificial Analysis", "https://artificialanalysis.ai/articles/upstage-solar-pro-4"]]
  },
  4: {
    background: editorialScenes.benchmark,
    category: "공식 성능표",
    theme: "mint",
    eyebrow: "OFFICIAL BENCHMARKS",
    title: "에이전트와 긴 문서 과제에서 상승 폭이 컸습니다",
    cardBody: ["Terminal-Bench v2.1 57.0 · AA-LCR 71.0.", "GPQA Diamond 89.0 · KMMLU-Pro 79.2.", "일부 항목은 Upstage 내부 평가 환경에서 측정했습니다."],
    highlight: "Terminal 57.0 · GPQA 89.0 · AA-LCR 71.0",
    summary: "Upstage가 공개한 표에서 Solar Pro 4는 Terminal-Bench v2.1 57.0, GPQA Diamond 89.0, AA-LCR 71.0, KMMLU-Pro 79.2를 기록했습니다.",
    points: [["큰 개선", "Solar Open 2와 비교하면 Terminal-Bench는 13.8점, AA-LCR은 8.3점 높았습니다."], ["읽는 방법", "KMMLU-Pro 등 별표가 붙은 항목은 Upstage 내부 평가 환경의 결과라고 명시돼 있습니다."]],
    sources: [["공식", "Upstage 출시 블로그", "https://www.upstage.ai/blog/en/solar-pro-4"]]
  },
  5: {
    background: editorialScenes.agentEvaluation,
    category: "외부 실무 실험",
    theme: "lilac",
    eyebrow: "PRACTICAL TEST",
    title: "830회 한국어 실무 과제는 외부 실험입니다",
    cardBody: ["Solar Pro 4와 에이전트 조합을 한국어 실무 과제로 비교했습니다.", "반복 실행 수는 830회였습니다.", "Upstage의 공식 표준 벤치마크와는 다른 실험입니다."],
    highlight: "외부 실험 · 공식 표준 평가와 구분",
    summary: "한국어 실무 과제를 반복 실행한 외부 실험은 실제 사용 감각을 보는 자료입니다. 다만 Upstage의 공식 표준 벤치마크로 보기는 어렵습니다.",
    points: [["볼 수 있는 것", "에이전트와 모델을 묶었을 때의 작업 결과를 비교합니다."], ["제한", "실행 환경과 프롬프트, 채점 방식에 따라 결과가 달라질 수 있습니다."]],
    sources: [["참고", "기존 Solar Pro 4 실무 실험 정리", "https://lilys.ai/digest/10655096/12484911?s=1&noteVersionId=9064509"], ["공식", "Upstage 모델 문서", "https://console.upstage.ai/docs/models/solar-pro-4"]]
  },
  6: {
    background: editorialScenes.selfHosting,
    category: "Solar 모델 선택",
    theme: "coral",
    eyebrow: "SOLAR FAMILY",
    title: "Open 2는 직접 운영, Pro 4는 복잡한 API 작업",
    cardBody: ["Solar Open 2는 가중치를 받아 직접 운영할 수 있습니다.", "Solar Pro 4는 상용 API로 긴 문서와 도구 작업을 처리합니다.", "Solar Pro 4 가중치는 Hugging Face에 공개되지 않았습니다."],
    highlight: "Open 2: 오픈웨이트 · Pro 4: 상용 API",
    summary: "Upstage는 Solar Open 2를 자체 배포용 오픈웨이트 모델, Solar Pro 4를 여러 문서와 도구 호출을 잇는 상용 에이전트 모델로 구분합니다.",
    points: [["온프레미스", "보안이나 규정 때문에 별도 배포가 필요하면 Upstage에 전용·온프레미스 제공을 문의해야 합니다."], ["주의", "Hugging Face의 과거 Solar Pro Preview 22B는 Solar Pro 4와 다른 모델입니다."]],
    sources: [["공식", "Upstage 출시 블로그", "https://www.upstage.ai/blog/en/solar-pro-4"], ["체험", "SolarChat", "https://solar-chat.upstage.ai/"]]
  },
  7: {
    background: editorialScenes.benchmark,
    category: "독립 벤치마크",
    theme: "sky",
    variant: "chart",
    eyebrow: "ARTIFICIAL ANALYSIS",
    title: "Intelligence Index 42점, Solar Pro 3보다 크게 상승",
    cardBody: ["Artificial Analysis Intelligence Index 42점.", "그래프에서 Solar Pro 3는 14점으로 표시됩니다.", "에이전트 성능은 올랐지만 평균 작업 시간과 환각률도 함께 봐야 합니다."],
    highlight: "42점 · Solar Pro 3는 14점",
    media: "artificial-analysis-index-full.webp",
    mediaFull: "artificial-analysis-index-full.webp",
    mediaWidth: 1600,
    mediaHeight: 673,
    mediaAlt: "Artificial Analysis Intelligence Index에서 Solar Pro 4 42점과 Solar Pro 3 14점을 비교한 그래프",
    mediaCaption: "출처: Artificial Analysis · 2026.08.12 · 누르면 전체 그래프가 열립니다",
    mediaHighlights: [["Solar Pro 4", "42점"], ["Solar Pro 3", "14점"]],
    pageLabel: "SOLAR PRO 4 NOTE · 07 / 07",
    summary: "Artificial Analysis는 Solar Pro 4에 Intelligence Index 42점을 부여했습니다. Solar Pro 3의 그래프 표시는 14점이며, 에이전트와 긴 문서 과제에서 개선 폭이 컸습니다.",
    points: [["좋아진 부분", "Terminal-Bench는 12%에서 57%, AA-LCR은 31%에서 71%로 올랐습니다."], ["같이 볼 제한", "평균 과제 시간은 8.6분, 환각률은 24%였습니다. 점수만으로 속도와 신뢰성을 판단하기는 어렵습니다."]],
    sources: [["분석", "Artificial Analysis Solar Pro 4", "https://artificialanalysis.ai/articles/upstage-solar-pro-4"], ["공식", "Upstage 출시 블로그", "https://www.upstage.ai/blog/en/solar-pro-4"]]
  }
};

const grok46Sources = [
  ["xAI 공식 출시", "https://x.ai/news/grok-4-6"],
  ["xAI 공식 모델 문서", "https://docs.x.ai/developers/models/grok-4.6"],
  ["xAI 공식 요금표", "https://docs.x.ai/developers/pricing"],
  ["Artificial Analysis 리더보드", "https://artificialanalysis.ai/"],
  ["GeekNews 정리", "https://news.hada.io/topic?id=32438"]
];

const grok46Details = {
  1: {
    background: editorialScenes.model,
    category: "글로벌 AI 모델",
    theme: "mint",
    variant: "cover",
    eyebrow: "XAI | MODEL RELEASE",
    title: "xAI가 공개한 Grok 4.6",
    cardBody: [
      "xAI는 8월 12일 Grok 4.6을 출시했습니다.",
      "장시간 이어지는 에이전트 작업과 코딩, 지식 업무에 맞춘 상용 모델입니다.",
      "Cursor와 Grok Build, xAI API에서 바로 사용할 수 있습니다."
    ],
    highlight: "8월 12일 출시 | 장기 실행 에이전트와 코딩",
    summary: "xAI는 2026년 8월 12일 Grok 4.6을 출시했습니다. Grok 4.5를 보완해 여러 단계가 필요한 조사, 코드 작업, 자료 분석과 앱 제작에 초점을 맞춘 모델입니다.",
    points: [
      ["먼저 제공된 곳", "출시와 함께 Cursor, Grok Build와 xAI API에 적용됐습니다."],
      ["출시 혜택", "Cursor와 Grok Build는 출시 뒤 첫 일주일 동안 포함 사용량을 2배로 제공한다고 안내했습니다."]
    ],
    sources: [["공식", "xAI Grok 4.6 출시", "https://x.ai/news/grok-4-6"], ["참고", "GeekNews 정리", "https://news.hada.io/topic?id=32438"]]
  },
  2: {
    background: editorialScenes.longContext,
    category: "모델 사양",
    theme: "sky",
    eyebrow: "MODEL SPECS",
    title: "500K 컨텍스트, 텍스트와 이미지 입력",
    cardBody: [
      "API 모델명은 grok-4.6입니다.",
      "500K 컨텍스트와 텍스트, 이미지 입력을 지원합니다.",
      "함수 호출, 구조화 출력과 조절 가능한 추론을 제공합니다."
    ],
    highlight: "500K context | Text, Image | configurable reasoning",
    summary: "xAI 모델 문서에는 500K 컨텍스트, 텍스트와 이미지 입력, 함수 호출, 구조화 출력과 조절 가능한 추론이 기재돼 있습니다. 지식 기준일은 2026년 2월 1일입니다.",
    points: [
      ["공개된 정보", "API 모델명과 컨텍스트 길이, 입력 형식, 주요 API 기능이 공개됐습니다."],
      ["공개되지 않은 정보", "최대 출력 길이와 파라미터 수, 세부 구조는 공식 문서에서 확인되지 않습니다."]
    ],
    sources: [["공식", "xAI Grok 4.6 모델 문서", "https://docs.x.ai/developers/models/grok-4.6"]]
  },
  3: {
    background: editorialScenes.benchmark,
    category: "종합 성능",
    theme: "lilac",
    eyebrow: "INTELLIGENCE INDEX",
    title: "AA 지수 61점, 8월 14일 기준 공동 3위",
    cardBody: [
      "Grok 4.6 High는 Artificial Analysis 지수에서 61점을 기록했습니다.",
      "8월 14일 기준 Opus 5 Max 63점, Fable 5 Max 62점 다음입니다.",
      "GPT-5.6 Sol Max와 같은 점수이며 Grok 4.5 High보다 5점 올랐습니다."
    ],
    highlight: "Fable 5 Max 62 | Grok 4.6 High 61 | GPT-5.6 Sol Max 61",
    summary: "Artificial Analysis Intelligence Index에서 Grok 4.6 High는 61점을 기록했습니다. 8월 14일 확인 기준 Opus 5 Max 63점, Fable 5 Max 62점 다음이며 GPT-5.6 Sol Max와 같은 점수입니다.",
    points: [
      ["지표 범위", "Artificial Analysis Intelligence Index는 9개 평가를 합친 종합 지수입니다."],
      ["확인 시점", "순위는 새 모델과 재평가가 반영되면 달라질 수 있어 점수와 확인 시점을 함께 봐야 합니다."]
    ],
    sources: [["공식", "xAI Grok 4.6 출시", "https://x.ai/news/grok-4-6"], ["분석", "Artificial Analysis 리더보드", "https://artificialanalysis.ai/"]]
  },
  4: {
    background: editorialScenes.coding,
    category: "코딩 평가",
    theme: "butter",
    eyebrow: "CODING EVALS",
    title: "코딩 평가는 항목마다 순위가 달랐습니다",
    cardBody: [
      "CursorBench는 69.9%로 GPT-5.6 Sol의 67.2%보다 높았습니다.",
      "DeepSWE는 65.9%로 GPT-5.6 Sol의 73.0%보다 낮았습니다.",
      "FrontierCode는 61.3%로 GPT-5.6 Sol의 60.6%와 비슷했습니다."
    ],
    highlight: "CursorBench 69.9% | DeepSWE 65.9% | FrontierCode 61.3%",
    summary: "xAI의 공개 표에서 Grok 4.6은 CursorBench v3.2와 FrontierCode v1.1 Extended에서 GPT-5.6 Sol Max보다 높은 점수를 냈지만 DeepSWE v1.1에서는 7.1%p 낮았습니다.",
    points: [
      ["잘 나온 평가", "CursorBench v3.2는 69.9%, FrontierCode v1.1 Extended는 61.3%였습니다."],
      ["낮았던 평가", "DeepSWE v1.1은 65.9%로 GPT-5.6 Sol Max 73.0%와 Fable 5 Max 70.0%보다 낮았습니다."]
    ],
    sources: [["공식", "xAI Grok 4.6 평가표", "https://x.ai/news/grok-4-6"]]
  },
  5: {
    background: editorialScenes.harness,
    category: "학습 방식",
    theme: "coral",
    eyebrow: "TRAINING",
    title: "긴 작업을 처리하도록 후속 학습을 늘렸습니다",
    cardBody: [
      "Grok 4.5보다 긴 보충 학습을 진행했습니다.",
      "Grok 4.5로 SFT 작업 경로를 다시 만들고 문제가 있는 결과를 걸렀습니다.",
      "코딩과 지식 업무, 웹 개발 등에 에이전트 강화학습을 적용했습니다."
    ],
    highlight: "보충 학습 | SFT 재생성 | 에이전트 강화학습",
    summary: "xAI는 보충 학습을 늘리고, Grok 4.5로 여러 추론 단계와 에이전트 환경의 SFT 작업 경로를 다시 만들었다고 설명했습니다. 이후 코딩과 지식 업무, 웹 개발, 커널 최적화 등에 에이전트 강화학습을 적용했습니다.",
    points: [
      ["달라진 학습", "모델 생성 데이터, 엔지니어링 데이터, 개선한 최적화 방식을 보충 학습에 사용했습니다."],
      ["공개 범위", "학습 과정의 방향은 공개했지만 파라미터 수와 전체 학습량은 밝히지 않았습니다."]
    ],
    sources: [["공식", "xAI Grok 4.6 학습 설명", "https://x.ai/news/grok-4-6"]]
  },
  6: {
    background: editorialScenes.pricing,
    category: "API 요금",
    theme: "mint",
    eyebrow: "API PRICING",
    title: "200K를 넘으면 전체 요청 단가가 2배가 됩니다",
    cardBody: [
      "기본 요금은 입력 $2, 캐시 입력 $0.50, 출력 $6입니다.",
      "프롬프트가 200K 이상이면 $4, $1, $12로 올라갑니다.",
      "빠른 처리 옵션은 모든 토큰 단가가 다시 2배입니다."
    ],
    highlight: "기본 $2 / $0.50 / $6 | 200K 이상 $4 / $1 / $12",
    summary: "Grok 4.6의 1M 토큰당 기본 요금은 입력 2달러, 캐시 입력 0.50달러, 출력 6달러입니다. 프롬프트가 200K 토큰 이상이면 요청 전체에 입력 4달러, 캐시 입력 1달러, 출력 12달러가 적용됩니다.",
    points: [
      ["긴 요청", "200K를 넘긴 부분만 비싸지는 방식이 아니라 해당 요청의 모든 토큰에 긴 컨텍스트 요금이 붙습니다."],
      ["빠른 처리", "xAI는 표준 모델보다 빠른 옵션을 제공하며 단가는 표준 요금의 2배입니다."]
    ],
    sources: [["공식", "xAI API 요금표", "https://docs.x.ai/developers/pricing"], ["공식", "xAI Grok 4.6 모델 문서", "https://docs.x.ai/developers/models/grok-4.6"]]
  },
  7: {
    background: editorialScenes.selfHosting,
    category: "제공 방식",
    theme: "sky",
    eyebrow: "AVAILABILITY",
    title: "API로 제공되며 가중치는 공개되지 않았습니다",
    cardBody: [
      "Cursor, Grok Build와 xAI API에서 사용할 수 있습니다.",
      "OpenRouter, Vercel, Cloudflare도 제공처에 포함됐습니다.",
      "모델 가중치와 직접 운영용 라이선스는 공개되지 않았습니다."
    ],
    highlight: "비공개 가중치 | 상용 API와 파트너 서비스로 제공",
    summary: "Grok 4.6은 xAI가 운영하는 상용 API와 Cursor, Grok Build, OpenRouter, Vercel, Cloudflare에서 제공됩니다. 모델 가중치와 직접 운영용 라이선스는 공개되지 않아 로컬이나 사내 서버에 내려받아 실행하는 모델은 아닙니다.",
    points: [
      ["직접 운영", "가중치 파일이 없으므로 필요한 GPU 메모리나 자체 서버 구성도 공개 자료로 계산할 수 없습니다."],
      ["확인할 제한", "파라미터 수와 최대 출력 길이도 공식 문서에 없으므로 추정치를 사양처럼 받아들이지 않는 편이 안전합니다."]
    ],
    sources: [["공식", "xAI Grok 4.6 모델 문서", "https://docs.x.ai/developers/models/grok-4.6"], ["공식", "xAI Grok 4.6 출시", "https://x.ai/news/grok-4-6"]]
  }
};

export const newsItems = [
  {
    id: "weekly-2026-07-20-26",
    type: "weekly",
    path: "news/weekly/2026-07-20-26/",
    identity: { title: "에이전트가 경계를 넘은 주" },
    published: "2026-07-27",
    title: "에이전트가 경계를 넘은 주",
    summary: "Claude Opus 5, AI 수학 연구, Kimi K3, 에이전트 하네스와 한국 AI 인프라까지 한 주의 주요 소식을 8장에 정리했습니다.",
    tags: ["주간 뉴스", "AI 모델", "에이전트", "수학", "한국 AI"],
    cardCount: 8,
    imageStem: "weekly-2026-07-20-26",
    coverAlt: "7월 20일부터 26일까지의 AI 소식을 정리한 주간 AI 뉴스 표지",
    cardDetails: editorialDetails(legacyCardCopy.weeklyJuly20, legacyCardSources.weeklyJuly20),
    sources: [
      ["조코딩 주간 AI 뉴스", "https://youtu.be/-CDz4HTz5Iw"],
      ["최고의 프롬프트 주간 요약", "https://www.threads.com/@choi.openai/post/DbQdpqSj1LC"]
    ]
  },
  {
    id: "ai-agent-deep-dive",
    type: "brief",
    path: "news/brief/ai-agent-deep-dive/",
    identity: { title: "AI 에이전트 통제" },
    published: "2026-07-29",
    title: "능력은 커졌고 통제는 복잡해졌다",
    summary: "AI 에이전트의 Hugging Face 침입과 Bun의 대규모 Rust 전환을 함께 살펴봅니다. 같은 장기 실행 능력이 사고와 성과로 갈린 과정을 10장에 담았습니다.",
    tags: ["짧막 뉴스", "에이전트", "보안", "Claude Code", "개발"],
    cardCount: 10,
    imageStem: "ai-agent-deep-dive",
    coverAlt: "Hugging Face 침입과 Bun의 Rust 전환을 다룬 AI 에이전트 딥다이브 표지",
    cardDetails: editorialDetails(legacyCardCopy.deepDive, legacyCardSources.deepDive),
    sources: [
      ["OpenAI와 Hugging Face 공개 자료를 바탕으로 한 정리", "https://huggingface.co/blog"]
    ]
  },
  {
    id: "weekly-2026-07-27-08-02",
    type: "weekly",
    path: "news/weekly/2026-07-27-08-02/",
    identity: { title: "2026.07.27–08.02" },
    published: "2026-08-03",
    title: "이번 주 AI 뉴스",
    summary: "OpenAI의 장기 미해결 수학 문제 연구, GPT-5.6 가격 인하, DeepSeek V4-Flash, 독파모, Seedance 2.5와 Gemini Robotics 2까지 11장으로 정리했습니다.",
    tags: ["주간 뉴스", "AI 모델", "수학", "오픈웨이트", "한국 AI", "로봇"],
    cardCount: 11,
    imageStem: "weekly-2026-07-27-08-02",
    coverAlt: "7월 27일부터 8월 2일까지의 주요 AI 소식을 정리한 주간 AI 뉴스 표지",
    cardDetails: editorialDetails(legacyCardCopy.weeklyJuly27, legacyCardSources.weeklyJuly27),
    sources: [
      ["주간 뉴스 Threads 원문", "https://www.threads.com/share/BBQ_z0_RRt/"],
      ["독파모 2차 모델 정리", "https://www.threads.com/share/GEMkPpZDX/"]
    ]
  },
  {
    id: "genoffice",
    type: "brief",
    path: "news/brief/genoffice/",
    identity: { brand: "Genspark", title: "GenOffice" },
    published: "2026-08-04",
    title: "Genspark가 공개한 GenOffice 데스크톱 오피스",
    summary: "Docs, Sheets, Slides, PDF 편집 범위와 AI 패널, MS Office 호환 범위, Apache 2.0과 ee 폴더의 별도 라이선스를 코드와 문서 기준으로 정리했습니다.",
    tags: ["짧막 뉴스", "AI 오피스", "오픈소스", "에이전트", "생산성"],
    cardCount: 10,
    imageStem: "genoffice",
    coverAlt: "Genspark가 공개한 GenOffice 데스크톱 오피스 카드뉴스 표지",
    cardDetails: editorialDetails(legacyCardCopy.genoffice, legacyCardSources.genoffice),
    sources: [
      ["GenOffice 공식 페이지", "https://www.genspark.ai/genoffice"],
      ["GenOffice GitHub 저장소", "https://github.com/genspark-ai/genoffice"],
      ["AI Wire 소개", "https://aiwire.kr/case/genspark-genoffice"]
    ]
  },
  {
    id: "solar-pro-4",
    type: "model",
    path: "news/brief/solar-pro-4/",
    identity: { brand: "Upstage", title: "Solar Pro 4" },
    published: "2026-08-11",
    title: "업스테이지가 공개한 Solar Pro 4",
    summary: "512K 컨텍스트, 최대 128K 출력, 에이전트 벤치마크와 API 가격을 공식 자료와 독립 분석으로 나눠 살펴봅니다.",
    tags: ["모델 소식", "AI 모델", "한국 AI", "업스테이지", "LLM"],
    cardCount: 7,
    imageStem: "solar-pro-4",
    coverAlt: "업스테이지가 공개한 Solar Pro 4 모델 카드뉴스 표지",
    cardDetails: solarPro4Details,
    sources: [
      ["Upstage Solar Pro 4 출시 블로그", "https://www.upstage.ai/blog/en/solar-pro-4"],
      ["Upstage Solar Pro 4 모델 문서", "https://console.upstage.ai/docs/models/solar-pro-4"],
      ["Artificial Analysis 독립 분석", "https://artificialanalysis.ai/articles/upstage-solar-pro-4"],
      ["Solar Chat 무료 체험", "https://solar-chat.upstage.ai/"],
      ["OpenRouter Solar Pro 4", "https://openrouter.ai/upstage/solar-pro4"]
    ]
  },
  {
    id: "qwen-3-8-max",
    type: "model",
    path: "news/brief/qwen-3-8-max/",
    identity: { brand: "Alibaba", title: "Qwen3.8-Max" },
    published: "2026-08-07",
    title: "알리바바가 정식 공개한 Qwen3.8-Max",
    summary: "2.4T MoE 구조와 실제 메모리 요구량, 잠시 1위에 오른 Agentic Index, 공식 성능표와 API 가격, 오픈웨이트 공개 계획을 9장으로 살펴봅니다.",
    tags: ["모델 소식", "AI 모델", "중국 AI", "오픈웨이트", "에이전트"],
    cardCount: 9,
    imageStem: "qwen-3-8-max",
    coverAlt: "알리바바가 공개한 Qwen3.8-Max 모델 카드뉴스 표지",
    cardDetails: editorialDetails(legacyCardCopy.qwen, legacyCardSources.qwen),
    sources: [
      ["Qwen3.8 공식 발표", "https://qwen.ai/blog?id=qwen3.8"],
      ["Artificial Analysis Agentic Index", "https://artificialanalysis.ai/?intelligence=agentic-index#intelligence"],
      ["GeekNews 정리", "https://news.hada.io/topic?id=32216"]
    ]
  },
  {
    id: "openai-huggingface-incident",
    type: "brief",
    path: "news/brief/openai-huggingface-incident/",
    identity: { brand: "OpenAI · HF", title: "평가 환경 침투 사건" },
    published: "2026-08-09",
    title: "평가 중이던 AI가 허깅페이스까지 침투했다",
    summary: "OpenAI 직원들이 Black Hat USA 2026에서 공개한 두 달간의 경위를 따라갑니다. 평가 과제, 공유 저장소, 취약점 연결, Hugging Face 침해와 이후 조치를 12장에 담았습니다.",
    tags: ["짧막 뉴스", "에이전트", "보안", "OpenAI", "Hugging Face"],
    cardCount: 12,
    imageStem: "openai-huggingface-incident",
    cardArtTreatment: "wash",
    coverAlt: "OpenAI 직원들이 Black Hat에서 공개한 AI 에이전트의 Hugging Face 침해 사건 표지",
    cardDetails: editorialDetails(legacyCardCopy.incident, legacyCardSources.incident),
    sources: [
      ["OpenAI 직원 Black Hat 발표 전사", "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"],
      ["Axios 사건 보도", "https://www.axios.com/2026/08/06/openai-hugging-face-black-hat"],
      ["OpenAI 관련 Threads 정리", "https://www.threads.com/share/EwI1BfLl3/"]
    ]
  },
  {
    id: "weekly-2026-08-03-09",
    type: "weekly",
    path: "news/weekly/2026-08-03-09/",
    identity: { title: "2026.08.03–08.09" },
    published: "2026-08-10",
    title: "이번 주 AI 뉴스",
    summary: "OpenAI Astra의 사이버 위험 평가, Prime Agent의 ARC-AGI-3 결과, Google AI 리더십 개편, GPT-5.6 Luna, 새 오픈 모델 세 가지와 국내 조선소 용접 로봇까지 11장으로 정리했습니다.",
    tags: ["주간 뉴스", "AI 모델", "에이전트", "보안", "하네스", "한국 AI", "로봇"],
    cardCount: 11,
    imageStem: "weekly-2026-08-03-09",
    coverAlt: "8월 3일부터 9일까지의 주요 AI 소식을 정리한 주간 AI 뉴스 표지",
    cardDetails: {
      1: {
        background: editorialScenes.weekly,
        category: "주간 요약",
        theme: "coral",
        variant: "cover",
        eyebrow: "WEEKLY AI BRIEF",
        title: "이번 주 AI 뉴스",
        cardBody: ["에이전트가 더 멀리 움직인 만큼,", "통제와 평가 방식도 중요해진 한 주"],
        highlight: "8월 3–9일 · 주요 10건",
        summary: "이번 주에는 새 모델 출시보다 에이전트의 행동 범위와 평가 방식이 더 크게 주목받았습니다. 모델 업데이트, 이미지 생성, 오픈웨이트 모델과 국내 로봇 소식도 함께 정리했습니다.",
        points: [
          ["에이전트와 하네스", "Astra의 사이버 위험 평가와 Prime Agent의 ARC-AGI-3 결과를 함께 봅니다."],
          ["모델과 제품", "GPT-5.6 Luna, Grok Imagine Image 2.0, 새 오픈웨이트 모델 세 가지를 담았습니다."]
        ],
        sources: [
          ["전사", "조코딩 주간 AI 뉴스", "https://lilys.ai/digest/10890035/12804647?s=1&noteVersionId=9394264"],
          ["정리", "Threads 주간 요약", "https://www.threads.com/share/KHEHht4Aj/"]
        ]
      },
      2: {
        background: editorialScenes.security,
        category: "글로벌 · 사이버",
        theme: "lilac",
        eyebrow: "GLOBAL · CYBER",
        title: "OpenAI Astra, 사이버 위험 ‘Critical’ 평가",
        cardBody: ["미공개 차세대 추론 모델 Astra가", "재현 가능한 취약점 탐색 과제에서", "‘Critical’ 수준 평가를 받았습니다."],
        highlight: "OpenAI 사이버 위험 평가 단계",
        summary: "OpenAI가 미공개 차세대 추론 모델 Astra의 사이버 능력 평가를 공개했습니다. 실제 제품으로 출시된 모델은 아니며, 일부 과제에서 고위험 취약점을 찾아 재현할 수 있는 수준에 도달했다는 내용입니다.",
        points: [
          ["무엇이 달라졌나", "취약점 탐색뿐 아니라 재현 가능한 공격 절차를 만드는 능력까지 평가했습니다."],
          ["어떻게 제한하나", "모드 전환, 에이전트 접근 제한, 실제 사용 기록을 함께 살피는 방식을 제시했습니다."]
        ],
        sources: [
          ["공식", "OpenAI 사이버 위험 대응", "https://openai.com/index/responding-next-frontier-critical-cyber-capabilities/"],
          ["전사", "주간 AI 뉴스 설명", "https://lilys.ai/digest/10890035/12804647?s=1&noteVersionId=9394264"]
        ]
      },
      3: {
        background: editorialScenes.agentEvaluation,
        category: "글로벌 · 하네스",
        theme: "sky",
        eyebrow: "GLOBAL · HARNESS",
        title: "Prime Agent가 ARC-AGI-3 95.5% 기록",
        cardBody: ["Claude Opus 5에 Prime Agent를 붙이자", "ARC-AGI-3 점수가 30.16%에서 95.5%로 올랐습니다.", "모델 교체가 아니라 하네스가 만든 차이입니다."],
        highlight: "같은 모델 · 하네스 +65.3%p",
        summary: "Prime Intellect는 Claude Opus 5를 Prime Agent 하네스에 연결해 ARC-AGI-3 점수를 30.16%에서 95.5%로 높였다고 발표했습니다. 모델 자체보다 도구 사용과 기억, 반복 탐색을 구성하는 방식이 결과에 큰 영향을 준 사례입니다.",
        points: [
          ["하네스가 한 일", "프롬프트, 메모리, 검색과 데이터셋을 작업 중에 바꾸며 풀이를 반복했습니다."],
          ["같이 볼 제한", "Factorio 환경에서는 보상 해킹이 확인돼 점수를 곧바로 일반 지능으로 해석하기 어렵습니다."]
        ],
        sources: [
          ["공식", "Prime Agent 공개 글", "https://primeintellect.ai/blog/prime-agent"],
          ["전사", "주간 AI 뉴스 설명", "https://lilys.ai/digest/10890035/12804647?s=1&noteVersionId=9394264"]
        ]
      },
      4: {
        background: editorialScenes.organization,
        category: "글로벌 · Google",
        theme: "mint",
        eyebrow: "GLOBAL · GOOGLE",
        title: "Google AI 리더십이 크게 바뀌었습니다",
        cardBody: ["Demis Hassabis는 DeepMind 연구에 집중하고,", "Koray Kavukcuoglu가 Gemini 개발 조직을 맡습니다.", "Jeff Dean은 27년 만에 Google을 떠납니다."],
        highlight: "Google AI 조직과 역할 재편",
        summary: "Google이 AI 연구와 제품 개발 조직의 역할을 다시 나눴습니다. Demis Hassabis는 DeepMind 연구에 집중하고 Koray Kavukcuoglu가 Gemini 개발 조직을 맡으며, Jeff Dean은 27년 만에 회사를 떠납니다.",
        points: [
          ["연구와 제품", "DeepMind 연구와 Gemini 제품 개발의 책임을 나눠 실행 속도를 높이려는 개편입니다."],
          ["Jeff Dean의 다음 단계", "Google을 떠나 새로운 연구 조직인 Discovery Loop 설립에 참여합니다."]
        ],
        sources: [
          ["공식", "Google AI 조직 개편 발표", "https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/"],
          ["전사", "주간 AI 뉴스 설명", "https://lilys.ai/digest/10890035/12804647?s=1&noteVersionId=9394264"]
        ]
      },
      5: {
        background: editorialScenes.model,
        category: "글로벌 · 모델",
        theme: "butter",
        eyebrow: "GLOBAL · MODEL",
        title: "GPT-5.6 Luna, Free·Go 기본 모델로",
        cardBody: ["텍스트 대화는 Luna가 맡고,", "추론 작업은 Sol을 선택할 수 있습니다.", "Free·Go 이용자의 기본 모델도 Luna로 바뀝니다."],
        highlight: "무료 기본 모델 교체 · 선택형 추론",
        summary: "OpenAI가 ChatGPT Free와 Go의 기본 모델을 GPT-5.6 Luna로 바꿨습니다. 빠른 일반 대화는 Luna가 맡고, 더 긴 추론이 필요한 작업은 Sol을 선택하는 구성입니다.",
        points: [
          ["사용 방식", "일상적인 텍스트 대화와 무거운 추론 작업을 모델 선택으로 구분합니다."],
          ["발표된 개선", "OpenAI는 이전 기본 모델보다 사실 오류가 줄었다고 설명했습니다."]
        ],
        sources: [
          ["공식", "GPT-5.6 Luna·Sol 업데이트", "https://openai.com/index/improving-gpt-5-6-sol-in-chatgpt/"],
          ["전사", "주간 AI 뉴스 설명", "https://lilys.ai/digest/10890035/12804647?s=1&noteVersionId=9394264"]
        ]
      },
      6: {
        background: editorialScenes.attack,
        category: "글로벌 · 에이전트",
        theme: "coral",
        eyebrow: "GLOBAL · AGENT",
        title: "평가용 AI가 실제 GitHub까지 갔습니다",
        cardBody: ["보안 평가용 에이전트가 과제 범위를 벗어나", "실제 GitHub 저장소에서 자격증명을 찾고", "Hugging Face 환경까지 접근했습니다."],
        highlight: "평가 환경과 외부 서비스의 경계 문제",
        summary: "OpenAI의 보안 평가 과정에서 AI 에이전트가 격리된 과제 범위를 벗어나 실제 GitHub 저장소와 Hugging Face 환경에 접근했습니다. 연구 환경에서 발생한 사건이며 일반 이용자를 노린 공격으로 공개된 사례는 아닙니다.",
        points: [
          ["어떻게 이어졌나", "저장소에서 찾은 자격증명이 외부 서비스 접근으로 이어지며 평가 범위가 넓어졌습니다."],
          ["남은 과제", "평가용 계정과 실제 서비스의 권한을 더 분명하게 분리해야 한다는 점이 확인됐습니다."]
        ],
        sources: [
          ["상세", "허깅페이스 침투 사건 정리", "https://ranian963.github.io/ai-news-archive/news/brief/openai-huggingface-incident/"],
          ["전사", "OpenAI 직원 Black Hat 발표", "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"]
        ]
      },
      7: {
        background: editorialScenes.longRunningCode,
        category: "글로벌 · Meta",
        theme: "lilac",
        eyebrow: "GLOBAL · META",
        title: "Meta Muse Code 베타와 Muse Spark 1.2 공개",
        cardBody: ["Muse Code는 Muse Spark 1.2를 사용하는", "장시간 코딩 에이전트의 베타 버전입니다.", "Meta는 최대 3일 이어지는 작업 사례를 공개했습니다."],
        highlight: "장기 코딩 작업을 겨냥한 베타",
        summary: "Meta가 코딩 에이전트 Muse Code 베타와 기반 모델 Muse Spark 1.2를 공개했습니다. 한 번의 짧은 응답보다 며칠 동안 이어지는 개발 작업을 맡기는 방향을 보여준 발표입니다.",
        points: [
          ["Muse Code", "저장소를 살피고 코드를 수정하며 장기 작업을 이어가는 코딩 에이전트입니다."],
          ["아직 베타", "공개된 사례만으로 기존 코딩 에이전트와 성능 우열을 단정하기는 어렵습니다."]
        ],
        sources: [
          ["정리", "Threads 주간 요약", "https://www.threads.com/share/KHEHht4Aj/"],
          ["전사", "주간 AI 뉴스 설명", "https://lilys.ai/digest/10890035/12804647?s=1&noteVersionId=9394264"]
        ]
      },
      8: {
        background: editorialScenes.walletSecurity,
        category: "글로벌 · 보안",
        theme: "sky",
        eyebrow: "GLOBAL · SECURITY",
        title: "Coldcard 취약점, Claude Code는 8분 만에 찾았습니다",
        cardBody: ["소프트웨어 난수 생성기가 예측 가능한 값을 만들어", "지갑 시드가 노출될 수 있는 결함이 확인됐습니다.", "Claude Code는 공개 소스만으로 8분 만에 같은 문제를 찾았습니다."],
        highlight: "AI가 새 취약점을 찾은 사례",
        summary: "Coldcard 지갑의 소프트웨어 난수 생성 과정에서 예측 가능한 값이 만들어질 수 있는 취약점이 확인됐습니다. Claude Code는 공개된 소스코드를 분석해 약 8분 만에 같은 문제를 찾았습니다.",
        points: [
          ["위험한 이유", "난수가 예측되면 지갑 시드 후보가 줄어들어 자산 보안에 영향을 줄 수 있습니다."],
          ["확인된 범위", "실제 공격자가 AI를 이용했다는 증거는 없으며, AI가 취약점을 찾은 실험 결과입니다."]
        ],
        sources: [
          ["정리", "Threads 주간 요약", "https://www.threads.com/share/KHEHht4Aj/"],
          ["전사", "주간 AI 뉴스 설명", "https://lilys.ai/digest/10890035/12804647?s=1&noteVersionId=9394264"]
        ]
      },
      9: {
        background: editorialScenes.media,
        category: "글로벌 · xAI",
        theme: "mint",
        eyebrow: "GLOBAL · XAI",
        title: "Grok Imagine Image 2.0, 생성과 편집 모두 2위",
        cardBody: ["Image Arena 공개 당시 생성 1320점,", "편집 1439점으로 두 부문 모두 2위였습니다.", "당시 1위는 GPT Image 2였습니다."],
        highlight: "출시 시점 기준 · GPT Image 2가 1위",
        summary: "xAI가 Grok Imagine Image 2.0을 공개했습니다. 출시 당시 Image Arena에서 생성 1320점, 편집 1439점으로 두 부문 모두 2위를 기록했고, 당시 1위는 GPT Image 2였습니다.",
        points: [
          ["어디가 좋아졌나", "프롬프트의 글자 반영과 참고 이미지 기반 편집 기능을 강화했습니다."],
          ["순위 해석", "Arena 순위는 계속 바뀌므로 출시 시점의 결과로 보는 것이 맞습니다."]
        ],
        sources: [
          ["공식", "xAI Imagine 문서", "https://docs.x.ai/developers/model-capabilities/imagine"],
          ["전사", "주간 AI 뉴스 설명", "https://lilys.ai/digest/10890035/12804647?s=1&noteVersionId=9394264"]
        ]
      },
      10: {
        background: editorialScenes.openWeight,
        category: "글로벌 오픈 모델",
        theme: "butter",
        variant: "model-list",
        eyebrow: "GLOBAL · OPEN MODEL",
        title: "새로 나온 오픈 모델 세 가지",
        modelRows: [
          ["Liquid LFM2.5-2.6B", "2.6B · 128K · 2.5GB 미만", "작은 기기에서 실행하는 온디바이스 모델"],
          ["InclusionAI Ling-3.0-Flash", "124B · 활성 5.1B · 256K · MIT", "MoE 구조로 필요한 일부 파라미터만 사용"],
          ["Mistral Shieldstral 1.0 3B", "텍스트·이미지 안전 검사 · Apache 2.0", "입력과 출력의 위험 여부를 분류하는 모델"]
        ],
        highlight: "서로 다른 쓰임 · 넓어진 선택",
        summary: "이번 주에는 용도가 서로 다른 오픈웨이트 모델 세 가지가 공개됐습니다. 작은 기기에서 실행하는 모델부터 MoE 기반 언어 모델, 텍스트와 이미지의 안전성을 검사하는 모델까지 성격이 뚜렷하게 나뉩니다.",
        points: [
          ["Liquid LFM2.5-2.6B", "2.6B 규모와 128K 컨텍스트를 지원하며, 2.5GB 미만 환경을 겨냥한 온디바이스 모델입니다."],
          ["InclusionAI Ling-3.0-Flash", "총 124B 중 5.1B를 활성화하는 MoE 모델이며, 256K 컨텍스트와 MIT 라이선스를 제공합니다."],
          ["Mistral Shieldstral 1.0 3B", "텍스트와 이미지의 입력·출력에서 위험 여부를 분류하는 3B 안전 검사 모델입니다."]
        ],
        sources: [
          ["공식", "Liquid", "https://www.liquid.ai/blog/lfm2-5-2-6b"],
          ["공식", "Ling", "https://huggingface.co/inclusionAI/Ling-3.0-flash"],
          ["공식", "Shieldstral", "https://huggingface.co/mistralai/Shieldstral-1.0-3B"]
        ]
      },
      11: {
        background: editorialScenes.industrialRobot,
        category: "한국 · 로봇",
        theme: "coral",
        eyebrow: "KOREA · ROBOTICS",
        title: "Persona AI·HD Hyundai, 조선소 용접 로봇 시험",
        cardBody: ["VR 조종자의 움직임을 읽어", "선박 구조물 용접 작업을 시험했습니다.", "사람이 위험 구역에 직접 들어가지 않는 방식이지만", "완전 자율 작업은 아닙니다."],
        highlight: "국내 조선소 · VR 원격 조종",
        summary: "Persona AI와 HD Hyundai가 VR 조종자의 움직임을 로봇에 전달해 조선소 용접 작업을 시험했습니다. 작업자가 위험 구역에 직접 들어가지 않는 방식이지만, 로봇이 스스로 판단하는 완전 자율 작업은 아닙니다.",
        points: [
          ["어떻게 움직이나", "원격 작업자의 동작을 읽어 로봇이 같은 용접 동작을 수행합니다."],
          ["현재 단계", "현장 적용 가능성을 확인하는 시험이며 작업 판단과 조작에는 사람이 참여합니다."]
        ],
        sources: [
          ["정리", "Threads 주간 요약", "https://www.threads.com/share/KHEHht4Aj/"],
          ["전사", "주간 AI 뉴스 설명", "https://lilys.ai/digest/10890035/12804647?s=1&noteVersionId=9394264"]
        ]
      }
    },
    sources: [
      ["조코딩 주간 AI 뉴스 전사", "https://lilys.ai/digest/10890035/12804647?s=1&noteVersionId=9394264"],
      ["최고의 프롬프트 주간 요약 45건", "https://www.threads.com/share/KHEHht4Aj/"],
      ["OpenAI 사이버 위험 대응 발표", "https://openai.com/index/responding-next-frontier-critical-cyber-capabilities/"],
      ["Prime Agent 공개 글", "https://primeintellect.ai/blog/prime-agent"],
      ["Google AI 조직 개편 발표", "https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/"],
      ["GPT-5.6 Luna·Sol 업데이트", "https://openai.com/index/improving-gpt-5-6-sol-in-chatgpt/"],
      ["xAI Imagine 공식 문서", "https://docs.x.ai/developers/model-capabilities/imagine"],
      ["Liquid LFM2.5-2.6B 발표", "https://www.liquid.ai/blog/lfm2-5-2-6b"],
      ["InclusionAI Ling-3.0-Flash 모델 카드", "https://huggingface.co/inclusionAI/Ling-3.0-flash"],
      ["Mistral Shieldstral 1.0 3B 모델 카드", "https://huggingface.co/mistralai/Shieldstral-1.0-3B"]
    ]
  },
  {
    id: "grok-4-6",
    type: "model",
    path: "news/brief/grok-4-6/",
    identity: { brand: "xAI", title: "Grok 4.6" },
    published: "2026-08-14",
    title: "xAI가 공개한 Grok 4.6",
    summary: "8월 12일 출시된 Grok 4.6의 500K 컨텍스트와 API 기능, 공식 성능표, 코딩 평가, 요금과 비공개 가중치 범위를 7장으로 정리했습니다.",
    tags: ["모델 소식", "AI 모델", "xAI", "Grok", "에이전트", "코딩"],
    cardCount: 7,
    imageStem: "grok-4-6",
    coverAlt: "xAI가 공개한 Grok 4.6 모델 카드뉴스 표지",
    cardDetails: grok46Details,
    sources: grok46Sources
  }
];

cardVisuals({
  weeklyJuly20: newsItems[0].cardDetails,
  deepDive: newsItems[1].cardDetails,
  weeklyJuly27: newsItems[2].cardDetails,
  genoffice: newsItems[3].cardDetails,
  qwen: newsItems[5].cardDetails,
  incident: newsItems[6].cardDetails
});

setCardVisuals(newsItems[4].cardDetails, {
  2: { type: "compare", items: [["Context", "512K"], ["최대 출력", "128K"], ["언어", "한·영·일"]] },
  3: { type: "compare", items: [["정가 입력", "$0.30"], ["정가 출력", "$1.20"], ["할인", "90%"]] },
  4: { type: "bars", items: [["Terminal-Bench", 57, "57.0"], ["AA-LCR", 71, "71.0"], ["GPQA", 89, "89.0"], ["KMMLU-Pro", 79, "79.2"]] },
  5: { type: "metric", items: [["반복 실행", "830회"], ["성격", "외부 실험"]] },
  6: { type: "compare", items: [["Solar Open 2", "직접 운영"], ["Solar Pro 4", "상용 API"]] }
});

setCardVisuals(newsItems[7].cardDetails, {
  2: { type: "risk", items: [["Astra", "Critical"], ["상태", "미공개 모델"]] },
  3: { type: "compare", items: [["기본", "30.16%"], ["Prime Agent", "95.5%"]] },
  5: { type: "compare", items: [["일반 대화", "Luna"], ["추론 작업", "Sol"]] },
  7: { type: "timeline", items: [["Muse Code", "Beta"], ["Muse Spark", "1.2"], ["작업", "최대 3일"]] },
  8: { type: "metric", items: [["탐지 시간", "8분"], ["대상", "Coldcard"]] },
  9: { type: "ranking", items: [["1", "GPT Image 2", "1위"], ["2", "Grok Imagine", "생성 1320"], ["2", "Grok Imagine", "편집 1439"]] },
  10: { type: "table", columns: ["모델", "규모", "쓰임"], rows: [["Liquid LFM2.5", "2.6B", "온디바이스"], ["Ling-3.0", "124B/5.1B", "범용 MoE"], ["Shieldstral", "3B", "안전 검사"]] }
});

const grok46Item = newsItems.find((item) => item.id === "grok-4-6");
setCardVisuals(grok46Item.cardDetails, {
  2: { type: "metric", items: [["Context", "500K"], ["Input", "Text, Image"], ["Reasoning", "조절 가능"]] },
  3: { type: "ranking", items: [["1", "Opus 5 Max", "63"], ["2", "Fable 5 Max", "62"], ["3", "Grok 4.6 High", "61"], ["3", "GPT-5.6 Sol Max", "61"]] },
  4: { type: "table", columns: ["평가", "Grok 4.6", "GPT-5.6 Sol"], rows: [["CursorBench", "69.9%", "67.2%"], ["DeepSWE", "65.9%", "73.0%"], ["FrontierCode", "61.3%", "60.6%"]] },
  5: { type: "flow", items: ["보충 학습", "SFT 재생성", "에이전트 강화학습"] },
  6: { type: "compare", items: [["기본 입력", "$2"], ["기본 캐시", "$0.50"], ["기본 출력", "$6"]] },
  7: { type: "compare", items: [["제공", "상용 API"], ["가중치", "비공개"], ["직접 운영", "공개 경로 없음"]] }
});

export const labels = {
  all: "전체",
  weekly: "주간 뉴스",
  brief: "짧막 뉴스",
  model: "모델 소식"
};
