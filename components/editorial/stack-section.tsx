import { stackProse, stackMeta } from "@/data/stack";

export function StackSection() {
  return (
    <section id="stack" className="editorial-container py-12 md:py-16">
      <div className="max-w-[680px]">
        <p className="font-serif text-scale-2 leading-relaxed text-fg-secondary">
          {stackProse}
        </p>
        <p className="font-mono text-[10px] tracking-[0.1em] text-fg/40 uppercase mt-6">
          Current editor: {stackMeta.editor}. Current terminal: {stackMeta.terminal}.
        </p>
      </div>
    </section>
  );
}
