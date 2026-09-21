import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const files=[];async function walk(dir){for(const d of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,d.name);d.isDirectory()?await walk(p):files.push(p);}}await walk(ROOT);
const errors=[];const external=new Set();let links=0,images=0;
const redirects=Object.fromEntries((await readFile(path.join(ROOT,'_redirects'),'utf8')).trim().split('\n').filter(Boolean).map(s=>s.split(/\s+/).slice(0,2)));
const htmlFiles=files.filter(f=>f.endsWith('.html'));
const hasFile=async p=>{try{return (await stat(p)).isFile();}catch{return false;}};
for(const file of htmlFiles){
 const html=await readFile(file,'utf8');const label=path.relative(ROOT,file);
 if((html.match(/<h1(?:\s|>)/g)||[]).length!==1)errors.push(label+': needs exactly one h1');
 for(const need of ['<title>','name="description"','rel="canonical"','property="og:image"','<main id="main"','class="skip"'])if(!html.includes(need))errors.push(label+': missing '+need);
 for(const bad of ['linkedin.com/in/michael-dattolo','Centenary','MBA','44%','37%','40–60%','6 yrs','RESUME_SHA_REPLACE','908-798-3760'])if(html.includes(bad))errors.push(label+': prohibited stale text '+bad);
 for(const m of html.matchAll(/<img\b[^>]*>/g)){images++;if(!/alt="[^"]+"/.test(m[0])||!/width="\d+"/.test(m[0])||!/height="\d+"/.test(m[0]))errors.push(label+': image needs alt and dimensions');}
 for(const m of html.matchAll(/(?:href|src|data)="([^"]+)"/g)){
  const href=m[1];if(/^https:\/\//.test(href)){external.add(href);continue;}if(!href.startsWith('/')&&!href.startsWith('#'))continue;
  links++;const [raw,hash]=href.split('#');const route=redirects[raw]||raw;
  let target=raw?path.join(ROOT,route):file;
  if(route.endsWith('/'))target=path.join(target,'index.html');
  if(!await hasFile(target)){errors.push(label+': missing '+href);continue;}
  if(hash&&target.endsWith('.html')&&!(await readFile(target,'utf8')).includes(`id="${hash}"`))errors.push(label+': missing anchor '+href);
 }
}
for(const f of files)if(/\.(md|py|mjs|docx|zip|gz|b64)$/.test(f)||f.includes('/private/')||f.includes('/source-documents/'))errors.push('Non-public source leaked: '+f);
console.log(JSON.stringify({htmlPages:htmlFiles.length,localReferences:links,imageElements:images,externalUrls:[...external],errors},null,2));
if(errors.length)process.exit(1);
