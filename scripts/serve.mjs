import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const PORT=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.jpg':'image/jpeg','.svg':'image/svg+xml','.pdf':'application/pdf','.json':'application/json','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
const redirects=Object.fromEntries((await readFile(path.join(ROOT,'_redirects'),'utf8')).trim().split('\n').filter(Boolean).map(s=>s.split(/\s+/).slice(0,2)));
http.createServer(async(req,res)=>{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return;}
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(redirects[pathname]){res.writeHead(301,{'Location':redirects[pathname]});res.end();return;}
  let p=path.resolve(ROOT,'.'+pathname);
  if(p!==ROOT&&!p.startsWith(ROOT+path.sep)){res.writeHead(403);res.end();return;}
  try{if((await stat(p)).isDirectory()){if(!pathname.endsWith('/')){res.writeHead(301,{'Location':pathname+'/'});res.end();return;}p=path.join(p,'index.html');}}catch{}
  let bytes,status=200;
  try{bytes=await readFile(p);}catch{status=404;p=path.join(ROOT,'404.html');bytes=await readFile(p);}
  res.writeHead(status,{'Content-Type':mime[path.extname(p)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});
  res.end(req.method==='HEAD'?undefined:bytes);
 }catch{res.writeHead(400);res.end('Bad request');}
}).listen(PORT,'127.0.0.1',()=>console.log(`Local preview: http://127.0.0.1:${PORT} — serving dist only`));
