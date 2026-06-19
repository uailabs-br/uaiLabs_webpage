"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import { useLanguage } from "@/lib/language-context";

const STACK: { name: string; slug?: string }[] = [
  { name: "Claude", slug: "claude" },
  { name: "OpenAI", slug: undefined },
  { name: "Gemini", slug: "googlegemini" },
  { name: "Python", slug: "python" },
  { name: "n8n", slug: "n8n" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Supabase", slug: "supabase" },
  { name: "Docker", slug: "docker" },
  { name: "Linux", slug: "linux" },
  { name: "WhatsApp", slug: "whatsapp" },
  { name: "Google Workspace", slug: "google" },
];

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);
  return isTouch;
}

function ServiceCard({ title, desc, index }: { title: string; desc: string; index: number }) {
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] },
      }}
      viewport={{ once: true, amount: 0.3 }}
      className={`group relative overflow-hidden rounded-2xl border bg-surface-1/20 p-6 backdrop-blur-md transition-all duration-500 sm:p-8 md:p-10 ${
        active
          ? "-translate-y-1 border-primary/30 bg-surface-1/80 shadow-[0_8px_30px_rgba(74,111,255,0.12)]"
          : "border-white/5 hover:-translate-y-1 hover:bg-surface-1/80 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(74,111,255,0.12)]"
      }`}
    >
      <div className={`absolute inset-0 pointer-events-none bg-gradient-to-tr from-primary/10 via-transparent to-secondary/5 transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
      <h3
        className="relative z-10 font-display text-2xl font-bold text-text md:text-[28px]"
        style={{ letterSpacing: "-0.02em" }}
      >
        {title}
      </h3>
      <p className="relative z-10 mt-3 max-w-sm font-mono text-[13px] leading-relaxed text-text-2">
        {desc}
      </p>
    </motion.div>
  );
}

export default function SectionServices() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  return (
    <SectionWrapper id="services">
      <div>
        <SectionLabel>{t.services.label}</SectionLabel>
        <div className="grid gap-6 md:grid-cols-2">
          {t.services.items.map((s, i) => (
            <ServiceCard key={s.title} title={s.title} desc={s.desc} index={i} />
          ))}
        </div>

        <div className="mt-10">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-text-2 transition-colors duration-300 hover:text-text"
          >
            {t.services.stackLabel}
            <span
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            >
              ↓
            </span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-4 pt-6 sm:gap-x-7">
                  {STACK.map((tech) => (
                    <span
                      key={tech.name}
                      title={tech.name}
                      className="group/tech inline-flex items-center gap-2 opacity-70 transition-opacity duration-300 hover:opacity-100"
                    >
                      {tech.slug && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`https://cdn.simpleicons.org/${tech.slug}/8da0cf`}
                          alt={tech.name}
                          width={18}
                          height={18}
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display =
                              "none";
                          }}
                          className="h-[18px] w-[18px] object-contain"
                        />
                      )}
                      <span className="font-mono text-[12px] tracking-[0.04em] text-text-2 transition-colors duration-300 group-hover/tech:text-text">
                        {tech.name}
                      </span>
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
