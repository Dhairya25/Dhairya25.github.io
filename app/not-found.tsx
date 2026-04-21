import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-display font-bold tracking-[-0.04em] text-text mb-4">
        404
      </h1>
      <p className="font-mono text-sm text-muted mb-8">
        Page not found — this route doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:shadow-[0_0_24px_rgba(0,212,255,0.3)] transition-colors text-sm"
      >
        Go Home
      </Link>
    </div>
  );
}
