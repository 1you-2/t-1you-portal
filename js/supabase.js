// Supabase 래퍼: 키가 없거나 CDN이 막히면 조용히 비활성화 → 기존 JSON/로컬모드로 동작
window.Supa = (() => {
  let client = null;
  let enabled = false;

  function init() {
    try {
      const cfg = window.__SUPABASE__ || {};
      if (!cfg.url || !cfg.anonKey || cfg.url.includes("YOUR-PROJECT")) return false;
      if (!window.supabase || !window.supabase.createClient) return false;
      client = window.supabase.createClient(cfg.url, cfg.anonKey);
      enabled = true;
      return true;
    } catch {
      return false;
    }
  }

  async function getSites() {
    const { data, error } = await client
      .from("sites")
      .select("id,name,description,url,category,tags,sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });
    if (error) throw error;
    return (data || []).map((r) => ({
      id: r.id,
      name: r.name,
      desc: r.description || "",
      url: r.url,
      category: r.category,
      tags: r.tags || [],
    }));
  }

  async function getPopular() {
    const { data, error } = await client
      .from("site_popular")
      .select("site_id,clicks")
      .order("clicks", { ascending: false })
      .limit(5);
    if (error) throw error;
    return data || [];
  }

  async function trackClick(siteId) {
    // fire-and-forget: 실패해도 사용자 경험에 영향 없음
    try {
      await client.from("site_clicks").insert({ site_id: siteId, path: location.pathname });
    } catch { /* 무시 */ }
  }

  async function suggest(name, url, reason) {
    const { error } = await client.from("suggestions").insert({ name, url, reason });
    if (error) throw error;
  }

  return {
    init,
    get isEnabled() { return enabled; },
    getSites, getPopular, trackClick, suggest,
  };
})();
