"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main><div className="not-found-card"><div className="eyebrow">500 / signal interrompu</div><h1>Un contretemps.<br /><em>Pas une impasse.</em></h1><p className="lede">Une erreur temporaire est survenue. Rechargeons l’expérience proprement.</p><button className="button" onClick={() => reset()}>Réessayer ↗</button></div></main>;
}
