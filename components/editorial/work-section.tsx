import { experiences, alsoEntries } from "@/data/experience";
import { WorkEntry } from "./work-entry";

export function WorkSection() {
  return (
    <section id="work" className="editorial-container py-12 md:py-16">
      <h2 className="font-display text-scale-7 mb-8">Work.</h2>

      <div>
        {experiences.map((exp, i) => (
          <WorkEntry key={exp.id} entry={exp} index={i} />
        ))}
      </div>

      {/* Also block */}
      <div className="mt-12 pt-8 border-t border-fg/10">
        <h3 className="font-mono text-[11px] tracking-[0.15em] uppercase text-fg-secondary mb-4">
          Also
        </h3>
        <div className="space-y-3">
          {alsoEntries.map((entry) => (
            <div key={entry.title} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <span className="font-serif text-scale-2 font-medium text-fg">
                {entry.title}
              </span>
              <span className="font-serif text-scale-1 text-fg-secondary">
                {entry.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
