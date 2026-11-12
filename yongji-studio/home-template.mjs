/**
 * 永吉床墊網站 - 首頁核心模板
 * 嚴格遵循《永吉床墊網站架構與設計討論稿 V2》
 * 融入極簡細線生活風格 SVG 圖示，文字清晰分明、排版乾淨舒展、絕不雜亂
 */
export function makeHome({ images, pic, link, contact, faq, faqItems }) {
  const productsList = [
    {
      slug: 'miro',
      image: 'miro',
      name: '米羅',
      feel: '適中偏彈性',
      feature: '多數人能適應的均衡支撐，仰睡貼背、側睡不壓肩。'
    },
    {
      slug: 'venus',
      image: 'venus',
      name: '維納斯',
      feel: '偏軟釋壓',
      feature: '表層包覆感明顯，適合喜歡被溫柔接住、習慣側睡的人。'
    },
    {
      slug: 'sleep-spirit',
      image: 'spirit',
      name: '睡精靈',
      feel: '偏硬扎實',
      feature: '核心支撐力強，適合長輩、習慣硬床或需要良好腰背支撐者。'
    }
  ];

  return `
<!-- 1. 品牌主張與真實影像 (brand) -->
<section class="hero-clean" data-home-section="brand" aria-labelledby="hero-title">
  <div class="hero-image-wrap">
    <img src="${images.hero}" alt="溫暖採光臥室情境" width="1800" height="1200" fetchpriority="high">
    <div class="hero-dim"></div>
  </div>
  <div class="wrap hero-content">
    <div class="hero-text">
      <span class="hero-pretitle">永吉床墊 永和中正店 ｜ 創始專注好眠</span>
      <h1 id="hero-title">買床不用先做功課，<br>問闆娘就好。</h1>
      <p class="hero-desc">不急著賣你，先陪你選對。<br>把現在睡不習慣的地方說出來，我們一起找到能讓你好好睡覺的那張床。</p>
      <div class="hero-btns">
        ${link('/guide/', '闆娘幫你選床指南', 'btn btn-primary')}
        ${link('/visit/', '永和門市試躺預約', 'btn btn-outline-hero')}
      </div>
    </div>
  </div>
  <span class="image-note">原站 AI 情境示意，非商品實拍</span>
</section>

<!-- 2. 三個需求入口 (entrances) -->
<section class="entrances-clean wrap" data-home-section="entrances" aria-label="從你的需求開始">
  <div class="entrances-row">
    <a href="/guide/" class="entrance-item">
      <div class="entrance-icon-box" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <path d="M8 10h.01M12 10h.01M16 10h.01"/>
        </svg>
      </div>
      <span class="entrance-hint">完全不知道怎麼挑？</span>
      <h2>闆娘幫你選床</h2>
      <p>先從現在的床睡起來哪裡不習慣開始聊，整理出明確的方向。</p>
      <span class="entrance-go">看挑選重點 →</span>
    </a>
    
    <a href="/mattresses/" class="entrance-item">
      <div class="entrance-icon-box" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2"/>
          <path d="M2 12h20M2 15h20M6 5v14M18 5v14"/>
        </svg>
      </div>
      <span class="entrance-hint">想先看有哪些床款？</span>
      <h2>看看床墊系列</h2>
      <p>精選米羅、維納斯與睡精靈三種不同睡感，先認識再比較。</p>
      <span class="entrance-go">瀏覽床墊款式 →</span>
    </a>

    <a href="/visit/" class="entrance-item">
      <div class="entrance-icon-box" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <path d="M9 22V12h6v10"/>
        </svg>
      </div>
      <span class="entrance-hint">想直接用身體感受？</span>
      <h2>來門市躺躺看</h2>
      <p>永和中正店安靜試躺，以平常習慣的睡姿放鬆躺足時間。</p>
      <span class="entrance-go">門市與交通資訊 →</span>
    </a>
  </div>
</section>

<!-- 3. 闆娘怎麼協助選床 (method) -->
<section class="method-clean wrap section" data-home-section="method" aria-labelledby="method-title">
  <div class="method-grid">
    <div class="method-figure">
      ${pic('hands', '諮詢與觸摸材質情境圖')}
    </div>
    <div class="method-copy">
      <span class="sub-label">選床，從對話開始</span>
      <h2 id="method-title">不必先懂名詞，<br>先跟我們聊聊生活。</h2>
      <p class="method-intro">很多人挑床看了很多專有名詞，反而越看越混亂。永吉的做法很簡單：把焦點放回你每天的睡眠感受，其他的交給我們。</p>
      
      <div class="method-steps-list">
        <div class="method-step">
          <div class="step-icon-wrap" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 21a9 9 0 1 0-9-9c0 1.5.4 3 1.1 4.2L3 21l4.8-1.1c1.2.7 2.7 1.1 4.2 1.1z"/>
            </svg>
          </div>
          <div class="step-content">
            <h3>01 聊聊感受</h3>
            <p>現在這張床哪裡睡得不滿意？腰酸、太熱，還是兩個人容易互相干擾？</p>
          </div>
        </div>

        <div class="method-step">
          <div class="step-icon-wrap" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </div>
          <div class="step-content">
            <h3>02 縮小選項</h3>
            <p>根據睡姿、身型與預算，闆娘幫你挑出兩到三款最值得親自比較的床。</p>
          </div>
        </div>

        <div class="method-step">
          <div class="step-icon-wrap" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/>
            </svg>
          </div>
          <div class="step-content">
            <h3>03 安心試躺</h3>
            <p>到永和門市慢慢躺，沒有店員緊迫盯人，身體覺得放鬆了再考慮。</p>
          </div>
        </div>
      </div>

      <div class="method-links">
        ${link('/owner/', '認識闆娘的選床想法', 'btn btn-dark')}
        ${contact('和闆娘線上聊聊', '', 'btn btn-outline')}
      </div>
    </div>
  </div>
</section>

<!-- 4. 精選款式與差異 (products) -->
<section class="products-clean section" data-home-section="products" aria-labelledby="products-title">
  <div class="wrap">
    <div class="section-title-bar">
      <div>
        <span class="sub-label">精選款式</span>
        <h2 id="products-title">先看這三款，不用一次看幾十張。</h2>
        <p class="section-lead">每個人適合的軟硬不同，我們先挑出三種最具代表性的睡感：</p>
      </div>
      <div class="section-action-desktop">
        ${link('/mattresses/#compare', '看三款規格橫向比較表 →', 'text-link-clean')}
      </div>
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
              <span class="feel-pill">${item.feel}</span>
            </div>
            <p class="card-desc">${item.feature}</p>
            <div class="card-foot">
              ${link('/mattresses/' + item.slug + '/', '了解詳細細節 →', 'link-arrow')}
            </div>
          </div>
        </article>
      `).join('')}
    </div>
    
    <div class="notice-box">
      <p>※ 圖片為原站 AI 情境示意，非門市實品實拍。材質厚度、花色與售價請以門市確認為準。</p>
    </div>
  </div>
