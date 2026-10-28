# upstream-web

The marketing site for Upstream, live at [upstreamcv.com](https://upstreamcv.com).

Upstream was a reliability layer for production computer vision: it streamed
real-world cameras, ran detection, and told operators when and why detection
quality slipped. This site made that case to operators and CV teams running
camera deployments, mostly by showing the product's ideas (a live camera
stream, an inference overlay, a drift timeline) instead of describing them.

The project is finished and this repository is archived. The rest of the
system is in the [UpstreamCV organization](https://github.com/UpstreamCV).

## Pages

| Route | What it is |
| --- | --- |
| `/` | Landing page, told as six scroll-driven "acts" |
| `/about` | The team and how the company thinks about the problem |
| `/waitlist` | Waitlist form for teams with real-world cameras |
| `/gov`, `/gov/engage` | Government systems work, direct or as a subcontractor, with a downloadable capability statement |
| `/api/waitlist` | Form handler: validates input, rate-limits per IP, and emails each submission through Resend |

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- GSAP, Framer Motion and Lenis for scroll-driven animation and smooth scrolling
- Resend for waitlist email
- Hosted on Netlify

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. The waitlist form needs `RESEND_API_KEY` in
`.env.local` to send mail; without it the API route answers 503 and the rest
of the site works normally.

`npm run build`, `npm run start` and `npm run lint` do what you'd expect. CI
runs lint and a production build on every push to `main` and on pull requests.

## Layout

- `src/app/` holds the routes, including the `gov` section and the waitlist API.
- `src/components/v2/` holds the landing page's six acts.
- `src/components/atmosphere/` holds shared motion pieces: the animated
  backdrop, smooth scrolling, scroll progress and text reveals.
- `src/components/about/`, `waitlist/` and `layout/` hold the about page, the
  waitlist form, and the nav and footer.
- `src/components/sections/` and `hero/` hold the first version of the landing
  page; the about page still uses a few of these sections.
- `public/assets/` holds images, video, team photos and the capability
  statement PDF, which `scripts/generate_capability_statement.py` regenerates
  with ReportLab.

## Design docs

- [`PRODUCT.md`](PRODUCT.md): audience, positioning and brand voice.
- [`DESIGN.md`](DESIGN.md): palette, typography and component rules.
- [`docs/product-overview.md`](docs/product-overview.md): the product summary
  the site copy was written from.

## License

© 2026 Upstream Vision, Inc. All rights reserved. See [`LICENSE`](LICENSE).
