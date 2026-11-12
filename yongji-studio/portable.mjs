import fs from 'node:fs';
import path from 'node:path';

// 安全且跨平台的遞歸複製函數
function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// 1. 同步 dist 資源至 portable 目錄
copyRecursive('dist', 'portable');

// 2. 遍歷所有 HTML 檔案轉換絕對路徑為相對路徑
function files(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap(x =>
    x.isDirectory() ? files(path.join(d, x.name)) : [path.join(d, x.name)]
  );
}

let checked = 0;
for (const file of files('portable').filter(x => x.endsWith('.html'))) {
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/(href|src)="\/(?!\/)([^"\n]*)"/g, (_, attr, url) => {
    let [part, fragment] = url.split('#');
    if (!path.extname(part)) part = part.replace(/\/$/, '') + '/index.html';
    let target = path.resolve('portable', part.replace(/^\//, ''));
    let rel = path.relative(path.dirname(path.resolve(file)), target).replaceAll('\\', '/');
    if (!fs.existsSync(target)) throw Error('Missing target file: ' + target);
    checked++;
    return `${attr}="${rel}${fragment ? '#' + fragment : ''}"`;
  });
  fs.writeFileSync(file, html);
}

console.log('Portable pages built successfully; ' + checked + ' relative file targets verified.');
