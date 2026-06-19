import type { Metadata } from "next";
import CasesPageContent from "./CasesPageContent";

export const metadata: Metadata = {
  title: "Projects — uaiLabs",
  description:
    "Real AI projects built for real problems. From WhatsApp agents to travel planners — see what uaiLabs has shipped.",
  alternates: { canonical: "https://uailabs.vercel.app/cases" },
};

export default function CasesPage() {
  return <CasesPageContent />;
}
