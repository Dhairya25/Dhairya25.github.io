"use client";

import { useEffect, useRef, useState } from "react";
import type { Experience } from "@/data/experience";

interface WorkEntryProps {
  entry: Experience;
  index: number;
}

export function WorkEntry({ entry, index }: WorkEntryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr_1.5fr] gap-4 md:gap-8 py-8 border-t border-fg/10"
      style={
        reducedMotion
          ? {}
          : {
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 0.4s ease-out ${index * 60}ms, transform 0.4s ease-out ${index * 60}ms`,
            }
      }
    >
      {/* Left column: metadata */}
      <div className="flex md:flex-col gap-2 md:gap-1">
        <span className="font-mono text-scale-1 text-fg-secondary">{entry.code}</span>
        <span className="font-mono text-scale-1 text-fg-secondary">{entry.year}</span>
        <span className="font-mono text-scale-1 text-fg-secondary">{entry.role}</span>
      </div>

      {/* Middle column: content */}
      <div>
        <h3 className="font-display text-scale-5 leading-tight mb-3">
          {entry.company}
        </h3>
        <p className="font-serif text-scale-2 leading-relaxed text-fg-secondary max-w-[520px]">
          {entry.brief}
        </p>
        {entry.slug && (
          <a
            href={`/work/${entry.slug}`}
            className="inline-block mt-4 font-mono text-[11px] tracking-[0.1em] uppercase text-accent hover:text-fg transition-colors"
          >
            Read the full case &rarr;
          </a>
        )}
      </div>

      {/* Right column: artifact */}
      <div className="flex items-start justify-end">
        {entry.pullQuote && (
          <div className="text-right">
            <span className="font-display text-scale-8 md:text-scale-9 leading-none text-accent block">
              {entry.pullQuote.value}
            </span>
            <span className="font-mono text-[10px] tracking-[0.08em] text-fg-secondary mt-2 block max-w-[180px] ml-auto">
              {entry.pullQuote.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
