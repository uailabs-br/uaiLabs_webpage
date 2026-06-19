"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LanguageProvider, useLanguage } from "@/lib/language-context";
import CaseCard from "./CaseCard";

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.5 + 0.3,
      a: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.0003 + 0.0001,
      phase: Math.random() * Math.PI * 2,
    }));

    let raf: number;
    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        const twinkle = Math.sin(time * s.speed * 10 + s.phase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 210, 255, ${s.a * twinkle})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}

function CasesInner() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = t.cases.projects.length + 2;
  const cooldownRef = useRef(false);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, totalSlides - 1));
      setActiveIndex(clamped);
    },
    [totalSlides]
  );

  const next = useCallback(() => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    goTo(activeIndex + 1);
    setTimeout(() => { cooldownRef.current = false; }, 700);
  }, [activeIndex, goTo]);

  const prev = useCallback(() => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    goTo(activeIndex - 1);
    setTimeout(() => { cooldownRef.current = false; }, 700);
  }, [activeIndex, goTo]);

  // Wheel (vertical + horizontal) → one slide at a time
  useEffect(() => {
    let accumulated = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta =
        Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      accumulated += delta;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        accumulated = 0;
      }, 150);

      if (accumulated > 100) {
        accumulated = 0;
        next();
      } else if (accumulated < -100) {
        accumulated = 0;
        prev();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      clearTimeout(timeout);
    };
  }, [next, prev]);

  // Touch swipe — horizontal only, vertical scrolls the card content
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) next();
        else prev();
      }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [next, prev]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const getSlideTransform = (i: number) => {
    const offset = i - activeIndex;
    const absOffset = Math.abs(offset);
    const rotateY = offset * -30;
    const scale = 1 - Math.min(absOffset * 0.08, 0.2);
    const translateX = offset * 110;
    const opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.3 : 0;
    return {
      transform: `perspective(1200px) translateX(${translateX}%) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      transition: "transform 0.9s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.9s ease-out",
      pointerEvents: (absOffset === 0 ? "auto" : "none") as React.CSSProperties["pointerEvents"],
    };
  };

  return (
    <main className="relative h-[100dvh] overflow-hidden bg-bg">
      <StarField />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none h-[500px] w-[500px] rounded-full bg-primary/15 blur-[120px]" />

      {/* Nav */}
      <div className="fixed top-0 inset-x-0 z-20 border-b border-text-3/40 bg-bg/70 backdrop-blur-md">
        <div className="container-site flex items-center justify-between py-5">
          <Link
            href="/"
            className="font-mono text-[12px] uppercase tracking-[0.15em] text-text-2 transition-colors duration-300 hover:text-text"
          >
            {t.cases.backToHome}
          </Link>
          <span className="font-display text-lg font-bold tracking-tight text-text">
            uaiLabs
          </span>
        </div>
      </div>

      {/* Slides — no native scroll, purely transform-driven */}
      <div className="relative h-full w-full pt-16">
        {/* Intro */}
        <div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={getSlideTransform(0)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative max-w-xl text-center"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-10 -inset-y-12 -z-10 rounded-[64px] bg-bg/60 blur-3xl"
            />
            <p className="text-label mb-6 flex items-center justify-center gap-2 text-text-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(74,111,255,0.6)]" />
              {t.cases.projectsLabel}
            </p>
            <h1 className="text-h1 text-text">{t.cases.pageTitle}</h1>
            <p className="text-body mt-6 text-text-2">
              {t.cases.pageSubtitle}
            </p>
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mt-12 font-mono text-[12px] uppercase tracking-[0.2em] text-text-3"
            >
              scroll →
            </motion.div>
          </motion.div>
        </div>

        {/* Projects */}
        {t.cases.projects.map((project, i) => {
          const slideIndex = i + 1;
          return (
            <div
              key={project.slug}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden flex items-start md:items-center justify-center px-4 py-20 md:px-16 md:py-0"
              style={getSlideTransform(slideIndex)}
            >
              <div className="w-full max-w-3xl">
                <CaseCard
                  project={project}
                  index={i}
                  isActive={activeIndex === slideIndex}
                />
              </div>
            </div>
          );
        })}

        {/* CTA */}
        <div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={getSlideTransform(totalSlides - 1)}
        >
          <div className="relative max-w-xl text-center">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-10 -inset-y-12 -z-10 rounded-[64px] bg-bg/60 blur-3xl"
            />
            <h2 className="text-h2 text-text">
              {t.contact.titlePre}{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t.contact.titleHighlight}
              </span>
            </h2>
            <p className="text-body mt-6 mx-auto max-w-lg text-text-2">
              {t.contact.sub}
            </p>
            <div className="mt-10">
              <Link
                href="/#contact"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-primary/50 bg-bg px-6 py-4 font-mono text-[12px] font-bold uppercase leading-none tracking-[0.15em] text-text transition-all duration-500 hover:border-transparent hover:text-bg hover:shadow-[0_0_48px_rgba(74,111,255,0.35)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-[#7a8cff] to-secondary opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full -skew-x-12 w-1/3 bg-white/20 transition-transform duration-700 delay-200 ease-out group-hover:translate-x-[350%]"
                />
                <span className="relative z-10">{t.contact.cta}</span>
              </Link>
              <p className="mt-4 font-mono text-[11px] text-text-3">
                {t.contact.ctaNote}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="fixed bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {Array.from({ length: totalSlides }, (_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`rounded-full transition-all duration-500 cursor-pointer ${
              i === activeIndex
                ? "h-1.5 w-8 bg-primary shadow-[0_0_12px_rgba(74,111,255,0.6)]"
                : "h-1.5 w-1.5 bg-text-3 hover:bg-text-2"
            }`}
          />
        ))}
      </div>

      <div className="fixed bottom-8 right-8 z-20 hidden font-mono text-[10px] text-text-3 md:block">
        ← → ↑ ↓
      </div>
    </main>
  );
}

export default function CasesPageContent() {
  return (
    <LanguageProvider>
      <CasesInner />
    </LanguageProvider>
  );
}
