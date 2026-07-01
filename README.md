# My Supa Store

Boutique en ligne pédagogique — atelier **Next.js 16** (App Router, React 19, TypeScript).

Projet M2 couvrant le rendu serveur, le cache, l’auth, les Server Actions et le prefetch A/B.

## Stack

| Technologie | Version / rôle |
|-------------|----------------|
| Next.js | 16.2.9 — App Router, `cacheComponents: true` |
| React | 19 |
| Prisma + SQLite | Modèles `Product`, `User` |
| Auth.js (next-auth) | Credentials, JWT, rôles `USER` / `ADMIN` |
| Zod | Validation des formulaires |
| CSS Modules | Styles par composant |

## Démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement (créer .env à la racine)
```

Fichier `.env` minimal :

```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="..."   # openssl rand -base64 32
```

```bash
# 3. Base de données
npx prisma migrate dev
npx prisma db seed

# 4. Lancer le serveur
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

> **Un seul `npm run dev` à la fois.** Si le port 3000 est occupé, Next.js bascule sur 3001 — arrête l’ancien processus pour éviter deux versions du code en parallèle.

### Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production (après `build`) |
| `npm run lint` | ESLint |

## Comptes de test (seed)

| Email | Mot de passe | Rôle |
|-------|--------------|------|
| `admin@store.fr` | `admin123` | ADMIN |
| `user@store.fr` | `user123` | USER |

## Fonctionnalités

### Boutique

- Catalogue produits (maillots) avec fiches détaillées
- Panier persisté en cookie (`POST /api/cart`)
- Produits similaires et sponsorisés (mock GraphQL)
- Parallel Routes `@similar` / `@sponsored` sur `/products/[slug]`
- Onglets description / specs via `searchParams`

### Auth (Jour 3)

- Inscription (`/register`) et connexion (`/login`) via Server Actions
- Trigramme affiché dans le header quand connecté
- Lien **Admin** visible uniquement pour les `ADMIN`
- `proxy.ts` : garde réseau sur `/admin` (redirect `/` si rôle insuffisant)

### Administration

- `/admin` — tableau des produits + formulaires d’édition
- Server Action `updateProductAction` avec validation Zod
- Mantra : **Mutate → Revalidate → Redirect**
  - `revalidateTag("products", "max")` + `revalidatePath`
  - `redirect("/admin?updated=…")`
- Bouton « Simuler une erreur » pour tester `useActionState`

### Rendu & cache (Jour 2)

Pages de démonstration sous `/rendering/` :

| Route | Concept |
|-------|---------|
| `/rendering/static` | SSG + `generateStaticParams` |
| `/rendering/isr` | ISR / `"use cache"` + `cacheLife` |
| `/rendering/dynamic` | Rendu dynamique (`connection()`) |
| `/rendering/cache` | `unstable_cache` + revalidation manuelle |
| `/rendering/ppr` | Partial Prerendering |
| `/rendering/primes` | `unstable_cache` (crible d’Ératosthène) |

### A/B prefetch (Jour 3)

Cookie `ab_variant` (`A` ou `B`) assigné à 50/50 par `proxy.ts`.

| Variante | Comportement |
|----------|--------------|
| **A** | Prefetch automatique des liens produits |
| **B** | Pas de prefetch auto ; prefetch au survol (`PrefetchLink`) |

Forcer une variante :

```
http://localhost:3000/?ab_variant=A
http://localhost:3000/?ab_variant=B
```

→ redirect vers `/` + cookie mis à jour (tester de préférence avec `npm run build && npm start` pour le prefetch réseau).

## Architecture clé

```
proxy.ts              # Auth /admin + cookie A/B
auth.ts               # Config Auth.js
app/actions/          # Server Actions (register, login, update-product…)
lib/queries/          # Requêtes Prisma + unstable_cache
components/navigation/# ProductCard, PrefetchLink
```

## Points d’attention

- **Next.js 16** : `middleware.ts` → `proxy.ts`, `revalidateTag(tag, "max")`
- **`cacheComponents: true`** : `connection()` et `Suspense` pour les parties dynamiques
- **Ne pas muter via `fetch` client** vers des Route Handlers pour les formulaires — Server Actions uniquement (sauf démo panier)
- **Rebuild** après changements structurels si tu testes en mode production

## Licence

Projet pédagogique — usage libre dans le cadre de l’atelier M2.
