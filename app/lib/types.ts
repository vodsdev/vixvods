export type ReviewStatus = "published" | "pending" | "rejected";

export type Review = {
  id: string;
  companySlug: string;
  rating: number;
  comment: string;
  author: string;
  hasProof: boolean;
  source: string;
  projectId?: string;
  status: ReviewStatus;
  createdAt: string;
  trustScore: number;
  keywords: string[];
  aiSummary: string;
  aiResponse?: string;
};

export type Company = {
  slug: string;
  name: string;
  category: string;
  description: string;
  location: string;
  website: string;
  accent: string;
};
