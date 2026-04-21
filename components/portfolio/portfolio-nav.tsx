"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMode } from "@/lib/mode-store";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function PortfolioNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { enterIDE } = useMode();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/60 backdrop-blur-xl border-b border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
          : "bg-transparent"
      }`}
    >
      <div className="portfolio-section flex items-center justify-between h-16">
        <a
          href="#"
          className="text-[15px] font-bold text-[#1a1a2e] tracking-tight hover:opacity-60 transition-opacity duration-300"
        >
          dp<span className="text-accent">.</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-[13px] px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-accent font-medium"
                    : "text-[#64748b] hover:text-[#1a1a2e]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 bg-accent/[0.06] rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}

          <div className="w-px h-4 bg-black/[0.06] mx-3" />

          <button
            onClick={enterIDE}
            className="group relative text-[12px] font-semibold text-white bg-[#1a1a2e] hover:bg-accent px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1.5 overflow-hidden"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            IDE
          </button>
        </div>

        {/* Mobile */}
        <button
          onClick={enterIDE}
          className="md:hidden text-[12px] font-semibold text-white bg-[#1a1a2e] px-4 py-2 rounded-lg flex items-center gap-1.5"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          IDE
        </button>
      </div>
    </motion.nav>
  );
}
