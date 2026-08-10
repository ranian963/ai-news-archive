import { access, readFile, readdir } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { newsItems } from "../src/news-data.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docs = resolve(root, "docs");
const failures = [];

async function assertFile(path, message) {
  try { await access(path); }
  catch { failures.push(`${message}: ${path}`); }
}

for (const item of newsItems) {
  await assertFile(resolve(docs, item.path, "index.html"), `뉴스 페이지 누락 (${item.id})`);
  const assetDir = resolve(docs, "assets", item.imageStem);
  const assets = (await readdir(assetDir)).filter((file) => /^\d{2}\.webp$/.test(file));
  if (assets.length !== item.cardCount) {
    failures.push(`${item.id}: 카드 ${item.cardCount}장 예상, ${assets.length}장 확인`);
  }
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
const homeShareButtons = [...homeHtml.matchAll(/data-copy-link/g)];
if (homeShareButtons.length !== newsItems.length) {
  failures.push(`홈 공유 버튼 ${newsItems.length}개 예상, ${homeShareButtons.length}개 확인`);
}

for (const item of newsItems) {
  const detailHtml = await readFile(resolve(docs, item.path, "index.html"), "utf8");
  const expectedUrl = `data-copy-url="https://ranian963.github.io/ai-news-archive/${item.path}"`;
  if (!detailHtml.includes("data-copy-link") || !detailHtml.includes(expectedUrl)) {
    failures.push(`뉴스 공유 버튼 또는 고유 주소 누락: ${item.id}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`PASS: 뉴스 ${newsItems.length}개, 카드 ${newsItems.reduce((sum, item) => sum + item.cardCount, 0)}장, 내부 링크 검증 완료`);
