import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        "fg-secondary": "var(--fg-secondary)",
        accent: "var(--accent)",
        rule: "var(--rule)",
        "border-color": "var(--border-color)",
        // IDE-specific
        "ide-sidebar": "var(--ide-sidebar)",
        "ide-panel": "var(--ide-panel)",
        "ide-string": "var(--ide-string)",
        "ide-keyword": "var(--ide-keyword)",
        "ide-func": "var(--ide-func)",
        "ide-status": "var(--ide-status)",
        // Terminal-specific
        "term-panel": "var(--term-panel)",
        "term-green": "var(--term-green)",
        "term-red": "var(--term-red)",
        "term-white": "var(--term-white)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-inter-tight)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        "mono-terminal": ["var(--font-ibm-plex-mono)", "monospace"],
      },
      fontSize: {
        // 1.25 ratio type scale
        "scale-1": ["0.75rem", { lineHeight: "1.6" }],     // 12px
        "scale-2": ["0.9375rem", { lineHeight: "1.6" }],   // 15px
        "scale-3": ["1.1875rem", { lineHeight: "1.6" }],   // 19px
        "scale-4": ["1.5rem", { lineHeight: "1.4" }],      // 24px
        "scale-5": ["1.875rem", { lineHeight: "1.3" }],    // 30px
        "scale-6": ["2.375rem", { lineHeight: "1.15" }],   // 38px
        "scale-7": ["3rem", { lineHeight: "1.05" }],       // 48px
        "scale-8": ["3.75rem", { lineHeight: "1.05" }],    // 60px
        "scale-9": ["4.75rem", { lineHeight: "1.05" }],    // 76px
        // Terminal sizes
        "term-xs": ["0.625rem", { lineHeight: "1.4" }],    // 10px
        "term-sm": ["0.75rem", { lineHeight: "1.4" }],     // 12px
        "term-base": ["0.8125rem", { lineHeight: "1.4" }], // 13px
        "term-lg": ["0.9375rem", { lineHeight: "1.4" }],   // 15px
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        ticker: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.4s ease-out forwards",
        "fade-in": "fade-in 0.25s ease-out forwards",
        "cursor-blink": "cursor-blink 1.1s step-end infinite",
        ticker: "ticker 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
