// Compute SHA-384 SRI hashes for all locally hosted assets that the HTML pages
// reference with an `integrity` attribute. Run after `build:css` (and any time
// you add or replace a file under assets/vendor/ or assets/js/).
//
// Output: prints a JSON map `{ path: "sha384-..." }` and writes
// `assets/sri.json` so HTML files can be regenerated programmatically later.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const TARGETS = [
  "assets/vendor",
  "assets/js",
  "assets/css",
];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function sri(filePath) {
  const buf = readFileSync(filePath);
  const hash = createHash("sha384").update(buf).digest("base64");
  return `sha384-${hash}`;
}

const map = {};
for (const t of TARGETS) {
  const abs = join(ROOT, t);
  try {
    for (const f of walk(abs)) {
      // Only hash JS / CSS / WASM-style assets we'd link with `integrity`.
      if (!/\.(js|css|mjs|wasm)$/i.test(f)) continue;
      const rel = relative(ROOT, f).split(sep).join("/");
      map[rel] = sri(f);
    }
  } catch (_) { /* missing folder is fine */ }
}

writeFileSync(join(ROOT, "assets", "sri.json"), JSON.stringify(map, null, 2) + "\n");
console.log(JSON.stringify(map, null, 2));
