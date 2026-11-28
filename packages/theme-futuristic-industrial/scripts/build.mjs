import { buildPackage } from "../../../scripts/esbuild-base.mjs";
import { generate } from "./generate.mjs";

generate();
await buildPackage({ entryPoints: ["src/index.ts"], external: ["lit"] });
