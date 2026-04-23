import localFont from "next/font/local";

export const fraunces = localFont({
  src: [
    { path: "../public/fonts/Fraunces-Variable.woff2", style: "normal", weight: "100 900" },
    { path: "../public/fonts/Fraunces-Variable-Italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

export const sourceSerif = localFont({
  src: [
    { path: "../public/fonts/SourceSerif4-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/SourceSerif4-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-source-serif",
  display: "swap",
});

export const interTight = localFont({
  src: [
    { path: "../public/fonts/InterTight-Regular.woff2", weight: "400 600", style: "normal" },
  ],
  variable: "--font-inter-tight",
  display: "swap",
});

export const jetbrainsMono = localFont({
  src: [
    { path: "../public/fonts/JetBrainsMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/JetBrainsMono-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/JetBrainsMono-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const ibmPlexMono = localFont({
  src: [
    { path: "../public/fonts/IBMPlexMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/IBMPlexMono-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});
