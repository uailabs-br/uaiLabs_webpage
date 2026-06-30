"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Lang, translations, Translation } from "./i18n";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    // A manual choice always wins on return visits.
    const stored = window.localStorage.getItem("lang") as Lang | null;
    if (stored === "en" || stored === "pt") {
      setLang(stored);
      return;
    }
    // First visit: detect the browser's preferred languages.
    // Portuguese → "pt", anything else → "en" (default).
    const prefs = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];
    const prefersPt = prefs.some((l) => l.toLowerCase().startsWith("pt"));
    setLang(prefersPt ? "pt" : "en");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = () => setLang((l) => (l === "en" ? "pt" : "en"));

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, toggle, t: translations[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
