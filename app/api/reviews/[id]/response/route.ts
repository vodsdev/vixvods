import { NextRequest, NextResponse } from "next/server";
import { getReviews, updateReview } from "../../../../lib/data";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!process.env.VIXVODS_PRIVATE_KEY || request.headers.get("authorization") !== `Bearer ${process.env.VIXVODS_PRIVATE_KEY}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const review = getReviews().find((item) => item.id === id);
  if (!review) return NextResponse.json({ error: "Review not found" }, { status: 404 });
  const response = `Merci ${review.author} pour ce retour détaillé. Nous sommes heureux que votre expérience ait été positive et prenons également en compte les points que vous soulevez pour continuer à progresser.`;
  return NextResponse.json({ review: updateReview(review.id, { aiResponse: response }) });
}
