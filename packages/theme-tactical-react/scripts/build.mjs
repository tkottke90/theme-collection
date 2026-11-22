import { readFileSync } from "node:fs";
import { buildPackage } from "../../../scripts/esbuild-base.mjs";
import { compileThemeFile, SKELETON_SHIMMER_CSS } from "../../../scripts/compile-theme.mjs";

const THEME_MODES_CSS = readFileSync(
  new URL("../../../themes/tactical/theme-modes.css", import.meta.url),
  "utf8",
);

await buildPackage({ entryPoints: ["src/index.ts"], external: ["preact", "preact/*"] });

compileThemeFile({
  themeDir: "../../themes/tactical",
  contentGlobs: ["./src/*.tsx"],
  outFile: "./dist/theme.css",
  extraCss: SKELETON_SHIMMER_CSS + THEME_MODES_CSS,
});
