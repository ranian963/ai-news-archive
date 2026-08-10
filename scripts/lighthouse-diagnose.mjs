import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const modules = process.env.AUDIT_NODE_MODULES;
if (!modules) throw new Error("AUDIT_NODE_MODULES가 필요합니다.");
const importFrom = (path) => import(pathToFileURL(resolve(modules, path)).href);
const { default: lighthouse } = await importFrom("lighthouse/core/index.js");
const { launch } = await importFrom("chrome-launcher/dist/chrome-launcher.js");

const chrome = await launch({
  chromePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  chromeFlags: ["--headless=new", "--no-first-run", "--no-default-browser-check"]
});

try {
  const audit = await lighthouse(process.argv[2], { port: chrome.port, output: "json", logLevel: "error" });
  const failing = Object.values(audit.lhr.audits)
    .filter((item) => item.score !== null && item.score < 1)
    .map((item) => ({ id: item.id, title: item.title, score: item.score, displayValue: item.displayValue, numericValue: item.numericValue }));
  console.log(JSON.stringify({ performance: audit.lhr.categories.performance.score * 100, failing }, null, 2));
} finally {
  await chrome.kill();
}
