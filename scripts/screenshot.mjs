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

/** A story is the package's full-page demo when its title's last segment is "Demo". */
const isDemo = (entry) => /(^|\/)demo$/i.test(entry.title);

/** Stories grouped by component (`title`), in index order, with the demo group first. */
function groupStories(stories) {
  const groups = new Map();
  for (const entry of stories) {
    if (!groups.has(entry.title)) groups.set(entry.title, []);
    groups.get(entry.title).push(entry);
  }
  const list = [...groups.entries()].map(([title, entries]) => ({
    title,
    entries,
    demo: entries.some(isDemo),
  }));
  return [...list.filter((g) => g.demo), ...list.filter((g) => !g.demo)];
}

const img = (shot, alt) =>
  `<img src="data:image/png;base64,${shot.toString("base64")}" alt="${escapeHtml(alt)}" />`;

function buildGalleryHtml(packageName, sections) {
  const body = sections
    .map((section) => {
      const label = section.title.split("/").pop();
      if (section.demo) {
        return section.stories
          .map(
            (s) => `<section class="demo">
              <h2>${escapeHtml(label)}</h2>
              <figure>${img(s.shot, `${label} — ${s.name}`)}</figure>
            </section>`,
          )
          .join("\n");
      }
      const intro = section.intro
        ? `<div class="intro">${img(section.intro, `${label} — intro`)}</div>`
        : "";
      const tiles = section.stories
        .map(
          (s) => `<figure>
            ${img(s.shot, `${label} — ${s.name}`)}
            <figcaption>${escapeHtml(s.name)}</figcaption>
          </figure>`,
        )
        .join("\n");
      return `<section>
        <h2>${escapeHtml(label)}</h2>
        ${intro}
        <div class="stories">${tiles}</div>
      </section>`;
    })
    .join("\n");

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; padding: 24px; width: ${GALLERY_WIDTH}px; background: #ffffff;
         font-family: system-ui, sans-serif; }
  h1 { font: 600 22px system-ui, sans-serif; margin: 0 0 20px; color: #1f2230; }
  h2 { font: 600 15px system-ui, sans-serif; margin: 0 0 10px; color: #1f2230; }
  section { border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 20px; }
  img { display: block; max-width: 100%; }
  .intro { margin-bottom: 12px; }
  .stories { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; align-items: start; }
  figure { margin: 0; }
  figcaption { font-size: 12px; color: #6b7280; margin-top: 4px; }
</style>
</head>
<body>
  <h1>${escapeHtml(packageName)}</h1>
  ${body}
</body>
</html>`;
}

/**
 * Widths, in CSS pixels, chosen so the composite stays readable at README
 * width (about 900px) without downscaling much: the gallery is
 * GALLERY_WIDTH wide, intros and the demo span it, and stories sit two to a
 * row.
 */
const GALLERY_WIDTH = 1000;
const WIDE_SHOT = GALLERY_WIDTH - 2 * 17;
const STORY_SHOT = Math.floor((WIDE_SHOT - 12) / 2);

async function capture(page, port, entry, { width, intro }) {
  await page.setViewportSize({ width, height: 700 });
  const params = new URLSearchParams({ id: entry.id, viewMode: "story", screenshot: "1" });
  if (intro) params.set("intro", intro);
  await page.goto(`http://127.0.0.1:${port}/iframe.html?${params}`, { waitUntil: "networkidle" });
  const root = page.locator("#storybook-root");
  await root.waitFor({ state: "visible", timeout: 10_000 });
  // Storybook's default "padded" layout insets the root by 1rem; drop it so
  // each capture is exactly `width` wide and fills its gallery slot.
  await page.addStyleTag({ content: "body.sb-main-padded { padding: 0 !important; }" });
  await page.evaluate(() => document.fonts.ready);
  return root;
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
    // than editing the script (e.g. SCREENSHOT_CHROMIUM_PATH=/opt/pw-browsers/chromium
    // in Claude Code's cloud environment).
    const executablePath = process.env.SCREENSHOT_CHROMIUM_PATH || undefined;
    browser = await chromium.launch({ executablePath });
    const page = await browser.newPage();

    // One section per component: its intro once (when the package's
    // Storybook preview uses a shared intro decorator, which renders the
    // intro alone for `intro=only`), then each story without it.
    const sections = [];
    for (const group of groupStories(stories)) {
      const section = { title: group.title, demo: group.demo, intro: null, stories: [] };
      if (!group.demo) {
        const root = await capture(page, port, group.entries[0], {
          width: WIDE_SHOT,
          intro: "only",
        });
        if ((await root.locator("[data-story-intro]").count()) > 0) {
          section.intro = await root.screenshot();
        }
      }
      for (const entry of group.entries) {
        const root = await capture(page, port, entry, {
          width: group.demo ? WIDE_SHOT : STORY_SHOT,
          intro: "hide",
        });
        section.stories.push({ name: entry.name, shot: await root.screenshot() });
      }
      sections.push(section);
    }

    const pkgJson = JSON.parse(await readFile(path.join(pkgDir, "package.json"), "utf8"));
    const galleryHtml = buildGalleryHtml(pkgJson.name ?? path.basename(pkgDir), sections);

    const galleryPage = await browser.newPage({
      viewport: { width: GALLERY_WIDTH + 48, height: 800 },
    });
    await galleryPage.setContent(galleryHtml, { waitUntil: "networkidle" });

    const outDir = path.join(pkgDir, "docs");
    await mkdir(outDir, { recursive: true });
    const outPath = path.join(outDir, "screenshot.png");
    await galleryPage.screenshot({ path: outPath, fullPage: true });

    console.log(
      `Wrote ${path.relative(process.cwd(), outPath)} (${sections.length} components, ${stories.length} stories)`,
    );
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
