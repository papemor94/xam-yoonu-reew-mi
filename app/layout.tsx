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
  title: "Xam Yoonu Réew Mi — Université Populaire Citoyenne et Solidaire",
  description: "Vulgariser le droit, les politiques publiques et les sciences utiles au vivre-ensemble et au développement harmonieux de nos sociétés.",
  keywords: ["Sénégal", "Vulgarisation du droit", "Citoyenneté", "Politiques publiques", "Université populaire", "Éducation populaire"],
  authors: [{ name: "Comité de Rédaction Xam Yoonu Réew Mi" }],
  openGraph: {
    title: "Xam Yoonu Réew Mi — Université Populaire Citoyenne et Solidaire",
    description: "Vulgariser le droit, les politiques publiques et les sciences utiles au vivre-ensemble et au développement harmonieux de nos sociétés.",
    url: "https://xam-yoonu-reew-mi.org",
    siteName: "Xam Yoonu Réew Mi",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xam Yoonu Réew Mi — Université Populaire Citoyenne et Solidaire",
    description: "Vulgariser le droit, les politiques publiques et les sciences utiles au vivre-ensemble et au développement harmonieux de nos sociétés.",
  },
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
