import { createHash } from "node:crypto";
import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { labels, newsItems } from "../src/news-data.mjs";
import { researchItems } from "../src/research-data.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "docs");
const siteUrl = "https://ranian963.github.io/ai-news-archive/";
const appSource = await readFile(resolve(root, "src/app.js"), "utf8");
const appVersion = createHash("sha256").update(appSource).digest("hex").slice(0, 10);
const inlineStyles = (await readFile(resolve(root, "src/styles.css"), "utf8"))
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\s+/g, " ")
  .replace(/\s*([{}:;,])\s*/g, "$1")
  .trim();
const sourceCheckedAt = "2026-08-14";

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

function renderedSourceLink(url, base = "../../../") {
  if (!url.startsWith(siteUrl)) return { href: url, external: true };
  return { href: `${base}${url.slice(siteUrl.length)}`, external: false };
}

const keepInlinePhrases = [
  "Qwen3.8-27B",
  "Qwen3.8-Max",
  "Solar Pro 4",
  "Solar Pro 3",
  "Solar Open 2",
  "ARC-AGI-3",
  "Claude Code",
  "Claude Opus 5",
  "Opus 4.6 Max",
  "Claude Fable 5",
  "Hugging Face",
  "Kimi K3",
  "Muse Spark 1.2",
  "Muse Glimmer 30B",
  "Nemotron 3.5 Lightning",
  "Gemini 3.7 Flash",
  "GPT-5.6 Cyber",
  "DeepSeek V4 Flash 0731",
  "DeepSeek V4 Pro 0813",
  "GPT Image 2",
  "Grok Imagine Image 2.0",
  "Grok 4.6",
  "Computer History",
  "$CODEX_HOME",
  "ChatGPT desktop app",
  "8월 14일",
  "DeepSeek V4-Flash",
  "Gemini Robotics 2",
  "Seedance 2.5",
  "Motif-3 Beta",
  "Motif-3",
  "K-EXAONE 2.0",
  "A.X K2",
  "Context Length",
  "384 experts",
  "95.5%로",
  "가격 인하",
  "바탕으로 한 정리",
  "긴 문서 과제",
  "한국어 실무 과제",
  "SWE-bench Pro",
  "화면 작업",
  "기본 설정"
];

function inlineText(value) {
  let html = escapeHtml(value);
  for (const phrase of keepInlinePhrases) {
    html = html.replaceAll(phrase, `<span class="keep-inline">${phrase}</span>`);
  }
  return html;
}

const pageShell = ({ title, description, canonical, cssPath, scriptPath, body, bodyClass = "", socialImage, preloadImage, preloadImageSrcset = "", preloadImageSizes = "", structuredData }) => `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f8f5ef">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="ko_KR">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${socialImage}">
  <meta name="twitter:card" content="summary_large_image">
${structuredData ? `  <script type="application/ld+json">${JSON.stringify(structuredData).replaceAll("<", "\\u003c")}</script>` : ""}
  ${preloadImage ? `<link rel="preload" as="image" href="${preloadImage}"${preloadImageSrcset ? ` imagesrcset="${preloadImageSrcset}" imagesizes="${preloadImageSizes}"` : ""} fetchpriority="high">` : ""}
  <link rel="icon" href="${cssPath.startsWith("../../../") ? "../../../" : ""}favicon.svg" type="image/svg+xml">
  <style>${inlineStyles}</style>
  <script src="${scriptPath}?v=${appVersion}" defer></script>
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ""}>
  <a class="skip-link" href="#main">본문으로 이동</a>
  ${header(cssPath.startsWith("../../../") ? "../../../" : "")}
  ${body}
  ${footer(cssPath.startsWith("../../../") ? "../../../" : "")}
</body>
</html>`;

const header = (base) => `<header class="site-header">
  <div class="site-header__inner">
    <a class="brand" href="${base}">AI Trend Note</a>
    <nav class="site-nav" aria-label="주요 메뉴">
      <a href="${base}?type=weekly#news-list-title">주간 뉴스</a>
      <a href="${base}?type=model#news-list-title">모델 소식</a>
      <a href="${base}?type=brief#news-list-title">짧막 뉴스</a>
      <a href="${base}?type=research#news-list-title">리서치</a>
      <a href="${base}">전체 뉴스 보기</a>
    </nav>
  </div>
</header>`;

const footer = (base) => `<footer class="site-footer">
  <div class="site-footer__inner">
    <p>AI Trend Note · 팀과 나누기 위해 정리한 AI 뉴스</p>
    <a href="${base}">뉴스 아카이브</a>
  </div>
</footer>`;

