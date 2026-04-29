# Design System — Alice Cheng Portfolio

> 本文件定義此網站的設計語言，新增任何頁面時應以此為準，確保視覺風格、字型、顏色、間距的一致性。

---

## 1. 設計理念

**風格定位：** 極簡編輯風（Minimal Editorial）  
- 以大量留白與邊框線條建立視覺層次，不使用裝飾性漸層或陰影
- Serif 字型（Playfair Display）用於標題，Sans-serif（Inter）用於正文與 UI 標籤
- 以 Uppercase + letter-spacing 傳達品牌調性，避免過度裝飾
- 所有分隔線採用 `border: 1px solid` 而非 divider 元件或背景色塊

---

## 2. Color System

以 CSS 變數定義，所有頁面在 `:root` 中套用相同 token。

```css
:root {
  --bg:      #f5f0e8;   /* 主背景：米白色 */
  --dark:    #1a1a1a;   /* 主深色：近黑，用於文字、按鈕、深色區塊 */
  --text:    #3d3d3d;   /* 正文色：深灰 */
  --muted:   #7a7069;   /* 次要文字：暖灰，label、時間、輔助說明 */
  --border:  rgba(26,26,26,0.16); /* 標準邊框（淺色背景上使用） */
  --blue:    #1432e0;   /* 品牌重點色：藍，用於 hero 標題 */
  --red:     #c03030;   /* 輔助重點色：紅，預備用途 */
  --card-bg: #ffffff;   /* 卡片背景：白 */
  --font-d:  'Playfair Display', serif;
  --font-b:  'Inter', 'Noto Sans JP', sans-serif;
}
```

### 顏色使用規則

| 用途 | Token / 值 |
|------|-----------|
| 頁面底色 | `var(--bg)` `#f5f0e8` |
| 主要文字 | `var(--dark)` `#1a1a1a` |
| 內文正文 | `var(--text)` `#3d3d3d` |
| 次要 label | `var(--muted)` `#7a7069` |
| 邊框線（淺色背景） | `var(--border)` |
| 邊框線（深色背景） | `rgba(255,255,255,0.09)` |
| 深色 section 背景 | `var(--dark)` `#1a1a1a` |
| Hero 背景（暗） | `#1a0808` |
| Hero 標題文字 | `var(--blue)` `#1432e0` |
| 卡片背景 | `var(--card-bg)` `#ffffff` |

> ⚠️ 不可引入新的品牌色。如需強調，使用 `--blue` 或 `--red`；如需層次，使用透明度變化。

---

## 3. Typography System

