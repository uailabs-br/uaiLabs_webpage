"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import { useLanguage } from "@/lib/language-context";

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);
  return isTouch;
}

function CaseRow({ client, tag, result, index }: { client: string; tag: string; result: string; index: number }) {
  const isTouch = useIsTouchDevice();
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isTouch || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "-35% 0px -35% 0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isTouch]);

  const active = isTouch && inView;

  return (
    <motion.div
      ref={ref}
      key={client}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`group relative grid grid-cols-1 items-center gap-4 border-b border-text-3/20 py-8 px-4 rounded-xl transition-all duration-500 md:grid-cols-[auto_1fr_auto] md:gap-10 ${
        active ? "bg-surface-1/70" : "hover:bg-surface-1/70"
      }`}
    >
      <div className={`absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-gradient-to-b from-primary to-secondary transition-transform duration-300 origin-center ${active ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"}`} />

      <span className={`font-mono text-[11px] tracking-[0.2em] transition-all duration-300 ${active ? "translate-x-1 text-secondary" : "text-primary group-hover:translate-x-1 group-hover:text-secondary"}`}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className={`flex flex-col gap-2 transition-all duration-300 md:flex-row md:items-baseline md:gap-5 ${active ? "translate-x-2" : "group-hover:translate-x-2"}`}>
        <h3 className="font-display text-xl font-bold text-text md:text-2xl">
          {client}
        </h3>
        <span className={`font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 ${active ? "text-tertiary" : "text-text-2 group-hover:text-tertiary"}`}>
          {tag}
        </span>
      </div>
      <p className={`font-mono text-[14px] leading-snug transition-all duration-300 md:text-right ${active ? "text-text" : "text-tertiary group-hover:text-text"}`}>
        {result}
      </p>
    </motion.div>
  );
}

export default function SectionCases() {
  const { t } = useLanguage();
  return (
    <SectionWrapper>
      <div id="cases">
        <SectionLabel>{t.cases.label}</SectionLabel>
        <div className="border-t border-text-3/40">
          {t.cases.items.map((c, i) => (
            <CaseRow key={c.client} client={c.client} tag={c.tag} result={c.result} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
