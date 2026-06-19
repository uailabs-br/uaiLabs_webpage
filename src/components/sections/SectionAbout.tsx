"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import { useLanguage } from "@/lib/language-context";

export default function SectionAbout() {
  const { t } = useLanguage();
  return (
    <SectionWrapper id="about">
      <div>
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
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
