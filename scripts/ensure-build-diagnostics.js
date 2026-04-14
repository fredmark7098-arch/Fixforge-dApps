/**
 * Next 15 may read `.next/diagnostics/build-diagnostics.json` during build/dev.
 * If `.next` was removed partially or a race leaves the file missing, ENOENT can occur.
 * Ensures the path exists with a minimal object before `next build` / `next dev`.
 */
const fs = require("fs");
const path = require("path");

const dir = path.join(process.cwd(), ".next", "diagnostics");
const file = path.join(dir, "build-diagnostics.json");

fs.mkdirSync(dir, { recursive: true });
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, "{}\n", "utf8");
}
