"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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

function ProjectPreview({
  slug,
  name,
  tag,
  result,
  problem,
  index,
}: {
  slug: string;
  name: string;
  tag: string;
  result: string;
  problem: string;
  index: number;
}) {
  const isTouch = useIsTouchDevice();
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

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
    <motion.a
      ref={ref}
      href={`/cases#${slug}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`group relative block overflow-hidden rounded-2xl border bg-surface-1/20 p-6 backdrop-blur-md transition-all duration-500 sm:p-8 ${
        active
          ? "-translate-y-1 border-primary/30 bg-surface-1/80 shadow-[0_8px_30px_rgba(74,111,255,0.12)]"
          : "border-white/5 hover:-translate-y-1 hover:bg-surface-1/80 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(74,111,255,0.12)]"
      }`}
    >
      <div
        className={`absolute inset-0 pointer-events-none bg-gradient-to-tr from-primary/10 via-transparent to-secondary/5 transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      />
      <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
        {tag}
      </span>
      <h3 className="relative z-10 mt-2 font-display text-xl font-bold text-text md:text-2xl">
        {name}
      </h3>
      <p className="relative z-10 mt-2 font-mono text-[13px] leading-relaxed text-text-2">
        {problem}
      </p>
      <div className="relative z-10 mt-4">
        <span className="font-mono text-[13px] font-bold text-primary">
          {result}
        </span>
      </div>
    </motion.a>
  );
}

export default function SectionProjects() {
  const { t } = useLanguage();
  return (
    <SectionWrapper id="cases">
      <div>
        <SectionLabel>{t.cases.projectsLabel}</SectionLabel>
        <div className="grid gap-6 md:grid-cols-3">
          {t.cases.projects.map((p, i) => (
            <ProjectPreview
              key={p.slug}
              slug={p.slug}
              name={p.name}
              tag={p.tag}
              result={p.result}
              problem={p.problem}
              index={i}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/cases"
            className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.15em] text-text-2 transition-colors duration-300 hover:text-text"
          >
            {t.cases.viewAll}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
