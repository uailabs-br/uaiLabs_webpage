import type { Metadata } from "next";
import ProfilePageContent from "./ProfilePageContent";

export const metadata: Metadata = {
  title: "Ruan Coelho · Consultor de IA para PMEs | uaiLabs",
  description:
    "Ruan Coelho coloca IA pra trabalhar dentro de pequenas e médias empresas: diagnóstico com número, implementação e operação contínua. Engenheiro mecatrônico, fundador da uaiLabs.",
  alternates: { canonical: "https://uailabs.vercel.app/ruan-coelho" },
};

export default function RuanPage() {
  return <ProfilePageContent />;
}
