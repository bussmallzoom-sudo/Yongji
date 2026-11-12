/**
 * 永吉床墊網站 - 首頁核心模板
 * 嚴格遵循《永吉床墊網站架構與設計討論稿 V2》與 design-taste-frontend (Anti-Slop) 規範：
 * - Design Read: Consumer furniture & mattress showroom for local home buyers, calm Japanese/Nordic editorial language
 * - Dials: DESIGN_VARIANCE: 7, MOTION_INTENSITY: 4, VISUAL_DENSITY: 3
 * - 徹底移除所有 AI 膠囊標籤 (Pill Badges)、色條邊框卡片、浮動遮罩盒與編號步驟框
 */
export function makeHome({ images, pic, link, contact, faq, faqItems }) {
  const productsList = [
    {
      slug: 'miro',
      image: 'miro',
      name: '米羅',
      feel: '適中偏彈性',
      target: '多數成人、仰睡與側睡混合',
      feature: '仰睡自然貼背、側睡不壓迫肩膀，是多數家庭最容易適應的均衡支撐款。'
    },
    {
      slug: 'venus',
      image: 'venus',
      name: '維納斯',
      feel: '偏軟釋壓',
      target: '習慣側睡、偏好溫柔包覆感',
      feature: '表層柔潤服貼，能溫柔接住肩頸與臀部壓力，翻身依然輕巧不費力。'
    },
    {
      slug: 'sleep-spirit',
      image: 'spirit',
      name: '睡精靈',
      feel: '偏硬扎實',
      target: '長輩護脊、習慣硬挺支撐者',
      feature: '核心高碳鋼支撐力強韌，坐臥床緣穩定、起床腰部踏實不酸沉。'
    }
  ];

  return `
<!-- 1. 品牌主張與真實影像 (brand) - 非對稱雙欄建築感首屏 (5:7 Split Hero) -->
<section class="hero-clean" data-home-section="brand" aria-labelledby="hero-title">
  <div class="wrap hero-split-grid">
    <div class="hero-text">
      <p class="hero-pretitle">永吉床墊 · 永和中正店</p>
      <h1 id="hero-title">買床不用先做功課，<br>問闆娘就好。</h1>
      <p class="hero-desc">不急著賣你，先陪你選對。把現在睡不習慣的地方說出來，我們一起找到能讓你好好睡覺的那張床。</p>
      <div class="hero-btns">
        ${link('/guide/', '闆娘幫你選床', 'btn btn-primary')}
        ${link('/visit/', '預約門市試躺', 'btn btn-outline-hero')}
      </div>
    </div>
    <div class="hero-media-col">
      <div class="hero-image-wrap">
        <img src="${images.hero}" alt="溫暖採光臥室情境" width="1800" height="1200" fetchpriority="high">
      </div>
      <p class="image-note">原站 AI 情境示意，非商品實拍</p>
    </div>
  </div>
</section>

<!-- 2. 三個需求入口 (entrances) - 非對稱左標右列雜誌索引 (4:8 Editorial Index) -->
<section class="entrances-clean section-surface-light" data-home-section="entrances" aria-label="從你的需求開始">
  <div class="wrap entrances-editorial-grid">
    <div class="entrances-header">
      <h2 class="entrances-main-title">今天想從哪一步<br>開始認識我們？</h2>
      <p class="entrances-lead">不必一次讀完所有資料，挑一個最貼近你現在狀態的入口。</p>
    </div>
    <div class="entrances-list">
      <a href="/guide/" class="entrance-row-item">
        <div class="entrance-row-main">
          <span class="entrance-row-kicker">完全不知道怎麼挑？</span>
          <h3>闆娘幫你選床</h3>
          <p>從現在這張床睡起來哪裡不習慣開始聊，幫你理出清楚的方向。</p>
        </div>
        <span class="entrance-go">看挑選重點 →</span>
      </a>
      
      <a href="/mattresses/" class="entrance-row-item">
        <div class="entrance-row-main">
          <span class="entrance-row-kicker">想先看有哪些床款？</span>
          <h3>看看床墊系列</h3>
          <p>精選米羅、維納斯與睡精靈三種基準睡感，先認識再比較。</p>
        </div>
        <span class="entrance-go">瀏覽床墊款式 →</span>
      </a>

      <a href="/visit/" class="entrance-row-item">
        <div class="entrance-row-main">
          <span class="entrance-row-kicker">想直接用身體感受？</span>
          <h3>來門市躺躺看</h3>
          <p>永和中正店安靜試躺，以平常習慣的睡姿放鬆躺足時間。</p>
        </div>
        <span class="entrance-go">門市與交通資訊 →</span>
      </a>
    </div>
  </div>
</section>

<!-- 3. 闆娘怎麼協助選床 (method) - 溫潤石灰岩色區・無框線性流程 -->
<section class="method-clean section section-surface-stone" data-home-section="method" aria-labelledby="method-title">
  <div class="wrap method-grid">
    <div class="method-figure">
      ${pic('hands', '諮詢與觸摸材質情境圖')}
    </div>
    <div class="method-copy">
      <h2 id="method-title">不必先懂名詞，<br>先跟我們聊聊生活。</h2>
      <p class="method-intro">挑床看了太多專有名詞，反而越看越混亂。永吉的做法很簡單，把焦點放回你每天起床的真實感受，其他的交給我們。</p>
      
      <div class="method-steps-list">
        <div class="method-step">
          <h3>聊聊現在的睡眠感受</h3>
          <p>現在睡得哪裡不滿意？腰酸、太熱，還是兩個人翻身容易互相干擾？</p>
        </div>

        <div class="method-step">
          <h3>縮小到兩三張合適床款</h3>
          <p>依睡姿、身型與預算，闆娘幫你挑出最值得親自躺躺看的款式。</p>
        </div>

        <div class="method-step">
          <h3>在永和門市安心試躺</h3>
          <p>慢慢躺足時間，沒有店員緊迫盯人，身體覺得真正放鬆了再考慮。</p>
        </div>
      </div>

      <div class="method-links">
        ${link('/owner/', '認識闆娘的選床想法', 'btn btn-dark')}
        ${contact('和闆娘線上聊聊', '', 'btn btn-outline')}
      </div>
    </div>
  </div>
</section>

<!-- 4. 精選款式與差異 (products) - 純淨暖白展間畫廊 (無卡片外框・家具目錄排版) -->
<section class="products-clean section section-surface-light" data-home-section="products" aria-labelledby="products-title">
  <div class="wrap">
    <div class="section-header-stack">
      <h2 id="products-title">先看這三款，不用一次看幾十張。</h2>
      <p class="section-lead">每個人適合的軟硬不同，我們先挑出三種最具代表性的基準睡感。${link('/mattresses/#compare', '查看三款規格橫向比較表 →', 'text-link-clean')}</p>
    </div>

    <div class="products-cards">
      ${productsList.map(item => `
        <article class="clean-product-card">
          <a href="/mattresses/${item.slug}/" class="card-image-link" aria-label="查看${item.name}床墊細節">
            ${pic(item.image, item.name + '床墊情境示意', false)}
          </a>
          <div class="card-text">
            <div class="card-head">
              <h3><a href="/mattresses/${item.slug}/">${item.name}</a></h3>
              <span class="feel-label">${item.feel}</span>
            </div>
            <p class="card-target">${item.target}</p>
            <p class="card-desc">${item.feature}</p>
            <div class="card-foot">
              ${link('/mattresses/' + item.slug + '/', '了解這款床墊 →', 'link-arrow')}
            </div>
          </div>
        </article>
      `).join('')}
    </div>
    
    <p class="catalog-footnote">※ 圖片為原站 AI 情境示意，非門市實品實拍。材質厚度、花色與售價請以門市確認為準。</p>
  </div>
</section>

<!-- 5. 真實服務案例 (cases) - 暖沙亞麻色區・雜誌引言雙欄 (無外框卡片) -->
<section class="cases-clean section section-surface-warm" data-home-section="cases" aria-labelledby="cases-title">
  <div class="wrap">
    <div class="cases-header">
      <h2 id="cases-title">每一種睡眠困擾，<br>都有被好好聽見的經驗。</h2>
      <p class="cases-lead">每位走進永吉門市的朋友，困擾都不盡相同。這是我們日常陪伴選床的真實紀錄：</p>
    </div>

    <div class="cases-columns">
      <blockquote class="case-quote-block">
        <p class="case-quote-context">雙人同睡 · 先生習慣側睡、太太淺眠怕翻身</p>
        <p class="case-quote-body">「以前先生半夜翻個身我就會醒。闆娘讓我們兩個人一起躺，一人模擬翻身、一人放鬆感受，選到吸震好的獨立筒，現在半夜真的安心多了。」</p>
        <footer class="case-author">永和 許先生與許太太 · 門市試躺選購</footer>
      </blockquote>

      <blockquote class="case-quote-block">
        <p class="case-quote-context">替長輩挑床 · 不能太軟、起床又不能壓迫關節</p>
        <p class="case-quote-body">「原本以為長輩只能睡傳統木板加薄墊，闆娘幫忙考量床墊支撐力與床架高度，讓爸媽下床腳踏實地、腰部有支撐，老人家直說起床腰不酸了。」</p>
        <footer class="case-author">中和 林小姐替長輩挑選 · 門市試躺選購</footer>
      </blockquote>
    </div>

    <div class="cases-statement">
      <p>本專區案例均基於門市真實服務經驗，為保護顧客隱私，見證經同意後整理刊登。${link('/owner/', '看闆娘的服務方式 →', 'text-link-clean')}</p>
    </div>
  </div>
</section>

<!-- 6. 試躺流程及門市 (visit) - 沉穩石灰岩色區・圖右文左對比 -->
<section class="visit-clean section section-surface-stone" data-home-section="visit" aria-labelledby="visit-title">
  <div class="wrap visit-box-layout">
    <div class="visit-details">
      <h2 id="visit-title">照片看外觀，<br>好不好睡，留給身體回答。</h2>
      <p class="visit-intro">網路評價看再多，都不如自己躺下來放鬆十分鐘。永吉永和中正店提供安靜自在的空間，零推銷壓力。</p>
      
      <div class="visit-points-grid">
        <div class="visit-point-item">
          <strong>先確認展示與時段</strong>
          <p>出發前先確認想比較的床款是否在店，為您留足專屬試躺時間。</p>
        </div>

        <div class="visit-point-item">
          <strong>用平時的睡姿躺足 30 分鐘</strong>
          <p>在零壓力環境下，用習慣的睡姿細細感受肩、腰、臀的支撐。</p>
        </div>

        <div class="visit-point-item">
          <strong>把疑惑問清楚再決定</strong>
          <p>尺寸、搬運、舊床處理全數確認清楚再帶回，絕不強迫下單。</p>
        </div>
      </div>

      <div class="visit-cta-row">
        ${link('/visit/', '門市與試躺說明', 'btn btn-primary')}
        ${contact('預約試躺時段', '', 'btn btn-outline')}
      </div>
    </div>
    <div class="visit-visual">
      ${pic('store', '永和中正店體驗環境氛圍')}
    </div>
  </div>
</section>

<!-- 7. 常見問題 (faq) - 純淨暖白色區・極簡細線問答 -->
<section class="faq-clean section section-surface-light" data-home-section="faq" aria-labelledby="faq-title">
  <div class="wrap faq-layout">
    <div class="faq-intro-col">
      <h2 id="faq-title">到店試躺前，<br>大家最常問的事。</h2>
      <p>挑選床墊是一筆長久投資，有任何疑問都很正常。</p>
      <div class="faq-more-link">
        ${link('/faq/', '查看完整常見問題 →', 'text-link-clean')}
      </div>
    </div>
    <div class="faq-items-col">
      ${faq([faqItems[0], faqItems[2], faqItems[3]])}
    </div>
  </div>
</section>

<!-- 8. 最後詢問與預約入口 (contact) - 深林墨綠色沉穩收尾 -->
<section class="contact-footer-clean" data-home-section="contact" aria-labelledby="contact-title">
  <div class="wrap contact-footer-inner">
    <div class="contact-footer-text">
      <h2 id="contact-title">睡個好覺，從一場真誠的對話開始。</h2>
      <p>現在這張床睡起來哪裡不習慣？把你的感受告訴闆娘，我們一起找到合適的方向。</p>
    </div>
    <div class="contact-footer-actions">
      ${contact('LINE 問闆娘', '', 'btn btn-light-solid btn-large')}
      ${link('/visit/', '預約門市試躺', 'btn btn-ghost btn-large')}
    </div>
  </div>
</section>
`;
}
