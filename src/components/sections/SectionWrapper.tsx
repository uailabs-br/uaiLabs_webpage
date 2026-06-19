"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  sectionClassName?: string;
  id?: string;
}

export default function SectionWrapper({
  children,
  className = "",
  sectionClassName,
  id,
}: SectionWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0.05, 0.22, 0.92, 0.99],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0.05, 0.22, 0.92, 0.99],
    [40, 0, 0, -40]
  );

  return (
    <section
      ref={containerRef}
      id={id}
      className={`relative min-h-[100vh] w-full md:min-h-[140vh] ${sectionClassName ?? ""}`}
    >
      <div
        className={`sticky top-0 flex h-screen items-start pt-[10vh] md:pt-[16vh] ${className}`}
      >
        <motion.div
          style={{ opacity, y }}
          className="container-site relative"
        >
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
