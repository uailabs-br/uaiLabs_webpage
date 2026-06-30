"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { LanguageProvider, useLanguage } from "@/lib/language-context";

const EMAIL = "uailabs.br@gmail.com";

/* ── Animated starfield (static when reduced-motion) ─────────────── */
function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.5 + 0.3,
      a: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.0003 + 0.0001,
      phase: Math.random() * Math.PI * 2,
    }));

    const paint = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        const twinkle = reduce
          ? 1
          : Math.sin(time * s.speed * 10 + s.phase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 210, 255, ${s.a * twinkle})`;
        ctx.fill();
      }
    };

    if (reduce) {
      paint(0);
      return () => window.removeEventListener("resize", resize);
    }

    let raf: number;
    const loop = (t: number) => {
      paint(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

/* ── Reveal preset (respects reduced-motion) ─────────────────────── */
function useReveal() {
  const reduce = useReducedMotion();
  return (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.35 },
          transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const },
        };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-label mb-7 inline-flex items-center gap-3 text-text-2">
      <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
      {children}
    </span>
  );
}

function CtaButton({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={`mailto:${EMAIL}`}
      className="group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border border-primary/50 bg-bg px-7 py-4 font-mono text-[12px] font-bold uppercase leading-none tracking-[0.15em] text-text transition-all duration-500 hover:border-transparent hover:text-bg hover:shadow-[0_0_48px_rgba(74,111,255,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-[#7a8cff] to-secondary opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full -skew-x-12 w-1/3 bg-white/20 transition-transform duration-700 delay-200 ease-out group-hover:translate-x-[350%]"
      />
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}

/* ── Inline stroke icons (consistent stroke, no emoji) ───────────── */
const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconTarget() {
  return (
    <svg {...iconProps} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}
function IconCycle() {
  return (
    <svg {...iconProps} aria-hidden>
      <path d="M3 12a9 9 0 0 1 15.5-6.2M21 12a9 9 0 0 1-15.5 6.2" />
      <path d="M18.5 3v3h-3M5.5 21v-3h3" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg {...iconProps} aria-hidden>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
const whyIcons = [IconTarget, IconCycle, IconShield];

/* ── Page ────────────────────────────────────────────────────────── */
function ProfileInner() {
  const { lang, toggle, t } = useLanguage();
  const reveal = useReveal();
  const p = t.profile;

  return (
    <main className="relative min-h-[100dvh] bg-bg">
      <StarField />

      {/* Ambient depth: layered glows */}
      <div className="pointer-events-none fixed left-1/2 top-[-10%] z-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
      <div className="pointer-events-none fixed bottom-[-15%] right-[-10%] z-0 h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[150px]" />

      {/* Nav */}
      <div className="fixed inset-x-0 top-0 z-30 border-b border-text-3/40 bg-bg/70 backdrop-blur-md">
        <div className="container-site flex items-center justify-between py-5">
          <Link
            href="/"
            className="font-mono text-[12px] uppercase tracking-[0.15em] text-text-2 transition-colors duration-300 hover:text-text"
          >
            {p.backToHome}
          </Link>
          <button
            onClick={toggle}
            aria-label="Toggle language"
            className="flex cursor-pointer items-center gap-1 rounded-full border border-text-3 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 hover:border-tertiary/50"
          >
            <span className={lang === "en" ? "text-text" : "text-text-3"}>EN</span>
            <span className="text-text-3">/</span>
            <span className={lang === "pt" ? "text-text" : "text-text-3"}>PT</span>
          </button>
        </div>
      </div>

      <div className="relative z-10">
        <div className="container-site mx-auto max-w-5xl pb-28 pt-32 md:pt-40">
          {/* ── Hero ───────────────────────────────────────────── */}
          <motion.section {...reveal()} className="max-w-3xl">
            <h1 className="text-h1 text-text">
              {p.headline}{" "}
              <span className="bg-gradient-to-r from-primary via-[#8a9bff] to-secondary bg-clip-text text-transparent">
                {p.headlineAccent}
              </span>
            </h1>
            <p className="text-body mt-6 max-w-xl text-text-2">{p.sub}</p>
            <div className="mt-9">
              <CtaButton>{p.heroCta}</CtaButton>
            </div>
          </motion.section>

          {/* ── Who I am ───────────────────────────────────────── */}
          <motion.section {...reveal()} className="mt-28 md:mt-36">
            <SectionLabel>{p.whoLabel}</SectionLabel>
            <div className="grid gap-10 md:grid-cols-[300px_1fr] md:gap-14">
              {/* Portrait */}
              <div className="relative mx-auto w-full max-w-[300px] md:mx-0">
                <span aria-hidden className="absolute -inset-1 rounded-[28px] border-glow-shadow" />
                <span aria-hidden className="absolute -inset-px rounded-[26px] border-glow" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-surface-2 ring-1 ring-white/10">
                  <Image
                    src="/foto-perfil.jpg"
                    alt={p.name}
                    fill
                    sizes="(min-width: 768px) 300px, 100vw"
                    className="object-cover object-[center_20%]"
                  />
                </div>
              </div>

              <div>
                <p className="text-body text-text md:text-[19px] md:leading-[1.7]">
                  {p.who}
                </p>
                <p className="text-body mt-5 text-text md:text-[17px] md:leading-[1.7]">
                  {p.who2}
                </p>
                <p className="mt-9 border-l-2 border-primary/60 pl-5 font-display text-2xl font-bold leading-snug text-text md:text-[28px]">
                  <span className="bg-gradient-to-r from-primary via-[#8a9bff] to-secondary bg-clip-text text-transparent">
                    {p.whoPunch}
                  </span>
                </p>
              </div>
            </div>
          </motion.section>

          {/* ── What I solve ───────────────────────────────────── */}
          <motion.section {...reveal()} className="mt-28 md:mt-36">
            <SectionLabel>{p.solveLabel}</SectionLabel>
            <div className="grid gap-5 sm:grid-cols-2">
              {p.solve.map((item, i) => (
                <motion.div
                  key={item}
                  {...reveal(i * 0.07)}
                  className="group relative flex items-start gap-5 overflow-hidden rounded-2xl border border-white/5 bg-surface-1/20 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:bg-surface-1/70 hover:shadow-[0_8px_30px_rgba(74,111,255,0.12)] md:p-7"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="relative z-10 font-display text-2xl font-bold leading-none text-text-3 transition-colors duration-500 group-hover:text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="relative z-10 font-mono text-[14px] leading-relaxed text-text-2 transition-colors duration-500 group-hover:text-text">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ── How I work (vertical timeline) ─────────────────── */}
          <motion.section {...reveal()} className="mt-28 md:mt-36">
            <SectionLabel>{p.workLabel}</SectionLabel>
            <div className="relative max-w-3xl">
              {/* vertical connecting line */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent"
              />
              <div className="flex flex-col gap-10 md:gap-12">
                {p.work.map((block, i) => (
                  <motion.div
                    key={block.title}
                    {...reveal(i * 0.12)}
                    className="group relative flex items-start gap-6"
                  >
                    {/* glowing node */}
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-bg font-display text-lg font-bold text-primary shadow-[0_0_24px_rgba(74,111,255,0.25)] transition-all duration-500 group-hover:border-primary group-hover:shadow-[0_0_36px_rgba(74,111,255,0.45)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="pt-1.5">
                      <h3 className="font-display text-xl font-bold text-text md:text-2xl">
                        {block.title}
                      </h3>
                      <p className="mt-2.5 max-w-xl font-mono text-[14px] leading-relaxed text-text-2 transition-colors duration-500 group-hover:text-text">
                        {block.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ── Why me ─────────────────────────────────────────── */}
          <motion.section {...reveal()} className="mt-28 md:mt-36">
            <SectionLabel>{p.whyLabel}</SectionLabel>
            <div className="grid gap-5 md:grid-cols-3">
              {p.why.map((pillar, i) => {
                const Icon = whyIcons[i] ?? IconTarget;
                return (
                  <motion.div
                    key={pillar.k}
                    {...reveal(i * 0.1)}
                    className="group relative overflow-hidden rounded-2xl border border-white/5 bg-surface-1/30 p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-secondary/30 hover:bg-surface-1/80 hover:shadow-[0_8px_30px_rgba(176,112,255,0.12)]"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-secondary/10 via-transparent to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <span className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-secondary/30 bg-bg text-secondary transition-colors duration-500 group-hover:text-tertiary">
                      <Icon />
                    </span>
                    <h3 className="relative z-10 mt-5 font-display text-lg font-bold text-text">
                      {pillar.k}
                    </h3>
                    <p className="relative z-10 mt-2.5 font-mono text-[13px] leading-relaxed text-text-2">
                      {pillar.v}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* ── Final CTA ──────────────────────────────────────── */}
          <motion.section {...reveal()} className="relative mt-28 md:mt-36">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-surface-1/40 px-6 py-16 text-center backdrop-blur-md md:py-20">
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/20 blur-[100px]"
              />
              <h2 className="text-h2 relative z-10 mx-auto max-w-xl text-text">{p.ctaTitle}</h2>
              <p className="text-body relative z-10 mx-auto mt-6 max-w-lg text-text-2">{p.ctaSub}</p>
              <div className="relative z-10 mt-10 flex justify-center">
                <CtaButton>{p.cta}</CtaButton>
              </div>
              <p className="relative z-10 mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-text-3">
                {p.ctaNote}
              </p>
            </div>
          </motion.section>
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-text-3/40">
          <div className="container-site mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 py-8 md:flex-row">
            <span className="font-display text-base font-bold tracking-tight text-text">
              uaiLabs
            </span>
            <a
              href={`mailto:${EMAIL}`}
              className="font-mono text-[12px] tracking-[0.05em] text-text-2 transition-colors duration-300 hover:text-text"
            >
              {EMAIL}
            </a>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-2">
              &copy; {new Date().getFullYear()} uaiLabs
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default function ProfilePageContent() {
  return (
    <LanguageProvider>
      <ProfileInner />
    </LanguageProvider>
  );
}
