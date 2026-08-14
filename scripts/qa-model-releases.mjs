import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { newsItems } from "../src/news-data.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = resolve(root, "output", "qa", process.env.QA_OUTPUT_DIR ?? "model-releases");
const playwrightModule = process.env.PLAYWRIGHT_MODULE ?? "playwright";
const { chromium } = await import(playwrightModule);
const requestedIds = new Set(process.argv.slice(2));
const items = newsItems.filter((item) => requestedIds.size ? requestedIds.has(item.id) : item.type === "model");

if (!items.length) throw new Error("검사할 뉴스가 없습니다.");

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {})
});
const context = await browser.newContext({ permissions: ["clipboard-read", "clipboard-write"] });
const report = [];

for (const [viewport, width, height] of [["mobile", 390, 844], ["tablet", 768, 1024], ["desktop", 1280, 900]]) {
  const page = await context.newPage();
  await page.setViewportSize({ width, height });
  for (const item of items) {
    await page.goto(`http://127.0.0.1:4173/${item.path}`, { waitUntil: "networkidle" });
    await page.evaluate(async () => document.fonts.ready);
    const identity = (await page.locator(".reader-toolbar__title").textContent())?.trim() ?? "";
    if (!identity.includes(item.identity.title)) throw new Error(`${item.id}: 상단 모델명 누락`);

    const dots = page.locator("[data-pagination] button");
    if (await dots.count() !== item.cardCount) throw new Error(`${item.id}: 카드 선택 버튼 수 불일치`);
    for (let index = 0; index < item.cardCount; index += 1) {
      await dots.nth(index).click();
      await page.waitForFunction((position) => document.querySelector("[data-position]")?.textContent?.trim() === position, `${index + 1} / ${item.cardCount}`);
      const frame = page.locator(".card-frame").nth(index);
      const geometry = await frame.evaluate((element) => {
        const panel = element.querySelector(".card-copy__panel");
        const visual = element.querySelector(".card-visual");
        const frameRect = element.getBoundingClientRect();
        const panelRect = panel?.getBoundingClientRect();
        const visualRect = visual?.getBoundingClientRect();
        return {
          frame: [frameRect.width, frameRect.height],
          panelFits: !panelRect || (panelRect.left >= frameRect.left && panelRect.right <= frameRect.right && panelRect.top >= frameRect.top && panelRect.bottom <= frameRect.bottom),
          visualFits: !visualRect || !panelRect || (visualRect.left >= panelRect.left && visualRect.right <= panelRect.right && visualRect.top >= panelRect.top && visualRect.bottom <= panelRect.bottom),
          textOverflow: element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight
        };
      });
      if (!geometry.panelFits || !geometry.visualFits || geometry.textOverflow) throw new Error(`${viewport}/${item.id}/${index + 1}: 카드 넘침`);
      await frame.screenshot({ path: resolve(outputDir, `${viewport}-${item.id}-${String(index + 1).padStart(2, "0")}.png`) });
      report.push({ viewport, id: item.id, card: index + 1, geometry });
    }

    await page.locator(".card-frame").last().click({ position: { x: 20, y: 20 } });
    await page.keyboard.press("Home");
    await page.waitForFunction(() => document.querySelector("[data-position]")?.textContent?.trim()?.startsWith("1 /"));
    await page.keyboard.press("ArrowRight");
    await page.waitForFunction(() => document.querySelector("[data-position]")?.textContent?.trim()?.startsWith("2 /"));
    await page.keyboard.press("Space");
    await page.waitForFunction(() => document.querySelector("[data-position]")?.textContent?.trim()?.startsWith("3 /"));
    await page.keyboard.press("End");
    await page.waitForFunction((position) => document.querySelector("[data-position]")?.textContent?.trim() === position, `${item.cardCount} / ${item.cardCount}`);
    if (!await page.locator(".detail-header__summary").textContent() || !await page.locator(".card-detail__sources a").first().getAttribute("href")) {
      throw new Error(`${item.id}: 상세 설명 또는 출처 동기화 실패`);
    }
    if (await page.locator(".nav-button").first().evaluate((element) => element.getBoundingClientRect().height) < 44) {
      throw new Error(`${item.id}: 이동 버튼 높이 44px 미만`);
    }
  }
  await page.close();
}

const home = await context.newPage();
await home.setViewportSize({ width: 390, height: 844 });
await home.goto("http://127.0.0.1:4173/?type=model#news-list-title", { waitUntil: "networkidle" });
const visibleModels = await home.locator('[data-news-grid] > [data-type="model"]:not([hidden])').count();
const visibleOtherNews = await home.locator('[data-news-grid] > :not([data-type="model"]):not([hidden])').count();
if (visibleModels !== newsItems.filter((item) => item.type === "model").length || visibleOtherNews) throw new Error("홈 모델 소식 필터 결과 불일치");
await home.screenshot({ path: resolve(outputDir, "mobile-model-index.png"), fullPage: true });
await home.close();

await writeFile(resolve(outputDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
await browser.close();
console.log(`PASS: ${items.length}개 뉴스, ${report.length}개 카드 상태`);
