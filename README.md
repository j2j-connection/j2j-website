# J2J Connection Website

The website for J2J Connection, a two-brother AI consultancy. A single scrolling page: hero, what we do, a client case study, who we are, and contact. Light, paper-and-ink design with a marker-yellow accent.

Built with Next.js 15 (App Router, static export), TypeScript, and Tailwind CSS v4. All code lives in `nextjs-site/`.

## Local Development

```bash
cd nextjs-site
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build, static export to nextjs-site/out/
npm run lint       # Run ESLint
```

## Content

Contact address, and the case-study naming gate, live in `nextjs-site/src/content/site.ts`:

- `site.email` / `site.mailto` - the contact address shown across the site (`team@j2j.info`).
- `CASE_STUDY_NAMED` - set to `false` to anonymize the case study client if they have not approved being named publicly.
- `testimonial` - stays `null` (and hidden) until an approved quote is added.
- `bookingUrl` - Calendly link for the "Book a 30-minute call" buttons; `null` falls back to email-only.
- `goatCounterCode` - GoatCounter analytics site code; `null` disables analytics.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the static export and publishes it to GitHub Pages at [j2j.info](https://j2j.info). There is no other deploy path for this repo.

## Project Structure

See `CLAUDE.md` for the full component breakdown and development notes.
