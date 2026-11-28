import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Writes a package's `tokens.css` export: the theme's design tokens as plain
 * `:root` custom properties, derived at build time from
 * `themes/<name>/theme.css` (the single source of truth; nothing is
 * hand-copied).
 *
 * Web Components carry their tokens inside their own shadow roots, so a page
 * doesn't see them. This file lets consumers style their own elements with
 * `var(--color-…)`. It deliberately excludes the compiled component
 * stylesheet, whose Tailwind reset and utility classes would leak into the
 * page.
 *
 * Paths resolve from the current directory (the package, when run from its
 * build script). Add `"./tokens.css": "./dist/tokens.css"` to the package's
 * `exports` alongside it.
 */
export function generateTokensCss({ themeDir, outFile = "./dist/tokens.css", packageName }) {
  const themeFile = resolve(process.cwd(), themeDir, "theme.css");
  const theme = readFileSync(themeFile, "utf8");
  const open = theme.search(/@theme(\s+static)?\s*\{/);
  const start = theme.indexOf("{", open) + 1;
  const end = theme.lastIndexOf("}");
  if (open < 0 || end <= start) throw new Error(`No @theme block found in ${themeFile}`);

  const source = relative(REPO_ROOT, themeFile);
  const label = packageName ? `${packageName} design tokens` : "Design tokens";
  const body = theme.slice(start, end).replace(/\s+$/, "");
  const css = `/* ${label}, generated from ${source}. */
:root {${body}
}
`;
  const absOut = resolve(process.cwd(), outFile);
  mkdirSync(dirname(absOut), { recursive: true });
  writeFileSync(absOut, css);
}
