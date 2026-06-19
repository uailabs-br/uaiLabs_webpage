"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import Button from "@/components/Button";

const reveal = (delay: number) => ({
  initial: { opacity: 0.01, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

export default function SectionHero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-screen w-full items-center py-20 md:py-28">
      <div className="container-site">
        <div className="relative max-w-3xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-10 -inset-y-12 -z-10 rounded-[64px] bg-bg/55 blur-3xl"
          />
          <motion.p
            {...reveal(0.2)}
            className="text-label mb-8 flex items-center gap-2 text-text-2"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(74,111,255,0.6)]" />
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1 {...reveal(0.35)} className="text-h1 text-text">
            {t.hero.headlinePre}
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t.hero.headlineHighlight}
            </span>
            {t.hero.headlinePost}
          </motion.h1>

          <motion.p
            {...reveal(0.6)}
            className="text-body mt-8 max-w-xl text-text/80"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0.01, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 flex flex-col gap-4 sm:flex-row"
          >
            <Button href="#contact" variant="primary">
              {t.hero.cta}
            </Button>
            <Button href="#services" variant="secondary">
              {t.hero.ctaSecondary}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-12 w-px origin-top bg-gradient-to-b from-text-2 to-transparent"
        />
      </motion.div>
    </section>
  );
}
