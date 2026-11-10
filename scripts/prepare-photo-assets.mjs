/**
 * Authentic FLEX website photography — non-generative correction pass.
 * Uses original Drive-sourced WH36 photographs. No compositing or invented content.
 * Output produced only at build time; private/sensitive photos are not included.
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
const files=[
 {name:"wh36-hero",source:"assets/photo-sources/wh36-panorama.jpg",crop:null,use:"Hero backdrop — WH36 archival general storage"},
 {name:"wh36-racking",source:"assets/photo-sources/wh36-high-racking.jpg",crop:{left:0,top:10,width:1280,height:795},use:"Warehouse story — WH36 archival racking"},
 {name:"wh36-general",source:"assets/photo-sources/wh36-general.jpg",crop:null,use:"Service tile — WH36 archival storage operations"}
];
const outdir="assets/photos";
await mkdir(outdir,{recursive:true});
const output=[];
for(const f of files){
 const input=await readFile(f.source);
 const pipeline=sharp(input,{failOn:"error"}).rotate();
 if(f.crop)pipeline.extract(f.crop);
 await pipeline
   .modulate({brightness:1.032,saturation:0.975})
   .linear(1.035,-4)
   .sharpen({sigma:0.75})
   .webp({quality:84,effort:6})
   .toFile(outdir+"/"+f.name+".webp");
 const contents=await readFile(outdir+"/"+f.name+".webp");
 const dimensions=await sharp(contents).metadata();
 output.push({name:f.name,source:f.source,width:dimensions.width,height:dimensions.height,bytes:contents.length,sha256:createHash("sha256").update(contents).digest("hex"),use:f.use,method:"real-photo crop/color/exposure/sharpen; non-generative"});
}
await writeFile(outdir+"/photo-manifest.json",JSON.stringify({policy:"Real archival FLEX WH36 photography. Publication clearances pending. Never imply current condition or specific storage approval.",images:output},null,2));
console.log("FLEX_REAL_PHOTO_BUILD_OK",JSON.stringify(output.map(({name,bytes,width,height})=>({name,bytes,width,height}))));
