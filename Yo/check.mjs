import fs from 'node:fs';import path from 'node:path';
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(d=>d.isDirectory()?files(path.join(dir,d.name)):[path.join(dir,d.name)]);}
const html=files('dist').filter(f=>f.endsWith('.html'));let errors=[];
for(const file of html){const s=fs.readFileSync(file,'utf8');if((s.match(/<h1[ >]/g)||[]).length!==1)errors.push(file+': heading count');for(const [,url]of s.matchAll(/(?:href|src)="([^"#][^"]*)"/g)){if(!url.startsWith('/')||url.startsWith('//'))continue;const clean=url.split('#')[0];const dest=path.join('dist',clean);if(!fs.existsSync(dest))errors.push(file+': missing '+url);}if(!s.includes('lang="zh-Hant"'))errors.push(file+': language');}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}console.log('PASS: '+html.length+' pages, all internal targets, Traditional Chinese, single primary heading.');
