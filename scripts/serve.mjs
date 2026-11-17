import http from 'node:http';
import { readFile, stat, watch } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const root=fileURLToPath(new URL('..',import.meta.url));
const dist=path.join(root,'dist');
function build(){const r=spawnSync(process.execPath,['scripts/build.mjs'],{cwd:root,stdio:'inherit'});return r.status===0;}
if(!build())process.exit(1);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.md':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.xml':'application/xml; charset=utf-8'};
const server=http.createServer((req,res)=>{
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
 const candidate=path.resolve(dist,'.'+pathname);
 if(candidate!==dist&&!candidate.startsWith(dist+path.sep)){res.writeHead(403).end();return;}
 const serve=(file,status=200)=>readFile(file,(err,data)=>{if(err){readFile(path.join(dist,'404.html'),(e,body)=>{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(body||'Not found');});return;}res.writeHead(status,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(data);});
 stat(candidate,(err,s)=>{if(!err&&s.isDirectory())serve(path.join(candidate,'index.html'));else serve(candidate);});
});
server.listen(Number(process.env.PORT)||4173,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${server.address().port}`));
let timer;for(const folder of ['src','data'])watch(path.join(root,folder),{recursive:true},()=>{clearTimeout(timer);timer=setTimeout(build,100);});
process.on('SIGINT',()=>server.close(()=>process.exit(0)));
