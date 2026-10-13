// 강사카드 탭: 구글 로그인 + 프로필/강의카드 DB 관리 + 인쇄
const $ = (s) => document.querySelector(s);
let sb = null;
let user = null;

const CHECKS = [
  "정치적·이념적 편향이 드러나지 않도록 유의",
  "차별·혐오 표현 금지, 인권의 관점에서 존중과 평등의 언어로",
  "특정인·단체의 지나친 미화/비하 발언 자제",
  "영리 목적 출판물·제품·금융서비스 홍보 금지",
  "타인 개인정보(이메일·전화번호) 무단 배포 금지",
  "표절·저작권 침해 유의 (무단 전재 금지)",
  "교수요목 참고, 강의 주제 이탈 금지",
  "원고 홈페이지 탑재 가능 → 신중 작성",
  "강의 시간 엄수 (50분 강의 후 10분 휴식)",
  "평가 공정성 (힌트 제공·범위 외 출제 금지)",
];

const box = (v) => (v ? "☑" : "☐");
const esc = (v) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;");

function client() {
  const cfg = window.__SUPABASE__ || {};
  if (!cfg.url || !cfg.anonKey || cfg.url.includes("YOUR-PROJECT")) return null;
  if (!window.supabase) return null;
  return window.supabase.createClient(cfg.url, cfg.anonKey);
}

function renderChecks(saved) {
  const wrap = $("#checklist");
  wrap.innerHTML = "";
  CHECKS.forEach((t, i) => {
    const l = document.createElement("label");
    const c = document.createElement("input");
    c.type = "checkbox"; c.dataset.i = i;
    c.checked = !!(saved && saved["c" + (i + 1)]);
    l.append(c, document.createTextNode(`${i + 1}. ${t}`));
    wrap.appendChild(l);
  });
}

function readChecks() {
  const o = {};
  document.querySelectorAll("#checklist input").forEach((c) => { o["c" + (+c.dataset.i + 1)] = c.checked; });
  return o;
}

function profile() {
  return {
    full_name: $("#pName").value.trim(),
    birthdate: $("#pBirth").value.trim(),
    workplace: $("#pWork").value.trim(),
    position: $("#pPos").value.trim(),
    mobile: $("#pMobile").value.trim(),
    office_phone: $("#pOffice").value.trim(),
    email: $("#pEmail").value.trim(),
    career_lines: $("#pCareer").value.split("\n").map((s) => s.trim()).filter(Boolean),
    bank_name: $("#pBank").value.trim(),
    account_no: $("#pAcct").value.trim(),
    tax_type: $("#pTax").value,
  };
}

function fillProfile(p) {
  if (!p) return;
  $("#pName").value = p.full_name || "";
  $("#pBirth").value = p.birthdate || "";
  $("#pWork").value = p.workplace || "";
  $("#pPos").value = p.position || "";
  $("#pMobile").value = p.mobile || "";
  $("#pOffice").value = p.office_phone || "";
  $("#pEmail").value = p.email || user?.email || "";
  $("#pBank").value = p.bank_name || "";
  $("#pAcct").value = p.account_no || "";
  $("#pTax").value = p.tax_type || "기타소득";
  $("#pCareer").value = (p.career_lines || []).join("\n");
}

function cardInput() {
  return {
    business_name: $("#cBiz").value.trim(),
    org_dept: $("#cOrg").value.trim(),
    lecture_at: $("#cWhen").value.trim(),
    prep_teacher: $("#cPrepT").value.trim(),
    prep_center: $("#cPrepC").value.trim(),
    prep_trainee: $("#cPrepS").value.trim(),
    seating: $("#cSeat").value,
    manuscript_type: $("#cMsType").value,
    manuscript_pages: +$("#cMsPages").value || 0,
    manuscript_modified_pct: $("#cMsPct").value === "" ? null : +$("#cMsPct").value,
    prev_year: $("#cPrevY").value.trim(),
    prev_course: $("#cPrevC").value.trim(),
    written_date: $("#cDate").value.trim(),
    checklist: readChecks(),
  };
}

