
const PRODUCT_SCHEMAS = {
  "Mobiltelefon": [
    { id: "brand", label: "Märke", placeholder: "Exempel: Apple, Samsung", required: true },
    { id: "model", label: "Modell", placeholder: "Exempel: iPhone 15 Pro", required: true },
    { id: "imei", label: "IMEI / serienummer", placeholder: "IMEI eller serienummer", required: false },
    { id: "storage", label: "Lagring", placeholder: "Exempel: 256 GB", required: false }
  ],
  "Dator": [
    { id: "brand", label: "Märke", placeholder: "Exempel: Apple, Lenovo, HP", required: true },
    { id: "model", label: "Modell", placeholder: "Exempel: MacBook Pro 14", required: true },
    { id: "serial", label: "Serienummer", placeholder: "Serienummer", required: false },
    { id: "specs", label: "Specifikation", placeholder: "Exempel: M3, 16 GB RAM, 512 GB SSD", required: false }
  ],
  "Cykel": [
    { id: "brand", label: "Märke", placeholder: "Exempel: Trek, Crescent", required: true },
    { id: "model", label: "Modell", placeholder: "Modellnamn", required: false },
    { id: "frameNumber", label: "Ramnummer", placeholder: "Ramnummer", required: false },
    { id: "frameSize", label: "Ramstorlek", placeholder: "Exempel: 54 cm / Large", required: false }
  ],
  "Elcykel": [
    { id: "brand", label: "Märke", placeholder: "Exempel: Trek, Crescent", required: true },
    { id: "model", label: "Modell", placeholder: "Modellnamn", required: false },
    { id: "frameNumber", label: "Ramnummer", placeholder: "Ramnummer", required: false },
    { id: "batteryInfo", label: "Batteri", placeholder: "Kapacitet, serienummer eller skick", required: false }
  ],
  "Verktyg / maskin": [
    { id: "brand", label: "Märke", placeholder: "Exempel: Makita, Bosch", required: true },
    { id: "model", label: "Modell", placeholder: "Modellbeteckning", required: true },
    { id: "serial", label: "Serienummer", placeholder: "Serienummer", required: false },
    { id: "hours", label: "Drifttid / timmar", placeholder: "Om tillämpligt", required: false }
  ],
  "Moped": [
    { id: "brand", label: "Märke", placeholder: "Märke", required: true },
    { id: "model", label: "Modell", placeholder: "Modell", required: true },
    { id: "registration", label: "Registreringsnummer", placeholder: "ABC123", required: true },
    { id: "vin", label: "Chassi-/VIN-nummer", placeholder: "Chassinummer", required: false },
    { id: "mileage", label: "Mätarställning", placeholder: "Exempel: 1 250 km", required: false }
  ],
  "MC": [
    { id: "brand", label: "Märke", placeholder: "Märke", required: true },
    { id: "model", label: "Modell", placeholder: "Modell", required: true },
    { id: "registration", label: "Registreringsnummer", placeholder: "ABC123", required: true },
    { id: "vin", label: "Chassi-/VIN-nummer", placeholder: "Chassinummer", required: false },
    { id: "mileage", label: "Mätarställning", placeholder: "Exempel: 18 500 km", required: false },
    { id: "year", label: "Årsmodell", placeholder: "Exempel: 2021", required: false }
  ],
  "Båt": [
    { id: "brand", label: "Märke / fabrikat", placeholder: "Exempel: Buster", required: true },
    { id: "model", label: "Modell", placeholder: "Modell", required: false },
    { id: "hullId", label: "Skrovnummer / CIN", placeholder: "Skrovnummer", required: false },
    { id: "engine", label: "Motor", placeholder: "Märke, modell, effekt", required: false },
    { id: "engineSerial", label: "Motorns serienummer", placeholder: "Serienummer", required: false },
    { id: "year", label: "Årsmodell", placeholder: "Exempel: 2019", required: false }
  ],
  "Bil": [
    { id: "brand", label: "Märke", placeholder: "Exempel: Volvo", required: true },
    { id: "model", label: "Modell", placeholder: "Exempel: XC60", required: true },
    { id: "registration", label: "Registreringsnummer", placeholder: "ABC123", required: true },
    { id: "vin", label: "Chassi-/VIN-nummer", placeholder: "VIN", required: false },
    { id: "mileage", label: "Mätarställning", placeholder: "Exempel: 12 450 mil", required: true },
    { id: "year", label: "Årsmodell", placeholder: "Exempel: 2020", required: false }
  ],
  "Övrigt": [
    { id: "brand", label: "Märke / tillverkare", placeholder: "Om relevant", required: false },
    { id: "model", label: "Modell / beteckning", placeholder: "Om relevant", required: false },
    { id: "serial", label: "Serienummer / identifiering", placeholder: "Om relevant", required: false }
  ]
};

