import { buildPackage } from "../../../scripts/esbuild-base.mjs";
import { generateThemeStyles } from "./generate-theme-styles.mjs";
import { generateTokensCss } from "./generate-tokens-css.mjs";

generateThemeStyles();
await buildPackage({ entryPoints: ["src/index.ts"], external: ["lit"] });
generateTokensCss();