function fillCard(c) {
  if (!c) return;
  $("#cBiz").value = c.business_name || "";
  $("#cOrg").value = c.org_dept || "";
  $("#cWhen").value = c.lecture_at || "";
  $("#cPrepT").value = c.prep_teacher || "";
  $("#cPrepC").value = c.prep_center || "";
  $("#cPrepS").value = c.prep_trainee || "";
  $("#cSeat").value = c.seating || "2인 1조";
  $("#cMsType").value = c.manuscript_type || "새 원고";
  $("#cMsPages").value = c.manuscript_pages ?? 0;
  $("#cMsPct").value = c.manuscript_modified_pct ?? "";
  $("#cPrevY").value = c.prev_year || "";
  $("#cPrevC").value = c.prev_course || "";
  $("#cDate").value = c.written_date || "";
  renderChecks(c.checklist);
}

function renderPrint(p, c) {
  const career = (p.career_lines || []).map((l) => `▪ ${esc(l)}`).join("<br>");
  const ms = c.manuscript_type;
  const chk = CHECKS.map((t, i) => {
    const on = c.checklist && c.checklist["c" + (i + 1)];
    return `<tr><td>${i + 1}. ${esc(t)}</td><td style="text-align:center">${on ? "✔" : ""}</td></tr>`;
  }).join("");
  $("#printArea").innerHTML = `
    <h1>강 사 카 드</h1>
    <div class="biz"><span>사업명: ${esc(c.business_name)}</span><span>${esc(c.org_dept)}</span></div>
    <table>
      <tr><th rowspan="4">인적<br>사항</th><th>성 명</th><td>${esc(p.full_name)}</td><th>생년월일</th><td>${esc(p.birthdate)}</td></tr>
      <tr><th>직장명</th><td>${esc(p.workplace)}</td><th>직위</th><td>${esc(p.position)}</td><th>휴대폰</th><td>${esc(p.mobile)}</td></tr>
      <tr><th>E-mail</th><td colspan="2">${esc(p.email)}</td><th>직장전화</th><td colspan="2">${esc(p.office_phone)}</td></tr>
      <tr><th>주요경력</th><td colspan="2">${career}</td><th>은행/계좌</th><td colspan="2">${esc(p.bank_name)} / ${esc(p.account_no)}</td></tr>
      <tr><th>강의일시</th><td colspan="2">${esc(c.lecture_at)}</td><th>기자재</th><td colspan="3">강사: ${esc(c.prep_teacher)} / 본원: ${esc(c.prep_center)} / 연수생: ${esc(c.prep_trainee)} (배치: ${esc(c.seating)})</td></tr>
      <tr><th>원고</th><td colspan="5">
        ${box(ms === "새 원고")} 새 원고 (${ms === "새 원고" ? esc(c.manuscript_pages) : ""})쪽 &nbsp;
        ${box(ms === "기존원고")} 기존원고 (${ms === "기존원고" ? esc(c.manuscript_pages) : ""})쪽 &nbsp;
        ${box(ms === "보완원고")} 보완원고 (${ms === "보완원고" ? esc(c.manuscript_pages) : ""})쪽
        ${ms === "보완원고" ? ` / 수정·보완 ${esc(c.manuscript_modified_pct ?? "")}% / 前 ${esc(c.prev_year)}년 ${esc(c.prev_course)}과정` : ""}
      </td></tr>
      <tr><th>원고활용<br>동의서</th><td colspan="5">강의원고·콘텐츠를 PDF 형태로 교직원 전문성 신장 자료로 활용하는 데 동의합니다. ( ${box(c.consent_manuscript)} 예 &nbsp; ${box(!c.consent_manuscript)} 아니요 )</td></tr>
      <tr><th>개인정보<br>동의서</th><td colspan="5">연수운영 및 수당지급 목적 수집·이용 및 제3자 제공(통합교육연수시스템 등록, 인력풀 공유, 소득신고)에 동의합니다. 보유기간: 최초 등록일부터 2년. 원천징수: ${esc(p.tax_type === "사업소득" ? "사업소득(3.3%)" : "기타소득(8.8%)")} / 수집·이용 ${box(p.consent_data)} 예 / 제3자 제공 ${box(p.consent_third)} 예</td></tr>
    </table>
    <div class="sign">${esc(c.written_date)} &nbsp;&nbsp; 성 명: ${esc(p.full_name)} (인)</div>
    <h1 style="font-size:20px;letter-spacing:6px">강사 유의사항 확인서</h1>
    <table><tr><th>안내 사항</th><th style="width:50px">확인</th></tr>${chk}</table>
    <div class="sign">본인은 「강사 유의사항」 및 「강사용 인권감수성 교육 자료」를 숙지·확인 후 출강하겠습니다.<br>${esc(c.written_date)} &nbsp;&nbsp; 성 명: ${esc(p.full_name)} (인)</div>`;
}

