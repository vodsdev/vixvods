import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { companies, getReviews } from "../../lib/data";
import ReviewForm from "../../components/ReviewForm";

export async function generateStaticParams() { return companies.map((company) => ({ slug: company.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const company = companies.find((item) => item.slug === slug);
  return company ? { title: `${company.name} — Avis`, description: company.description } : { title: "Entreprise introuvable" };
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = companies.find((item) => item.slug === slug);
  if (!company) notFound();
  const reviews = getReviews(company.slug).filter((review) => review.status === "published");
  const average = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
  const trust = reviews.length ? Math.round(reviews.reduce((sum, review) => sum + review.trustScore, 0) / reviews.length) : 0;
  const jsonLd = { "@context": "https://schema.org", "@type": "Organization", name: company.name, description: company.description, url: company.website, aggregateRating: reviews.length ? { "@type": "AggregateRating", ratingValue: average.toFixed(1), reviewCount: reviews.length, bestRating: 5, worstRating: 1 } : undefined };
  return <main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><div className="eyebrow">Profil entreprise · {company.location}</div><section className="hero" style={{paddingBottom: "40px"}}><div><h1 style={{fontSize: "clamp(42px, 6vw, 72px)"}}>{company.name}</h1><p className="lede">{company.description}</p><a href={company.website} className="text-link" target="_blank" rel="noreferrer">Visiter le site →</a></div><div className="hero-card"><div className="eyebrow">Trust Score indicatif</div><div className="score" style={{fontSize: "72px", margin: "18px 0 0"}}>{trust}<span style={{fontSize: "26px"}}>/100</span></div><div className="score-row"><span className="stars">{"★".repeat(Math.round(average))}{"☆".repeat(5 - Math.round(average))}</span><span className="muted">{reviews.length} avis</span></div></div></section><section className="section grid"><div><div className="section-head"><h2>Avis publiés</h2></div>{reviews.length === 0 ? <div className="card"><p>Aucun avis publié pour le moment.</p></div> : <div className="review">{reviews.map((review) => <article className="card review" key={review.id}><div className="review-meta"><span><strong>{review.author}</strong> <span className="pill">{review.hasProof ? "Preuve déclarée" : "Avis partagé"}</span></span><span className="muted">{new Date(review.createdAt).toLocaleDateString("fr-FR")}</span></div><div className="stars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div><p>{review.comment}</p><div className="notice"><strong>Analyse :</strong> {review.aiSummary}<br /><span className="muted">Thèmes : {review.keywords.join(" · ")}</span></div>{review.aiResponse && <p className="muted"><strong>Réponse :</strong> {review.aiResponse}</p>}</article>)}</div>}</div><ReviewForm companySlug={company.slug} /></section></main>;
}
