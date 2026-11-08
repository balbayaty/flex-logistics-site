/**
 * FLEX archived design preview: post-build compatibility repair.
 * Scoped to this isolated preview branch/project; does not affect production scsflex.com.
 * Fixes invalid CSS wrappers, stale SRI hashes, cached assets and a legacy service worker.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const write = (path, value) => writeFileSync(join(root, path), value);
const hash = (algorithm, data) => createHash(algorithm).update(data).digest(algorithm === "sha384" ? "base64" : "hex");

const cleaned = [];
for (const path of ["assets/css/index-overrides.css", "assets/css/capabilities-overrides.css"]) {
  let css = read(path);
  if (!/^\s*<style(?:\s[^>]*)?>/i.test(css) || !/<\/style>\s*$/i.test(css)) {
    throw new Error("Unexpected CSS wrapper format in " + path);
  }
  css = css.replace(/^\s*<style(?:\s[^>]*)?>\s*/i, "").replace(/\s*<\/style>\s*$/i, "").trim() + "\n";
  if (css.includes("</style>")) throw new Error("Residual HTML wrapper in " + path);
  write(path, css);
  cleaned.push(path);
}

const pages = {};
for (const page of ["index.html", "capabilities.html"]) {
  let html = read(page);
  let matched = 0;
  html = html.replace(/<(?:link|script)\b[^>]*>/gi, (tag) => {
    const source = tag.match(/\b(?:src|href)=(["'])(\/assets\/[^"'?]+)(?:\?[^"']*)?\1/);
    if (!source || !tag.includes("integrity=")) return tag;
    const path = source[2].slice(1);
    if (!existsSync(join(root, path))) throw new Error(page + " references absent asset " + path);
    const bytes = readFileSync(join(root, path));
    const digest = "sha384-" + hash("sha384", bytes);
    const version = hash("sha256", bytes).slice(0, 10);
    const updated = tag.replace(/\bintegrity=(["'])[^"']*\1/, 'integrity="' + digest + '"');
    const output = updated.replace(source[0], source[0].replace(source[2], source[2] + "?v=" + version));
    matched++;
    return output;
  });
  if (matched < 4) throw new Error(page + ": too few local asset integrity refs: " + matched);
  if (!html.includes("noindex,nofollow") || !html.includes("ARCHIVED DESIGN PREVIEW")) {
    throw new Error(page + " missing archived preview warning/noindex");
  }
  write(page, html);
  pages[page] = matched;
}

// Old offline-first caching is unsuitable for a frequently updated demo.
// On activation, clear stale caches; do not intercept future navigation or static assets.
write("sw.js", String.raw`self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("flex-shell")).map(key => caches.delete(key)))),
    self.clients.claim()
  ]));
});
`);

console.log("FLEX_PREVIEW_REPAIR_OK " + JSON.stringify({ cleaned, linkedAssets: pages, status: "noindex, cache-busted, SRI synchronized, cache reset" }));
