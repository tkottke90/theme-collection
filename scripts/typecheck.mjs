import { execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Type-checks everything a package's own build doesn't: its tests, stories
 * and `.storybook/` config, plus `shared/`. Each package's tsconfig.json
 * only covers what it publishes (it excludes tests and stories so they
 * don't land in dist/*.d.ts), so a type error there would otherwise only
 * show up in an editor. Run by CI's Lint job (`npm run typecheck`).
 *
 * For each target it writes a throwaway tsconfig that extends the target's
 * own (so decorator and JSX settings match its build), widens `include`,
 * and sets `noEmit`. WC packages import generated sources
 * (src/generated/), so their generate step runs first.
 */

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TMP_CONFIG = ".tsconfig.typecheck.json";
const INCLUDE = ["src", "stories", ".storybook"];
const GENERATE_SCRIPTS = ["generate", "generate-theme-styles"];

const targets = [
  ...readdirSync(path.join(ROOT, "packages"), { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => path.join(ROOT, "packages", e.name)),
  path.join(ROOT, "shared/wc-core"),
  path.join(ROOT, "shared/storybook"),
].filter((dir) => existsSync(path.join(dir, "tsconfig.json")));

let failed = 0;
for (const dir of targets) {
  const name = path.relative(ROOT, dir);
  const pkgPath = path.join(dir, "package.json");
  const scripts = existsSync(pkgPath)
    ? (JSON.parse(readFileSync(pkgPath, "utf8")).scripts ?? {})
    : {};
  const generate = GENERATE_SCRIPTS.find((s) => scripts[s]);
  if (generate) execSync(`npm run ${generate} --silent`, { cwd: dir, stdio: "ignore" });

  const include = INCLUDE.filter((d) => existsSync(path.join(dir, d)));
  const config = {
    extends: "./tsconfig.json",
    compilerOptions: { noEmit: true, rootDir: ".", types: ["jest", "node"] },
    include: include.length ? include : ["."],
    exclude: ["node_modules", "dist", "storybook-static"],
  };
  const configPath = path.join(dir, TMP_CONFIG);
  writeFileSync(configPath, JSON.stringify(config, null, 2));
  try {
    execSync(`npx tsc -p ${TMP_CONFIG}`, { cwd: dir, stdio: "inherit" });
    console.log(`ok   ${name}`);
  } catch {
    console.error(`FAIL ${name}`);
    failed++;
  } finally {
    rmSync(configPath, { force: true });
  }
}

if (failed) {
  console.error(`\n${failed} of ${targets.length} targets failed to type-check.`);
  process.exitCode = 1;
}
