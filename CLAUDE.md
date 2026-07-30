# J2J Connection Website - Development Guide

## Architecture Overview

**Current Stack**: Next.js 15.5.2 + TypeScript + Tailwind CSS v4
**Site**: A single scrolling page for J2J Connection, a two-brother AI consultancy. Light, paper-and-ink design with a marker-yellow accent.
**Deployment**: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
**Directory**: All code is in `/nextjs-site/` subdirectory

## Key Commands

```bash
cd nextjs-site/
npm run dev        # Start development server (localhost:3000)
npm run build      # Build for production (outputs to /out/)
npm run lint       # Run ESLint
```

## Project Structure

```
nextjs-site/
├── src/
│   ├── app/
│   │   ├── page.tsx     # Home page: assembles all sections in order
│   │   ├── layout.tsx   # Root layout, fonts, metadata, fixed Header
│   │   └── globals.css  # Design tokens (paper/ink/marker), highlight-swipe animation
│   ├── components/
│   │   ├── Header.tsx     # Fixed nav with mobile hamburger menu
│   │   ├── Hero.tsx       # "AI that earns its keep." with Highlight marker swipe
│   │   ├── Highlight.tsx  # Reusable yellow marker-highlight wrapper
│   │   ├── Services.tsx   # "What we do" - three-step process (id="services")
│   │   ├── CaseStudy.tsx  # client case study on a pale-yellow band (id="work")
│   │   ├── WhoWeAre.tsx   # Tom + Hayden bios, speaking note (id="about")
│   │   ├── Contact.tsx    # Single mailto CTA, no forms (id="contact")
│   │   └── Footer.tsx     # Logo, copyright, mailto
│   └── content/
│       └── site.ts    # Single source of truth for gated/contact content
├── public/
│   ├── J2J_logo.svg   # Main logo (no video assets)
│   ├── CNAME          # j2j.info - carried into the export so Pages keeps the domain
│   └── team/          # hayden.png, tom.png - circular profile illustrations (480x480, transparent bg)
└── out/                # Generated static export (auto-created, git-ignored)
```

## Content Gating (`src/content/site.ts`)

- `site.email` / `site.mailto`: contact address used everywhere (`team@j2j.info`). Change once here to update the whole site.
- `CASE_STUDY_NAMED`: boolean flag. `true` names the client in the case study and speaking note. Flip to `false` if the client has not approved being named publicly - copy falls back to "Our client" / anonymized phrasing automatically.
- `testimonial`: stays `null` until an approved quote exists; the testimonial block does not render while it is `null`.

## Deployment Pipeline

1. **Push to main** triggers the `deploy.yml` GitHub Actions workflow
2. **Workflow builds** the Next.js app with `npm run build` (static export via `output: 'export'` in `next.config.ts`)
3. **Static export** generated in `/nextjs-site/out/`
4. **Deployed to** GitHub Pages at https://j2j.info
5. There is no other deploy workflow in this repo - `static.yml` and any bike-era workflows have been removed.

## Key Features

- **Single scrolling page**: Hero, Services, Case Study, Who We Are, Contact, Footer - no separate routes.
- **Light design system**: paper background, ink text, marker-yellow highlight accents (see `globals.css` tokens).
- **Highlight swipe**: a one-time CSS animation reveals the yellow highlight behind "earns its keep." on load; respects `prefers-reduced-motion`.
- **Mobile-first nav**: fixed header, hamburger menu on small screens, anchor links with `scroll-mt-20` so the fixed header never covers a section heading.
- **No forms, no chat widget**: contact is a single mailto CTA to `team@j2j.info`.
- **Static export**: GitHub Pages compatible build, no server-side features, images unoptimized by design.

## Development Notes

- **No server-side features** (static export only)
- **Images unoptimized** for GitHub Pages compatibility
- **All nav links use `/#section`** format so anchors resolve correctly from any path
- **Straight vs curly quotes**: prose in `site.ts` and components uses curly apostrophes (’) since it flows directly into rendered copy. Type literal Unicode glyphs (’ “ ”) - they pass `react/no-unescaped-entities` cleanly. Never use `&apos;`/`&quot;` entities (they render as straight quotes) and never disable the lint rule.
- **No em dashes** in site copy or repo docs - regular dashes only.

## Gotchas

- **Never run `npm run build` while `npm run dev` is running.** They share `.next/` and the build corrupts the dev server's manifests (ENOENT `_buildManifest.js.tmp.*`, then 500s on every request). Recovery: `pkill -f "next dev"`, `rm -rf .next`, restart. Bit twice on 2026-07-29.
- **This repo is PUBLIC** (`j2j-connection/j2j-website`). Never commit client-sensitive info: no client contact names, no permission status, no internal planning docs. `.gitignore` blocks `.superpowers/` and `docs/superpowers/` for this reason - do not remove those entries. Client naming on the site itself is gated by `CASE_STUDY_NAMED` in `src/content/site.ts`.
- **Team photo regeneration**: source illustrations had a checkerboard "transparency" pattern baked into the pixels. Real transparency was produced with a Pillow flood-fill from the image borders (light-gray/white tolerance) - see `public/team/`. macOS `sips --cropOffset` silently crops from center, and the machine has no system PIL/ImageMagick; use a scratch venv with `pip install pillow`.

## Production Site

**Live URL**: https://j2j.info (HTTPS secured)
**Status**: Consulting-site redesign live in production (deployed 2026-07-29)

## Changelog

### 2026-07-29 (launch)
- **Deployed to production**: merged to `main`, GitHub Pages deploy succeeded, verified live at j2j.info (content strings, photos, 200s).
- Hero subheadline repositioned per Tom + wife feedback: "Everyone says AI will change your business - nobody says how. We come in, show you what it can actually do, and stay until it works."
- Case study gained privacy copy (paragraph + two sidebar facts): data runs on client-owned accounts, AI provider never trains on it, nothing leaves their team.
- Who We Are: circular profile photos added (`public/team/`), order is Hayden left / Tom right, bios updated (no employer names; Tom = twelve years Silicon Valley).
- Final whole-branch review caught and fixed: highlight washing out inside the case-study band (`isolate` on Highlight), hero clipping at 320px (text-4xl base), OpenGraph metadata added, mobile menu `inert` when closed.
- Branch squashed before push to purge an accidentally committed planning doc containing client-sensitive info; `.gitignore` now blocks `.superpowers/` and `docs/superpowers/`.

### 2026-07-29 (redesign QA)
- Visual QA pass across desktop (1440x900) and mobile (375x812): light paper background, hero highlight, all sections present in order, header anchors do not cover headings, mobile menu opens/closes, mailto links correct, zero console errors, no video or 404 requests.
- Fixed straight apostrophes to curly (’) in `src/content/site.ts` case-study descriptor copy (both `CASE_STUDY_NAMED` branches).
- Rewrote this file and `README.md` to describe the current consulting site and removed stale bike-era (BIKR/TESTR, video carousel) documentation.
- `npm run lint` and `npm run build` both verified clean from `nextjs-site/`.

### 2024-08-30 (historical, bike-era site - superseded by the 2026 consulting redesign)
- Complete Next.js rebuild with comprehensive QA
- Removed legacy static HTML/CSS architecture
- Added GitHub Actions deployment pipeline
- Configured HTTPS enforcement and custom domain
