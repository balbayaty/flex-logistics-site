import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";

const read=p=>readFileSync(p,"utf8");
const html=read("index.html"),css=read("assets/css/flex-experience.css"),js=read("assets/js/flex-experience.js");
assert(html.startsWith("<!doctype html>"),"Missing doctype");
assert(html.includes('meta name="robots" content="noindex,nofollow,noarchive"'),"Preview must be noindex");
assert(html.includes("INTERACTIVE DESIGN STUDY"),"Missing conspicuous concept disclosure");
assert(html.includes("not a live service"),"Missing non-operational qualification");
assert(!/<script[^>]+src=["']https?:\/\//.test(html),"Unexpected third-party JS");
assert(css.length>15000&&js.length>9000,"Assets unexpectedly small");
assert(!css.includes("<style>")&&!css.includes("</style>"),"Invalid CSS wrappers");
for(const f of ["assets/css/flex-experience.css","assets/js/flex-experience.js"])assert(existsSync(f),"Missing file "+f);
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
const dupe=ids.filter((id,i)=>ids.indexOf(id)!==i);
assert.equal(dupe.length,0,"Duplicate HTML IDs: "+dupe.join(","));
for(const p of [...html.matchAll(/\bhref="#([^"]+)"/g)].map(m=>m[1]))assert(ids.includes(p),"Broken navigation anchor: "+p);
const requiredIds=["langToggle","themeToggle","menuToggle","mobileMenu","particles","networkMap","mapCurrentLabel","movingPulse","movingPulseHalo","routeDestCode","routeGateway","routeCargo","routeChecks","routeBackup","routeDescription","aiResponse","missionDialog","missionForm","missionLane","missionCargo","missionDetails","missionSubmit"];
for(const id of requiredIds)assert(ids.includes(id),"Missing functional element: "+id);
for(const r of ["dubai","kuwait","amman","baghdad"]) {
  assert(ids.includes("route-"+r),"Missing SVG route: "+r);
  assert(html.includes('data-route="'+r+'"'),"Missing UI tab: "+r);
  assert(js.includes("    "+r+":"),"Missing controller data for route "+r);
}
for(const q of ["chem","border","visibility"])assert(html.includes('data-question="'+q+'"'),"Missing question chip "+q);
const translationKeys=[...new Set([...html.matchAll(/data-i18n="([^"]+)"/g)].map(m=>m[1]))];
const missingTranslation=translationKeys.filter(key=>!new RegExp("\\b"+key+"\\s*:").test(js));
assert.deepEqual(missingTranslation,[],"Missing Arabic strings: "+missingTranslation.join(","));
assert(html.includes('lang="ar"')===false,"Default English page changed unexpectedly");
assert(js.includes("window.location.href=href"),"Enquiry fallback missing");
assert(html.includes('href="https://www.scsflex.com/"'),"Official site link missing");
assert(!html.includes("200K+")&&!html.includes("98.7%"),"Unsupported marketing statistics leaked into concept");
try{
  const postcss=(await import("postcss")).default;
  postcss.parse(css,{from:"assets/css/flex-experience.css"});
  console.log("CSS_PARSE_OK");
}catch(err){
  if(err.code==="ERR_MODULE_NOT_FOUND")console.log("CSS_PARSE_SKIPPED (postcss unavailable)");
  else throw err;
}
console.log("EXPERIENCE_SMOKE_OK",JSON.stringify({htmlBytes:html.length,cssBytes:css.length,jsBytes:js.length,ids:ids.length,translatedLabels:translationKeys.length,routes:4,questions:3,verified:["noindex","assets","links","route wiring","i18n","enquiry"]}));
