import type { MetadataRoute } from "next";
import { companies } from "./lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vixvods.com";
  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/faq`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/dashboard`, changeFrequency: "monthly", priority: 0.2 },
    ...companies.map((company) => ({ url: `${baseUrl}/company/${company.slug}`, changeFrequency: "daily" as const, priority: 0.9 })),
  ];
}
