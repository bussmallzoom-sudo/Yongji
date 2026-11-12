export function makeNeedsSection(link){
  const choices=[
    {id:'feel',label:'軟硬拿不定',title:'現在的床，哪裡睡得不習慣？',text:'偏硬、偏軟，還是翻身時不順？先把感覺說具體，再用熟悉的睡姿比較，讓選床更有依據。'},
    {id:'couple',label:'兩人睡感不同',title:'一起比較，找到舒服的交集。',text:'先分別整理睡姿與偏好，再一起比較另一半翻身時的感受，找到兩個人都能接受的範圍。'},
    {id:'care',label:'替長輩選床',title:'躺得舒服，也要起身方便。',text:'把床架高度、坐床緣與上下床的習慣一起考慮。方便的話，讓實際使用的人親自來比較。'}
  ];
  return `<section class="section wrap home-start needs-simplified" id="start">
    <header class="needs-heading"><h2>從你的睡感，開始選床。</h2><p>選一個最貼近你的問題，闆娘陪你慢慢釐清。</p></header>
    <div class="home-needs-layout">
      <div class="needs-tabs" role="tablist" aria-label="選床需求" aria-orientation="horizontal">${choices.map((item,i)=>`<button type="button" class="need-tab" id="need-tab-${item.id}" role="tab" aria-controls="need-panel-${item.id}" aria-selected="${i===0}" tabindex="${i===0?0:-1}">${item.label}</button>`).join('')}</div>
      <div class="needs-content">${choices.map((item,i)=>`<article role="tabpanel" id="need-panel-${item.id}" aria-labelledby="need-tab-${item.id}" tabindex="0" ${i?'hidden':''}><h3>${item.title}</h3><div class="needs-explanation"><p>${item.text}</p>${link('/guide/#'+item.id,'看看選床建議')}</div></article>`).join('')}</div>
    </div>
  </section>`;
}
