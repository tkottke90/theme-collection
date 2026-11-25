import { buildPackage } from "../../../scripts/esbuild-base.mjs";
import { compileThemeFile, SKELETON_SHIMMER_CSS } from "../../../scripts/compile-theme.mjs";

await buildPackage({ entryPoints: ["src/index.ts"], external: ["preact", "preact/*"] });

compileThemeFile({
  themeDir: "../../themes/tactical",
  contentGlobs: ["./src/*.tsx"],
  outFile: "./dist/theme.css",
  extraCss: SKELETON_SHIMMER_CSS,
});
