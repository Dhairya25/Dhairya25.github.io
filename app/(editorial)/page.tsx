import { Masthead } from "@/components/editorial/masthead";
import { Hero } from "@/components/editorial/hero";
import { NowBlock } from "@/components/editorial/now-block";
import { WorkSection } from "@/components/editorial/work-section";
import { WritingSection } from "@/components/editorial/writing-section";
import { StackSection } from "@/components/editorial/stack-section";
import { ContactSection } from "@/components/editorial/contact-section";
import { EditorialFooter } from "@/components/editorial/footer";
import { ModeRedirect } from "@/components/editorial/mode-redirect";

export default function EditorialPage() {
  return (
    <>
      <ModeRedirect />
      <div id="main-content">
        <Masthead />
        <Hero />
        <NowBlock />
        <WorkSection />
        <WritingSection />
        <StackSection />
        <ContactSection />
        <EditorialFooter />
      </div>
    </>
  );
}
