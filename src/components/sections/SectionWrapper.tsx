"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({
  children,
  className = "",
}: SectionWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Fade in as it enters, stays solid while sticky, fades out before leaving
  const opacity = useTransform(
    scrollYProgress,
    [0.15, 0.38, 0.62, 0.85],
    [0, 1, 1, 0]
  );

  // Subtle Y translation parallax effect synced with scroll
  const y = useTransform(
    scrollYProgress,
    [0.15, 0.38, 0.62, 0.85],
    [40, 0, 0, -40]
  );

  return (
    // Tall scroll region; the inner content sticks to the viewport while the
    // user scrolls through it, then releases to the next section.
    <section ref={containerRef} className="relative min-h-screen w-full sm:min-h-[120vh] md:min-h-[140vh]">
      <div
        className={`sticky top-0 flex h-screen items-center ${className}`}
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
