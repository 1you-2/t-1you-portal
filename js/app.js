const state = {
  sites: [],
  popular: {}, // site_id -> clicks
  q: "",
  cat: "전체",
  favOnly: false,
  favs: new Set(JSON.parse(localStorage.getItem("school-favs") || "[]")),
  dark: localStorage.getItem("school-theme") || "light",
  db: false,
};

const $ = (s) => document.querySelector(s);

function faviconURL(u) {
  try {
    const d = new URL(u).hostname;
    return `https://www.google.com/s2/favicons?domain=${d}&sz=64`;
  } catch { return ""; }
}

function saveFavs() {
  localStorage.setItem("school-favs", JSON.stringify([...state.favs]));
}

function filtered() {
  const q = state.q.trim().toLowerCase();
  return state.sites.filter((s) => {
    if (state.cat !== "전체" && s.category !== state.cat) return false;
    if (state.favOnly && !state.favs.has(s.id)) return false;
    if (!q) return true;
    return (s.name + " " + s.desc + " " + (s.tags || []).join(" ")).toLowerCase().includes(q);
  });
}

function renderCats() {
  const cats = ["전체", ...new Set(state.sites.map((s) => s.category))];
  const box = $("#cats");
  box.innerHTML = "";
  cats.forEach((c) => {
    const b = document.createElement("button");
    b.className = "btn" + (state.cat === c ? " active" : "");
    b.textContent = c;
    b.onclick = () => { state.cat = c; render(); };
    box.appendChild(b);
  });
}

function onOutbound(siteId) {
  if (state.db && window.Supa) window.Supa.trackClick(siteId);
  // 로컬 인기 집계도 함께 (DB 미연결 환경 대비)
  try {
    const m = JSON.parse(localStorage.getItem("school-clicks") || "{}");
    m[siteId] = (m[siteId] || 0) + 1;
    localStorage.setItem("school-clicks", JSON.stringify(m));
  } catch { /* 무시 */ }
}

function cardEl(s) {
  const div = document.createElement("div");
  div.className = "card";
  const fav = faviconURL(s.url);
  const initial = s.name.trim()[0] || "S";
  const isFav = state.favs.has(s.id);
  const clicks = state.popular[s.id] || 0;
  const hot = clicks > 0 ? `<span class="badge hot">🔥 ${clicks}</span>` : "";
  div.innerHTML = `
    <div class="favicon">${fav ? `<img src="${fav}" alt="" loading="lazy" onerror="this.remove()">` : ""}<span>${initial}</span></div>
    <div class="card-body">
      <div class="card-name"><a href="${s.url}" target="_blank" rel="noopener" data-site="${s.id}">${s.name}</a></div>
      <div class="card-desc">${s.desc || ""}</div>
      <div class="card-meta">
        <span class="badge">${s.category}</span>${hot}
        <a class="open" href="${s.url}" target="_blank" rel="noopener" data-site="${s.id}">바로가기 ↗</a>
      </div>
    </div>`;
  div.querySelectorAll("a[data-site]").forEach((a) =>
    a.addEventListener("click", () => onOutbound(a.dataset.site))
  );
  const star = document.createElement("button");
  star.className = "star" + (isFav ? " on" : "");
  star.title = isFav ? "즐겨찾기 해제" : "즐겨찾기 추가";
  star.textContent = isFav ? "★" : "☆";
  star.onclick = () => {
    if (state.favs.has(s.id)) state.favs.delete(s.id);
    else state.favs.add(s.id);
    saveFavs();
    render();
  };
  div.prepend(star);
  const img = div.querySelector("img");
  if (img) img.addEventListener("load", () => { const sp = div.querySelector(".favicon span"); if (sp) sp.style.display = "none"; });
  return div;
}

