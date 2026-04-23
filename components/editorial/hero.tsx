import { heroCopy, siteConfig } from "@/data/meta";

export function Hero() {
  return (
    <section className="editorial-container py-12 md:py-16">
      <div className="max-w-[780px]">
        <p className="font-serif text-scale-4 md:text-scale-5 leading-[1.5] md:leading-[1.45] drop-cap">
          {heroCopy}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 font-mono text-[11px] tracking-[0.1em] uppercase">
          <span className="text-accent">Current position: Co-Founder, Rivo Careers</span>
          <a
            href={siteConfig.resumes.cs}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-secondary hover:text-accent transition-colors"
          >
            Resume (CS)
          </a>
          <a
            href={siteConfig.resumes.bba}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-secondary hover:text-accent transition-colors"
          >
            Resume (BBA)
          </a>
        </div>
      </div>
    </section>
  );
}
