import { compileThemeModule, SKELETON_SHIMMER_CSS } from "../../../scripts/compile-theme.mjs";

export function generateThemeStyles() {
  compileThemeModule({
    themeDir: "../../themes/hexagon-tactical",
    contentGlobs: ["./src/*.ts"],
    outFile: "./src/generated/theme-styles.ts",
    extraCss: SKELETON_SHIMMER_CSS,
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateThemeStyles();
}
