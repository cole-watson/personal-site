# personal-site

Cole Watson's portfolio — Next.js 16 (App Router, Cache Components), Tailwind v4, Motion, Resend.

## Develop

```bash
cp .env.example .env.local   # fill in RESEND_API_KEY to test the contact form
npm run dev
```

In dev, dashed amber **TODO** boxes show content gaps; they never render in production.

## Editing content

All copy lives in [`src/content/resume.ts`](src/content/resume.ts): profile, stats, roles, case studies, skills, nav sections.

Optional assets, picked up automatically when present:

| File | Effect |
|------|--------|
| `public/headshot.png` | Replaces the "CW" monogram in the hero (4:5 portrait works best) |
| `public/resume.pdf` | Shows the "Download resume" button |

Case studies deep-link by hash: `/#colorhub`, `/#nike-flow`, `/#pre-components`, `/#just-tour-it`.

## Deploy (Vercel)

1. Push to GitHub, import the repo in Vercel.
2. Set env vars from `.env.example`. Set `NEXT_PUBLIC_SITE_URL` to your domain.
3. Add your domain in Vercel → Domains, then verify the same domain in Resend and set `CONTACT_FROM_EMAIL` to e.g. `Portfolio <hello@yourdomain>`.

## Contact form spam protection

Honeypot field + minimum fill time (3s) + per-IP limit (3 / 10 min). The limiter is in-memory, so per serverless instance only — move it to Upstash/Vercel KV if spam shows up.
