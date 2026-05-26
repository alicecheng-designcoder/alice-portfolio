# Landing Page × Article 內容更新工作流程

> 每次新增文章前，請先完整閱讀此文件，確保設計一致性與連結正確性。  
> 本文件依照 `design.md` 的品牌規範撰寫，適用於 `index.html` + article page 的雙向更新。

---

## 一、檔案命名規則

### Article Page HTML

```
格式：yyyy-mm-dd-article-title.html
範例：2026-04-17-ai-design-workflow.html
```

- `yyyy-mm-dd`：文章建立日期（非發布日期）
- `article-title`：英文小寫，空格以 `-` 連接，簡短描述主題
- 舊格式 `article-N-layout.html` 為開發探索用，正式文章請遵循新命名規則

---

## 二、Card Module 欄位對應規則

Landing page 下方的 Card 排列順序：**從左到右為 001 → 009**（左邊第一張 = 001）。

### Card 各欄位的資料來源

| Card 欄位 | 對應來源 | 說明 |
|---|---|---|
| `card-theme`（情感標籤） | Card 固定屬性，不隨文章改變 | 每張 Card 有預設的情感語意（見下方色彩對照表） |
| `card-project`（文章標題） | Article page 的 `<h1>` 標題 | 套用完整的中文主標題 |
| `card-num`（編號） | Card 位置序號 001–009 | 不變動 |
| `card-name-zh`（分類中文） | Article page Hero 的 `Type` 欄位值 | 例：工作流程指南 |
| `card-name-en`（分類英文） | Article page Hero 的 `Type` 英文對應 | 例：Workflow Guide |
| `card-date`（日期） | 文件建立日期 | 格式：`yyyy/mm/dd` |
| `card-image` background color | 參照下方色彩對照表 | 不變動，固定對應 Hero Theme |

### Card 連結設定（有文章的 Card）

```html
<a href="yyyy-mm-dd-article-title.html"
   class="card"
   style="text-decoration:none;color:inherit;display:flex;flex-direction:column;"
   onclick="localStorage.setItem('heroTheme','INDEX')">
```

- `href`：指向對應的 article HTML 檔案
- `onclick`：設定 `localStorage.setItem('heroTheme', 'INDEX')`，`INDEX` 為該 Card 的 Hero Theme 索引（見下方對照表）
- 尚無文章的 Card 保持 `<div class="card">` 不加 `<a>` 標籤

---

## 三、全站設計規範

### 3-0. 字體規範

Google Fonts 載入（每頁 `<head>` 均需引入）：

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,700&family=Inter:wght@300;400;500&family=Noto+Sans+JP:wght@300;400;700&display=swap" rel="stylesheet">
```

| CSS 變數 | 字體名稱 | 分類 | 載入字重 | 用途 |
|---|---|---|---|---|
| `--font-d` | Playfair Display | serif | 400 italic、700、700 italic | Hero 標題、章節標題、block-sub、引言、數字大字 |
| `--font-b` | Inter + Noto Sans JP | sans-serif | 300、400、500 | 導覽列、Body 正文、標籤、說明文字 |

**Base font size：** `html { font-size: 16px; }`

> **注意：** 修改字體時，需同步更新 Google Fonts 的 `link href`（載入的字重）以及 `:root` 裡的 `--font-d` / `--font-b` 變數值。

---

### 3-1. 全站顏色系統（CSS Custom Properties）

所有顏色統一定義在 `:root` 中，各頁面共用：

| CSS 變數 | 色值 | 用途 |
|---|---|---|
| `--bg` | `#f5f0e8` | 頁面底色（暖米白） |
| `--dark` | `#1a1a1a` | 主文字、標題、深色背景（Contact/Footer 區域） |
| `--text` | `#3d3d3d` | 內文段落文字 |
| `--muted` | `#7a7069` | 輔助文字、標籤、次要資訊 |
| `--border` | `rgba(26,26,26,0.16)` | 所有邊框與分隔線 |
| `--blue` | `#1432e0` | 強調色 — Callout、Tag、Flow node |
| `--red` | `#c03030` | 警示色 — 重要提示 Callout、Tag |
| `--card-bg` | `#ffffff` | 卡片與資訊面板背景 |
| `--hero-bg` | 由 JS 動態設定 | Hero 背景色（見 3-2 色彩對照表） |

