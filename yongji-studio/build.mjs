import { makeHome } from './home-template.mjs';
import fs from 'node:fs';
import path from 'node:path';

const base = 'https://ygbed-homepage-v3-preview.netlify.app/homepage-v2-assets/ai-concepts/web/';
const images = {
  hero: '/assets/hero-bright-bedroom.jpg',
  miro: '/assets/yg-product-miro-clean.webp',
  venus: '/assets/yg-product-venus-clean.webp',
  spirit: '/assets/yg-product-sleep-spirit-clean.webp',
  hands: base + 'yg-home-consultation-hands-ai-concept-v2.jpg',
  store: base + 'yg-home-showroom-mood-ai-concept-v2.jpg',
  bannerGuide: '/assets/banner-guide.jpg',
  bannerMattresses: '/assets/banner-mattresses.jpg',
  bannerOwner: '/assets/banner-owner.jpg',
  bannerJournal: '/assets/banner-journal.jpg',
  bannerVisit: '/assets/banner-visit.jpg'
};

const products = [
  {
    slug: 'miro',
    name: '米羅',
    en: 'MIRO',
    image: 'miro',
    line: '均衡釋壓支撐，仰躺貼合腰背、側睡不壓迫肩膀。',
    feel: '適中偏彈性',
    support: '獨立筒結構',
    comfort: '高回彈釋壓層',
    scene: '適合多數成年人、仰臥與側臥混合睡姿'
  },
  {
    slug: 'venus',
    name: '維納斯',
    en: 'VENUS',
    image: 'venus',
    line: '表層柔潤服貼，溫柔包覆肩頸與臀部壓力。',
    feel: '偏軟釋壓',
    support: '高密度分區彈簧',
    comfort: '親膚舒壓層',
    scene: '適合習慣側睡、偏好包覆感、體型較纖細者'
  },
  {
    slug: 'sleep-spirit',
    name: '睡精靈',
    en: 'SLEEP SPIRIT',
    image: 'spirit',
    line: '扎實硬挺護脊，晨起腰部踏實不酸沉。',
    feel: '偏硬扎實',
    support: '中鋼高碳鋼硬式彈簧',
    comfort: '天然乳膠層',
    scene: '適合習慣硬床的長輩、成長期學童或需要強韌支撐者'
  }
];

const nav = [
  ['/guide/', '闆娘幫你選床'],
  ['/mattresses/', '床墊一覽'],
  ['/owner/', '認識闆娘'],
  ['/journal/', '選床知識'],
  ['/visit/', '門市與試躺']
];

const brand = `<span class="brand-mark" aria-hidden="true">永</span><span class="brand-name">永吉床墊<small>YONGJI MATTRESS</small></span>`;
const link = (url, text, cls = 'text-link') => `<a class="${cls}" href="${url}">${text}</a>`;
const contact = (text = 'LINE 問闆娘', topic = '', cls = 'btn') => `<button type="button" class="${cls}" data-contact="${topic}">${text}</button>`;
const pic = (key, alt, caption = true) => `<figure class="image-fallback"><div class="parallax-window"><img src="${images[key]}" alt="${alt}" loading="lazy" width="1200" height="900" data-parallax-img></div>${caption ? `<figcaption class="caption">原站 AI 情境示意，非${key === 'store' ? '門市實景' : key === 'hands' ? '闆娘本人' : '商品實拍'}</figcaption>` : ''}</figure>`;

const faqItems = [
  [
    '第一次挑床，出發前需要先準備什麼？',
    '先回想一下現在這張床哪裡睡得不滿意：太硬、太軟、翻身時震動大，或是兩個人對軟硬的想法不一樣。量好床架放置床墊的內徑尺寸與大概預算，這樣到店討論會更有焦點。'
  ],
  [
    '完全不知道自己該睡軟床還是硬床，可以直接問嗎？',
    '當然可以！挑床本來就不需要預設立場。到門市時，闆娘會請你用平常習慣的睡姿躺躺看，看看腰部有沒有騰空、翻身順不順暢，身體的感受比軟硬名詞更準確。'
  ],
  [
    '兩個人的體重跟軟硬喜好差很多，該怎麼選？',
    '建議兩個人一起到店試躺。一人放鬆躺平，另一人模擬上下床與翻身，親身感受抗干擾能力，在各自能接受的支撐度中找出最平衡的款式。'
  ],
  [
    '目前哪些床款可以在永和門市試躺？',
    '網站目前精選展示米羅、維納斯、睡精靈三款。門市現場展示款式與時段，出發前建議透過 LINE 先跟闆娘確認當天的展示狀態。'
  ],
  [
    '配送、舊床清運與售價要怎麼確認？',
    '價格與配送會根據尺寸、送貨地點樓層（是否有電梯）、以及是否需要代丟舊床而有所不同。請提供需求尺寸與配送地址，由門市提供完整清楚的報價與售後約定。'
  ]
];

const faq = (items = faqItems) => `<div class="faq-accordion">${items.map(([q, a]) => `<details class="faq-row"><summary class="faq-question"><span>${q}</span><span class="faq-icon" aria-hidden="true">+</span></summary><div class="faq-answer"><p>${a}</p></div></details>`).join('')}</div>`;