const category = (item) => `<span class="category-label category-label--${item.type}">${labels[item.type]}</span>`;
const itemHref = (item, base = "") => `${base}${item.path}`;
const imageFile = (item, index) => item.cardDetails?.[index]?.image ?? `${String(index).padStart(2, "0")}.webp`;
const imageHref = (item, index, base = "") => `${base}assets/${item.imageStem}/${imageFile(item, index)}`;
const coverHref = (item, base = "") => `${base}assets/${item.imageStem}/cover.webp`;
const cardBackgroundHref = (item, index, base = "") => {
  const background = item.cardDetails?.[index]?.background;
  return background ? `${base}assets/${item.imageStem}/${background}` : imageHref(item, index, base);
};
const canonicalHref = (item) => `${siteUrl}${item.path}`;
const publicationDate = (item) => item.published.replaceAll("-", ".");

function readerIdentity(item) {
  const brand = item.identity?.brand
    ? `<span class="reader-toolbar__brand">${inlineText(item.identity.brand)}</span>`
    : "";
  return `<div class="reader-toolbar__identity">
    <span class="reader-toolbar__category reader-toolbar__category--${item.type}">${labels[item.type]}</span>
    ${brand}<h1 id="news-title" class="reader-toolbar__title">${inlineText(item.identity?.title ?? item.title)}</h1>
    <p class="reader-toolbar__published"><time datetime="${item.published}">${publicationDate(item)}</time><span>발행</span></p>
  </div>`;
}

function shareButton(item, variant = "") {
  const modifier = variant ? ` ${variant}` : "";
  return `<button class="share-button${modifier}" type="button" data-copy-link data-copy-url="${canonicalHref(item)}">
    <svg class="share-button__icon share-button__icon--copy" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
    <svg class="share-button__icon share-button__icon--check" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <span data-copy-label aria-live="polite">링크 복사</span><span class="sr-only">: ${escapeHtml(item.title)}</span>
  </button>`;
}

function newsDetailContent(item) {
  return `<div class="detail-header__meta">${category(item)}<time datetime="${item.published}">${publicationDate(item)} 발행</time></div>
    <p class="detail-header__summary">${inlineText(item.summary)}</p>
    <div class="tags" aria-label="주제">${item.tags.slice(1).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>`;
}

function cardDetailContent(number, detail, base) {
  const points = (detail.points ?? []).map(([title, description]) => `<li><strong>${inlineText(title)}</strong><span>${inlineText(description)}</span></li>`).join("");
  const sources = detail.sources.map(([type, label, url]) => {
    const link = renderedSourceLink(url, base);
    const externalAttributes = link.external ? ' target="_blank" rel="noreferrer"' : ' data-internal-link';
    return `<li><a href="${escapeHtml(link.href)}"${externalAttributes}><span class="card-detail__source-type">${escapeHtml(type)}</span><span>${inlineText(label)}</span><span class="card-detail__external">${link.external ? "새 창" : "이동"}</span></a></li>`;
  }).join("");
  const modifier = detail.modelRows ? " card-detail--dense" : "";
  const panelTitle = detail.panelTitle ? `<h2 class="card-detail__title">${inlineText(detail.panelTitle)}</h2>` : "";
  const summary = Array.isArray(detail.summary)
    ? `<div class="detail-header__summary detail-header__summary--stacked">${detail.summary.map((paragraph) => `<p>${inlineText(paragraph)}</p>`).join("")}</div>`
    : `<p class="detail-header__summary">${inlineText(detail.summary)}</p>`;
  const pointsSection = points ? `<section class="card-detail__section" aria-labelledby="card-points-title"><h2 id="card-points-title">카드에서 볼 내용</h2><ul class="card-detail__points">${points}</ul></section>` : "";
  return `<div class="card-detail${modifier}"><p class="card-detail__eyebrow">지금 읽는 내용</p>
    <p class="card-detail__category">${number} · ${escapeHtml(detail.category)}</p>${panelTitle}${summary}${pointsSection}
    <section class="card-detail__section" aria-labelledby="card-sources-title"><h2 id="card-sources-title">관련 링크</h2><ul class="card-detail__sources">${sources}</ul><a class="card-detail__all-sources" href="#sources-title">전체 참고자료 보기</a></section></div>`;
}