const ERROR_CATALOG = [
  {
    code: "KA-BLD-001",
    area: "builder",
    function: "getFormData()",
    short: "Läser in användarens formulärdata.",
    cause: "Ett eller flera formulärfält saknas i DOM eller har bytt id.",
    fix: "Kontrollera att alla id:n i index.html matchar getFormData()."
  },
  {
    code: "KA-VAL-001",
    area: "validation",
    function: "validateForm(data)",
    short: "Kontrollerar obligatoriska fält innan underlaget byggs.",
    cause: "Pris, säljare eller köpare saknas eller är ogiltigt.",
    fix: "Kontrollera inmatningen och valideringsreglerna i validateForm()."
  },
  {
    code: "KA-PRV-001",
    area: "preview",
    function: "renderPreview(data)",
    short: "Bygger HTML-förhandsgranskningen av köpeunderlaget.",
    cause: "Dataobjektet saknar förväntade egenskaper eller HTML-renderingen kraschar.",
    fix: "Kontrollera data från getFormData() och template-strängen i renderPreview()."
  },
  {
    code: "KA-PRT-001",
    area: "print",
    function: "printDocument()",
    short: "Startar webbläsarens utskrift / Spara som PDF.",
    cause: "Utskrift blockeras eller förhandsgranskningen har inte skapats.",
    fix: "Skapa förhandsgranskning först och kontrollera window.print()."
  },
  {
    code: "KA-ADM-001",
    area: "admin",
    function: "searchErrors()",
    short: "Söker i felregistret efter kod, funktion eller beskrivning.",
    cause: "Felregistret kan inte läsas eller sökfältet returnerar oväntat värde.",
    fix: "Kontrollera ERROR_CATALOG och searchErrors()."
  },
  {
    code: "KA-ADM-002",
    area: "admin",
    function: "renderRuntimeLog()",
    short: "Visar senaste runtime-fel som loggats av appen.",
    cause: "localStorage är blockerad eller loggdata är trasig.",
    fix: "Rensa nyckeln klaraffar_runtime_errors i localStorage och ladda om."
  },
  {
    code: "KA-UI-001",
    area: "builder",
    function: "setDocumentType(type)",
    short: "Styr vilka fält som visas för köpeavtal eller kvitto.",
    cause: "Fel dokumenttyp eller ett villkorligt fält visas i fel flöde.",
    fix: "Kontrollera visningsreglerna i setDocumentType()."
  },
  {
    code: "KA-UI-002",
    area: "builder",
    function: "updateItemTypeFields()",
    short: "Visar fritextfält när användaren väljer Övrigt som varutyp.",
    cause: "Fritextfältet visas inte, döljs inte eller behåller gammalt värde.",
    fix: "Kontrollera itemType, customItemTypeWrap och updateItemTypeFields()."
  },
  {
    code: "KA-UI-003",
    area: "builder",
    function: "renderProductFields()",
    short: "Bygger produktspecifika fält utifrån vald varutyp.",
    cause: "Fel schema, saknade fält eller ett dynamiskt fält kan inte renderas.",
    fix: "Kontrollera PRODUCT_SCHEMAS, itemType och renderProductFields()."
  },
  {
    code: "KA-CASE-001",
    area: "builder",
    function: "saveCase()",
    short: "Skapar och sparar ett nytt affärsärende.",
    cause: "Formulärdata är ogiltig eller localStorage kan inte skrivas.",
    fix: "Kontrollera valideringen och klaraffar_cases i localStorage."
  },
  {
    code: "KA-CASE-002",
    area: "builder",
    function: "renderCases()",
    short: "Visar sparade ärenden i Mina ärenden.",
    cause: "Sparad ärendedata är trasig eller filtreringen misslyckas.",
    fix: "Kontrollera klaraffar_cases och renderCases()."
  },
  {
    code: "KA-CASE-003",
    area: "builder",
    function: "renderCaseDetail(caseId)",
    short: "Öppnar ett sparat ärende och visar roller, status och affärsdata.",
    cause: "Ärendet saknas eller har ofullständig data.",
    fix: "Kontrollera ärende-ID och datan i klaraffar_cases."
  },
  {
    code: "KA-PDF-001",
    area: "print",
    function: "downloadPdf()",
    short: "Skapar och laddar ner en riktig PDF-fil från dokumentuppgifterna.",
    cause: "PDF-innehållet kunde inte byggas eller filhämtningen misslyckades.",
    fix: "Kontrollera buildPdfLines(), createSimplePdf() och downloadPdf()."
  },
  {
    code: "KA-DOC-001",
    area: "preview",
    function: "renderPreview(data)",
    short: "Bygger professionell dokumentlayout med dokument-ID och signaturdel.",
    cause: "Dokumentdata saknas eller dokumentmallen kan inte renderas.",
    fix: "Kontrollera getFormData(), validateForm() och renderPreview()."
  }
];