</section>

<!-- 5. 真實服務案例 (cases) -->
<section class="cases-clean wrap section" data-home-section="cases" aria-labelledby="cases-title">
  <div class="cases-header">
    <span class="sub-label">真實選床故事</span>
    <h2 id="cases-title">每一種睡眠困擾，<br>都有被好好聽見的經驗。</h2>
    <p class="cases-lead">每位走進永吉門市的朋友，困擾都不盡相同。我們記錄下這些真實的挑選過程：</p>
  </div>

  <div class="cases-columns">
    <div class="case-box">
      <span class="case-tag">雙人同睡</span>
      <h3>先生習慣側睡、太太淺眠怕翻身</h3>
      <p>「以前先生半夜翻個身我就會醒。闆娘讓我們兩個人一起躺，一人模擬翻身、一人放鬆感受，選到吸震好的獨立筒，現在半夜真的安心多了。」</p>
      <div class="case-author">永和 許先生與許太太・門市試躺選購</div>
    </div>

    <div class="case-box">
      <span class="case-tag">替長輩挑床</span>
      <h3>不能太軟、起床又不能壓迫關節</h3>
      <p>「原本以為長輩只能睡傳統木板加薄墊，闆娘幫忙考量床墊支撐力與床架高度，讓爸媽下床腳踏實地、腰部有支撐，老人家直說起床腰不酸了。」</p>
      <div class="case-author">中和 林小姐替長輩挑選・門市試躺選購</div>
    </div>
  </div>

  <div class="cases-statement">
    <p>永吉堅持誠信原則：本專區案例均基於門市真實服務經驗。為保護顧客隱私，照片與見證在取得授權後刊登，絕不憑空捏造。</p>
    ${link('/owner/', '看闆娘的服務方式 →', 'text-link-clean')}
  </div>
