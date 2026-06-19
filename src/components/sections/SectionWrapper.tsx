"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function SectionWrapper({
  children,
  className = "",
  id,
}: SectionWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Fade in as it enters, then hold solid through the wide middle. The plateau
  // extends to ~0.92 so the section is still fully opaque at the scroll point
  // where it sticks to the viewport top (≈0.71 on desktop, ≈0.83 on mobile) —
  // which is exactly where an anchor jump lands.
  const opacity = useTransform(
    scrollYProgress,
    [0.05, 0.22, 0.92, 0.99],
    [0, 1, 1, 0]
  );

  // Subtle Y translation parallax effect synced with scroll
  const y = useTransform(
    scrollYProgress,
    [0.05, 0.22, 0.92, 0.99],
    [40, 0, 0, -40]
  );

  return (
    // Tall scroll region; the inner content sticks to the viewport while the
    // user scrolls through it, then releases to the next section. Base height is
    // 120vh (not min-h-screen) so the sticky-to-top scroll point is consistent
    // across breakpoints, keeping anchor-jump landings predictable.
    <section
      ref={containerRef}
      id={id}
      className="relative min-h-[120vh] w-full md:min-h-[140vh]"
    >
      <div
        className={`sticky top-0 flex h-screen items-start pt-[16vh] ${className}`}
      >
        <motion.div
          style={{ opacity, y }}
          className="container-site relative"
        >
          {/* Soft scrim — keeps text legible over the 3D scene, no hard edges */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -inset-y-12 -z-10 rounded-[64px] bg-bg/55 blur-3xl"
          />
          {children}
        </motion.div>
      </div>
    </section>
  );
}
