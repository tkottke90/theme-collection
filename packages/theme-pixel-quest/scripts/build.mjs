import { buildPackage } from "../../../scripts/esbuild-base.mjs";
import { generateThemeStyles } from "./generate-theme-styles.mjs";

generateThemeStyles();
await buildPackage({ entryPoints: ["src/index.ts"], external: ["lit"] });
