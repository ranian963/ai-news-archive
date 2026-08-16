import { legacyCardCopy } from "./legacy-card-copy.mjs";
import { legacyCardSources } from "./legacy-card-sources.mjs";
import { dokpamoNewsItems } from "./dokpamo-news-data.mjs";

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

const modelReleasePresentations = {
  "kimi-k3": {
    order: [1, 2, 3, 5, 4, 6],
    backgrounds: [editorialScenes.longRunningCode, editorialScenes.moe, editorialScenes.agentEvaluation, editorialScenes.pricing, editorialScenes.openWeight, editorialScenes.longContext],
    sections: [["장기 작업 모델", "MOONSHOT AI | KIMI K3"], ["MoE 구조", "2.8T MIXTURE OF EXPERTS"], ["장기 작업 평가", "CODING | RESEARCH"], ["API 요금", "KIMI API"], ["가중치 공개", "OPEN WEIGHTS | KIMI LICENSE"], ["사용 전 확인", "LONG-RUNNING AGENT"]],
    visuals: {
      2: { type: "metric", items: [["전체", "2.8T"], ["활성", "104B"], ["Context", "1M"]] },
      3: { type: "bars", items: [["Terminal", 88.3, "88.3"], ["DeepSWE", 67.5, "67.5"], ["BrowseComp", 91.2, "91.2"], ["AA Index", 57, "57"]] },
      4: { type: "metric", items: [["캐시 입력", "$0.30"], ["일반 입력", "$3"], ["출력", "$15"]] },
      6: { type: "flow", items: ["검증된 하네스", "추론 기록 유지", "도구 권한 제한"] }
    }
  },
  "claude-opus-5": {
    order: [1, 3, 2, 4, 6, 5],
    backgrounds: [editorialScenes.organization, editorialScenes.longContext, editorialScenes.benchmark, editorialScenes.assistant, editorialScenes.selfHosting, editorialScenes.tokens],
    sections: [["프런티어 모델", "ANTHROPIC | CLAUDE OPUS 5"], ["긴 문서와 출력", "1M CONTEXT | 128K OUTPUT"], ["지식 업무 평가", "CODING | KNOWLEDGE WORK"], ["API 가격", "STANDARD | FAST MODE"], ["상용 제공 범위", "CLOSED WEIGHTS"], ["추론 설정", "EFFORT | COST | TIME"]],
    visuals: {
      2: { type: "metric", items: [["Context", "1M"], ["최대 출력", "128K"], ["입력", "Text, Image, PDF"]] },
      3: { type: "compare", items: [["AA max", "61"], ["AA high", "59"], ["ARC-AGI 3", "차순위의 3배"]] },
      4: { type: "metric", items: [["입력", "$5"], ["출력", "$25"], ["Fast", "$10 / $50"]] },
      6: { type: "compare", items: [["max", "최고 성능, 긴 시간"], ["high", "기본 균형"], ["medium", "짧은 작업"]] }
    }
  },
  "deepseek-v4-flash-0731": {
    order: [1, 4, 2, 3, 5, 6],
    backgrounds: [editorialScenes.tokens, editorialScenes.moe, editorialScenes.coding, editorialScenes.pricing, editorialScenes.openWeight, editorialScenes.agentEvaluation],
    sections: [["고속 오픈 모델", "DEEPSEEK | V4 FLASH"], ["경량 MoE", "284B TOTAL | 13B ACTIVE"], ["코딩 성능", "TERMINAL | DEEPSWE"], ["초저가 API", "CACHE | INPUT | OUTPUT"], ["MIT 가중치", "OPEN WEIGHTS"], ["토큰 사용량", "PRICE IS NOT TOTAL COST"]],
    visuals: {
      2: { type: "metric", items: [["전체", "284B"], ["활성", "13B"], ["Context", "1M"]] },
      3: { type: "bars", items: [["Terminal", 82.7, "82.7"], ["DeepSWE", 54.4, "54.4"], ["Toolathlon", 70.3, "70.3"], ["AA Index", 52, "52"]] },
      4: { type: "metric", items: [["캐시", "$0.0028"], ["입력", "$0.14"], ["출력", "$0.28"]] },
      6: { type: "compare", items: [["토큰 단가", "낮음"], ["AA 출력", "210M"], ["계산 기준", "작업당 총비용"]] }
    }
  },
  "qwen-3-8-max": {
    order: [1, 3, 2, 5, 4, 6],
    backgrounds: [editorialScenes.infrastructure, editorialScenes.moe, editorialScenes.benchmark, editorialScenes.pricing, editorialScenes.openWeight, editorialScenes.selfHosting],
    sections: [["중국 대형 모델", "ALIBABA | QWEN3.8-MAX"], ["대형 MoE", "2.4T TOTAL | 95B ACTIVE"], ["에이전트 평가", "LAUNCH RANKING | CURRENT RANKING"], ["API 요금", "QWEN CLOUD"], ["오픈 체크포인트", "QWEN LICENSE"], ["운영 장비", "OPEN DOES NOT MEAN SMALL"]],
    visuals: {
      2: { type: "metric", items: [["전체", "2.4T"], ["활성", "95B"], ["기본 Context", "262K"]] },
      3: { type: "timeline", items: [["8월 3일", "API 공개"], ["출시 직후", "Agentic Index 1위"], ["평가 갱신", "2위로 변경"], ["현재", "가중치 공개"]] },
      4: { type: "metric", items: [["입력", "$2"], ["출력", "$6"], ["캐시", "$0.17"]] },
      6: { type: "metric", items: [["전체", "2.4T"], ["4비트", "약 1.2TB"], ["실행", "분산 추론"]] }
    }
  },
  "muse-spark-1-2": {
    order: [1, 2, 6, 3, 4, 5],
    backgrounds: [editorialScenes.harness, editorialScenes.longRunningCode, editorialScenes.coding, editorialScenes.assistant, editorialScenes.selfHosting, editorialScenes.agentEvaluation],
    sections: [["코딩 모델", "META | MUSE SPARK 1.2"], ["공개된 사양 범위", "WHAT META DID NOT DISCLOSE"], ["장기 코딩 평가", "MODEL + MUSE CODE"], ["Muse Code 베타", "TERMINAL AGENT"], ["API 전용", "CLOSED WEIGHTS"], ["모델과 하네스", "SEPARATE THE EFFECTS"]],
    visuals: {
      2: { type: "risk", items: [["파라미터", "미공개"], ["Context", "미공개"], ["가중치", "비공개"]] },
      3: { type: "compare", items: [["Terminal 2.1", "공식 그래프"], ["DeepSWE 1.1", "공식 그래프"], ["Meta 평가", "내부 지표"]] },
      4: { type: "flow", items: ["Muse Code 설치", "Meta API 연결", "주 에이전트", "보조 에이전트"] },
      6: { type: "compare", items: [["모델", "Muse Spark 1.2"], ["하네스", "Muse Code"], ["확인", "팀 저장소 재현"]] }
    }
  },
  "gpt-5-6-cyber": {
    order: [1, 2, 4, 3, 6, 5],
    backgrounds: [editorialScenes.security, editorialScenes.attack, editorialScenes.defense, editorialScenes.walletSecurity, editorialScenes.selfHosting, editorialScenes.security],
    sections: [["보안 특화 모델", "OPENAI | GPT-5.6 CYBER"], ["모델 공개 범위", "BUILT ON GPT-5.6 SOL"], ["보안 평가", "EXPLOITGYM | EXPLOITBENCH"], ["승인제 접근", "DAYBREAK RED"], ["비공개 가중치", "RESTRICTED MODEL"], ["사건 구분", "HF INCIDENT | CYBER RELEASE"]],
    visuals: {
      2: { type: "flow", items: ["GPT-5.6 Sol", "보안 후속 학습", "GPT-5.6 Cyber", "Daybreak Red"] },
      3: { type: "compare", items: [["ExploitGym", "Cyber 우위"], ["취약점 탐색", "Cyber 우위"], ["보고서", "Sol 우위"], ["300턴 평가", "Sol 우위"]] },
      4: { type: "timeline", items: [["1", "신원 확인"], ["2", "사용 목적 심사"], ["3", "승인과 계정 보호"], ["4", "사용 모니터링"]] }
    }
  },
  "muse-glimmer-30b": {
    order: [1, 2, 4, 3, 5, 6],
    backgrounds: [editorialScenes.media, editorialScenes.media, editorialScenes.benchmark, editorialScenes.selfHosting, editorialScenes.openWeight, editorialScenes.assistant],
    sections: [["로컬 멀티모달", "META | MUSE GLIMMER 30B"], ["모델 구조", "DENSE MODEL | VISION ENCODER"], ["30B급 성능", "CODING | LONG CONTEXT"], ["메모리 요구량", "BF16 | K-QUANT"], ["Apache 2.0", "OPEN WEIGHTS"], ["로컬 에이전트 안전", "LOCAL DATA | TOOL PERMISSIONS"]],
    visuals: {
      2: { type: "metric", items: [["모델", "29.6B"], ["Context", "128K"], ["입력", "Text, Image"]] },
      3: { type: "bars", items: [["SWE Verified", 76, "76.0"], ["Terminal", 51.7, "51.7"], ["AA-LCR", 80, "80.0"], ["AIME", 94.7, "94.7"]] },
      4: { type: "compare", items: [["BF16", "55GB 이상"], ["4비트 LM", "20GB 미만"], ["목표 장비", "24GB / 32GB"]] },
      6: { type: "flow", items: ["로컬 실행", "도구 권한 제한", "되돌리기 전 확인", "행동 기록"] }
    }
  },
  "nemotron-3-5-lightning": {
    order: [1, 4, 2, 3, 6, 5],
    backgrounds: [editorialScenes.selfHosting, editorialScenes.moe, editorialScenes.agentEvaluation, editorialScenes.infrastructure, editorialScenes.license, editorialScenes.harness],
    sections: [["로컬 에이전트", "NVIDIA | NEMOTRON LIGHTNING"], ["하이브리드 MoE", "MAMBA-2 | MOE | ATTENTION"], ["전문 작업 평가", "SMALL ACTIVE MODEL"], ["단일 GPU 실행", "DGX SPARK | H100"], ["OpenMDW 1.1", "OPEN WEIGHTS"], ["시스템 구성", "PLAN | ROUTE | EXECUTE"]],
    visuals: {
      2: { type: "metric", items: [["전체", "30B"], ["활성", "3B"], ["Context", "1M"]] },
      3: { type: "bars", items: [["SWE Verified", 52.8, "52.80"], ["Terminal", 23.46, "23.46"], ["GPQA", 75.57, "75.57"], ["AA-LCR", 49.19, "49.19"]] },
      4: { type: "compare", items: [["소형 서버", "DGX Spark"], ["데이터센터", "H100"], ["PC", "RTX 5090"]] },
      6: { type: "flow", items: ["큰 모델이 계획", "Switchyard가 분배", "Lightning이 반복 작업", "결과 검토"] }
    }
  },
  "gemini-3-7-flash": {
    order: [1, 3, 4, 2, 5, 6],
    backgrounds: [editorialScenes.assistant, editorialScenes.longContext, editorialScenes.benchmark, editorialScenes.pricing, editorialScenes.selfHosting, editorialScenes.tokens],
    sections: [["API 모델", "GOOGLE | GEMINI 3.7 FLASH"], ["멀티모달 사양", "1M CONTEXT | MULTIMODAL"], ["코딩과 업무 평가", "FRONTIERCODE | DEEPSWE"], ["가격 변경", "LAUNCH PRICE | 2027 PRICE"], ["API 제공", "GOOGLE-HOSTED MODEL"], ["도입 전 계산", "PRICE WINDOW | TOTAL TOKENS"]],
    visuals: {
      2: { type: "metric", items: [["Context", "1M"], ["최대 출력", "65K"], ["입력", "멀티모달"]] },
      3: { type: "bars", items: [["FrontierCode", 43.6, "43.6"], ["DeepSWE", 65.3, "65.3"], ["WebDev", 79.4, "1588 Elo"], ["Automation", 30.4, "30.4"]] },
      4: { type: "timeline", items: [["2026년 말까지", "입력 $0.75, 출력 $3.75"], ["2027년 1월 1일", "입력 $1.50, 출력 $7.50"]] },
      6: {
        type: "price-shift",
        items: [["출시가", "2026년 12월 31일까지", "$0.75 / $3.75"], ["정가", "2027년 1월 1일부터", "$1.50 / $7.50"]],
        change: "입력과 출력 단가 모두 2배",
        total: "첫 요청 + 도구 호출 + 재시도"
      }
    }
  },
  "deepseek-v4-pro-0813": {
    order: [1, 3, 4, 2, 5, 6],
    backgrounds: [editorialScenes.coding, editorialScenes.moe, editorialScenes.agentEvaluation, editorialScenes.pricing, editorialScenes.openWeight, editorialScenes.longRunningCode],
    sections: [["대형 오픈 모델", "DEEPSEEK | V4 PRO 0813"], ["대형 MoE", "1.6T TOTAL | 49B ACTIVE"], ["에이전트 평가", "TERMINAL | DEEPSWE | TOOLS"], ["Flash와 가격 차이", "PRO API PRICE"], ["MIT 가중치", "OPEN WEIGHTS"], ["버전과 환각", "0813 | PREVIEW | INDEPENDENT TEST"]],
    visuals: {
      2: { type: "metric", items: [["전체", "1.6T"], ["활성", "49B"], ["Context", "1M"]] },
      3: { type: "bars", items: [["Terminal", 87.9, "87.9"], ["DeepSWE", 62.7, "62.7"], ["Toolathlon", 74.1, "74.1"], ["Automation", 31.8, "31.8"]] },
      4: { type: "compare", items: [["캐시", "$0.003625"], ["입력", "$0.435"], ["출력", "$0.87"]] },
      6: { type: "compare", items: [["정식 버전", "0813"], ["이전 결과", "프리뷰 구분"], ["확인 항목", "토큰과 환각"]] }
    }
  }
};

