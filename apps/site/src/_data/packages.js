import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoUrl = "https://github.com/tkottke90/theme-collection";
const packagesDir = path.resolve(__dirname, "../../../../packages");

export default function () {
  return readdirSync(packagesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const pkgPath = path.join(packagesDir, entry.name, "package.json");
      const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
      // npm pack names tarballs "<scope>-<name>-<version>.tgz" with the "@"
      // dropped and "/" turned into "-".
      const tarballName = `${pkg.name.replace(/^@/, "").replace("/", "-")}-${pkg.version}.tgz`;
      return {
        tarballName,
        releaseUrl: `${repoUrl}/releases/download/v${pkg.version}/${tarballName}`,
        dirName: entry.name,
        name: pkg.name,
        version: pkg.version,
        description: pkg.description ?? "",
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
