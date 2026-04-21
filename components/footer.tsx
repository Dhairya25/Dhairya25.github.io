"use client";

import { ExternalLink } from "./ui/external-link";

export function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-24 py-8 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[10px] text-muted">
          &copy; {new Date().getFullYear()} Dhairya Patel
        </span>
        <ExternalLink
          href="https://github.com/Dhairya25/Dhairya25.github.io"
          className="font-mono text-[10px] text-muted hover:text-text transition-colors"
        >
          View Source
        </ExternalLink>
      </div>
    </footer>
  );
}