function modelReleaseDetails(model) {
  const [official, technical, analysis, reference] = model.sources;
  const sourceSet = (...items) => items.filter(Boolean);
  const subject = model.subject ?? `${model.brand}가`;
  const presentation = modelReleasePresentations[model.id] ?? {};
  const backgrounds = presentation.backgrounds ?? [];
  const sections = presentation.sections ?? [];
  const visuals = presentation.visuals ?? {};
  const section = (index, category, eyebrow) => ({
    category: sections[index - 1]?.[0] ?? category,
    eyebrow: sections[index - 1]?.[1] ?? eyebrow
  });
  const cards = {
    1: {
      background: backgrounds[0] ?? editorialScenes.model,
      ...section(1, "모델 출시", `${model.brand.toUpperCase()} | MODEL RELEASE`),
      theme: "mint",
      variant: "cover",
      title: `${subject} 공개한 ${model.name}`,
      cardBody: model.coverBody,
      highlight: `${model.releaseDateLabel} 출시 | ${model.accessLabel}`,
      summary: model.coverSummary,
      points: model.coverPoints,
      sources: sourceSet(official, reference)
    },
    2: {
      background: backgrounds[1] ?? model.specBackground ?? editorialScenes.longContext,
      ...section(2, "모델 사양", "MODEL SPECS"),
      theme: "sky",
      title: model.specTitle,
      cardBody: model.specBody,
      highlight: model.specHighlight,
      visual: visuals[2] ?? { type: "table", columns: ["항목", "공개 정보"], rows: model.specRows },
      summary: model.specSummary,
      points: model.specPoints,
      sources: sourceSet(technical, official)
    },
    3: {
      background: backgrounds[2] ?? editorialScenes.benchmark,
      ...section(3, "성능 평가", "BENCHMARKS"),
      theme: "lilac",
      title: model.benchmarkTitle,
      cardBody: model.benchmarkBody,
      highlight: model.benchmarkHighlight,
      visual: visuals[3] ?? { type: "table", columns: ["평가", "결과"], rows: model.benchmarkRows },
      summary: model.benchmarkSummary,
      points: model.benchmarkPoints,
      sources: sourceSet(analysis, official, technical)
    },
    4: {
      background: backgrounds[3] ?? editorialScenes.pricing,
      ...section(4, "가격과 이용 경로", "PRICE | ACCESS"),
      theme: "butter",
      title: model.accessTitle,
      cardBody: model.accessBody,
      highlight: model.accessHighlight,
      visual: visuals[4] ?? { type: "table", columns: ["항목", "내용"], rows: model.accessRows },
      summary: model.accessSummary,
      points: model.accessPoints,
      sources: sourceSet(official, technical, analysis)
    },
    5: {
      background: backgrounds[4] ?? (model.openWeight ? editorialScenes.openWeight : editorialScenes.selfHosting),
      ...section(5, "가중치와 라이선스", "WEIGHTS | LICENSE"),
      theme: "coral",
      title: model.licenseTitle,
      cardBody: model.licenseBody,
      highlight: model.licenseHighlight,
      visual: visuals[5] ?? { type: "compare", items: model.licenseRows },
      summary: model.licenseSummary,
      points: model.licensePoints,
      sources: sourceSet(technical, official)
    },
    6: {
      background: backgrounds[5] ?? editorialScenes.agentEvaluation,
      ...section(6, "읽을 때 확인할 점", "WHAT TO CHECK"),
      theme: "mint",
      title: model.caveatTitle,
      cardBody: model.caveatBody,
      highlight: model.caveatHighlight,
      visual: visuals[6],
      summary: model.caveatSummary,
      points: model.caveatPoints,
      sources: sourceSet(official, technical, analysis, reference)
    }
  };
  const order = presentation.order ?? [1, 2, 3, 4, 5, 6];
  return Object.fromEntries(order.map((cardNumber, index) => [index + 1, cards[cardNumber]]));
}

function modelReleaseItem(model) {
  const subject = model.subject ?? `${model.brand}가`;
  return {
    id: model.id,
    type: "model",
    path: `news/brief/${model.id}/`,
    identity: { brand: model.brand, title: model.name },
    published: model.published,
    title: `${subject} 공개한 ${model.name}`,
    summary: model.articleSummary,
    tags: ["모델 소식", "AI 모델", model.brand, model.openWeight ? "오픈웨이트" : "상용 API", ...model.tags],
    cardCount: 6,
    imageStem: model.id,
    coverAlt: `${subject} 공개한 ${model.name} 모델 카드뉴스 표지`,
    cardDetails: modelReleaseDetails(model),
    sources: model.sources.filter(Boolean).map(([, label, url]) => [label, url])
  };
}

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