### 字型載入（所有頁面必須包含）

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,700&family=Inter:wght@300;400;500&family=Noto+Sans+JP:wght@300;400;700&display=swap" rel="stylesheet">
```

### 字型角色分工

| 角色 | 字型 | 使用時機 |
|------|------|---------|
| Display | Playfair Display | Hero 標題、section 標題、引言 quote、按鈕文字 |
| Body / UI | Inter + Noto Sans JP | 正文、label、nav 連結、badge、日期 |

### Type Scale

| 級別 | 尺寸 | 字重 | 字距 | 行高 | 用途 |
|------|------|------|------|------|------|
| Hero Title | `clamp(64px, 12vw, 160px)` | 700 | `-0.03em` | `1` | Hero 主標題 |
| Section Quote | `clamp(18px, 2vw, 24px)` | 700 | — | `1.3` | About/Contact 引言 |
| Card Title | `18px` | 700 | — | — | 卡片標題 |
| Nav Logo | `17px` | 700 | — | — | Logo |
| Hero Date | `20px` | 700 | — | `25px` | 日期徽章 |
| Body | `15px` | 300 | — | `1.8` | 長文正文 |
| Nav Link | `11px` | 500 | `1.32px` | — | 導覽列連結 |
| Label | `10px` | 500 | `1.8px` | — | 上大寫 label |
| Caption | `9–10px` | 400 | `1.08–2px` | — | 卡片 meta、日期 |
| Button | `12px` | 500 | `3px` | — | CTA 按鈕 |

### 文字規則

- **Nav 連結、label、badge、按鈕**：全大寫（`text-transform: uppercase` 或直接寫大寫），搭配 `letter-spacing`
- **標題 / Quote**：使用 Playfair Display，可搭配斜體（italic）
- **正文**：Inter 300 weight，`line-height: 1.8`

---

## 4. Spacing & Layout

### 最大版面寬度

```css
max-width: 1360px;
margin: 0 auto;
```

所有內容區塊（nav-inner、section-inner 等）皆套用此寬度。

### 固定高度元件

| 元件 | 高度 |
|------|------|
| Nav | `56px` |
| Works Header | `64px` |
| Hero（桌機） | `700px` |
| Hero（Tablet） | `560px` |
| Hero（Mobile） | `480px` |
| Hero（小螢幕 ≤480px） | `420px` |

### Section Padding

| 尺寸 | padding |
|------|---------|
| Desktop（≥1024px） | `48px 40px 64px` |
| Tablet（≤1024px） | `32px 24px 48px` |
| Mobile（≤768px） | `24px 16px 40px` |

### 間距標準

| 用途 | 值 |
|------|-----|
| 卡片間距（gap） | `16px` |
| 卡片內 padding | `22px 18px 18px` |
| Section 內部 spacing | `48px`（桌機）、`32px`（Mobile） |
| Nav 左 padding | `48px`（桌機）、`24px`（Tablet）、`16px`（Mobile） |

---

## 5. Component Library

### 5.1 Nav（導覽列）

```html
<nav class="nav" id="top">
  <div class="nav-inner">
    <a href="#top" class="nav-logo">Name <em>Surname</em></a>
    <div class="nav-links">
      <a href="#section1">SECTION 1</a>
      <a href="#section2">SECTION 2</a>
      <a href="#contact">CONTACT ↗</a>
    </div>
    <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="nav-drawer" id="navDrawer">
  <a href="#section1" onclick="closeDrawer()">SECTION 1</a>
  <a href="#contact"  onclick="closeDrawer()">CONTACT ↗</a>
</div>
```

**規則：**
- `sticky top:0`，`z-index: 200`
- 背景：`rgba(245,240,232,0.96)` + `backdrop-filter: blur(10px)`
- 連結以 `border-left: 1px solid var(--border)` 分隔
- Mobile（≤768px）：隱藏 `.nav-links`，顯示漢堡選單

---

### 5.2 Hero Section

**結構：**
- 背景圖片（slideshow 或靜態）+ 極輕 dark overlay `rgba(0,0,0,0.15)`
- 3 條水平格線，位於 25% / 50% / 75%
- 左上角：黑色日期徽章 `20 / 26`
- 左側：大型品牌名稱（藍色，`clamp(64px, 12vw, 160px)`）
- 右側：垂直文字（旋轉 90°，`font-size: 10px, letter-spacing: 2px`）
- 底部居中：CTA 按鈕組

**日期徽章範例：**
```html
<div class="hero-date"><p>20</p><p>26</p></div>
```

**垂直文字範例：**
```html
<div class="hero-vert-right">
  <span>EXPLORING NEW FRONTIERS IN AI CREATIVITY</span>
</div>
```

---

### 5.3 Section Header Bar（橫向分段標題列）

用於各內容 section 的頂部標題列，水平排列、以邊框分隔。

```html
<div class="works-header" id="works">
  <div class="works-header-inner">
    <div class="wh-cell wh-i">II</div>
    <div class="wh-cell wh-title">Section Title</div>
    <div class="wh-cell wh-subtitle">副標題說明</div>
    <div class="wh-cell wh-count">N pieces</div>
  </div>
</div>
```

**規則：**
- 高度 `64px`，`border-bottom: 1px solid var(--border)`
- 羅馬數字索引（I、II、III…）放在最左 cell，寬度 `56px`
- Tablet 以下隱藏 `.wh-subtitle`

---

### 5.4 Card Grid

**9 張卡片排列規則：**
- 桌機（≥1024px）：3 欄 `grid-template-columns: repeat(3, 1fr)`
- Mobile（≤768px）：1 欄 `grid-template-columns: 1fr`
- 間距：`gap: 16px`

**單一卡片結構：**
```html
<div class="card">
  <div class="card-header">
    <div class="card-title-group">
      <p class="card-theme">主題 · Theme</p>
      <p class="card-project">Project Name</p>
    </div>
    <span class="card-num">001</span>
  </div>
  <div class="card-image" style="background: rgba(R,G,B,0.35)">
    <img src="..." alt="..." loading="lazy">
  </div>
  <div class="card-footer">
    <p class="card-name-zh">花名（中）</p>
    <p class="card-name-en">Flower Name</p>
    <div class="card-divider"></div>
    <p class="card-date">YYYY/MM/DD</p>
  </div>
