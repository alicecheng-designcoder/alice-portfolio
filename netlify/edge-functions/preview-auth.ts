// N-15 過渡防護立即段（2026-07-19 PF-2 裁決）：敏感子路徑 basic auth
// 密碼＝Netlify env PREVIEW_AUTH_PW（帳號固定 yahoo）；正式版隨 PF-11 遷內網後本函式退場
export default async (request: Request, context: any) => {
  const pw = (globalThis as any).Netlify?.env?.get("PREVIEW_AUTH_PW") ?? (globalThis as any).Deno?.env?.get("PREVIEW_AUTH_PW") ?? "";
  const expected = "Basic " + btoa("yahoo:" + pw);
  if (pw && request.headers.get("authorization") === expected) return context.next();
  return new Response("內部預覽區——請輸入帳號 yahoo 與密碼（向 Tofu 索取）", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="internal-preview", charset="UTF-8"', "content-type": "text/plain; charset=utf-8" },
  });
};