const $ = (id) => document.getElementById(id);

let currentDocType = "agreement";

function setDocumentType(type) {
  currentDocType = type;

  document.querySelectorAll(".doc-option").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.doc === type);
  });

  const help = {
    agreement: "Köpeavtal: används för att dokumentera villkoren för affären.",
    receipt: "Kvitto: används för att bekräfta att betalning och överlämning har genomförts.",
  };
  $("docTypeHelp").textContent = help[type];

  const paymentWrap = $("paymentReceivedWrap");
  const paymentBox = $("paymentReceived");

  // Betalningsbekräftelse hör endast till kvittoflödet.
  if (type === "receipt") {
    paymentWrap.classList.remove("hidden-field");
  } else {
    paymentWrap.classList.add("hidden-field");
    paymentBox.checked = false;
  }

  // Ett rent kvitto bekräftar en genomförd betalning.
  if (type === "receipt") {
    paymentBox.checked = true;
  }
}

function logRuntimeError(code, err, extra = "") {
  try {
    const catalog = ERROR_CATALOG.find(x => x.code === code);
    const log = JSON.parse(localStorage.getItem("klaraffar_runtime_errors") || "[]");
    log.unshift({
      time: new Date().toISOString(),
      code,
      function: catalog?.function || "Okänd funktion",
      message: String(err?.message || err || "Okänt fel"),
      extra
    });
    localStorage.setItem("klaraffar_runtime_errors", JSON.stringify(log.slice(0, 20)));
  } catch (_) {}
}


function getActiveProductSchema() {
  return PRODUCT_SCHEMAS[$("itemType").value] || [];
}

function renderProductFields() {
  try {
    const schema = getActiveProductSchema();
    const container = $("productDetails");
    const oldValues = {};

    container.querySelectorAll("input").forEach(input => {
      oldValues[input.dataset.productField] = input.value;
    });

    container.innerHTML = schema.map(field => `
      <label>${esc(field.label)}${field.required ? " *" : ""}
        <input
          data-product-field="${esc(field.id)}"
          id="product_${esc(field.id)}"
          placeholder="${esc(field.placeholder || "")}"
          ${field.required ? 'data-required="true"' : ""}
        />
      </label>
    `).join("");

    schema.forEach(field => {
      const input = $(`product_${field.id}`);
      if (input && oldValues[field.id]) input.value = oldValues[field.id];
    });

    $("productDetailsHelp").textContent =
      schema.length
        ? "Fälten nedan är anpassade för " + $("itemType").value.toLowerCase() + "."
        : "Inga extra produktuppgifter krävs för vald kategori.";
  } catch (err) {
    logRuntimeError("KA-UI-003", err);
  }
}

function getProductDetails() {
  const result = {};
  document.querySelectorAll("[data-product-field]").forEach(input => {
    result[input.dataset.productField] = input.value.trim();
  });
  return result;
}

function getProductDetailRows(data) {
  const schema = PRODUCT_SCHEMAS[data.itemType] || [];
  const rows = [];
  for (const field of schema) {
    const value = data.productDetails?.[field.id];
    if (value) {
      rows.push(`<div class="row"><span>${esc(field.label)}</span><span>${esc(value)}</span></div>`);
    }
  }
  return rows.join("");
}

function getFormData() {
  try {
    return {
      itemType: $("itemType").value,
      customItemType: $("customItemType").value.trim(),
      productDetails: getProductDetails(),
      price: $("price").value.trim(),
      seller: $("seller").value.trim(),
      sellerEmail: $("sellerEmail").value.trim(),
      sellerPhone: $("sellerPhone").value.trim(),
      buyer: $("buyer").value.trim(),
      buyerEmail: $("buyerEmail").value.trim(),
      buyerPhone: $("buyerPhone").value.trim(),
      serial: $("serial").value.trim(),
      paymentMethod: $("paymentMethod").value,
      paymentReceived: $("paymentReceived").checked,
      place: $("place").value.trim(),
      documentDate: $("documentDate").value,
      documentType: currentDocType,
      description: $("description").value.trim(),
      knownIssues: $("knownIssues").value.trim(),
      included: $("included").value.trim(),
      terms: $("terms").value.trim(),
      date: new Date().toLocaleDateString("sv-SE")
    };
  } catch (err) {
    logRuntimeError("KA-BLD-001", err);
    throw err;
  }
}

