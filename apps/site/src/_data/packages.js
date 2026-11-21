import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesDir = path.resolve(__dirname, "../../../../packages");

export default function () {
  return readdirSync(packagesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const pkgPath = path.join(packagesDir, entry.name, "package.json");
      const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
      return {
        dirName: entry.name,
        name: pkg.name,
        version: pkg.version,
        description: pkg.description ?? "",
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
