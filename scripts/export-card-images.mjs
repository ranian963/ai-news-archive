import { execFile } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { newsItems } from "../src/news-data.mjs";

const execFileAsync = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const playwrightModule = process.env.PLAYWRIGHT_MODULE ?? "playwright";
const { chromium } = await import(playwrightModule);
const requestedIds = new Set(process.argv.slice(2));
const items = newsItems.filter((item) => !requestedIds.size || requestedIds.has(item.id));

if (!items.length) throw new Error("내보낼 뉴스 ID가 없습니다.");

const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {})
});
const page = await browser.newPage({ viewport: { width: 1160, height: 1480 }, deviceScaleFactor: 1 });

for (const item of items) {
  await page.goto(`http://127.0.0.1:4173/${item.path}`, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: `
    #export-card-root { position: absolute; inset: 0 auto auto 0; z-index: 9999; width: 1080px; height: 1350px; }
    #export-card-root .card-frame { width: 1080px !important; height: 1350px !important; }
  ` });

  const assetDir = resolve(root, "docs", "assets", item.imageStem);
  await mkdir(assetDir, { recursive: true });
  for (let index = 0; index < item.cardCount; index += 1) {
    await page.evaluate(async (cardIndex) => {
      document.querySelector("#export-card-root")?.remove();
      const source = document.querySelectorAll(".carousel .card-frame")[cardIndex];
      if (!source) throw new Error(`카드 ${cardIndex + 1}을 찾을 수 없습니다.`);
      const exportRoot = document.createElement("div");
      exportRoot.id = "export-card-root";
      const clone = source.cloneNode(true);
      for (const image of clone.querySelectorAll("img")) {
        if (image.dataset.src) image.src = image.dataset.src;
        if (image.dataset.srcset) image.srcset = image.dataset.srcset;
        image.removeAttribute("loading");
      }
      exportRoot.append(clone);
      document.body.append(exportRoot);
      await document.fonts.ready;
      await Promise.all([...clone.querySelectorAll("img")].map((image) => image.decode().catch(() => null)));
    }, index);
    const frame = page.locator("#export-card-root .card-frame");
    const png = resolve(assetDir, `.export-${index + 1}.png`);
    const webp = resolve(assetDir, `${String(index + 1).padStart(2, "0")}.webp`);
    await frame.screenshot({ path: png });
    await execFileAsync("cwebp", ["-quiet", "-q", "86", png, "-o", webp]);
    if (index === 0) {
      await execFileAsync("cwebp", ["-quiet", "-q", "84", "-resize", "720", "900", png, "-o", resolve(assetDir, "cover.webp")]);
    }
    await rm(png);
  }
  console.log(`Exported ${item.id}: ${item.cardCount} cards`);
}

await browser.close();
