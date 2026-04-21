"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { CONTACT } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

const SOCIALS = [
  {
    label: "GitHub",
    href: CONTACT.github,
    icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>,
  },
  {
    label: "LinkedIn",
    href: CONTACT.linkedin,
    icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>,
  },
  {
    label: "Email",
    href: `mailto:${CONTACT.email}`,
    icon: <><rect width="20" height="16" x="2" y="4" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>,
    isStroke: true,
  },
];

function MagneticLink({ children, href, className, label, isStroke }: {
  children: React.ReactNode; href: string; className?: string; label: string; isStroke?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: springX, y: springY }}
      className={className}
      aria-label={label}
    >
      {children}
    </motion.a>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Dark section with gradient */}
      <div className="relative bg-[#0f0f1a] text-white py-28 md:py-36">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-accent/[0.12] via-purple/[0.06] to-transparent rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-[-10%] w-[400px] h-[400px] bg-accent/[0.06] rounded-full blur-[100px] pointer-events-none" />

        <div className="portfolio-section relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease }}
            className="text-[12px] font-mono uppercase tracking-[0.2em] text-accent font-medium"
          >
            06 &mdash; Contact
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mt-5 text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-bold tracking-tight leading-[1.05]"
          >
            Let&apos;s build
            <br />
            <span className="gradient-text">something great.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="mt-6 text-white/50 text-[15px] max-w-md leading-[1.75]"
          >
            Always open to interesting conversations, collaborations,
            and new opportunities. Let&apos;s connect.
          </motion.p>

          <motion.a
            href={`mailto:${CONTACT.email}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="group inline-flex items-center gap-3 mt-8 text-xl md:text-2xl font-semibold text-white hover:text-accent transition-colors duration-300"
          >
            {CONTACT.email}
            <svg
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="text-white/30 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
            >
              <path d="M7 17L17 7" /><path d="M7 7h10v10" />
            </svg>
          </motion.a>

          {/* Social links with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease }}
            className="mt-12 flex items-center gap-4 flex-wrap"
          >
            {SOCIALS.map((social) => (
              <MagneticLink
                key={social.label}
                href={social.href}
                label={social.label}
                isStroke={social.isStroke}
                className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-accent/40 hover:bg-accent/10 hover:shadow-glow transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={social.isStroke ? "none" : "currentColor"}>
                  {social.icon}
                </svg>
              </MagneticLink>
            ))}

            <MagneticLink
              href={CONTACT.resumeUrl}
              label="Resume"
              className="inline-flex items-center gap-2 px-5 py-3 border border-white/10 text-[13px] font-semibold text-white/50 rounded-xl hover:text-white hover:border-accent/40 hover:bg-accent/10 transition-all duration-300"
            >
              Download Resume
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            </MagneticLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
