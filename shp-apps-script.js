/**
 * SHP 商品管理 — Apps Script
 * ─────────────────────────────────────────────────────────
 * 安裝方式：
 *   Google Sheets → 擴充功能 → Apps Script
 *   → 刪除預設程式碼 → 完整貼入此檔案 → Ctrl+S 儲存
 *   → 函數選 onOpen → ▶ 執行 → 完成授權
 *   → 回到 Sheets 重新整理，確認「商品管理」選單出現
 *
 * 選單功能：
 *   📥 匯入商品資料    — 只補 name 欄空白的列
 *   🔄 強制重新匯入全部 — 重抓所有商品，section 欄不覆蓋
 *   📤 匯出商品 JSON   — 輸出至 _JSON_Export 工作表 A1
 *
 * 需求：
 *   工作表標籤名稱必須是「Staging」（大小寫一致）
 *   標題列欄位：source_url, name, price, discount, promo,
 *               tag1, tag2, rating, rating_count, sales, image_url, section
 * ─────────────────────────────────────────────────────────
 */

// ── 設定值 ────────────────────────────────────────────────
var STAGING_TAB    = 'Staging';
var JSON_TAB       = '_JSON_Export';

// 匯入時允許覆蓋的欄位（section 不在此列，不會被覆蓋）
var IMPORT_COLS = [
  'source_url', 'name', 'price', 'discount', 'promo',
  'tag1', 'tag2', 'rating', 'rating_count', 'sales', 'image_url'
];


// ── 選單 ──────────────────────────────────────────────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('商品管理')
    .addItem('📥 匯入商品資料（只補空白名稱）', 'importNewProducts')
    .addItem('🔄 強制重新匯入全部',              'forceReimportAll')
    .addSeparator()
    .addItem('📤 匯出商品 JSON',                 'exportProductsJson')
    .addToUi();
}


// ── 📥 匯入商品資料 ───────────────────────────────────────
// 只處理 name 欄為空白的列，已有名稱的列一律跳過
function importNewProducts() {
  _runImport(/* forceAll= */ false);
}


// ── 🔄 強制重新匯入全部 ───────────────────────────────────
// 重新抓取所有有效 source_url 的列
// ⚠️ section 欄的值不會被覆蓋
function forceReimportAll() {
  var ui  = SpreadsheetApp.getUi();
  var res = ui.alert(
    '確認強制重新匯入',
    '將重新抓取所有商品的最新資料（名稱、價格、優惠券、圖片）。\n\n' +
    '✅ section 欄的值不會被清除。\n\n繼續？',
    ui.ButtonSet.YES_NO
  );
  if (res !== ui.Button.YES) return;
  _runImport(/* forceAll= */ true);
}


// ── 匯入核心邏輯 ──────────────────────────────────────────
function _runImport(forceAll) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(STAGING_TAB);
  if (!sheet) {
    _alert('找不到「Staging」工作表。\n請確認工作表標籤名稱是「Staging」（大小寫一致）。');
    return;
  }

  var data    = sheet.getDataRange().getValues();
  var headers = data[0].map(function(h) { return String(h).trim().toLowerCase(); });
  var urlIdx  = headers.indexOf('source_url');
  var nameIdx = headers.indexOf('name');

  if (urlIdx < 0) {
    _alert('找不到 source_url 欄，請確認標題列格式正確。');
    return;
  }

  var updated = 0, skipped = 0, failed = 0;

  for (var i = 1; i < data.length; i++) {
    var url  = String(data[i][urlIdx]  || '').trim();
    var name = String(data[i][nameIdx] || '').trim();

    // 無有效 URL → 跳過
    if (!url || url.indexOf('http') !== 0) { skipped++; continue; }
    // 非強制模式且已有名稱 → 跳過
    if (!forceAll && name) { skipped++; continue; }

    var product = _fetchYahooProduct(url);
    if (!product) { failed++; continue; }

    // 寫入欄位（section 不在 IMPORT_COLS，自動跳過）
    IMPORT_COLS.forEach(function(col) {
      var colIdx = headers.indexOf(col);
      if (colIdx >= 0 && product[col] !== undefined && product[col] !== null) {
        sheet.getRange(i + 1, colIdx + 1).setValue(product[col]);
      }
    });

    updated++;
    Utilities.sleep(700); // 避免請求過於頻繁
  }

  _alert('完成！\n\n✅ 更新：' + updated + ' 筆\n⏭ 跳過：' + skipped + ' 筆\n❌ 失敗：' + failed + ' 筆\n\n失敗通常是商品已下架或網址失效。');
}


