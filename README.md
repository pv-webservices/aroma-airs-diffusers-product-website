# Aroma airs

A responsive Next.js business catalogue based on the supplied homepage design. The site contains five diffuser detail pages, four collection pages, twelve fragrance pages, applications, a gallery, contact information, policy pages and a custom 404. Product discovery leads to WhatsApp, phone or an enquiry; there are no customer accounts or purchase flows.

## Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000. For the production build:

```powershell
npm run build
npm run start
```

`npm run typecheck` checks TypeScript. `npm run verify:site` checks a running site for routes, titles, page headings, contact destinations and broken internal links. It writes evidence to `output/playwright/route-audit.json`.

## Content and assets

- Business and catalogue data live in `src/lib/data.ts`. Phone and address use the supplied VS Incorporation business screenshot: **9015759321**, Defence Enclave, Mahipalpur, New Delhi 110037. The email is `aromaairs@gmail.com`, consistently shown on the supplied catalogues.
- Older diffuser catalogues contain **9015759332**. That number is not used for website contact actions.
- Original JPEGs remain intact in `public`. The website uses WebP crops in `public/images`; `npm run prepare:assets` regenerates the original catalogue crops from the supplied sheets and photos. Product logos in the photography are preserved.
- The logo is the supplied `public/Aromaairs Fragrance Diffuser Logo.png`. `node scripts/prepare-logo.mjs` builds `logo-dark.webp` (header) and `logo-light.webp` (footer, with the tagline recoloured for dark backgrounds).
- **AI imagery** (Google Nano Banana 2 Lite, `gemini-3.1-flash-lite-image`, 1K): the desktop and mobile hero, the stats-band mist shot and nine scent images (five single shots plus one 2×2 grid split into four). The hero prompts pass the client's own catalogue photo as a reference so the diffusers keep their real design. Run `node --env-file=.env scripts/generate-images.mjs` (needs a billing-enabled `GEMINI_API_KEY`); raw PNGs land in `output/generated`.
- `node scripts/prepare-redesign-assets.mjs` converts everything to optimised WebP under the same public filenames. AI images replace stock ones automatically when present. Scent images that were not generated (Gucci Flora, Shangria White, Trishya) and the lobby/leaf/backdrop photos come from Unsplash (Unsplash License).
- Scent photographs illustrate the fragrance character. Shared oil-bottle images are explicitly representative range packaging, not invented fragrance-specific labels.
- Additional office, retail, hospital, café and spa interiors are illustrative Unsplash photographs. They do not represent client installations. Sources and regeneration are recorded in `scripts/prepare-lifestyle.mjs`; `node scripts/prepare-lifestyle.mjs` fetches only missing files. Production pages use local images and do not contact Unsplash.
- `approvedTestimonials` in `src/components/testimonials.tsx` is empty. The reusable section remains hidden until genuine client-approved reviews are added. Until then, the homepage uses a "How it works" sticky-card section in that slot.

## Motion & interaction

`src/components/motion.tsx` drives scroll reveals, count-up stats and a `--progress` CSS variable on `[data-scroll]` sections. CSS uses that variable for the parallax ("move") and zoom effects (hero, technology image, stats band, about photo, CTA, inner-page heroes). Sticky layouts power the product intro, technology column and stacking "How it works" cards. The fragrance band, hero ticker and gallery strip are CSS marquees that pause on hover or focus. Buttons use a continuous colour-flow gradient (no shine sweep). Cards lift, zoom and reveal accents on hover, focus or touch. Everything is disabled under `prefers-reduced-motion`. Styles are split between `src/app/globals.css` (tokens, header, hero, homepage sections) and `src/app/site.css` (remaining sections, inner pages, responsive rules).

## Specification decisions

The supplied catalogue sheets disagree. The broad sheet lists general values that vary by model and cannot safely populate individual products. The branded Tower sheet describes 5W, ABS, 170 × 170 × 620 mm and coverage in sq. ft.; the separate GAM-1001F parameter sheet describes 14W, aluminium alloy, 133 × 185 × 606 mm and coverage in cubic metres. These disputed Tower fields are omitted. Its 800 ml capacity, two finishes, floor-standing setup and touch/Bluetooth controls are supported by the supplied material.

Wall Pro-specific dimensions/capacity/power are not established by an unambiguous model-specific sheet, so they are omitted. The GAS-501F sheet is not automatically assigned to the visually different Compact White. Compact Black uses the branded Compact sheet. Ask the client for current, model-matched specifications before filling in remaining fields.

## Enquiries

Without `ENQUIRY_ENDPOINT`, the form validates required fields and opens WhatsApp with a prepared message. The user must press Send in WhatsApp. The website explicitly says this and never reports a successful backend submission. Direct calls to `/api/enquiry` return 503 when the service is not configured.

To connect an HTTPS JSON form service, copy `.env.example` to `.env.local`, set `ENQUIRY_ENDPOINT` and optionally `ENQUIRY_API_TOKEN`, then rebuild. The server validates fields, checks browser origin, keeps credentials server-side and enforces a ten-second request timeout. It forwards name, phone, email, company, city, product, message, consent and source. A successful service response is required before the UI confirms submission. Configure service-level spam protection and storage according to the selected provider. Live delivery remains unverified until a real endpoint is connected.

## Publishing configuration

Set `NEXT_PUBLIC_SITE_URL` to the confirmed public HTTPS origin before the release build. This enables canonical URLs, absolute social previews, sitemap entries and search indexing. Preview builds without a domain intentionally use `noindex` and disallow crawlers, with an empty sitemap, instead of inventing a business domain.

Use a host supporting Next.js/Node for the enquiry route and automatic image optimisation. The pages themselves are statically generated. Review the website policy text, current specifications and logo with the client before publishing. No deployment has been performed.

## Verification evidence

Browser screenshots and audits are saved under `output/playwright/` (ignored by Git). The site supports keyboard navigation, Escape to close menus/lightboxes, native form validation, reduced motion and a mobile contact bar. Fixed image areas reserve layout space; all fonts are local. The recorded Lighthouse results apply to a local production build and are not a guarantee of hosted performance.

Implementation references: [Next.js metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [static route parameters](https://nextjs.org/docs/app/api-reference/functions/generate-static-params), [image component](https://nextjs.org/docs/app/api-reference/components/image).
