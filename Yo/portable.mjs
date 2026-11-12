import fs from 'node:fs';import path from 'node:path';
fs.cpSync('dist','portable',{recursive:true});
function files(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(x=>x.isDirectory()?files(path.join(d,x.name)):[path.join(d,x.name)]);}
let checked=0;
for(const file of files('portable').filter(x=>x.endsWith('.html'))){let html=fs.readFileSync(file,'utf8');html=html.replace(/(href|src)="\/(?!\/)([^"\n]*)"/g,(_,attr,url)=>{let [part,fragment]=url.split('#');if(!path.extname(part))part=part.replace(/\/$/,'')+'/index.html';let target=path.resolve('portable',part.replace(/^\//,''));let rel=path.relative(path.dirname(path.resolve(file)),target).replaceAll('\\','/');if(!fs.existsSync(target))throw Error('Missing: '+target);checked++;return `${attr}="${rel}${fragment?'#'+fragment:''}"`;});fs.writeFileSync(file,html);}
console.log('Portable pages built; '+checked+' relative file targets verified.');