const productCards = () => `<div class="products-grid-clean">${products.map(p => `
<article class="product-item-clean">
  <a href="/mattresses/${p.slug}/" class="product-thumb">
    ${pic(p.image, p.name + '床墊情境示意', false)}
  </a>
  <div class="product-info">
    <div class="product-info-head">
      <h3>${p.name}</h3>
      <span class="product-feel-label">${p.feel}</span>
    </div>
    <p class="product-line">${p.line}</p>
    <div class="product-meta-row">
      <div><span>支撐結構</span><strong>${p.support}</strong></div>
      <div><span>舒適材質</span><strong>${p.comfort}</strong></div>
    </div>
    <div class="product-actions-row">
      ${link('/mattresses/' + p.slug + '/', '認識這張床 →', 'link-arrow')}
      ${contact('詢問此款', p.name, 'btn btn-sm')}
    </div>
  </div>
</article>`).join('')}</div><p class="source-label">※ 圖片為原站 AI 情境示意；材質、花色與實際規格待品牌確認。</p>`;

const intro = (eyebrow, title, desc, bread = '', banner = '') => `
<section class="page-intro-clean">
  <div class="wrap page-intro-inner${banner ? '' : ' no-banner'}">
    <div class="intro-headline">
      <div class="breadcrumb"><a href="/">首頁</a> <span class="sep">/</span> <span>${bread || title.replaceAll('<br>', '')}</span></div>
      <h1>${title}</h1>
      ${desc ? `<p class="intro-description">${desc}</p>` : ''}
    </div>
    ${banner ? `
    <div class="intro-banner-col">
      <figure class="intro-banner-card parallax-window">
        <img src="${banner}" alt="${bread || title.replaceAll('<br>', '')} 情境空間示意" loading="eager" width="1200" height="750" data-parallax-img>
      </figure>
    </div>` : ''}
  </div>
</section>`;

const close = () => `
<section class="bottom-closing">
  <div class="wrap bottom-closing-inner">
    <h2>不用先做功課，<br>問闆娘就好。</h2>
    <p>從「現在這張床睡起來哪裡不習慣……」開始，<br>把真實的感受說出來，我們一起找到最合適的床。</p>
    <div class="actions">
      ${contact('LINE 問闆娘', '', 'btn btn-primary btn-large')}
      ${link('/visit/', '預約門市試躺', 'btn btn-ghost btn-large')}
    </div>
  </div>
</section>`;

function shell(title, content, current = '/') {
  return `<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}｜永吉床墊</title>
  <meta name="description" content="永吉床墊，闆娘幫你選床。先聊睡感、比較床款，再到永和中正店親自試躺。">
  <meta name="robots" content="noindex,nofollow">
  <meta name="theme-color" content="#22382c">
  <link rel="stylesheet" href="/site.css">
  <script defer src="/app.js"></script>
</head>
<body>
  <a class="skip" href="#main">跳至主要內容</a>

  <!-- 頂部導覽 -->
  <header class="site-header" id="site-header">
    <a href="/" class="brand" aria-label="永吉床墊首頁">${brand}</a>
    <nav class="desktop-nav" aria-label="主要導覽">
      ${nav.map(([u, t]) => `<a href="${u}" ${current.startsWith(u) ? 'aria-current="page"' : ''}>${t}</a>`).join('')}
    </nav>
    <div class="header-action">
      ${contact('問闆娘 →', '', 'btn btn-header')}
      <button class="menu-toggle" aria-controls="mobile-menu" aria-expanded="false" aria-label="開啟選單">選單 ☰</button>
    </div>
  </header>

  <!-- 行動端選單 -->
  <nav id="mobile-menu" class="menu-panel" aria-label="手機導覽" inert>
    <div class="mobile-nav-items">
      ${nav.map(([u, t]) => link(u, t, 'mobile-link')).join('')}
    </div>
    <div class="mobile-menu-foot">
      <p>永吉床墊 永和中正店<br>不急著賣你，先陪你選對。</p>
      ${contact('LINE 線上諮詢', '', 'btn btn-primary btn-block')}
    </div>
  </nav>

  <div class="preview-tag">設計預覽 · 圖片沿用原站情境示意；商品、門市與聯絡資料待確認。</div>

  <!-- 主內容容器 -->
  <main id="main">
    ${content}
  </main>

  <!-- 底部版權與導覽 -->
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-col-main">
          <a href="/" class="brand footer-brand">${brand}</a>
          <p class="footer-summary">買床不用懂，問闆娘就對。<br>不急著賣你，先陪你選對。<br>從真實感受出發，找到能安心放鬆的那張床。</p>
          <div class="footer-address">
            <span>門市地址</span>
            <strong>新北市永和區中正路（永和中正店）</strong>
          </div>
        </div>
        <div class="footer-col-nav">
          <span class="footer-heading">網站導覽</span>
          ${nav.slice(0, 4).map(([u, t]) => link(u, t, 'footer-link')).join('')}
        </div>
        <div class="footer-col-nav">
          <span class="footer-heading">門市與支援</span>
          ${link('/visit/', '門市試躺與預約', 'footer-link')}
          ${link('/faq/', '常見問題與售後', 'footer-link')}
          ${link('/privacy/', '網站隱私權說明', 'footer-link')}
          ${link('https://ishop888.com/z.asp?id=11108#yg-top', '查看原網站資料 ↗', 'footer-link')}
        </div>
      </div>

      <div class="preview-disclaimer">
        ※ 備註說明：網站圖片為原站 AI 情境示意；床墊真實材質、花色、價格與營業時間請以門市確認為準。
      </div>

      <div class="footer-bottom-row">
        <span>© ${new Date().getFullYear()} 永吉床墊 YONGJI MATTRESS</span>
        <span>永吉床墊 · 永和中正店</span>
      </div>
    </div>
  </footer>

  <!-- 行動端底部常駐雙按鈕 -->
  <div class="mobile-bar">
    ${contact('LINE 問闆娘', '', 'mobile-bar-btn btn-line')}
    ${link('/visit/', '到店試躺 →', 'mobile-bar-btn btn-visit')}
  </div>

  <!-- 諮詢彈窗 -->
  <dialog class="contact-dialog" id="contact-dialog" aria-labelledby="dialog-title">
    <button class="dialog-close" aria-label="關閉視窗">✕</button>
    <div class="dialog-inner">
      <h2 id="dialog-title">先把想問的整理好</h2>
      <p class="dialog-lead">目前可編輯並複製下方諮詢內容，稍後直接貼至 LINE 與闆娘對話：</p>
      <label for="message" class="sr-only">諮詢內容</label>
      <textarea id="message" class="dialog-input"></textarea>
      <div class="dialog-btn-group">
        <button type="button" class="btn btn-primary" data-copy>複製諮詢內容</button>
        <button type="button" class="btn btn-outline dialog-cancel">關閉</button>
      </div>
      <div class="status" role="status" aria-live="polite"></div>
    </div>
  </dialog>
</body>
</html>`;
}

