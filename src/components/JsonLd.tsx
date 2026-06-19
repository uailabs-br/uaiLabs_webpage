const SITE_URL = "https://uailabs.vercel.app";

const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "uaiLabs",
  url: SITE_URL,
  description:
    "AI agents and automation that ship to production. From strategy to running infrastructure.",
  email: "uailabs.br@gmail.com",
  areaServed: [
    { "@type": "Place", name: "Minas Gerais, Brazil" },
    { "@type": "Place", name: "Worldwide" },
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "AI Agents",
    "Process Automation",
    "LLM",
    "RAG",
    "Machine Learning",
  ],
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "uaiLabs",
  url: SITE_URL,
  description:
    "AI agents and automation that ship to production and pay for themselves.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: ["en", "pt-BR"],
};

const services = [
  {
    name: "Virtual Assistants",
    description:
      "Assistants that handle repetitive tasks on their own, so your team can focus on what matters.",
  },
  {
    name: "Smarter Data",
    description:
      "Your data answering business questions, instead of sitting forgotten in spreadsheets.",
  },
  {
    name: "Tailored AI",
    description:
      "AI that learns how your company works and gives the right answers, not generic ones.",
  },
  {
    name: "Process Automation",
    description:
      "Fewer errors, less rework, and processes that grow without adding people.",
  },
].map((s) => ({
  "@type": "Service",
  serviceType: s.name,
  name: s.name,
  description: s.description,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: "Worldwide",
}));

const faqPage = {
  "@type": "FAQPage",
  mainEntity: [
    {
      q: "Do I need to understand AI?",
      a: "No. You don't need any technical background. I handle the AI engineering, integrations, and infrastructure end to end. What you bring is something no AI can replace: deep knowledge of how your business works, what your customers need, and where the bottlenecks are. In practice, our conversations feel more like business strategy sessions than tech meetings. You describe the problem, I build the solution.",
    },
    {
      q: "Does it work in my industry?",
      a: "Yes. Because nothing is pre-built or off the shelf. Every solution is designed from scratch around your processes, your data, and your team's reality. I've worked with service providers, professional firms, real estate, and retail, but the industry matters less than the problem. If your team spends hours on repetitive tasks, manual reviews, or answering the same questions, AI can help regardless of the sector.",
    },
    {
      q: "How long until I see results?",
      a: "Most projects deliver a working first version within 2 to 4 weeks. We start with a 30-minute conversation to map the highest-impact opportunity, then move straight to building. There's no months-long discovery phase or bulky proposal deck. You'll see a functional prototype quickly, validate it with real use, and iterate from there. The goal is always the same: a solution running and generating value as fast as possible.",
    },
    {
      q: "What if I don't know where to start?",
      a: "That's exactly what the initial conversation is for. In 30 minutes, we walk through your day-to-day operations together and spot where AI can save the most time or reduce the most friction. You don't need a project brief or a tech plan beforehand. Most clients come in knowing they want to use AI but unsure where, and leave with a clear, prioritized next step.",
    },
  ].map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [organization, website, ...services, faqPage],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
