"use client";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ExternalLink({ href, children, className = "" }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 group ${className}`}
    >
      {children}
      <span className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-muted group-hover:text-accent">
        ↗
      </span>
    </a>
  );
}