</div>
```

**卡片背景色規則：**  
每張卡片圖片區塊使用低飽和度、半透明色調，反映植物主題色。格式：`rgba(R, G, B, 0.35)`。

**Hover 效果：**
```css
.card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.09);
  transform: translateY(-2px);
}
```

---

### 5.5 About Section

三欄橫向布局，左側垂直 label，中間主要文字，右側工具 badge 列表。

```html
<section class="about" id="about">
  <div class="about-inner">
    <div class="about-vert-label"><span>ABOUT</span></div>
    <div class="about-bio">
      <p class="about-quote">"引言文字"</p>
      <p class="about-body">段落說明...</p>
      <p class="about-tagline">tagline 說明</p>
    </div>
    <div class="about-skills">
      <p class="skills-label">TOOLS &amp; SKILLS</p>
      <div class="skills-list">
        <span class="badge">Tool Name</span>
      </div>
    </div>
  </div>
</section>
```

**Mobile 行為：**  
三欄改為垂直堆疊（`flex-direction: column`）

---

### 5.6 Contact Section

深色背景（`var(--dark)`），三欄橫向布局。

```html
<section class="contact" id="contact">
  <div class="contact-inner">
    <div class="contact-quote">
      <p>"引言文字"</p>
    </div>
    <div class="contact-email">
      <p class="contact-email-label">GET IN TOUCH</p>
      <a href="mailto:email@domain.com">email@domain.com</a>
    </div>
    <div class="contact-social">
      <a href="#">LinkedIn ↗</a>
      <a href="#">Behance ↗</a>
    </div>
  </div>
</section>
```

---

### 5.7 Footer

接續深色背景，單行橫向，左：版權，右：地點。

```html
<footer>
  <div class="footer-inner">
    <span>© 2026 NAME · Tagline</span>
    <span>CITY, COUNTRY</span>
  </div>
</footer>
```

---

### 5.8 Buttons

兩種固定樣式，不允許自訂顏色：

```html
<!-- Primary：黑底白字 -->
<a href="#" class="btn-primary">ACTION LABEL</a>

<!-- Secondary：白底黑框 -->
<a href="#" class="btn-secondary">ACTION LABEL</a>
```

**規格：**
- padding: `21px 41px`
- font: `12px`, `font-weight: 500`, `letter-spacing: 3px`
- border: `1px solid #000`
- 過渡: `transition: background 0.15s`

---

### 5.9 Badge

```html
<span class="badge">Label</span>
```

- border-radius: `999px`
- background: `#faf7f2`
- border: `1px solid rgba(26,26,26,0.16)`
- font: `11px, 500, letter-spacing: 0.88px`

---

## 6. Interaction Patterns

| 元件 | Hover / Active 行為 |
|------|-------------------|
| Nav 連結 | `background: rgba(26,26,26,0.04)` |
| 卡片 | `box-shadow` + `translateY(-2px)`, 過渡 `0.2s` |
| Btn Primary | `background: #333`, `border-color: #333` |
| Btn Secondary | `background: rgba(255,255,255,0.85)` |
| Contact email | `opacity: 0.75` |
| Contact social | `opacity: 0.7` |
| Hero dots | `background: #fff`, `scale(1.3)` |
| Nav Hamburger | 三條線變 X 動畫（`transform + opacity`，`0.25s`） |
| Nav Drawer | `translateY + opacity` 進場，`0.25s` |

所有過渡統一使用 `transition: [property] 0.15s` 或 `0.2s`，不使用 ease-in-out 以外的 timing function。

---

## 7. Responsive Breakpoints