function validateForm(data) {
  try {
    const errors = [];
    if (data.itemType === "Övrigt" && !data.customItemType) errors.push("Beskriv vad som säljs.");

    const schema = PRODUCT_SCHEMAS[data.itemType] || [];
    schema.filter(field => field.required).forEach(field => {
      if (!data.productDetails?.[field.id]) {
        errors.push(field.label + " saknas.");
      }
    });

    if (!data.seller) errors.push("Säljare saknas.");
    if (!data.sellerEmail || !data.sellerEmail.includes("@")) errors.push("Säljarens e-post saknas eller är ogiltig.");
    if (!data.buyer) errors.push("Köpare saknas.");
    if (!data.buyerEmail || !data.buyerEmail.includes("@")) errors.push("Köparens e-post saknas eller är ogiltig.");
    if (!data.place) errors.push("Ort saknas.");
    if (!data.documentDate) errors.push("Datum saknas.");
    if (!data.price || Number(data.price) < 0) errors.push("Pris saknas eller är ogiltigt.");
    if (data.documentType === "receipt" && !data.paymentReceived) {
      errors.push("För ett kvitto måste betalning vara markerad som mottagen.");
    }
    return errors;
  } catch (err) {
    logRuntimeError("KA-VAL-001", err);
    throw err;
  }
}

function esc(v="") {
  return v.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}


let currentDocumentId = null;

function getDocumentId() {
  if (!currentDocumentId) currentDocumentId = generateCaseId();
  return currentDocumentId;
}

function resetDocumentId() {
  currentDocumentId = null;
}