> **維護提醒（對應第八節）：** 每次修改上方任一色值，須同步更新本表格。

---

### 3-2. Card × Hero 色彩對照表

> Article page hero 背景色必須與 Landing page 對應 Card 的圖片背景色保持視覺一致。  
> 機制：Card 點擊時透過 `localStorage` 傳遞索引值，Article page 讀取後套用對應的 Hero 色。

| Card | 情感標籤 | Card 圖片背景色（rgba） | Hero Theme 索引 | Hero 背景色（rgb，純色） | 色調描述 |
|---|---|---|---|---|---|
| 001 | 期待 · Expectation | `rgba(137,164,192,0.35)` | `0` | `rgb(207,213,218)` | Steel Blue |
| 002 | 安慰 · Comfort | `rgba(240,185,198,0.35)` | `1` | `rgb(243,220,221)` | Rose Pink |
| 003 | 祝福 · Blessing | `rgba(240,230,140,0.35)` | `2` | `rgb(245,237,207)` | Soft Yellow |
| 004 | 珍惜 · Cherish | `rgba(200,162,200,0.35)` | `3` | `rgb(227,216,228)` | Lavender |
| 005 | 感謝 · Gratitude | `rgba(177,217,181,0.35)` | `4` | `rgb(220,232,221)` | Mint Green |
| 006 | 堅韌 · Resilience | `rgba(161,134,125,0.35)` | `5` | `rgb(216,208,206)` | Warm Taupe |
| 007 | 重生 · Rebirth | `rgba(254,223,225,0.35)` | `6` | `rgb(248,234,235)` | Pale Blush |
| 008 | 謙讓 · Humility | `rgba(215,84,85,0.35)` | `7` | `rgb(235,185,181)` | Dusty Rose |
| 009 | 獨特 · Uniqueness | `rgba(245,222,29,0.35)` | `8` | `rgb(245,236,185)` | Warm Yellow |

**Hero 背景色計算方式：**  
Card 的 `rgba(R,G,B,0.35)` 疊加在頁面底色 `#f5f0e8`（= `rgb(245,240,232)`）上，產生純色 Hero 背景。  
公式：`result = R×0.35 + 245×0.65`（每個 channel 分別計算）

---

## 四、Article Page 結構規範

以 `article-page-template.html` 為標準 Template，每篇新文章需包含以下模組：

### 4-1. Hero 區塊（`article-hero-inner`）

```html
<header class="article-hero" id="articleHero">
  <div class="article-hero-inner">
    <div class="hero-left">
      <div>
        <!-- Badge：內容類型 · 年份 · 適用平台 -->
        <div class="hero-badge">GUIDE &nbsp;·&nbsp; 2026 &nbsp;·&nbsp; WEB · IOS · ANDROID</div>
        <!-- 年份大字 -->
        <div class="hero-date-badge"><p>yyyy</p><p>mm</p></div>
      </div>
      <div class="hero-meta-list">
        <div class="hero-meta-item">
          <span class="hero-meta-label">Date</span>
          <span class="hero-meta-value">yyyy / mm / dd</span>  <!-- ← 文章建立日期 -->
        </div>
        <div class="hero-meta-item">
          <span class="hero-meta-label">Type</span>
          <span class="hero-meta-value">分類名稱（中文）</span>  <!-- ← 同步至 Card card-name-zh -->
        </div>
        <div class="hero-meta-item">
          <span class="hero-meta-label">Tools</span>
          <span class="hero-meta-value">工具清單</span>
        </div>
      </div>
    </div>
    <div class="hero-right">
      <p class="hero-index">yyyy</p>
      <h1 class="hero-title-en">英文主標題</h1>      <!-- ← 文章主視覺英文標題 -->
      <p class="hero-title-zh">中文副標題</p>         <!-- ← 同步至 Card card-project -->
      <p class="hero-tagline">一段引言文字</p>
    </div>
  </div>
</header>
```

### 4-2. Hero 背景色 JS（文章頂部）

