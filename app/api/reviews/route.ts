import { NextRequest, NextResponse } from "next/server";
import { addReview, companies, getReviews } from "../../lib/data";
import { analyzeReview } from "../../lib/analysis";
import type { Review } from "../../lib/types";

const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL;
const recentRequests = new Map<string, number[]>();

function rateLimited(request: NextRequest) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const timestamps = (recentRequests.get(key) || []).filter((timestamp) => now - timestamp < 60_000);
  timestamps.push(now);
  recentRequests.set(key, timestamps);
  return timestamps.length > 20;
}

function authorized(request: NextRequest) {
  const expected = process.env.VIXVODS_PRIVATE_KEY;
  if (!expected) return false;
  return request.headers.get("authorization") === `Bearer ${expected}`;
}

function response(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) return response({ error: "Unauthorized" }, 401);
  return response({ reviews: getReviews(request.nextUrl.searchParams.get("companySlug") || undefined) });
}

export async function POST(request: NextRequest) {
  if (!authorized(request) && request.headers.get("x-vixvods-web") !== "1") return response({ error: "Unauthorized" }, 401);
  if (rateLimited(request)) return response({ error: "Too many requests" }, 429);
  if (allowedOrigin && request.headers.get("origin") && request.headers.get("origin") !== allowedOrigin) return response({ error: "Origin not allowed" }, 403);
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 12000) return response({ error: "Payload too large" }, 413);
  try {
    const body = await request.json() as Partial<Review>;
    const rating = Number(body.rating);
    if (!body.companySlug || typeof body.companySlug !== "string" || !/^[a-z0-9-]{2,80}$/.test(body.companySlug)) return response({ error: "companySlug invalide" }, 400);
    if (!companies.some((company) => company.slug === body.companySlug)) return response({ error: "Entreprise inconnue" }, 404);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return response({ error: "rating doit être un entier de 1 à 5" }, 400);
    if (typeof body.author !== "string" || body.author.trim().length < 2 || body.author.length > 80) return response({ error: "author invalide" }, 400);
    if (typeof body.comment !== "string" || body.comment.trim().length < 10 || body.comment.length > 4000) return response({ error: "comment doit contenir entre 10 et 4000 caractères" }, 400);
    const analysis = await analyzeReview(rating, body.comment.trim(), body.hasProof === true);
    const review: Review = { id: crypto.randomUUID(), companySlug: body.companySlug, rating, comment: body.comment.trim(), author: body.author.trim(), hasProof: body.hasProof === true, source: typeof body.source === "string" ? body.source.slice(0, 120) : "unknown", projectId: typeof body.projectId === "string" ? body.projectId.slice(0, 120) : undefined, status: "published", createdAt: new Date().toISOString(), ...analysis };
    return response({ review: addReview(review) }, 201);
  } catch { return response({ error: "JSON invalide" }, 400); }
}
