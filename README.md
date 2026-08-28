# Vixvods

Vixvods est une plateforme de reviews avec **Trust Score explicable**, analyse IA optionnelle et centralisation d’avis par projet. Cette branche fournit un MVP fonctionnel sous Next.js 15 App Router.

## Fonctionnalités livrées

La landing page permet de rechercher les entreprises disponibles. Chaque profil `/company/[slug]` affiche les avis publiés, la moyenne, le Trust Score, les thèmes détectés, les metadata SEO et un formulaire d’avis. La FAQ possède un balisage `FAQPage` JSON-LD.

La route `POST /api/reviews` valide les données, applique une limite simple de payload et de fréquence, vérifie l’entreprise, lance l’analyse OpenAI si une clé serveur est configurée et bascule sinon vers une analyse locale déterministe. La route `GET /api/reviews` et la génération de réponses du dashboard sont protégées par `Authorization: Bearer VIXVODS_PRIVATE_KEY`.

Le dashboard `/dashboard` permet de charger les avis centralisés avec la clé privée et de générer un brouillon de réponse. La clé est stockée uniquement dans le localStorage du navigateur dans ce MVP ; utilisez un vrai OAuth/RBAC avant une utilisation multi-utilisateur.

## Installation

```bash
npm install
cp .env.example .env.local
npm run dev
```

Pour lancer les validations :

```bash
npm run typecheck
npm run lint
npm run build
```

## Variables d’environnement

`OPENAI_API_KEY` est optionnelle. Si elle est absente ou si l’appel échoue, le fallback local est utilisé. `OPENAI_MODEL` vaut par défaut `gpt-4o-mini`. `VIXVODS_PRIVATE_KEY` protège les endpoints Pro et de lecture API. `NEXT_PUBLIC_SITE_URL` sert de base aux metadata et au sitemap.

Ne commitez jamais `.env.local` ou une clé OpenAI. Utilisez une clé longue, aléatoire et renouvelable pour `VIXVODS_PRIVATE_KEY`.

## API

Créer un avis depuis une intégration externe :

```bash
curl -X POST https://votre-domaine.com/api/reviews \
  -H "Authorization: Bearer VOTRE_VIXVODS_PRIVATE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "companySlug": "vixluxia-studio",
    "rating": 5,
    "comment": "Excellent service et équipe très réactive.",
    "author": "Jean D.",
    "hasProof": true,
    "source": "monsite.com",
    "projectId": "mon-projet"
  }'
```

Lire les avis avec une clé serveur :

```bash
curl https://votre-domaine.com/api/reviews \
  -H "Authorization: Bearer VOTRE_VIXVODS_PRIVATE_KEY"
```

## Structure principale

| Chemin | Rôle |
|---|---|
| `app/page.tsx` | Landing, recherche et entreprises |
| `app/company/[slug]/page.tsx` | Profil dynamique et dépôt d’avis |
| `app/components/ReviewForm.tsx` | Formulaire client d’avis |
| `app/api/reviews/route.ts` | Création et lecture des avis |
| `app/api/reviews/[id]/response/route.ts` | Brouillon de réponse Pro |
| `app/lib/data.ts` | Entreprises et stockage mémoire du MVP |
| `app/lib/analysis.ts` | Analyse OpenAI et fallback local |
| `app/dashboard/page.tsx` | Dashboard protégé |
| `app/faq/page.tsx` | FAQ et JSON-LD |

## Limites à traiter avant la production

Le stockage des avis est actuellement en mémoire serveur : un redémarrage efface les avis créés et plusieurs instances ne partagent pas le même état. Il faut brancher PostgreSQL/TiDB, ajouter des migrations, des index, des contraintes d’unicité et des sauvegardes restaurables.

Le rate limiting présent est local au processus. En production, utilisez Redis ou le mécanisme équivalent du fournisseur d’hébergement. Le dashboard utilise une clé privée dans le navigateur uniquement pour rendre le MVP testable ; il faut le remplacer par un fournisseur OAuth, un RBAC multi-tenant et une gestion de clés hachées avec rotation et révocation.

La preuve d’expérience est pour le moment une déclaration booléenne et aucun fichier n’est stocké ou vérifié. Il faut implémenter un mécanisme de preuve réel, la modération, le signalement, les demandes de retrait, l’audit et les politiques de conservation des données avant d’afficher un label de vérification fort.

## Licence

MIT