// ----------------------------------------------------
// 內頁定義 (P02 ~ P10)
// ----------------------------------------------------

const home = makeHome({ images, pic, link, contact, faq, faqItems });

// P02 闆娘幫你選床 (guide)
const guide = `
${intro('選床指南', '不是先背材質，<br>是先把需求問對。', '把現在睡起來的感受說清楚，比先記住一串複雜專利名稱，更能精準找到合適的床。', '闆娘幫你選床', images.bannerGuide)}

<nav class="subnav" aria-label="指南章節導覽">
  <div class="wrap subnav-flex">
    <a href="#feel">軟硬怎麼選</a>
    <a href="#couple">兩人需求不同</a>
    <a href="#care">替長輩挑床</a>
    <a href="#prepare">到店前準備</a>
  </div>
</nav>

<section class="section section-surface-light">
  <div class="wrap editorial-clean">
    <div class="editorial-text">
      <h2>從每天早晨的感受，<br>找選床的線索。</h2>
      <p>現在的床是偏硬、偏軟，還是翻身時腰部常常懸空？平常是仰睡還是側睡比較多？把這些日常的細節記下來，到店試躺時才有清楚的比較依據。</p>
      <div class="editorial-action">
        ${contact('整理我的選床需求', '', 'btn btn-primary')}
      </div>
    </div>
    <div class="editorial-photo">
      ${pic('hands', '諮詢手部與床墊材質觸感')}
    </div>
  </div>
</section>

<section class="section section-surface-warm">
  <div class="narrow">
    <div class="section-center-head">
      <h2>不同生活階段，挑選重點也不同。</h2>
    </div>
    <div class="guide-card" id="feel">
      <h3>軟硬拿不定主意？</h3>
      <p>挑床不用先預設立場一定要買「硬床」或「軟床」。關鍵在於躺平時，背脊有沒有被自然承托。試躺時保持習慣的枕頭高度與睡姿，細細感受腰部有沒有被實實接住、肩膀會不會受到壓迫。</p>
      ${link('/journal/feel/', '閱讀延伸：軟硬之外，還能怎麼比較？ →', 'text-link-clean')}
    </div>

    <div class="guide-card" id="couple">
      <h3>兩個人感受不同？</h3>
      <p>一個人怕熱、一個人怕冷；一人喜歡偏硬、一人喜歡包覆。最好的方法是夫妻兩個人一起到門市，一人躺平、另一人模擬翻身或上下床，測試獨立筒抗干擾程度，找出彼此都能接受的平衡點。</p>
      ${link('/journal/couples/', '閱讀延伸：兩個人的床，怎麼一起選？ →', 'text-link-clean')}
    </div>

    <div class="guide-card" id="care">
      <h3>替長輩挑選合適的好床？</h3>
      <p>替長輩選床，除了躺下的支撐強度要足夠、避免腰部下陷外，也要特別注意「床緣支撐力」與「床墊加床架的總高度」，坐下時雙腳能平踩地面，長輩起臥才不費力。</p>
      <p class="inline-tip">※ 提醒：若有持續的腰背或骨骼不適，請先尋求專業醫師診斷；門市試躺以挑選舒適睡眠感受為目的。</p>
    </div>
  </div>
</section>

<section class="section section-surface-stone" id="prepare">
  <div class="narrow">
    <h2>帶著這些線索來，<br>不必帶著標準答案。</h2>
    <div class="checklist-grid">
      <div class="checklist-card">
        <div>
          <h4>現在這張床哪裡不習慣</h4>
          <p>記下一到兩個最希望改善的生活困擾。</p>
        </div>
      </div>
      <div class="checklist-card">
        <div>
          <h4>床架內徑尺寸與搬運空間</h4>
          <p>量好床架實際擺放空間，留意樓梯轉角與電梯門寬。</p>
        </div>
      </div>
      <div class="checklist-card">
        <div>
          <h4>實際使用人數與偏好</h4>
          <p>共同使用的人盡量一起前來，留足時間放鬆體驗。</p>
        </div>
      </div>
    </div>
    <div class="center-btn-row">
      ${link('/mattresses/', '帶著需求看床墊系列 →', 'btn btn-primary')}
    </div>
  </div>
</section>
${close()}`;