```javascript
const heroThemes = [
  'rgb(207,213,218)', // 001 Steel Blue   ← 對應 Card 001
  'rgb(243,220,221)', // 002 Rose Pink     ← 對應 Card 002
  'rgb(245,237,207)', // 003 Soft Yellow   ← 對應 Card 003
  'rgb(227,216,228)', // 004 Lavender      ← 對應 Card 004
  'rgb(220,232,221)', // 005 Mint Green    ← 對應 Card 005
  'rgb(216,208,206)', // 006 Warm Taupe    ← 對應 Card 006
  'rgb(248,234,235)', // 007 Pale Blush    ← 對應 Card 007
  'rgb(235,185,181)', // 008 Dusty Rose    ← 對應 Card 008
  'rgb(245,236,185)', // 009 Warm Yellow   ← 對應 Card 009
];

// 讀取 Landing page 傳入的 Card 索引，確保色彩一致性
const _stored = localStorage.getItem('heroTheme');
localStorage.removeItem('heroTheme');
let currentTheme = (_stored !== null && !isNaN(+_stored))
  ? Math.abs(+_stored) % heroThemes.length
  : Math.floor(Math.random() * heroThemes.length);

function applyHeroTheme(bg) {
  document.documentElement.style.setProperty('--hero-bg', bg);
}
applyHeroTheme(heroThemes[currentTheme]);

// 每 5 秒輪播下一個 Theme
setInterval(() => {
  currentTheme = (currentTheme + 1) % heroThemes.length;
  applyHeroTheme(heroThemes[currentTheme]);
}, 5000);
```

**重要：** 每篇文章使用的 `heroThemes` 陣列內容完全相同，不需修改。只要 Card 的 `onclick` 設定正確的索引值，Hero 背景色會自動對應。

### 4-3. Navigation（導覽列）完整 HTML

Article page 的完整 `<nav>` 結構如下（**直接複製，不需修改**）：

```html
<nav class="nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">Alice <em>Cheng</em></a>
    <div class="nav-links">
      <a href="index.html#works">WORKS</a>
      <a href="index.html#about">ABOUT</a>
      <a href="index.html#contact">CONTACT ↗</a>
    </div>
    <a href="index.html#works" class="nav-back">← ALL WORKS</a>
  </div>
</nav>
```

**三個必要入口說明：**

| 元素 | class | href | 作用 |
|---|---|---|---|
| Logo | `nav-logo` | `index.html` | 品牌識別，點擊返回首頁 |
| Nav links | `nav-links` | `index.html#works` / `#about` / `#contact` | 桌面版右側連結組 |
| 返回按鈕 | `nav-back` | `index.html#works` | 手機版可見的「← ALL WORKS」 |

> **⚠ 維護提醒：** Nav HTML 已抽離至共用元件 `shared-components.js`（見第十一節），如需修改導覽列，請編輯該檔案而非逐一修改各 HTML 頁面。

### 4-4. ToC（目錄）結構

```html
<aside class="toc">
  <p class="toc-label">Contents</p>
  <nav class="toc-list">
    <a href="#section-id" class="toc-item active">
      <span class="toc-num">00</span>
      <span class="toc-item-title">章節名稱</span>
    </a>
    <!-- 每個章節一條，編號從 00 開始 -->
  </nav>
</aside>
```

ToC 的 active state 由 IntersectionObserver 自動管理，不需手動維護。

### 4-5. 內容區塊（Content Blocks）

| 區塊類型 | Class | 用途 |
|---|---|---|
| 章節 | `.block` | 包裹整個章節，需設 `id` 供 ToC 連結 |
| 章節標題 | `.block-header` + `.block-num` + `.block-title` | 編號 + 標題 |
| 段落文字 | `.block-text` | 一般段落 |
| 小標題 | `.block-sub` | 段落內的次級標題 |
| 統計數字 | `.block-stats` + `.block-stat` | 關鍵數字展示 |
| 引言 | `.block-quote` | 重要引言，深色背景 |
| 工具卡片 | `.tool-grid` + `.tool-card.{color}` | 工具比較（blue/dark/red/muted/purple） |
| 流程圖 | `.flow-diagram` + `.flow-row` | 橫向流程節點 |
| 比較表格 | `.compare-wrap` + `.compare-table` | 功能對比 |
| Callout | `.callout-box.{blue/red}` | 重要提示框 |
| 原則卡片 | `.principle-set` + `.principle-card` | 設計原則清單 |
| 步驟 | `.process-steps` + `.step` | 階段說明 |
| Checklist | `.checklist-block` + `.checklist-item` | 交付確認清單 |
| 結語導覽 | `.article-nav` | 文章底部 prev/next |

