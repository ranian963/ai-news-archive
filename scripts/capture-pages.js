async (page) => {
  const routes = [
    ["home", "/"],
    ["weekly-2026-07-20-26", "/news/weekly/2026-07-20-26/"],
    ["ai-agent-deep-dive", "/news/brief/ai-agent-deep-dive/"],
    ["weekly-2026-07-27-08-02", "/news/weekly/2026-07-27-08-02/"],
    ["genoffice", "/news/brief/genoffice/"],
    ["solar-pro-4", "/news/brief/solar-pro-4/"],
    ["qwen-3-8-max", "/news/brief/qwen-3-8-max/"],
    ["openai-huggingface-incident", "/news/brief/openai-huggingface-incident/"],
    ["weekly-2026-08-03-09", "/news/weekly/2026-08-03-09/"]
  ];
  const viewports = [
    ["mobile", 375, 812],
    ["tablet", 768, 1024],
    ["desktop", 1280, 900]
  ];
  const results = [];
  for (const [viewport, width, height] of viewports) {
    for (const [name, route] of routes) {
      const capturePage = await page.context().newPage();
      await capturePage.setViewportSize({ width, height });
      await capturePage.bringToFront();
      await capturePage.goto(`http://127.0.0.1:4173${route}`, { waitUntil: "networkidle" });
      await capturePage.locator("img").first().waitFor({ state: "visible" });
      await capturePage.evaluate(async () => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        for (const scroller of document.querySelectorAll("[data-track], [data-pagination]")) {
          scroller.scrollLeft = 0;
        }
        for (const image of document.images) {
          if (image.dataset.src) image.src = image.dataset.src;
          if (image.dataset.srcset) image.srcset = image.dataset.srcset;
          image.loading = "eager";
        }
        await document.fonts.ready;
        await Promise.all([...document.images].map((image) => image.decode().catch(() => null)));
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      });
      const overflow = await capturePage.evaluate(() => ({
        horizontal: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        scrollX: window.scrollX
      }));
      if (overflow.horizontal || overflow.scrollX !== 0) {
        throw new Error(`${viewport}/${name}: horizontal drift ${JSON.stringify(overflow)}`);
      }
      const filename = `output/playwright/redesign-${viewport}-${name}.png`;
      await capturePage.screenshot({ path: filename, fullPage: true });
      await capturePage.close();
      results.push({ viewport, name, overflow, filename });
    }
  }
  return results;
}
