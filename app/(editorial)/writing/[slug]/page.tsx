import { writingEntries, siteConfig } from "@/data/meta";
import { ModeSwitcher } from "@/components/shared/ModeSwitcher";
import { EditorialFooter } from "@/components/editorial/footer";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return writingEntries.map((entry) => ({ slug: entry.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const entry = writingEntries.find((e) => e.slug === params.slug);
  if (!entry) return {};
  return {
    title: `${entry.title} - ${siteConfig.name}`,
    description: entry.title,
  };
}

export default function WritingPage({ params }: { params: { slug: string } }) {
  const entry = writingEntries.find((e) => e.slug === params.slug);
  if (!entry) notFound();

  return (
    <>
      <ModeSwitcher />
      <article className="editorial-container pt-20 pb-16" id="main-content">
        <a
          href="/#writing"
          className="font-mono text-[11px] tracking-[0.1em] uppercase text-fg-secondary hover:text-accent transition-colors"
        >
          &larr; Back to writing
        </a>

        <header className="mt-8 mb-12">
          <h1 className="font-display text-scale-6 md:text-scale-7 leading-tight max-w-[680px]">
            {entry.title}
          </h1>
        </header>

        {entry.status === "coming" ? (
          <div className="max-w-[680px] py-16 text-center">
            <p className="font-mono text-scale-1 tracking-[0.1em] uppercase text-fg-secondary">
              Coming {entry.comingDate?.toLowerCase()}
            </p>
          </div>
        ) : (
          <div className="max-w-[680px] prose-editorial">
            {/* Published content would render here */}
          </div>
        )}
      </article>
      <EditorialFooter />
    </>
  );
}
