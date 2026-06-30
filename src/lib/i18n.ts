export type CaseProject = {
  slug: string;
  name: string;
  tag: string;
  problem: string;
  solution: string;
  result: string;
  description: string;
  stack: string[];
  demoUrl?: string;
};

export type Lang = "en" | "pt";

const en = {
  nav: {
    services: "Services",
    cases: "Projects",
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
    viewAll: "View all projects",
    backToHome: "← uaiLabs",
    pageTitle: "Projects",
    pageSubtitle: "Real solutions built for real problems. Each project is a destination in our journey.",
    problemLabel: "Problem",
    solutionLabel: "Solution",
    detailsLabel: "Details",
    projectsLabel: "Built & shipped",
    dragHint: "drag sideways →",
    items: [
      { tag: "Support", client: "Customer support", metric: "Up to 70% of tickets resolved automatically", result: "AI handles common questions, troubleshooting, and status checks around the clock. Human agents only step in for cases that truly need a personal touch — cutting response time from hours to seconds." },
      { tag: "Sales", client: "Sales & marketing", metric: "3× more qualified leads per rep", result: "Every incoming lead gets an instant, personalized response. The AI qualifies, scores, and routes prospects so your team only talks to buyers who are ready — no cold outreach, no wasted calls." },
      { tag: "Operations", client: "Day-to-day operations", metric: "15+ hours saved per week", result: "Reports compile themselves, documents get reviewed automatically, and records stay up to date without anyone remembering to do it. Your team focuses on decisions, not data entry." },
    ],
    projects: [
      {
        slug: "olivia",
        name: "Olívia",
        tag: "AI Receptionist",
        problem: "A psychologist spending hours daily answering WhatsApp messages, scheduling and onboarding patients.",
        solution: "Multi-agent system that handles conversations, identifies patients, transcribes voice notes, and manages Google Calendar.",
        result: "Full reception automated 24/7",
        description: "Olívia is a multi-agent system. The main agent handles the conversation: it identifies whether someone is a new or returning patient, pulls their record and uses that context before responding. Voice notes get transcribed automatically. When scheduling is needed, Olívia delegates to a dedicated sub-agent that connects directly to Google Calendar.",
        stack: ["n8n", "GPT-4.1", "GPT-4o mini", "Supabase", "PostgreSQL", "WhatsApp", "Google Calendar", "Docker"],
        demoUrl: "https://drive.google.com/file/d/10jMiqmmxJHGcsctsdW2GHFiKWp9yYWAd/preview",
      },
      {
        slug: "rocketfit",
        name: "Rocket Fit",
        tag: "Support Agent",
        problem: "Growing user base with manual WhatsApp support — slow response times and inconsistent answers.",
        solution: "RAG-powered agent on WhatsApp that pulls from a structured knowledge base before every response.",
        result: "Instant 24/7 support without adding headcount",
        description: "A customer support agent built to answer questions about the Rocket Fit app: how features work, common usage issues and known bugs. It uses RAG to pull relevant information from a structured knowledge base of FAQs and product documentation before generating any response, keeping answers accurate and grounded.",
        stack: ["n8n", "OpenAI", "Supabase", "pgvector", "WhatsApp", "Docker"],
        demoUrl: "https://drive.google.com/file/d/1AmPGl6oxhrksiJ5OZWD4WDPev2xitmR0/preview",
      },
      {
        slug: "bestrip",
        name: "Bestrip",
        tag: "AI Travel Planner",
        problem: "Planning a trip means hours crossing scattered travel blogs, ignoring budget, pace, and real weather.",
        solution: "App that generates personalized city guides with climate, budget, safety, and neighborhood picks.",
        result: "Complete travel plans in seconds",
        description: "The app starts by understanding the traveler: destination, travel companions, pace, budget and dates. From there, it calls the Gemini Flash model to generate a personalized city guide with climate charts, budget estimates, safety alerts, neighborhood picks and day trip suggestions. Works in English and Portuguese.",
        stack: ["React", "Vite", "Tailwind CSS", "Gemini Flash", "Google Gen AI SDK"],
        demoUrl: "https://drive.google.com/file/d/1_21_qS9KzosWbxuFPVyMjudMHPmChbUS/preview",
      },
    ] as CaseProject[],
  },
  about: {
    label: "About",
    titlePre: "\"Uai\" happens when the result",
    titleHighlight: "exceeds expectations.",
    body1: "I created uaiLabs to turn AI's potential into practical results and simplify people's lives. I bring together engineering, product, and business vision to find where AI truly creates value, and turn that opportunity into a solution that's actually useful.",
    body2: "Every project is built to generate impact and evolve alongside the business.",
    cta: "Meet the person behind it",
  },
  profile: {
    backToHome: "← uaiLabs",
    role: "Applied-AI consultant for small and mid-sized businesses",
    name: "Ruan Coelho",
    initials: "RC",
    headline: "I put AI to work inside your business",
    headlineAccent: "and keep it running after it goes live.",
    sub: "I start with a diagnosis that shows the real size of the problem, build what fixes it, and stay responsible for keeping it running.",
    heroCta: "Let's talk",
    credentials: [
      "10 years in the field",
      "Stellantis North America",
      "Head of Product · edtech",
      "Founder · industrial IoT",
      "App: 0 → 700k downloads",
    ],
    whoLabel: "Who I am",
    who: "Hi, I'm Ruan. I'm an engineer and, for over 10 years, I've helped companies solve problems and improve operations. I've been a SEBRAE consultant, Head of Product at an edtech, founder of an industrial IoT company, and worked at Stellantis North America on global data quality projects.",
    who2: "Today I build AI systems and agents for small and mid-sized businesses. My focus is understanding the operation, spotting opportunities for gains, and creating solutions that automate processes, boost productivity, and deliver real results.",
    whoPunch: "I don't sell robots. I sell problems solved.",
    solveLabel: "What I solve",
    solve: [
      "A repetitive task that jams the operation and nobody wants to do",
      "A customer waiting on an answer that could already be automatic",
      "A team buried in messages, spreadsheets and copy-paste",
      "AI bought in a hurry that became shelfware in six months",
    ],
    workLabel: "How I work",
    work: [
      {
        title: "Diagnosis",
        desc: "Before proposing anything, I measure where it hurts and what it costs. You get a number, not a guess.",
      },
      {
        title: "Implementation",
        desc: "I build what solves that number, with a person in control of the decisions that matter and a record of everything the system does.",
      },
      {
        title: "Operation",
        desc: "AI isn't a job you hand over and forget. I maintain, adjust and improve it month after month, and that's part of the contract.",
      },
    ],
    whyLabel: "Why me",
    why: [
      {
        k: "A number before the project",
        v: "I deliver the diagnosis with a real number in hand before selling you anything.",
      },
      {
        k: "Operation in the contract",
        v: "Ongoing operation is part of the deal from the start, not an extra charge that shows up later.",
      },
      {
        k: "Data protection from day zero",
        v: "I design everything around data protection. Your customers' data won't end up where it shouldn't.",
      },
    ],
    ctaTitle: "The first step is a conversation.",
    ctaSub: "20 to 30 minutes, no commitment. If your problem isn't worth the investment to solve, I'll tell you myself.",
    cta: "Let's talk",
    ctaNote: "20 to 30 min · no commitment",
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
    cases: "Projetos",
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
    viewAll: "Ver todos os projetos",
    backToHome: "← uaiLabs",
    pageTitle: "Projetos",
    pageSubtitle: "Soluções reais construídas para problemas reais. Cada projeto é um destino na nossa jornada.",
    problemLabel: "Problema",
    solutionLabel: "Solução",
    detailsLabel: "Detalhes",
    projectsLabel: "Construído & entregue",
    dragHint: "arraste para o lado →",
    items: [
      { tag: "Suporte técnico", client: "Provedores de internet", metric: "Até 70% dos chamados resolvidos sozinhos", result: "A IA resolve dúvidas comuns, testes de conexão e consultas de status 24 horas por dia. O atendente humano só entra quando realmente precisa — reduzindo o tempo de resposta de horas para segundos." },
      { tag: "Gestão de documentos", client: "Escritórios contábeis", metric: "15+ horas por semana devolvidas", result: "Cobrança de documentos fiscais, conferência de dados e alertas de prazo rodando no automático. Ninguém precisa lembrar de cobrar, conferir ou correr atrás — o sistema avisa quando algo precisa de atenção." },
      { tag: "Qualificação de leads", client: "Imobiliárias e corretores", metric: "3× mais leads qualificados por corretor", result: "O lead entra pelo WhatsApp, é atendido na hora, responde um filtro inteligente e só chega pro corretor se tiver perfil e interesse real de compra. Sem ligação fria, sem tempo perdido." },
    ],
    projects: [
      {
        slug: "olivia",
        name: "Olívia",
        tag: "Recepcionista IA",
        problem: "Psicóloga gastando horas por dia respondendo WhatsApp, agendando e fazendo onboarding de pacientes.",
        solution: "Sistema multi-agente que conversa, identifica pacientes, transcreve áudios e gerencia o Google Calendar.",
        result: "Recepção automatizada 24/7",
        description: "Olívia é um sistema multi-agente. O agente principal conduz a conversa: identifica se é paciente novo ou recorrente, puxa o histórico e usa esse contexto antes de responder. Áudios são transcritos automaticamente. Quando precisa agendar, a Olívia delega para um sub-agente dedicado que conecta direto no Google Calendar.",
        stack: ["n8n", "GPT-4.1", "GPT-4o mini", "Supabase", "PostgreSQL", "WhatsApp", "Google Calendar", "Docker"],
        demoUrl: "https://drive.google.com/file/d/10jMiqmmxJHGcsctsdW2GHFiKWp9yYWAd/preview",
      },
      {
        slug: "rocketfit",
        name: "Rocket Fit",
        tag: "Agente de Suporte",
        problem: "Base de usuários crescendo com suporte manual no WhatsApp — tempo de resposta alto e respostas inconsistentes.",
        solution: "Agente com RAG no WhatsApp que consulta a base de conhecimento antes de cada resposta.",
        result: "Suporte 24/7 sem precisar contratar",
        description: "Um agente de suporte construído para responder dúvidas sobre o app Rocket Fit: como as funcionalidades funcionam, problemas comuns e bugs conhecidos. Usa RAG para puxar informações relevantes de uma base de FAQs e documentação do produto antes de gerar qualquer resposta.",
        stack: ["n8n", "OpenAI", "Supabase", "pgvector", "WhatsApp", "Docker"],
        demoUrl: "https://drive.google.com/file/d/15x5ZCeljzt78zUamlwJ5qZVkugoEkxai/preview",
      },
      {
        slug: "bestrip",
        name: "Bestrip",
        tag: "Planejador de Viagem IA",
        problem: "Planejar uma viagem significa horas cruzando blogs dispersos, ignorando orçamento, ritmo e clima real.",
        solution: "App que gera guias personalizados com clima, orçamento, segurança e recomendações de bairros.",
        result: "Roteiros completos em segundos",
        description: "O app começa entendendo o viajante: destino, companhia, ritmo, orçamento e datas. A partir daí, chama o modelo Gemini Flash para gerar um guia personalizado com gráficos de clima, estimativas de custo, alertas de segurança e sugestões de bairros e passeios. Funciona em português e inglês.",
        stack: ["React", "Vite", "Tailwind CSS", "Gemini Flash", "Google Gen AI SDK"],
        demoUrl: "https://drive.google.com/file/d/1_21_qS9KzosWbxuFPVyMjudMHPmChbUS/preview",
      },
    ] as CaseProject[],
  },
  about: {
    label: "Sobre",
    titlePre: "O \"uai\" acontece quando o resultado",
    titleHighlight: "supera a expectativa.",
    body1: "Criei a uaiLabs para transformar o potencial da IA em resultados práticos e simplificar a vida das pessoas. Eu uno engenharia, produto e visão de negócio para encontrar onde a IA realmente gera valor e transformar essa oportunidade em uma solução realmente útil.",
    body2: "Cada projeto nasce para gerar impacto e evoluir junto com o negócio.",
    cta: "Conheça quem está por trás",
  },
  profile: {
    backToHome: "← uaiLabs",
    role: "Consultor de IA aplicada para pequenas e médias empresas",
    name: "Ruan Coelho",
    initials: "RC",
    headline: "Coloco IA pra trabalhar dentro da sua empresa",
    headlineAccent: "e cuido dela depois que entra no ar.",
    sub: "Começo com um diagnóstico que mostra o tamanho do problema, implemento o que resolve e fico responsável por manter funcionando.",
    heroCta: "Conversar comigo",
    credentials: [
      "10 anos de mercado",
      "Stellantis North America",
      "Head de Produto · edtech",
      "Fundador · IoT industrial",
      "App: 0 → 700k downloads",
    ],
    whoLabel: "Quem sou eu",
    who: "Olá, eu sou o Ruan. Sou engenheiro e, há mais de 10 anos, ajudo empresas a resolver problemas e melhorar operações. Fui consultor do SEBRAE, Head de Produto em uma edtech, fundador de uma startup de IoT industrial e trabalhei na Stellantis North America com projetos globais de qualidade de dados.",
    who2: "Hoje desenvolvo sistemas e agentes de IA para pequenas e médias empresas. Meu foco é entender a operação, identificar oportunidades de ganho e criar soluções que automatizam processos, aumentam a produtividade e geram resultados reais.",
    whoPunch: "Não vendo robô, vendo problema resolvido.",
    solveLabel: "O que eu resolvo",
    solve: [
      "Tarefa repetitiva que trava a operação e ninguém quer fazer",
      "Cliente esperando uma resposta que já podia ser automática",
      "Time soterrado de mensagem, planilha e copia-e-cola",
      "IA contratada às pressas que virou prateleira em seis meses",
    ],
    workLabel: "Como eu trabalho",
    work: [
      {
        title: "Diagnóstico",
        desc: "Antes de propor qualquer coisa, meço onde dói e quanto custa. Você recebe um número, não um chute.",
      },
      {
        title: "Implementação",
        desc: "Construo o que resolve aquele número, com uma pessoa no controle das decisões que importam e registro de tudo que o sistema faz.",
      },
      {
        title: "Operação",
        desc: "IA não é obra entregue e esquecida. Eu mantenho, ajusto e melhoro mês a mês, e isso já entra no contrato.",
      },
    ],
    whyLabel: "Por que comigo",
    why: [
      {
        k: "Número antes do projeto",
        v: "Entrego o diagnóstico com número na mão antes de te vender qualquer coisa.",
      },
      {
        k: "Operação dentro do contrato",
        v: "A operação contínua faz parte do acordo desde o início, não é cobrança que aparece depois.",
      },
      {
        k: "LGPD desde o dia zero",
        v: "Desenho tudo pensando em proteção de dados. O dado do seu cliente não vai parar onde não deve.",
      },
    ],
    ctaTitle: "O primeiro passo é uma conversa.",
    ctaSub: "20 a 30 minutos, sem compromisso. Se o seu problema não valer o investimento pra resolver, eu mesmo te digo.",
    cta: "Conversar comigo",
    ctaNote: "20 a 30 min · sem compromisso",
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
