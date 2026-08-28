"use client";

import { useState } from "react";

export default function ReviewForm({ companySlug }: { companySlug: string }) {
  const [state, setState] = useState<{ loading?: boolean; error?: string; result?: { trustScore: number; aiSummary: string } }>({});
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setState({ loading: true });
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json", "x-vixvods-web": "1" }, body: JSON.stringify({ companySlug, author: form.get("author"), comment: form.get("comment"), rating: Number(form.get("rating")), hasProof: form.get("hasProof") === "on", source: "vixvods-web" }) });
    const json = await response.json();
    if (!response.ok) setState({ error: json.error || "Impossible d’envoyer cet avis." }); else { setState({ result: json.review }); event.currentTarget.reset(); }
  }
  return <form className="card review" onSubmit={submit}><div><h3>Partager votre expérience</h3><p className="muted">Votre avis sera analysé avant publication. Les données envoyées sont limitées au nécessaire.</p></div><div className="form-grid"><label>Votre nom<input className="input" name="author" required minLength={2} maxLength={80} placeholder="Camille R." /></label><label>Note<select name="rating" defaultValue="5"><option value="5">5 — Excellent</option><option value="4">4 — Très bien</option><option value="3">3 — Correct</option><option value="2">2 — Décevant</option><option value="1">1 — Très décevant</option></select></label><label className="full">Votre avis<textarea name="comment" required minLength={10} maxLength={4000} rows={5} placeholder="Qu’avez-vous apprécié ? Que faudrait-il améliorer ?" /></label><label className="full" style={{display: "flex", gridTemplateColumns: "auto 1fr", alignItems: "center"}}><input type="checkbox" name="hasProof" /> J’ai une preuve de mon expérience (elle n’est pas téléversée dans cette version)</label></div>{state.error && <div className="notice" style={{borderColor: "#ff7b7b"}}>{state.error}</div>}{state.result && <div className="notice">Avis reçu. Trust Score indicatif : <strong>{state.result.trustScore}/100</strong>. {state.result.aiSummary}</div>}<button className="button" disabled={state.loading}>{state.loading ? "Analyse en cours…" : "Publier mon avis"}</button></form>;
}
