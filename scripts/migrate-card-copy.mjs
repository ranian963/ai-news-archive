import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const archiveRoot = resolve(root, "..");

async function readJson(path) {
  return JSON.parse(await readFile(resolve(archiveRoot, path), "utf8"));
}

function cardsFrom(value) {
  return Array.isArray(value) ? value : value.cards;
}

function normalize(card) {
  const body = card.body?.length
    ? card.body
    : card.lines?.length
      ? card.lines
      : [...(card.table_rows ?? []).map((row) => row.join(" · ")), ...(card.note ? [card.note] : [])];
  return {
    eyebrow: card.label,
    title: Array.isArray(card.title) ? card.title.join(" ") : card.title,
    body,
    highlight: card.emphasis ?? card.highlight,
    theme: ({ apricot: "butter", sage: "mint", lavender: "lilac" })[card.accent] ?? card.accent ?? "coral"
  };
}

const weeklyJuly20 = [
  ["WEEKLY AI BRIEF", "에이전트가 경계를 넘은 주", ["모델·수학·오픈웨이트부터", "보안·하네스·한국 AI까지"], "7월 20–26일 · 핵심 7개", "coral"],
  ["GLOBAL · MODEL", "Claude Opus 5, 가격 유지·성능 상향", ["입력 1M tokens당 5달러,", "출력 25달러로 Opus 4.8과 동일.", "코딩·지식 업무·장시간 작업 개선,", "더 비싼 Fable 5에 근접한 성능.", "Anthropic 자체 평가 기준."], "입력 $5 · 출력 $25", "lilac"],
  ["GLOBAL · INCIDENT", "에이전트의 능력이 통제를 앞질렀다", ["패키지 캐시 프록시 제로데이 발견.", "샌드박스 탈출 뒤 권한 상승,", "Hugging Face 운영 환경과", "평가 답안 정보까지 접근."], "능력이 통제를 앞질렀다", "sky"],
  ["GLOBAL · SCIENCE", "AI가 수학 난제를 푸는 방식이 달라졌다", ["1939년 야코비안 추측의 특정 형태,", "Claude 기반 시스템과 수학자의 명시적 반례.", "Lean 4 독립 검증 자료까지 공개,", "후보 생성·반박·형식 검증의 결합."], "생성 → 반박 → 형식 검증", "mint"],
  ["GLOBAL · OPEN WEIGHT", "Kimi K3, 오픈웨이트와 규제 충돌", ["GPU 수요 초과로 신규 유료 구독 일시 중단.", "전체 가중치는 7월 27일 공개 예정.", "미국 규제 움직임과 약 200개 기업 반대,", "오픈웨이트를 둘러싼 정책 경쟁으로 확대."], "출시 완료 아님 · 공개 예정", "butter"],
  ["GLOBAL · HARNESS", "이제 경쟁 단위는 모델이 아니다", ["835쪽 SQLite 설명서만으로", "Rust DB 재구성에 도전한 에이전트 스웜.", "계획·실행·공유 메모리·검토를 분리하자", "비슷한 결과에도 비용 격차가 확대."], "계획 모델 + 실행 모델", "coral"],
  ["KOREA · INFRA", "한국 AI, 공급망에서 인프라로", ["샌프란시스코 AI 서밋에서 발표된", "협력 프로젝트 합계 9,500억 달러.", "단일 투자 계약이 아닌 다년 공급·투자 계획,", "반도체에서 데이터센터·전력까지 확장."], "단일 계약 아님 · 다년 계획", "lilac"],
  ["KOREA · MODEL", "한국 AI, 직접 운영할 선택지가 늘었다", ["Motif-3 프리뷰는 AA 지수 44점.", "Solar Open 2는 250B MoE,", "토큰당 15B active.", "H200 2장 구동 · 1M context.", "Upstage 공개 사양 기준."], "250B total · 15B active", "sky"]
].map(([eyebrow, title, body, highlight, theme]) => ({ eyebrow, title, body, highlight, theme }));

const deepDiveContext = { window: {} };
vm.runInNewContext(await readFile(resolve(archiveRoot, "deep-dive-data.js"), "utf8"), deepDiveContext);
const deepDive = deepDiveContext.window.CARD_NEWS_DECK.cards.map(normalize);

const weeklyJuly27 = cardsFrom(await readJson("deliverables/2026-07-27-08-02/card-news/cards.json")).map(normalize);
const genoffice = cardsFrom(await readJson("deliverables/2026-08-03-genoffice/card-news/cards.json")).map(normalize);
const qwen = cardsFrom(await readJson("deliverables/2026-08-07-qwen38-max/card-news/cards.json")).map(normalize);

const incidentRaw = await readJson("openai-hf-incident-site/content/cards.json");
const incident = incidentRaw.map((card) => ({
  eyebrow: card.kicker,
  title: card.title,
  body: [card.lead, ...card.items.slice(0, 3).map((item) => `${item.title} · ${item.text}`)],
  highlight: card.bottom,
  theme: card.items[0]?.tone ?? "coral",
  sources: [["공식·발표", card.sourceLabel, card.sourceUrl]]
}));

const output = { weeklyJuly20, deepDive, weeklyJuly27, genoffice, qwen, incident };
await writeFile(resolve(root, "src/legacy-card-copy.mjs"), `export const legacyCardCopy = ${JSON.stringify(output, null, 2)};\n`);
