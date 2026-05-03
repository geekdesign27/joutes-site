# Joutes Inter-Pompiers de la Sarine 2026

Site officiel des Joutes Inter-Pompiers de la Sarine 2026 — événement organisé par la Compagnie des Sapeurs-Pompiers de Moncor.

**📅 13 juin 2026 · Villars-sur-Glâne — Nuithonie**

---

## 🚀 Stack technique

| Brique | Choix | Pourquoi |
|---|---|---|
| Framework | **Astro 5** + îlots React | HTML statique pour SEO + perf max |
| Styling | **Tailwind v4** + design tokens CSS | Système de design fidèle à la maquette |
| CMS | **Keystatic** (git-based, admin React) | Édition via interface web ou VS Code direct |
| Hébergement | **Vercel** (free tier) | Déploiement git push, edge network |
| Domaine | `joutesinterpompiers2026.ch` (Infomaniak DNS) | A/AAAA records vers Vercel |
| Polices | **Oswald** + **Bitter** (Google Fonts CDN) | Cohérence avec la maquette |
| Analytics | **GA4** (consent-first via vanilla-cookieconsent) | Conforme nLPD/RGPD |

---

## 📦 Lancer le site en local

Prérequis : Node 22+ et pnpm 10+.

```bash
# Installation des dépendances (une fois)
pnpm install --ignore-workspace

# Serveur de développement (http://localhost:4321)
pnpm --ignore-workspace dev

# Build de production
pnpm --ignore-workspace build

# Preview du build localement
pnpm --ignore-workspace preview
```

> ⚠️ Le flag `--ignore-workspace` est nécessaire pour ignorer le `pnpm-workspace.yaml` du dossier home.

---

## ✏️ Éditer le contenu (deux voies)

### Voie 1 — Admin web Keystatic (recommandée)

Une fois le site déployé sur Vercel avec les variables d'env GitHub OAuth :

1. Aller sur `https://joutesinterpompiers2026.ch/keystatic`
2. Se connecter avec son compte GitHub (geekdesign27)
3. Modifier les sections, ajouter/supprimer des sponsors via l'interface
4. Cliquer **Publier** : un commit est créé sur `main`, Vercel rebuild auto (~30 s)

### Voie 2 — Édition directe (en local)

Tous les contenus sont des fichiers JSON simples dans `src/content/` :

- `src/content/settings/site.json` — title, description, GA4 ID, infos générales
- `src/content/sections/hero.json` — texte du hero + image de fond optionnelle
- `src/content/sections/ouvert-a-tous.json` — texte de la section "Ouvert à tous"
- `src/content/sections/match.json` — texte + heure du match
- `src/content/sponsors/sponsor-XX.json` — un fichier par sponsor

Modifier, commiter, pousser → Vercel rebuild auto.

---

## 🎨 Architecture du design

### Système de grille (audit responsive)

La grille **200×285 px** est imposée comme système de tokens CSS dans `src/styles/global.css` :

```css
:root {
  --cell-w: 200px;
  --cell-h: 285px;
}
@media (max-width: 960px) {
  :root {
    --cell-w: calc(100vw / 6);
    --cell-h: calc(var(--cell-w) * 1.425);
  }
}
```

Chaque section a une **hauteur multiple de `--cell-h`** pour que la grille apparaisse continue entre sections sans aucun JS — pas de `background-attachment: fixed` (bug iOS Safari documenté).

### Composants

- `<GridBackground variant="light|dark" />` — overlay grille avec lignes + points
- `<Hero />`, `<OpenSection />`, `<Match />`, `<Sponsors />`, `<Footer />` — sections
- `<Scoreboard />` — tableau d'affichage du match (résilient à la longueur de la valeur "kickoff")
- `<SponsorCard recolor={true|false} />` — toggle filtre orange par sponsor
- `<SEO />` — meta + Open Graph + JSON-LD Event schema
- `<CookieBanner />` (React Island) — consentement + chargement GA4 conditionnel

---

## 🔍 SEO

Inclus de série :
- ✅ `<title>`, meta description, canonical
- ✅ Open Graph (`og:image` 1200×630)
- ✅ Twitter Card
- ✅ JSON-LD Event schema (rich snippet Google)
- ✅ `sitemap-index.xml` auto-généré
- ✅ `robots.txt` (`/keystatic/` et `/api/` exclus du crawl)
- ✅ `manifest.webmanifest` + favicons

---

## 🔐 Configuration Keystatic (production uniquement)

L'édition via `/keystatic` en production nécessite une GitHub OAuth App :

1. Créer une OAuth App sur https://github.com/settings/developers
   - **Application name** : Joutes 2026 Keystatic
   - **Homepage URL** : `https://joutesinterpompiers2026.ch`
   - **Authorization callback URL** : `https://joutesinterpompiers2026.ch/api/keystatic/github/oauth/callback`
2. Récupérer Client ID + Client Secret
3. Configurer 3 variables d'env sur Vercel (voir `.env.example`) :
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET` (générer avec `openssl rand -hex 32`)

> En local, l'édition fonctionne sans OAuth (mode local Keystatic).

---

## 📋 Checklist pre-launch

- [ ] DNS Infomaniak pointe vers Vercel (A/AAAA records)
- [ ] SSL Vercel actif sur root + www
- [ ] GitHub OAuth App créée et liée
- [ ] Variables Keystatic configurées sur Vercel
- [ ] Test admin `/keystatic` en production : login + édition test
- [ ] GA4 ID configuré dans `site.json` (si analytics souhaitée)
- [ ] Test bannière cookies : refus → pas de GA4 chargé
- [ ] Test responsive : 375 / 768 / 1280
- [ ] Validation Open Graph : https://www.opengraph.xyz/url/https://joutesinterpompiers2026.ch
- [ ] Validation JSON-LD : https://search.google.com/test/rich-results
- [ ] Lighthouse score > 95 mobile + desktop

---

## 📂 Structure du projet

```
joutes-site/
├── astro.config.mjs              # Config Astro + intégrations
├── keystatic.config.ts           # Schéma CMS
├── package.json
├── public/                       # Assets statiques
│   ├── logo.svg                  # Logo principal
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── og.png                    # OG image 1200×630
│   ├── manifest.webmanifest
│   ├── robots.txt
│   ├── hero/                     # Images de fond hero (uploads via CMS)
│   └── sponsors/                 # Logos sponsors (uploads via CMS)
└── src/
    ├── components/               # Composants Astro + 1 React Island
    ├── content/                  # Contenu géré par Keystatic
    │   ├── settings/site.json
    │   ├── sections/*.json
    │   └── sponsors/*.json
    ├── layouts/BaseLayout.astro
    ├── pages/
    │   ├── index.astro           # Landing
    │   └── mentions-legales.astro
    ├── styles/global.css         # Tokens design + grille
    └── content.config.ts         # Schémas Astro Content
```

---

## 🤝 Contexte du projet

Le brainstorming complet et le plan d'implémentation sont archivés dans `_bmad-output/` du repo parent (côté Dropbox local). Stack et garde-fous arbitrés via session BMad du 2026-05-03.

---

**Maintenu par** : Pierre-Alain Schutz (geekdesign27)
**Licence** : © 2026 Compagnie des Sapeurs-Pompiers de Moncor