---

## 五、新增文章的逐步操作清單

### Step 1 — 準備 Article HTML 檔案

> **⚠ 必讀：** 新增文章一律以 `article-page-template.html` 為起點，不要從現有文章複製，以避免帶入舊文章的內容殘留。

- [ ] 複製 `article-page-template.html`，重新命名為：`yyyy-mm-dd-article-title.html`
- [ ] 更新 `<title>` 標籤
- [ ] 更新 Hero 區塊所有欄位（Date / Type / Tools / 英文標題 / 中文副標題 / 引言）
- [ ] 更新 Hero Badge 內容（類型 · 年份 · 適用平台）
- [ ] 撰寫 ToC 章節清單（id 需與內容 section 的 id 完全一致）
- [ ] 撰寫各章節內容
- [ ] 確認 Navigation 三個連結均指向 `index.html`

### Step 2 — 確認 Hero 色彩索引

- [ ] 確定此文章放在 Landing page 的哪張 Card（001–009）
- [ ] 查對照表取得對應的 Hero Theme 索引值
- [ ] **此步驟不需修改 Article 的 `heroThemes` 陣列**，只需在 Step 3 的 Card `onclick` 中設定正確的索引

### Step 3 — 更新 Landing page（`index.html`）

找到對應的 Card，進行以下修改：

```html
<!-- 更新前（無文章的靜態 Card） -->
<div class="card">

<!-- 更新後（有文章的可點擊 Card） -->
<a href="yyyy-mm-dd-article-title.html"
   class="card"
   style="text-decoration:none;color:inherit;display:flex;flex-direction:column;"
   onclick="localStorage.setItem('heroTheme','INDEX')">   <!-- INDEX = 對照表中的索引值 -->
```

**Card 各欄位更新：**

```html
<!-- card-theme：不修改，保留預設情感標籤 -->
<p class="card-theme">情感標籤（固定）</p>

<!-- card-project：套用 article 的中文主標題 -->
<p class="card-project">文章主標題（中文）</p>

<!-- card-name-zh：套用 article Hero 的 Type 欄位值 -->
<p class="card-name-zh">工作流程指南</p>

<!-- card-name-en：Type 英文對應 -->
<p class="card-name-en">Workflow Guide</p>

<!-- card-date：文章建立日期 -->
<p class="card-date">yyyy/mm/dd</p>
```

**注意：** Card 的 `<a>` 結尾標籤 `</a>` 必須包裹整個 Card 內容到 `</div>` 之前。

**Card Cover 設計規則（`card-image` 區塊）：**

> Card cover 一律採用「背景色 + 文字排版」，**不使用截圖或設計稿截圖作為 cover 圖片**。
> 背景色使用 3-2 對照表中的 `rgba` 值，文字排版使用 `.card-cover` class。

```html
<!-- card-image：背景色 + 2 行文字排版 cover（對齊線上設計） -->
<div class="card-image card-cover" style="background:rgba(R,G,B,0.35)">
  <p class="card-cover-title">AI × Figma</p>     <!-- 大標：系列名稱，Playfair Display italic -->
  <span class="card-cover-sub">Article Type</span> <!-- 副標：文章類型英文，小寫 all-caps 間距字 -->
</div>
```

排版邏輯對應線上 Card 003（「*AI × Brand* / DESIGN TOKEN GUIDE」）：
- 第一行 `.card-cover-title`：大字 italic serif，放系列或主題名稱
- 第二行 `.card-cover-sub`：小字 all-caps letter-spaced，放文章類型

- 背景色 `rgba(R,G,B,0.35)` 從 **3-2 對照表**對應 Card 欄位取得
- CSS class `.card-cover`、`.card-cover-title`、`.card-cover-sub` 已定義於 `index.html` `<style>` 區塊，無需額外修改