```css
/* Tablet */
@media (max-width: 1024px) { ... }

/* Mobile */
@media (max-width: 768px)  { ... }

/* Small Mobile */
@media (max-width: 480px)  { ... }
```

### 各 Breakpoint 關鍵行為

| 元件 | Desktop ≥1024px | Tablet 768–1024px | Mobile ≤768px |
|------|----------------|------------------|---------------|
| Nav | 完整連結 | 完整連結 | 漢堡選單 + Drawer |
| Hero 高度 | 700px | 560px | 480px |
| Hero 標題 | `clamp(64px, 12vw, 160px)` | 同左 | `clamp(48px, 9vw, 100px)` |
| Hero 標題 top | `20%` | `20%` | `108px`（清開日期徽章） |
| Hero 垂直文字 | 顯示 | 隱藏 | 隱藏 |
| 卡片欄數 | 3 欄 | 3 欄 | 1 欄 |
| CTA 按鈕 | 橫向並排 | 橫向並排 | 垂直堆疊，全寬 |
| About | 3 欄橫向 | 3 欄橫向 | 垂直堆疊 |
| Contact | 3 欄橫向 | 3 欄橫向 | 垂直堆疊 |
| Footer | 單行 | 單行 | 垂直堆疊 |

---

## 8. 新頁面建立規則

### HTML 基本結構

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>頁面標題 — Alice Cheng</title>
  <!-- 必須載入的字型 -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,700&family=Inter:wght@300;400;500&family=Noto+Sans+JP:wght@300;400;700&display=swap" rel="stylesheet">
  <style>
    /* 必須複製 :root 變數 + Reset + 共用 component 樣式 */
  </style>
</head>
<body>
  <!-- Nav（與首頁相同） -->
  <!-- 頁面專屬內容 -->
  <!-- Contact Section（與首頁相同） -->
  <!-- Footer（與首頁相同） -->
</body>
</html>
```

### 新頁面 Section Header 索引

每個新頁面的主要區塊使用羅馬數字索引：
- 首頁 Selected Works → **I**
- 新頁面第一區塊 → **II**
- 新頁面第二區塊 → **III**（以此類推）

### 新頁面 Hero 替代方案

若新頁面不需要 slideshow hero，可使用精簡的 Page Header：

```html
<header class="page-header">
  <div class="page-header-inner">
    <div class="page-header-label">PAGE TYPE</div>
    <h1 class="page-header-title">Page Title</h1>
    <p class="page-header-desc">頁面描述說明</p>
  </div>
</header>
```

建議 CSS 規格：
```css
.page-header {
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  padding: 80px 40px 64px;
}
.page-header-inner { max-width: 1360px; margin: 0 auto; }
.page-header-label {
  font-size: 10px; font-weight: 500; letter-spacing: 1.8px;
  color: var(--muted); text-transform: uppercase; margin-bottom: 16px;
}
.page-header-title {
  font-family: var(--font-d); font-size: clamp(36px, 5vw, 72px);
  font-weight: 700; color: var(--dark); margin-bottom: 16px;
}
.page-header-desc {
  font-size: 15px; font-weight: 300; line-height: 1.8;
  color: var(--text); max-width: 640px;
}
```

---

## 9. Article Page Design System

> 文章頁（`yyyy-mm-dd-*.html`）繼承全站 Color System 與 Typography 規範，但有獨立的版型結構與字級系統，以下為文章頁專屬規格。

### 9.1 Article Page Layout（版型結構）

文章頁採用「左側 ToC + 右側內容」的雙欄 CSS Grid 版型：

```css
/* CSS 變數 */
:root {
  --toc-w: 240px;   /* ToC 欄寬（桌機） */
}

/* 主版型 */
.page-layout {
  max-width: 1360px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: var(--toc-w) 1fr;
  align-items: start;
}

/* Tablet */
@media (max-width: 1024px) {
  :root { --toc-w: 200px; }
  .content-blocks { padding: 0 32px; }
}

