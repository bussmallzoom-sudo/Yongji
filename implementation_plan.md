# 永吉床墊網站極簡圖示與排版清晰化計畫

依據使用者要求「加上 icon 圖示，美化整體網站，但文字必須清楚、不要雜亂」，進行洗練優化。

## 1. 圖示設計原則（日系家具生活品牌美學）
- **極簡細線（1.5px Stroke Line Icons）**：無多餘填色、無刺眼色彩，採用深墨綠（#1E3327）與溫潤陶土色（#8A755D）。
- **嚴格克制數量**：只在「三大入口」、「選床三步驟」、「門市試躺三大保障」與「主要按鈕」配置關鍵圖示，不造成視覺負擔。
- **文字絕對優先（Readability First）**：
  - 提高文字與背景對比度（主標 #19211C，內文 #4F5B53）。
  - 段落文字精簡精煉，每段不超過兩到三行。
  - 行距維持 1.85，字距 0.02em ~ 0.04em，排版清爽、一目了然。

## 2. 涉及檔案
- `yongji-studio/home-template.mjs`：首頁三大入口、選床三步驟、門市亮點注入清晰細線 SVG 圖示。
- `yongji-studio/build.mjs`：按鈕與門市頁面清晰圖示增強。
- `yongji-studio/dist/site.css`：圖示容器排版、文字清晰度、字重與留白調整。

---

## 3. 整合 Anti-Slop `taste-skill` 視覺全面昇級

### A. 設計維度調校 (Three Dials)
- `DESIGN_VARIANCE: 7`：擺脫死板居中網格，運用雜誌式排版、留白呼吸感與非對稱視覺平衡。
- `MOTION_INTENSITY: 4`：微互動觸覺回饋（`:hover` 輕微浮雕上升、`:active` 物理下沉反饋 `scale(0.985)`）。
- `VISUAL_DENSITY: 3`：大氣寬鬆空間，主標與內文嚴格維持 WCAG AAA / AA 高清晰度。

### B. 高級光影與材質系統 (Materiality & Tinted Elevation)
- **環境光暖灰陰影（Tinted Elevation）**：杜絕死黑陰影，改用環境綠灰調微陰影（`--shadow-card`, `--shadow-card-hover`）。
- **圓角一致性鎖定（Shape Consistency Lock）**：卡片統一 12px，互動按鈕與圖示盒統一 6px。
- **頂部導覽列升級**：高度鎖定 74px，精緻毛玻璃 `backdrop-filter: blur(16px)` 與淡雅底線。
- **產品卡片精緻化**：統一 4:3 比例，圖片微縮放搭配箭頭微位移，營造日系獨立選物店的品味體驗。

---

## 4. 全站各分頁專屬情境 Banner 升級 (Anti-Monotony Upgrade)

為徹底解決使用者反映的「分頁純白字體太單調」問題，全面重構 `.page-intro-clean` 版型：
- **日系生活誌 Editorial 雙欄佈局**：
  - 左側：麵包屑導航、精緻眉標（`intro-eyebrow`）、大氣主標題與深度導言。
  - 右側：16:10 專屬情境 Banner 卡片，具備多層次環境光暖灰陰影、細緻圓角與情境標籤。
- **5 大主題專屬 Banner 圖片**：
  1. `banner-guide.jpg`（闆娘幫你選床指南）：日系木質桌、布料色卡與茶席溫暖傾聽氛圍。
  2. `banner-mattresses.jpg`（床墊一覽）：極簡大氣採光臥室與低矮實木床架空間。
  3. `banner-owner.jpg`（認識闆娘）：匠人選品工作室、天然乳膠羊毛材料切片工藝。
  4. `banner-journal.jpg`（選床知識生活誌）：早晨陽光、晨間讀物與安穩深層好眠日常。
  5. `banner-visit.jpg`（門市與試躺）：明亮無壓迫感的永和日式精品床墊體驗間。
- **商品頁專屬對齊**：米羅、維納斯、睡精靈單品頁自動調用專屬情境大圖，全站徹底告別死寂空白。

---

## 5. 全站各頁面與區塊背景色彩層次校準 (Tone & Layering Alignment)

- **頂部 Banner（`page-intro-clean`）**：恢復原本雅緻溫暖的米砂暖燕麥底色（`--bg-soft: #f4efe9`）搭配細微紙質顆粒與淡雅底線，維持沉穩有溫度的獨立品牌氛圍。
- **下方內容區塊（如「永吉選床理念 / 不急著賣你，先陪你選對」）**：全面改為**純白色（`#ffffff`）**，與其它分頁的白底內容區域保持高度一致，使文字與大尺寸情境圖片更具焦點與呼吸感。
- **無縫純淨視覺**：全站維持「上方米砂溫潤 Banner ＋ 下方純白大氣內容」的統一節奏，徹底告別色塊混亂。

---

## 6. 第二層選單相接縫隙修復與深綠高對比升級 (Subnav Seamless Pinning)

