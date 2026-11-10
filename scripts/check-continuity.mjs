import {readFileSync,existsSync} from "node:fs";
import assert from "node:assert/strict";
const read=p=>readFileSync(p,"utf8");
const html=read("index.html"),css=read("assets/continuity.css"),js=read("assets/continuity.js"),map=read("assets/mena-network.svg");
assert(html.startsWith("<!doctype html>"));
assert(html.includes('content="noindex,nofollow,noarchive"'));
assert(html.includes("DESIGN STUDY"));
assert(!html.includes('<a href="#ico-warehouse"'),"Navigation must target section, not SVG icon");
assert(html.includes('href="#warehouse"'));
assert(!html.includes('class="brand-word"'),"Temporary FLEX wordmark still present");
assert(html.includes('class="brand-image" src="/assets/flex-official-logo.svg"'),"Official header logo missing");
assert(html.includes('class="footer-logo" src="/assets/flex-official-logo.svg"'),"Official footer logo missing");
const logo=read("assets/flex-official-logo.svg");
assert(logo.includes('FLEX Logistics Company official logo'),"Missing brand-supplied logo asset");
assert(logo.includes('data:image/png;base64,'),"Original PNG not retained inside logo image");
assert(logo.length>10000,"Brand logo asset unexpectedly small");
assert(html.includes('href="/assets/continuity.css'));
assert(html.includes('src="/assets/continuity.js'));
assert(!html.includes("200K+")&&!html.includes("98.7%"),"Overclaimed historical metrics");
assert(css.length>25000&&js.length>20000);
assert(!css.includes("<style>"),"CSS contains HTML wrappers");
assert(map.includes('id="main-connection"')&&map.includes('id="cargo-marker"'));
assert(!html.includes("https://flexlogistics.com"),"Wrong US company canonical");
for(const p of ["assets/photos/wh36-hero.webp","assets/photos/wh36-racking.webp","assets/photos/wh36-general.webp","favicon.svg","assets/flex-official-logo.svg","assets/continuity.css","assets/continuity.js","assets/mena-network.svg"])assert(existsSync(p),"Missing "+p);
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(ids.length,new Set(ids).size,"Duplicate IDs");
for(const href of [...html.matchAll(/<a[^>]+href="#([^"]+)"/g)].map(m=>m[1]))assert(ids.includes(href),"Broken navigation anchor "+href);
for(const key of ["mapHolder","briefDialog","briefForm","briefClose","langToggle","mobileNav","menuToggle","serviceHeading"]) {
 if(key!=="serviceHeading")assert(ids.includes(key),"Missing "+key);
}
for(const k of ["uae","kuwait","bahrain","qatar","oman","jordan","iraq","egypt","domestic"]) {
 assert(html.includes('data-lane="'+k+'"'),"Missing corridor "+k);
 assert(js.includes(k+":{"),"Missing lane data "+k);
}
assert(html.includes("authentic FLEX WH36 archival images"));
assert(css.includes("/assets/photos/wh36-hero.webp"));
assert(css.includes("/assets/photos/wh36-racking.webp"));
assert(!css.includes("photo-1761307234324"),"Stock photo remains in hero");
assert(js.includes('mailto:info@scsflex.com'));
console.log("FLEX_CONTINUITY_SMOKE_OK",JSON.stringify({htmlBytes:html.length,cssBytes:css.length,jsBytes:js.length,mapBytes:map.length,uniqueIds:ids.length,corridors:9}));