/* Mobile — 關鍵：必須用 minmax(0, 1fr) 而非 1fr */
@media (max-width: 768px) {
  .page-layout { grid-template-columns: minmax(0, 1fr); }
  .toc { display: none; }
  .content-blocks { padding: 0 20px; min-width: 0; max-width: 100%; }
}
```

> ⚠️ **Mobile Grid 陷阱：** CSS Grid 的 `1fr` 最小值為 `min-content`，若子元素有固定寬度內容（如表格），會撐開欄寬造成頁面橫向溢出。  
> 正確做法：`grid-template-columns: minmax(0, 1fr)` + 子元素加上 `min-width: 0`。

### 9.2 Article Page Typography（文章頁字級系統）

文章頁字級**獨立於首頁**，整體較大（約為基準 ×1.105）；Header（nav）與 Footer 字級與首頁保持一致，不調整。

#### 字級定義表

| 選擇器 | 字級 | 字重 | 備註 |
|--------|------|------|------|
| `.hero-badge` | `10px` | `500` | 全大寫 badge |
| `.hero-meta-label` | `10px` | `500` | 上大寫 label |
| `.hero-meta-value` | `14px` | `300` | meta 內容 |
| `.hero-tagline` | `17px` | `300` | Hero 引言 |
| `.block-title` | `clamp(20px, 2.2vw, 31px)` | `700` | Playfair Display，章節主標題 |
| `.block-sub` | `17px` | `500` | 段落次標題 |
| `.block-text` | `17px` | `300` | 正文段落 |
| `.block-num` | `11px` | `500` | 章節編號，letter-spacing: 2px |
| `.stat-big` | `49px` | `700` | Playfair Display，關鍵數字 |
| `.stat-label` | `13px` | `300` | 數字說明 |
| `.tool-name` | `17px` | `700` | Playfair Display，工具名稱 |
| `.tool-tag` | `12px` | `500` | 工具分類標籤，全大寫 |
| `.tool-desc` | `14px` | `300` | 工具說明文字 |
| `.callout-label` | `11px` | `500` | Callout 標題，全大寫，letter-spacing |
| `.callout-box p` | `14px` | `400` | Callout 內文 |
| `.compare-table` | `14px` | — | 比較表格本文 |
| `.compare-table th` | `10px` | `500` | 表頭，全大寫，letter-spacing: 1.5px |
| `.principle-title` | `15px` | `500` | 原則標題 |
| `.principle-body` | `14px` | `300` | 原則說明 |
| `.principle-num` | `24px` | `700` | Playfair Display，原則編號 |
| `.checklist-header` | `11px` | `500` | Checklist 區塊標題，全大寫 |
| `.checklist-item` | `14px` | `400` | Checklist 項目文字 |
| `.must-badge` | `10px` | `500` | 必要標記 badge |
| `.article-nav-label` | `11px` | `500` | 前後導覽 label |
| `.article-nav-title` | `20px` | `700` | 前後導覽文章標題 |
| `.toc-label` | `11px` | `500` | ToC 標題，全大寫 |
| `.toc-item-title` | `13px` | `400` | ToC 章節連結 |
| `.toc-num` | `11px` | `500` | ToC 章節編號 |

#### Header / Footer（與首頁一致，不隨文章頁縮放）

| 選擇器 | 字級 | 備註 |
|--------|------|------|
| `.nav-logo` | `17px` | 700，與首頁相同 |
| `.nav-back` | `11px` | 500，letter-spacing: 1.32px |
| `.footer-inner` | `11px` | 500，與首頁相同 |

### 9.3 Mobile RWD 規則（文章頁）

#### 防溢出核心規則

```css
@media (max-width: 768px) {
  /* 1. Grid 欄寬：必須用 minmax(0, 1fr) 防止 min-content 撐開 */
  .page-layout { grid-template-columns: minmax(0, 1fr); }

  /* 2. Grid 子項目：必須明確設 min-width: 0 */
  .content-blocks { padding: 0 20px; min-width: 0; max-width: 100%; }
  .block { padding: 40px 0; min-width: 0; max-width: 100%; }

  /* 3. Flex 容器需允許換行 */
  .block-header { flex-wrap: wrap; gap: 8px; }
  .block-tags   { flex-wrap: wrap; gap: 6px; }
  .checklist-item { flex-wrap: wrap; }

  /* 4. 文字防溢出 */
  .block-title  { font-size: 20px; word-break: break-word; }
  .block-text, .block-quote p { word-break: break-word; }
  .callout-box  { box-sizing: border-box; }
  .callout-box p { word-break: break-word; }
  .tool-card    { min-width: 0; word-break: break-word; }

  /* 5. Checklist 文字欄 flex 撐開 */
  .checklist-item > span { flex: 1 1 0; min-width: 0; word-break: break-word; }

  /* 6. 表格：必須包在 .compare-wrap { overflow-x: auto } 內 */
  /* 表格本身設 min-width: 480px，由 wrapper 滾動，不影響頁面橫向 */
}
```

#### 各模組 Mobile 行為

| 模組 | Desktop | Mobile ≤768px |
|------|---------|--------------|
| 版型 | 左 ToC + 右內容（Grid 2欄） | 單欄，ToC 隱藏 |
| `.block-stats` | 3欄 Grid | 1欄垂直堆疊 |
| `.tool-grid` | 2欄 Grid | 1欄垂直堆疊 |
| `.spec-grid` | 多欄 Grid | 1欄垂直堆疊 |
| `.compare-table` | 全寬表格 | 在 `.compare-wrap` 內橫向滾動，`min-width: 480px` |
| `.flow-diagram` | 橫向節點流程 | `overflow-x: auto` 可橫滑，節點 `white-space: normal` |
| `.principle-card` | `grid-template-columns: 56px 1fr` | `grid-template-columns: 40px 1fr` |
| `.process-step` | `grid-template-columns: 48px 1fr` | `grid-template-columns: 40px 1fr` |
| `.pipeline-row` | `grid-template-columns: 48px 1fr` | `grid-template-columns: 36px 1fr` |
| `.block-tags` | flex 單行 | flex 自動換行（`flex-wrap: wrap`） |
| `.checklist-item` | flex 單行 | flex 自動換行，badge 降到次行 |

### 9.4 Checklist 互動規格

Checklist 整行可點擊（不只是 checkbox 圖示），透過 JS 在 `.checklist-item` 層級綁定事件：

```javascript
document.querySelectorAll('.checklist-item').forEach(item => {
  item.style.cursor = 'pointer';
  item.addEventListener('click', function () {
    const box = this.querySelector('.check-box');
    if (box) {
      box.classList.toggle('checked');
      this.classList.toggle('item-checked');
    }
  });
});
```

**CSS 需搭配：**
```css
.checklist-item { cursor: pointer; transition: background 0.1s; }
.checklist-item:hover { background: rgba(26,26,26,0.02); }
```

### 9.5 比較表格（Compare Table）規格

比較表格必須包在 `.compare-wrap` 容器內，確保 Mobile 可橫向滾動：

```html
<div class="compare-wrap">
  <table class="compare-table">
    ...
  </table>