const modelReleases = [
  {
    id: "kimi-k3",
    brand: "Moonshot AI",
    name: "Kimi K3",
    published: "2026-07-16",
    releaseDateLabel: "7월 16일",
    accessLabel: "오픈웨이트와 상용 API",
    openWeight: true,
    tags: ["중국 AI", "멀티모달", "에이전트", "코딩"],
    articleSummary: "7월 16일 공개된 Kimi K3의 2.8T MoE 구조와 1M 컨텍스트, 공식 성능표, API 요금, 가중치와 Kimi K3 라이선스 조건을 6장으로 정리했습니다.",
    coverBody: ["Moonshot AI는 7월 16일 Kimi K3를 공개했습니다.", "장시간 코딩과 지식 업무, 추론을 겨냥한 2.8T 멀티모달 모델입니다.", "API와 제품을 먼저 열었고 가중치는 7월 27일까지 공개했습니다."],
    coverSummary: "Kimi K3는 2026년 7월 16일 공개됐습니다. 텍스트와 이미지를 함께 다루며 장시간 이어지는 코딩, 연구와 지식 업무를 맡기는 방향으로 개발한 모델입니다.",
    coverPoints: [["출시 경로", "Kimi, Kimi Work, Kimi Code와 Kimi API에서 제공됩니다."], ["가중치", "Hugging Face에서 전체 가중치와 설정 파일을 받을 수 있습니다."]],
    specBackground: editorialScenes.moe,
    specTitle: "2.8T 중 104B를 쓰는 MoE 모델",
    specBody: ["전체 2.8T 중 토큰마다 104B가 계산에 참여합니다.", "텍스트와 이미지 입력, 1M 컨텍스트를 지원합니다."],
    specHighlight: "2.8T total | 104B active | 1M context",
    specRows: [["전체 / 활성", "2.8T / 104B"], ["Context", "1M"], ["입력", "텍스트, 이미지"], ["정밀도", "MXFP4 가중치"]],
    specSummary: "Kimi K3는 총 2.8T 파라미터 중 약 104B를 활성화하는 MoE 모델입니다. 896개 전문가 가운데 16개를 선택하며 1M 컨텍스트와 이미지 입력을 지원합니다.",
    specPoints: [["구조", "Kimi Delta Attention과 Attention Residuals를 사용합니다."], ["운영 규모", "공식 글은 64개 이상 가속기를 묶은 구성을 권장합니다."]],
    benchmarkTitle: "장기 코딩과 지식 업무에서 높은 점수",
    benchmarkBody: ["공식 평가는 모두 max 추론 설정으로 진행됐습니다.", "평가마다 Kimi Code, Claude Code 또는 Codex 하네스를 사용했습니다."],
    benchmarkHighlight: "Terminal-Bench 88.3 | DeepSWE 67.5 | AA 57",
    benchmarkRows: [["Terminal-Bench 2.1", "88.3"], ["DeepSWE", "67.5"], ["BrowseComp", "91.2"], ["AA Intelligence Index", "57"]],
    benchmarkSummary: "Kimi K3는 공식 표에서 Terminal-Bench 2.1 88.3, DeepSWE 67.5를 기록했습니다. Artificial Analysis 지수는 8월 14일 확인 기준 57점입니다.",
    benchmarkPoints: [["비교 조건", "벤치마크마다 사용한 하네스가 달라 모델 점수만으로 읽기 어렵습니다."], ["제조사 평가", "Moonshot AI도 전체 사용 경험은 Claude Fable 5와 GPT-5.6 Sol보다 뒤진다고 적었습니다."]],
    accessTitle: "API는 입력 $3, 출력 $15",
    accessBody: ["1M 토큰당 캐시 미적용 입력 $3, 출력 $15입니다.", "캐시가 적중한 입력은 $0.30입니다."],
    accessHighlight: "Cache $0.30 | Input $3 | Output $15",
    accessRows: [["캐시 입력", "$0.30 / 1M"], ["일반 입력", "$3 / 1M"], ["출력", "$15 / 1M"]],
    accessSummary: "Kimi 공식 API는 1M 토큰당 캐시 입력 0.30달러, 일반 입력 3달러, 출력 15달러입니다. API 모델명은 kimi-k3입니다.",
    accessPoints: [["제품", "Kimi 앱, Kimi Work와 Kimi Code에서도 같은 모델을 선택할 수 있습니다."], ["자체 운영", "가중치는 공개됐지만 2.8T 전체를 저장하고 나눠 돌릴 장비가 필요합니다."]],
    licenseTitle: "가중치는 공개됐지만 자체 라이선스입니다",
    licenseBody: ["가중치와 코드는 Kimi K3 License로 공개됐습니다.", "대규모 서비스와 상용 제품에는 별도 조건이 붙습니다."],
    licenseHighlight: "Open weights | Kimi K3 License | 대규모 상용 조건",
    licenseRows: [["가중치", "공개"], ["라이선스", "Kimi K3"], ["로컬 실행", "대형 장비 필요"]],
    licenseSummary: "Kimi K3는 오픈웨이트 모델이지만 MIT나 Apache 2.0은 아닙니다. 일정 매출을 넘는 모델 서비스와 대규모 상용 제품에는 별도 계약이나 모델명 표시 조건이 있습니다.",
    licensePoints: [["모델 서비스", "연 매출 2천만 달러를 넘는 Model as a Service 사업자는 상용 이용 전에 별도 계약이 필요합니다."], ["대규모 제품", "월간 이용자 1억 명 또는 월 매출 2천만 달러를 넘으면 Kimi K3 이름을 표시해야 합니다."]],
    caveatTitle: "긴 작업일수록 하네스와 권한을 함께 봐야 합니다",
    caveatBody: ["이전 추론 기록을 빠뜨리거나 대화 중 모델을 바꾸면 품질이 흔들릴 수 있습니다.", "애매한 상황에서 사용자를 대신해 예상 밖의 결정을 내릴 수 있다고 공식 글이 경고합니다."],
    caveatHighlight: "추론 기록 보존 | 과도한 선제 행동 주의",
    caveatSummary: "Moonshot AI는 Kimi K3가 보존된 추론 기록에 민감하며, 작은 문제나 애매한 지시에서 사용자 대신 결정을 내릴 수 있다고 밝혔습니다.",
    caveatPoints: [["세션 유지", "검증된 하네스를 쓰고 진행 중인 대화에서 다른 모델로 바꾸지 않는 편을 권장합니다."], ["행동 범위", "파일 수정이나 외부 도구 사용 권한은 작업에 필요한 수준으로 제한해야 합니다."]],
    sources: [["공식", "Kimi K3 발표", "https://www.kimi.com/blog/kimi-k3"], ["공식", "Kimi K3 모델 카드", "https://huggingface.co/moonshotai/Kimi-K3"], ["분석", "Artificial Analysis", "https://artificialanalysis.ai/models/kimi-k3"], ["참고", "GeekNews 정리", "https://news.hada.io/topic?id=31502"]]
  },
  {
    id: "claude-opus-5",
    brand: "Anthropic",
    subject: "Anthropic이",
    name: "Claude Opus 5",
    published: "2026-07-24",
    releaseDateLabel: "7월 24일",
    accessLabel: "상용 API",
    openWeight: false,
    tags: ["Claude", "에이전트", "코딩", "지식 업무"],
    articleSummary: "7월 24일 출시된 Claude Opus 5의 1M 컨텍스트와 128K 출력, 코딩과 지식 업무 평가, API 가격과 비공개 가중치 범위를 6장으로 정리했습니다.",
    coverBody: ["Anthropic은 7월 24일 Claude Opus 5를 출시했습니다.", "복잡한 에이전트 코딩과 기업 지식 업무에 맞춘 상용 모델입니다.", "Claude Max의 기본 모델이며 Claude Pro에서 가장 강한 모델로 제공됩니다."],
    coverSummary: "Claude Opus 5는 2026년 7월 24일 출시됐습니다. Anthropic은 Fable 5에 가까운 성능을 절반 수준의 작업 비용으로 제공하는 일상형 고성능 모델로 소개했습니다.",
    coverPoints: [["제공 경로", "Claude API, Amazon Bedrock, Google Cloud와 Microsoft Foundry에서 사용할 수 있습니다."], ["앱", "Claude Max의 기본 모델이며 Claude Pro에서도 선택할 수 있습니다."]],
    specTitle: "1M 컨텍스트와 최대 128K 출력",
    specBody: ["1M 컨텍스트가 기본이며 별도 베타 헤더가 필요하지 않습니다.", "최대 출력은 128K이고 추론은 기본으로 켜집니다."],
    specHighlight: "1M context | 128K output | thinking 기본",
    specRows: [["Context", "1M"], ["최대 출력", "128K"], ["입력", "텍스트, 이미지, PDF"], ["파라미터", "비공개"]],
    specSummary: "Claude Opus 5는 1M 컨텍스트와 최대 128K 출력을 지원합니다. 텍스트와 이미지, PDF 입력과 도구 호출을 제공하지만 파라미터 수는 공개하지 않았습니다.",
    specPoints: [["추론 설정", "low부터 max까지 effort를 조절할 수 있으며 기본값은 high입니다."], ["API 모델명", "claude-opus-5를 사용합니다."]],
    benchmarkTitle: "코딩과 지식 업무 평가에서 상위권",
    benchmarkBody: ["Anthropic은 Frontier-Bench v0.1에서 공개 모델 가운데 가장 높은 결과라고 설명했습니다.", "Artificial Analysis 지수는 추론 설정에 따라 점수가 달라집니다."],
    benchmarkHighlight: "AA 61 max | Frontier-Bench 선두 | ARC-AGI 3",
    benchmarkRows: [["AA Index max", "61"], ["AA Index high", "59"], ["ARC-AGI 3", "차순위의 3배"], ["AutomationBench", "동일 비용 차순위의 약 1.5배"]],
    benchmarkSummary: "Claude Opus 5는 Artificial Analysis에서 max 61점, high 59점을 기록했습니다. Anthropic은 Frontier-Bench v0.1 선두와 ARC-AGI 3의 큰 격차를 함께 공개했습니다.",
    benchmarkPoints: [["평가 범위", "ARC-AGI 3와 AutomationBench 수치는 Anthropic이 공개한 제조사 평가입니다."], ["비용 대비", "CursorBench에서는 max 설정이 Fable 5 최고 점수와 0.5% 이내였다고 설명합니다."]],
    accessTitle: "기본 API 요금은 입력 $5, 출력 $25",
    accessBody: ["1M 토큰당 입력 $5, 출력 $25로 Opus 4.8과 같습니다.", "빠른 처리 모드는 입력 $10, 출력 $50입니다."],
    accessHighlight: "Input $5 | Output $25 | Fast $10 / $50",
    accessRows: [["기본 입력", "$5 / 1M"], ["기본 출력", "$25 / 1M"], ["Fast mode", "$10 / $50"]],
    accessSummary: "Claude Opus 5의 기본 API 요금은 1M 토큰당 입력 5달러, 출력 25달러입니다. 연구 미리보기인 Fast mode는 입력 10달러, 출력 50달러입니다.",
    accessPoints: [["비용 조절", "effort를 낮추면 추론 토큰과 대기 시간을 줄일 수 있습니다."], ["클라우드", "Anthropic API 외에 주요 클라우드 세 곳에서도 제공됩니다."]],
    licenseTitle: "API 전용이며 가중치는 공개되지 않았습니다",
    licenseBody: ["모델 가중치와 전체 구조, 파라미터 수는 공개되지 않았습니다.", "직접 내려받아 사내 서버에서 실행하는 방식은 제공하지 않습니다."],
    licenseHighlight: "Proprietary | API 전용 | 가중치 비공개",
    licenseRows: [["가중치", "비공개"], ["파라미터", "비공개"], ["직접 운영", "지원 안 함"]],
    licenseSummary: "Claude Opus 5는 Anthropic이 운영하는 상용 모델입니다. API와 파트너 클라우드로 이용할 수 있지만 가중치나 직접 운영용 라이선스는 제공되지 않습니다.",
    licensePoints: [["기업 데이터", "배포 지역과 데이터 보관 조건은 선택한 API 또는 클라우드 계약을 확인해야 합니다."], ["모델 교체", "Opus 4.8과 가격은 같지만 추론이 기본으로 켜지는 등 동작 차이가 있습니다."]],
    caveatTitle: "최대 점수와 실제 비용을 함께 비교해야 합니다",
    caveatBody: ["max 설정은 점수가 높지만 답변까지 걸리는 시간과 토큰 사용량도 늘어납니다.", "실제 업무에서는 high와 medium을 함께 시험하는 편이 좋습니다."],
    caveatHighlight: "점수는 effort별로 다름 | 업무별 비용 확인",
    caveatSummary: "Claude Opus 5는 effort를 높일수록 성능이 좋아지지만 비용과 시간이 함께 늘어납니다. 최대 점수 하나보다 실제 프롬프트의 완료율과 비용을 비교해야 합니다.",
    caveatPoints: [["기능 차이", "Opus 5에서는 web fetch와 Priority Tier를 지원하지 않습니다."], ["마이그레이션", "xhigh와 max에서는 추론을 끌 수 없어 기존 Opus 4.8 요청을 다시 확인해야 합니다."]],
    sources: [["공식", "Claude Opus 5 발표", "https://www.anthropic.com/news/claude-opus-5"], ["공식", "Claude Opus 5 개발자 문서", "https://platform.claude.com/docs/en/about-claude/models/whats-new-claude-4-8"], ["분석", "Artificial Analysis", "https://artificialanalysis.ai/models/claude-opus-5"], ["참고", "GeekNews 관련 글", "https://news.hada.io/topic?id=31807"]]
  },
  {
    id: "deepseek-v4-flash-0731",
    brand: "DeepSeek",
    name: "DeepSeek V4 Flash 0731",
    published: "2026-07-31",
    releaseDateLabel: "7월 31일",
    accessLabel: "MIT 오픈웨이트와 API",
    openWeight: true,
    tags: ["중국 AI", "코딩", "에이전트", "MoE"],
    articleSummary: "7월 31일 정식 공개된 DeepSeek V4 Flash 0731의 284B/13B 구조와 1M 컨텍스트, 코딩 평가, API 요금과 MIT 가중치를 6장으로 정리했습니다.",
    coverBody: ["DeepSeek는 7월 31일 V4 Flash 0731을 정식 공개했습니다.", "프리뷰를 교체한 고속 모델로 코딩과 도구 사용 성능을 크게 높였습니다.", "API와 MIT 라이선스 가중치를 함께 제공합니다."],
    coverSummary: "DeepSeek V4 Flash 0731은 2026년 7월 31일 정식 공개됐습니다. 적은 활성 파라미터와 추측 디코딩을 이용해 속도와 에이전트 성능을 함께 노린 모델입니다.",
    coverPoints: [["정식 버전", "프리뷰를 대체하며 DeepSeek Harness의 최소 설정으로 코딩 평가를 진행했습니다."], ["제공 방식", "DeepSeek API와 Hugging Face 가중치를 모두 제공합니다."]],
    specBackground: editorialScenes.moe,
    specTitle: "284B 중 13B를 쓰는 경량 MoE",
    specBody: ["전체 284B 중 토큰마다 13B가 계산에 참여합니다.", "1M 컨텍스트와 최대 384K 출력을 지원합니다."],
    specHighlight: "284B total | 13B active | 1M context",
    specRows: [["전체 / 활성", "284B / 13B"], ["Context", "1M"], ["최대 출력", "384K"], ["추론", "low, high, max"]],
    specSummary: "DeepSeek V4 Flash는 총 284B, 활성 13B 규모의 MoE 모델입니다. API 문서는 1M 컨텍스트와 최대 384K 출력을 안내합니다.",
    specPoints: [["속도 기능", "정식 체크포인트에는 DSpark 추측 디코딩 모듈이 붙어 있습니다."], ["실행 예시", "공식 vLLM 예시는 GB300 GPU 4장을 사용합니다."]],
    benchmarkTitle: "Flash급이지만 코딩 에이전트 점수가 높습니다",
    benchmarkBody: ["공식 표에서 Terminal-Bench 2.1은 82.7점입니다.", "Artificial Analysis 지수는 52점이며 출력 토큰 사용량도 많았습니다."],
    benchmarkHighlight: "Terminal 82.7 | DeepSWE 54.4 | AA 52",
    benchmarkRows: [["Terminal-Bench 2.1", "82.7"], ["DeepSWE", "54.4"], ["Toolathlon", "70.3"], ["AA Intelligence Index", "52"]],
    benchmarkSummary: "공식 평가에서 Terminal-Bench 2.1 82.7, DeepSWE 54.4를 기록했습니다. Artificial Analysis는 max 설정에 52점을 부여했습니다.",
    benchmarkPoints: [["평가 설정", "코딩 평가는 DeepSeek Harness와 max 추론 설정을 사용했습니다."], ["토큰 사용", "Artificial Analysis 평가에서는 210M 출력 토큰을 사용해 동급 중앙값보다 길었습니다."]],
    accessTitle: "입력 $0.14, 출력 $0.28",
    accessBody: ["1M 토큰당 일반 입력 $0.14, 출력 $0.28입니다.", "캐시 적중 입력은 $0.0028입니다."],
    accessHighlight: "Cache $0.0028 | Input $0.14 | Output $0.28",
    accessRows: [["캐시 입력", "$0.0028 / 1M"], ["일반 입력", "$0.14 / 1M"], ["출력", "$0.28 / 1M"]],
    accessSummary: "DeepSeek 공식 API 요금은 1M 토큰당 캐시 입력 0.0028달러, 일반 입력 0.14달러, 출력 0.28달러입니다.",
    accessPoints: [["API 모델명", "deepseek-v4-flash를 사용하며 thinking과 non-thinking을 모두 지원합니다."], ["가격 변동", "DeepSeek는 가격을 조정할 수 있으므로 운영 전 최신 요금표를 확인해야 합니다."]],
    licenseTitle: "MIT 가중치를 공개했습니다",
    licenseBody: ["가중치와 저장소는 MIT 라이선스로 공개됐습니다.", "로컬 실행도 가능하지만 전체 가중치를 올릴 장비가 필요합니다."],
    licenseHighlight: "Open weights | MIT | 대형 GPU 구성 필요",
    licenseRows: [["가중치", "공개"], ["라이선스", "MIT"], ["공식 실행 예", "4×GB300"]],
    licenseSummary: "DeepSeek V4 Flash 0731은 MIT 오픈웨이트 모델입니다. 소프트웨어 이용 조건은 단순하지만 284B 전체 가중치와 긴 컨텍스트를 처리할 GPU 메모리는 별도 문제입니다.",
    licensePoints: [["배포 도구", "vLLM과 SGLang용 DSpark 설정을 공식 모델 카드가 제공합니다."], ["직접 운영", "압축 정밀도와 KV 캐시, 동시 요청 수에 따라 실제 메모리 요구량이 달라집니다."]],
    caveatTitle: "낮은 토큰 가격이 짧은 작업을 뜻하지는 않습니다",
    caveatBody: ["Artificial Analysis 평가에서는 출력 토큰을 많이 사용했습니다.", "완료율뿐 아니라 작업당 토큰, 시간과 총비용을 함께 봐야 합니다."],
    caveatHighlight: "AA 출력 210M | 속도 120 tok/s | 총비용 확인",
    caveatSummary: "DeepSeek V4 Flash는 토큰 단가는 낮고 출력 속도는 빠르지만, max 추론 평가에서는 응답 길이가 길었습니다. 실제 업무 비용은 한 건을 끝내는 데 쓴 총토큰으로 계산해야 합니다.",
    caveatPoints: [["벤치마크", "일부 DSBench 수치는 DeepSeek 내부 평가라 공개 벤치마크와 구분해야 합니다."], ["하네스", "다른 도구와 프롬프트를 쓰면 공식 코딩 점수가 그대로 재현되지 않을 수 있습니다."]],
    sources: [["공식", "DeepSeek 변경 내역", "https://api-docs.deepseek.com/updates"], ["공식", "DeepSeek V4 Flash 모델 카드", "https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731"], ["분석", "Artificial Analysis", "https://artificialanalysis.ai/models/deepseek-v4-flash"], ["참고", "GeekNews 정리", "https://news.hada.io/topic?id=32016"]]
  },
  {
    id: "muse-spark-1-2",
    brand: "Meta",
    name: "Muse Spark 1.2",
    published: "2026-08-05",
    releaseDateLabel: "8월 5일",
    accessLabel: "Meta API 전용",
    openWeight: false,
    tags: ["코딩", "에이전트", "Muse Code"],
    articleSummary: "8월 5일 공개된 Muse Spark 1.2와 Muse Code 베타의 장기 코딩 방식, 공개된 평가 범위, API 제공 방식과 아직 공개되지 않은 사양을 6장으로 정리했습니다.",
    coverBody: ["Meta는 8월 5일 Muse Spark 1.2를 공개했습니다.", "대형 저장소와 장시간 코딩 작업에 맞춘 API 전용 모델입니다.", "터미널 에이전트 Muse Code 베타의 기반 모델로 먼저 제공됩니다."],
    coverSummary: "Muse Spark 1.2는 2026년 8월 5일 공개된 코딩 중심 모델입니다. Meta는 모델과 Muse Code를 함께 학습해 장기 개발 작업과 여러 보조 에이전트의 협업을 강화했다고 설명했습니다.",
    coverPoints: [["Muse Code", "macOS와 Linux에서 설치하는 터미널 코딩 에이전트의 베타 버전입니다."], ["제공 상태", "Meta Model API에서 이용하며 가중치는 공개되지 않았습니다."]],
    specBackground: editorialScenes.longRunningCode,
    specTitle: "장기 코딩과 여러 보조 에이전트에 맞춘 모델",
    specBody: ["코드 생성과 복잡한 디버깅, 저장소 이해를 강화했습니다.", "파라미터 수와 정확한 컨텍스트 길이는 출시 글에 적지 않았습니다."],
    specHighlight: "코딩 중심 | 장기 작업 | 세부 사양 미공개",
    specRows: [["파라미터", "공식 발표 미기재"], ["Context", "공식 발표 미기재"], ["제공", "Meta Model API"], ["가중치", "비공개"]],
    specSummary: "Meta는 Muse Spark 1.2의 파라미터 수와 정확한 컨텍스트 길이를 출시 글에 공개하지 않았습니다. 공개된 설명은 장기 코딩과 저장소 이해, 도구 사용 개선에 집중합니다.",
    specPoints: [["학습", "Muse Code의 작업 기록과 압축, 보조 에이전트 사용 방식을 함께 학습했습니다."], ["작업 지속", "로컬 이벤트 기록을 이용해 중단 뒤에도 Muse Code 작업을 이어갈 수 있습니다."]],
    benchmarkTitle: "코딩 평가는 공개했지만 조건을 함께 봐야 합니다",
    benchmarkBody: ["Meta는 Terminal-Bench 2.1과 DeepSWE 1.1, 내부 코딩 평가를 공개했습니다.", "Muse Code와 함께 실행한 결과라 모델만의 점수로 보기는 어렵습니다."],
    benchmarkHighlight: "Terminal-Bench | DeepSWE | Meta 내부 평가",
    benchmarkRows: [["Terminal-Bench 2.1", "공식 그래프"], ["DeepSWE 1.1", "공식 그래프"], ["Meta Coding Bench", "내부 평가"], ["실행 환경", "Muse Code"]],
    benchmarkSummary: "Meta는 Muse Spark 1.2의 성능을 Terminal-Bench 2.1, DeepSWE 1.1과 내부 코딩 평가로 제시했습니다. 다만 Muse Code 하네스와 함께 측정한 결과입니다.",
    benchmarkPoints: [["장시간 사례", "GPU 커널 최적화는 1천 회가 넘는 도구 호출과 최대 24시간 실행으로 시험했습니다."], ["독립 평가", "실제 저장소와 팀 도구에서의 비용과 성공률은 별도 확인이 필요합니다."]],
    accessTitle: "Muse Code 베타와 Meta API에서 제공합니다",
    accessBody: ["Muse Code는 베타이며 macOS와 Linux에서 설치할 수 있습니다.", "출시 글에는 Muse Spark 1.2의 토큰 가격을 적지 않았습니다."],
    accessHighlight: "Muse Code beta | Meta Model API | 가격 미기재",
    accessRows: [["터미널 도구", "Muse Code beta"], ["API", "Meta Model API"], ["가격", "출시 글 미기재"]],
    accessSummary: "Muse Spark 1.2는 Muse Code 베타와 Meta Model API를 통해 제공됩니다. 모델별 토큰 가격은 출시 글에 없어 실제 사용 전 콘솔 요금표를 확인해야 합니다.",
    accessPoints: [["설치", "Muse Code는 macOS와 Linux용 설치 명령을 제공합니다."], ["앱 구조", "주 에이전트와 세션 동안 유지되는 보조 에이전트가 함께 작업합니다."]],
    licenseTitle: "API 전용이며 가중치는 공개되지 않았습니다",
    licenseBody: ["Muse Spark 1.2는 Meta가 운영하는 상용 모델입니다.", "다운로드 가능한 모델 가중치와 직접 운영용 라이선스는 없습니다."],
    licenseHighlight: "Proprietary | API 전용 | 가중치 비공개",
    licenseRows: [["가중치", "비공개"], ["파라미터", "비공개"], ["직접 운영", "지원 안 함"]],
    licenseSummary: "Muse Spark 1.2는 오픈웨이트 모델이 아닙니다. Muse Code나 Meta Model API에서 호출하며 로컬 서버에 가중치를 내려받아 실행할 수 없습니다.",
    licensePoints: [["구분", "8월 10일 공개된 Muse Glimmer 30B는 Apache 2.0 오픈웨이트 모델로 Muse Spark 1.2와 다릅니다."], ["데이터", "기업 코드와 로그 보관 조건은 Meta API 계약을 확인해야 합니다."]],
    caveatTitle: "모델과 하네스의 효과를 나눠서 봐야 합니다",
    caveatBody: ["공개된 장기 작업 사례는 Muse Spark 1.2와 Muse Code를 묶어 실행한 결과입니다.", "다른 코딩 도구에서 같은 결과가 나오는지는 별도 시험이 필요합니다."],
    caveatHighlight: "모델 + Muse Code 결과 | 독립 재현 필요",
    caveatSummary: "Muse Spark 1.2 발표는 모델과 Muse Code를 함께 소개합니다. 성능 개선 가운데 모델 학습과 에이전트 실행 방식이 각각 얼마나 기여했는지는 공개 자료만으로 나누기 어렵습니다.",
    caveatPoints: [["베타", "Muse Code는 아직 베타라 기능과 가격, 지원 환경이 바뀔 수 있습니다."], ["평가", "팀 저장소에서 완료율과 수정 품질, 토큰 비용을 직접 비교하는 편이 좋습니다."]],
    sources: [["공식", "Meta Muse Spark 1.2 발표", "https://research.meta.ai/blog/introducing-muse-code-and-muse-spark-1-2"], ["분석", "Artificial Analysis 모델 페이지", "https://artificialanalysis.ai/models/muse-spark-1-2"], ["분석", "Artificial Analysis 해설", "https://artificialanalysis.ai/articles/muse-spark-1-2"], ["참고", "GeekNews 정리", "https://news.hada.io/topic?id=32213"]]
  },
  {
    id: "gpt-5-6-cyber",
    brand: "OpenAI",
    name: "GPT-5.6 Cyber",
    published: "2026-08-10",
    releaseDateLabel: "8월 10일",
    accessLabel: "승인 사용자 전용",
    openWeight: false,
    tags: ["사이버 보안", "Daybreak", "취약점"],
    articleSummary: "8월 10일 공개된 GPT-5.6 Cyber의 Daybreak Red 접근 조건, ExploitGym과 내부 취약점 평가, 공개되지 않은 사양과 보안 제한을 6장으로 정리했습니다.",
    coverBody: ["OpenAI는 8월 10일 GPT-5.6 Cyber를 공개했습니다.", "GPT-5.6 Sol을 보안 연구에 맞게 추가 학습한 승인 사용자 전용 모델입니다.", "일반 API가 아니라 Daybreak Red에서만 제공합니다."],
    coverSummary: "GPT-5.6 Cyber는 2026년 8월 10일 공개된 사이버 보안 전용 모델입니다. 승인받은 방어 연구자가 취약점 연구와 공격 검증에 쓰도록 Daybreak Red에서 제한적으로 제공합니다.",
    coverPoints: [["대상", "승인된 개인과 조직의 합법적인 방어 연구와 보안 시험에 한정합니다."], ["기반 모델", "GPT-5.6 Sol을 바탕으로 제로데이 탐색과 익스플로잇 개발을 추가 학습했습니다."]],
    specBackground: editorialScenes.security,
    specTitle: "GPT-5.6 Sol 기반의 보안 특화 모델",
    specBody: ["취약점 탐색과 익스플로잇 체인 개발을 강화했습니다.", "파라미터 수와 컨텍스트, 일반 API 가격은 공개하지 않았습니다."],
    specHighlight: "GPT-5.6 Sol 기반 | Daybreak Red | 사양 비공개",
    specRows: [["기반", "GPT-5.6 Sol"], ["파라미터", "비공개"], ["Context", "비공개"], ["일반 API", "제공 안 함"]],
    specSummary: "OpenAI는 GPT-5.6 Cyber가 GPT-5.6 Sol을 바탕으로 보안 작업을 추가 학습한 모델이라고 밝혔습니다. 파라미터 수와 컨텍스트 길이, 토큰 가격은 공개하지 않았습니다.",
    specPoints: [["강화한 영역", "알려진 취약점을 작동하는 익스플로잇으로 만들고 새 취약점의 심각도를 판단하는 작업입니다."], ["공개 예정", "추가 평가를 담은 시스템 카드는 나중에 공개할 예정입니다."]],
    benchmarkTitle: "보안 평가마다 GPT-5.6 Sol과 결과가 달랐습니다",
    benchmarkBody: ["ExploitGym에서는 GPT-5.6 Sol과 GPT-5.5 Cyber보다 높았습니다.", "취약점 보고서와 300턴 ExploitBench에서는 Sol이 더 좋았습니다."],
    benchmarkHighlight: "ExploitGym 우위 | 보고서와 300턴 ExploitBench는 Sol 우위",
    benchmarkRows: [["ExploitGym", "Cyber 우위"], ["신규 취약점 내부 평가", "Cyber 우위"], ["취약점 보고서", "Sol 우위"], ["ExploitBench 300턴", "Sol 우위"]],
    benchmarkSummary: "GPT-5.6 Cyber는 ExploitGym과 OpenAI의 신규 취약점 내부 평가에서 GPT-5.6 Sol보다 높았습니다. 반면 보고서 품질 평가와 300턴 ExploitBench에서는 Sol이 더 좋은 결과를 냈습니다.",
    benchmarkPoints: [["이유", "Cyber가 더 짧은 보고서를 쓰는 경향이 있어 보고서 평가 점수가 낮았다고 OpenAI는 설명합니다."], ["토큰", "Cyber는 Sol보다 추론 예산을 더 많이 쓰는 경향이 있습니다."]],
    accessTitle: "Daybreak Red 승인 뒤에만 사용할 수 있습니다",
    accessBody: ["일반 ChatGPT나 공개 API에서 선택하는 모델이 아닙니다.", "신원 확인과 승인 용도, 계정 보안과 모니터링을 거칩니다."],
    accessHighlight: "Approved access | Daybreak Red | 일반 요금 미공개",
    accessRows: [["접근", "승인제"], ["용도", "합법적 보안 연구"], ["가격", "공개 안 됨"]],
    accessSummary: "GPT-5.6 Cyber는 Daybreak Red 승인을 받은 개인과 조직만 사용할 수 있습니다. 일반 API 토큰 요금은 공개되지 않았습니다.",
    accessPoints: [["권한", "신원 확인, 계정 보안, 사용 범위 확인과 법적 동의가 필요합니다."], ["권장 순서", "대부분의 방어 작업은 GPT-5.6 Sol을 쓰는 Daybreak Blue부터 시작하라고 안내합니다."]],
    licenseTitle: "비공개 모델이며 가중치를 제공하지 않습니다",
    licenseBody: ["모델 가중치와 직접 운영용 라이선스는 공개되지 않았습니다.", "OpenAI가 관리하는 제한된 환경에서만 접근할 수 있습니다."],
    licenseHighlight: "Proprietary | 승인제 | 가중치 비공개",
    licenseRows: [["가중치", "비공개"], ["일반 API", "없음"], ["접근", "Daybreak Red"]],
    licenseSummary: "GPT-5.6 Cyber는 비공개 상용 모델입니다. 승인된 Daybreak 환경에서만 이용하며 자체 서버에 배포할 가중치나 라이선스는 없습니다.",
    licensePoints: [["격리", "OpenAI는 보안 작업을 민감한 운영 시스템과 공개 인터넷에서 분리하라고 권장합니다."], ["검토", "권한 상승이 필요한 Codex 동작은 auto-review로 확인하도록 안내합니다."]],
    caveatTitle: "허깅페이스 침투 사건에 쓰인 모델은 아닙니다",
    caveatBody: ["OpenAI는 GPT-5.6 Cyber가 허깅페이스 침투 사건에 관여하지 않았다고 명시했습니다.", "보안 능력이 높아진 만큼 사용 범위와 사람의 검토가 필요합니다."],
    caveatHighlight: "HF 사건과 무관 | 승인 범위와 행동 기록 확인",
    caveatSummary: "GPT-5.6 Cyber는 OpenAI의 허깅페이스 평가 환경 침투 사건에 사용된 모델이 아닙니다. 발표 시점의 접근 모델과 과거 사건의 모델을 섞어 해석하면 안 됩니다.",
    caveatPoints: [["행동 기록", "도구 호출과 외부 통신, 권한 변경을 사람이 확인할 수 있게 남겨야 합니다."], ["평가 범위", "공개된 수치는 격리된 내부 구현과 제한된 시험 환경의 결과입니다."]],
    sources: [["공식", "OpenAI GPT-5.6 Cyber 발표", "https://openai.com/index/expanding-daybreak-as-the-cyber-defense-window-narrows/"], ["공식", "OpenAI Daybreak 신청", "https://openai.com/daybreak/partners"], ["공식", "OpenAI 허깅페이스 사건 설명", "https://openai.com/index/hugging-face-model-evaluation-security-incident/"], null]
  },
  {
    id: "muse-glimmer-30b",
    brand: "Meta",
    name: "Muse Glimmer 30B",
    published: "2026-08-10",
    releaseDateLabel: "8월 10일",
    accessLabel: "Apache 2.0 오픈웨이트",
    openWeight: true,
    tags: ["로컬 AI", "멀티모달", "에이전트"],
    articleSummary: "8월 10일 공개된 Muse Glimmer 30B의 29.6B 구조와 128K 컨텍스트, 로컬 메모리 조건, 공식 성능표와 Apache 2.0 가중치를 6장으로 정리했습니다.",
    coverBody: ["Meta는 8월 10일 Muse Glimmer 30B를 공개했습니다.", "개인용 GPU와 Mac에서 실행하는 로컬 멀티모달 에이전트 모델입니다.", "가중치는 Apache 2.0으로 공개했습니다."],
    coverSummary: "Muse Glimmer는 2026년 8월 10일 공개된 약 29.6B 규모의 멀티모달 모델입니다. 인터넷 연결 없이 로컬에서 도구 사용과 코딩, 문서와 화면 이해를 처리하는 방향에 맞췄습니다.",
    coverPoints: [["교사 모델", "Muse Spark의 출력을 이용해 더 작은 모델에 에이전트 능력을 학습했습니다."], ["제공 파일", "BF16과 두 종류의 4비트 가중치, DFlash 보조 모델을 공개했습니다."]],
    specTitle: "29.6B 밀집 모델과 128K 컨텍스트",
    specBody: ["약 29.6B 파라미터에 1.8B 비전 인코더가 포함됩니다.", "128K 컨텍스트와 텍스트, 이미지 입력을 지원합니다."],
    specHighlight: "29.6B dense | 128K context | Text, Image",
    specRows: [["파라미터", "약 29.6B"], ["Context", "128K"], ["입력", "텍스트, 이미지"], ["구조", "Dense + ViT-G/14"]],
    specSummary: "Muse Glimmer는 비전 인코더를 포함해 약 29.6B 파라미터를 쓰는 밀집 모델입니다. 128K 컨텍스트와 텍스트, 이미지 입력을 지원합니다.",
    specPoints: [["출력", "텍스트만 출력하며 음성 입출력은 지원하지 않습니다."], ["영상", "영상은 개별 프레임으로 처리하며 영상 이해에 맞춰 별도 학습한 모델은 아닙니다."]],
    benchmarkTitle: "30B급에서 코딩과 긴 문서 성능을 높였습니다",
    benchmarkBody: ["Meta 공식 표에서 SWE-Bench Verified 76.0, TerminalBench 51.7을 기록했습니다.", "AA-LCR은 80.0으로 비교한 같은 규모 모델보다 높았습니다."],
    benchmarkHighlight: "SWE Verified 76.0 | Terminal 51.7 | AA-LCR 80.0",
    benchmarkRows: [["SWE-Bench Verified", "76.0"], ["TerminalBench", "51.7"], ["AA-LCR", "80.0"], ["AIME 2026", "94.7"]],
    benchmarkSummary: "Meta가 공개한 표에서 Muse Glimmer는 SWE-Bench Verified 76.0, TerminalBench 51.7, AA-LCR 80.0을 기록했습니다. 같은 크기대 모델과 비교한 제조사 평가입니다.",
    benchmarkPoints: [["비교 대상", "Gemma4 31B와 Qwen3.6 27B를 주된 비교군으로 사용했습니다."], ["재현", "평가 방법 보고서가 공개됐지만 장비와 실행 하네스를 맞춰야 같은 조건을 만들 수 있습니다."]],
    accessTitle: "4비트 모델은 24GB 또는 32GB 환경을 겨냥합니다",
    accessBody: ["BF16은 55GB가 넘는 메모리가 필요합니다.", "K-Quant 모델은 언어 가중치를 20GB 미만으로 줄였습니다."],
    accessHighlight: "BF16 55GB+ | K-Quant 17GB | 24–32GB 권장",
    accessRows: [["BF16", "55GB 이상"], ["4비트 LM", "20GB 미만"], ["목표 메모리", "24GB / 32GB"]],
    accessSummary: "Meta는 4비트 K-Quant 모델을 17GB 안팎으로 줄여 KV 캐시와 비전 인코더, DFlash를 포함한 전체 구성을 24GB 또는 32GB 메모리에서 돌리는 방향을 제시했습니다.",
    accessPoints: [["속도", "DFlash는 RTX 5090에서 3.1배, M5 Max에서 1.8배, M4 Max에서 1.5배의 생성 속도 향상을 보였습니다."], ["도구", "llama.cpp, MLX, ExecuTorch와 vLLM 등 여러 실행 환경 지원을 예고했습니다."]],
    licenseTitle: "Apache 2.0 가중치를 공개했습니다",
    licenseBody: ["BF16과 4비트 가중치, 비전 인코더와 DFlash를 공개했습니다.", "상업과 연구 용도로 사용할 수 있습니다."],
    licenseHighlight: "Open weights | Apache 2.0 | 상용 이용 가능",
    licenseRows: [["가중치", "공개"], ["라이선스", "Apache 2.0"], ["상용 이용", "가능"]],
    licenseSummary: "Muse Glimmer는 Apache 2.0 오픈웨이트 모델입니다. 전체 정밀도와 4비트 체크포인트, 비전 인코더와 DFlash 보조 모델을 내려받을 수 있습니다.",
    licensePoints: [["직접 운영", "로컬이나 사내 서버에서 실행하고 용도에 맞게 추가 학습할 수 있습니다."], ["보호 장치", "실제 도구를 쓰는 에이전트로 배포할 때는 별도 권한 제한과 안전 검사가 필요합니다."]],
    caveatTitle: "로컬 실행이 자동으로 안전을 보장하지는 않습니다",
    caveatBody: ["인터넷 없이 실행할 수 있어 데이터 통제에는 유리합니다.", "도구 권한과 파일 접근 범위를 넓히면 로컬에서도 잘못된 동작이 생길 수 있습니다."],
    caveatHighlight: "로컬 데이터 통제 | 도구 권한은 별도 제한",
    caveatSummary: "Muse Glimmer는 로컬에서 실행할 수 있지만 에이전트가 파일과 도구를 다룰 때는 별도 보호 장치가 필요합니다. Meta도 되돌리기 어려운 동작에는 사람의 확인을 권합니다.",
    caveatPoints: [["품질", "4비트 모델은 일부 상황에서 BF16과 작은 품질 차이가 날 수 있습니다."], ["지원 언어", "100개가 넘는 언어로 학습했지만 모든 언어를 동일하게 평가한 것은 아닙니다."]],
    sources: [["공식", "Meta Muse Glimmer 발표", "https://research.meta.ai/blog/introducing-muse-glimmer-open-agentic-model"], ["공식", "Muse Glimmer 모델 카드", "https://huggingface.co/meta-models/Muse-Glimmer-30B"], ["분석", "Artificial Analysis", "https://artificialanalysis.ai/models/muse-glimmer"], ["참고", "GeekNews 정리", "https://news.hada.io/topic?id=32362"]]
  },
  {
    id: "nemotron-3-5-lightning",
    brand: "NVIDIA",
    name: "Nemotron 3.5 Lightning",
    published: "2026-08-11",
    releaseDateLabel: "8월 11일",
    accessLabel: "OpenMDW 1.1 오픈웨이트",
    openWeight: true,
    tags: ["로컬 AI", "에이전트", "MoE", "NVIDIA"],
    articleSummary: "8월 11일 공개된 Nemotron 3.5 Lightning의 30B/3B 구조와 1M 컨텍스트, 로컬 실행 조건, 공식 평가와 OpenMDW 1.1 라이선스를 6장으로 정리했습니다.",
    coverBody: ["NVIDIA는 8월 11일 Nemotron 3.5 Lightning을 공개했습니다.", "30B 중 3B만 활성화해 장시간 에이전트의 반복 작업을 맡기는 모델입니다.", "가중치와 일부 학습 자료, 실행 방법을 함께 공개했습니다."],
    coverSummary: "Nemotron 3.5 Lightning은 2026년 8월 11일 공개된 30B MoE 모델입니다. 더 큰 모델이 계획을 세우고 Lightning이 코드 검토나 도구 호출 같은 반복 작업을 맡는 구성을 겨냥합니다.",
    coverPoints: [["실행 위치", "RTX PC, DGX Spark, 워크스테이션과 데이터센터에서 운영할 수 있습니다."], ["함께 공개", "요청을 모델별로 나누는 오픈소스 라이브러리 NeMo Switchyard도 공개했습니다."]],
    specBackground: editorialScenes.moe,
    specTitle: "30B 중 3B만 활성화하는 하이브리드 MoE",
    specBody: ["Mamba-2와 MoE, Attention을 섞은 구조입니다.", "1M 컨텍스트와 텍스트 입출력을 지원합니다."],
    specHighlight: "30B total | 3B active | 1M context",
    specRows: [["전체 / 활성", "30B / 3B"], ["Context", "1M"], ["입출력", "텍스트"], ["구조", "Mamba-2 + MoE + Attention"]],
    specSummary: "Nemotron 3.5 Lightning은 총 30B 중 3B를 활성화하는 하이브리드 MoE 모델입니다. 1M 컨텍스트와 텍스트 입출력을 지원합니다.",
    specPoints: [["정밀도", "공식 NVFP4 체크포인트와 추측 디코딩용 DSpark, MTP, DFlash 구성을 제공합니다."], ["언어", "영어와 코딩 언어 외에 스페인어, 프랑스어, 독일어, 이탈리아어와 일본어를 지원한다고 적었습니다."]],
    benchmarkTitle: "작은 활성 규모에 맞춘 에이전트 평가",
    benchmarkBody: ["공식 NVFP4 체크포인트는 SWE-Bench Verified 52.80을 기록했습니다.", "Terminal-Bench 2.1은 23.46, AA-LCR은 49.19였습니다."],
    benchmarkHighlight: "SWE Verified 52.80 | Terminal 23.46 | AA-LCR 49.19",
    benchmarkRows: [["SWE-Bench Verified", "52.80"], ["Terminal-Bench 2.1", "23.46"], ["GPQA Diamond", "75.57"], ["AA-LCR", "49.19"]],
    benchmarkSummary: "NVIDIA가 공개한 NVFP4 평가에서 SWE-Bench Verified 52.80, Terminal-Bench 2.1 23.46, GPQA Diamond 75.57을 기록했습니다.",
    benchmarkPoints: [["평가 조건", "NVIDIA는 NeMo Gym과 NeMo Evaluator로 측정했으며 재현 방법을 함께 공개했습니다."], ["비교", "작은 활성 파라미터와 로컬 운영이 목표라 프런티어 모델의 최고 점수와 같은 기준으로만 볼 필요는 없습니다."]],
    accessTitle: "DGX Spark 한 대나 H100 한 대에서 실행",
    accessBody: ["공식 NVFP4 모델 카드는 단일 DGX Spark 또는 H100 실행 예시를 제공합니다.", "RTX 5090과 H200, A100 계열도 지원 범위에 포함됩니다."],
    accessHighlight: "1×DGX Spark | 1×H100 | RTX, Hopper, Ampere",
    accessRows: [["단일 장비", "DGX Spark / H100"], ["PC", "RTX 5090"], ["서버", "GB200, H200, A100"]],
    accessSummary: "NVIDIA는 Nemotron 3.5 Lightning을 단일 DGX Spark나 H100에서 실행하는 방법을 제공합니다. RTX PC부터 데이터센터까지 여러 NVIDIA GPU를 지원합니다.",
    accessPoints: [["성능 주장", "NVIDIA는 동급 모델보다 출력이 최대 4배 빠르고 에이전트 작업 시간이 30% 짧았다고 발표했습니다."], ["API", "Hugging Face 외에 OpenRouter와 build.nvidia.com의 NIM으로도 제공합니다."]],
    licenseTitle: "오픈웨이트지만 Apache 2.0은 아닙니다",
    licenseBody: ["가중치는 OpenMDW 1.1 라이선스로 공개됐습니다.", "상업 이용이 가능하지만 라이선스 조건을 확인해야 합니다."],
    licenseHighlight: "Open weights | OpenMDW 1.1 | 상용 이용 가능",
    licenseRows: [["가중치", "공개"], ["라이선스", "OpenMDW 1.1"], ["상용 이용", "가능"]],
    licenseSummary: "Nemotron 3.5 Lightning은 오픈웨이트 모델이며 상업 이용이 가능하지만 Apache 2.0이나 MIT가 아닙니다. OpenMDW 1.1 조건이 적용됩니다.",
    licensePoints: [["공개 범위", "NVIDIA는 허용되는 범위에서 학습 자료와 평가 방법도 함께 공개했습니다."], ["도입 전", "재배포와 서비스 제공 방식이 라이선스 조건에 맞는지 확인해야 합니다."]],
    caveatTitle: "모든 작업을 맡기는 단일 모델로 만든 것은 아닙니다",
    caveatBody: ["NVIDIA는 큰 모델이 계획하고 Lightning이 반복 작업을 맡는 구성을 제안합니다.", "한국어는 공식 지원 언어 목록에 없습니다."],
    caveatHighlight: "전문 작업용 모델 | 한국어 공식 지원 미기재",
    caveatSummary: "Nemotron 3.5 Lightning은 에이전트 시스템 안에서 반복적이고 전문화된 작업을 맡기는 모델입니다. 공식 지원 언어에 한국어가 없어 국내 문서 작업은 별도 시험이 필요합니다.",
    caveatPoints: [["장기 컨텍스트", "1M 컨텍스트를 실제로 쓰면 모델 가중치 외에 KV 캐시 메모리도 크게 늘어납니다."], ["장비 차이", "NVFP4 가속 경로는 GPU 세대에 따라 달라 같은 속도가 나오지 않을 수 있습니다."]],
    sources: [["공식", "NVIDIA 발표", "https://blogs.nvidia.com/blog/nemotron-lightning-switchyard-rtx-dgx/"], ["공식", "Nemotron 3.5 Lightning 모델 카드", "https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4"], ["분석", "Artificial Analysis", "https://artificialanalysis.ai/models/nemotron-3-5-lightning"], ["분석", "Artificial Analysis 해설", "https://artificialanalysis.ai/articles/nemotron-3-5-lightning-launch"]]
  },
  {
    id: "gemini-3-7-flash",
    brand: "Google",
    subject: "Google이",
    name: "Gemini 3.7 Flash",
    published: "2026-08-13",
    releaseDateLabel: "8월 13일",
    accessLabel: "상용 API",
    openWeight: false,
    tags: ["Gemini", "멀티모달", "코딩", "에이전트"],
    articleSummary: "8월 13일 출시된 Gemini 3.7 Flash의 1M 컨텍스트와 코딩과 업무 평가, 연말까지 적용되는 출시 가격, API 전용 제공 범위를 6장으로 정리했습니다.",
    coverBody: ["Google은 8월 13일 Gemini 3.7 Flash를 출시했습니다.", "코딩과 지식 업무, 여러 도구를 쓰는 에이전트를 강화한 상용 모델입니다.", "Gemini API와 Vertex AI, Gemini Spark에 적용됩니다."],
    coverSummary: "Gemini 3.7 Flash는 2026년 8월 13일 출시됐습니다. 3.6 Flash보다 코딩과 문서 이해, 업무 자동화 평가를 높이고 연말까지 출시 할인가를 적용합니다.",
    coverPoints: [["개발자", "Google AI Studio와 Gemini API, Vertex AI에서 사용할 수 있습니다."], ["개인", "지원 국가의 Google AI Pro와 Ultra 이용자는 Gemini Spark에서 사용할 수 있습니다."]],
    specTitle: "1M 컨텍스트와 최대 65K 출력",
    specBody: ["1M 입력 컨텍스트와 최대 65,536 토큰 출력을 지원합니다.", "텍스트와 이미지, 영상, 음성, PDF를 입력할 수 있습니다."],
    specHighlight: "1M context | 65K output | multimodal input",
    specRows: [["Context", "1M"], ["최대 출력", "65,536"], ["입력", "텍스트, 이미지, 영상, 음성, PDF"], ["파라미터", "비공개"]],
    specSummary: "Gemini 3.7 Flash는 1M 컨텍스트와 최대 65,536 토큰 출력을 지원하는 멀티모달 모델입니다. 파라미터 수와 상세 구조는 공개되지 않았습니다.",
    specPoints: [["기능", "도구 호출과 검색, 코드 실행, 구조화 출력과 조절 가능한 추론을 지원합니다."], ["출력", "텍스트를 출력하며 이미지나 음성을 직접 생성하는 모델은 아닙니다."]],
    benchmarkTitle: "코딩과 문서, 업무 평가가 함께 올랐습니다",
    benchmarkBody: ["Google 자체 표에서 FrontierCode는 43.6%, DeepSWE는 65.3%였습니다.", "WebDev Arena는 1588 Elo, AutomationBench는 30.4%를 기록했습니다."],
    benchmarkHighlight: "FrontierCode 43.6 | DeepSWE 65.3 | WebDev 1588",
    benchmarkRows: [["FrontierCode 1.1", "43.6%"], ["DeepSWE 1.1", "65.3%"], ["WebDev Arena", "1588 Elo"], ["AutomationBench", "30.4%"]],
    benchmarkSummary: "Google이 공개한 평가에서 Gemini 3.7 Flash는 FrontierCode 43.6%, DeepSWE 65.3%, AutomationBench 30.4%를 기록했습니다.",
    benchmarkPoints: [["이전 모델", "Google 표의 3.6 Flash 결과는 각각 34.4%, 49.0%, 17.0%였습니다."], ["제조사 평가", "프롬프트와 하네스가 다른 외부 결과와 직접 같은 줄에 놓기는 어렵습니다."]],
    accessTitle: "연말까지 입력 $0.75, 출력 $3.75",
    accessBody: ["2026년 12월 31일까지 출시 할인가가 적용됩니다.", "2027년 1월 1일부터 입력 $1.50, 출력 $7.50으로 바뀝니다."],
    accessHighlight: "2026년 $0.75 / $3.75 | 2027년 $1.50 / $7.50",
    accessRows: [["출시 입력", "$0.75 / 1M"], ["출시 출력", "$3.75 / 1M"], ["2027년", "$1.50 / $7.50"]],
    accessSummary: "Gemini 3.7 Flash는 2026년 말까지 1M 토큰당 입력 0.75달러, 출력 3.75달러입니다. 2027년 1월 1일부터 입력 1.50달러, 출력 7.50달러가 적용됩니다.",
    accessPoints: [["출시 기간", "할인 종료일이 정해져 있으므로 장기 운영 비용은 2027년 요금으로 계산해야 합니다."], ["제품", "Gemini Spark와 기업용 Gemini Enterprise Agent Platform에도 적용됩니다."]],
    licenseTitle: "API 전용이며 가중치는 공개되지 않았습니다",
    licenseBody: ["Gemini 3.7 Flash는 Google이 운영하는 상용 모델입니다.", "가중치와 직접 운영용 라이선스는 공개하지 않았습니다."],
    licenseHighlight: "Proprietary | API 전용 | 가중치 비공개",
    licenseRows: [["가중치", "비공개"], ["파라미터", "비공개"], ["직접 운영", "지원 안 함"]],
    licenseSummary: "Gemini 3.7 Flash는 Gemini API와 Google Cloud, 제품 앱에서 제공되는 상용 모델입니다. 가중치를 내려받아 자체 서버에서 실행할 수 없습니다.",
    licensePoints: [["데이터", "기업 데이터 처리와 보관 조건은 Gemini API와 Vertex AI 상품별 정책을 확인해야 합니다."], ["모델 교체", "3.6 Flash에서 바꿀 때 도구 호출과 추론 설정, 비용을 다시 시험하는 편이 좋습니다."]],
    caveatTitle: "출시 가격과 2027년 가격을 구분해야 합니다",
    caveatBody: ["지금 보이는 낮은 가격은 2026년 말까지 적용되는 출시 조건입니다.", "긴 에이전트 작업은 토큰 수와 재시도 횟수까지 포함해 계산해야 합니다."],
    caveatHighlight: "출시 할인 종료 12월 31일 | 장기 비용 재계산",
    caveatSummary: "Gemini 3.7 Flash의 출시 가격은 2026년 말에 끝납니다. 운영 계획에서는 2027년 정가와 작업당 전체 토큰, 재시도 횟수를 반영해야 합니다.",
    caveatPoints: [["평가", "Google의 비교 수치는 자체 평가이므로 팀의 코드와 문서로 별도 검증해야 합니다."], ["안전", "Google은 CBRN과 사이버 악용 방지 기능을 갱신했다고 밝혔습니다."]],
    sources: [["공식", "Google Gemini 3.7 Flash 발표", "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-3-7-flash/"], ["공식", "Gemini API 모델 문서", "https://ai.google.dev/gemini-api/docs/models"], ["분석", "Artificial Analysis", "https://artificialanalysis.ai/models/gemini-3-7-flash"], ["참고", "GeekNews 정리", "https://news.hada.io/topic?id=32477"]]
  },
  {
    id: "deepseek-v4-pro-0813",
    brand: "DeepSeek",
    name: "DeepSeek V4 Pro 0813",
    published: "2026-08-13",
    releaseDateLabel: "8월 13일",
    accessLabel: "MIT 오픈웨이트와 API",
    openWeight: true,
    tags: ["중국 AI", "코딩", "에이전트", "MoE"],
    articleSummary: "8월 13일 정식 공개된 DeepSeek V4 Pro 0813의 1.6T/49B 구조와 1M 컨텍스트, 에이전트 평가, API 요금과 MIT 가중치를 6장으로 정리했습니다.",
    coverBody: ["DeepSeek는 8월 13일 V4 Pro 0813을 정식 공개했습니다.", "프리뷰를 교체해 장기 코딩과 에이전트 업무 성능을 높였습니다.", "API와 MIT 라이선스 가중치를 함께 제공합니다."],
    coverSummary: "DeepSeek V4 Pro 0813은 2026년 8월 13일 정식 공개됐습니다. V4 Pro 프리뷰의 구조를 유지하면서 DSpark 추측 디코딩과 에이전트 후속 학습을 더한 모델입니다.",
    coverPoints: [["정식 버전", "프리뷰를 대체하며 생산 환경의 에이전트 작업 개선을 강조했습니다."], ["제공 방식", "DeepSeek API와 Hugging Face 가중치를 함께 제공합니다."]],
    specBackground: editorialScenes.moe,
    specTitle: "1.6T 중 49B를 쓰는 대형 MoE",
    specBody: ["전체 1.6T 중 토큰마다 49B가 계산에 참여합니다.", "1M 컨텍스트와 최대 384K 출력을 지원합니다."],
    specHighlight: "1.6T total | 49B active | 1M context",
    specRows: [["전체 / 활성", "1.6T / 49B"], ["Context", "1M"], ["최대 출력", "384K"], ["추론", "low, high, max"]],
    specSummary: "DeepSeek V4 Pro는 총 1.6T, 활성 49B 규모의 MoE 모델입니다. API 문서는 1M 컨텍스트와 최대 384K 출력을 안내합니다.",
    specPoints: [["속도 기능", "체크포인트에 DSpark 추측 디코딩 모듈이 붙어 있습니다."], ["실행 예시", "공식 vLLM 설정은 GB300 GPU 4장을 사용합니다."]],
    benchmarkTitle: "코딩과 도구 사용은 Flash보다 높았습니다",
    benchmarkBody: ["공식 표에서 Terminal-Bench 2.1은 87.9, DeepSWE는 62.7이었습니다.", "Artificial Analysis 지수는 max 설정 44점으로 표시됩니다."],
    benchmarkHighlight: "Terminal 87.9 | DeepSWE 62.7 | Toolathlon 74.1",
    benchmarkRows: [["Terminal-Bench 2.1", "87.9"], ["DeepSWE", "62.7"], ["Toolathlon", "74.1"], ["AutomationBench", "31.8"]],
    benchmarkSummary: "DeepSeek 공식 평가에서 V4 Pro 0813은 Terminal-Bench 2.1 87.9, DeepSWE 62.7, Toolathlon 74.1을 기록했습니다.",
    benchmarkPoints: [["평가 설정", "코딩 평가는 DeepSeek Harness와 max 추론 설정을 사용했습니다."], ["내부 평가", "DSBench 두 항목은 DeepSeek 내부 데이터이므로 공개 평가와 구분해야 합니다."]],
    accessTitle: "입력 $0.435, 출력 $0.87",
    accessBody: ["1M 토큰당 일반 입력 $0.435, 출력 $0.87입니다.", "캐시 적중 입력은 $0.003625입니다."],
    accessHighlight: "Cache $0.003625 | Input $0.435 | Output $0.87",
    accessRows: [["캐시 입력", "$0.003625 / 1M"], ["일반 입력", "$0.435 / 1M"], ["출력", "$0.87 / 1M"]],
    accessSummary: "DeepSeek 공식 API 요금은 1M 토큰당 캐시 입력 0.003625달러, 일반 입력 0.435달러, 출력 0.87달러입니다.",
    accessPoints: [["API 모델명", "deepseek-v4-pro를 사용하며 thinking과 non-thinking을 모두 지원합니다."], ["Flash 비교", "Flash보다 토큰 단가가 높고 동시 요청 한도도 낮습니다."]],
    licenseTitle: "MIT 가중치를 공개했습니다",
    licenseBody: ["가중치와 저장소는 MIT 라이선스로 공개됐습니다.", "1.6T 전체를 저장하고 나눠 돌릴 대형 장비가 필요합니다."],
    licenseHighlight: "Open weights | MIT | 1.6T 전체 저장 필요",
    licenseRows: [["가중치", "공개"], ["라이선스", "MIT"], ["공식 실행 예", "4×GB300"]],
    licenseSummary: "DeepSeek V4 Pro 0813은 MIT 오픈웨이트 모델입니다. 이용 조건은 단순하지만 1.6T 전체 가중치와 긴 컨텍스트를 처리할 인프라가 필요합니다.",
    licensePoints: [["배포", "vLLM과 SGLang용 DSpark 설정을 공식 모델 카드가 제공합니다."], ["현실적 범위", "활성 파라미터가 49B여도 모든 전문가 가중치를 저장해야 하므로 일반 PC용 모델은 아닙니다."]],
    caveatTitle: "높은 점수만큼 토큰과 시간도 확인해야 합니다",
    caveatBody: ["DeepSeek 계열은 max 추론에서 긴 출력을 쓰는 경향이 있습니다.", "프리뷰와 0813 결과, 공식 평가와 독립 평가를 섞지 않아야 합니다."],
    caveatHighlight: "정식 0813 기준 | 토큰 사용량과 환각률 확인",
    caveatSummary: "DeepSeek V4 Pro 0813은 프리뷰보다 공식 코딩 평가가 올랐지만 응답 길이와 환각은 별도 지표로 확인해야 합니다. 버전명이 없는 V4 Pro 결과를 0813 성능으로 받아들이지 않는 편이 안전합니다.",
    caveatPoints: [["토큰", "AA의 이전 V4 Pro 분석에서도 출력 토큰 사용량이 많다고 지적했습니다."], ["환각", "지식 평가에서 답을 모를 때도 응답하는 비율이 높았던 만큼 실제 자료 확인 절차가 필요합니다."]],
    sources: [["공식", "DeepSeek V4 Pro 변경 내역", "https://api-docs.deepseek.com/updates"], ["공식", "DeepSeek V4 Pro 모델 카드", "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813"], ["분석", "Artificial Analysis", "https://artificialanalysis.ai/models/deepseek-v4-pro"], ["참고", "GeekNews 정리", "https://news.hada.io/topic?id=32444"]]
  }
];

