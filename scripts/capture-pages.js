async (page) => {
  const routes = [
    ["home", "/"],
    ["weekly-2026-07-20-26", "/news/weekly/2026-07-20-26/"],
    ["ai-agent-deep-dive", "/news/brief/ai-agent-deep-dive/"],
    ["weekly-2026-07-27-08-02", "/news/weekly/2026-07-27-08-02/"],
    ["genoffice", "/news/brief/genoffice/"],
    ["solar-pro-4", "/news/brief/solar-pro-4/"],
    ["qwen-3-8-max", "/news/brief/qwen-3-8-max/"],
    ["openai-huggingface-incident", "/news/brief/openai-huggingface-incident/"]
  ];
  const viewports = [
    ["mobile", 375, 812],
    ["tablet", 768, 1024],
    ["desktop", 1280, 900]
  ];
  const results = [];

  for (const [viewport, width, height] of viewports) {
    await page.setViewportSize({ width, height });
    for (const [name, route] of routes) {
      await page.goto(`http://127.0.0.1:4173${route}`, { waitUntil: "networkidle" });
      await page.locator("img").first().waitFor({ state: "visible" });
      await page.evaluate(async () => {
        for (const image of document.images) {
          if (image.dataset.src) image.src = image.dataset.src;
          if (image.dataset.srcset) image.srcset = image.dataset.srcset;
          image.loading = "eager";
        }
        await document.fonts.ready;
        await Promise.all([...document.images].map((image) => image.decode().catch(() => null)));
      });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      const filename = `output/playwright/share-${viewport}-${name}.png`;
      await page.screenshot({ path: filename, fullPage: true });
      results.push({ viewport, name, overflow, filename });
    }
  }
  return results;
}
