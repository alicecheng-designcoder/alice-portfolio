// N-15 過渡防護（Cloudflare Pages 版；2026-07-19 PF-2 裁決）：敏感子路徑 basic auth
// 密碼＝Pages env PREVIEW_AUTH_PW（帳號固定 yahoo）；升級 Cloudflare Access 後本檔退場
const PROTECTED = [
  "/lecreuset-frametest/titanium-preview",
  "/lecreuset-frametest/platform-decisions",
  "/lecreuset-frametest/platform-plan-doc13",
  "/lecreuset-frametest/platform-plan-doc15", // 2026-07-21：15 號 CMS 工作流程圖說（U26 提案）
  "/lecreuset-frametest/field-map",           // 2026-07-21：U25 欄位視覺對照（內部工具）
];
export async function onRequest(ctx) {
  const { pathname } = new URL(ctx.request.url);
  if (!PROTECTED.some((p) => pathname.startsWith(p))) return ctx.next();
  const pw = ctx.env.PREVIEW_AUTH_PW || "";
  const expected = "Basic " + btoa("yahoo:" + pw);
  if (pw && ctx.request.headers.get("authorization") === expected) return ctx.next();
  return new Response("內部預覽區——請輸入帳號 yahoo 與密碼（向 Tofu 索取）", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="internal-preview", charset="UTF-8"', "content-type": "text/plain; charset=utf-8" },
  });
}