// P03 床墊一覽 (mattresses)
const mattresses = `
${intro('床墊一覽', '先看三款，<br>不用一次看幾十張。', '先認識每款床墊的睡感特徵，再由闆娘陪你縮小選擇。正式規格與價格依門市確認資料為準。', '床墊一覽', images.bannerMattresses)}

<section class="section section-surface-light">
  <div class="wrap">
    <div class="filter-bar">
      <span>精選款式：</span>
      <a href="#collection" class="active">全系列 (03)</a>
      <a href="#compare">規格睡感橫向對比表 ↓</a>
    </div>
    <div id="collection">
      ${productCards()}
    </div>
  </div>
</section>

<section class="section section-surface-warm" id="compare">
  <div class="wrap">
    <h2>別只比名字，<br>把睡感和結構放在一起看。</h2>
    <p class="section-lead">以下整理三款床墊的特點，方便你在到店前心中更有輪廓：</p>
    
    <div class="table-container">
      <table class="clean-table">
        <thead>
          <tr>
            <th scope="col">比較項目</th>
            ${products.map(p => `<th scope="col">${link('/mattresses/' + p.slug + '/', p.name, 'table-title-link')}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">睡感特質</th>
            <td>適中偏彈性</td>
            <td>偏軟釋壓</td>
            <td>偏硬扎實</td>
          </tr>
          <tr>
            <th scope="row">核心支撐</th>
            <td>獨立筒結構</td>
            <td>高密度分區彈簧</td>
            <td>中鋼高碳鋼硬式彈簧</td>
          </tr>
          <tr>
            <th scope="row">舒適層</th>
            <td>高回彈釋壓層</td>
            <td>親膚舒壓層</td>
            <td>天然乳膠層</td>
          </tr>
          <tr>
            <th scope="row">最推薦對象</th>
            <td>多數成人、仰睡側睡混合</td>
            <td>習慣側睡、偏好包覆感者</td>
            <td>習慣硬床的長輩、青少年</td>
          </tr>
          <tr>
            <th scope="row">門市試躺</th>
            <td>永和中正店常態展示</td>
            <td>永和中正店常態展示</td>
            <td>永和中正店常態展示</td>
          </tr>
          <tr>
            <th scope="row">詢問此款</th>
            ${products.map(p => `<td>${contact('詢問' + p.name, p.name, 'btn btn-sm')}</td>`).join('')}
          </tr>
        </tbody>
      </table>
    </div>

    <div class="compare-cta-box">
      <p>想了解哪一款最符合你們家的生活習慣？</p>
      ${contact('請闆娘協助比較這三款床', '米羅、維納斯與睡精靈的比較', 'btn btn-primary')}
    </div>
  </div>
</section>
${close()}`;

// P04 商品詳細 (productPage)
function productPage(p) {
  return `
${intro(p.name + '床墊', p.name, p.line, '床墊一覽 / ' + p.name, images[p.image])}

<section class="section section-surface-light">
  <div class="product-hero-clean wrap">
    <div class="product-hero-pic">
      ${pic(p.image, p.name + '床墊情境示意')}
    </div>
    <div class="product-hero-content">
      <p class="product-feel-meta">${p.feel}</p>
      <h2>${p.name}</h2>
      <p class="product-lead-text">${p.line}</p>
      
      <dl class="product-meta-list">
        <div><dt>款式定位</dt><dd>${p.name} (${p.en})</dd></div>
        <div><dt>睡感特質</dt><dd>${p.feel}</dd></div>
        <div><dt>核心支撐</dt><dd>${p.support}</dd></div>
        <div><dt>舒適材質</dt><dd>${p.comfort}</dd></div>
        <div><dt>適用尺寸</dt><dd>標準單人 / 標準雙人 / 雙人加大等請向門市確認</dd></div>
      </dl>

      <div class="product-hero-buttons">
        ${contact('LINE 詢問這一款', p.name, 'btn btn-primary')}
        ${link('/visit/', '預約門市試躺', 'btn btn-outline')}
      </div>
      <p class="tip-text">※ 圖片為原站 AI 情境示意，非實體拍攝。正式材質規格與報價以門市確認為準。</p>
    </div>
  </div>
