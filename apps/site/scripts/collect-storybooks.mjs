import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

/**
 * Copies each package's already-built storybook-static/ output into
 * _site/storybooks/<package-dir-name>/ so the Eleventy site can link to
 * them. Run after `eleventy` (see package.json's "build" script) and after
 * each package's own `build-storybook` has already run.
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteDir = path.resolve(__dirname, "..");
const packagesDir = path.resolve(siteDir, "../../packages");
const outDir = path.resolve(siteDir, "_site/storybooks");

mkdirSync(outDir, { recursive: true });

const packageDirs = readdirSync(packagesDir, { withFileTypes: true }).filter((entry) =>
  entry.isDirectory(),
);

for (const dir of packageDirs) {
  const storybookStatic = path.join(packagesDir, dir.name, "storybook-static");

  if (!existsSync(storybookStatic)) {
    console.warn(
      `[site] skipping ${dir.name}: no storybook-static build found ` +
        `(run "npm run build-storybook -w ${dir.name}" first)`,
    );
    continue;
  }

  cpSync(storybookStatic, path.join(outDir, dir.name), { recursive: true });
  console.log(`[site] copied storybook for ${dir.name}`);
}
