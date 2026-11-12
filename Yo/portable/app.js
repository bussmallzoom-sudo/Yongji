const toggle=document.querySelector('.menu-toggle'),panel=document.querySelector('.menu-panel');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'關閉 ✕':'選單 ☰';panel.classList.toggle('open',open);panel.inert=!open;document.body.style.overflow=open?'hidden':'';});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('open'))toggle.click();});
const dialog=document.querySelector('#contact-dialog');let returnFocus;
document.querySelectorAll('[data-contact]').forEach(b=>b.addEventListener('click',()=>{returnFocus=b;const topic=b.dataset.contact;dialog.querySelector('textarea').value=topic?`您好，我想詢問${topic}。\n目前的床睡起來：\n使用人數與尺寸：\n方便到店的時間：`:'您好，我想請闆娘幫忙選床。\n目前的床睡起來：\n使用人數與尺寸：\n方便到店的時間：';dialog.querySelector('.status').textContent='';dialog.showModal();}));
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>returnFocus?.focus());
dialog.querySelector('[data-copy]').addEventListener('click',async()=>{const text=dialog.querySelector('textarea').value;try{await navigator.clipboard.writeText(text);dialog.querySelector('.status').textContent='已複製詢問內容，可貼到您與門市的對話中。';}catch{dialog.querySelector('textarea').select();dialog.querySelector('.status').textContent='請按 Ctrl+C 或長按文字複製。';}});
