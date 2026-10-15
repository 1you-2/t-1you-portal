// HWPX 생성기 v2 — 사용자 PC 한글 산출물 구조 그대로 복제
// 검증: header.xml / section0.xml / content.hpf / settings.xml 실측 기반
// 표는 균일 2열(병합 없음), 스타일은 기존 id만 참조 + 제목용 2개 추가
window.Hwpx = (() => {
  const XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>';
  const NS = 'xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app" xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph" xmlns:hp10="http://www.hancom.co.kr/hwpml/2016/paragraph" xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section" xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core" xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head" xmlns:hhs="http://www.hancom.co.kr/hwpml/2011/history" xmlns:hm="http://www.hancom.co.kr/hwpml/2011/master-page" xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf/" xmlns:ooxmlchart="http://www.hancom.co.kr/hwpml/2016/ooxmlchart" xmlns:hwpunitchar="http://www.hancom.co.kr/hwpml/2016/HwpUnitChar" xmlns:epub="http://www.idpf.org/2007/ops" xmlns:config="urn:oasis:names:tc:opendocument:xmlns:config:1.0"';

  // ---- 실측 secPr 그대로 (첫 문단에 필수) ----
  const SECPR = '<hp:secPr id="" textDirection="HORIZONTAL" spaceColumns="1134" tabStop="8000" tabStopVal="4000" tabStopUnit="HWPUNIT" outlineShapeIDRef="1" memoShapeIDRef="0" textVerticalWidthHead="0" masterPageCnt="0"><hp:grid lineGrid="0" charGrid="0" wonggojiFormat="0"/><hp:startNum pageStartsOn="BOTH" page="0" pic="0" tbl="0" equation="0"/><hp:visibility hideFirstHeader="0" hideFirstFooter="0" hideFirstMasterPage="0" border="SHOW_ALL" fill="SHOW_ALL" hideFirstPageNum="0" hideFirstEmptyLine="0" showLineNumber="0"/><hp:lineNumberShape restartType="0" countBy="0" distance="0" startNumber="0"/><hp:pagePr landscape="WIDELY" width="59528" height="84186" gutterType="LEFT_ONLY"><hp:margin header="4252" footer="4252" gutter="0" left="8504" right="8504" top="5668" bottom="4252"/></hp:pagePr><hp:footNotePr><hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/><hp:noteLine length="-1" type="SOLID" width="0.12 mm" color="#000000"/><hp:noteSpacing betweenNotes="283" belowLine="567" aboveLine="850"/><hp:numbering type="CONTINUOUS" newNum="1"/><hp:placement place="EACH_COLUMN" beneathText="0"/></hp:footNotePr><hp:endNotePr><hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/><hp:noteLine length="14692344" type="SOLID" width="0.1 mm" color="#000000"/><hp:noteSpacing betweenNotes="0" belowLine="567" aboveLine="850"/><hp:numbering type="CONTINUOUS" newNum="1"/><hp:placement place="END_OF_DOCUMENT" beneathText="0"/></hp:endNotePr><hp:pageBorderFill type="BOTH" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill><hp:pageBorderFill type="EVEN" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill><hp:pageBorderFill type="ODD" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill></hp:secPr><hp:ctrl><hp:colPr id="" type="NEWSPAPER" layout="LEFT" colCount="1" sameSz="1" sameGap="0"/></hp:ctrl>';

  // ---- 실측 header.xml 그대로 (뒤에서 제목용 2개만 추가) ----
  const HEADER_BASE = `${XML}<hh:head ${NS} version="1.5" secCnt="1"><hh:beginNum page="1" footnote="1" endnote="1" pic="1" tbl="1" equation="1"/><hh:refList><hh:fontfaces itemCnt="7"><hh:fontface lang="HANGUL" fontCnt="2"><hh:font id="0" face="함초롬돋움" type="TTF" isEmbedded="0"><hh:typeInfo familyType="FCAT_GOTHIC" weight="6" proportion="4" contrast="0" strokeVariation="1" armStyle="1" letterform="1" midline="1" xHeight="1"/></hh:font><hh:font id="1" face="함초롬바탕" type="TTF" isEmbedded="0"><hh:typeInfo familyType="FCAT_GOTHIC" weight="6" proportion="4" contrast="0" strokeVariation="1" armStyle="1" letterform="1" midline="1" xHeight="1"/></hh:font></hh:fontface><hh:fontface lang="LATIN" fontCnt="2"><hh:font id="0" face="함초롬돋움" type="TTF" isEmbedded="0"><hh:typeInfo familyType="FCAT_GOTHIC" weight="6" proportion="4" contrast="0" strokeVariation="1" armStyle="1" letterform="1" midline="1" xHeight="1"/></hh:font><hh:font id="1" face="함초롬바탕" type="TTF" isEmbedded="0"><hh:typeInfo familyType="FCAT_GOTHIC" weight="6" proportion="4" contrast="0" strokeVariation="1" armStyle="1" letterform="1" midline="1" xHeight="1"/></hh:font></hh:fontface><hh:fontface lang="HANJA" fontCnt="2"><hh:font id="0" face="함초롬돋움" type="TTF" isEmbedded="0"><hh:typeInfo familyType="FCAT_GOTHIC" weight="6" proportion="4" contrast="0" strokeVariation="1" armStyle="1" letterform="1" midline="1" xHeight="1"/></hh:font><hh:font id="1" face="함초롬바탕" type="TTF" isEmbedded="0"><hh:typeInfo familyType="FCAT_GOTHIC" weight="6" proportion="4" contrast="0" strokeVariation="1" armStyle="1" letterform="1" midline="1" xHeight="1"/></hh:font></hh:fontface><hh:fontface lang="JAPANESE" fontCnt="2"><hh:font id="0" face="함초롬돋움" type="TTF" isEmbedded="0"><hh:typeInfo familyType="FCAT_GOTHIC" weight="6" proportion="4" contrast="0" strokeVariation="1" armStyle="1" letterform="1" midline="1" xHeight="1"/></hh:font><hh:font id="1" face="함초롬바탕" type="TTF" isEmbedded="0"><hh:typeInfo familyType="FCAT_GOTHIC" weight="6" proportion="4" contrast="0" strokeVariation="1" armStyle="1" letterform="1" midline="1" xHeight="1"/></hh:font></hh:fontface><hh:fontface lang="OTHER" fontCnt="2"><hh:font id="0" face="함초롬돋움" type="TTF" isEmbedded="0"><hh:typeInfo familyType="FCAT_GOTHIC" weight="6" proportion="4" contrast="0" strokeVariation="1" armStyle="1" letterform="1" midline="1" xHeight="1"/></hh:font><hh:font id="1" face="함초롬바탕" type="TTF" isEmbedded="0"><hh:typeInfo familyType="FCAT_GOTHIC" weight="6" proportion="4" contrast="0" strokeVariation="1" armStyle="1" letterform="1" midline="1" xHeight="1"/></hh:font></hh:fontface><hh:fontface lang="SYMBOL" fontCnt="2"><hh:font id="0" face="함초롬돋움" type="TTF" isEmbedded="0"><hh:typeInfo familyType="FCAT_GOTHIC" weight="6" proportion="4" contrast="0" strokeVariation="1" armStyle="1" letterform="1" midline="1" xHeight="1"/></hh:font><hh:font id="1" face="함초롬바탕" type="TTF" isEmbedded="0"><hh:typeInfo familyType="FCAT_GOTHIC" weight="6" proportion="4" contrast="0" strokeVariation="1" armStyle="1" letterform="1" midline="1" xHeight="1"/></hh:font></hh:fontface><hh:fontface lang="USER" fontCnt="2"><hh:font id="0" face="함초롬돋움" type="TTF" isEmbedded="0"><hh:typeInfo familyType="FCAT_GOTHIC" weight="6" proportion="4" contrast="0" strokeVariation="1" armStyle="1" letterform="1" midline="1" xHeight="1"/></hh:font><hh:font id="1" face="함초롬바탕" type="TTF" isEmbedded="0"><hh:typeInfo familyType="FCAT_GOTHIC" weight="6" proportion="4" contrast="0" strokeVariation="1" armStyle="1" letterform="1" midline="1" xHeight="1"/></hh:font></hh:fontface></hh:fontfaces><hh:borderFills itemCnt="3"><hh:borderFill id="1" threeD="0" shadow="0" centerLine="NONE" breakCellSeparateLine="0"><hh:slash type="NONE" Crooked="0" isCounter="0"/><hh:backSlash type="NONE" Crooked="0" isCounter="0"/><hh:leftBorder type="NONE" width="0.1 mm" color="#000000"/><hh:rightBorder type="NONE" width="0.1 mm" color="#000000"/><hh:topBorder type="NONE" width="0.1 mm" color="#000000"/><hh:bottomBorder type="NONE" width="0.1 mm" color="#000000"/><hh:diagonal type="SOLID" width="0.1 mm" color="#000000"/></hh:borderFill><hh:borderFill id="2" threeD="0" shadow="0" centerLine="NONE" breakCellSeparateLine="0"><hh:slash type="NONE" Crooked="0" isCounter="0"/><hh:backSlash type="NONE" Crooked="0" isCounter="0"/><hh:leftBorder type="NONE" width="0.1 mm" color="#000000"/><hh:rightBorder type="NONE" width="0.1 mm" color="#000000"/><hh:topBorder type="NONE" width="0.1 mm" color="#000000"/><hh:bottomBorder type="NONE" width="0.1 mm" color="#000000"/><hh:diagonal type="SOLID" width="0.1 mm" color="#000000"/><hc:fillBrush><hc:winBrush faceColor="none" hatchColor="#999999" alpha="0"/></hc:fillBrush></hh:borderFill><hh:borderFill id="3" threeD="0" shadow="0" centerLine="NONE" breakCellSeparateLine="0"><hh:slash type="NONE" Crooked="0" isCounter="0"/><hh:backSlash type="NONE" Crooked="0" isCounter="0"/><hh:leftBorder type="SOLID" width="0.12 mm" color="#000000"/><hh:rightBorder type="SOLID" width="0.12 mm" color="#000000"/><hh:topBorder type="SOLID" width="0.12 mm" color="#000000"/><hh:bottomBorder type="SOLID" width="0.12 mm" color="#000000"/><hh:diagonal type="SOLID" width="0.1 mm" color="#000000"/></hh:borderFill></hh:borderFills><hh:charProperties itemCnt="7"><hh:charPr id="0" height="1000" textColor="#000000" shadeColor="none" useFontSpace="0" useKerning="0" symMark="NONE" borderFillIDRef="2"><hh:fontRef hangul="1" latin="1" hanja="1" japanese="1" other="1" symbol="1" user="1"/><hh:ratio hangul="100" latin="100" hanja="100" japanese="100" other="100" symbol="100" user="100"/><hh:spacing hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/><hh:relSz hangul="100" latin="100" hanja="100" japanese="100" other="100" symbol="100" user="100"/><hh:offset hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/><hh:underline type="NONE" shape="SOLID" color="#000000"/><hh:strikeout shape="NONE" color="#000000"/><hh:outline type="NONE"/><hh:shadow type="NONE" color="#C0C0C0" offsetX="10" offsetY="10"/></hh:charPr></hh:charProperties><hh:tabProperties itemCnt="3"><hh:tabPr id="0" autoTabLeft="0" autoTabRight="0"/><hh:tabPr id="1" autoTabLeft="1" autoTabRight="0"/><hh:tabPr id="2" autoTabLeft="0" autoTabRight="1"/></hh:tabProperties><hh:paraProperties itemCnt="20"><hh:paraPr id="0" tabPrIDRef="0" condense="0" fontLineHeight="0" snapToGrid="1" suppressLineNumbers="0" checked="0" textDir="LTR"><hh:align horizontal="JUSTIFY" vertical="BASELINE"/><hh:heading type="NONE" idRef="0" level="0"/><hh:breakSetting breakLatinWord="KEEP_WORD" breakNonLatinWord="KEEP_WORD" widowOrphan="0" keepWithNext="0" keepLines="0" pageBreakBefore="0" lineWrap="BREAK"/><hh:autoSpacing eAsianEng="0" eAsianNum="0"/><hh:margin><hc:intent value="0" unit="HWPUNIT"/><hc:left value="0" unit="HWPUNIT"/><hc:right value="0" unit="HWPUNIT"/><hc:prev value="0" unit="HWPUNIT"/><hc:next value="0" unit="HWPUNIT"/></hh:margin><hh:lineSpacing type="PERCENT" value="160" unit="HWPUNIT"/><hh:border borderFillIDRef="2" offsetLeft="0" offsetRight="0" offsetTop="0" offsetBottom="0" connect="0" ignoreMargin="0"/></hh:paraPr></hh:paraProperties><hh:styles itemCnt="23"><hh:style id="0" type="PARA" name="바탕글" engName="Normal" paraPrIDRef="0" charPrIDRef="0" nextStyleIDRef="0" langID="1042" lockForm="0"/></hh:styles></hh:refList><hh:compatibleDocument targetProgram="HWP201X"><hh:layoutCompatibility/></hh:compatibleDocument><hh:docOption><hh:linkinfo path="" pageInherit="0" footnoteInherit="0"/></hh:docOption><hh:metaTag>{"name":""}</hh:metaTag><hh:trackchageConfig flags="56"/></hh:head>`;

  // 제목용 추가 정의: 가운데정렬 문단(id 20) + 22pt 글자(id 7)
  function header() {
    const c0 = HEADER_BASE.match(/<hh:charPr id="0"[\s\S]*?<\/hh:charPr>/)[0];
    const c7 = c0.replace('id="0"', 'id="7"').replace('height="1000"', 'height="2200"');
    const p0 = HEADER_BASE.match(/<hh:paraPr id="0"[\s\S]*?<\/hh:paraPr>/)[0];
    const p20 = p0.replace('id="0"', 'id="20"').replace('horizontal="JUSTIFY"', 'horizontal="CENTER"');
    return HEADER_BASE
      .replace('<hh:charProperties itemCnt="7">', '<hh:charProperties itemCnt="8">')
      .replace('</hh:charProperties>', c7 + '</hh:charProperties>')
      .replace('<hh:paraProperties itemCnt="20">', '<hh:paraProperties itemCnt="21">')
      .replace('</hh:paraProperties>', p20 + '</hh:paraProperties>');
  }

  const HPF_PRE = `${XML}<opf:package ${NS} version="" unique-identifier="" id=""><opf:metadata><opf:title>`;
  const HPF_POST = `</opf:title><opf:language>ko</opf:language></opf:metadata><opf:manifest><opf:item id="header" href="Contents/header.xml" media-type="application/xml"/><opf:item id="section0" href="Contents/section0.xml" media-type="application/xml"/><opf:item id="settings" href="settings.xml" media-type="application/xml"/></opf:manifest><opf:spine><opf:itemref idref="header" linear="yes"/><opf:itemref idref="section0" linear="yes"/></opf:spine></opf:package>`;

  const CONTAINER = `${XML}<ocf:container xmlns:ocf="urn:oasis:names:tc:opendocument:xmlns:container" xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf"><ocf:rootfiles><ocf:rootfile full-path="Contents/content.hpf" media-type="application/hwpml-package+xml"/></ocf:rootfiles></ocf:container>`;

  const SETTINGS = `${XML}<ha:HWPApplicationSetting xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app" xmlns:config="urn:oasis:names:tc:opendocument:xmlns:config:1.0"><ha:CaretPosition listIDRef="0" paraIDRef="2" pos="0"/></ha:HWPApplicationSetting>`;

  const VERSION = `${XML}<hv:HCFVersion xmlns:hv="http://www.hancom.co.kr/hwpml/2011/version" tagetApplication="WORDPROCESSOR" major="5" minor="1" micro="1" buildNumber="0" os="1" xmlVersion="1.5" application="Hancom Office Hangul" appVersion="13, 0, 0, 4049 WIN32LEWindows_10"/>`;

  // 탐색기 미리보기용 텍스트 (실측: 본문 텍스트 나열)
  function prvText(pf, c) {
    const L = [];
    L.push("강 사 카 드", `사업명: ${c.business_name || ""}`, `기관: ${c.org_dept || ""}`);
    [["성명", pf.full_name], ["생년월일", pf.birthdate], ["직장명", pf.workplace],
     ["직위", pf.position], ["휴대폰", pf.mobile], ["직장전화", pf.office_phone],
     ["E-mail", pf.email], ["은행명", pf.bank_name], ["계좌번호", pf.account_no],
     ["강의일시", c.lecture_at], ["강사 준비", c.prep_teacher], ["본원 준비", c.prep_center],
     ["연수생 준비", c.prep_trainee], ["책걸상 배치", c.seating]
    ].forEach(([k, v]) => L.push(`<${k}>${v || ""}`));
    (pf.career_lines || []).forEach((s) => L.push(`<경력>${s}`));
    L.push("강사 유의사항 확인서");
    return L.join("\r\n");
  }

  const esc = (v) => String(v ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const lineseg = (h) => `<hp:linesegarray><hp:lineseg textpos="0" vertpos="0" vertsize="1000" textheight="1000" baseline="850" spacing="600" horzpos="0" horzsize="${h}" flags="393216"/></hp:linesegarray>`;
  const run = (cr, inner) => `<hp:run charPrIDRef="${cr}">${inner}</hp:run>`;
  const t = (s) => `<hp:t>${esc(s)}</hp:t>`;
  // 본문 문단 (paraPr 0 + charPr 0, 실측 그대로)
  const para = (id, text) =>
    `<hp:p id="${id}" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">` +
    `${run("0", t(text))}${lineseg(42520)}</hp:p>`;
  // 제목 문단 (가운데 + 22pt)
  const title = (id, text) =>
    `<hp:p id="${id}" paraPrIDRef="20" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">` +
    `${run("7", t(text))}${lineseg(42520)}</hp:p>`;

  const W_LABEL = 12000, W_VALUE = 29954; // 합 41954 (실측 표폭)
  const SUBLIST = 'id="" textDirection="HORIZONTAL" lineWrap="BREAK" vertAlign="CENTER" linkListIDRef="0" linkListNextIDRef="0" textWidth="0" textHeight="0" hasTextRef="0" hasNumRef="0"';

  function cellParas(lines, width) {
    const arr = (lines && lines.length ? lines : [""]);
    return arr.map((s) =>
      `<hp:p id="0" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">` +
      `${run("0", t(s))}${lineseg(width - 1021)}</hp:p>`).join("");
  }

  function tc(col, row, lines, width) {
    const h = 282 * Math.max(1, (lines && lines.length) || 1);
    return `<hp:tc name="" header="0" hasMargin="0" protect="0" editable="0" dirty="0" borderFillIDRef="3">` +
      `<hp:subList ${SUBLIST}>${cellParas(lines, width)}</hp:subList>` +
      `<hp:cellAddr colAddr="${col}" rowAddr="${row}"/>` +
      `<hp:cellSpan colSpan="1" rowSpan="1"/>` +
      `<hp:cellSz width="${width}" height="${h}"/>` +
      `<hp:cellMargin left="510" right="510" top="141" bottom="141"/></hp:tc>`;
  }

  let tblSeq = 1221030976;
  // rows: [[라벨, [내용줄...]], ...] 균일 2열
  function table(rows) {
    const id = tblSeq++;
    const trs = rows.map((r, i) =>
      `<hp:tr>${tc(0, i, [r[0]], W_LABEL)}${tc(1, i, r[1], W_VALUE)}</hp:tr>`).join("");
    return `<hp:tbl id="${id}" zOrder="0" numberingType="TABLE" textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" lock="0" dropcapstyle="None" pageBreak="CELL" repeatHeader="1" rowCnt="${rows.length}" colCnt="2" cellSpacing="0" borderFillIDRef="3" noAdjust="0">` +
      `<hp:sz width="41954" widthRelTo="ABSOLUTE" height="${1282 * rows.length}" heightRelTo="ABSOLUTE" protect="0"/>` +
      `<hp:pos treatAsChar="0" affectLSpacing="0" flowWithText="1" allowOverlap="0" holdAnchorAndSO="0" vertRelTo="PARA" horzRelTo="COLUMN" vertAlign="TOP" horzAlign="LEFT" vertOffset="0" horzOffset="0"/>` +
      `<hp:outMargin left="283" right="283" top="283" bottom="283"/>` +
      `<hp:inMargin left="510" right="510" top="141" bottom="141"/>${trs}</hp:tbl>`;
  }

  // 표 포함 문단 (실측: p > run > tbl + 빈 t)
  function tablePara(id, rows) {
    return `<hp:p id="${id}" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">` +
      `${run("0", table(rows) + "<hp:t/>")}${lineseg(0)}</hp:p>`;
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
    let pid = 1;
    const ms = c.manuscript_type || "새 원고";
    const msLine = ms === "새 원고"
      ? `☑ 새 원고 (${c.manuscript_pages || 0})쪽  ☐ 기존원고  ☐ 보완원고`
      : ms === "기존원고"
        ? `☐ 새 원고  ☑ 기존원고 (${c.manuscript_pages || 0})쪽  ☐ 보완원고`
        : `☐ 새 원고  ☐ 기존원고  ☑ 보완원고 (${c.manuscript_pages || 0})쪽 / 수정·보완 ${c.manuscript_modified_pct ?? ""}% / 前 ${c.prev_year || ""}년 ${c.prev_course || ""}과정`;
    const tax = pf.tax_type === "사업소득" ? "사업소득(3.3%)" : "기타소득(8.8%)";
    const parts = [];
    // 첫 문단: secPr + 제목
    parts.push(`<hp:p id="${pid++}" paraPrIDRef="20" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">` +
      `<hp:run charPrIDRef="7">${SECPR}</hp:run>${run("7", t("강 사 카 드"))}${lineseg(42520)}</hp:p>`);
    parts.push(para(pid++, `사업명: ${c.business_name || ""}`));
    parts.push(para(pid++, `기관: ${c.org_dept || ""}`));
    parts.push(tablePara(pid++, [
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
    ]));
    parts.push(tablePara(pid++, [
      ["강의일시", [c.lecture_at || ""]],
      ["강사 준비", [c.prep_teacher || ""]],
      ["본원 준비", [c.prep_center || ""]],
      ["연수생 준비", [c.prep_trainee || ""]],
      ["책걸상 배치", [c.seating || ""]],
      ["원고", [msLine]],
    ]));
    parts.push(para(pid++, `원고활용 동의: 강의원고·콘텐츠를 PDF 형태로 교직원 전문성 신장 자료로 활용하는 데 동의합니다. ( ${box(c.consent_manuscript !== false)} 예  ${box(c.consent_manuscript === false)} 아니요 )`));
    parts.push(para(pid++, `개인정보 수집·이용 및 제3자 제공(연수운영·수당지급, 통합교육연수시스템 등록, 인력풀 공유, 소득신고)에 동의합니다. 보유기간: 최초 등록일부터 2년. ( ☑ 예 )`));
    parts.push(title(pid++, `${c.written_date || ""}   성명: ${pf.full_name || ""} (인)`));
    parts.push(title(pid++, `강사 유의사항 확인서`));
    parts.push(tablePara(pid++, [["안내 사항", ["확인"]]].concat(
      CHECKS.map((s, i) => [`${i + 1}. ${s}`, [(c.checklist && c.checklist["c" + (i + 1)]) ? "✔" : ""]])
    )));
    parts.push(para(pid++, `본인은 「강사 유의사항」 및 「강사용 인권감수성 교육 자료」를 숙지·확인 후 출강하겠습니다.`));
    parts.push(title(pid++, `${c.written_date || ""}   성명: ${pf.full_name || ""} (인)`));
    // 끝 빈 문단 (실측)
    parts.push(`<hp:p id="${pid++}" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">` +
      `<hp:run charPrIDRef="0"/>${lineseg(42520)}</hp:p>`);
    return `${XML}<hs:sec ${NS}>${parts.join("")}</hs:sec>`;
  }

  async function download(pf, c) {
    if (!window.JSZip) throw new Error("ZIP 라이브러리 로드 실패 (인터넷 연결 확인)");
    const zip = new JSZip();
    zip.file("mimetype", "application/hwp+zip", { compression: "STORE" });
    zip.file("META-INF/container.xml", CONTAINER);
    zip.file("Contents/content.hpf", HPF_PRE + esc(`강사카드 ${pf.full_name || ""}`) + HPF_POST);
    zip.file("Contents/header.xml", header());
    zip.file("Contents/section0.xml", section(pf, c));
    zip.file("settings.xml", SETTINGS);
    zip.file("version.xml", VERSION);
    zip.file("Preview/PrvText.txt", prvText(pf, c));
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
