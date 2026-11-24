import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const THEME = join(__dirname, "../../../themes/zero-dawn/theme.css");
const OUT = join(__dirname, "../dist/tokens.css");

/**
 * Writes dist/tokens.css: the theme's design tokens as plain `:root` custom
 * properties, derived at build time from themes/zero-dawn/theme.css (the
 * single source of truth; nothing is hand-copied).
 *
 * The components carry these tokens inside their own shadow roots, so a page
 * doesn't see them. This file lets consumers style their own elements with
 * `var(--color-…)`. It deliberately excludes the compiled component
 * stylesheet, whose Tailwind reset and utility classes would leak into the
 * page.
 */
export function generateTokensCss() {
  const theme = readFileSync(THEME, "utf8");
  const open = theme.search(/@theme(\s+static)?\s*\{/);
  const start = theme.indexOf("{", open) + 1;
  const end = theme.lastIndexOf("}");
  if (open < 0 || end <= start) throw new Error(`No @theme block found in ${THEME}`);

  const body = theme.slice(start, end).replace(/\s+$/, "");
  const css = `/* @tkottke90/theme-zero-dawn design tokens, generated from themes/zero-dawn/theme.css. */
:root {${body}
}
`;
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, css);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateTokensCss();
}
