import { NextRequest, NextResponse } from "next/server";
import { getReviews, updateReview } from "../../../../lib/data";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!process.env.VIXVODS_PRIVATE_KEY || request.headers.get("authorization") !== `Bearer ${process.env.VIXVODS_PRIVATE_KEY}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const review = getReviews().find((item) => item.id === id);
  if (!review) return NextResponse.json({ error: "Review not found" }, { status: 404 });
  let response = `Merci ${review.author} pour ce retour détaillé. Nous sommes heureux que votre expérience ait été positive et prenons également en compte les points que vous soulevez pour continuer à progresser.`;
  const apiKey = process.env.OPENAI_API_KEY;
  if (apiKey) {
    try {
      const ai = await fetch("https://api.openai.com/v1/chat/completions", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4o-mini", temperature: 0.4, max_tokens: 180, messages: [{ role: "system", content: "Rédige un brouillon de réponse professionnel, humain et concis en français à un avis client. Ne promets rien, n’invente aucun fait et ne publie pas la réponse automatiquement." }, { role: "user", content: `Auteur: ${review.author}\nNote: ${review.rating}/5\nAvis: ${review.comment.slice(0, 4000)}` }] }), signal: AbortSignal.timeout(8000) });
      const json = await ai.json() as { choices?: Array<{ message?: { content?: string } }> };
      if (ai.ok && json.choices?.[0]?.message?.content) response = json.choices[0].message.content.slice(0, 1000);
    } catch { /* fallback local conservé */ }
  }
  return NextResponse.json({ review: updateReview(review.id, { aiResponse: response }) });
}