async function refreshCards() {
  const { data } = await sb.from("instructor_cards").select("id,business_name,lecture_at,created_at").order("created_at", { ascending: false }).limit(20);
  const boxEl = $("#cardList");
  boxEl.innerHTML = "";
  if (!data || !data.length) { boxEl.innerHTML = `<p class="muted">저장된 카드가 없습니다.</p>`; return; }
  data.forEach((r) => {
    const d = document.createElement("div");
    d.className = "saved-card";
    d.innerHTML = `<span class="grow"><b>${esc(r.business_name || "(제목 없음)")}</b><br><span class="muted">${esc(r.lecture_at || "")}</span></span>`;
    const b1 = document.createElement("button"); b1.className = "btn"; b1.textContent = "불러오기";
    b1.onclick = async () => {
      const { data: full } = await sb.from("instructor_cards").select("*").eq("id", r.id).single();
      if (full) { fillCard(full); renderPrint(profile(), full); window.scrollTo(0, 0); $("#cardMsg").textContent = "불러왔습니다. 인쇄 버튼을 누르세요."; }
    };
    const b2 = document.createElement("button"); b2.className = "btn"; b2.textContent = "삭제";
    b2.onclick = async () => {
      if (!confirm("삭제할까요?")) return;
      await sb.from("instructor_cards").delete().eq("id", r.id);
      refreshCards();
    };
    d.append(b1, b2);
    boxEl.appendChild(d);
  });
}

async function init() {
  const dark = localStorage.getItem("school-theme") || "light";
  document.documentElement.dataset.theme = dark;
  $("#themeBtn").textContent = dark === "dark" ? "☀️ 라이트" : "🌙 다크";
  $("#themeBtn").onclick = () => {
    const n = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = n;
    localStorage.setItem("school-theme", n);
    $("#themeBtn").textContent = n === "dark" ? "☀️ 라이트" : "🌙 다크";
  };

  renderChecks(null);
  sb = client();
  if (!sb) {
    $("#authMsg").textContent = "Supabase 미연결 상태입니다. js/config.js에 키를 입력하세요.";
    $("#loginBtn").disabled = true;
    return;
  }
  $("#loginBtn").onclick = async () => {
    $("#authMsg").textContent = "구글 로그인으로 이동합니다…";
    const { error } = await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: location.href.split("?")[0] },
    });
    if (error) $("#authMsg").textContent = "오류: " + error.message;
  };
  $("#logoutBtn").onclick = async () => { await sb.auth.signOut(); location.reload(); };

  const { data: { session } } = await sb.auth.getSession();
  user = session?.user || null;
  if (!user) return; // 로그인 전: 폼 숨김 유지

  $("#authOut").style.display = "none";
  $("#authIn").style.display = "";
  $("#app").style.display = "";
  $("#userMail").textContent = user.email + " 로그인됨";

  const { data: p } = await sb.from("instructor_profiles").select("*").eq("user_id", user.id).single();
  if (p) fillProfile(p);
  else if (user.email) $("#pEmail").value = user.email;

  $("#saveProfile").onclick = async () => {
    const row = { user_id: user.id, ...profile(), updated_at: new Date().toISOString() };
    const { error } = await sb.from("instructor_profiles").upsert(row);
    $("#profileMsg").textContent = error ? "❌ " + error.message : "✅ 저장됐습니다.";
  };

  $("#saveCard").onclick = async () => {
    const row = { user_id: user.id, ...cardInput(), consent_manuscript: true };
    const { error } = await sb.from("instructor_cards").insert(row);
    $("#cardMsg").textContent = error ? "❌ " + error.message : "✅ 저장됐습니다. 목록에서 불러와 인쇄하세요.";
    if (!error) { refreshCards(); renderPrint(profile(), row); }
  };

  $("#printBtn").onclick = () => { renderPrint(profile(), cardInput()); window.print(); };
  refreshCards();
}
init();