### Step 4 — 驗收清單

**Article Page 檢查：**
- [ ] Hero 背景色在點擊 Card 後，與 Card 圖片背景色視覺一致
- [ ] Hero 背景色每 5 秒輪播，第一個 theme 等於 Card 對應的索引
- [ ] ToC 所有連結可點擊，active state 隨滾動更新
- [ ] `← ALL WORKS` 按鈕可返回 `index.html#works`
- [ ] Nav Logo 可返回 `index.html`
- [ ] 文章底部 Article Nav（Prev / Next）連結正確

**Landing Page 檢查：**
- [ ] Card 點擊後正確跳轉至 Article page
- [ ] `localhost:port/article-page-name`（不含 `.html`）也能正確載入（server 會 301 redirect）
- [ ] `localStorage.setItem` 在點擊當下正確執行（Article hero 起始色正確）
- [ ] Card 顯示的標題、分類、日期與 Article 內容一致

### Step 5 — Push 到 GitHub（Commit Message 規範）

驗收通過後，將變動推上 GitHub。Commit message 必須依照以下格式撰寫，確保每一筆版本記錄都能清楚說明本次變動內容。

#### Commit Message 格式

```
[類型] 標題（一行摘要）

文章資訊：
- 標題：文章中文標題
- Card：001
- Type：工作流程指南
- 日期：yyyy/mm/dd

變動內容：
- 新增 / 修改 / 刪除了什麼檔案或內容

備注：
- 其他需要說明的事項（無則填「無」）
```

#### 類型前綴對照

| 類型前綴 | 使用情境 |
|---|---|
| `feat(article)` | 新增一篇文章 |
| `fix(article)` | 修正既有文章的內容錯誤 |
| `update(article)` | 更新既有文章的段落或資料 |
| `feat(index)` | 新增或調整 Landing page 的 Card |
| `fix(style)` | 修正 CSS 或視覺樣式 |
| `update(workflow)` | 更新 content-workflow.md 本身 |
| `chore` | 維護性變動（更名、刪除暫存檔等） |

#### 實際範例

**新增文章：**
```
feat(article): 新增「AI 協作工作流程指南」

文章資訊：
- 標題：AI 協作下的產品設計工作流程指南
- Card：001（期待 · Expectation）
- Type：工作流程指南
- 日期：2026/04/17

變動內容：
- 新增 2026-04-17-ai-design-workflow.html
- 更新 index.html：Card 001 改為可點擊連結

備注：無
```

**修正既有文章：**
```
fix(article): 修正 iOS & Android 工具指南比較表資料

文章資訊：
- 標題：iOS & Android Native App 設計工具指南
- Card：002（安慰 · Comfort）
- Type：工具指南
- 日期：2026/04/21

變動內容：
- 修正 Figma vs Sketch 比較表第三列資料錯誤
- 補充 Zeplin 的 Android 支援說明

備注：無
```

**更新共用樣式：**
```
fix(style): 調整全站 --muted 色值

文章資訊：（不適用）

變動內容：
- 將 --muted 從 #7a7069 改為 #6e6560
- 同步更新 content-workflow.md 第三節顏色表

備注：影響所有頁面的輔助文字與標籤顏色
```

> **給 Claude Code 的指示：** 每次執行 push 任務時，請依照上方格式自動生成 commit message，不要使用「update files」或「add article」等無意義的通用描述。

---

## 六、已發布文章索引

| Card | 文章檔案 | 標題 | Type | 日期 | Hero 索引 |
|---|---|---|---|---|---|
| 001 | `2026-04-17-ai-design-workflow.html` | AI 協作工作流程指南 | 工作流程指南 | 2026/04/21 | `0` |
| 002 | `2026-04-21-ios-android-native-design-tools.html` | iOS & Android Native App 設計工具指南 | 工具指南 | 2026/04/21 | `1` |
| 003 | `2026-05-20-figma-brief-basics.html` | 先理解設計系統的邊界，再寫 Brief | AI 設計協作指南 · Part 1 | 2026/05/20 | `2` |
| 004 | `2026-05-20-figma-journey-brief.html` | 設計提案跨多個畫面時，旅程 Brief 這樣寫 | AI 設計協作指南 · Part 2 | 2026/05/20 | `3` |
| 005 | `2026-05-20-figma-quality-check.html` | AI 在 Figma 建置時，設計師這樣做品質確認 | AI 設計協作指南 · Part 3 | 2026/05/20 | `4` |
| 006 | `2026-05-25-designer-data-guide.html` | 設計概念串接真實商品資料——設計師工作指南 | AI 設計協作指南 · Part 4 | 2026/05/25 | `5` |
| 007 | — | — | — | — | — |
| 008 | — | — | — | — | — |
| 009 | — | — | — | — | — |

