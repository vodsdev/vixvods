import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import type { Viewport } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600", "700", "800"] });

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#08090b" };

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://vixvods.com"),
  title: { default: "Vixvods | Les avis qui inspirent confiance", template: "%s | Vixvods" },
  description: "Découvrez des avis analysés avec transparence et construisez une réputation de confiance.",
  openGraph: { title: "Vixvods — Reviews de confiance", description: "Avis, Trust Score et réponses intelligentes.", siteName: "Vixvods", locale: "fr_FR", type: "website" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr" className={inter.variable}><body><header className="site-header"><Link href="/" className="brand"><span className="brand-mark">V</span> Vixvods</Link><nav><Link href="/">Explorer</Link><Link href="/faq">FAQ</Link><Link href="/dashboard">Espace Pro</Link></nav><Link className="button button-small" href="/company/vixluxia-studio">Voir un profil</Link></header>{children}<footer className="site-footer"><strong>Vixvods</strong><span>Des avis plus clairs. Des décisions plus sûres.</span><Link href="/faq">Questions fréquentes</Link></footer></body></html>;
}