</section>

<nav class="subnav" aria-label="商品章節導覽">
  <div class="wrap subnav-flex">
    <a href="#suitability">適合對象</a>
    <a href="#materials">材質結構</a>
    <a href="#sizes">尺寸與報價</a>
    <a href="#aftercare">配送售後</a>
  </div>
</nav>

<div class="section-surface-warm">
  <div class="wrap product-sections-container">
    <section class="section-row" id="suitability">
      <div class="section-row-label">
        <h2>先問需求，<br>再看合不合適。</h2>
      </div>
      <div class="section-row-body">
        <p class="body-lead">${p.scene}。</p>
        <p>想了解${p.name}適不適合你，可以先跟闆娘聊聊現在睡的床有哪些不舒服、平常的主要睡姿、是自己睡還是兩個人一起使用。</p>
        <p>到門市用平常習慣的睡姿試躺 15 分鐘，放鬆感受腰部支撐與翻身動作，身體覺得合適再列入考慮。</p>
        ${link('/guide/', '不知道怎麼挑？先看選床指南 →', 'text-link-clean')}
      </div>
    </section>

    <section class="section-row" id="materials">
      <div class="section-row-label">
        <h2>材質與結構，<br>每一層都該有依據。</h2>
      </div>
      <div class="section-row-body">
        <p>永吉堅持真材實料，從親膚透氣表布、減壓舒適棉層，到核心高碳鋼獨立筒，每一層結構都有明確的支撐作用。</p>
        <div class="layer-box-list">
          <div class="layer-box">
            <strong>表布層</strong><span>柔軟透氣針織布，觸感親膚不悶熱。</span>
          </div>
          <div class="layer-box">
            <strong>舒適層</strong><span>高回彈減壓材質，服貼身體曲線。</span>
          </div>
          <div class="layer-box">
            <strong>支撐層</strong><span>高碳鋼獨立筒彈簧，顆顆獨立受力、吸震抗干擾。</span>
          </div>
        </div>
        <p class="source-label">※ 本款床墊正式層次與厚度數值待品牌最終覆核，確認前不以示意圖浮誇宣稱。</p>
      </div>
    </section>

    <section class="section-row" id="sizes">
      <div class="section-row-label">
        <h2>從床架尺寸開始。</h2>
      </div>
      <div class="section-row-body">
        <p>詢問時請提供床架實際能擺放床墊的「內徑長度與寬度」，以及配送地址（是否有電梯、住家樓層），門市會為您確認適用的尺寸與完整報價。</p>
        <div class="size-chips-wrap">
          <span>標準單人 (3 × 6.2 尺)</span>
          <span>單人加大 (3.5 × 6.2 尺)</span>
          <span>標準雙人 (5 × 6.2 尺)</span>
          <span>雙人加大 (6 × 6.2 尺)</span>
          <span>雙人特大 (6 × 7 尺)</span>
        </div>
        <div style="margin-top:24px;">
          ${contact('詢問尺寸與報價', p.name + '的尺寸與報價', 'btn btn-primary')}
        </div>
      </div>
    </section>

    <section class="section-row" id="aftercare">
      <div class="section-row-label">
        <h2>買之前，<br>把售後都問清楚。</h2>
      </div>
      <div class="section-row-body">
        <p>在下訂前，我們會跟您核對配送範圍、搬運條件、舊床代搬下樓或環保局回收配合方式、付款方式與結構保固條款。所有細節皆以門市正式約定為準。</p>
        ${link('/faq/', '查看完整配送與售後保固說明 →', 'text-link-clean')}
      </div>
    </section>
  </div>
</div>

<section class="section section-surface-light">
  <div class="wrap">
    <div class="section-header-stack">
      <h2>也一起看看其他款式</h2>
      <p class="section-lead">${link('/mattresses/#compare', '查看完整規格比較表 →', 'text-link-clean')}</p>
    </div>
    ${productCards()}
  </div>
</section>
${close()}`;
}

// P05 認識闆娘 (owner)
const owner = `
${intro('認識闆娘', '買床不用懂，<br>問闆娘就對。', '選床的起點，是每天睡醒最真實的感受。永吉以「闆娘幫你選床」為核心，從生活對話開始，陪你找到睡得安心的床。', '認識闆娘', images.bannerOwner)}

<section class="section section-surface-light">
  <div class="wrap editorial-clean">
    <div class="editorial-photo">
      ${pic('hands', '闆娘諮詢與手部觸碰材質情境')}
    </div>
    <div class="editorial-text">
      <h2>不急著賣你，<br>先陪你選對。</h2>
      <p class="quote-text">「很多人一走進店裡就很緊張，怕被推銷太貴的床，又怕買回家睡幾天就腰酸背痛。」</p>
      <p>闆娘常說，床是每天要躺好幾個小時的地方，不能靠花俏話術，只能靠身體最誠實的反應。把「偏硬一點」、「容易腰酸」、「兩個人喜歡的不一樣」這些日常感受放在前面，其他規格才有比較的意義。</p>
      <p>永吉在永和服務多年，靠的就是這份把客人當朋友的實在。</p>
      <div class="editorial-action">
        ${link('/guide/', '看看我們怎麼開始選床 →', 'btn btn-primary')}
      </div>
    </div>
  </div>