> **Template 檔案：** `article-page-template.html`。每次新增文章時，複製此檔案並依命名規則重新命名即可。

---

## 七、已知技術限制與注意事項

### Mobile RWD — CSS Grid 溢出陷阱

文章頁 `.page-layout` 採用 CSS Grid 雙欄版型。Mobile 切換為單欄時，**不可使用 `grid-template-columns: 1fr`**，必須改為：

```css
.page-layout { grid-template-columns: minmax(0, 1fr); }
```

**原因：** CSS Grid 的 `1fr` 最小值為子元素的 `min-content`。若子元素（如表格、不換行文字、固定寬度區塊）的最小內容寬度大於 viewport，欄寬會被撐開，導致整頁橫向溢出。`minmax(0, 1fr)` 強制最小值為 0，讓內容自行換行或在容器內滾動。

同時，Grid 子項目（`.content-blocks`、`.block`）也需加上 `min-width: 0`：

```css
.content-blocks { min-width: 0; max-width: 100%; }
.block          { min-width: 0; max-width: 100%; }
```

### Mobile RWD — 表格溢出處理

`<table>` 元素無法自動換行。必須包在 `.compare-wrap` 容器內：

```css
.compare-wrap { overflow-x: auto; }          /* 容器可橫滑 */
.compare-table { min-width: 480px; }          /* 表格保持最小寬，觸發容器滾動 */
```

如此一來表格可在容器內橫向滾動，頁面本身不產生橫向 scroll（`document.body.scrollWidth` 維持等於 viewport 寬）。

### `npx serve` 的 `.html` 副檔名問題

`npx serve` 會對 `.html` 結尾的 URL 發出 301 redirect（移除副檔名），導致 URL query params 被丟棄。  
**解法：** 統一使用 `localStorage` 傳遞跨頁資料，不使用 URL query params。

### LocalStorage 的生命週期

Article page 在讀取 `heroTheme` 後立即 `removeItem`（單次讀取、自動清除），確保下次直接進入文章時改為隨機 theme，不殘留前次紀錄。

### Hero 輪播 timing

Hero theme 每 5 秒輪播一次。如需用 `getComputedStyle` 驗證初始顏色，需在頁面載入後 5 秒內執行，否則顏色已切換至下一個 theme。

---

## 八、Footer / Contact HTML 結構

Article page 的頁尾由兩個區塊組成，緊接在文章內容之後：

### 8-1. Contact 區塊

```html
<section class="contact">
  <div class="contact-inner">
    <div class="contact-quote">
      <p>"Let's make something worth remembering."</p>
    </div>
    <div class="contact-email">
      <p class="contact-email-label">GET IN TOUCH</p>
      <a href="mailto:tofu@yahooinc.com">tofu@yahooinc.com</a>
    </div>
    <div class="contact-social">
      <a href="#">LinkedIn ↗</a>
      <a href="#">Behance ↗</a>
      <a href="#">Dribbble ↗</a>
    </div>
  </div>
</section>
```

| 子區塊 | class | 內容說明 |
|---|---|---|
| 引言欄 | `contact-quote` | 品牌 tagline，深色背景白字，`--font-d` italic |
| Email 欄 | `contact-email` | 聯絡 email，可點擊 `mailto:` 連結 |
| 社群欄 | `contact-social` | 外部連結，寬度固定 240px |

### 8-2. Footer 區塊

```html
<footer>
  <div class="footer-inner">
    <span>© 2026 Alice Cheng · AI Workflow Design Lab</span>
    <span>TAIPEI, TAIWAN</span>
  </div>
</footer>
```