function renderPopular() {
  const box = $("#popular");
  if (!box) return;
  const top = Object.entries(state.popular)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id]) => state.sites.find((s) => s.id === id))
    .filter(Boolean);
  if (!top.length) { box.innerHTML = ""; box.style.display = "none"; return; }
  box.style.display = "";
  box.innerHTML = `<div class="popular-title">🔥 지금 많이 찾는 사이트</div><div class="popular-chips"></div>`;
  const chips = box.querySelector(".popular-chips");
  top.forEach((s) => {
    const a = document.createElement("a");
    a.href = s.url; a.target = "_blank"; a.rel = "noopener";
    a.className = "chip";
    a.textContent = `${s.name} · ${state.popular[s.id]}`;
    a.addEventListener("click", () => onOutbound(s.id));
    chips.appendChild(a);
  });
}

function render() {
  document.documentElement.dataset.theme = state.dark;
  $("#themeBtn").textContent = state.dark === "dark" ? "☀️ 라이트" : "🌙 다크";
  $("#favBtn").classList.toggle("active", state.favOnly);
  const pill = $("#dbPill");
  if (pill) {
    pill.textContent = state.db ? "🟢 실시간 DB 연결됨" : "⚪ 기본 목록 (DB 미연결)";
    pill.classList.toggle("on", state.db);
  }
  renderCats();
  renderPopular();
  const list = filtered();
  $("#count").textContent = `총 ${state.sites.length}개 · 표시 ${list.length}개 · 즐겨찾기 ${state.favs.size}개`;

  const wrap = $("#sections");
  wrap.innerHTML = "";
  if (!list.length) {
    wrap.innerHTML = `<div class="empty">검색 결과가 없습니다. 다른 키워드로 검색해 보세요.</div>`;
    return;
  }
  const byCat = {};
  list.forEach((s) => { (byCat[s.category] ||= []).push(s); });
  Object.keys(byCat).sort().forEach((cat) => {
    const h = document.createElement("h2");
    h.className = "section-title";
    h.textContent = `${cat} (${byCat[cat].length})`;
    const g = document.createElement("div");
    g.className = "grid";
    byCat[cat].forEach((s) => g.appendChild(cardEl(s)));
    wrap.append(h, g);
  });
}

async function loadSites() {
  // 1순위: Supabase, 실패하면 기존 JSON 폴백 (사이트가 절대 안 뜨는 일 방지)
  if (window.Supa && window.Supa.init()) {
    try {
      state.sites = await window.Supa.getSites();
      state.db = true;
      try {
        const pop = await window.Supa.getPopular();
        pop.forEach((r) => { state.popular[r.site_id] = r.clicks; });
      } catch { /* 인기 집계 실패는 무시 */ }
      return;
    } catch { state.db = false; }
  }
  const res = await fetch("data/sites.json");
  state.sites = await res.json();
  try {
    const m = JSON.parse(localStorage.getItem("school-clicks") || "{}");
    Object.assign(state.popular, m);
  } catch { /* 무시 */ }
}

async function init() {
  $("#q").addEventListener("input", (e) => { state.q = e.target.value; render(); });
  $("#favBtn").onclick = () => { state.favOnly = !state.favOnly; render(); };
  $("#themeBtn").onclick = () => {
    state.dark = state.dark === "dark" ? "light" : "dark";
    localStorage.setItem("school-theme", state.dark);
    render();
  };
  $("#resetBtn").onclick = () => {
    state.q = ""; state.cat = "전체"; state.favOnly = false;
    $("#q").value = "";
    render();
  };
  const form = $("#suggestForm");
  if (form) form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = $("#suggestMsg");
    const name = $("#sgName").value.trim();
    const url = $("#sgUrl").value.trim();
    const reason = $("#sgReason").value.trim();
    if (!name || !url) { msg.textContent = "이름과 주소를 입력해 주세요."; return; }
    if (!state.db) { msg.textContent = "제안함이 아직 연결 전입니다. DB 연결 후 이용해 주세요."; return; }
    try {
      await window.Supa.suggest(name, url, reason);
      form.reset();
      msg.textContent = "✅ 접수됐습니다. 검토 후 반영하겠습니다!";
    } catch { msg.textContent = "❌ 전송 실패. 잠시 후 다시 시도해 주세요."; }
  });
  try {
    await loadSites();
  } catch {
    $("#sections").innerHTML = `<div class="empty">목록을 불러오지 못했습니다. 새로고침해 주세요.</div>`;
    return;
  }
  render();
}
init();
