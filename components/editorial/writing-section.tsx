import { writingEntries } from "@/data/meta";

export function WritingSection() {
  return (
    <section id="writing" className="editorial-container py-12 md:py-16">
      <h2 className="font-display text-scale-7 mb-8">Writing.</h2>

      <div className="space-y-6">
        {writingEntries.map((entry) => (
          <div
            key={entry.slug}
            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3 border-b border-fg/8"
          >
            {entry.status === "published" ? (
              <a
                href={`/writing/${entry.slug}`}
                className="font-serif text-scale-3 text-fg hover:text-accent transition-colors"
              >
                {entry.title}
              </a>
            ) : (
              <span className="font-serif text-scale-3 text-fg/70">
                {entry.title}
              </span>
            )}
            {entry.status === "coming" && entry.comingDate && (
              <span className="font-mono text-[10px] tracking-[0.1em] text-fg-secondary uppercase shrink-0">
                coming {entry.comingDate.toLowerCase()}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