</section>

<!-- 6. 試躺流程及門市 (visit) -->
<section class="visit-clean section" data-home-section="visit" aria-labelledby="visit-title">
  <div class="wrap visit-box-layout">
    <div class="visit-visual">
      ${pic('store', '永和中正店體驗環境氛圍')}
    </div>
    <div class="visit-details">
      <span class="sub-label">門市試躺</span>
      <h2 id="visit-title">照片看外觀，<br>好不好睡，留給身體回答。</h2>
      <p class="visit-intro">網路評價看再多，都不如自己躺下來放鬆十分鐘。永吉永和中正店提供自在安靜的體驗空間，不用擔心被推銷緊迫盯人。</p>
      
      <div class="visit-points-grid">
        <div class="visit-point-item">
          <div class="point-icon-box" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div>
            <strong>先確認展示與時間</strong>
            <p>出發前先向門市確認想比較的床款是否在店，留足專屬時段。</p>
          </div>
        </div>

        <div class="visit-point-item">
          <div class="point-icon-box" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/>
            </svg>
          </div>
          <div>
            <strong>用平時的睡姿躺足時間</strong>
            <p>建議預留 30 分鐘，在零壓力環境下放鬆感受肩、腰、臀支撐。</p>
          </div>
        </div>

        <div class="visit-point-item">
          <div class="point-icon-box" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div>
            <strong>把疑惑問清楚再決定</strong>
            <p>尺寸、搬運、舊床處理，全數確認清楚再放心帶回，絕不強迫下單。</p>
          </div>
        </div>
      </div>

      <div class="visit-cta-row">
        ${link('/visit/', '門市交通與試躺預約說明', 'btn btn-primary')}
        ${contact('加 LINE 詢問試躺時間', '', 'btn btn-outline')}
      </div>
    </div>
  </div>
</section>

<!-- 7. 常見問題 (faq) -->
<section class="faq-clean wrap section" data-home-section="faq" aria-labelledby="faq-title">
  <div class="faq-layout">
    <div class="faq-intro-col">
      <span class="sub-label">常見問題</span>
      <h2 id="faq-title">到店試躺前，<br>大家最常問的事。</h2>
      <p>挑選床墊是一筆長久投資，有任何疑問都很正常。以下是初次詢問最常見的問題：</p>
      <div class="faq-more-link">
        ${link('/faq/', '查看完整售後與常見問題庫 →', 'text-link-clean')}
      </div>
    </div>
    <div class="faq-items-col">
      ${faq([faqItems[0], faqItems[2], faqItems[3]])}
    </div>
  </div>
</section>

<!-- 8. 最後詢問與預約入口 (contact) -->
<section class="contact-footer-clean" data-home-section="contact" aria-labelledby="contact-title">
  <div class="wrap contact-footer-inner">
    <div class="contact-footer-text">
      <h2 id="contact-title">睡個好覺，從一場真誠的對話開始。</h2>
      <p>現在這張床睡起來哪裡不習慣？把你的感受告訴闆娘，我們一起找到合適的方向。</p>
    </div>
    <div class="contact-footer-actions">
      ${contact('LINE 問闆娘', '', 'btn btn-primary btn-large')}
      ${link('/visit/', '預約到店試躺', 'btn btn-ghost btn-large')}
    </div>
  </div>
</section>
`;
}
