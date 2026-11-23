import { readFileSync, writeFileSync } from "node:fs";
import { compileThemeModule, SKELETON_SHIMMER_CSS } from "../../../scripts/compile-theme.mjs";

const OUT_FILE = "./src/generated/theme-styles.ts";

// Tailwind v4 gives its --tw-* variables (border style, ::before content, ...)
// their defaults via @property, which browsers ignore inside shadow roots. Its
// fallback block is wrapped in an @supports guard that only matches browsers
// without @property, so Chromium gets neither and `border` / `before:` utilities
// silently render nothing. Dropping the guard makes the defaults always apply;
// they stay in the lowest-priority `properties` layer, so utilities still win.
function unguardPropertyDefaults(file) {
  const src = readFileSync(file, "utf8");
  const out = src.replace(
    /@layer properties\{@supports [^{]*\{([^{}]*\{[^{}]*\})\}\}/,
    "@layer properties{$1}",
  );
  if (out === src) {
    throw new Error(`Tailwind's @layer properties fallback block not found in ${file}`);
  }
  writeFileSync(file, out);
}

export function generateThemeStyles() {
  compileThemeModule({
    themeDir: "../../themes/futuristic-industrial",
    contentGlobs: ["./src/*.ts"],
    outFile: OUT_FILE,
    extraCss: SKELETON_SHIMMER_CSS,
  });
  unguardPropertyDefaults(OUT_FILE);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateThemeStyles();
}