function formatDateSv(dateValue) {
  if (!dateValue) return "";
  const parts = dateValue.split("-");
  if (parts.length !== 3) return dateValue;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function renderPreview(data) {
  try {
    const errors = validateForm(data);
    if (errors.length) {
      $("preview").classList.add("empty");
      $("preview").innerHTML = "<strong>Kontrollera:</strong><br>" + errors.map(esc).join("<br>");
      return false;
    }

    $("preview").classList.remove("empty");

    const displayItemType = data.itemType === "Övrigt" ? data.customItemType : data.itemType;
    const docId = getDocumentId();
    const docTitle = data.documentType === "agreement" ? "Köpeavtal" : "Kvitto";

    const common = `
      <div class="document-title">
        <div>
          <h3>${docTitle} – ${esc(displayItemType)}</h3>
          <div class="document-id">Dokument-ID: ${esc(docId)}</div>
        </div>
        <div><strong>${esc(data.place)}</strong><br>${esc(formatDateSv(data.documentDate))}</div>
      </div>

      <div class="row"><span>Säljare</span><span>${esc(data.seller)}</span></div>
      <div class="row"><span>Säljarens e-post</span><span>${esc(data.sellerEmail)}</span></div>
      <div class="row"><span>Säljarens telefon</span><span>${esc(data.sellerPhone || "Ej angivet")}</span></div>
      <div class="row"><span>Köpare</span><span>${esc(data.buyer)}</span></div>
      <div class="row"><span>Köparens e-post</span><span>${esc(data.buyerEmail)}</span></div>
      <div class="row"><span>Köparens telefon</span><span>${esc(data.buyerPhone || "Ej angivet")}</span></div>
      <div class="row"><span>Pris</span><span>${Number(data.price).toLocaleString("sv-SE")} kr</span></div>
      <div class="row"><span>Betalsätt</span><span>${esc(data.paymentMethod)}</span></div>
      <div class="row"><span>Identifiering</span><span>${esc(data.serial || "Ej angivet")}</span></div>
      ${getProductDetailRows(data)}
    `;

    const itemDetails = `
      <p><strong>Beskrivning av varan</strong><br>${esc(data.description || "Ej angivet")}</p>
      <p><strong>Kända fel / anmärkningar</strong><br>${esc(data.knownIssues || "Inga angivna")}</p>
      <p><strong>Detta ingår</strong><br>${esc(data.included || "Ej angivet")}</p>
      <p><strong>Övriga villkor</strong><br>${esc(data.terms || "Inga övriga villkor angivna")}</p>
    `;

    const signatures = `
      <div class="signature-grid">
        <div>
          <div class="signature-line">Säljarens underskrift</div>
          <div>${esc(data.seller)}</div>
        </div>
        <div>
          <div class="signature-line">Köparens underskrift</div>
          <div>${esc(data.buyer)}</div>
        </div>
      </div>
    `;

    if (data.documentType === "agreement") {
      $("preview").innerHTML = `
        ${common}
        ${itemDetails}
        <div class="document-note">
          Parterna bekräftar genom sina underskrifter att uppgifterna ovan beskriver den överenskommelse som träffats om varan, priset och övriga villkor.
        </div>
        ${signatures}
      `;
    } else {
      $("preview").innerHTML = `
        ${common}
        <div class="row"><span>Betalning mottagen</span><span>${data.paymentReceived ? "Ja" : "Nej"}</span></div>
        ${itemDetails}
        <div class="document-note">
          Säljaren bekräftar att angivet belopp har mottagits för varan och att detta dokument utgör kvitto på affären.
        </div>
        ${signatures}
      `;
    }

    $("preview").innerHTML += `
      <hr>
      <p class="muted">KlarAffär är ett dokumentverktyg och lämnar inte individuell juridisk rådgivning.</p>
    `;
    return true;
  } catch (err) {
    logRuntimeError("KA-DOC-001", err);
    $("preview").textContent = "Ett fel uppstod. Felkod: KA-DOC-001";
    return false;
  }
}


function pdfEscapeText(s) {
  return String(s ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/[^\x20-\x7EÅÄÖåäöÉéÜü]/g, "?");
}

function wrapText(text, maxChars=86) {
  const words = String(text || "").split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if (!word) continue;
    const next = line ? line + " " + word : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function buildPdfLines(data) {
  const displayItemType = data.itemType === "Övrigt" ? data.customItemType : data.itemType;
  const title = data.documentType === "agreement" ? "KÖPEAVTAL" : "KVITTO";
  const lines = [
    { text: "KLARAFFÄR", size: 18, bold: true },
    { text: title + " - " + displayItemType, size: 15, bold: true },
    { text: "Dokument-ID: " + getDocumentId(), size: 9 },
    { text: data.place + " " + formatDateSv(data.documentDate), size: 10 },
    { text: "", size: 8 },
    { text: "PARTER", size: 11, bold: true },
    { text: "Säljare: " + data.seller, size: 10 },
    { text: "E-post: " + data.sellerEmail, size: 10 },
    { text: "Telefon: " + (data.sellerPhone || "Ej angivet"), size: 10 },
    { text: "Köpare: " + data.buyer, size: 10 },
    { text: "E-post: " + data.buyerEmail, size: 10 },
    { text: "Telefon: " + (data.buyerPhone || "Ej angivet"), size: 10 },
    { text: "", size: 8 },
    { text: "AFFÄR", size: 11, bold: true },
    { text: "Pris: " + Number(data.price).toLocaleString("sv-SE") + " kr", size: 10 },
    { text: "Betalsätt: " + data.paymentMethod, size: 10 },
    { text: "Identifiering: " + (data.serial || "Ej angivet"), size: 10 },
  ];

  const schema = PRODUCT_SCHEMAS[data.itemType] || [];
  for (const field of schema) {
    const value = data.productDetails?.[field.id];
    if (value) lines.push({ text: field.label + ": " + value, size: 10 });
  }

  lines.push({ text: "", size: 8 });
  lines.push({ text: "BESKRIVNING", size: 11, bold: true });
  lines.push({ text: data.description || "Ej angivet", size: 10 });
  lines.push({ text: "Kända fel / anmärkningar: " + (data.knownIssues || "Inga angivna"), size: 10 });
  lines.push({ text: "Detta ingår: " + (data.included || "Ej angivet"), size: 10 });
  lines.push({ text: "Övriga villkor: " + (data.terms || "Inga övriga villkor angivna"), size: 10 });

  if (data.documentType === "receipt") {
    lines.push({ text: "Betalning mottagen: " + (data.paymentReceived ? "Ja" : "Nej"), size: 10, bold: true });
  }

  lines.push({ text: "", size: 8 });
  lines.push({
    text: data.documentType === "agreement"
      ? "Parterna bekräftar genom sina underskrifter att uppgifterna ovan beskriver den överenskommelse som träffats."
      : "Säljaren bekräftar att angivet belopp har mottagits för varan och att dokumentet utgör kvitto på affären.",
    size: 10
  });
  lines.push({ text: "", size: 8 });
  lines.push({ text: "Säljarens underskrift: ________________________________", size: 10 });
  lines.push({ text: data.seller, size: 9 });
  lines.push({ text: "", size: 8 });
  lines.push({ text: "Köparens underskrift: ________________________________", size: 10 });
  lines.push({ text: data.buyer, size: 9 });
  lines.push({ text: "", size: 8 });
  lines.push({ text: "KlarAffär är ett dokumentverktyg och lämnar inte individuell juridisk rådgivning.", size: 8 });

  return lines;
}

function createSimplePdf(lines) {
  // Simple A4 PDF using core Helvetica fonts, no external dependency.
  const pageWidth = 595;
  const pageHeight = 842;
  const left = 52;
  const top = 790;
  const bottom = 55;

  const expanded = [];
  for (const item of lines) {
    const maxChars = item.size >= 15 ? 58 : item.size >= 11 ? 78 : 92;
    const wrapped = wrapText(item.text, maxChars);
    for (const line of wrapped) expanded.push({ ...item, text: line });
  }

  const pages = [];
  let page = [];
  let y = top;

  for (const item of expanded) {
    const leading = item.size >= 15 ? 23 : item.size >= 11 ? 18 : item.size >= 10 ? 15 : 13;
    if (y - leading < bottom) {
      pages.push(page);
      page = [];
      y = top;
    }
    page.push({ ...item, y });
    y -= leading;
  }
  if (page.length) pages.push(page);

  const objects = [];
  const addObj = (content) => {
    objects.push(content);
    return objects.length;
  };

  const catalogId = addObj("");
  const pagesId = addObj("");
  const fontRegularId = addObj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
  const fontBoldId = addObj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");

  const pageIds = [];

  for (const p of pages) {
    let stream = "BT\n";
    for (const item of p) {
      const fontId = item.bold ? "F2" : "F1";
      stream += `/${fontId} ${item.size} Tf\n`;
      stream += `1 0 0 1 ${left} ${item.y} Tm\n`;
      stream += `(${pdfEscapeText(item.text)}) Tj\n`;
    }
    stream += "ET\n";

    const contentId = addObj(`<< /Length ${stream.length} >>\nstream\n${stream}endstream`);
    const pageId = addObj(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] ` +
      `/Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> ` +
      `/Contents ${contentId} 0 R >>`
    );
    pageIds.push(pageId);
  }

  objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map(id => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((obj, i) => {
    offsets.push(pdf.length);
    pdf += `${i+1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefPos = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i < offsets.length; i++) {
    pdf += String(offsets[i]).padStart(10, "0") + " 00000 n \n";
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\n`;
  pdf += `startxref\n${xrefPos}\n%%EOF`;

  // Encode as single-byte data so xref byte offsets remain correct.
  const bytes = new Uint8Array(pdf.length);
  for (let i = 0; i < pdf.length; i++) {
    const code = pdf.charCodeAt(i);
    // Swedish letters used by the app are representable in WinAnsi/Latin-1.
    bytes[i] = code <= 255 ? code : 63;
  }
  return new Blob([bytes], { type: "application/pdf" });
}

function downloadPdf() {
  try {
    const data = getFormData();
    const ok = renderPreview(data);
    if (!ok) return;

    const blob = createSimplePdf(buildPdfLines(data));
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const type = data.documentType === "agreement" ? "Kopeavtal" : "Kvitto";
    a.href = url;
    a.download = `${type}_${getDocumentId()}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    // Anonym mätning av lyckad PDF-generering via en intern tack-sida.
    // Ingen formulärdata skickas med i URL:en eller till analysverktyget.
    setTimeout(() => {
      window.location.href = "tack-pdf.html";
    }, 350);
  } catch (err) {
    logRuntimeError("KA-PDF-001", err);
    alert("PDF kunde inte skapas. Felkod: KA-PDF-001");
  }
}

function printDocument() {
  try {
    const ok = renderPreview(getFormData());
    if (!ok) return;
    window.print();
  } catch (err) {
    logRuntimeError("KA-PRT-001", err);
    alert("Utskriften kunde inte startas. Felkod: KA-PRT-001");
  }
}

function renderErrors(items) {
  $("errorResults").innerHTML = items.length ? items.map(e => `
    <div class="error-item">
      <div class="error-code">${esc(e.code)}</div>
      <div><strong>Funktion:</strong> ${esc(e.function)}</div>
      <div><strong>Kort förklaring:</strong> ${esc(e.short)}</div>
      <div class="muted"><strong>Trolig orsak:</strong> ${esc(e.cause)}</div>
      <div class="muted"><strong>Åtgärd:</strong> ${esc(e.fix)}</div>
    </div>
  `).join("") : "<p>Inga felkoder matchade sökningen.</p>";
}

function searchErrors() {
  try {
    const q = $("errorSearch").value.trim().toLowerCase();
    const area = $("errorArea").value;
    const items = ERROR_CATALOG.filter(e => {
      const haystack = [e.code,e.area,e.function,e.short,e.cause,e.fix].join(" ").toLowerCase();
      return (!q || haystack.includes(q)) && (!area || e.area === area);
    });
    renderErrors(items);
  } catch (err) {
    logRuntimeError("KA-ADM-001", err);
    $("errorResults").textContent = "Fel i felsökningsmotorn. Felkod: KA-ADM-001";
  }
}

function renderRuntimeLog() {
  try {
    const log = JSON.parse(localStorage.getItem("klaraffar_runtime_errors") || "[]");
    $("runtimeLog").innerHTML = log.length ? log.map(x => `
      <div class="log-item">
        ${esc(x.time)} | ${esc(x.code)} | ${esc(x.function)} | ${esc(x.message)} ${x.extra ? "| " + esc(x.extra) : ""}
      </div>
    `).join("") : "<p>Inga runtime-fel har loggats ännu.</p>";
  } catch (err) {
    $("runtimeLog").textContent = "Kunde inte läsa felloggen. Felkod: KA-ADM-002";
  }
}

function updateItemTypeFields() {
  const isOther = $("itemType").value === "Övrigt";
  $("customItemTypeWrap").classList.toggle("hidden-field", !isOther);
  if (!isOther) $("customItemType").value = "";
  renderProductFields();
}


function getCases() {
  try {
    return JSON.parse(localStorage.getItem("klaraffar_cases") || "[]");
  } catch (_) {
    return [];
  }
}

function setCases(cases) {
  localStorage.setItem("klaraffar_cases", JSON.stringify(cases));
}

function generateCaseId() {
  const now = new Date();
  const y = now.getFullYear();
  const random = String(Math.floor(Math.random() * 900000) + 100000);
  return `KA-${y}-${random}`;
}

function saveCase() {
  try {
    const data = getFormData();
    const errors = validateForm(data);
    if (errors.length) {
      renderPreview(data);
      return;
    }

    const cases = getCases();
    const caseItem = {
      id: generateCaseId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: data.documentType === "receipt" ? "Avslutad" : "Pågående",
      documentType: data.documentType,
      seller: {
        name: data.seller,
        email: data.sellerEmail,
        phone: data.sellerPhone
      },
      buyer: {
        name: data.buyer,
        email: data.buyerEmail,
        phone: data.buyerPhone
      },
      item: {
        type: data.itemType === "Övrigt" ? data.customItemType : data.itemType,
        category: data.itemType,
        details: data.productDetails,
        serial: data.serial,
        description: data.description,
        knownIssues: data.knownIssues,
        included: data.included
      },
      transaction: {
        price: data.price,
        paymentMethod: data.paymentMethod,
        paymentReceived: data.paymentReceived,
        terms: data.terms,
        place: data.place,
        documentDate: data.documentDate
      }
    };

    cases.unshift(caseItem);
    setCases(cases);
    alert(`Ärendet ${caseItem.id} har sparats i prototypen.`);
    show("cases");
  } catch (err) {
    logRuntimeError("KA-CASE-001", err);
    alert("Kunde inte spara ärendet. Felkod: KA-CASE-001");
  }
}

function statusNext(status) {
  if (status === "Pågående") return "Affären klar";
  if (status === "Affären klar") return "Avslutad";
  return "Avslutad";
}

function updateCaseStatus(caseId) {
  const cases = getCases();
  const item = cases.find(c => c.id === caseId);
  if (!item) return;
  item.status = statusNext(item.status);
  item.updatedAt = new Date().toISOString();
  setCases(cases);
  renderCases();
  renderCaseDetail(caseId);
}

function deleteCase(caseId) {
  const cases = getCases().filter(c => c.id !== caseId);
  setCases(cases);
  $("caseDetailCard").classList.add("hidden");
  renderCases();
}

function renderCases() {
  try {
    const role = $("caseRoleFilter")?.value || "all";
    const status = $("caseStatusFilter")?.value || "";
    let cases = getCases();

    if (status) cases = cases.filter(c => c.status === status);

    $("casesList").innerHTML = cases.length ? cases.map(c => `
      <div class="case-card" data-case-id="${esc(c.id)}">
        <div class="case-head">
          <div>
            <div class="case-id">${esc(c.id)}</div>
            <strong>${esc(c.item?.type || "Okänd vara")}</strong>
          </div>
          <span class="status-pill">${esc(c.status)}</span>
        </div>
        <div class="case-meta">
          <div><strong>Dokument:</strong> ${c.documentType === "agreement" ? "Köpeavtal" : "Kvitto"}</div>
          <div><strong>Pris:</strong> ${Number(c.transaction?.price || 0).toLocaleString("sv-SE")} kr</div>
          <div><strong>Säljare:</strong> ${esc(c.seller?.name || "")}</div>
          <div><strong>Köpare:</strong> ${esc(c.buyer?.name || "")}</div>
        </div>
      </div>
    `).join("") : "<p>Inga sparade ärenden ännu.</p>";

    document.querySelectorAll("[data-case-id]").forEach(el => {
      el.addEventListener("click", () => renderCaseDetail(el.dataset.caseId, role));
    });
  } catch (err) {
    logRuntimeError("KA-CASE-002", err);
    $("casesList").textContent = "Kunde inte läsa ärenden. Felkod: KA-CASE-002";
  }
}

function renderCaseDetail(caseId, role="all") {
  try {
    const item = getCases().find(c => c.id === caseId);
    if (!item) throw new Error("Ärende saknas");

    const sellerBox = `
      <div class="role-box">
        <strong>Säljarvy</strong><br>
        ${esc(item.seller?.name || "")}<br>
        ${esc(item.seller?.email || "")}<br>
        <span class="muted">I backendversionen: kan lägga upp produktbilder och se köparens betalningsunderlag.</span>
      </div>
    `;

    const buyerBox = `
      <div class="role-box">
        <strong>Köparvy</strong><br>
        ${esc(item.buyer?.name || "")}<br>
        ${esc(item.buyer?.email || "")}<br>
        <span class="muted">I backendversionen: kan lägga upp betalningsunderlag och se säljarens produktbilder.</span>
      </div>
    `;

    $("caseDetail").innerHTML = `
      <div class="case-head">
        <div>
          <div class="case-id">${esc(item.id)}</div>
          <h2>${esc(item.item?.type || "Ärende")}</h2>
        </div>
        <span class="status-pill">${esc(item.status)}</span>
      </div>

      <div class="row"><span>Dokumenttyp</span><span>${item.documentType === "agreement" ? "Köpeavtal" : "Kvitto"}</span></div>
      <div class="row"><span>Pris</span><span>${Number(item.transaction?.price || 0).toLocaleString("sv-SE")} kr</span></div>
      <div class="row"><span>Betalsätt</span><span>${esc(item.transaction?.paymentMethod || "")}</span></div>
      <div class="row"><span>Skapad</span><span>${new Date(item.createdAt).toLocaleString("sv-SE")}</span></div>

      ${role === "seller" ? sellerBox : role === "buyer" ? buyerBox : sellerBox + buyerBox}

      <div class="case-actions">
        ${item.status !== "Avslutad" ? `<button id="advanceStatusBtn" class="primary">Markera nästa status</button>` : ""}
        <button id="deleteCaseBtn" class="secondary">Ta bort prototypärende</button>
      </div>
    `;

    $("caseDetailCard").classList.remove("hidden");

    if ($("advanceStatusBtn")) {
      $("advanceStatusBtn").addEventListener("click", () => updateCaseStatus(caseId));
    }
    $("deleteCaseBtn").addEventListener("click", () => deleteCase(caseId));
  } catch (err) {
    logRuntimeError("KA-CASE-003", err);
    $("caseDetailCard").classList.remove("hidden");
    $("caseDetail").textContent = "Kunde inte öppna ärendet. Felkod: KA-CASE-003";
  }
}

function show(view) {
  $("builderView").classList.remove("hidden");
  if ($("adminView")) $("adminView").classList.add("hidden");
}

window.addEventListener("error", (event) => {
  logRuntimeError("KA-BLD-001", event.error || event.message, "Global error handler");
});

$("previewBtn").addEventListener("click", () => renderPreview(getFormData()));
$("pdfBtn").addEventListener("click", downloadPdf);
$("printBtn").addEventListener("click", printDocument);
$("homeBtn").addEventListener("click", () => show("home"));
$("searchErrorsBtn").addEventListener("click", searchErrors);
$("showAllErrorsBtn").addEventListener("click", () => { $("errorSearch").value=""; $("errorArea").value=""; renderErrors(ERROR_CATALOG); });

document.querySelectorAll(".doc-option").forEach(btn => {
  btn.addEventListener("click", () => setDocumentType(btn.dataset.doc));
});

$("itemType").addEventListener("change", updateItemTypeFields);

show("home");
updateItemTypeFields();
if (!$("documentDate").value) {
  $("documentDate").value = new Date().toISOString().slice(0,10);
}
setDocumentType("agreement");

["itemType","seller","buyer","price","documentDate"].forEach(id => {
  const el = $(id);
  if (el) el.addEventListener("change", resetDocumentId);
});

document.querySelectorAll("[data-start-doc]").forEach(btn => {
  btn.addEventListener("click", () => {
    setDocumentType(btn.dataset.startDoc);
    const target = document.querySelector(".doc-picker") || document.querySelector(".card");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// SEO landing pages can preselect document type without sending any form data.
try {
  const seoParams = new URLSearchParams(window.location.search);
  const requestedDoc = seoParams.get("doc");
  if (requestedDoc === "receipt" || requestedDoc === "agreement") {
    setDocumentType(requestedDoc);
  }
} catch (_) {}
