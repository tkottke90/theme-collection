import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const CORE_SRC = resolve(dirname(fileURLToPath(import.meta.url)), "../shared/wc-core/src");

const HEADER = `// GENERATED from shared/wc-core/src by scripts/wc-core.mjs. Do not edit;
// change the shared source instead. See docs/adr/0002-shared-wc-core.md.
`;

/**
 * Copies the shared Web Component base classes (shared/wc-core/src, minus
 * tests) into a package's `src/generated/core/`, which is gitignored.
 *
 * A copy, not an import, because a package's emitted type declarations
 * would otherwise reference `@tkottke90/theme-wc-core`, which is never
 * published. Copied into the package's own `src`, the base classes are
 * bundled by esbuild and declared by tsc like any other local module.
 *
 * Run it from the package directory (as its generate step does).
 */
export function syncWcCore({ outDir = "./src/generated/core" } = {}) {
  const absOut = resolve(process.cwd(), outDir);
  rmSync(absOut, { recursive: true, force: true });
  mkdirSync(absOut, { recursive: true });
  for (const file of readdirSync(CORE_SRC)) {
    if (!file.endsWith(".ts") || file.endsWith(".test.ts")) continue;
    const source = readFileSync(join(CORE_SRC, file), "utf8");
    writeFileSync(join(absOut, file), HEADER + source);
  }
}
