import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-bg text-fg">
      <h1 className="font-display text-scale-8 tracking-tight mb-4">404</h1>
      <p className="font-mono text-scale-1 text-fg-secondary mb-8">
        Page not found.
      </p>
      <Link
        href="/"
        className="font-mono text-[11px] tracking-[0.1em] uppercase text-accent hover:text-fg transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
