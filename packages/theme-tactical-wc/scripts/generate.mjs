import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { syncWcCore } from "../../../scripts/wc-core.mjs";
import { compileThemeModule, SKELETON_SHIMMER_CSS } from "../../../scripts/compile-theme.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const THEME_MODES_CSS = readFileSync(
  join(__dirname, "../../../themes/tactical/theme-modes.css"),
  "utf8",
);

/** Writes src/generated/: the compiled theme styles and the shared WC base classes. */
export function generate() {
  syncWcCore();
  compileThemeModule({
    themeDir: "../../themes/tactical",
    contentGlobs: ["./src/*.ts"],
    outFile: "./src/generated/theme-styles.ts",
    extraCss: SKELETON_SHIMMER_CSS + THEME_MODES_CSS,
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generate();
}
