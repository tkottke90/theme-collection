import { buildPackage } from "../../../scripts/esbuild-base.mjs";
import { generateTokensCss } from "../../../scripts/generate-tokens-css.mjs";
import { generate } from "./generate.mjs";

generate();
await buildPackage({ entryPoints: ["src/index.ts"], external: ["lit"] });
generateTokensCss({
  themeDir: "../../themes/tactical",
  packageName: "@tkottke90/theme-tactical-wc",
});
