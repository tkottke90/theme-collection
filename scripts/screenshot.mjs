import { createServer } from "node:http";
import { readFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".map": "application/json",
};

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char],
  );
}

function serveStatic(rootDir) {
  const resolvedRoot = path.resolve(rootDir);
  return createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
      const resolved = path.resolve(
        resolvedRoot,
        "." + (urlPath === "/" ? "/index.html" : urlPath),
      );
      if (!resolved.startsWith(resolvedRoot)) {
        res.writeHead(403);
        res.end();
        return;
      }
      const data = await readFile(resolved);
      res.writeHead(200, {
        "Content-Type": MIME_TYPES[path.extname(resolved)] ?? "application/octet-stream",
      });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
}

function listen(server) {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server.address().port));
  });
}

function buildGalleryHtml(packageName, shots) {
  const tiles = shots
    .map(
      (shot) => `<figure>
        <img src="${shot.dataUrl}" alt="${escapeHtml(shot.title)} — ${escapeHtml(shot.name)}" />
        <figcaption>${escapeHtml(shot.title)} — ${escapeHtml(shot.name)}</figcaption>
      </figure>`,
    )
    .join("\n");

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; padding: 24px; background: #ffffff; font-family: system-ui, sans-serif; }
  h1 { font: 600 20px system-ui, sans-serif; margin: 0 0 16px; color: #1f2230; }
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  figure { margin: 0; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;
           display: flex; flex-direction: column; align-items: center; justify-content: center; }
  figure img { max-width: 100%; }
  figcaption { font-size: 12px; color: #6b7280; margin-top: 8px; text-align: center; }
</style>
</head>
<body>
  <h1>${escapeHtml(packageName)}</h1>
  <div class="grid">${tiles}</div>
</body>
</html>`;
}

async function generateForPackage(pkgDir) {
  const staticDir = path.join(pkgDir, "storybook-static");
  const indexPath = path.join(staticDir, "index.json");
  if (!existsSync(indexPath)) {
    console.error(
      `No storybook-static/index.json in ${pkgDir} — run \`npm run build-storybook\` for this package first.`,
    );
    process.exitCode = 1;
    return;
  }

  const index = JSON.parse(await readFile(indexPath, "utf8"));
  const stories = Object.values(index.entries ?? {}).filter((entry) => entry.type === "story");
  if (stories.length === 0) {
    console.warn(`No stories found in ${indexPath}, skipping ${pkgDir}.`);
    return;
  }

  // Server and browser are both opened inside this try so that a failure
  // either way (e.g. no matching browser installed) still runs the
  // matching finally below instead of leaving the server listening —
  // an open http.Server keeps the process alive, and main()'s catch only
  // sets process.exitCode without forcing exit, so a leaked server here
  // means the script hangs on error instead of failing fast.
  let server;
  let browser;
  try {
    server = serveStatic(staticDir);
    const port = await listen(server);
    // Most environments resolve a browser automatically once `npx
    // playwright install chromium` has been run (see CONTRIBUTING.md).
    // Some sandboxes/CI images instead ship a browser preinstalled at a
    // fixed, non-default path — point at it with this env var rather
    // than editing the script.
    const executablePath = process.env.SCREENSHOT_CHROMIUM_PATH || undefined;
    browser = await chromium.launch({ executablePath });

    const page = await browser.newPage({ viewport: { width: 1000, height: 700 } });
    const shots = [];

    for (const entry of stories) {
      await page.goto(`http://127.0.0.1:${port}/iframe.html?id=${entry.id}&viewMode=story`, {
        waitUntil: "networkidle",
      });
      const root = page.locator("#storybook-root");
      await root.waitFor({ state: "visible", timeout: 10_000 });
      const buffer = await root.screenshot();
      shots.push({
        id: entry.id,
        title: entry.title,
        name: entry.name,
        dataUrl: `data:image/png;base64,${buffer.toString("base64")}`,
      });
    }

    const pkgJson = JSON.parse(await readFile(path.join(pkgDir, "package.json"), "utf8"));
    const galleryHtml = buildGalleryHtml(pkgJson.name ?? path.basename(pkgDir), shots);

    const galleryPage = await browser.newPage();
    await galleryPage.setContent(galleryHtml, { waitUntil: "networkidle" });

    const outDir = path.join(pkgDir, "docs");
    await mkdir(outDir, { recursive: true });
    const outPath = path.join(outDir, "screenshot.png");
    await galleryPage.screenshot({ path: outPath, fullPage: true });

    console.log(`Wrote ${path.relative(process.cwd(), outPath)} (${shots.length} stories)`);
  } finally {
    await browser?.close();
    server?.close();
  }
}

async function main() {
  const cwd = process.cwd();

  if (existsSync(path.join(cwd, ".storybook"))) {
    await generateForPackage(cwd);
    return;
  }

  const packagesDir = path.join(cwd, "packages");
  const entries = await readdir(packagesDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const pkgDir = path.join(packagesDir, entry.name);
    if (existsSync(path.join(pkgDir, ".storybook"))) {
      await generateForPackage(pkgDir);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
