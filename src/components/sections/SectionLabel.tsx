"use client";

interface SectionLabelProps {
  children: React.ReactNode;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="mb-12 flex items-center gap-4">
      <span className="h-px w-8 bg-text-3" />
      <span className="text-label text-text-2">{children}</span>
    </div>
  );
}
