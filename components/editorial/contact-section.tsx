import { siteConfig, openTo } from "@/data/meta";

export function ContactSection() {
  return (
    <section id="contact" className="editorial-container py-12 md:py-16">
      <h2 className="font-display text-scale-7 mb-8">Contact.</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Left: links */}
        <div>
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-serif text-scale-4 md:text-scale-5 text-fg hover:text-accent transition-colors block"
          >
            {siteConfig.email}
          </a>
          <div className="flex gap-6 mt-4">
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.1em] uppercase text-fg-secondary hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.1em] uppercase text-fg-secondary hover:text-accent transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Right: open to */}
        <div>
          <p className="font-serif text-scale-2 leading-relaxed text-fg-secondary">
            {openTo}
          </p>
        </div>
      </div>
    </section>
  );
}
