"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Review } from "../lib/types";

export default function DashboardPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => { const saved = window.localStorage.getItem("vixvods_api_key"); if (saved) setKey(saved); }, []);
  async function load() { window.localStorage.setItem("vixvods_api_key", key); const res = await fetch("/api/reviews", { headers: { Authorization: `Bearer ${key}` } }); const data = await res.json(); if (res.ok) setReviews(data.reviews); else setMessage(data.error || "Accès refusé"); }
  async function suggest(id: string) { const res = await fetch(`/api/reviews/${id}/response`, { method: "POST", headers: { Authorization: `Bearer ${key}` } }); const data = await res.json(); if (res.ok) setReviews((items) => items.map((item) => item.id === id ? data.review : item)); else setMessage(data.error || "Impossible de générer une réponse"); }
  return <main><div className="eyebrow">Espace Pro</div><h1 style={{fontSize: "clamp(42px, 6vw, 70px)"}}>Pilotez votre réputation.</h1><p className="lede">Centralisez vos avis et préparez des réponses cohérentes. Cette première version utilise une clé privée de projet ; branchez votre fournisseur OAuth avant un usage multi-utilisateur.</p><section className="card" style={{maxWidth: 680, marginTop: 32}}><label>Clé privée Vixvods<input className="input" type="password" value={key} onChange={(event) => setKey(event.target.value)} placeholder="vixvods_private_…" /></label><button className="button" style={{marginTop: 16}} onClick={load}>Charger les avis</button>{message && <p className="notice" style={{marginTop: 16}}>{message}</p>}</section><section className="section"><div className="section-head"><div><div className="eyebrow">Vue d’ensemble</div><h2>{reviews.length} avis centralisés</h2></div><Link href="/" className="text-link">Retour à l’exploration →</Link></div><div className="review">{reviews.map((review) => <article className="card review" key={review.id}><div className="review-meta"><strong>{review.author} · {review.companySlug}</strong><span className="pill">source : {review.source}</span></div><div className="stars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)} <span className="muted">Trust {review.trustScore}/100</span></div><p>{review.comment}</p>{review.aiResponse ? <div className="notice"><strong>Brouillon :</strong> {review.aiResponse}</div> : <button className="button button-secondary" onClick={() => suggest(review.id)}>Générer une réponse</button>}</article>)}</div>{reviews.length === 0 && <div className="card"><p className="muted">Authentifiez-vous avec la clé définie dans votre environnement pour afficher les avis.</p></div>}</section></main>;
}
