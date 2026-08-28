import Link from "next/link";

export default function NotFound() {
  return <main><div className="not-found-card"><div className="eyebrow">404 / signal perdu</div><h1>Cette page n’existe pas<br /><em>encore.</em></h1><p className="lede">Le profil recherché n’est pas disponible. Revenons vers un signal un peu plus fiable.</p><Link href="/" className="button">Retour à l’exploration ↗</Link></div></main>;
}
