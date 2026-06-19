"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import Button from "@/components/Button";

const EMAIL = "uailabs.br@gmail.com";

export default function SectionContact() {
  const { t } = useLanguage();
  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full flex-col"
    >
      <div className="container-site flex flex-1 flex-col items-center justify-center py-20 text-center md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative mx-auto flex max-w-2xl flex-col items-center"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-16 -inset-y-14 -z-10 rounded-[80px] bg-bg/60 blur-3xl"
          />
          <span className="text-label mb-10 inline-flex items-center gap-3 text-text-2">
            <span className="h-px w-8 bg-text-3" />
            {t.contact.label}
            <span className="h-px w-8 bg-text-3" />
          </span>
          <h2 className="text-h2 text-text">
            {t.contact.titlePre}{" "}
            <span className="text-secondary">{t.contact.titleHighlight}</span>
          </h2>
          <p className="text-body mt-8 max-w-md text-text-2">
            {t.contact.sub}
          </p>
          <div className="mt-12 flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <Button href={`mailto:${EMAIL}`} variant="primary">
                {t.contact.cta}
              </Button>
              <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-text-2">
                {t.contact.ctaNote}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="container-site mt-auto flex flex-col items-center justify-between gap-4 border-t border-text-3/40 py-8 text-center md:flex-row md:text-left">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="font-display text-base font-bold tracking-tight text-text">
            uaiLabs
          </span>
          <a
            href={`mailto:${EMAIL}`}
            className="font-mono text-[12px] tracking-[0.05em] text-text-2 transition-colors duration-300 hover:text-text"
          >
            {EMAIL}
          </a>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-2">
          &copy; {new Date().getFullYear()} uaiLabs. {t.contact.rights}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-2">
          Minas Gerais → {t.contact.label === "Contato" ? "Mundo" : "Worldwide"}
        </span>
      </footer>
    </section>
  );
}