const qwen38Update = {
  id: "qwen-3-8-max",
  brand: "Alibaba",
  name: "Qwen3.8-Max",
  published: "2026-08-03",
  releaseDateLabel: "8월 3일",
  accessLabel: "오픈 체크포인트와 API",
  openWeight: true,
  tags: ["중국 AI", "에이전트", "MoE"],
  articleSummary: "8월 3일 공개된 Qwen3.8-Max의 2.4T/95B 구조와 262K 기본 컨텍스트, 공식 성능표, API 가격, 공개된 가중치와 자체 라이선스 조건을 6장으로 정리했습니다.",
  coverBody: ["Alibaba는 8월 3일 Qwen3.8-Max API를 공개했습니다.", "이후 2.4T 규모의 Max급 가중치도 Hugging Face에 올렸습니다.", "장기 코딩과 지식 업무, 에이전트 작업을 겨냥한 모델입니다."],
  coverSummary: "Qwen3.8-Max는 2026년 8월 3일 API로 먼저 공개됐고 현재는 Max급 가중치도 받을 수 있습니다. 초기 공개 당시 Agentic Index 1위에 오른 뒤 평가 갱신으로 순위가 바뀌었습니다.",
  coverPoints: [["공개 상태", "API만 있던 출시 시점과 달리 현재는 Hugging Face에 2.4T/95B 체크포인트가 공개돼 있습니다."], ["모델군", "작은 Qwen3.8 체크포인트도 함께 공개되고 있어 용도와 장비에 맞춰 골라야 합니다."]],
  specBackground: editorialScenes.moe,
  specTitle: "2.4T 중 95B를 쓰는 Max급 MoE",
  specBody: ["전체 2.4T 중 토큰마다 95B가 계산에 참여합니다.", "체크포인트의 기본 컨텍스트는 262K이며 1.01M까지 확장할 수 있습니다."],
  specHighlight: "2.4T total | 95B active | 262K native",
  specRows: [["전체 / 활성", "2.4T / 95B"], ["기본 Context", "262K"], ["확장 Context", "약 1.01M"], ["입력", "API는 멀티모달"]],
  specSummary: "Qwen3.8-Max는 총 2.4T 중 95B를 활성화하는 MoE 모델입니다. 공개 체크포인트는 262,144 토큰을 기본으로 하며 설정을 통해 약 1.01M까지 확장할 수 있습니다.",
  specPoints: [["메모리", "활성 95B만 저장하는 모델이 아니라 2.4T 전체 가중치를 장비에 나눠 올려야 합니다."], ["API", "QwenCloud의 Max API는 텍스트와 이미지, 영상 입력을 지원합니다."]],
  benchmarkTitle: "에이전트 평가는 잠시 1위 뒤 순위가 바뀌었습니다",
  benchmarkBody: ["초기 Agentic Index에서 1위에 올랐고 평가 갱신 뒤 Opus 5 다음으로 내려왔습니다.", "Qwen 자체 평가와 독립 평가의 시점과 하네스가 다릅니다."],
  benchmarkHighlight: "초기 1위 | 갱신 뒤 2위 | 공식과 독립 평가 구분",
  benchmarkRows: [["PaperBench", "93.0"], ["WideSearch", "81.9"], ["SWE-bench Pro", "67.7"], ["HLE", "43.6"]],
  benchmarkSummary: "Qwen3.8-Max는 공개 직후 Artificial Analysis Agentic Index 1위에 올랐지만 평가 방식이 갱신되며 순위가 달라졌습니다. 공식 표에서는 PaperBench 93.0, SWE-bench Pro 67.7을 공개했습니다.",
  benchmarkPoints: [["1위의 의미", "현재 순위가 아니라 공개 당시 결과이며 리더보드는 계속 바뀝니다."], ["하네스", "일부 코딩 평가는 Claude Code를 사용해 모델과 실행 환경의 효과가 함께 들어갑니다."]],
  accessTitle: "API는 입력 $2, 출력 $6",
  accessBody: ["QwenCloud 기준 일반 입력 $2, 출력 $6입니다.", "명시적 캐시 재사용 입력은 $0.17입니다."],
  accessHighlight: "Input $2 | Output $6 | Cache reuse $0.17",
  accessRows: [["일반 입력", "$2 / 1M"], ["출력", "$6 / 1M"], ["캐시 재사용", "$0.17 / 1M"]],
  accessSummary: "QwenCloud의 1M 토큰당 일반 입력은 2달러, 출력은 6달러입니다. 명시적 캐시를 다시 읽는 입력은 0.17달러입니다.",
  accessPoints: [["연동", "OpenAI와 Anthropic 호환 API를 제공하며 Claude Code, Codex와 OpenClaw 연결 방법도 안내합니다."], ["자체 운영", "가중치는 공개됐지만 직접 운영하려면 TB 단위 메모리와 분산 추론 구성이 필요합니다."]],
  licenseTitle: "가중치는 공개됐지만 Qwen 자체 라이선스입니다",
  licenseBody: ["Hugging Face에서 2.4T/95B 체크포인트를 받을 수 있습니다.", "MIT나 Apache 2.0이 아니라 Qwen3.8-Max License가 적용됩니다."],
  licenseHighlight: "Open weights | Qwen3.8-Max License | 대규모 서비스 조건",
  licenseRows: [["가중치", "공개"], ["라이선스", "Qwen3.8-Max"], ["일반 PC", "실행 어려움"]],
  licenseSummary: "Qwen3.8-Max는 오픈웨이트 모델이지만 자체 라이선스를 사용합니다. 일정 규모를 넘는 모델 서비스나 업무 도우미 사업에는 별도 허가 조건이 있습니다.",
  licensePoints: [["사업 조건", "연 매출 5천만 달러를 넘는 Model as a Service나 AI Work Assistant 사업자는 별도 라이선스가 필요합니다."], ["표시 조건", "월간 이용자 1억 명 또는 월 매출 2천만 달러가 넘는 제품은 모델명을 표시해야 합니다."]],
  caveatTitle: "가중치 공개와 쉬운 자체 운영은 다른 문제입니다",
  caveatBody: ["4비트로 줄여도 가중치만 약 1.2TB입니다.", "긴 컨텍스트와 동시 요청을 더하면 실제 장비 요구량은 더 커집니다."],
  caveatHighlight: "4bit 약 1.2TB | 분산 추론 필요 | 장비 비용 확인",
  caveatSummary: "Qwen3.8-Max는 체크포인트를 받을 수 있지만 2.4T 전체를 저장해야 합니다. 연구소나 대형 기업 수준의 분산 장비가 없다면 API가 더 현실적인 선택일 수 있습니다.",
  caveatPoints: [["토큰과 시간", "높은 점수를 낼 때 출력 토큰과 작업 시간이 큰지 함께 확인해야 합니다."], ["버전", "API 모델과 공개 체크포인트의 기능, 컨텍스트 설정과 성능이 완전히 같다고 가정하면 안 됩니다."]],
  sources: [["공식", "Qwen3.8 발표", "https://qwen.ai/blog?id=qwen3.8"], ["공식", "Qwen3.8-Max 모델 카드", "https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B"], ["분석", "Artificial Analysis", "https://artificialanalysis.ai/models/qwen3-8-max"], ["참고", "GeekNews 정리", "https://news.hada.io/topic?id=32090"]]
};

