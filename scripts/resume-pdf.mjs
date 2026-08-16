#!/usr/bin/env node
/**
 * Render /resume to public/resume.pdf using headless Edge (local) or Chrome (CI).
 *
 *   npm run build && node scripts/resume-pdf.mjs
 *
 * One renderer for both the HTML page and the PDF, so they can never drift apart.
 * Serves dist/ over a tiny static server rather than file:// so that absolute asset
 * paths and the theme script behave exactly as they do in production.
 */
import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:http";
import { existsSync, mkdtempSync, readFileSync, copyFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const PORT = 4399;

const BROWSERS = [
  process.env.CHROME_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
].filter(Boolean);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".wasm": "application/wasm",
  ".pdf": "application/pdf",
};

function findBrowser() {
  for (const b of BROWSERS) {
    if (b && existsSync(b)) return b;
    // bare command names on PATH (CI)
    if (b && !b.includes("/") && spawnSync(b, ["--version"]).status === 0) return b;
  }
  return null;
}

function serve() {
  const server = createServer((req, res) => {
    const url = (req.url ?? "/").split("?")[0];
    let file = path.join(DIST, decodeURIComponent(url));
    if (!existsSync(file) || url.endsWith("/")) file = path.join(file, "index.html");
    if (!existsSync(file)) {
      res.writeHead(404).end("not found");
      return;
    }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] ?? "application/octet-stream" });
    res.end(readFileSync(file));
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

const browser = findBrowser();
if (!browser) {
  console.error(
    "No Chromium-based browser found. Set CHROME_PATH, or install Edge/Chrome.\n" +
      "Tried:\n  " + BROWSERS.join("\n  ")
  );
  process.exit(1);
}
if (!existsSync(DIST)) {
  console.error("dist/ not found — run `npm run build` first.");
  process.exit(1);
}

const server = await serve();
const out = path.join(DIST, "resume.pdf");
const profile = mkdtempSync(path.join(tmpdir(), "resume-pdf-"));

console.log(`rendering /resume with ${browser}`);
const args = [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  "--no-pdf-header-footer",
  "--run-all-compositor-stages-before-draw",
  "--virtual-time-budget=8000",
  `--user-data-dir=${profile}`,
  `--print-to-pdf=${out}`,
  `http://localhost:${PORT}/resume/?print=1`,
];

const code = await new Promise((resolve) => {
  const child = spawn(browser, args, { stdio: "inherit" });
  child.on("close", resolve);
  child.on("error", (e) => {
    console.error(e.message);
    resolve(1);
  });
});

server.close();
rmSync(profile, { recursive: true, force: true });

if (code !== 0 || !existsSync(out)) {
  console.error(`PDF generation failed (exit ${code})`);
  process.exit(1);
}

// ship it with the next build too
copyFileSync(out, path.join(ROOT, "public", "resume.pdf"));
const kb = (readFileSync(out).length / 1024).toFixed(0);
console.log(`wrote dist/resume.pdf and public/resume.pdf (${kb} KB)`);