</section>

<section class="section section-surface-warm">
  <div class="narrow">
    <h2>一步一步，<br>讓選擇變得清楚踏實。</h2>
    <div class="checklist-grid">
      <div class="checklist-card">
        <div>
          <h4>先聊感受</h4>
          <p>說說現在的床哪裡睡得不舒服，讓挑選有具體的起點。</p>
        </div>
      </div>
      <div class="checklist-card">
        <div>
          <h4>縮小選項</h4>
          <p>依據身型、睡姿與預算，精選兩到三款值得比較的床。</p>
        </div>
      </div>
      <div class="checklist-card">
        <div>
          <h4>安心試躺</h4>
          <p>放鬆躺足時間，把想問的問題問清楚，安心了再做決定。</p>
        </div>
      </div>
    </div>
    <div class="center-btn-row">
      ${link('/visit/', '預約門市試躺 →', 'btn btn-primary')}
    </div>
  </div>
</section>
${close()}`;

// P06 門市與試躺 (visit)
const visit = `
${intro('門市與試躺', '好不好睡，<br>留給身體回答。', '先了解試躺方式，確認展示床款與預約時段，再到永和中正店實際放鬆感受。', '門市與試躺', images.bannerVisit)}

<nav class="subnav" aria-label="門市導覽">
  <div class="wrap subnav-flex">
    <a href="#experience">試躺流程</a>
    <a href="#store">門市資訊</a>
    <a href="#visit-faq">到店前問答</a>
  </div>
</nav>

<section class="section section-surface-light" id="experience">
  <div class="wrap store-banner">
    ${pic('store', '永和中正店體驗環境氛圍')}
  </div>
  <div class="narrow">
    <h2>一趟舒服的試躺，<br>可以這樣開始。</h2>
    <div class="checklist-grid">
      <div class="checklist-card">
        <div>
          <h4>出發前確認方向</h4>
          <p>告訴我們平時的睡姿、使用人數與想比較的款式，確認展示狀態。</p>
        </div>
      </div>
      <div class="checklist-card">
        <div>
          <h4>放鬆躺平感受</h4>
          <p>用熟悉的睡姿躺 15 分鐘，感受肩膀、腰部與臀部的支撐表現。</p>
        </div>
      </div>
      <div class="checklist-card">
        <div>
          <h4>問清楚再做決定</h4>
          <p>了解尺寸、價格、配送與售後條款，不用在現場有壓力地下單。</p>
        </div>
      </div>
    </div>
    <div class="center-btn-row">
      ${contact('加 LINE 預約試躺時段', '永和中正店試躺預約', 'btn btn-primary')}
    </div>
  </div>
</section>

<section class="section section-surface-stone" id="store">
  <div class="wrap store-grid">
    <div class="store-intro-col">
      <h2>永吉床墊 永和中正店</h2>
      <p>位於永和中正路核心地段，無論是想直接來躺躺，或還不確定從哪張床開始，都歡迎先與闆娘預約專屬時間。</p>
      <div style="margin-top:24px;">
        ${contact('預約到店時段', '永和中正店試躺確認', 'btn btn-primary')}
      </div>
    </div>
    <div class="store-dl-col">
      <dl class="store-dl">
        <div><dt>門市地址</dt><dd>新北市永和區中正路（詳細門牌依預約確認為準）</dd></div>
        <div><dt>營業時間</dt><dd>預約接待制（避免現場久候，享受專屬試躺時段）</dd></div>
        <div><dt>大眾交通</dt><dd>鄰近捷運頂溪站 / 永安市場站，步行或公車數分鐘即可抵達</dd></div>
        <div><dt>周邊停車</dt><dd>周邊設有多座收費與公有停車場，開車前往方便</dd></div>
        <div><dt>試躺建議</dt><dd>建議穿著舒適輕便衣物，預留 30 分鐘好好體驗</dd></div>
      </dl>
    </div>
  </div>
</section>

<section class="section section-surface-light" id="visit-faq">
  <div class="narrow">
    <h2>來店之前，先安心。</h2>
    ${faq([
      ['到店一定要先預約嗎？可以直接過去嗎？', '為了讓每位顧客享有安靜不被打擾的試躺時間，且確保闆娘在店為您解說，建議出發前透過 LINE 先確認時段。'],
      ['可以帶另一半或家人一起試躺嗎？', '非常歡迎！共睡一張床的伴侶最適合一起來測試翻身干擾；替長輩挑床也建議長輩親自來試躺最準確。'],
      ['試躺會有人一直盯著我強迫推銷嗎？', '請完全放心！永吉以「不急著賣你，先陪你選對」為原則。試躺過程會給您充分的私密時間感受，絕不強迫下單。']
    ])}
  </div>
