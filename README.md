# Vixvods — Plateforme de Reviews IA-Powered

Plateforme moderne de reviews avec **IA réelle** (OpenAI GPT-4o-mini), design Soft Black, Next.js 15.

## Fonctionnalités

- Landing + Hero + Recherche
- Profils entreprises (pages dynamiques `/company/[slug]`)
- Formulaire d'avis avec analyse IA en temps réel (Trust Score + mots-clés)
- Fallback local intelligent si OpenAI est down
- Dashboard Pro avec génération de réponses IA
- **API privée centralisée** (`/api/reviews`) avec tracking de source
- FAQ dynamique + Schema.org
- SEO complet (metadata, sitemap, robots, JSON-LD, Open Graph)

## Stack

- Next.js 15 (App Router + Turbopack)
- TypeScript
- Tailwind CSS (Soft Black)
- Framer Motion
- OpenAI GPT-4o-mini

## Installation

```bash
cd vixvods
npm install
cp .env.example .env.local
# Ajoute ta clé OPENAI_API_KEY
npm run dev
```

## API Privée

```bash
curl -X POST https://ton-domaine.com/api/reviews \
  -H "Authorization: Bearer TON_VIXVODS_PRIVATE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 5,
    "comment": "Excellent service",
    "author": "Jean D.",
    "hasProof": true,
    "source": "monsite.com",
    "projectId": "mon-projet"
  }'
```

Chaque avis est centralisé + tracké par source.

## Licence

MIT