</div>
```

```css
.compare-wrap  { overflow-x: auto; margin: 24px 0; }
.compare-table { width: 100%; border-collapse: collapse; font-size: 14px; min-width: 480px; }
.compare-table th {
  padding: 10px 14px; background: var(--dark); color: #fff;
  text-align: left; font-size: 10px; font-weight: 500;
  letter-spacing: 1.5px; text-transform: uppercase;
}
.compare-table td { padding: 10px 14px; border-bottom: 1px solid var(--border); }
```

> `min-width: 480px` 讓 Mobile 上強制橫向滾動，`overflow-x: auto` 限制在 `.compare-wrap` 內，不影響整頁捲動。

---

## 10. 禁止事項

- ❌ 不引入新字型
- ❌ 不使用非 token 顏色（包括任何 `rgba` 非設計系統定義色）
- ❌ 不使用 `border-radius` 超過 `2px`（僅 badge 允許 `999px`）
- ❌ 不使用 `box-shadow` 作為裝飾（僅允許卡片 hover 狀態）
- ❌ 不使用漸層背景（gradient）做裝飾
- ❌ 不使用超過 `0.2s` 的過渡動畫（除 hero slideshow 的 `1.2s` 外）
- ❌ 不在深色背景上使用 `var(--border)`，應改用 `rgba(255,255,255,0.09)`

---

*Last updated: 2026-04-21*
