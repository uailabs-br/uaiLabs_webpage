export type Lang = "en" | "pt";

const en = {
  nav: {
    services: "Services",
    cases: "Cases",
    about: "About",
    faq: "FAQ",
    contact: "Contact",
  },
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
      { tag: "Support", client: "Customer support", metric: "Up to 70% of tickets resolved automatically", result: "AI handles common questions, troubleshooting, and status checks around the clock. Human agents only step in for cases that truly need a personal touch — cutting response time from hours to seconds." },
      { tag: "Sales", client: "Sales & marketing", metric: "3× more qualified leads per rep", result: "Every incoming lead gets an instant, personalized response. The AI qualifies, scores, and routes prospects so your team only talks to buyers who are ready — no cold outreach, no wasted calls." },
      { tag: "Operations", client: "Day-to-day operations", metric: "15+ hours saved per week", result: "Reports compile themselves, documents get reviewed automatically, and records stay up to date without anyone remembering to do it. Your team focuses on decisions, not data entry." },
    ],
  },
  about: {
    label: "About",
    titlePre: "\"Uai\" happens when the result",
    titleHighlight: "exceeds expectations.",
    body1: "I created uaiLabs to turn AI's potential into practical results and simplify people's lives. I bring together engineering, product, and business vision to find where AI truly creates value, and turn that opportunity into a solution that's actually useful.",
    body2: "Every project is built to generate impact and evolve alongside the business.",
    cta: "I want to know more",
  },
  faq: {
    label: "FAQ",
    items: [
      { q: "Do I need to understand AI?", a: "No. You don't need any technical background. I handle the AI engineering, integrations, and infrastructure end to end. What you bring is something no AI can replace: deep knowledge of how your business works, what your customers need, and where the bottlenecks are. In practice, our conversations feel more like business strategy sessions than tech meetings. You describe the problem, I build the solution." },
      { q: "Does it work in my industry?", a: "Yes. Because nothing is pre-built or off the shelf. Every solution is designed from scratch around your processes, your data, and your team's reality. I've worked with service providers, professional firms, real estate, and retail, but the industry matters less than the problem. If your team spends hours on repetitive tasks, manual reviews, or answering the same questions, AI can help regardless of the sector." },
      { q: "How long until I see results?", a: "Most projects deliver a working first version within 2 to 4 weeks. We start with a 30-minute conversation to map the highest-impact opportunity, then move straight to building. There's no months-long discovery phase or bulky proposal deck. You'll see a functional prototype quickly, validate it with real use, and iterate from there. The goal is always the same: a solution running and generating value as fast as possible." },
      { q: "What if I don't know where to start?", a: "That's exactly what the initial conversation is for. In 30 minutes, we walk through your day-to-day operations together and spot where AI can save the most time or reduce the most friction. You don't need a project brief or a tech plan beforehand. Most clients come in knowing they want to use AI but unsure where, and leave with a clear, prioritized next step." },
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
  nav: {
    services: "Serviços",
    cases: "Na prática",
    about: "Sobre",
    faq: "FAQ",
    contact: "Contato",
  },
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
      { tag: "Suporte técnico", client: "Provedores de internet", metric: "Até 70% dos chamados resolvidos sozinhos", result: "A IA resolve dúvidas comuns, testes de conexão e consultas de status 24 horas por dia. O atendente humano só entra quando realmente precisa — reduzindo o tempo de resposta de horas para segundos." },
      { tag: "Gestão de documentos", client: "Escritórios contábeis", metric: "15+ horas por semana devolvidas", result: "Cobrança de documentos fiscais, conferência de dados e alertas de prazo rodando no automático. Ninguém precisa lembrar de cobrar, conferir ou correr atrás — o sistema avisa quando algo precisa de atenção." },
      { tag: "Qualificação de leads", client: "Imobiliárias e corretores", metric: "3× mais leads qualificados por corretor", result: "O lead entra pelo WhatsApp, é atendido na hora, responde um filtro inteligente e só chega pro corretor se tiver perfil e interesse real de compra. Sem ligação fria, sem tempo perdido." },
    ],
  },
  about: {
    label: "Sobre",
    titlePre: "O \"uai\" acontece quando o resultado",
    titleHighlight: "supera a expectativa.",
    body1: "Criei a uaiLabs para transformar o potencial da IA em resultados práticos e simplificar a vida das pessoas. Eu uno engenharia, produto e visão de negócio para encontrar onde a IA realmente gera valor e transformar essa oportunidade em uma solução realmente útil.",
    body2: "Cada projeto nasce para gerar impacto e evoluir junto com o negócio.",
    cta: "Quero saber mais",
  },
  faq: {
    label: "FAQ",
    items: [
      { q: "Preciso entender de IA?", a: "Não. Você não precisa ter nenhum conhecimento técnico. Eu cuido de toda a engenharia, integrações e infraestrutura de ponta a ponta. O que você traz é algo que nenhuma IA substitui: conhecimento profundo de como seu negócio funciona, o que seus clientes precisam e onde estão os gargalos. Na prática, nossas conversas parecem mais reuniões de estratégia de negócio do que de tecnologia. Você descreve o problema, eu construo a solução." },
      { q: "Funciona no meu setor?", a: "Sim. Porque nada é pronto ou de prateleira. Cada solução é desenhada do zero a partir dos seus processos, dos seus dados e da realidade da sua equipe. Já trabalhei com provedores de serviços, escritórios, imobiliárias e varejo, mas o setor importa menos que o problema. Se sua equipe gasta horas em tarefas repetitivas, conferências manuais ou respondendo as mesmas perguntas, a IA pode ajudar independente do ramo." },
      { q: "Quanto tempo até ver resultado?", a: "A maioria dos projetos entrega uma primeira versão funcionando em 2 a 4 semanas. Começamos com uma conversa de 30 minutos para mapear a oportunidade de maior impacto, e partimos direto para a construção. Não existe fase de discovery de meses nem proposta engessada. Você vê um protótipo funcional rápido, valida com uso real e itera a partir dali. O objetivo é sempre o mesmo: solução rodando e gerando valor o mais rápido possível." },
      { q: "E se eu não souber por onde começar?", a: "É exatamente para isso que existe a conversa inicial. Em 30 minutos, percorremos juntos a sua operação do dia a dia e identificamos onde a IA pode economizar mais tempo ou reduzir mais atrito. Você não precisa chegar com um briefing ou um plano técnico pronto. A maioria dos clientes chega sabendo que quer usar IA, mas sem saber onde, e sai com um próximo passo claro e priorizado." },
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
