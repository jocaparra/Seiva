// =====================================================================
// SEIVA: TODO O CONTEÚDO EDITÁVEL DA PÁGINA FICA AQUI.
// Troque textos, links de vídeo, imagens e logos sem mexer nos componentes.
// Tudo que está marcado com [TROCAR] precisa ser preenchido por você.
// Imagem vazia ("") mostra um espaço reservado cinza com o aviso [TROCAR].
// =====================================================================

export const content = {
  site: {
    name: "Seiva",
    logo: "/logo.svg", // [TROCAR] por /logo.png quando enviar a logo oficial (coloque o arquivo na pasta public)
    logoAlt: "Logo da Seiva, uma árvore azul em três camadas",
    year: 2026,
  },

  cta: "Falar com a nossa equipe",

  // Para ligar o formulário: cole aqui o endereço do seu serviço (Formspree, Getform, Make, Zapier etc.).
  // Enquanto estiver vazio, o envio é apenas simulado e os dados aparecem no console do navegador.
  form: {
    endpoint: "", // [TROCAR] ex.: "https://formspree.io/f/xxxxxxx"
    title: "Fale com a nossa equipe",
    intro: "Conte um pouco sobre a sua operação. Respondemos em até um dia útil.",
    fields: {
      name: "Nome",
      org: "Clínica ou hospital",
      email: "Email",
      whatsapp: "WhatsApp",
      revenue: "Faturamento mensal aproximado com planos de saúde",
      question: "Quer nos contar algo ou tirar uma dúvida? (opcional)",
    },
    revenueOptions: [
      "Selecione uma faixa",
      "Até R$ 100 mil",
      "De R$ 100 mil a R$ 500 mil",
      "De R$ 500 mil a R$ 1 milhão",
      "De R$ 1 milhão a R$ 5 milhões",
      "Acima de R$ 5 milhões",
    ],
    submit: "Enviar",
    sending: "Enviando...",
    successTitle: "Mensagem enviada",
    successText: "Obrigado! A nossa equipe vai entrar em contato em breve pelo WhatsApp ou pelo email informado.",
    close: "Fechar",
    error: "Não foi possível enviar agora. Tente novamente em instantes.",
  },

  announcement: {
    text: "[TROCAR] Estamos abrindo vagas para clínicas piloto em Campinas e região",
    link: "#contato",
    linkLabel: "Saiba como participar",
  },

  nav: [
    { label: "Solução", href: "#solucao" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Para quem", href: "#para-quem" },
    { label: "Segurança", href: "#seguranca" },
    { label: "Contato", href: "#contato" },
  ],

  hero: {
    title: "Você cuida dos pacientes. A Seiva cuida das glosas.",
    subtitle: "IA e auditores recuperam o dinheiro que os planos de saúde recusaram. Você só paga pelo resultado.",
    video: "/media/hero.mp4", // [TROCAR] versão final licenciada (sem marca dágua)
    videoMobile: "", // [TROCAR] versão leve para celular (mp4 menor, ex.: 720 px de largura)
    poster: "", // [TROCAR] imagem de capa que aparece enquanto o vídeo carrega
    posterAlt: "",
  },

  logos: {
    title: "Quem apoia a Seiva",
    // Cada item vira um logo, todos na mesma caixa de tamanho. Para adicionar, coloque o arquivo em public/logos.
    items: [
      { name: "Perplexity", src: "/logos/perplexity.png" },
      { name: "NVIDIA Inception Program", src: "/logos/nvidia-inception.png" },
      { name: "Baseten", src: "/logos/baseten.png" },
      { name: "OpenAI", src: "/logos/openai.png" },
      // [TROCAR] logos de clínicas e hospitais clientes, quando houver autorização para usar
    ],
  },

  value: {
    id: "solucao",
    title: "Uma equipe de glosas que trabalha por você, e não um software para você operar.",
    link: "Saiba mais",
  },

  // SEÇÃO GUARDADA: não aparece no site. Para reativar, descomente <Team /> em src/App.jsx.
  team: {
    id: "especialistas",
    title: "Especialistas de verdade, com IA do lado deles.",
    people: [
      {
        role: "Auditor médico",
        text: "Lê o caso clínico e escreve a justificativa que o plano precisa aceitar.",
        photo: "", // [TROCAR] retrato
        alt: "[TROCAR] Retrato de um auditor médico da Seiva",
      },
      {
        role: "Auditor de enfermagem",
        text: "Confere prontuário e procedimentos para provar que o atendimento aconteceu como foi cobrado.",
        photo: "",
        alt: "[TROCAR] Retrato de uma auditora de enfermagem da Seiva",
      },
      {
        role: "Faturista sênior",
        text: "Corrige a conta, monta o recurso e cuida de cada prazo até o pagamento.",
        photo: "",
        alt: "[TROCAR] Retrato de uma faturista sênior da Seiva",
      },
      {
        role: "Especialista em contratos com os planos",
        text: "Conhece as regras de cada operadora e sabe quando a glosa vai contra o que foi combinado.",
        photo: "",
        alt: "[TROCAR] Retrato de uma especialista em contratos da Seiva",
      },
    ],
  },

  demo: {
    title: "A máquina lê. As pessoas decidem.",
    note: "Exemplo ilustrativo, com dados fictícios. [TROCAR] por vídeos reais do produto, se preferir.",
    ai: {
      title: "A IA analisa",
      text: "Cada glosa é lida, e a lista chega organizada por valor, chance de reversão e prazo.",
      video: "", // [TROCAR] vídeo curto em loop (se vazio, usa a animação em código)
      headers: { item: "Glosa", value: "Valor", chance: "Chance", deadline: "Prazo" },
      // Dados fictícios só para a animação. [TROCAR] ou mantenha como exemplo.
      rows: [
        { item: "Glosa A", value: "R$ 1.200", chance: "Média", deadline: "20 dias", rank: 3 },
        { item: "Glosa B", value: "R$ 8.400", chance: "Alta", deadline: "5 dias", rank: 0 },
        { item: "Glosa C", value: "R$ 640", chance: "Baixa", deadline: "30 dias", rank: 4 },
        { item: "Glosa D", value: "R$ 3.900", chance: "Alta", deadline: "12 dias", rank: 1 },
        { item: "Glosa E", value: "R$ 2.100", chance: "Média", deadline: "9 dias", rank: 2 },
      ],
      sortedLabel: "Organizado por prioridade",
      readingLabel: "Lendo glosas...",
    },
    experts: {
      title: "Especialistas assinam",
      text: "Cada defesa é revisada por um auditor, que confere, ajusta e aprova antes de ir para o plano.",
      video: "", // [TROCAR] vídeo curto em loop (se vazio, usa a animação em código)
      docTitle: "Defesa de glosa",
      docLines: [
        "Procedimento realizado conforme a indicação clínica.",
        "Prontuário e laudo anexados ao recurso.",
        "Cobrança prevista no contrato com o plano.",
      ],
      checks: ["Caso clínico conferido", "Contrato conferido", "Prazo conferido"],
      approved: "Aprovado pelo auditor",
      reviewing: "Em revisão",
    },
  },

  journey: {
    id: "como-funciona",
    title: "Do diagnóstico ao resultado",
    prev: "Etapa anterior",
    next: "Próxima etapa",
    steps: [
      {
        title: "Diagnóstico gratuito",
        art: "diagnostico", // ilustração em código; preencha "image" para usar uma imagem sua
        text: "Analisamos o seu histórico de glosas e mostramos quanto dinheiro existe para recuperar e onde estão os motivos de recusa.",
        image: "", // [TROCAR] imagem de tela ou ilustração
        alt: "Ilustração de um painel com o dinheiro a recuperar e os motivos de recusa",
      },
      {
        title: "Recuperação das glosas passadas",
        art: "recuperacao", // ilustração em código; preencha "image" para usar uma imagem sua
        text: "Montamos e enviamos os recursos das glosas que ainda estão dentro do prazo, com defesa assinada por especialista.",
        image: "",
        alt: "Ilustração de glosas passadas sendo recuperadas, do recurso enviado ao pagamento",
      },
      {
        title: "Operação contínua",
        art: "operacao", // ilustração em código; preencha "image" para usar uma imagem sua
        text: "A Seiva passa a cuidar das glosas novas conforme elas chegam, sem que a sua equipe precise operar uma ferramenta.",
        image: "",
        alt: "Ilustração do ciclo contínuo: a glosa chega, a IA analisa, o especialista assina e o dinheiro volta",
      },
      {
        title: "Prevenção e relatórios",
        art: "prevencao", // ilustração em código; preencha "image" para usar uma imagem sua
        text: "Mostramos por que as glosas acontecem e o que mudar no faturamento para que elas aconteçam menos.",
        image: "",
        alt: "Ilustração de um gráfico com menos glosas ao longo do tempo e um relatório com ajustes",
      },
    ],
  },

  security: {
    id: "seguranca",
    title: "Como a Seiva trata seus dados",
    items: [
      {
        title: "Acesso mínimo",
        text: "Pedimos e usamos apenas os dados necessários para recuperar as glosas, e só quem trabalha no seu caso tem acesso.",
      },
      {
        title: "Canal seguro",
        text: "Os dados trafegam por um canal protegido, combinado com a sua equipe antes de qualquer envio.",
      },
      {
        title: "Descarte ao fim do serviço",
        text: "Quando o serviço termina, os dados são devolvidos ou descartados, conforme o combinado em contrato.",
      },
    ],
    lgpd: "Tratamos os dados em linha com a Lei Geral de Proteção de Dados (LGPD).",
    legalNote: "[TROCAR] revisar com advogado antes de publicar",
  },

  testimonials: {
    title: "Por que clientes confiam na Seiva",
    prev: "Depoimento anterior",
    next: "Próximo depoimento",
    counter: (i, n) => `${i} de ${n}`,
    // [TROCAR] Para cada depoimento: vídeo, miniatura e legenda de uma linha.
    items: [
      { video: "", thumb: "", caption: "[TROCAR] Nome, cargo e clínica", alt: "[TROCAR] Miniatura do depoimento 1" },
      { video: "", thumb: "", caption: "[TROCAR] Nome, cargo e clínica", alt: "[TROCAR] Miniatura do depoimento 2" },
      { video: "", thumb: "", caption: "[TROCAR] Nome, cargo e clínica", alt: "[TROCAR] Miniatura do depoimento 3" },
    ],
  },

  finalBanner: {
    id: "contato",
    title: "Foque nos pacientes. A gente cuida do resto.",
  },

  footer: {
    groups: [
      { title: "Solução", links: [{ label: "Uma equipe de glosas", href: "#solucao" }, { label: "Especialistas", href: "#para-quem" }] },
      { title: "Como funciona", links: [{ label: "Do diagnóstico ao resultado", href: "#como-funciona" }] },
      { title: "Segurança", links: [{ label: "Como tratamos seus dados", href: "#seguranca" }] },
      { title: "Contato", links: [{ label: "Falar com a nossa equipe", href: "#contato", modal: true }, { label: "[TROCAR] email de contato", href: "mailto:" }] },
    ],
    rights: "Todos os direitos reservados.",
    terms: { label: "Termos de Uso", href: "#" }, // [TROCAR] link
    privacy: { label: "Política de Privacidade", href: "#" }, // [TROCAR] link
  },
};
