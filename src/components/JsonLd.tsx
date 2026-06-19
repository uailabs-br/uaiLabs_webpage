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
      a: "No. I handle the technical side; you bring the knowledge of your business.",
    },
    {
      q: "Does it work in my industry?",
      a: "Every solution is built to fit your context. It's not something off the shelf.",
    },
    {
      q: "How long until I see results?",
      a: "Weeks, not months. We start with what makes the biggest difference fastest.",
    },
    {
      q: "What if I don't know where to start?",
      a: "That's exactly what the free conversation is for.",
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
