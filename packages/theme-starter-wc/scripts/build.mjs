import { buildPackage } from "../../../scripts/esbuild-base.mjs";

await buildPackage({ entryPoints: ["src/index.ts"], external: ["lit"] });
