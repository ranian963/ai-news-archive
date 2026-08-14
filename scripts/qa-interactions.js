async (page) => {
  const routes = [
    ["weekly-2026-07-20-26", "/news/weekly/2026-07-20-26/"],
    ["ai-agent-deep-dive", "/news/brief/ai-agent-deep-dive/"],
    ["weekly-2026-07-27-08-02", "/news/weekly/2026-07-27-08-02/"],
    ["genoffice", "/news/brief/genoffice/"],
    ["solar-pro-4", "/news/brief/solar-pro-4/"],
    ["qwen-3-8-max", "/news/brief/qwen-3-8-max/"],
    ["openai-huggingface-incident", "/news/brief/openai-huggingface-incident/"],
    ["weekly-2026-08-03-09", "/news/weekly/2026-08-03-09/"],
    ["grok-4-6", "/news/brief/grok-4-6/"],
    ["kimi-k3", "/news/brief/kimi-k3/"],
    ["claude-opus-5", "/news/brief/claude-opus-5/"],
    ["deepseek-v4-flash-0731", "/news/brief/deepseek-v4-flash-0731/"],
    ["muse-spark-1-2", "/news/brief/muse-spark-1-2/"],
    ["gpt-5-6-cyber", "/news/brief/gpt-5-6-cyber/"],
    ["muse-glimmer-30b", "/news/brief/muse-glimmer-30b/"],
    ["nemotron-3-5-lightning", "/news/brief/nemotron-3-5-lightning/"],
    ["gemini-3-7-flash", "/news/brief/gemini-3-7-flash/"],
    ["deepseek-v4-pro-0813", "/news/brief/deepseek-v4-pro-0813/"],
    ["dokpamo-second-round", "/news/brief/dokpamo-second-round/"],
    ["k-exaone-2", "/news/brief/k-exaone-2/"],
    ["ax-k2", "/news/brief/ax-k2/"],
    ["solar-open-2", "/news/brief/solar-open-2/"],
    ["motif-3", "/news/brief/motif-3/"]
  ];
  const results = [];

  for (const [id, path] of routes) {
    await page.goto(`http://127.0.0.1:4173${path}`, { waitUntil: "networkidle" });
    const selectors = page.locator("[data-pagination] button");
    const last = (await selectors.count()) - 1;
    const articleIdentity = await page.locator(".reader-toolbar__title").textContent();
    const initialSummary = await page.locator(".detail-header__summary").textContent();
    if (await page.locator(".detail-header h1").count()) {
      throw new Error(`${id}: 우측 상세 패널에 카드 제목이 중복됩니다.`);
    }
    await selectors.nth(last).click();
    await page.waitForTimeout(80);
    const finalSummary = await page.locator(".detail-header__summary").textContent();
    const finalSource = await page.locator(".card-detail__sources a").first().getAttribute("href");
    const readout = await page.locator("[data-position]").textContent();
    if (initialSummary === finalSummary || !finalSource || readout !== `${last + 1} / ${last + 1}` || await page.locator(".reader-toolbar__title").textContent() !== articleIdentity) {
      throw new Error(`${id}: 카드와 상세 정보가 함께 바뀌지 않았습니다.`);
    }
    await page.locator(".card-frame").nth(last).click({ position: { x: 24, y: 24 } });
    await page.keyboard.press("Home");
    await page.waitForTimeout(80);
    if (await page.locator("[data-position]").textContent() !== `1 / ${last + 1}`) {
      throw new Error(`${id}: Home 키 이동에 실패했습니다.`);
    }
    results.push({ id, articleIdentity, initialSummary, finalSummary, finalSource });
  }

  return results;
}
