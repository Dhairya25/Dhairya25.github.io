@import "./theme.css";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        gridShift: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-64px)' },
        },
        floatY: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        caret: {
          '0%, 40%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        grid: 'gridShift 14s linear infinite',
        floatY: 'floatY 6s ease-in-out infinite',
        caret: 'caret 1s steps(1) infinite',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: '#0b0b12',
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 👈 add this line
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};