</section>
${close()}`;

// P07 選床知識 (journal)
const articles = [
  {
    slug: 'first-visit',
    title: '第一次試躺，先感受什麼？',
    tag: '試躺筆記',
    lead: '不用急著判斷「這張床好不好」，先讓身體用習慣的睡姿說話。',
    sections: [
      ['用習慣的睡姿開始，不要只禮貌性仰躺', '平常側睡，就別只仰躺五秒鐘就起身。以最自然的姿勢躺下，閉上眼睛深呼吸，觀察肩膀腰臀是否放鬆。'],
      ['把比較條件盡量保持一致', '換一張床比較時，留意枕頭高度與睡姿是否相同，才能客觀比較不同床款的承托差異。'],
      ['翻身和起臥，也是試躺重點', '除了躺著，也試試翻身順不順暢、坐在床緣是否穩定。每天早上的起床動作，也是選床的重要關鍵。']
    ]
  },
  {
    slug: 'couples',
    title: '兩個人的床，怎麼一起選？',
    tag: '雙人選床',
    lead: '先讓兩個人的需求都被聽見，再找共同能接受的平衡點。',
    sections: [
      ['分開描述困擾，不替對方發言', '把兩人的睡姿、體重與容易被干擾的地方分開整理，理清各自最在意的重點。'],
      ['一起試躺，測試真實抗干擾效果', '到門市兩個人一起躺下，一人模擬翻身與上下床，測試獨立筒彈簧吸震表現。'],
      ['先確認房間尺寸與動線', '選床前先量好床架內徑與走道空間，帶著尺寸到店挑選最踏實。']
    ]
  },
  {
    slug: 'dimensions',
    title: '換床之前，先確認尺寸。',
    tag: '尺寸準備',
    lead: '量的常常不只是床墊本身，更包含放得下、搬得進與起臥順暢度。',
    sections: [
      ['量床架「內徑」而非外框', '許多床架有圍邊或內嵌造型，請測量床墊實際放進去的淨空間，避免買回家放不下。'],
      ['留意床墊加上床架的總高度', '合適的高度讓坐下時雙腳平踩地面、膝蓋自然彎曲，起床更輕鬆省力。'],
      ['記錄搬運路線的樓梯與電梯', '公寓樓梯轉角與電梯門寬，都是配送前需要核對的細節，由門市提前評估最安心。']
    ]
  },
  {
    slug: 'feel',
    title: '軟硬之外，還能怎麼比較？',
    tag: '睡感理解',
    lead: '「偏硬」或「偏軟」只是起點，真正好的床墊，在於承托與回彈的平衡。',
    sections: [
      ['留意腰部是否懸空或過度下陷', '好的支撐是在躺下時自然貼合腰椎曲度，既不下陷積累疲勞，也不懸空緊繃。'],
      ['翻身時是否省力順暢', '太軟的床翻身吃力，太硬的床翻身有衝擊感。恰到好處的回彈讓身體自然轉換睡姿。'],
      ['把感受帶回真實生活場景', '想想平常習慣的枕頭與睡姿，在門市放鬆體會，讓身體給出最準確的答案。']
    ]
  }
];

const journal = `
${intro('選床知識', '選床的事，<br>慢慢說清楚。', '從試躺技巧、尺寸準備到雙人睡眠平衡，把挑床時常遇到的困惑整理成清晰的筆記。', '選床知識', images.bannerJournal)}

<section class="section section-surface-light">
  <div class="wrap journal-columns">
    <article class="journal-lead-card">
      <a href="/journal/first-visit/" class="journal-lead-pic">
        ${pic('hero', '第一次試躺床墊情境示意', false)}
      </a>
      <div class="journal-lead-content">
        <span class="journal-category">試躺筆記</span>
        <h2><a href="/journal/first-visit/">第一次試躺，先感受什麼？</a></h2>
        <p>不用急著判斷「這張床好不好」，先讓比較的方法保持一致，從熟悉的睡姿開始，把模糊的舒服說得具體踏實。</p>
        ${link('/journal/first-visit/', '閱讀完整筆記 →', 'text-link-clean')}
      </div>
    </article>

    <div class="journal-small-list">
      ${articles.slice(1).map(a => `
        <article class="journal-small-item">
          <span class="journal-category">${a.tag}</span>
          <h3><a href="/journal/${a.slug}/">${a.title}</a></h3>
          <p>${a.lead}</p>
          ${link('/journal/' + a.slug + '/', '閱讀內文 →', 'text-link-clean')}
        </article>
      `).join('')}
    </div>
  </div>
</section>
${close()}`;

// P08 文章詳細 (articlePage)
function articlePage(a) {
  return `
${intro(a.title, a.title, a.lead, '選床知識 / ' + a.tag, images.bannerJournal)}