- **主導覽列固定高度**：在 `:root` 定義 `--header-h: 72px`（手機端 70px），滾動時 `.site-header.scrolled` 保持高度完全一致，徹底根除原先由 74px 變為 66px 導致的 8px 空隙。
- **第二層選單（`.subnav`）零縫隙相接**：設定 `top: var(--header-h)`，在任何滾動位置皆與上方導覽列 100% 緊密貼合。
- **深綠高對比背景**：將第二層選單改為品牌經典**沉穩深松墨綠色（`var(--color-pine)`）**，文字設為高對比純白字體（`#ffffff`）搭配微白底線，滾動經過任何淺色、圖片內容時均清晰分明，不再透光或模糊。
- **錨點滾動保護**：將全站 `scroll-padding-top` 調整為 `140px`，確保點擊各項子分類跳轉時不被雙層選單遮蔽。

---

## 7. 手機版響應式排版全面優化 (Mobile Editorial Layout Overhaul)

針對使用者於手機瀏覽（`https://bussmallzoom-sudo.github.io/Yongji/`）截圖回饋之排版問題進行系統性重構：
- **解決大標題「課，」孤字斷行**：將 `.hero-clean h1` 在手機端字級精準調校為 `clamp(26px, 7vw, 32px)`，確保「買床不用先做功課，」完整一行、「問闆娘就好。」完整一行，視覺節奏俐落大氣。
- **首屏改為「上文下景」雜誌式垂直排版**：
  - 電腦版維持左右雙欄全景背景；手機版將文字區置於上方純淨米砂暖底（`--bg-soft`），徹底解決文字壓在窗框家具上的雜亂感。
  - 下方獨立呈現 `16:10` 圓角實景臥室大圖（`width: 91%`），完整展示溫暖陽光臥室與雙人木床，不再只切到畫面最右邊的半張椅子，且「原站 AI 情境示意」標籤安穩收於圖片右下角，絕不與按鈕重疊。
- **雙按鈕精緻並排與底部常駐列輕量化**：
  - 將首屏與各區塊的兩個行動按鈕在手機端改為 `grid-template-columns: 1fr 1fr; gap: 10px;` 左右並排（高度 44px），消除原本四塊全寬巨型按鈕塞滿手機下半部畫面的擁擠感。
  - 底部 `.mobile-bar` 升級為 52px 毛玻璃輕巧底欄。
- **全站內頁與配圖比例黃金化**：將原本在手機上固定高達 `440px~480px` 的 `.method-figure`、`.visit-visual`、`.editorial-photo`、`.store-banner` 統一改為 `height: auto; aspect-ratio: 16 / 10;`，並精煉各區塊內距與卡片留白，讓手機滑動閱讀如翻閱日系生活誌般流暢舒適。

---

## 8. 嚴格執行 `design-taste-frontend` (Anti-Slop) 建築感家具展間重構

- **Design Read**: *"Reading this as: consumer furniture & mattress showroom for local home buyers, with a calm Japanese/Nordic architectural editorial language (Muji / Frama / Carl Hansen), leaning toward native CSS asymmetric grids + natural limestone/travertine surfaces + hairline dividers."*
- **Three Dials**: `DESIGN_VARIANCE: 7` | `MOTION_INTENSITY: 4` | `VISUAL_DENSITY: 3`
- **徹底剷除 AI 模板特徵 (Section 4.7 & Section 9 AI Tells)**：
  1. **零膠囊標籤 (Zero Pill Badges)**：全站刪除所有 `border-radius: 999px` 的灰底/綠底膠囊小標（`.sub-label`、`.feel-pill`），遵循 `EYEBROW RESTRAINT` 規則，直接以大標題說話。
  2. **首屏改為 `Asymmetric Split Hero`（5:7 左文右景）**：拿掉壓在照片上的圓角浮動框與左側粗綠線；左側為乾淨俐落的文字排版，右側為完整無遮擋的陽光臥室攝影，圖說安靜置於圖片下方（遵循 `NO pills/labels overlaid on images`）。
  3. **廢除薄荷綠與三等分白盒卡片**：移除廉價粉綠（`#dfe9e2`）與「白卡片＋頂部/左側粗色條」的 SaaS 模板感，改為北歐與日系家具展間的**三階礦物石材色盤**：
     - 暖調雪花石膏（`#f6f3ec` Soft Alabaster）
     - 溫潤亞麻石灰岩（`#ebe5da` Warm Limestone）
     - 沉穩洞石大地色（`#dfd7c9` Deep Travertine Stone）
     - 深林松木墨綠（`#17251c` Deep Forest Anchor）
  4. **首頁 8 大區塊採用 6 種不同雜誌版型（遵循 `Section-Layout-Repetition Ban` 與 `Cards omitted in favor of spacing/hairlines`）**：
     - `brand`：5:7 非對稱雙欄建築感首屏
     - `entrances`：4:8 左標固定、右側橫向 `1px` 結構細線索引列（取代三張白卡片）
     - `method`：5:7 左側直幅影像、右側三欄無框水平線性流程（移除 `01/02/03` 編號方框）
     - `products`：無外框家具畫廊目錄（4:3 實景大圖＋底部 `1px` 濃黑結構線＋26px 大字品名）
     - `cases`：雙欄雜誌大引言（`blockquote` 22px 襯線體，無外框白盒）
     - `visit`：6:6 左文右圖＋雙欄表格式細線重點
     - `faq`：4:8 極簡細線摺疊列（無陰影白盒）
     - `contact`：深林松木墨綠滿版收尾
