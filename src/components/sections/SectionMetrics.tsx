"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import { useLanguage } from "@/lib/language-context";

export default function SectionMetrics() {
  const { t } = useLanguage();
  return (
    <SectionWrapper>
      <div>
        <SectionLabel>{t.metrics.label}</SectionLabel>
        <div className="grid grid-cols-2 gap-3 md:gap-0 md:grid-cols-4">
          {t.metrics.items.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="rounded-xl border border-white/5 bg-surface-1/20 p-5 backdrop-blur-md md:rounded-none md:border-0 md:border-l md:border-text-3/60 md:bg-transparent md:p-0 md:py-2 md:pl-8 md:backdrop-blur-none md:first:border-l-0 md:first:pl-0"
            >
              <span
                className="block font-display font-bold text-text"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 44px)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {m.value}
              </span>
              <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.15em] text-text-2">
                {m.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
