"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import { useLanguage } from "@/lib/language-context";

export default function SectionAbout() {
  const { t } = useLanguage();
  return (
    <SectionWrapper id="about">
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-12 -inset-y-14 -z-10 rounded-[64px] bg-bg/65 blur-3xl md:hidden"
        />
        <SectionLabel>{t.about.label}</SectionLabel>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-20">
          <h2 className="text-h2 text-text">
            {t.about.titlePre}{" "}
            <span className="text-primary">{t.about.titleHighlight}</span>
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col justify-end gap-5"
          >
            <p className="text-body text-text-2">
              {t.about.body1}
            </p>
            <p className="text-body text-text-2">
              {t.about.body2}
            </p>
            <Link
              href="/ruan-coelho"
              className="mt-2 inline-flex items-center gap-2 font-mono text-sm text-primary transition-colors duration-300 hover:text-secondary"
            >
              {t.about.cta}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