Footer 為單行 48px 高的深色長條，左側版權文字 + 右側地點。Mobile 時自動換為兩行置左排列。

> **⚠ 維護提醒：** Footer 與 Contact HTML 已抽離至共用元件 `shared-components.js`（見第九節），如需修改請編輯該檔案。

---

## 九、多頁面共用元件維護策略

### 9-1. 問題背景

目前每個 HTML 頁面各自內嵌完整的 `<nav>` 與 `<footer>` HTML。若需修改導覽列新增一個連結、或更新 Footer 的版權年份，需要逐一開啟每個檔案手動更改，容易遺漏且難以維護。

### 9-2. 解決方案：Web Components

將 Nav 與 Footer 封裝成自訂 HTML 標籤（Web Components），統一定義在 `shared-components.js`：

- 修改時只需編輯一個 JS 檔案
- 所有頁面自動套用最新版本
- 不需 build 工具、不需伺服器設定，`npx serve` 即可運作

### 9-3. 使用方式

每個 HTML 頁面的 `<head>` 底部加入：

```html
<script src="shared-components.js"></script>
```

然後在 HTML body 中用標籤取代原本的 HTML 區塊：

```html
<!-- 原本的 <nav class="nav">...</nav> 整段替換為 -->
<site-nav></site-nav>

<!-- 原本的 <section class="contact">...</section> + <footer>...</footer> 整段替換為 -->
<site-footer></site-footer>
```

**Article page 特別注意：** `<site-nav>` 預設會顯示「← ALL WORKS」返回按鈕，與 Landing page 不同。這個行為由元件內部自動判斷（偵測是否為 `index.html`），不需額外設定。

### 9-4. 修改共用 Header / Footer 的步驟

1. 開啟 `shared-components.js`
2. 找到對應的 template 字串（`SiteNav` 或 `SiteFooter` class）
3. 修改 HTML 或 CSS 內容
4. 存檔 → 重新整理任一頁面即可看到結果
5. 更新本文件第三節（若涉及顏色/字體）或第八節（若涉及 Footer 結構）

### 9-5. 新增文章時的操作

新增文章時，`article-page-template.html` 已使用 `<site-nav>` 和 `<site-footer>` 標籤，直接複製 Template 即可，**不需手動複製 nav / footer HTML**。

---

## 十、共用樣式異動同步規範

> **核心原則：** 每次調整網站的共用樣式（字體、顏色、間距），必須同步更新本文件的規範描述，確保 Claude 在生成新文章時，始終以最新樣式為準，避免新舊文章風格脫節。

### 需要同步更新本文件的情境

| 變更類型 | 例子 | 需更新的章節 |
|---|---|---|
| 字體 | 更換 font-family、調整 font-size / line-height | 四、Article Page 結構規範 → 對應 Block 說明 |
| 品牌色彩 | 調整 Hero 背景色、Card 背景色、accent color | 三、Card × Hero 色彩對照表 |
| 間距 | 修改 section padding、block gap、grid gutter | 四-5. 內容區塊 Class 對應表 |
| 版型 | 調整 grid columns、欄寬比例、breakpoint | 七、已知技術限制（Mobile RWD 段落） |
| 新增元件 | 增加新的 Block type 或 Card 樣式 | 四-5. 內容區塊 Class 對應表 |
| Template 結構 | 修改 `article-page-template.html` 的 HTML 骨架 | 四、所有對應的 code block |

### 同步更新的標準步驟

1. **修改 CSS / HTML 實作**（`design.md`、`index.html`、`article-page-template.html`）
2. **更新本文件**中對應的規範描述或對照表
3. **更新文件底部的「最後更新」日期**
4. **回頭檢視已發布文章**（見第六節索引），評估是否需要同步套用樣式修正

### 為什麼這步驟不能省略

Claude 生成新文章時，依據本文件的規範描述做決策，而非直接讀取 CSS 原始碼。若本文件未同步更新，Claude 會繼續套用舊規範，導致新文章與已修改的網站樣式不一致，形成視覺落差，且難以追蹤問題來源。

---

*文件最後更新：2026-05-25 | 新增已發布文章 Card 006（AI 設計協作指南 Part 4，設計概念串接真實商品資料），更新第六節文章索引*