function cardVisualContent(visual) {
  if (!visual) return "";
  const simpleItems = visual.items ?? [];
  if (visual.type === "metric" || visual.type === "compare" || visual.type === "risk") {
    return `<div class="card-visual card-visual--${visual.type}" aria-label="주요 수치">${simpleItems.map(([label, value]) => `<span><small>${inlineText(label)}</small><strong>${inlineText(value)}</strong></span>`).join("")}</div>`;
  }
  if (visual.type === "model-profile") {
    return `<dl class="card-visual card-visual--model-profile" aria-label="모델 주요 정보">${simpleItems.map(([label, value]) => `<div><dt>${inlineText(label)}</dt><dd>${inlineText(value)}</dd></div>`).join("")}</dl>`;
  }
  if (visual.type === "flow") {
    return `<ol class="card-visual card-visual--flow" aria-label="내용 흐름">${simpleItems.map((item) => `<li>${inlineText(item)}</li>`).join("")}</ol>`;
  }
  if (visual.type === "timeline") {
    return `<ol class="card-visual card-visual--timeline" aria-label="주요 흐름">${simpleItems.map(([time, label]) => `<li><strong>${inlineText(time)}</strong><span>${inlineText(label)}</span></li>`).join("")}</ol>`;
  }
  if (visual.type === "milestones") {
    return `<ol class="card-visual card-visual--milestones" aria-label="주요 이정표">${simpleItems.map(([time, label]) => `<li><strong>${inlineText(time)}</strong><span>${inlineText(label)}</span></li>`).join("")}</ol>`;
  }
  if (visual.type === "tile-grid") {
    return `<div class="card-visual card-visual--tile-grid" aria-label="핵심 비교">${simpleItems.map(([label, value]) => `<span><small>${inlineText(label)}</small><strong>${inlineText(value)}</strong></span>`).join("")}</div>`;
  }
  if (visual.type === "triple-list") {
    const headers = visual.columns ?? ["항목", "구분", "값"];
    return `<div class="card-visual card-visual--triple-list"${visual.layout ? ` data-layout="${escapeHtml(visual.layout)}"` : ""} role="table" aria-label="핵심 비교"><div class="card-visual__list-head" role="row">${headers.map((column) => `<strong role="columnheader">${inlineText(column)}</strong>`).join("")}</div>${simpleItems.map((row) => `<div role="row">${row.map((cell) => `<span role="cell">${inlineText(cell)}</span>`).join("")}</div>`).join("")}</div>`;
  }
  if (visual.type === "allocation") {
    return `<div class="card-visual card-visual--allocation" aria-label="100점 배점 구성"><div class="card-visual__allocation-bar">${simpleItems.map(([label, value]) => `<span style="--allocation:${Number(value)}" title="${escapeHtml(label)} ${Number(value)}점"></span>`).join("")}</div><div class="card-visual__allocation-key">${simpleItems.map(([label, value]) => `<span><small>${inlineText(label)}</small><strong>${Number(value)}점</strong></span>`).join("")}</div></div>`;
  }
  if (visual.type === "bars") {
    return `<div class="card-visual card-visual--bars" aria-label="수치 비교">${simpleItems.map(([label, value, display]) => `<span><small>${inlineText(label)}</small><i><b style="--bar-value:${Number(value)}%"></b></i><strong>${inlineText(display)}</strong></span>`).join("")}${visual.note ? `<p class="card-visual__note">${inlineText(visual.note)}</p>` : ""}</div>`;
  }
  if (visual.type === "ranking") {
    return `<div class="card-visual card-visual--ranking-wrap"><ol class="card-visual--ranking" aria-label="순위 비교">${simpleItems.map(([rank, label, value]) => `<li><b>${inlineText(rank)}</b><span>${inlineText(label)}</span><strong>${inlineText(value)}</strong></li>`).join("")}</ol>${visual.note ? `<p class="card-visual__note">${inlineText(visual.note)}</p>` : ""}</div>`;
  }
  if (visual.type === "price-shift") {
    return `<div class="card-visual card-visual--price-shift" aria-label="${escapeHtml(visual.ariaLabel ?? "가격 변경과 업무 비용 계산")}"><div class="card-visual__price-states">${simpleItems.map(([label, period, value]) => `<span><small>${inlineText(label)}</small><strong>${inlineText(value)}</strong><em>${inlineText(period)}</em></span>`).join('<b aria-hidden="true">→</b>')}</div><p class="card-visual__price-change">${inlineText(visual.change)}</p><p class="card-visual__cost-rule"><small>${inlineText(visual.totalLabel ?? "업무 한 건의 비용")}</small><strong>${inlineText(visual.total)}</strong></p></div>`;
  }
  if (visual.type === "table") {
    return `<div class="card-visual card-visual--table" data-columns="${visual.columns.length}" role="table" aria-label="모델 비교"><div role="row">${visual.columns.map((column) => `<strong role="columnheader">${inlineText(column)}</strong>`).join("")}</div>${visual.rows.map((row) => `<div role="row">${row.map((cell) => `<span role="cell">${inlineText(cell)}</span>`).join("")}</div>`).join("")}</div>`;
  }
  return "";
}

