import { cp, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { labels, newsItems } from "../src/news-data.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "docs");
const siteUrl = "https://ranian963.github.io/ai-news-archive/";

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const pageShell = ({ title, description, canonical, cssPath, scriptPath, body, socialImage, preloadImage }) => `<!doctype html>
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
  ${preloadImage ? `<link rel="preload" as="image" href="${preloadImage}" fetchpriority="high">` : ""}
  <link rel="icon" href="${cssPath.startsWith("../../../") ? "../../../" : ""}favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${cssPath}">
  <script src="${scriptPath}" defer></script>
</head>
<body>
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
      <a href="${base}?type=brief#news-list-title">짧막 뉴스</a>
      <a href="${base}">전체 보기</a>
    </nav>
  </div>
</header>`;

const footer = (base) => `<footer class="site-footer">
  <div class="site-footer__inner">
    <p>AI Trend Note · 팀과 나누기 위해 정리한 AI 뉴스</p>
    <a href="${base}">뉴스 아카이브</a>
  </div>
</footer>`;

const category = (item) => `<span class="category-label${item.type === "weekly" ? " category-label--weekly" : ""}">${labels[item.type]}</span>`;
const itemHref = (item, base = "") => `${base}${item.path}`;
const imageHref = (item, index, base = "") => `${base}assets/${item.imageStem}/${String(index).padStart(2, "0")}.webp`;

function tile(item, base = "", heading = "h2", eager = false) {
  const tagHtml = item.tags.slice(1, 4).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
  return `<article class="news-tile" data-type="${item.type}" data-search="${escapeHtml(`${item.title} ${item.summary} ${item.tags.join(" ")}`.toLocaleLowerCase("ko"))}">
    <a class="news-tile__image-link" href="${itemHref(item, base)}">
      <img class="news-tile__image" src="${imageHref(item, 1, base)}" width="1080" height="1350" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} alt="${escapeHtml(item.coverAlt)}">
    </a>
    <div class="news-tile__meta">${category(item)}<time datetime="${item.published}">${item.displayDate}</time></div>
    <${heading}><a href="${itemHref(item, base)}">${escapeHtml(item.title)}</a></${heading}>
    <p class="news-tile__summary">${escapeHtml(item.summary)}</p>
    <div class="tags" aria-label="주제">${tagHtml}</div>
  </article>`;
}

function homeHtml() {
  const items = [...newsItems].reverse();
  const body = `<main id="main" class="archive-main">
    <section class="archive-intro" aria-labelledby="archive-title">
      <p class="eyebrow">AI NEWS ARCHIVE</p>
      <h1 id="archive-title">한 주씩, 한 소식씩 쌓아두는 AI 뉴스</h1>
      <p class="archive-intro__copy">주간 뉴스는 한 주의 흐름을 묶고, 짧막 뉴스는 하나의 중요한 소식을 자세히 다룹니다. 지나간 카드뉴스도 같은 자리에서 다시 볼 수 있습니다.</p>
      <p class="archive-intro__note">현재 ${newsItems.length}개 뉴스 · 카드 ${newsItems.reduce((sum, item) => sum + item.cardCount, 0)}장</p>
    </section>
    <section aria-labelledby="news-list-title">
      <h2 id="news-list-title" class="eyebrow">NEWS INDEX</h2>
      <div class="filters">
        <div class="filter-buttons" aria-label="뉴스 종류">
          <button class="filter-button" type="button" data-filter="all" aria-pressed="true">전체</button>
          <button class="filter-button" type="button" data-filter="weekly" aria-pressed="false">주간 뉴스</button>
          <button class="filter-button" type="button" data-filter="brief" aria-pressed="false">짧막 뉴스</button>
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
    description: "주간 AI 뉴스와 주요 단일 소식을 카드뉴스로 모아 보는 공개 아카이브",
    canonical: siteUrl,
    cssPath: "styles.css",
    scriptPath: "app.js",
    socialImage: `${siteUrl}assets/openai-huggingface-incident/01.webp`,
    preloadImage: "assets/openai-huggingface-incident/01.webp",
    body
  });
}

function relatedItems(item) {
  const ignored = new Set(["주간 뉴스", "짧막 뉴스"]);
  const own = new Set(item.tags.filter((tag) => !ignored.has(tag)));
  return newsItems
    .filter((candidate) => candidate.id !== item.id)
    .map((candidate) => ({ candidate, score: candidate.tags.filter((tag) => own.has(tag)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.candidate.published.localeCompare(a.candidate.published))
    .slice(0, 3)
    .map(({ candidate }) => candidate);
}

function detailHtml(item, index) {
  const base = "../../../";
  const previous = newsItems[index - 1];
  const next = newsItems[index + 1];
  const related = relatedItems(item);
  const slides = Array.from({ length: item.cardCount }, (_, cardIndex) => {
    const number = cardIndex + 1;
    const alt = number === 1 ? item.coverAlt : `${item.title} 카드뉴스 ${number}번째 장, 전체 ${item.cardCount}장`;
    return `<figure class="slide" aria-label="${number}번째 카드, 전체 ${item.cardCount}장">
      <img src="${imageHref(item, number, base)}" width="1080" height="1350" ${number === 1 ? 'fetchpriority="high"' : 'loading="lazy"'} alt="${escapeHtml(alt)}">
    </figure>`;
  }).join("");
  const relatedHtml = related.map((relatedItem) => `<article class="related-card">
    <a href="${itemHref(relatedItem, base)}">
      <img src="${imageHref(relatedItem, 1, base)}" width="1080" height="1350" loading="lazy" alt="${escapeHtml(relatedItem.coverAlt)}">
      <h3>${escapeHtml(relatedItem.title)}</h3>
    </a>
  </article>`).join("");
  const previousHtml = previous ? `<a class="news-navigation__link" href="${itemHref(previous, base)}" aria-label="이전 뉴스: ${escapeHtml(previous.title)}"><span class="news-navigation__label">이전 뉴스</span><span class="news-navigation__title">${escapeHtml(previous.title)}</span></a>` : `<span></span>`;
  const nextHtml = next ? `<a class="news-navigation__link news-navigation__link--next" href="${itemHref(next, base)}" aria-label="다음 뉴스: ${escapeHtml(next.title)}"><span class="news-navigation__label">다음 뉴스</span><span class="news-navigation__title">${escapeHtml(next.title)}</span></a>` : `<span></span>`;
  const sourceHtml = item.sources.map(([label, url]) => `<li><a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a></li>`).join("");
  const body = `<main id="main" class="detail-main">
    <nav class="breadcrumb" aria-label="현재 위치"><a href="${base}">뉴스 아카이브</a> / ${labels[item.type]}</nav>
    <header class="detail-header">
      <div class="detail-header__meta">${category(item)}<time datetime="${item.published}">${item.displayDate}</time><span>${item.cardCount}장</span></div>
      <h1>${escapeHtml(item.title)}</h1>
      <p class="detail-header__summary">${escapeHtml(item.summary)}</p>
      <div class="tags" aria-label="주제">${item.tags.slice(1).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
    </header>
    <section class="carousel" data-carousel aria-label="${escapeHtml(item.title)} 카드뉴스">
      <p class="carousel__instructions" id="carousel-instructions">좌우로 밀거나 방향키·Space·Home·End 키로 이동할 수 있습니다.</p>
      <div class="carousel__track" data-track role="group" aria-roledescription="캐러셀" aria-describedby="carousel-instructions" tabindex="0">${slides}</div>
      <div class="carousel__controls">
        <button class="nav-button" type="button" data-previous-card aria-label="이전 카드"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>이전</span></button>
        <p class="carousel__position" data-position aria-live="polite" aria-atomic="true">1 / ${item.cardCount}</p>
        <button class="nav-button" type="button" data-next-card aria-label="다음 카드"><span>다음</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      </div>
      <div class="pagination" data-pagination aria-label="카드 바로 가기"></div>
    </section>
    <section class="detail-section" aria-labelledby="sources-title"><h2 id="sources-title">참고한 자료</h2><ul class="source-list">${sourceHtml}</ul></section>
    <nav class="detail-section news-navigation" aria-label="다른 뉴스">${previousHtml}<a class="news-navigation__home" href="${base}">전체 뉴스 보기</a>${nextHtml}</nav>
    ${related.length ? `<section class="detail-section" aria-labelledby="related-title"><h2 id="related-title">함께 볼 뉴스</h2><div class="related-grid">${relatedHtml}</div></section>` : ""}
  </main>`;
  const canonical = `${siteUrl}${item.path}`;
  return pageShell({
    title: `${item.title} · AI Trend Note`,
    description: item.summary,
    canonical,
    cssPath: `${base}styles.css`,
    scriptPath: `${base}app.js`,
    socialImage: `${siteUrl}assets/${item.imageStem}/01.webp`,
    preloadImage: imageHref(item, 1, base),
    body
  });
}

await mkdir(output, { recursive: true });
await cp(resolve(root, "src/styles.css"), resolve(output, "styles.css"));
await cp(resolve(root, "src/app.js"), resolve(output, "app.js"));
await cp(resolve(root, "src/favicon.svg"), resolve(output, "favicon.svg"));
await writeFile(resolve(output, ".nojekyll"), "");
await writeFile(resolve(output, "index.html"), homeHtml());

for (const [index, item] of newsItems.entries()) {
  const target = resolve(output, item.path, "index.html");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, detailHtml(item, index));
}

await writeFile(resolve(output, "404.html"), `<!doctype html><meta charset="utf-8"><title>페이지를 찾을 수 없습니다</title><meta http-equiv="refresh" content="0; url=${siteUrl}"><a href="${siteUrl}">AI 뉴스 아카이브로 이동</a>`);
console.log(`Built ${newsItems.length} news pages in ${output}`);
