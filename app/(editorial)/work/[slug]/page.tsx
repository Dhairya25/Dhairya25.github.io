import { experiences } from "@/data/experience";
import { siteConfig } from "@/data/meta";
import { ModeSwitcher } from "@/components/shared/ModeSwitcher";
import { EditorialFooter } from "@/components/editorial/footer";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

export function generateStaticParams() {
  return experiences.map((exp) => ({ slug: exp.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const exp = experiences.find((e) => e.slug === params.slug);
  if (!exp) return {};
  return {
    title: `${exp.company} - ${siteConfig.name}`,
    description: exp.brief,
  };
}

export default function WorkCasePage({ params }: { params: { slug: string } }) {
  const exp = experiences.find((e) => e.slug === params.slug);
  if (!exp) notFound();

  // Read MDX content at build time
  let content = "";
  try {
    const mdxPath = path.join(process.cwd(), "content", "work", `${params.slug}.mdx`);
    content = fs.readFileSync(mdxPath, "utf-8");
  } catch {
    // If no MDX file, fall back to bullets
  }

  // Parse simple markdown to sections
  const sections = parseMarkdown(content);

  return (
    <>
      <ModeSwitcher />
      <article className="editorial-container pt-20 pb-16" id="main-content">
        {/* Back link */}
        <a
          href="/#work"
          className="font-mono text-[11px] tracking-[0.1em] uppercase text-fg-secondary hover:text-accent transition-colors"
        >
          &larr; Back to work
        </a>

        {/* Header */}
        <header className="mt-8 mb-12 border-b border-fg/10 pb-8">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="font-mono text-scale-1 text-fg-secondary">{exp.code}</span>
            <span className="font-mono text-scale-1 text-fg-secondary">{exp.start} &ndash; {exp.end}</span>
          </div>
          <h1 className="font-display text-scale-7 md:text-scale-8 leading-tight mb-3">
            {exp.company}
          </h1>
          <p className="font-mono text-scale-1 text-fg-secondary">{exp.role}</p>
        </header>

        {/* Content */}
        {sections.length > 0 ? (
          <div className="max-w-[680px] space-y-8">
            {sections.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="font-display text-scale-5 mb-4">{section.heading}</h2>
                )}
                {section.subheading && (
                  <h3 className="font-display text-scale-4 mb-3">{section.subheading}</h3>
                )}
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="font-serif text-scale-2 leading-relaxed text-fg-secondary mb-4">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-[680px] space-y-4">
            {exp.bullets.map((bullet, i) => (
              <p key={i} className="font-serif text-scale-2 leading-relaxed text-fg-secondary">
                {bullet}
              </p>
            ))}
          </div>
        )}

        {/* Pull quote */}
        {exp.pullQuote && (
          <div className="mt-12 py-8 border-y border-fg/10 max-w-[680px]">
            <span className="font-display text-scale-9 text-accent block">{exp.pullQuote.value}</span>
            <span className="font-mono text-scale-1 text-fg-secondary mt-2 block">
              {exp.pullQuote.label}
            </span>
          </div>
        )}
      </article>
      <EditorialFooter />
    </>
  );
}

interface Section {
  heading?: string;
  subheading?: string;
  paragraphs: string[];
}

function parseMarkdown(content: string): Section[] {
  if (!content.trim()) return [];

  const lines = content.split("\n");
  const sections: Section[] = [];
  let current: Section = { paragraphs: [] };
  let currentParagraph = "";

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("# ")) {
      // Skip the top-level title (it's already in the header)
      continue;
    }

    if (trimmed.startsWith("## ")) {
      // Flush current
      if (currentParagraph) {
        current.paragraphs.push(currentParagraph.trim());
        currentParagraph = "";
      }
      if (current.heading || current.paragraphs.length > 0) {
        sections.push(current);
      }
      current = { heading: trimmed.slice(3), paragraphs: [] };
      continue;
    }

    if (trimmed.startsWith("### ")) {
      if (currentParagraph) {
        current.paragraphs.push(currentParagraph.trim());
        currentParagraph = "";
      }
      if (current.heading || current.subheading || current.paragraphs.length > 0) {
        sections.push(current);
      }
      current = { subheading: trimmed.slice(4), paragraphs: [] };
      continue;
    }

    if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      // Bold metadata line, skip (Role, Period, Stack, Tools)
      continue;
    }

    if (trimmed === "") {
      if (currentParagraph) {
        current.paragraphs.push(currentParagraph.trim());
        currentParagraph = "";
      }
      continue;
    }

    // Regular text line
    currentParagraph += (currentParagraph ? " " : "") + trimmed;
  }

  if (currentParagraph) {
    current.paragraphs.push(currentParagraph.trim());
  }
  if (current.heading || current.subheading || current.paragraphs.length > 0) {
    sections.push(current);
  }

  return sections;
}
