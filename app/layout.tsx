import type { Metadata } from "next";
import { fraunces, sourceSerif, interTight, jetbrainsMono, ibmPlexMono } from "./fonts";
import { ModeProvider } from "@/lib/mode-store";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dhairya Patel",
  description:
    "Senior at Wilfrid Laurier, Computer Science and Business Administration. Co-founder of Rivo Careers. Work, writing, and a pair of resumes.",
  metadataBase: new URL("https://dhairya-patel.ca"),
  openGraph: {
    title: "Dhairya Patel",
    description:
      "Senior at Wilfrid Laurier, Computer Science and Business Administration. Co-founder of Rivo Careers. Work, writing, and a pair of resumes.",
    url: "https://dhairya-patel.ca",
    siteName: "Dhairya Patel",
    locale: "en_CA",
    type: "website",
  },
};

const fontVars = [
  fraunces.variable,
  sourceSerif.variable,
  interTight.variable,
  jetbrainsMono.variable,
  ibmPlexMono.variable,
].join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVars} data-mode="editorial" suppressHydrationWarning>
      <body className="bg-bg text-fg antialiased noise-overlay">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <ModeProvider>{children}</ModeProvider>
      </body>
    </html>
  );
}
