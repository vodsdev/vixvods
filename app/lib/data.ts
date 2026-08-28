import type { Company, Review } from "./types";

export const companies: Company[] = [
  {
    slug: "vixluxia-studio",
    name: "Vixluxia Studio",
    category: "Design & branding",
    description: "Studio créatif spécialisé dans les identités visuelles et les expériences digitales élégantes.",
    location: "Paris, France",
    website: "https://vixluxia.studio",
    accent: "from-fuchsia-500/30 to-violet-500/10",
  },
  {
    slug: "antigravity-labs",
    name: "Antigravity Labs",
    category: "Produit digital",
    description: "Équipe produit qui transforme des idées complexes en logiciels simples, rapides et utiles.",
    location: "Lyon, France",
    website: "https://antigravity.labs",
    accent: "from-cyan-500/30 to-blue-500/10",
  },
];

export const seedReviews: Review[] = [
  {
    id: "review-seed-1",
    companySlug: "vixluxia-studio",
    rating: 5,
    comment: "Une équipe attentive, créative et très fiable. Le résultat dépasse nos attentes.",
    author: "Camille R.",
    hasProof: true,
    source: "vixvods-demo",
    projectId: "demo",
    status: "published",
    createdAt: "2026-08-22T10:00:00.000Z",
    trustScore: 96,
    keywords: ["créatif", "fiable", "attentif"],
    aiSummary: "Avis très positif mettant en avant la qualité de l’accompagnement et du résultat.",
  },
  {
    id: "review-seed-2",
    companySlug: "antigravity-labs",
    rating: 4,
    comment: "Produit solide et équipe réactive. Il reste quelques détails à fluidifier dans l’onboarding.",
    author: "Nicolas D.",
    hasProof: false,
    source: "vixvods-demo",
    projectId: "demo",
    status: "published",
    createdAt: "2026-08-18T14:30:00.000Z",
    trustScore: 84,
    keywords: ["solide", "réactif", "onboarding"],
    aiSummary: "Retour favorable avec une suggestion d’amélioration ciblée sur la prise en main.",
  },
];

let reviews = [...seedReviews];

export function getReviews(companySlug?: string) {
  return reviews
    .filter((review) => !companySlug || review.companySlug === companySlug)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function addReview(review: Review) {
  reviews = [review, ...reviews];
  return review;
}

export function updateReview(id: string, patch: Partial<Review>) {
  reviews = reviews.map((review) => (review.id === id ? { ...review, ...patch } : review));
  return reviews.find((review) => review.id === id);
}
