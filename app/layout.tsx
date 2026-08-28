import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Vixvods | Reviews IA-Powered",
    template: "%s | Vixvods",
  },
  description: "Plateforme de reviews moderne et fiable. Analyse IA, Trust Score, vérification d'achats.",
  openGraph: {
    title: "Vixvods - Reviews de confiance avec IA",
    description: "Avis vérifiés, Trust Score IA et modération sémantique.",
    siteName: "Vixvods",
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="bg-[#0a0a0a] text-white antialiased">{children}</body>
    </html>
  );
}