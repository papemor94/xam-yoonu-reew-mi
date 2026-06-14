import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Xam Yoonu Reew Mi — Université Populaire Citoyenne & Solidaire",
  description: "Vulgariser le droit, les politiques publiques et toutes les sciences utiles à notre vivre-ensemble et à un développement harmonieux.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-xyrm-slate-50 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
