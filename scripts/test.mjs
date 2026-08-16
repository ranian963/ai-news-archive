import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { isRobotScene, newsItems } from "../src/news-data.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docs = resolve(root, "docs");
const siteUrl = "https://ranian963.github.io/ai-news-archive/";
const failures = [];

const appSource = await readFile(resolve(root, "src", "app.js"), "utf8");
const appHash = createHash("sha256").update(appSource).digest("hex").slice(0, 10);

const styles = await readFile(resolve(root, "src", "styles.css"), "utf8");
const originalArtRule = styles.match(/\.card-frame--art-original > img\s*\{([^}]+)\}/)?.[1] ?? "";
const originalArtOpacity = Number(originalArtRule.match(/opacity:\s*([\d.]+)/)?.[1] ?? 0);
const paperOpacity = Number(styles.match(/--card-copy-paper-opacity:\s*([\d.]+)%/)?.[1] ?? 100);
const watercolorOpacity = Number(styles.match(/--card-copy-watercolor-opacity:\s*([\d.]+)/)?.[1] ?? 0);
if (paperOpacity < 84 || paperOpacity > 92 || watercolorOpacity > 0.18) {
  failures.push("카드 수채화가 도식과 글보다 진하거나 종이 질감이 사라졌습니다");
}
if (originalArtOpacity < 0.9 || /blur\(/.test(originalArtRule)) {
  failures.push("카드 바깥의 원본 일러스트가 흐리거나 지나치게 옅습니다");
}

async function assertFile(path, message) {
  try { await access(path); }
  catch { failures.push(`${message}: ${path}`); }
}

for (const item of newsItems) {
  await assertFile(resolve(docs, item.path, "index.html"), `뉴스 페이지 누락 (${item.id})`);
  const assetDir = resolve(docs, "assets", item.imageStem);
  const assets = (await readdir(assetDir)).filter((file) => /^\d{2}\.webp$/.test(file));
  const expectedAssets = Array.from({ length: item.cardCount }, (_, index) => `${String(index + 1).padStart(2, "0")}.webp`);
  const missingAssets = expectedAssets.filter((file) => !assets.includes(file));
  if (missingAssets.length) {
    failures.push(`${item.id}: 카드 이미지 누락 (${missingAssets.join(", ")})`);
  }
}

for (const item of newsItems) {
  if (!item.identity?.title) failures.push(`${item.id}: 상단 기사 이름 누락`);
  if (Object.keys(item.cardDetails ?? {}).length !== item.cardCount) {
    failures.push(`${item.id}: 카드별 상세 정보 누락`);
    continue;
  }
  const detailHtml = await readFile(resolve(docs, item.path, "index.html"), "utf8");
  const detailText = detailHtml.replace(/<[^>]+>/g, "");
  const liveCopyCards = [...detailHtml.matchAll(/class="card-frame card-frame--live-copy card-frame--art-(?:original|wash)(?: card-frame--watercolor-editorial)?"/g)].length;
  const textPanels = [...detailHtml.matchAll(/class="card-copy__panel"/g)].length;
  const watercolorLayers = [...detailHtml.matchAll(/class="card-copy__watercolor"/g)].length;
  const detailTemplates = [...detailHtml.matchAll(/data-card-detail-index="\d+"/g)].length;
  if (liveCopyCards !== item.cardCount || detailTemplates !== item.cardCount) {
    failures.push(`${item.id}: 카드 텍스트 또는 상세 패널 연결 누락`);
  }
  if (liveCopyCards !== item.cardCount || textPanels !== item.cardCount) {
    failures.push(`${item.id}: 실제 글자와 함께 보이는 카드 배경 영역 누락`);
  }
  if (watercolorLayers !== item.cardCount) {
    failures.push(`${item.id}: 반투명 종이 뒤의 흐린 수채화 레이어 누락`);
  }
  if (item.cardArtTreatment === "wash") {
    const washArt = [...detailHtml.matchAll(/class="card-art-wash"/g)].length;
    if (washArt !== item.cardCount) failures.push(`${item.id}: 글자 없는 파스텔 배경 장식 누락`);
  }
  for (const [number, detail] of Object.entries(item.cardDetails)) {
    if (!detail.eyebrow || !detail.highlight || (!detail.cardBody && !detail.modelRows)) {
      failures.push(`${item.id} ${number}번 카드 텍스트 데이터 누락`);
    }
    if (detail.visual && !detailHtml.includes(`card-visual--${detail.visual.type}`)) {
      failures.push(`${item.id} ${number}번 카드 도식 누락`);
    }
    if (!detailHtml.includes(`card-copy-title-${number}`) || !detailText.includes(detail.highlight)) {
      failures.push(`${item.id} ${number}번 카드의 실제 텍스트 레이어 누락`);
    }
    for (const [, label, url] of detail.sources) {
      const renderedUrl = (url.startsWith(siteUrl) ? `../../../${url.slice(siteUrl.length)}` : url).replaceAll("&", "&amp;");
      if (!detailText.includes(label) || !detailHtml.includes(renderedUrl)) failures.push(`${item.id} ${number}번 카드 출처 누락: ${label}`);
    }
  }
  const sourceSignatures = Object.values(item.cardDetails).map((detail) => detail.sources.map(([, , url]) => url).sort().join("|"));
  if (item.cardCount > 1 && new Set(sourceSignatures).size === 1) {
    failures.push(`${item.id}: 카드별 출처가 모두 같습니다`);
  }

  const watercolorCards = Object.values(item.cardDetails).filter((detail) => detail.background).length;
  if (watercolorCards !== item.cardCount) {
    failures.push(`${item.id}: 글자 없는 수채화 배경 ${item.cardCount}장 예상, ${watercolorCards}장 확인`);
  }
  if ([...detailHtml.matchAll(/class="card-frame card-frame--live-copy card-frame--art-(?:original|wash) card-frame--watercolor-editorial"/g)].length !== item.cardCount) {
    failures.push(`${item.id}: 카드별 수채화 편집 레이아웃 누락`);
  }
  const nonRobotBackgrounds = Object.values(item.cardDetails)
    .filter((detail) => !/ROBOT|로봇|조선소|용접/.test(`${detail.eyebrow} ${detail.title}`))
    .map((detail) => detail.background);
  if (nonRobotBackgrounds.some(isRobotScene)) {
    failures.push(`${item.id}: 로봇 소식이 아닌 카드에 로봇 배경이 연결됐습니다`);
  }

  if (item.id === "solar-pro-4") {
    if (!detailHtml.includes("artificial-analysis-index-full.webp") || detailHtml.includes("artificial-analysis-solar-pro4.webp")) {
      failures.push("solar-pro-4: 7번 카드에 Artificial Analysis 전체 그래프가 직접 들어가지 않았습니다");
    }
  }
}

const sourceRegister = JSON.parse(await readFile(resolve(root, "research", "source-register.json"), "utf8"));
const registerPairs = sourceRegister.map((source) => `${source.newsId}|${source.url}`);
if (!sourceRegister.length || sourceRegister.some((source) => !source.newsId || !/^https:\/\//.test(source.url) || !source.kind || !source.checkedAt || source.archiveStatus !== "link-only") || new Set(registerPairs).size !== registerPairs.length) {
  failures.push("참고 자료 출처 대장이 불완전합니다");
}
if (sourceRegister.some((source) => /huggingface\.co\/blog(?:\/|$)/.test(source.url) && source.kind === "repository-or-model-card")) {
  failures.push("Hugging Face 블로그를 모델 카드로 잘못 분류했습니다");
}
if (sourceRegister.some((source) => /artificialanalysis\.ai/.test(source.url) && source.kind !== "reference")) {
  failures.push("Artificial Analysis 자료 분류가 잘못됐습니다");
}

const htmlFiles = [resolve(docs, "index.html"), ...newsItems.map((item) => resolve(docs, item.path, "index.html"))];
for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, "utf8");
  const links = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const link of links) {
    if (/^(?:https?:|#|mailto:)/.test(link)) continue;
    const clean = link.split(/[?#]/)[0];
    if (!clean) continue;
    const target = resolve(dirname(htmlFile), clean);
    await assertFile(clean.endsWith("/") ? resolve(target, "index.html") : target, `깨진 내부 링크 (${htmlFile})`);
  }
  if (!html.includes("함께 볼 뉴스") && htmlFile !== resolve(docs, "index.html")) {
    failures.push(`관련 뉴스 영역 누락: ${htmlFile}`);
  }
}

const homeHtml = await readFile(resolve(docs, "index.html"), "utf8");
if (!homeHtml.includes(`src="app.js?v=${appHash}"`)) failures.push("app.js 캐시 갱신용 해시 누락");
const modelItems = newsItems.filter((item) => item.type === "model");
if (!homeHtml.includes('data-filter="model"') || !homeHtml.includes("모델 소식")) {
  failures.push("모델 소식 필터 또는 이름 누락");
}
const expectedModelIds = new Set([
  "solar-pro-4",
  "qwen-3-8-max",
  "qwen-3-8-27b",
  "grok-4-6",
  "kimi-k3",
  "claude-opus-5",
  "deepseek-v4-flash-0731",
  "muse-spark-1-2",
  "gpt-5-6-cyber",
  "muse-glimmer-30b",
  "nemotron-3-5-lightning",
  "gemini-3-7-flash",
  "deepseek-v4-pro-0813",
  "k-exaone-2",
  "ax-k2",
  "solar-open-2",
  "motif-3"
]);
if (modelItems.length !== expectedModelIds.size || modelItems.some((item) => !expectedModelIds.has(item.id))) {
  failures.push("모델 출시 기사 분류 누락 또는 중복");
}
const modelProfileLabels = ["모델 크기", "Context Length", "라이선스", "Input", "Output", "지식 기준일"];
for (const item of modelItems) {
  const profile = item.cardDetails?.[1]?.visual;
  if (profile?.type !== "model-profile" || profile.items?.length !== modelProfileLabels.length || profile.items.some(([label], index) => label !== modelProfileLabels[index])) {
    failures.push(`${item.id}: 첫 카드 모델 주요 정보 누락`);
  }
}
const modelTiles = [...homeHtml.matchAll(/data-type="model"/g)].length;
if (modelTiles !== modelItems.length) failures.push(`모델 소식 타일 ${modelItems.length}개 예상, ${modelTiles}개 확인`);
if (!homeHtml.includes('href="?type=model#news-list-title">모델 소식</a>')) failures.push("모바일에서도 사용할 모델 소식 메뉴 누락");
if (!homeHtml.includes("공개한 <span class=\"keep-inline\">Qwen3.8-Max</span>") || !homeHtml.includes("공개한 <span class=\"keep-inline\">Solar Pro 4</span>") || !homeHtml.includes("공개한 <span class=\"keep-inline\">Grok 4.6</span>")) {
  failures.push("한국어 제목과 모델명 사이 공백 누락");
}
const homeShareButtons = [...homeHtml.matchAll(/data-copy-link/g)];
if (homeShareButtons.length !== newsItems.length) {
  failures.push(`홈 공유 버튼 ${newsItems.length}개 예상, ${homeShareButtons.length}개 확인`);
}
for (const item of newsItems) {
  const expectedUrl = `data-copy-url="https://ranian963.github.io/ai-news-archive/${item.path}"`;
  if (!homeHtml.includes(expectedUrl)) failures.push(`홈 공유 주소 누락: ${item.id}`);
}

for (const item of newsItems) {
  const detailHtml = await readFile(resolve(docs, item.path, "index.html"), "utf8");
  const expectedUrl = `data-copy-url="https://ranian963.github.io/ai-news-archive/${item.path}"`;
  if (!detailHtml.includes("data-copy-link") || !detailHtml.includes(expectedUrl)) {
    failures.push(`뉴스 공유 버튼 또는 고유 주소 누락: ${item.id}`);
  }
  if (!detailHtml.includes('"@type":"NewsArticle"') || !detailHtml.includes(`"datePublished":"${item.published}"`) || !detailHtml.includes(`"mainEntityOfPage":"https://ranian963.github.io/ai-news-archive/${item.path}"`)) {
    failures.push(`뉴스 구조화 데이터 누락: ${item.id}`);
  }
  const readerIndex = detailHtml.indexOf('class="reader-stage reader-stage--');
  const carouselIndex = detailHtml.indexOf('class="carousel"');
  const identityIndex = detailHtml.indexOf('class="reader-toolbar__identity"');
  const headingCount = [...detailHtml.matchAll(/<h1\b/g)].length;
  const readerStagePattern = new RegExp(`class="reader-stage reader-stage--${item.type}(?:\\s+[^\"]+)?"`);
  if (!detailHtml.includes('<body class="detail-page">') || !readerStagePattern.test(detailHtml) || readerIndex < 0) {
    failures.push(`이미지 우선 뉴스 화면 누락: ${item.id}`);
  }
  if (identityIndex < readerIndex || carouselIndex < identityIndex) {
    failures.push(`상단 기사 이름과 첫 카드 순서가 잘못됨: ${item.id}`);
  }
  if (!detailHtml.includes('class="reader-toolbar"') || !detailHtml.includes('class="reader-toolbar__title"') || !detailHtml.includes('class="carousel__readout"')) {
    failures.push(`뉴스 뷰어 도구줄 또는 이동 안내 누락: ${item.id}`);
  }
  if (headingCount !== 1) failures.push(`${item.id}: 페이지 제목이 우측 패널에서 중복됨`);
  const toolbarHtml = detailHtml.slice(detailHtml.indexOf('<div class="reader-toolbar">'), detailHtml.indexOf('<div class="reader-layout">'));
  const publishedLabel = `${item.published.replaceAll("-", ".")}</time><span>발행</span>`;
  if (!toolbarHtml.includes(publishedLabel) || toolbarHtml.includes(`${item.cardCount}장`)) {
    failures.push(`${item.id}: 상단 발행일 또는 카드 수 표기가 잘못됨`);
  }
  const firstBackground = item.cardDetails?.[1]?.background;
  if (firstBackground) {
    const matchingPreload = `href="../../../assets/${item.imageStem}/${firstBackground}" fetchpriority="high"`;
    if (!detailHtml.includes(matchingPreload)) failures.push(`첫 카드 배경 preload 설정 불일치: ${item.id}`);
  } else {
    const firstCardSrcset = `srcset="../../../assets/${item.imageStem}/cover.webp 720w, ../../../assets/${item.imageStem}/01.webp 1080w"`;
    if (!detailHtml.includes(firstCardSrcset)) failures.push(`첫 카드 반응형 이미지 누락: ${item.id}`);
    const matchingPreload = `href="../../../assets/${item.imageStem}/cover.webp" imagesrcset="../../../assets/${item.imageStem}/cover.webp 720w, ../../../assets/${item.imageStem}/01.webp 1080w" imagesizes="(max-width: 792px) calc(100vw - 32px), 760px" fetchpriority="high"`;
    if (!detailHtml.includes(matchingPreload)) failures.push(`첫 카드 preload 설정 불일치: ${item.id}`);
  }
  const lowPriorityCards = [...detailHtml.matchAll(/fetchpriority="low"/g)].length;
  if (lowPriorityCards !== item.cardCount - 1) {
    failures.push(`${item.id}: 후속 카드 낮은 우선순위 ${item.cardCount - 1}개 예상, ${lowPriorityCards}개 확인`);
  }
  const deferredCards = [...detailHtml.matchAll(/data-deferred-image data-src="\.\.\/\.\.\/\.\.\/assets\//g)].length;
  if (deferredCards < item.cardCount - 1) {
    failures.push(`${item.id}: 후속 카드 지연 로딩 ${item.cardCount - 1}개 이상 예상, ${deferredCards}개 확인`);
  }
}

const solarItem = newsItems.find((item) => item.id === "solar-pro-4");
if (solarItem?.published !== "2026-08-11") failures.push("Solar Pro 4 기사 발행일이 8월 11일로 반영되지 않음");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`PASS: 뉴스 ${newsItems.length}개, 카드 ${newsItems.reduce((sum, item) => sum + item.cardCount, 0)}장, 내부 링크 검증 완료`);