const qwen38Index = newsItems.findIndex((item) => item.id === "qwen-3-8-max");
newsItems[qwen38Index] = modelReleaseItem(qwen38Update);
newsItems.push(...modelReleases.map(modelReleaseItem));
newsItems.push(...dokpamoNewsItems);
newsItems.push({
  id: "computer-history",
  type: "brief",
  path: "news/brief/computer-history/",
  identity: { brand: "OpenAI", title: "Computer History" },
  published: "2026-08-14",
  title: "ChatGPT가 내가 하던 일을 기억한다, Computer History",
  summary: "Computer History는 허용한 앱과 웹사이트에서 일어난 최근 작업을 타임라인과 메모리로 정리하는 기능입니다. ChatGPT와 Codex가 이 기억을 어떻게 활용하는지, 무엇을 기록하고 어디까지 통제할 수 있는지 10장과 공식 영상으로 살펴봅니다.",
  tags: ["짧막 뉴스", "OpenAI", "ChatGPT", "Codex", "생산성", "개인정보"],
  cardCount: 10,
  imageStem: "computer-history",
  readerMode: "editorial",
  coverAlt: "맥의 앱과 웹사이트에서 일어난 작업 흐름이 타임라인과 메모리로 이어지는 Computer History 카드뉴스 표지",
  articleIntro: {
    eyebrow: "WHY IT MATTERS",
    title: "다시 찾는 대신, 하던 일을 이어갑니다",
    body: [
      "지금까지 AI에게 지난 일을 이어서 시키려면 파일 이름, 대화방, 문서 위치를 다시 알려줘야 했습니다. Computer History는 사용자가 허용한 앱과 웹사이트의 최근 작업을 기억해 이 설명을 줄이려는 기능입니다.",
      "핵심은 단순한 사용 기록이 아니라 작업의 맥락입니다. 언제 어떤 앱에서 무엇을 했는지 타임라인으로 보여주고, 나중에 다시 쓸 만한 내용을 로컬 Markdown 메모리로 남깁니다.",
      "편리함의 대가는 더 넓은 접근 권한입니다. 화면과 오디오를 녹화하지 않더라도 입력과 클릭에는 민감한 맥락이 담길 수 있으므로, 필요한 앱만 허용하고 기록과 메모리를 직접 살피는 운영 원칙이 필요합니다."
    ],
    facts: [
      ["한 문장 정의", "허용한 앱과 웹사이트의 최근 작업을 타임라인과 메모리로 정리하는 기능"],
      ["현재 대상", "macOS용 ChatGPT Pro·Business·Enterprise"],
      ["기본 상태", "꺼짐. 사용자 또는 조직 관리자의 허용 뒤 개인 동의 필요"],
      ["기억의 형태", "날짜별 타임라인과 사용자가 확인할 수 있는 로컬 Markdown 메모리"]
    ]
  },
  video: {
    youtubeId: "W-HhMUe9hOg",
    title: "OpenAI Computer History 공식 데모",
    description: "3분 10초 영상에서 지난 문서 찾기, 단체 대화방 공유, 오전 업무 요약, 앱·사이트별 권한과 삭제 과정을 직접 확인할 수 있습니다."
  },
  cardDetails: {
    1: {
      background: "bg-cover.webp",
      category: "OpenAI · 새 기능",
      theme: "sky",
      variant: ["cover", "roomy", "explainer"],
      eyebrow: "OPENAI · COMPUTER HISTORY",
      title: "허용한 앱에서 한 일을 ChatGPT가 기억합니다",
      visual: { type: "metric", items: [["입력", "앱·웹 활동"], ["기억", "타임라인·메모리"], ["활용", "ChatGPT·Codex"]] },
      cardBody: [
        "허용한 앱과 웹사이트에서 일어난 최근 작업을 타임라인과 메모리로 정리하는 기능입니다.",
        "ChatGPT와 Codex가 이 기억을 참고해 ‘아까 하던 일’을 이어서 돕습니다."
      ],
      highlight: "기억한다 → 찾아준다 → 이어서 돕는다",
      panelTitle: "Computer History는 무엇인가",
      summary: [
        "한 문장으로 말하면, 허용한 앱과 웹사이트에서 일어난 최근 작업을 타임라인과 메모리로 정리하는 기능입니다.",
        "사용자가 직접 켜야 하며, ChatGPT와 Codex는 이 기억을 바탕으로 파일 이름을 몰라도 이전 작업의 맥락을 찾아 이어서 도울 수 있습니다."
      ],
      points: [
        ["무엇이 달라지나", "파일 이름이나 대화방을 정확히 기억하지 못해도 최근 작업 흐름을 바탕으로 이어서 물을 수 있습니다."],
        ["먼저 확인할 점", "화면 전체를 녹화하는 기능은 아니지만 입력과 클릭 같은 상호작용 이벤트를 다루므로 권한 범위를 먼저 정해야 합니다."]
      ],
      sources: [["공식", "OpenAI Computer History 안내", "https://learn.chatgpt.com/docs/customization/computer-history"], ["영상", "OpenAI 공식 데모", "https://youtu.be/W-HhMUe9hOg"]]
    },
    2: {
      background: "../editorial-scenes-v2/agent-harness.webp",
      category: "작동 방식",
      theme: "mint",
      variant: ["roomy", "diagram-large", "explainer"],
      eyebrow: "HOW IT WORKS",
      title: "상호작용이 타임라인과 메모리가 됩니다",
      visual: { type: "flow", items: ["허용한 앱·웹", "클릭·입력 이벤트", "요약과 정리", "타임라인·메모리"] },
      cardBody: [
        "기록은 날짜별 타임라인과 로컬 Markdown 메모리로 나뉩니다.",
        "다음 대화에서는 관련된 기억을 꺼내 ‘아까 보던 문서’ 같은 요청과 연결합니다."
      ],
      highlight: "작업 기록 → 요약 → 다음 대화의 맥락",
      panelTitle: "기억은 어떻게 만들어지나",
      summary: [
        "허용한 앱과 웹사이트의 상호작용 이벤트가 임시 기록으로 모이고, 일시적인 Codex 처리 과정을 거쳐 타임라인과 로컬 Markdown 메모리로 정리됩니다.",
        "타임라인은 언제 무엇을 했는지 보여주는 기록이고, 메모리는 다음 대화와 작업에서 다시 활용할 수 있도록 요약한 맥락입니다."
      ],
      points: [
        ["기억의 단위", "날짜별 타임라인과 컴퓨터 사용에서 추출한 로컬 메모리가 함께 생깁니다."],
        ["대화와의 관계", "기억은 관련 질문에 자동으로 쓰일 수 있고, 사용자는 메모리 파일을 직접 열어 확인할 수 있습니다."]
      ],
      sources: [["공식", "작동 방식과 메모리", "https://learn.chatgpt.com/docs/customization/computer-history"], ["정리", "Threads 기능 소개", "https://www.threads.com/share/DDQPu39_I/"]]
    },
    3: {
      background: "bg-privacy.webp",
      category: "수집 범위",
      theme: "butter",
      variant: ["roomy", "explainer"],
      eyebrow: "EVENTS, NOT SCREENSHOTS",
      title: "화면 녹화 대신 상호작용 이벤트를 읽습니다",
      visual: { type: "tile-grid", items: [["기록", "클릭·입력·단축키"], ["맥락", "앱 전환·접근성 정보"], ["기록하지 않음", "화면·오디오"], ["자동 제외", "비공개 브라우징"]] },
      cardBody: [
        "이전 Chronicle은 스크린샷을 썼지만, Computer History는 화면이나 오디오를 캡처하지 않습니다.",
        "다만 입력과 클릭만으로도 업무와 개인 생활의 맥락이 드러날 수 있습니다."
      ],
      highlight: "이벤트 기반 · 화면과 오디오 미수집",
      panelTitle: "무엇을 기록하고 무엇을 빼나",
      summary: [
        "Computer History가 다루는 것은 클릭, 입력, 단축키, 앱 전환과 접근성 맥락 같은 상호작용 이벤트입니다.",
        "화면 스크린샷과 오디오는 수집하지 않고 브라우저의 비공개 모드 활동도 제외합니다. 그렇다고 민감하지 않은 것은 아니므로 수집 범위를 좁게 잡아야 합니다."
      ],
      points: [
        ["Chronicle과의 차이", "기존 Chronicle의 스크린샷 방식이 아니라 이벤트 기반으로 다시 만든 기능입니다."],
        ["그래도 민감한 이유", "입력 내용과 앱 사용 흐름만으로도 업무와 개인 생활의 맥락이 드러날 수 있습니다."]
      ],
      sources: [["공식", "수집하는 정보와 제외 항목", "https://learn.chatgpt.com/docs/customization/computer-history"], ["참고", "Wikidocs 사용 전 확인", "https://wikidocs.net/blog/@openwiki/28526/"]]
    },
    4: {
      background: "../editorial-scenes-v2/office-ai-panel.webp",
      category: "공식 데모",
      theme: "coral",
      variant: ["roomy", "diagram-large", "explainer"],
      eyebrow: "OFFICIAL DEMO",
      title: "‘아까 그 문서’를 찾아 이전 일을 이어갑니다",
      visual: { type: "timeline", items: [["1", "최근 Google 문서 찾기"], ["2", "이전 단체 대화방 확인"], ["3", "문서 공유"], ["4", "오전 업무 요약"]] },
      cardBody: [
        "정확한 문서명이나 대화방 이름을 말하지 않아도 최근 작업 흐름에서 대상을 찾습니다.",
        "찾은 문서를 공유하고 오전 업무를 요약하는 장면까지 공식 영상에서 확인할 수 있습니다."
      ],
      highlight: "3분 10초 · OpenAI 공식 영상 포함",
      panelTitle: "공식 데모에서 확인한 장면",
      summary: [
        "사용자가 ‘아까 작업하던 Google 문서’와 ‘이전 단체 대화방’처럼 모호하게 말해도 ChatGPT가 최근 작업에서 대상을 찾아냅니다.",
        "이어 문서를 공유하고 오전에 한 일을 요약합니다. 카드 설명이 끝난 뒤 나오는 공식 영상에서 3분 10초 전체 흐름을 직접 볼 수 있습니다."
      ],
      points: [
        ["가능해지는 질문", "파일명보다 작업의 시간과 맥락을 이용해 이어서 요청할 수 있습니다."],
        ["영상 선택", "Threads에 소개된 영상과 같은 OpenAI 공식 YouTube 데모를 안정적인 임베드로 넣었습니다."]
      ],
      sources: [["영상", "OpenAI 공식 데모", "https://youtu.be/W-HhMUe9hOg"], ["정리", "Threads 영상 소개", "https://www.threads.com/share/DDQPu39_I/"]]
    },
    5: {
      background: "bg-automation.webp",
      category: "반복 업무",
      theme: "lilac",
      variant: ["roomy", "diagram-large", "explainer"],
      eyebrow: "SKILLS & AUTOMATIONS",
      title: "반복한 일은 스킬과 자동화 후보가 됩니다",
      visual: { type: "flow", items: ["반복 작업 감지", "패턴 정리", "스킬 제안", "예약 자동화"] },
      cardBody: [
        "타임라인은 반복한 업무를 찾아 재사용할 스킬이나 정기 실행할 자동화를 제안합니다.",
        "다만 실제 생성과 실행은 사용자가 내용을 확인한 뒤 결정해야 합니다."
      ],
      highlight: "기억에서 끝나지 않고 다음 실행으로 연결",
      panelTitle: "기억이 자동화로 이어지는 지점",
      summary: [
        "Computer History는 활동 기록을 보여주는 데서 끝나지 않습니다. 반복되는 순서를 찾아 다시 쓸 수 있는 스킬이나 일정에 맞춘 자동화 후보를 제안할 수 있습니다.",
        "기억이 ‘과거를 찾는 기능’이라면 스킬과 자동화는 그 기억을 ‘다음 실행’으로 바꾸는 단계입니다. 제안의 내용과 실행 범위는 사용자가 확인해야 합니다."
      ],
      points: [
        ["스킬", "문서 정리나 업무 보고처럼 같은 절차를 반복할 때 재사용 가능한 작업 방식으로 묶습니다."],
        ["자동화", "반복 주기가 보이는 업무는 예약 실행 후보로 제안할 수 있지만, 실제 생성과 실행은 사용자가 확인해야 합니다."]
      ],
      sources: [["공식", "타임라인의 제안 기능", "https://learn.chatgpt.com/docs/customization/computer-history"], ["영상", "OpenAI 공식 데모", "https://youtu.be/W-HhMUe9hOg"]]
    },
    6: {
      background: "../editorial-scenes-v2/compatibility-testing.webp",
      category: "제공 범위",
      theme: "sky",
      variant: ["roomy", "explainer"],
      eyebrow: "AVAILABILITY",
      title: "Mac용 Pro와 조직용 플랜부터 시작합니다",
      visual: { type: "tile-grid", items: [["운영체제", "macOS 데스크톱"], ["개인", "Pro에서 직접 선택"], ["조직", "관리자 허용 뒤 개인 동의"], ["필수", "Memories 켜기"]] },
      cardBody: [
        "Pro는 사용자가 직접 켜고, Business·Enterprise는 관리자가 허용한 뒤 구성원이 동의합니다.",
        "API 키·Amazon Bedrock 연결과 영국·EEA·스위스에서는 아직 쓸 수 없습니다."
      ],
      highlight: "기본값 꺼짐 · 워크스페이스도 개인별 동의",
      panelTitle: "누가 지금 쓸 수 있나",
      summary: [
        "현재 macOS용 ChatGPT 데스크톱 앱의 Pro, Business, Enterprise에서 제공합니다. Pro 사용자는 직접 켤 수 있고, 조직용 플랜은 관리자가 먼저 접근을 허용해야 합니다.",
        "관리자가 열어도 구성원 각자가 다시 동의해야 하며 Memories도 켜져 있어야 합니다. API 키나 Amazon Bedrock 연결, 영국·EEA·스위스는 지원 대상이 아닙니다."
      ],
      points: [
        ["제외된 연결", "API 키나 Amazon Bedrock을 쓰는 환경에서는 지원하지 않습니다."],
        ["지역 제한", "EEA, 스위스, 영국에서는 현재 사용할 수 없습니다."]
      ],
      sources: [["공식", "플랜과 지역별 제공 범위", "https://learn.chatgpt.com/docs/customization/computer-history"], ["참고", "LinkedIn 기능 정리", "https://www.linkedin.com/feed/update/urn:li:activity:7493856064396902401?updateEntityUrn=urn%3Ali%3Afs_updateV2%3A%28urn%3Ali%3Aactivity%3A7493856064396902401%2CFEED_DETAIL%2CEMPTY%2CDEFAULT%2Cfalse%29"]]
    },
    7: {
      background: "../editorial-scenes-v2/office-suite.webp",
      category: "시작 방법",
      theme: "mint",
      variant: ["roomy", "explainer"],
      eyebrow: "TURN IT ON",
      title: "설정에서 켜고 앱과 사이트 범위를 고릅니다",
      visual: { type: "milestones", items: [["1", "Settings 열기"], ["2", "Integrations 선택"], ["3", "Computer history 켜기"], ["4", "앱·사이트 권한 지정"]] },
      cardBody: [
        "처음에는 문서와 개발 도구처럼 목적이 분명한 앱만 허용하는 편이 좋습니다.",
        "생성된 타임라인과 메모리를 살펴본 뒤 필요할 때 범위를 넓힙니다."
      ],
      highlight: "좁게 시작하고 기록을 직접 확인",
      panelTitle: "처음 켤 때 이렇게 시작",
      summary: [
        "ChatGPT 설정의 Integrations에서 Computer history를 켜고 앱과 웹사이트 접근 범위를 정합니다.",
        "처음부터 모든 앱을 허용하기보다 문서·개발 도구처럼 목적이 분명한 업무 앱만 선택하세요. 기록이 어떻게 만들어지는지 확인한 뒤 범위를 넓히는 편이 안전합니다."
      ],
      points: [
        ["권장 시작", "문서와 개발 도구처럼 목적이 분명한 앱만 먼저 허용합니다."],
        ["통신 앱", "다른 사람의 메시지나 대화를 기록하려면 사전에 명시적인 동의를 받아야 합니다."]
      ],
      sources: [["공식", "설정과 권한 안내", "https://learn.chatgpt.com/docs/customization/computer-history"], ["참고", "Wikidocs 설정 정리", "https://wikidocs.net/blog/@openwiki/28526/"]]
    },
    8: {
      background: "../editorial-scenes-v2/security-access.webp",
      category: "사용자 통제",
      theme: "butter",
      variant: ["roomy", "explainer"],
      eyebrow: "PAUSE, EXCLUDE, DELETE",
      title: "앱을 빼고, 멈추고, 기록을 지울 수 있습니다",
      visual: { type: "tile-grid", items: [["제외", "앱·사이트별 차단"], ["중지", "일시정지와 재개"], ["삭제", "10분·1시간·하루·전체"], ["확인", "개별 기록과 메모리 열기"]] },
      cardBody: [
        "앱과 사이트를 제외하고 수집을 잠시 멈추거나 최근 기록을 지울 수 있습니다.",
        "기능을 끄는 것과 이미 만든 로컬 메모리를 삭제하는 것은 서로 다른 작업입니다."
      ],
      highlight: "수집 범위와 남은 메모리를 따로 관리",
      panelTitle: "사용자가 통제할 수 있는 것",
      summary: [
        "앱과 사이트를 제외하고 수집을 일시정지하거나 다시 켤 수 있습니다. 최근 10분, 1시간, 하루 또는 전체 기록을 지우는 선택지도 제공합니다.",
        "개별 타임라인 항목과 메모리도 삭제할 수 있습니다. 다만 기능을 끄는 것과 이미 만들어진 로컬 Markdown 메모리를 지우는 것은 별도로 확인해야 합니다."
      ],
      points: [
        ["즉시 멈추기", "민감한 대화나 개인 업무를 시작하기 전에 일시정지할 수 있습니다."],
        ["삭제 확인", "Computer History를 껐다고 로컬에 이미 생성된 Markdown 메모리까지 자동으로 모두 사라진다고 가정하면 안 됩니다."]
      ],
      sources: [["공식", "일시정지·제외·삭제", "https://learn.chatgpt.com/docs/customization/computer-history"], ["영상", "권한과 삭제 공식 데모", "https://youtu.be/W-HhMUe9hOg"]]
    },
    9: {
      background: "../editorial-scenes-v2/ai-infrastructure.webp",
      category: "데이터 경로",
      theme: "coral",
      variant: ["roomy", "diagram-large", "explainer"],
      eyebrow: "LOCAL FILES & PROCESSING",
      title: "임시 이벤트와 로컬 메모리는 보관 방식이 다릅니다",
      visual: { type: "flow", items: ["Mac 임시 이벤트", "일시적 서버 처리", "로컬 Markdown", "ChatGPT·Codex 활용"] },
      cardBody: [
        "임시 이벤트 파일은 Mac에 최대 48시간 남을 수 있습니다.",
        "정리된 로컬 Markdown 메모리는 사용자가 직접 삭제할 때까지 유지됩니다."
      ],
      highlight: "이벤트 최대 48시간 · 메모리는 직접 삭제",
      panelTitle: "데이터가 어디에 얼마나 남나",
      summary: [
        "Mac의 임시 이벤트 파일은 최대 48시간 남을 수 있고, 요약을 위해 일시적인 Codex 세션이 서버에서 처리합니다. OpenAI는 법적 의무가 없는 한 처리 뒤 이벤트 파일을 보관하거나 학습에 쓰지 않는다고 설명합니다.",
        "요약 결과인 로컬 Markdown 메모리는 사용자가 삭제할 때까지 남습니다. Computer History가 이 파일을 별도로 암호화하지 않으므로 같은 macOS 사용자 권한으로 실행되는 프로그램이 접근할 수 있습니다."
      ],
      points: [
        ["로컬 경로", "메모리는 $CODEX_HOME/memories/extensions/skysight/ 아래에 생성되며 일반적으로 ~/.codex 아래를 사용합니다."],
        ["암호화", "Computer History가 이 파일을 별도로 암호화하지 않아 같은 macOS 사용자 권한으로 실행되는 프로그램이 접근할 수 있습니다."]
      ],
      sources: [["공식", "보관 기간과 로컬 메모리", "https://learn.chatgpt.com/docs/customization/computer-history"], ["참고", "Wikidocs 개인정보 정리", "https://wikidocs.net/blog/@openwiki/28526/"]]
    },
    10: {
      background: "bg-risk.webp",
      category: "도입 전 확인",
      theme: "lilac",
      variant: ["roomy", "explainer"],
      eyebrow: "PRIVACY & PROMPT INJECTION",
      title: "편리함보다 먼저 권한과 민감정보를 점검해야 합니다",
      visual: { type: "tile-grid", items: [["프롬프트 인젝션", "앱·웹 콘텐츠가 악성 지시를 포함할 수 있음"], ["사람의 동의", "통신 기록은 사전 동의 필요"], ["민감한 앱", "건강·금융·개인 앱 제외 권장"], ["비용", "요약 과정에서 토큰 사용"]] },
      cardBody: [
        "AI가 읽는 앱과 웹이 늘어날수록 악성 지시와 과도한 수집 위험도 커집니다.",
        "민감한 앱은 빼고, 기록과 메모리를 정기적으로 확인하고 삭제해야 합니다."
      ],
      highlight: "필요한 앱만 허용 · 기록 확인 · 정기 삭제",
      panelTitle: "도입 전 마지막 체크리스트",
      summary: [
        "읽는 앱과 웹 콘텐츠가 늘어날수록 프롬프트 인젝션에 노출될 가능성도 커집니다. 통신 기록은 상대의 동의를 받고 건강·금융·개인 앱처럼 민감한 영역은 제외하는 편이 좋습니다.",
        "필요한 앱만 허용하고, 민감한 작업 전에는 잠시 멈추며, 타임라인과 로컬 메모리를 정기적으로 살펴보세요. 생성된 메모리와 채팅은 계정의 데이터 제어 설정에 따라 모델 개선에 쓰일 수 있습니다."
      ],
      points: [
        ["실무 체크리스트", "필요한 앱만 허용하고, 민감한 작업 전에 멈추며, 타임라인과 로컬 메모리를 정기적으로 살핍니다."],
        ["과장하지 않기", "이 기능이 생산성 격차를 크게 벌릴 것이라는 반응도 있지만, 실제 효과는 업무 종류와 권한 설계에 따라 달라집니다."]
      ],
      sources: [["공식", "보안·개인정보 주의사항", "https://learn.chatgpt.com/docs/customization/computer-history"], ["반응", "Threads 생산성 반응", "https://www.threads.com/share/GDkCxzJ9u/"]]
    }
  },
  sources: [
    ["OpenAI Computer History 공식 안내", "https://learn.chatgpt.com/docs/customization/computer-history"],
    ["OpenAI 공식 YouTube 데모", "https://youtu.be/W-HhMUe9hOg"],
    ["Threads 기능·영상 소개", "https://www.threads.com/share/DDQPu39_I/"],
    ["Threads 생산성 반응", "https://www.threads.com/share/GDkCxzJ9u/"],
    ["LinkedIn Computer History 정리", "https://www.linkedin.com/feed/update/urn:li:activity:7493856064396902401?updateEntityUrn=urn%3Ali%3Afs_updateV2%3A%28urn%3Ali%3Aactivity%3A7493856064396902401%2CFEED_DETAIL%2CEMPTY%2CDEFAULT%2Cfalse%29"],
    ["Wikidocs 기능·개인정보 정리", "https://wikidocs.net/blog/@openwiki/28526/"]
  ]
});


export const labels = {
  all: "전체",
  weekly: "주간 뉴스",
  brief: "짧막 뉴스",
  model: "모델 소식"
};
