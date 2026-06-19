import type { Metadata } from "next";
import { Syne, Space_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uailabs.com.br"),
  title: "uaiLabs — AI agents and automation that ship to production",
  description:
    "From strategy to running infrastructure. AI agents and automation that ship to production and pay for themselves. Minas Gerais to worldwide.",
  keywords: [
    "AI agents",
    "automation",
    "LLM",
    "machine learning",
    "RAG",
    "uaiLabs",
  ],
  openGraph: {
    type: "website",
    title: "uaiLabs — AI agents and automation that ship to production",
    description:
      "From strategy to running infrastructure. No promise that doesn't turn into a number. A universe of possibilities, actually delivered.",
    siteName: "uaiLabs",
    locale: "en_US",
    alternateLocale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "uaiLabs — AI agents and automation that ship to production",
    description:
      "From strategy to running infrastructure. A universe of possibilities, actually delivered.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>{children}</body>
    </html>
  );
}
