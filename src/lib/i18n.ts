export type Lang = "en" | "pt";

const en = {
  hero: {
    eyebrow: "A universe of possibilities",
    headlinePre: "AI without complexity",
    headlineHighlight: "More results in practice",
    headlinePost: "",
    sub: "Less manual work, more productivity. I build smart automations that take the repetitive load off your day.",
    cta: "Identify opportunities in my business",
    ctaSecondary: "See what's possible",
  },
  metrics: {
    label: "How I work",
    items: [
      { value: "100%", label: "Built for your case" },
      { value: "Weeks", label: "To first results, not months" },
      { value: "Start to finish", label: "From idea to working solution" },
      { value: "24/7", label: "Always keeping watch" },
    ],
  },
  services: {
    label: "Services",
    items: [
      { title: "Virtual Assistants", desc: "Assistants that handle repetitive tasks on their own, so your team can focus on what matters." },
      { title: "Smarter Data", desc: "Your data answering business questions, instead of sitting forgotten in spreadsheets." },
      { title: "Tailored AI", desc: "AI that learns how your company works and gives the right answers, not generic ones." },
      { title: "Process Automation", desc: "Fewer errors, less rework, and processes that grow without adding people." },
    ],
    stackLabel: "Built with",
  },
  cases: {
    label: "Applications",
    items: [
      { tag: "Support", client: "Customer support", result: "Support that answers instantly and only passes to a person what truly needs one" },
      { tag: "Sales", client: "Sales & marketing", result: "Qualified prospects and personalized responses, with no waiting line" },
      { tag: "Operations", client: "Day-to-day operations", result: "Reports, reviews, and records that take care of themselves" },
    ],
  },
  about: {
    label: "About",
    titlePre: "\"Uai\" happens when the result",
    titleHighlight: "exceeds expectations.",
    body1: "uaiLabs was born to turn AI's potential into practical results for businesses. I bring together engineering, product, and business vision to find where AI truly creates value, and turn that opportunity into a solution that works.",
    body2: "Every project is born to be used, generate impact, and evolve alongside the business.",
  },
  faq: {
    label: "FAQ",
    items: [
      { q: "Do I need to understand AI?", a: "No. I handle the technical side; you bring the knowledge of your business." },
      { q: "Does it work in my industry?", a: "Every solution is built to fit your context. It's not something off the shelf." },
      { q: "How long until I see results?", a: "Weeks, not months. We start with what makes the biggest difference fastest." },
      { q: "What if I don't know where to start?", a: "That's exactly what the free conversation is for." },
    ],
  },
  contact: {
    label: "Contact",
    titlePre: "Let's find out where AI makes sense",
    titleHighlight: "in your business.",
    sub: "In 30 minutes, we map out together where AI can make the biggest difference in your business, and you leave with a clear plan of next steps.",
    cta: "Schedule a free conversation",
    ctaNote: "30 min · no commitment",
    rights: "All rights reserved.",
  },
};

export type Translation = typeof en;

const pt: Translation = {
  hero: {
    eyebrow: "Um universo de possibilidades",
    headlinePre: "IA sem complicação",
    headlineHighlight: "Mais resultado na prática",
    headlinePost: "",
    sub: "Menos trabalho manual, mais produtividade. Construo automações inteligentes que tiram o peso das tarefas repetitivas do seu dia.",
    cta: "Identificar oportunidades no meu negócio",
    ctaSecondary: "Ver o que é possível",
  },
  metrics: {
    label: "Como eu trabalho",
    items: [
      { value: "Sob medida", label: "Feito pro seu processo, não um pacote genérico" },
      { value: "Em semanas", label: "Primeiro resultado em semanas, não em meses" },
      { value: "Ponta a ponta", label: "Da primeira conversa à solução rodando" },
      { value: "Sempre ativo", label: "Roda no automático, sem depender de você lembrar" },
    ],
  },
  services: {
    label: "O que eu resolvo",
    items: [
      { title: "Atendimento automático", desc: "Chamados simples, cobranças e dúvidas frequentes resolvidos antes de chegar em alguém. Sua equipe só entra quando precisa mesmo." },
      { title: "Processos que rodam sozinhos", desc: "Conferências, cadastros, alertas e relatórios rodando por conta própria, com histórico de tudo que foi feito." },
      { title: "Inteligência nos seus dados", desc: "Chega de abrir planilha pra saber o óbvio. Suas informações passam a responder direto o que você pergunta." },
      { title: "Integra com o que você tem", desc: "WhatsApp, ERP, agenda, e-mail. Sem trocar sistema, sem migrar dado, sem treinamento de equipe." },
    ],
    stackLabel: "Construído com",
  },
  cases: {
    label: "Na prática",
    items: [
      { tag: "Suporte técnico", client: "Provedores de internet", result: "Chamados simples resolvidos automaticamente, sem fila e sem precisar de atendente" },
      { tag: "Gestão de documentos", client: "Escritórios contábeis", result: "Cobrança e conferência de documentos fiscais rodando sem depender de ninguém lembrar" },
      { tag: "Qualificação de leads", client: "Imobiliárias e corretores", result: "Lead entra pelo WhatsApp, é qualificado e só chega pro corretor se for cliente com real interesse de compra" },
    ],
  },
  about: {
    label: "Sobre",
    titlePre: "O \"uai\" acontece quando o resultado",
    titleHighlight: "supera a expectativa.",
    body1: "A uaiLabs nasceu para transformar o potencial da IA em resultados práticos para empresas. Eu uno engenharia, produto e visão de negócio para encontrar onde a IA realmente gera valor e transformar essa oportunidade em uma solução funcionando.",
    body2: "Cada projeto nasce para ser usado, gerar impacto e evoluir junto com o negócio.",
  },
  faq: {
    label: "FAQ",
    items: [
      { q: "Preciso entender de IA?", a: "Não. Eu cuido da parte técnica; você traz o conhecimento do seu negócio." },
      { q: "Funciona no meu setor?", a: "Cada solução é construída sob medida para o seu contexto. Não é nada de prateleira." },
      { q: "Quanto tempo até ver resultado?", a: "Semanas, não meses. Começamos pelo que faz mais diferença mais rápido." },
      { q: "E se eu não souber por onde começar?", a: "É exatamente para isso que existe a conversa gratuita." },
    ],
  },
  contact: {
    label: "Contato",
    titlePre: "Vamos descobrir onde a IA faz sentido",
    titleHighlight: "no seu negócio.",
    sub: "Em 30 minutos, mapeamos juntos onde a IA gera mais impacto no seu negócio, e você sai com um plano claro de próximos passos.",
    cta: "Agendar diagnóstico inicial",
    ctaNote: "30 min · sem compromisso",
    rights: "Todos os direitos reservados.",
  },
};

export const translations: Record<Lang, Translation> = { en, pt };
