// Recebe o formulário do site da Seiva, grava na planilha e avisa por email.
// Cole este arquivo em: planilha > Extensões > Apps Script.

const ABA = "Contatos";
const EMAIL_AVISO = ""; // vazio = avisa o email da conta que publicou o script

const CAMPOS = [
  ["nome", "Nome"],
  ["organizacao", "Clínica ou hospital"],
  ["email", "Email"],
  ["whatsapp", "WhatsApp"],
  ["faturamento", "Faturamento mensal com planos de saúde"],
  ["pergunta", "Pergunta"],
];

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};
    const valores = CAMPOS.map(([chave]) => String(p[chave] || "").trim().slice(0, 2000));
    if (!p.nome || !p.email) return responder_(false);

    const trava = LockService.getScriptLock();
    trava.waitLock(20000);
    try {
      // o apóstrofo grava como texto: o "+55" do telefone não vira fórmula
      obterAba_().appendRow([new Date(), ...valores.map((v) => (v ? "'" + v : ""))]);
    } finally {
      trava.releaseLock();
    }

    // se o email falhar, o contato já está salvo
    try { avisar_(valores); } catch (erro) { console.error(erro); }

    return responder_(true);
  } catch (erro) {
    console.error(erro);
    return responder_(false);
  }
}

// Rode uma vez pelo editor para autorizar o script e testar.
function testar() {
  const resposta = doPost({ parameter: { nome: "Teste", organizacao: "Clínica Teste", email: "teste@exemplo.com", whatsapp: "+55 19 90000-0000", faturamento: "Até R$ 100 mil", pergunta: "Envio de teste, pode apagar." } });
  console.log(resposta.getContent());
}

function obterAba_() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  let aba = planilha.getSheetByName(ABA);
  if (!aba) {
    aba = planilha.insertSheet(ABA);
    aba.appendRow(["Data", ...CAMPOS.map((c) => c[1])]);
    aba.setFrozenRows(1);
  }
  return aba;
}

function avisar_(valores) {
  const para = EMAIL_AVISO || Session.getEffectiveUser().getEmail();
  const corpo = CAMPOS.map((c, i) => c[1] + ": " + (valores[i] || "-")).join("\n");
  MailApp.sendEmail(para, "Novo contato no site da Seiva: " + valores[0], corpo + "\n\n" + SpreadsheetApp.getActiveSpreadsheet().getUrl());
}

function responder_(ok) {
  return ContentService.createTextOutput(JSON.stringify({ ok })).setMimeType(ContentService.MimeType.JSON);
}
