import SpaceCanvasLoader from "@/components/SpaceCanvasLoader";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import { LanguageProvider } from "@/lib/language-context";
import SectionHero from "@/components/sections/SectionHero";
import SectionMetrics from "@/components/sections/SectionMetrics";
import SectionServices from "@/components/sections/SectionServices";
import SectionCases from "@/components/sections/SectionCases";
import SectionAbout from "@/components/sections/SectionAbout";
import SectionFAQ from "@/components/sections/SectionFAQ";
import SectionContact from "@/components/sections/SectionContact";

export default function Home() {
  return (
    <LanguageProvider>
      <ScrollProgress />
      <Nav />
      <main>
        <SpaceCanvasLoader />
        <div className="relative z-10">
          <SectionHero />
          <SectionMetrics />
          <SectionServices />
          <SectionCases />
          <SectionAbout />
          <SectionFAQ />
          <SectionContact />
        </div>
      </main>
    </LanguageProvider>
  );
}
