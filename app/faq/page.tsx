import type { Metadata } from "next";

export const metadata: Metadata = { title: "FAQ", description: "Questions fréquentes sur les avis, le Trust Score et l’analyse Vixvods." };
const questions = [
  ["Comment est calculé le Trust Score ?", "Il combine la note, la richesse du retour et les signaux de preuve déclarés. Il s’agit d’un indicateur explicable, pas d’une vérité absolue."],
  ["L’analyse est-elle toujours faite par GPT ?", "Vixvods utilise GPT-4o-mini lorsque la clé serveur est configurée et que le service répond. Sinon, un fallback local déterministe permet de conserver un résultat utile."],
  ["Une entreprise peut-elle supprimer un avis ?", "Elle peut signaler un contenu, mais la publication, la modération et les décisions doivent suivre une politique transparente. Les avis ne doivent pas être modifiés pour améliorer artificiellement une note."],
  ["Comment utiliser l’API privée ?", "Envoyez un POST vers /api/reviews avec un Bearer token de projet, un companySlug, une note, un commentaire et la source. En production, ajoutez rotation, quotas et idempotence."],
];
export default function FAQPage() { const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: questions.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) }; return <main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><div className="eyebrow">Centre de confiance</div><h1>Les questions que vous vous posez.</h1><p className="lede">Une plateforme de reviews utile doit aussi expliquer ses règles. Voici les réponses essentielles.</p><section className="section review">{questions.map(([question, answer]) => <details className="card" key={question}><summary><strong>{question}</strong></summary><p className="muted">{answer}</p></details>)}</section></main>; }
