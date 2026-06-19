"use client";

import { useState } from "react";
import type { CaseProject } from "@/lib/i18n";
import { useLanguage } from "@/lib/language-context";

const STACK_ICONS: Record<string, string> = {
  n8n: "n8n",
  OpenAI: "openai",
  Supabase: "supabase",
  PostgreSQL: "postgresql",
  pgvector: "postgresql",
  WhatsApp: "whatsapp",
  Docker: "docker",
  React: "react",
  Vite: "vite",
  "Tailwind CSS": "tailwindcss",
  "Google Calendar": "googlecalendar",
  "Gemini Flash": "googlegemini",
  "Google Gen AI SDK": "google",
  "GPT-4.1": "openai",
  "GPT-4o mini": "openai",
};

function StackBadge({ name }: { name: string }) {
  const slug = STACK_ICONS[name];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-text-3/30 bg-surface-1/40 px-3 py-1.5 font-mono text-[11px] text-text-2 transition-colors duration-300 hover:border-primary/30 hover:text-text">
      {slug && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://cdn.simpleicons.org/${slug}/8da0cf`}
          alt=""
          width={14}
          height={14}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
          className="h-3.5 w-3.5 object-contain"
        />
      )}
      {name}
    </span>
  );
}

function Lightbox({
  src,
  type,
  onClose,
}: {
  src: string;
  type: "image" | "video";
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-text-3/40 text-text-2 transition-colors hover:bg-surface-1/40 hover:text-text"
        aria-label="Close"
      >
        ✕
      </button>
      <div
        className="max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {type === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt="Expanded view"
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
          />
        ) : (
          <iframe
            src={src}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="aspect-video w-[90vw] max-w-5xl rounded-xl"
          />
        )}
      </div>
    </div>
  );
}

function MediaSection({ slug, demoUrl }: { slug: string; demoUrl?: string }) {
  const [hasWorkflow, setHasWorkflow] = useState(true);
  const [lightbox, setLightbox] = useState<{
    src: string;
    type: "image" | "video";
  } | null>(null);

  if (!hasWorkflow && !demoUrl) return null;

  return (
    <>
      <div
        className={`mt-6 grid gap-4 ${hasWorkflow && demoUrl ? "md:grid-cols-2" : ""}`}
      >
        {hasWorkflow && (
          <button
            type="button"
            onClick={() =>
              setLightbox({
                src: `/cases/${slug}/workflow.png`,
                type: "image",
              })
            }
            className="cursor-pointer overflow-hidden rounded-xl border border-text-3/20 transition-border duration-300 hover:border-primary/30"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/cases/${slug}/workflow.png`}
              alt="Workflow architecture"
              loading="lazy"
              onError={() => setHasWorkflow(false)}
              className="w-full object-cover"
            />
          </button>
        )}
        {demoUrl && (
          <button
            type="button"
            onClick={() => setLightbox({ src: demoUrl, type: "video" })}
            className="cursor-pointer overflow-hidden rounded-xl border border-text-3/20 transition-border duration-300 hover:border-primary/30"
          >
            <iframe
              src={demoUrl}
              allow="autoplay; encrypted-media"
              className="aspect-video w-full pointer-events-none"
            />
          </button>
        )}
      </div>
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          type={lightbox.type}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}

export default function CaseCard({
  project,
  isActive,
}: {
  project: CaseProject;
  index: number;
  isActive: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();

  return (
    <div
      className={`group relative rounded-2xl p-px transition-opacity duration-700 ${
        isActive ? "opacity-100" : "opacity-100"
      }`}
    >
      {/* Gradient border layer — sits behind, visible through the 1px gap */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-700 ${
          isActive
            ? "opacity-100 border-glow"
            : "opacity-0 group-hover:opacity-100 group-hover:border-glow"
        }`}
        style={{
          background:
            "conic-gradient(from 0deg, rgba(74,111,255,0.5), rgba(176,112,255,0.4), rgba(74,111,255,0.5), rgba(176,112,255,0.4), rgba(74,111,255,0.5))",
        }}
      />

      {/* Outer glow */}
      <div
        className={`absolute -inset-3 rounded-3xl transition-opacity duration-700 ${
          isActive
            ? "opacity-100 border-glow-shadow"
            : "opacity-0 group-hover:opacity-100 group-hover:border-glow-shadow"
        }`}
        style={{
          background:
            "conic-gradient(from 0deg, rgba(74,111,255,0.3), rgba(176,112,255,0.2), rgba(74,111,255,0.3), rgba(176,112,255,0.2), rgba(74,111,255,0.3))",
        }}
      />

      {/* Card content — covers everything except the 1px border */}
      <article className="relative z-10 overflow-hidden rounded-2xl bg-[#07070f]">

        <div className="relative z-10 p-6 sm:p-8 md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                {project.tag}
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-text md:text-3xl">
                {project.name}
              </h2>
            </div>
            <div className="shrink-0 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2">
              <span className="font-mono text-[13px] font-bold text-primary">
                {project.result}
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-tertiary">
                {t.cases.problemLabel}
              </span>
              <p className="mt-1 font-mono text-[14px] leading-relaxed text-text">
                {project.problem}
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-tertiary">
                {t.cases.solutionLabel}
              </span>
              <p className="mt-1 font-mono text-[14px] leading-relaxed text-text">
                {project.solution}
              </p>
            </div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-6 inline-flex cursor-pointer items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-text-2 transition-colors duration-300 hover:text-text"
          >
            {expanded ? "−" : "+"} {t.cases.detailsLabel}
            <span
              className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 6l4 4 4-4" />
              </svg>
            </span>
          </button>

          <div
            className={`grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <p className="mt-4 font-mono text-[14px] leading-relaxed text-text/80">
                {project.description}
              </p>
              <MediaSection slug={project.slug} demoUrl={project.demoUrl} />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <StackBadge key={tech} name={tech} />
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
