import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
http.createServer((req,res)=>{let url=decodeURIComponent(req.url.split('?')[0]);let file=path.resolve(root,'.'+url);if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);return res.end();}if(!path.extname(file))file=path.join(file,'index.html');fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found');}res.setHeader('Content-Type',({'html':'text/html; charset=utf-8','css':'text/css','js':'text/javascript','svg':'image/svg+xml'})[path.extname(file).slice(1)]||'application/octet-stream');res.end(data);});}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