function cardOverlayContent(item, number, detail) {
  if (!detail?.eyebrow) return "";
  const watercolorSource = cardBackgroundHref(item, number, "../../../");
  const watercolor = number === 1
    ? `<img class="card-copy__watercolor" src="${watercolorSource}" width="1080" height="1350" aria-hidden="true" alt="">`
    : `<img class="card-copy__watercolor" data-deferred-image data-src="${watercolorSource}" width="1080" height="1350" loading="lazy" decoding="async" aria-hidden="true" alt="">`;
  const body = detail.cardBody?.length
    ? `<div class="card-copy__body">${detail.cardBody.map((line) => `<p>${inlineText(line)}</p>`).join("")}</div>`
    : "";
  const visual = cardVisualContent(detail.visual);
  const models = detail.modelRows?.length
    ? `<div class="card-copy__models">${detail.modelRows.map(([name, specification, description]) => `<section class="card-copy__model"><h3>${inlineText(name)}</h3><p class="card-copy__specification">${inlineText(specification)}</p><p>${inlineText(description)}</p></section>`).join("")}</div>`
    : "";
  const comparisonMedia = detail.mediaComparisons?.length
    ? `<figure class="card-copy__comparison-media"><a href="../../../assets/${item.imageStem}/${escapeHtml(detail.mediaFull)}" target="_blank" rel="noreferrer" aria-label="${escapeHtml(detail.mediaAlt)} 전체 크기로 보기"><div>${detail.mediaComparisons.map(({ image, label, value }) => `<span class="card-copy__comparison-item"><img src="../../../assets/${item.imageStem}/${escapeHtml(image)}" width="180" height="640" loading="eager" decoding="async" alt=""><span><strong>${escapeHtml(label)}</strong><b>${escapeHtml(value)}점</b></span></span>`).join("")}</div></a><figcaption>${escapeHtml(detail.mediaCaption)}</figcaption></figure>`
    : "";
  const media = detail.media
    ? `<figure class="card-copy__media">${detail.mediaFull ? `<a href="../../../assets/${item.imageStem}/${escapeHtml(detail.mediaFull)}" target="_blank" rel="noreferrer" aria-label="${escapeHtml(detail.mediaAlt)} 전체 크기로 보기">` : ""}<img src="../../../assets/${item.imageStem}/${escapeHtml(detail.media)}" width="${detail.mediaWidth ?? 1200}" height="${detail.mediaHeight ?? 505}" loading="eager" decoding="async" alt="${escapeHtml(detail.mediaAlt)}">${detail.mediaFull ? "</a>" : ""}${detail.mediaHighlights?.length ? `<div class="card-copy__media-highlights" aria-label="그래프 주요 수치">${detail.mediaHighlights.map(([label, value]) => `<span><b>${escapeHtml(label)}</b><strong>${escapeHtml(value)}</strong></span>`).join("")}</div>` : ""}<figcaption>${escapeHtml(detail.mediaCaption)}</figcaption></figure>`
    : "";
  const pageLabel = detail.pageLabel ? `<p class="card-copy__page">${escapeHtml(detail.pageLabel)}</p>` : "";
  const authoredVariants = Array.isArray(detail.variant)
    ? detail.variant
    : String(detail.variant ?? "").split(/\s+/).filter(Boolean);
  const variants = [...authoredVariants, (detail.cardBody?.join("").length ?? 0) > 210 ? "compact" : ""].filter(Boolean);
  const variant = variants.map((name) => ` card-copy--${name}`).join("");
  const mainContent = detail.visual?.type === "model-profile" ? `${body}${visual}` : `${visual}${body}`;
  return `<article class="card-copy${variant}" data-theme="${escapeHtml(detail.theme ?? "coral")}" aria-labelledby="card-copy-title-${number}">
    <div class="card-copy__panel">
      ${watercolor}<p class="card-copy__eyebrow">${escapeHtml(detail.eyebrow)}</p>
      <h2 id="card-copy-title-${number}">${inlineText(detail.title)}</h2>${comparisonMedia || media}${mainContent}${models}
      <p class="card-copy__highlight">${inlineText(detail.highlight)}</p>
    </div>
  </article>${pageLabel}`;
}

