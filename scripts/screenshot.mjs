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

/** A story is the package's full-page demo when its title's last segment is "Demo". */
const isDemo = (entry) => /(^|\/)demo$/i.test(entry.title);

/**
 * Width, in CSS pixels, the demo is rendered at. Close to README width
 * (about 900px on GitHub), so the image shows near 1:1 and stays readable.
 */
const SHOT_WIDTH = 1000;

/**
 * Writes `docs/screenshot.png`: the package's demo story (the stories file
 * titled ".../Demo"; see CONTRIBUTING.md's "Package standard"), captured
 * at SHOT_WIDTH. One page composed from every component shows the theme
 * better, and far smaller, than a tile per story.
 */
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
  const demo = Object.values(index.entries ?? {}).find(
    (entry) => entry.type === "story" && isDemo(entry),
  );
  if (!demo) {
    console.error(
      `No demo story in ${pkgDir} (a stories file titled ".../Demo") — add one; see CONTRIBUTING.md, "Package standard".`,
    );
    process.exitCode = 1;
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
    // than editing the script (e.g. SCREENSHOT_CHROMIUM_PATH=/opt/pw-browsers/chromium
    // in Claude Code's cloud environment).
    const executablePath = process.env.SCREENSHOT_CHROMIUM_PATH || undefined;
    browser = await chromium.launch({ executablePath });
    const page = await browser.newPage({ viewport: { width: SHOT_WIDTH, height: 800 } });

    // `screenshot=1` tells the shared story decorator to drop its
    // full-viewport min-height (see shared/storybook/intro.ts).
    const params = new URLSearchParams({ id: demo.id, viewMode: "story", screenshot: "1" });
    await page.goto(`http://127.0.0.1:${port}/iframe.html?${params}`, {
      waitUntil: "networkidle",
    });
    const root = page.locator("#storybook-root");
    await root.waitFor({ state: "visible", timeout: 10_000 });
    // Storybook's default "padded" layout insets the root by 1rem; drop it
    // so the capture is exactly SHOT_WIDTH wide.
    await page.addStyleTag({ content: "body.sb-main-padded { padding: 0 !important; }" });
    await page.evaluate(() => document.fonts.ready);

    const outDir = path.join(pkgDir, "docs");
    await mkdir(outDir, { recursive: true });
    const outPath = path.join(outDir, "screenshot.png");
    await root.screenshot({ path: outPath });

    console.log(`Wrote ${path.relative(process.cwd(), outPath)} (${demo.title})`);
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
