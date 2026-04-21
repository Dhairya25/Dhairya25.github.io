import type { Metadata } from "next";
import { geistSans, jetbrainsMono } from "./fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeProvider } from "@/lib/mode-store";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dhairya Patel — Software Developer",
  description:
    "CS + BBA student at Wilfrid Laurier University. Co-founder of Rivo Careers. Building AI-powered products.",
  metadataBase: new URL("https://dhairya-patel.ca"),
  openGraph: {
    title: "Dhairya Patel — Software Developer",
    description:
      "CS + BBA student at Wilfrid Laurier University. Co-founder of Rivo Careers.",
    url: "https://dhairya-patel.ca",
    siteName: "Dhairya Patel",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`light ${geistSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg text-text antialiased">
        <ThemeProvider>
          <ModeProvider>{children}</ModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
