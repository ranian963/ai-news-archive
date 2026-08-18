import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { newsItems } from "../src/news-data.mjs";

const id = process.argv[2] ?? "weekly-2026-08-10-16";
const item = newsItems.find((candidate) => candidate.id === id);
if (!item) throw new Error(`뉴스를 찾을 수 없습니다: ${id}`);

const outputDir = resolve("output", "qa", id);
const url = `http://127.0.0.1:4173/${item.path}`;
const playwrightModule = process.env.PLAYWRIGHT_MODULE ?? "playwright";
const { chromium } = await import(playwrightModule);

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
});
const context = await browser.newContext();
const report = [];
const viewports = [
  ["mobile", 375, 812],
  ["tablet", 768, 1024],
  ["desktop", 1280, 900]
];

const settle = (page) => page.evaluate(() => new Promise((done) => {
  document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(done)));
}));

const loadLazyImages = async (page) => {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight * 0.75) {
      window.scrollTo(0, y);
      await new Promise((done) => setTimeout(done, 40));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((done) => setTimeout(done, 120));
    await Promise.all([...document.images].map((image) => image.complete
      ? Promise.resolve()
      : new Promise((done) => image.addEventListener("load", done, { once: true }))));
    window.scrollTo(0, 0);
  });
  await settle(page);
};

const captureCompositedFullPage = async (page, width, height, path) => {
  await loadLazyImages(page);
  await page.locator(".article-video").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  let pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.setViewportSize({ width, height: pageHeight });
  await page.evaluate(() => window.scrollTo(0, 0));
  await settle(page);
  const settledHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  if (settledHeight !== pageHeight) {
    pageHeight = settledHeight;
    await page.setViewportSize({ width, height: pageHeight });
    await page.evaluate(() => window.scrollTo(0, 0));
    await settle(page);
  }
  await page.waitForTimeout(600);
  await page.screenshot({ path });
  await page.setViewportSize({ width, height });
};

const captureCompleteElement = async (page, selector, width, height, path) => {
  const element = page.locator(selector);
  const elementHeight = await element.evaluate((node) => Math.ceil(node.getBoundingClientRect().height));
  if (elementHeight > height) {
    await page.setViewportSize({ width, height: elementHeight + 32 });
    await settle(page);
  }
  await element.scrollIntoViewIfNeeded();
  await settle(page);
  await element.screenshot({ path });
  if (elementHeight > height) await page.setViewportSize({ width, height });
};

for (const [viewport, width, height] of viewports) {
  const page = await context.newPage();
  await page.setViewportSize({ width, height });
  await page.goto(url, { waitUntil: "networkidle" });
  await settle(page);
  const dots = page.locator("[data-pagination] button");
  if (await dots.count() !== item.cardCount) throw new Error(`${viewport}: 카드 선택 버튼 수 불일치`);

  for (let index = 0; index < item.cardCount; index += 1) {
    await dots.nth(index).click();
    await page.waitForFunction(
      (position) => document.querySelector("[data-position]")?.textContent?.trim() === position,
      `${index + 1} / ${item.cardCount}`
    );
    await settle(page);
    const frame = page.locator(".card-frame").nth(index);
    const geometry = await frame.evaluate((element) => {
      const panel = element.querySelector(".card-copy__panel");
      const visual = element.querySelector(".card-visual");
      const frameRect = element.getBoundingClientRect();
      const panelRect = panel?.getBoundingClientRect();
      const visualRect = visual?.getBoundingClientRect();
      const inside = (inner, outer) => !inner || (
        inner.left >= outer.left - 0.5 && inner.right <= outer.right + 0.5 &&
        inner.top >= outer.top - 0.5 && inner.bottom <= outer.bottom + 0.5
      );
      return {
        frame: [frameRect.width, frameRect.height],
        panelFits: inside(panelRect, frameRect),
        visualFits: !visualRect || !panelRect || inside(visualRect, panelRect),
        contentFits: element.scrollWidth <= element.clientWidth && element.scrollHeight <= element.clientHeight
      };
    });
    if (!geometry.panelFits || !geometry.visualFits || !geometry.contentFits) {
      throw new Error(`${viewport}/${index + 1}: 카드 내용 넘침`);
    }
    await frame.screenshot({
      path: resolve(outputDir, `${viewport}-${id}-${String(index + 1).padStart(2, "0")}.png`)
    });
    report.push({ viewport, card: index + 1, geometry });
  }

  for (const [name, selector] of [["article-intro", ".article-intro"], ["video", ".article-video"]]) {
    await captureCompleteElement(page, selector, width, height, resolve(outputDir, `section-${viewport}-${name}.png`));
  }
  await captureCompositedFullPage(page, width, height, resolve(outputDir, `page-${viewport}.png`));
  await page.close();

  const home = await context.newPage();
  await home.setViewportSize({ width, height });
  await home.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
  await settle(home);
  await loadLazyImages(home);
  const weeklyCard = home.locator(`[data-news-grid] > article:has(a[href="${item.path}"])`).first();
  if (!await weeklyCard.count()) throw new Error(`${viewport}: 홈에서 주간 뉴스 카드 누락`);
  await weeklyCard.screenshot({ path: resolve(outputDir, `home-${viewport}.png`) });
  await home.close();
}

const pairedPage = await context.newPage();
await pairedPage.setViewportSize({ width: 1280, height: 900 });
await pairedPage.goto(url, { waitUntil: "networkidle" });
await settle(pairedPage);
const pairedDots = pairedPage.locator("[data-pagination] button");
for (let index = 0; index < item.cardCount; index += 1) {
  await pairedDots.nth(index).click();
  await pairedPage.waitForFunction(
    (position) => document.querySelector("[data-position]")?.textContent?.trim() === position,
    `${index + 1} / ${item.cardCount}`
  );
  await pairedPage.evaluate(() => window.scrollTo(0, 0));
  await settle(pairedPage);
  const detailGeometry = await pairedPage.locator("[data-card-detail-region]").evaluate((panel) => {
    const finalLink = panel.querySelector(".card-detail__all-sources");
    const panelRect = panel.getBoundingClientRect();
    const linkRect = finalLink?.getBoundingClientRect();
    return {
      panelBottom: panelRect.bottom,
      finalLinkBottom: linkRect?.bottom ?? Number.POSITIVE_INFINITY,
      viewportHeight: window.innerHeight,
      hasNestedScroll: getComputedStyle(panel).overflowY !== "visible"
    };
  });
  if (
    detailGeometry.panelBottom > detailGeometry.viewportHeight + 0.5 ||
    detailGeometry.finalLinkBottom > detailGeometry.viewportHeight + 0.5 ||
    detailGeometry.hasNestedScroll
  ) {
    throw new Error(`desktop/${index + 1}: 카드 설명이 첫 화면을 벗어남`);
  }
  await pairedPage.screenshot({ path: resolve(outputDir, `paired-desktop-${String(index + 1).padStart(2, "0")}.png`) });
}
await pairedPage.close();

await writeFile(resolve(outputDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
await browser.close();
console.log(`PASS: ${item.cardCount * 3}개 카드 + ${item.cardCount}개 페어 + 6개 섹션 + 3개 전체 페이지 + 3개 홈 카드`);
