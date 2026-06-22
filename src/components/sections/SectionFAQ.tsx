"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import { useLanguage } from "@/lib/language-context";

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="border-b border-text-3/20"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
      >
        <h3 className="font-display text-xl font-bold text-text md:text-2xl">
          {q}
        </h3>
        <span
          className={`shrink-0 text-primary transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 font-mono text-[13px] leading-relaxed text-text-2">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SectionFAQ() {
  const { t } = useLanguage();
  return (
    <SectionWrapper id="faq">
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-12 -inset-y-14 -z-10 rounded-[64px] bg-bg/65 blur-3xl md:hidden"
        />
        <SectionLabel>{t.faq.label}</SectionLabel>
        <div className="mx-auto max-w-3xl">
          {t.faq.items.map((item, i) => (
            <FaqItem key={item.q} q={item.q} a={item.a} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