<section class="section section-surface-light">
  <article class="reading-clean narrow">
    <p class="article-lead-clean">${a.lead}</p>
    <div class="article-photo-box">
      ${pic(a.slug === 'couples' ? 'hands' : 'hero', '文章主題情境示意圖', false)}
    </div>
    ${a.sections.map(([h, p]) => `
      <section class="article-paragraph">
        <h2>${h}</h2>
        <p>${p}</p>
      </section>
    `).join('')}

    <div class="article-cta-box">
      <h3>帶著問題，到門市親自體會。</h3>
      <p>整理好睡眠需求，挑選兩到三款候選床墊，與闆娘預約一趟不被打擾的試躺體驗。</p>
      <div class="actions">
        ${link('/mattresses/', '瀏覽床墊系列', 'btn btn-primary')}
        ${link('/visit/', '預約到店試躺', 'btn btn-outline')}
      </div>
    </div>

    <div class="back-link">
      ${link('/journal/', '← 返回選床知識清單', 'text-link-clean')}
    </div>
  </article>
</section>
${close()}`;
}

// P09 常見問題與售後 (faqPage)
const faqPage = `
${intro('常見問題與售後', '先問清楚，<br>再放心決定。', '從挑選床墊、配送搬運到售後保障，把顧客在下訂前後最關心的事項整理清楚。', '常見問題與售後', images.bannerGuide)}

<section class="section section-surface-light">
  <div class="narrow">
    <h2>挑選與試躺常見問題</h2>
    ${faq()}
  </div>
</section>

<section class="section section-surface-warm">
  <div class="narrow">
    <h2>配送、舊床與售後保固</h2>
    ${faq([
      [
        '配送前需要先提供哪些現場條件？',
        '請告知配送地址的區域、巷弄路寬、樓層（是否有電梯）。若為樓梯公寓，請確認樓梯轉角是否有充裕搬運空間，由門市為您安排合適的搬運人車。'
      ],
      [
        '門市是否有提供舊床回收服務？',
        '配送新床時，我們能協助將同尺寸舊床墊搬運至一樓（請預先向當地環保局清潔隊登記大型清運）。若有特殊清運需求，請於訂購時向門市確認。'
      ],
      [
        '永吉床墊的保固範圍與條件如何計算？',
        '我們提供結構性彈簧保固。正常使用情況下若出現結構性異常，皆享有維修處理。詳細年限與規範將在購買時附上保證說明。'
      ],
      [
        '門市支援哪些付款方式？',
        '門市支援現金、匯款及常見多元支付。訂購時支付定金，尾款於貨到交付時結清。'
      ]
    ])}
  </div>
</section>
${close()}`;

// P10 隱私權政策 (privacy)
const privacy = `
${intro('隱私權說明', '隱私權說明', '本頁說明目前永吉床墊網站設計預覽之資料處理方式；正式網站上線前，將依實際營運實體與使用工具更新。', '隱私權說明', images.bannerJournal)}

<section class="section section-surface-light">
  <article class="reading-clean narrow">
    <h2>1. 網站資料保護原則</h2>
    <p>永吉床墊重視您的隱私權。目前的展示預覽版本並未設置主動收集個人資料的表單，亦未串接外部商業廣告追蹤程式。</p>

    <h2>2. 諮詢對話框處理</h2>
    <p>網站上之諮詢視窗僅在您的瀏覽器端供您預先編輯文字。點擊複製僅會寫入您個人裝置的剪貼簿，本站不會側錄或儲存您填寫的內容。</p>

    <h2>3. 第三方資源與網路連線</h2>
    <p>為呈現良好的排版與影像，本站載入 Google Fonts 與原概念圖床。在資源請求過程中，第三方伺服器可能會記錄您的 IP 位址與基本瀏覽器請求資訊。</p>

    <h2>4. 官方通訊與預約權益</h2>
    <p>本站之 LINE 或電話點擊係引導至第三方通訊軟體。點擊連結不代表預約已自動成立，所有預約時段皆需經門市人員在對話中雙向確認後生效。</p>
  </article>
</section>`;

// 所有 15 個頁面
const pages = [
  ['/', '闆娘幫你選床', home],
  ['/guide/', '闆娘幫你選床指南', guide],
  ['/mattresses/', '床墊一覽', mattresses],
  ...products.map(p => ['/mattresses/' + p.slug + '/', p.name + '床墊', productPage(p)]),
  ['/owner/', '認識闆娘', owner],
  ['/visit/', '門市與試躺', visit],
  ['/journal/', '選床知識', journal],
  ...articles.map(a => ['/journal/' + a.slug + '/', a.title, articlePage(a)]),
  ['/faq/', '常見問題與售後', faqPage],
  ['/privacy/', '隱私權說明', privacy]
];

for (const [url, title, body] of pages) {
  const dir = path.join('dist', url);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), shell(title, body, url));
}

fs.writeFileSync('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
fs.writeFileSync('dist/content.json', JSON.stringify({
  products,
  articles,
  brand: {
    name: '永吉床墊',
    tagline: '買床不用懂，問闆娘就對',
    store: '永和中正店'
  },
  contact: {
    line: null,
    phone: null,
    address: '新北市永和區中正路',
    hours: '預約接待制'
  },
  preview: true
}, null, 2));

console.log('Successfully built ' + pages.length + ' pages with honest bedding aesthetic.');
