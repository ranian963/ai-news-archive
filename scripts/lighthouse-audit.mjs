import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const modules = process.env.AUDIT_NODE_MODULES;
if (!modules) throw new Error("AUDIT_NODE_MODULES가 필요합니다.");

const importFrom = (path) => import(pathToFileURL(resolve(modules, path)).href);
const { default: lighthouse } = await importFrom("lighthouse/core/index.js");
const { launch } = await importFrom("chrome-launcher/dist/chrome-launcher.js");
const { default: desktopConfig } = await importFrom("lighthouse/core/config/desktop-config.js");

const url = process.argv[2];
if (!url) throw new Error("검사할 URL이 필요합니다.");

const categories = ["performance", "accessibility", "best-practices", "seo"];
const results = {};

for (const mode of ["mobile", "desktop"]) {
  results[mode] = [];
  for (let run = 0; run < 3; run += 1) {
    const chrome = await launch({
      chromePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      chromeFlags: ["--headless=new", "--no-first-run", "--no-default-browser-check"]
    });
    try {
      const audit = await lighthouse(url, { port: chrome.port, output: "json", logLevel: "error" }, mode === "desktop" ? desktopConfig : undefined);
      results[mode].push(Object.fromEntries(categories.map((category) => [category, Math.round(audit.lhr.categories[category].score * 100)])));
    } finally {
      await chrome.kill();
    }
  }
}

const medians = Object.fromEntries(Object.entries(results).map(([mode, runs]) => [
  mode,
  Object.fromEntries(categories.map((category) => [category, [...runs.map((run) => run[category])].sort((a, b) => a - b)[1]]))
]));

console.log(JSON.stringify({ url, runs: results, medians }, null, 2));
if (Object.values(medians).some((scores) => Object.values(scores).some((score) => score !== 100))) process.exitCode = 1;
