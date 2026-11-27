import { buildPackage } from "../../../scripts/esbuild-base.mjs";
import { compileThemeFile, SKELETON_SHIMMER_CSS } from "../../../scripts/compile-theme.mjs";

await buildPackage({ entryPoints: ["src/index.ts"], external: ["preact", "preact/*"] });

compileThemeFile({
  themeDir: "../../themes/tactical",
  contentGlobs: ["./src/*.tsx"],
  outFile: "./dist/theme.css",
  extraCss: SKELETON_SHIMMER_CSS,
  // Every token, not just the ones the components use, so AGENTS.md's token
  // list is true and consumers can style their own elements with any of them.
  staticTokens: true,
});
