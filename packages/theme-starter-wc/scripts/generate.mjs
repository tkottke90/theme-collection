import { compileThemeModule, SKELETON_SHIMMER_CSS } from "../../../scripts/compile-theme.mjs";
import { syncWcCore } from "../../../scripts/wc-core.mjs";

/** Writes src/generated/: the compiled theme styles and the shared WC base classes. */
export function generate() {
  syncWcCore();
  compileThemeModule({
    themeDir: "../../themes/theme-starter",
    contentGlobs: ["./src/*.ts"],
    outFile: "./src/generated/theme-styles.ts",
    extraCss: SKELETON_SHIMMER_CSS,
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generate();
}
