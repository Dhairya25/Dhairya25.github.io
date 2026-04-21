"use client";

import { CONTACT } from "@/lib/content";
import { useMode } from "@/lib/mode-store";

export function PortfolioFooter() {
  const { enterIDE } = useMode();

  return (
    <footer className="py-8 bg-[#0a0a14] text-white/30">
      <div className="portfolio-section">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[13px]">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white/60">dp<span className="text-accent">.</span></span>
            <span className="text-white/10">|</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={enterIDE}
              className="hover:text-accent transition-colors duration-300 font-mono text-[12px] tracking-wide"
            >
              ~/ide
            </button>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors duration-300"
            >
              Source
            </a>
            <span className="text-white/10">
              Next.js + Framer Motion
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