function tile(item, base = "", heading = "h2", eager = false) {
  const tagHtml = item.tags.slice(1, 4).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
  const cover = item.type === "research"
    ? `<a class="news-tile__image-link research-cover-link" href="${itemHref(item, base)}">
      <span class="research-cover" aria-label="${escapeHtml(item.title)} 연구 보고서">
        <span class="research-cover__eyebrow">AI RESEARCH REPORT</span>
        <strong>${inlineText(item.title)}</strong>
        <span class="research-cover__copy">네 모델의 사양, 구조, 평가 결과를 한 문서에서 비교합니다.</span>
        <span class="research-cover__subjects">${item.subjects.map((subject) => `<span>${inlineText(subject)}</span>`).join("")}</span>
        <span class="research-cover__format">HTML REPORT</span>
      </span>
    </a>`
    : `<a class="news-tile__image-link" href="${itemHref(item, base)}">
      <img class="news-tile__image" src="${coverHref(item, base)}" srcset="${coverHref(item, base)} 720w, ${imageHref(item, 1, base)} 1080w" sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 900px) 50vw, 380px" width="720" height="900" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} alt="${escapeHtml(item.coverAlt)}">
    </a>`;
  return `<article class="news-tile" data-type="${item.type}" data-search="${escapeHtml(`${item.title} ${item.summary} ${item.tags.join(" ")}`.toLocaleLowerCase("ko"))}">
    ${cover}
    <div class="news-tile__meta">${category(item)}<time datetime="${item.published}">${publicationDate(item)} 발행</time></div>
    <${heading}><a href="${itemHref(item, base)}">${inlineText(item.title)}</a></${heading}>
    <p class="news-tile__summary">${inlineText(item.summary)}</p>
    <div class="tags" aria-label="주제">${tagHtml}</div>
    ${shareButton(item, "share-button--tile")}
  </article>`;
}

const chronologicalNewsItems = [...newsItems].sort((a, b) => a.published.localeCompare(b.published));
const chronologicalArchiveItems = [...newsItems, ...researchItems].sort((a, b) => a.published.localeCompare(b.published));

function homeHtml() {
  const items = [...chronologicalArchiveItems].reverse();
  const featured = [...chronologicalNewsItems].reverse()[0];
  const body = `<main id="main" class="archive-main">
    <section class="archive-intro" aria-labelledby="archive-title">
      <p class="eyebrow">AI NEWS ARCHIVE</p>
      <h1 id="archive-title">한 주씩, 한 소식씩 쌓아두는 AI 뉴스</h1>
      <p class="archive-intro__copy">주간 뉴스는 한 주의 흐름을 묶고, 모델 소식은 새로 나온 모델 하나를 자세히 살펴봅니다. 긴 비교 분석과 실험 기록은 리서치에서 원문 형태로 제공합니다.</p>
      <p class="archive-intro__note">현재 ${newsItems.length}개 뉴스 · 리서치 ${researchItems.length}개 · 카드 ${newsItems.reduce((sum, item) => sum + item.cardCount, 0)}장</p>
    </section>
    <section aria-labelledby="news-list-title">
      <h2 id="news-list-title" class="eyebrow">NEWS INDEX</h2>
      <div class="filters">
        <div class="filter-buttons" aria-label="뉴스 종류">
          <button class="filter-button" type="button" data-filter="all" aria-pressed="true">전체</button>
          <button class="filter-button" type="button" data-filter="weekly" aria-pressed="false">주간 뉴스</button>
          <button class="filter-button" type="button" data-filter="model" aria-pressed="false">모델 소식</button>
          <button class="filter-button" type="button" data-filter="brief" aria-pressed="false">짧막 뉴스</button>
          <button class="filter-button" type="button" data-filter="research" aria-pressed="false">리서치</button>
        </div>
        <div class="search-field">
          <label for="news-search">제목이나 주제로 찾기</label>
          <input id="news-search" type="search" data-search-input placeholder="예: OpenAI, 한국 AI, 보안">
        </div>
      </div>
      <p class="result-line"><span>최신 뉴스부터 표시</span><strong data-result-count>${items.length}개</strong></p>
      <div class="news-grid" data-news-grid>${items.map((item, index) => tile(item, "", "h2", index === 0)).join("")}</div>
      <p class="empty-state" data-empty hidden>검색 조건에 맞는 뉴스가 없습니다.</p>
    </section>
  </main>`;
  return pageShell({
    title: "AI Trend Note · AI 뉴스 아카이브",
    description: "주간 AI 뉴스와 새 모델 출시 소식, 주요 단일 이슈를 카드뉴스로 모아 보는 공개 아카이브",
    canonical: siteUrl,
    cssPath: "styles.css",
    scriptPath: "app.js",
    socialImage: `${siteUrl}assets/${featured.imageStem}/01.webp`,
    preloadImage: coverHref(featured),
    preloadImageSrcset: `${coverHref(featured)} 720w, ${imageHref(featured, 1)} 1080w`,
    preloadImageSizes: "(max-width: 640px) calc(100vw - 32px), (max-width: 900px) 50vw, 380px",
    body
  });
}

