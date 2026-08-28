import { NextRequest, NextResponse } from "next/server";
import { getReviews, updateReview } from "../../../lib/data";
import type { ReviewStatus } from "../../../lib/types";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!process.env.VIXVODS_PRIVATE_KEY || request.headers.get("authorization") !== `Bearer ${process.env.VIXVODS_PRIVATE_KEY}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  if (!getReviews().some((review) => review.id === id)) return NextResponse.json({ error: "Review not found" }, { status: 404 });
  try {
    const body = await request.json() as { status?: ReviewStatus };
    if (!body.status || !["published", "pending", "rejected"].includes(body.status)) return NextResponse.json({ error: "status invalide" }, { status: 400 });
    return NextResponse.json({ review: updateReview(id, { status: body.status }) });
  } catch { return NextResponse.json({ error: "JSON invalide" }, { status: 400 }); }
}
