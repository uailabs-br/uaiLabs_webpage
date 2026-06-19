"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";

export default function Nav() {
  const { lang, toggle } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-30 transition-all duration-500 ${
        scrolled
          ? "border-b border-text-3/40 bg-bg/70 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-site flex items-center justify-between py-5">
        <a
          href="#"
          className="font-display text-lg font-bold tracking-tight text-text"
        >
          uaiLabs
        </a>
        <button
          onClick={toggle}
          aria-label="Toggle language"
          className="flex items-center gap-1 rounded-full border border-text-3 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 hover:border-tertiary/50"
        >
          <span className={lang === "en" ? "text-text" : "text-text-3"}>EN</span>
          <span className="text-text-3">/</span>
          <span className={lang === "pt" ? "text-text" : "text-text-3"}>PT</span>
        </button>
      </div>
    </nav>
  );
}
