import http from 'node:http';
import { createReadStream, readFile, stat, watch } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const root=fileURLToPath(new URL('..',import.meta.url));
const dist=path.join(root,'dist');
function build(){const r=spawnSync(process.execPath,['scripts/build.mjs'],{cwd:root,stdio:'inherit'});return r.status===0;}
if(!build())process.exit(1);
const mime={'.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.mp4':'video/mp4','.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.md':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.xml':'application/xml; charset=utf-8'};
const server=http.createServer((req,res)=>{
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
 const candidate=path.resolve(dist,'.'+pathname);
 if(candidate!==dist&&!candidate.startsWith(dist+path.sep)){res.writeHead(403).end();return;}
 function streamVideo(file, size) {
  const headers = {'Content-Type':'video/mp4','Accept-Ranges':'bytes'};
  const range = req.headers.range;
  let start=0, end=size-1;
  if(range){
   const match=/^bytes=(\d*)-(\d*)$/.exec(range);
   if(match && (match[1] || match[2])){
    start=match[1] ? Number(match[1]) : Math.max(0,size-Number(match[2]));
    end=match[1] && match[2] ? Math.min(size-1,Number(match[2])) : size-1;
   }else{start=size}
   if(start>=size || end<start){res.writeHead(416,{'Content-Range':'bytes */'+size}).end();return}
   headers['Content-Range']=`bytes ${start}-${end}/${size}`;
  }
  res.writeHead(range?206:200,{...headers,'Content-Length':end-start+1});
  if(req.method==='HEAD'){res.end();return}
  const stream=createReadStream(file,{start,end});
  res.once('close',()=>stream.destroy());
  stream.on('error',()=>res.destroy());
  stream.pipe(res);
 }
 const serve=(file,status=200)=>readFile(file,(err,data)=>{if(err){readFile(path.join(dist,'404.html'),(e,body)=>{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(body||'Not found');});return;}res.writeHead(status,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(data);});
 stat(candidate,(err,s)=>{if(!err&&s.isDirectory())serve(path.join(candidate,'index.html'));else if(!err && s.isFile() && path.extname(candidate)==='.mp4')streamVideo(candidate,s.size);else serve(candidate);});
});
server.listen(Number(process.env.PORT)||4173,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${server.address().port}`));
let timer;for(const folder of ['src','data'])watch(path.join(root,folder),{recursive:true},()=>{clearTimeout(timer);timer=setTimeout(build,100);});
process.on('SIGINT',()=>server.close(()=>process.exit(0)));
