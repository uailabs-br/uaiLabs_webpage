"use client";

import { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

const base =
  "group relative inline-flex items-center justify-center overflow-hidden rounded-xl py-4 font-mono text-[12px] font-bold uppercase leading-none tracking-[0.15em] transition-all duration-500";

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  if (variant === "secondary") {
    return (
      <a
        href={href}
        className={`${base} px-9 border border-text-3 font-normal text-text-2 hover:border-tertiary/50 hover:text-text ${className}`}
      >
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      className={`${base} group px-6 border border-primary/50 bg-bg text-text hover:border-transparent hover:text-bg hover:shadow-[0_0_48px_rgba(74,111,255,0.35)] ${className}`}
    >
      {/* Gradient background — fades in simultaneously on hover */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-[#7a8cff] to-secondary opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100"
      />

      {/* Diagonal shimmer beam — crosses after fill is visible */}
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full -skew-x-12 bg-white/20 w-1/3 transition-transform duration-700 delay-200 ease-out group-hover:translate-x-[350%]"
      />

      <span className="relative z-10">{children}</span>
    </a>
  );
}