function relatedItems(item) {
  const ignored = new Set(["주간 뉴스", "짧막 뉴스", "모델 소식"]);
  const own = new Set(item.tags.filter((tag) => !ignored.has(tag)));
  return newsItems
    .filter((candidate) => candidate.id !== item.id)
    .map((candidate) => ({ candidate, score: candidate.tags.filter((tag) => own.has(tag)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.candidate.published.localeCompare(a.candidate.published))
    .slice(0, 3)
    .map(({ candidate }) => candidate);
}

function sourceKind(label, url) {
  if (/lilys\.ai/.test(url)) return "transcript";
  if (/threads\.com/.test(url)) return "threads";
  if (/youtu(?:\.be|be\.com)/.test(url)) return "video";
  if (/huggingface\.co\/blog(?:\/|$)/.test(url)) return "reference";
  if (/github\.com/.test(url) || (/huggingface\.co/.test(url) && !/huggingface\.co\/blog(?:\/|$)/.test(url))) return "repository-or-model-card";
  if (/artificialanalysis\.ai|news\.hada\.io|aiwire\.kr|axios\.com|nature\.com|arxiv\.org|zenodo\.org/.test(url)) return "reference";
  if (/kimi\.com|anthropic\.com|platform\.claude\.com|api-docs\.deepseek\.com|research\.meta\.ai|openai\.com|blogs\.nvidia\.com|blog\.google|ai\.google\.dev|qwen\.ai/.test(url)) return "official";
  if (/공식|Upstage|OpenAI|Google|xAI|Prime|Liquid|Mistral|InclusionAI|Anthropic/.test(label)) return "official";
  return "reference";
}

function sourceRegister() {
  const records = new Map();
  for (const item of [...newsItems, ...researchItems]) {
    const uses = [];
    for (const [number, detail] of Object.entries(item.cardDetails ?? {})) {
      for (const [, label, url] of detail.sources) uses.push({ label, url, card: Number(number) });
    }
    for (const [label, url] of item.sources) uses.push({ label, url, card: null });
    for (const use of uses) {
      const key = `${item.id}|${use.url}`;
      const record = records.get(key) ?? {
        newsId: item.id,
        label: use.label,
        url: use.url,
        kind: sourceKind(use.label, use.url),
        checkedAt: item.checkedAt ?? sourceCheckedAt,
        archiveStatus: "link-only",
        cards: []
      };
      if (use.card && !record.cards.includes(use.card)) record.cards.push(use.card);
      records.set(key, record);
    }
  }
  return [...records.values()].sort((a, b) => a.newsId.localeCompare(b.newsId) || a.url.localeCompare(b.url));
}

function researchDocumentHtml(item, source) {
  const canonical = canonicalHref(item);
  const metadata = `  <link rel="canonical" href="${canonical}">\n  <meta property="og:url" content="${canonical}">\n`;
  const returnLink = `<nav class="ai-trend-return-bar" aria-label="AI Trend Note"><a class="ai-trend-return" href="../../">AI Trend Note 리서치 목록</a></nav>`;
  const returnStyle = `<style>.ai-trend-return-bar{display:flex;justify-content:flex-start;align-items:center;min-height:60px;padding:8px clamp(16px,4vw,48px);background:#fffaf0;border-bottom:1px solid #e8dfd2}.ai-trend-return{min-height:44px;display:inline-flex;align-items:center;padding:0 14px;border:1px solid #ded8cf;border-radius:10px;color:#2d2a28;background:#fffdf9;font:700 14px/1.4 "Apple SD Gothic Neo",Pretendard,"Noto Sans KR",system-ui,sans-serif;text-decoration:none}.ai-trend-return::before{content:"←";margin-right:8px}.ai-trend-return:focus-visible{outline:3px solid #665d91;outline-offset:3px}</style>\n`;
  return source
    .replace("</head>", `${metadata}${returnStyle}</head>`)
    .replace(/<body([^>]*)>/, `<body$1>${returnLink}`);
}

function detailHtml(item) {
  const base = "../../../";
  const index = chronologicalNewsItems.findIndex((candidate) => candidate.id === item.id);
  const previous = chronologicalNewsItems[index - 1];
  const next = chronologicalNewsItems[index + 1];
  const related = relatedItems(item);
  const slides = Array.from({ length: item.cardCount }, (_, cardIndex) => {
    const number = cardIndex + 1;
    const alt = number === 1 ? item.coverAlt : `${item.title} 카드뉴스 ${number}번째 장, 전체 ${item.cardCount}장`;
    const overlay = cardOverlayContent(item, number, item.cardDetails?.[number]);
    const backgroundSource = cardBackgroundHref(item, number, base);
    const hasEditorialBackground = Boolean(item.cardDetails?.[number]?.background);
    const responsiveSource = number === 1 && !hasEditorialBackground ? ` srcset="${coverHref(item, base)} 720w, ${imageHref(item, 1, base)} 1080w" sizes="(max-width: 792px) calc(100vw - 32px), 760px"` : "";
    const source = number === 1 ? `src="${backgroundSource}"` : `data-deferred-image data-src="${backgroundSource}"`;
    const image = `<img ${source}${responsiveSource} width="1080" height="1350" ${number === 1 ? 'fetchpriority="high"' : 'loading="lazy" fetchpriority="low" decoding="async"'} alt="${overlay ? "" : escapeHtml(alt)}">`;
    if (overlay) {
      const artTreatment = item.cardArtTreatment === "wash" ? "wash" : "original";
      const artDecoration = artTreatment === "wash"
        ? `<div class="card-art-wash" data-theme="${escapeHtml(item.cardDetails?.[number]?.theme ?? "coral")}" aria-hidden="true"><span></span><span></span><span></span></div>`
        : "";
      const editorialVariant = hasEditorialBackground ? " card-frame--watercolor-editorial" : "";
      return `<figure class="slide"><div class="card-frame card-frame--live-copy card-frame--art-${artTreatment}${editorialVariant}">${image}${artDecoration}${overlay}</div><figcaption class="sr-only">${escapeHtml(alt)}</figcaption></figure>`;
    }
    return `<figure class="slide" aria-label="${number}번째 카드, 전체 ${item.cardCount}장"><div class="card-frame">${image}</div></figure>`;
  }).join("");
  const relatedHtml = related.map((relatedItem) => `<article class="related-card">
    <a href="${itemHref(relatedItem, base)}">
      <img data-deferred-image data-src="${coverHref(relatedItem, base)}" data-srcset="${coverHref(relatedItem, base)} 720w, ${imageHref(relatedItem, 1, base)} 1080w" sizes="(max-width: 640px) 112px, 300px" width="720" height="900" loading="lazy" decoding="async" alt="${escapeHtml(relatedItem.coverAlt)}">
      <h3>${inlineText(relatedItem.title)}</h3>
    </a>
  </article>`).join("");
  const previousHtml = previous ? `<a class="news-navigation__link" href="${itemHref(previous, base)}"><span class="news-navigation__label">이전 뉴스</span><span class="news-navigation__title">${inlineText(previous.title)}</span></a>` : `<span></span>`;
  const nextHtml = next ? `<a class="news-navigation__link news-navigation__link--next" href="${itemHref(next, base)}"><span class="news-navigation__label">다음 뉴스</span><span class="news-navigation__title">${inlineText(next.title)}</span></a>` : `<span></span>`;
  const sourceHtml = item.sources.map(([label, url]) => {
    const link = renderedSourceLink(url, base);
    const attributes = link.external ? ' target="_blank" rel="noreferrer"' : ' data-internal-link';
    return `<li><a href="${escapeHtml(link.href)}"${attributes}><span class="source-list__label">${inlineText(label)}</span></a></li>`;
  }).join("");
  const videoHtml = item.video?.youtubeId && /^[A-Za-z0-9_-]{6,20}$/.test(item.video.youtubeId)
    ? `<section class="detail-section article-video" aria-labelledby="article-video-title">
      <div class="article-video__copy">
        <p class="eyebrow">OFFICIAL DEMO</p>
        <h2 id="article-video-title">${inlineText(item.video.title)}</h2>
        <p>${inlineText(item.video.description)}</p>
      </div>
      <div class="article-video__frame">
        <iframe src="https://www.youtube-nocookie.com/embed/${escapeHtml(item.video.youtubeId)}" title="${escapeHtml(item.video.title)}" width="960" height="540" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
    </section>`
    : "";
  const articleIntroHtml = item.articleIntro
    ? `<section class="detail-section article-intro" aria-labelledby="article-intro-title">
      <div class="article-intro__heading">
        <p class="eyebrow">${escapeHtml(item.articleIntro.eyebrow ?? "한눈에 읽기")}</p>
        <h2 id="article-intro-title">${inlineText(item.articleIntro.title)}</h2>
      </div>
      <div class="article-intro__body">${item.articleIntro.body.map((paragraph) => `<p>${inlineText(paragraph)}</p>`).join("")}</div>
      <dl class="article-intro__facts">${item.articleIntro.facts.map(([term, description]) => `<div><dt>${inlineText(term)}</dt><dd>${inlineText(description)}</dd></div>`).join("")}</dl>
    </section>`
    : "";
  const cardDetailTemplates = Object.entries(item.cardDetails ?? {}).map(([number, detail]) => `<template data-card-detail-index="${Number(number) - 1}">${cardDetailContent(number, detail, base)}</template>`).join("");
  const readerMode = item.readerMode ? ` reader-stage--${escapeHtml(item.readerMode)}` : "";
  const body = `<main id="main" class="detail-main">
    <section class="reader-stage reader-stage--${item.type}${readerMode}" aria-labelledby="news-title">
      <div class="reader-toolbar">
        <a class="reader-toolbar__back" href="${base}" aria-label="뉴스 목록으로 돌아가기"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>뉴스 목록</span></a>
        ${readerIdentity(item)}
        ${shareButton(item, "share-button--detail")}
      </div>
      <div class="reader-layout">
        <section class="carousel" data-carousel aria-label="${escapeHtml(item.title)} 카드뉴스">
          <p class="sr-only" id="carousel-instructions">좌우로 밀거나 방향키, Space, Home, End 키로 이동할 수 있습니다.</p>
          <div class="carousel__track" data-track role="group" aria-roledescription="캐러셀" aria-describedby="carousel-instructions" tabindex="0">${slides}</div>
          <div class="carousel__controls">
            <button class="nav-button" type="button" data-previous-card aria-label="이전 카드"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>이전</span></button>
            <div class="carousel__readout"><p class="carousel__position" data-position aria-live="polite" aria-atomic="true">1 / ${item.cardCount}</p><span>스와이프 · 방향키 · Space</span></div>
            <button class="nav-button" type="button" data-next-card aria-label="다음 카드"><span>다음</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          </div>
          <div class="pagination" data-pagination aria-label="카드 바로 가기"></div>
        </section>
        <aside class="detail-header" data-card-detail-region aria-label="현재 카드 설명" aria-live="polite">${newsDetailContent(item)}</aside>${cardDetailTemplates ? `
        ${cardDetailTemplates}` : ""}
      </div>
    </section>${articleIntroHtml ? `
    ${articleIntroHtml}` : ""}${videoHtml ? `
    ${videoHtml}` : ""}
    <section class="detail-section" aria-labelledby="sources-title"><h2 id="sources-title">참고한 자료</h2><ul class="source-list">${sourceHtml}</ul></section>
    <nav class="detail-section news-navigation" aria-label="다른 뉴스">${previousHtml}<a class="news-navigation__home" href="${base}">전체 뉴스 보기</a>${nextHtml}</nav>
    ${related.length ? `<section class="detail-section" aria-labelledby="related-title"><h2 id="related-title">함께 볼 뉴스</h2><div class="related-grid">${relatedHtml}</div></section>` : ""}
  </main>`;
  const canonical = canonicalHref(item);
  const socialImage = `${siteUrl}assets/${item.imageStem}/01.webp`;
  return pageShell({
    title: `${item.title} · AI Trend Note`,
    description: item.summary,
    canonical,
    cssPath: `${base}styles.css`,
    scriptPath: `${base}app.js`,
    socialImage,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: item.title,
      description: item.summary,
      datePublished: item.published,
      dateModified: item.published,
      inLanguage: "ko-KR",
      mainEntityOfPage: canonical,
      image: [socialImage],
      publisher: { "@type": "Organization", name: "AI Trend Note", url: siteUrl }
    },
    preloadImage: item.cardDetails?.[1]?.background ? cardBackgroundHref(item, 1, base) : coverHref(item, base),
    preloadImageSrcset: item.cardDetails?.[1]?.background ? "" : `${coverHref(item, base)} 720w, ${imageHref(item, 1, base)} 1080w`,
    preloadImageSizes: "(max-width: 792px) calc(100vw - 32px), 760px",
    bodyClass: "detail-page",
    body
  });
}

await mkdir(output, { recursive: true });
await cp(resolve(root, "src/styles.css"), resolve(output, "styles.css"));
await cp(resolve(root, "src/app.js"), resolve(output, "app.js"));
await cp(resolve(root, "src/favicon.svg"), resolve(output, "favicon.svg"));
await writeFile(resolve(output, ".nojekyll"), "");
await writeFile(resolve(output, "index.html"), homeHtml());

for (const item of newsItems) {
  const target = resolve(output, item.path, "index.html");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, detailHtml(item));
}

for (const item of researchItems) {
  const target = resolve(output, item.path, "index.html");
  const source = await readFile(resolve(root, item.sourceFile), "utf8");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, researchDocumentHtml(item, source));
}

await writeFile(resolve(output, "404.html"), `<!doctype html><meta charset="utf-8"><title>페이지를 찾을 수 없습니다</title><meta http-equiv="refresh" content="0; url=${siteUrl}"><a href="${siteUrl}">AI 뉴스 아카이브로 이동</a>`);
await mkdir(resolve(root, "research"), { recursive: true });
await writeFile(resolve(root, "research", "source-register.json"), `${JSON.stringify(sourceRegister(), null, 2)}\n`);
console.log(`Built ${newsItems.length} news pages and ${researchItems.length} research pages in ${output}`);
