// HWPX 생성기 v1 (실험적)
// HWPX = ZIP 패키지. mimetype 무압축 선행 저장이 필수.
// 복잡한 병합표는 피하고 균일 2열 표만 사용 (유효성 리스크 최소화).
// 이 환경에 한글 프로그램이 없어 로컬 검증 불가 → HWP 실측 후 조정.
window.Hwpx = (() => {
  const NS_SEC = 'xmlns:hs="http://www.hancom.co.kr/hwpml/schema/section" xmlns:hp="http://www.hancom.co.kr/hwpml/schema/paragraph"';
  const HEAD_NS = 'xmlns:hh="http://www.hancom.co.kr/hwpml/schema/head"';
  const XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>';
  // HWPUNIT: 1/7200인치. A4 유효폭(좌우 30mm 여백) 약 42500
  const W_LABEL = 12000, W_VALUE = 30500, ROW_H = 900;

  const esc = (v) => String(v ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // 본문 단락 (style 0 상속, 서식 없음 → 가장 안전한 형태)
  function p(text, center, big) {
    const pr = center ? `<hp:pPr><hp:align><hp:horizontal align="CENTER"/></hp:align></hp:pPr>` : "";
    const run = big
      ? `<hp:run><hp:cPr><hp:sz value="22"/><hp:bold/></hp:cPr><hp:t>${esc(text)}</hp:t></hp:run>`
      : `<hp:run><hp:t>${esc(text)}</hp:t></hp:run>`;
    return `<hp:p>${pr}${run}</hp:p>`;
  }

  function cellPs(lines) {
    const arr = (lines && lines.length ? lines : [""]).map((t) => p(t));
    return `<hp:subList>${arr.join("")}</hp:subList>`;
  }

  function tc(col, row, lines, width) {
    return `<hp:tc><hp:cellAddr><hp:colAddr>${col}</hp:colAddr><hp:rowAddr>${row}</hp:rowAddr></hp:cellAddr>` +
      `<hp:cellSpan><hp:colSpan>1</hp:colSpan><hp:rowSpan>1</hp:rowSpan></hp:cellSpan>` +
      `<hp:cellSz><hp:width>${width}</hp:width><hp:height>${ROW_H}</hp:height></hp:cellSz>` +
      `${cellPs(lines)}</hp:tc>`;
  }

  // rows: [[라벨, 내용줄배열], ...] — 균일 2열, 병합 없음
  function table(rows) {
    const trs = rows.map((r, i) =>
      `<hp:tr>${tc(0, i, [r[0]], W_LABEL)}${tc(1, i, r[1], W_VALUE)}</hp:tr>`).join("");
    return `<hp:tbl><hp:tblPr><hp:tblAlign><hp:horizontal align="LEFT"/></hp:tblAlign></hp:tblPr>` +
      `<hp:tblGrid><hp:gridCol><hp:width>${W_LABEL}</hp:width></hp:gridCol>` +
      `<hp:gridCol><hp:width>${W_VALUE}</hp:width></hp:gridCol></hp:tblGrid>${trs}</hp:tbl>`;
  }

  function header() {
    return `${XML}<hh:head ${HEAD_NS} version="1.4" secCnt="1">` +
      `<hh:beginNum page="1" footnote="1" endnote="1" pic="1" tbl="1" equation="1"/>` +
      `<hh:refList><hh:fontfaces>` +
      `<hh:fontface lang="HANGUL" fontType="TTF" name="함초롱바탕" id="0"/>` +
      `<hh:fontface lang="LATIN" fontType="TTF" name="함초롱바탕" id="1"/>` +
      `<hh:fontface lang="HANJA" fontType="TTF" name="함초롱바탕" id="2"/>` +
      `<hh:fontface lang="JAPANESE" fontType="TTF" name="함초롱바탕" id="3"/>` +
      `<hh:fontface lang="OTHER" fontType="TTF" name="함초롱바탕" id="4"/>` +
      `<hh:fontface lang="SYMBOL" fontType="TTF" name="함초롱바탕" id="5"/>` +
      `<hh:fontface lang="USER" fontType="TTF" name="함초롱바탕" id="6"/>` +
      `</hh:fontfaces>` +
      `<hh:borderFills><hh:borderFill id="0" threeD="false" shadow="false" centerLine="NONE" breakCell="false">` +
      `<hh:leftBorder type="SOLID" width="0.12mm" color="000000"/>` +
      `<hh:rightBorder type="SOLID" width="0.12mm" color="000000"/>` +
      `<hh:topBorder type="SOLID" width="0.12mm" color="000000"/>` +
      `<hh:bottomBorder type="SOLID" width="0.12mm" color="000000"/>` +
      `</hh:borderFill></hh:borderFills>` +
      `<hh:charProperties><hh:charProperty id="0"/></hh:charProperties>` +
      `<hh:paraProperties><hh:paraProperty id="0"/></hh:paraProperties>` +
      `<hh:styles><hh:style id="0" name="바탕글" paraPrIDRef="0" charPrIDRef="0" nextStyleIDRef="0" langID="0"/></hh:styles>` +
      `</hh:refList></hh:head>`;
  }

  function hpf() {
    return `${XML}<opf:package xmlns:opf="http://www.idpf.org/2007/opf/" version="2.0" unique-identifier="uid">` +
      `<opf:metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>강사카드</dc:title>` +
      `<dc:creator>학교 업무 원샷</dc:creator></opf:metadata>` +
      `<opf:manifest><opf:item id="header" href="header.xml" media-type="application/xml"/>` +
      `<opf:item id="section0" href="section0.xml" media-type="application/xml"/></opf:manifest>` +
      `<opf:spine><opf:itemref idref="section0"/></opf:spine></opf:package>`;
  }

  function container() {
    return `${XML}<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">` +
      `<rootfiles><rootfile full-path="Contents/content.hpf" media-type="application/hwpml-package+xml"/>` +
      `</rootfiles></container>`;
  }

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

  function section(pf, c) {
    const ms = c.manuscript_type || "새 원고";
    const msLine = ms === "새 원고"
      ? `☑ 새 원고 (${c.manuscript_pages || 0})쪽  ☐ 기존원고  ☐ 보완원고`
      : ms === "기존원고"
        ? `☐ 새 원고  ☑ 기존원고 (${c.manuscript_pages || 0})쪽  ☐ 보완원고`
        : `☐ 새 원고  ☐ 기존원고  ☑ 보완원고 (${c.manuscript_pages || 0})쪽 / 수정·보완 ${c.manuscript_modified_pct ?? ""}% / 前 ${c.prev_year || ""}년 ${c.prev_course || ""}과정`;
    const tax = pf.tax_type === "사업소득" ? "사업소득(3.3%)" : "기타소득(8.8%)";
    const chkRows = [["안내 사항", ["확인"]]].concat(
      CHECKS.map((t, i) => [`${i + 1}. ${t}`, [(c.checklist && c.checklist["c" + (i + 1)]) ? "✔" : ""]])
    );
    const body =
      p("강 사 카 드", true, true) +
      p(`사업명: ${c.business_name || ""}`) +
      p(`기관: ${c.org_dept || ""}`) +
      table([
        ["성명", [pf.full_name || ""]],
        ["생년월일", [pf.birthdate || ""]],
        ["직장명", [pf.workplace || ""]],
        ["직위", [pf.position || ""]],
        ["휴대폰", [pf.mobile || ""]],
        ["직장전화", [pf.office_phone || ""]],
        ["E-mail", [pf.email || ""]],
        ["주요경력", (pf.career_lines && pf.career_lines.length ? pf.career_lines : [""])],
        ["은행명", [pf.bank_name || ""]],
        ["계좌번호", [pf.account_no || ""]],
        ["원천징수", [tax]],
      ]) +
      table([
        ["강의일시", [c.lecture_at || ""]],
        ["강사 준비", [c.prep_teacher || ""]],
        ["본원 준비", [c.prep_center || ""]],
        ["연수생 준비", [c.prep_trainee || ""]],
        ["책걸상 배치", [c.seating || ""]],
        ["원고", [msLine]],
      ]) +
      p(`원고활용 동의: 본인은 강의원고·콘텐츠를 PDF 형태로 교직원 전문성 신장 자료로 활용하는 데 동의합니다. ( ${box(c.consent_manuscript !== false)} 예  ${box(c.consent_manuscript === false)} 아니요 )`) +
      p(`개인정보 수집·이용 및 제3자 제공(연수운영·수당지급, 통합교육연수시스템 등록, 인력풀 공유, 소득신고)에 동의합니다. 보유기간: 최초 등록일부터 2년. ( ☑ 예 )`) +
      p(`${c.written_date || ""}   성명: ${pf.full_name || ""} (인)`, true, false) +
      p("강사 유의사항 확인서", true, true) +
      table(chkRows) +
      p(`본인은 「강사 유의사항」 및 「강사용 인권감수성 교육 자료」를 숙지·확인 후 출강하겠습니다.`, false, false) +
      p(`${c.written_date || ""}   성명: ${pf.full_name || ""} (인)`, true, false);
    return `${XML}<hs:sec ${NS_SEC}>${body}</hs:sec>`;
  }

  async function download(pf, c) {
    if (!window.JSZip) throw new Error("ZIP 라이브러리 로드 실패 (인터넷 연결 확인)");
    const zip = new JSZip();
    zip.file("mimetype", "application/hwp+zip", { compression: "STORE" });
    zip.file("META-INF/container.xml", container());
    zip.file("Contents/content.hpf", hpf());
    zip.file("Contents/header.xml", header());
    zip.file("Contents/section0.xml", section(pf, c));
    const blob = await zip.generateAsync({ type: "blob", mimeType: "application/hwp+zip" });
    const date = (c.written_date || "").replace(/[^0-9]/g, "") || "00000000";
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `강사카드_${(pf.full_name || "무명").replace(/\s/g, "")}_${date}.hwpx`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
  }

  return { download };
})();