// ── 📤 匯出商品 JSON ──────────────────────────────────────
function exportProductsJson() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(STAGING_TAB);
  if (!sheet) {
    _alert('找不到「Staging」工作表。');
    return;
  }

  var data    = sheet.getDataRange().getValues();
  var headers = data[0].map(function(h) { return String(h).trim().toLowerCase(); });
  var urlIdx  = headers.indexOf('source_url');
  var nameIdx = headers.indexOf('name');

  var products = [];
  for (var i = 1; i < data.length; i++) {
    var url  = String(data[i][urlIdx]  || '').trim();
    var name = String(data[i][nameIdx] || '').trim();
    // 跳過空白列或無有效 URL 的列
    if (!name || !url || url.indexOf('http') !== 0) continue;

    var obj = { id: 'P' + String(i).padStart(3, '0') };
    headers.forEach(function(h, j) {
      var val = data[i][j];
      if (h && val !== '' && val !== undefined && val !== null) {
        obj[h] = String(val).trim();
      }
    });
    products.push(obj);
  }

  var json = JSON.stringify(products, null, 2);

  var exportSheet = ss.getSheetByName(JSON_TAB);
  if (!exportSheet) {
    exportSheet = ss.insertSheet(JSON_TAB);
  }
  exportSheet.clearContents();
  exportSheet.getRange('A1').setValue(json);
  exportSheet.setColumnWidth(1, 700);
  ss.setActiveSheet(exportSheet);

  _alert(
    '匯出完成！共 ' + products.length + ' 筆商品。\n\n' +
    '下一步：\n' +
    '1. 點選「_JSON_Export」工作表\n' +
    '2. 點 A1 儲存格 → Ctrl/Cmd+A 全選 → Ctrl/Cmd+C 複製\n' +
    '3. 貼入本機 data/products.json（完整取代舊內容）\n' +
    '4. 瀏覽器 Cmd+Shift+R 強制重新整理'
  );
}


// ── Yahoo 商品資料抓取 ────────────────────────────────────
function _fetchYahooProduct(url) {
  try {
    var resp = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      followRedirects: true,
      headers: {
        'User-Agent':      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'Accept-Language': 'zh-TW,zh;q=0.9,en;q=0.8'
      }
    });
    if (resp.getResponseCode() !== 200) return null;
    return _parseYahooHtml(resp.getContentText('UTF-8'), url);
  } catch (e) {
    Logger.log('[_fetchYahooProduct] ' + url + ' → ' + e.message);
    return null;
  }
}

function _parseYahooHtml(html, url) {
  return {
    source_url:   url,
    name:         _extractName(html),
    price:        _extractPrice(html),
    discount:     _m(html, /([\d]+折)/, 1, ''),
    promo:        _m(html, /class="[^"]*promo[^"]*"[^>]*>([^<]{3,40})/, 1, ''),
    tag1:         _extractCouponTag(html, 1),
    tag2:         _extractCouponTag(html, 2),
    rating:       _m(html, /([\d.]+)\s*(?:顆星|\/5\.0)/, 1, ''),
    rating_count: _m(html, /([\d,]+)\s*(?:則評價|筆評論)/, 1, '').replace(/,/g, ''),
    sales:        _m(html, /(已售出?\s*[\d,萬千百]+\+?)/, 1, ''),
    image_url:    _m(html, /property="og:image"[^>]*content="([^"]+)"/, 1, '')
  };
}

function _extractName(html) {
  var h1 = _m(html, /<h1[^>]*class="[^"]*product[^"]*"[^>]*>([\s\S]*?)<\/h1>/, 1, '');
  if (h1) return h1.replace(/<[^>]+>/g, '').trim();
  var og = _m(html, /property="og:title"[^>]*content="([^"]+)"/, 1, '');
  return og.replace(/\s*[－\-–—]\s*Yahoo.*$/, '').trim();
}

function _extractPrice(html) {
  var raw = _m(html, /class="[^"]*(?:price|Price)[^"]*"[^>]*>[\s\S]*?(?:NT\$|＄|[$])?\s*([\d,]+)/, 1, '');
  return raw.replace(/,/g, '');
}

function _extractCouponTag(html, index) {
  var pinks = html.match(/(?:折\$?[\d,]+|NT\$?[\d,]+折|滿[\d,]+折[\d,]+)/g) || [];
  var reds  = html.match(/(?:限[時定][^\s<]{2,20}|限量[^\s<]{2,20})/g) || [];
  if (index === 1 && pinks[0]) return 'pink:' + pinks[0];
  if (index === 2 && reds[0])  return 'red:'  + reds[0];
  return '';
}

// 通用 regex match 工具
function _m(str, re, group, fallback) {
  var m = str.match(re);
  return (m && m[group] !== undefined) ? String(m[group]).trim() : fallback;
}

function _alert(msg) {
  SpreadsheetApp.getUi().alert(msg);
}
