"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import { useLanguage } from "@/lib/language-context";

export default function SectionFAQ() {
  const { t } = useLanguage();
  return (
    <SectionWrapper>
      <div>
        <SectionLabel>{t.faq.label}</SectionLabel>
        <div className="grid gap-x-8 gap-y-10 md:gap-x-16 md:grid-cols-2">
          {t.faq.items.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex flex-col gap-3"
            >
              <h3 className="font-display text-xl font-bold text-text md:text-2xl">
                {item.q}
              </h3>
              <p className="font-mono text-[13px] leading-relaxed text-text-2">
                {item.a}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
