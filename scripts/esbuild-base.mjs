import * as esbuild from "esbuild";
import { execSync } from "node:child_process";
import { rmSync } from "node:fs";

/**
 * Bundles a package's TS/JS entry points to both ESM and CJS with esbuild,
 * then emits type declarations with tsc. Used by each package's own
 * scripts/build.mjs so package-level build scripts stay a few lines long.
 */
export async function buildPackage({ entryPoints, outdir = "dist", external = [] } = {}) {
  rmSync(outdir, { recursive: true, force: true });

  const common = {
    entryPoints,
    outdir,
    bundle: true,
    sourcemap: true,
    minify: true,
    external,
    platform: "browser",
  };

  await Promise.all([
    esbuild.build({ ...common, format: "esm", outExtension: { ".js": ".mjs" } }),
    esbuild.build({ ...common, format: "cjs", outExtension: { ".js": ".cjs" } }),
  ]);

  execSync(`tsc --emitDeclarationOnly --outDir ${outdir}`, { stdio: "inherit" });
}
