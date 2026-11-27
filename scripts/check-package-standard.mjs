import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Checks every package in packages/ against the package standard (issue
 * #19, CONTRIBUTING.md "Package standard"). Run by `npm run lint`, so CI's
 * Lint job enforces it.
 *
 * - AGENTS.md exists and is listed in package.json `files`.
 * - docs/screenshot.png exists and README.md links it.
 * - Every stories file's `meta` sets `parameters.intro`, except the demo
 *   (a stories file whose title's last segment is "Demo").
 *
 * The intro check is textual: it looks for an `intro:` key in the file.
 * That's enough to catch a forgotten intro, which is the point.
 */

/**
 * Packages not yet migrated to the standard, each tracked by its own issue
 * under #19. Remove a package from this list in the PR that migrates it;
 * the check fails if a listed package already passes, so the list can't go
 * stale.
 */
const PENDING = new Set(["theme-forest-isle", "theme-tactical-react"]);

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PACKAGES = path.join(ROOT, "packages");
const SKIP_DIRS = new Set(["node_modules", "dist", "storybook-static", "generated"]);

function storiesFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...storiesFiles(full));
    else if (/\.stories\.(ts|tsx|js|jsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function isDemo(source) {
  const title = source.match(/\btitle\s*:\s*["'`]([^"'`]+)["'`]/)?.[1];
  return !!title && /(^|\/)demo$/i.test(title);
}

function check(dir) {
  const problems = [];
  const pkg = JSON.parse(readFileSync(path.join(dir, "package.json"), "utf8"));

  if (!existsSync(path.join(dir, "AGENTS.md"))) problems.push("has no AGENTS.md");
  else if (!(pkg.files ?? []).includes("AGENTS.md"))
    problems.push('doesn\'t list "AGENTS.md" in package.json `files`');

  if (!existsSync(path.join(dir, "docs/screenshot.png")))
    problems.push("has no docs/screenshot.png");
  const readme = path.join(dir, "README.md");
  if (!existsSync(readme)) problems.push("has no README.md");
  else if (!/\]\(\.?\/?docs\/screenshot\.png\)/.test(readFileSync(readme, "utf8")))
    problems.push("README.md doesn't link docs/screenshot.png");

  const stories = storiesFiles(dir);
  if (!stories.some((file) => isDemo(readFileSync(file, "utf8"))))
    problems.push('has no demo story (a stories file titled ".../Demo")');
  for (const file of stories) {
    const source = readFileSync(file, "utf8");
    if (!isDemo(source) && !/\bintro\s*:/.test(source))
      problems.push(`${path.relative(dir, file)}: meta has no parameters.intro`);
  }
  return problems;
}

let failed = false;
for (const entry of readdirSync(PACKAGES, { withFileTypes: true })) {
  if (!entry.isDirectory() || !existsSync(path.join(PACKAGES, entry.name, "package.json")))
    continue;
  const problems = check(path.join(PACKAGES, entry.name));
  if (PENDING.has(entry.name)) {
    if (problems.length === 0) {
      console.error(
        `packages/${entry.name} meets the package standard: remove it from PENDING in scripts/check-package-standard.mjs.`,
      );
      failed = true;
    }
    continue;
  }
  for (const problem of problems) console.error(`packages/${entry.name} ${problem}`);
  if (problems.length) failed = true;
}

if (failed) {
  console.error('\nPackage standard check failed. See CONTRIBUTING.md, "Package standard".');
  process.exitCode = 1;
} else {
  console.log("Package standard: all packages pass (or are listed as pending).");
}
