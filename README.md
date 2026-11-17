# Crescenzo Esposito — Engineering & Research Portfolio

[![Deploy to GitHub Pages](https://github.com/kappino/kappino.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/kappino/kappino.github.io/actions/workflows/deploy.yml)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Personal engineering and academic portfolio for **Crescenzo Esposito** (`kappino`), showcasing applied research in **Cybersecurity**, **Zero-Trust IoT Hardening**, **ROS2 Robotic Coordination**, and **Biomedical Machine Learning**.

- **Production URL**: [https://kappino.me](https://kappino.me) (Custom Domain on GitHub Pages)
- **Deployment Status**: Automated CI/CD pipeline via GitHub Actions.

---

## Architecture & Highlights

- Route-level code splitting via `React.lazy()` and `<Suspense>`.
- Typed project case studies and bilingual Markdown articles with tables, diagrams, and math.
- IAS-19 publication record with the Springer DOI and copyable BibTeX.

---

## Local Development

### Prerequisites
- Node.js 24, matching GitHub Actions
- npm bundled with Node.js

### Setup & Run

```bash
# Clone the repository
git clone https://github.com/kappino/kappino.github.io.git
cd kappino.github.io

# Install dependencies
npm ci

# Start development server
npm run dev

npm run lint

# Compile TypeScript & verify production bundle
npm run build

# Preview production build locally
npm run preview
```

## Portfolio console

Run `npm run console` alongside `npm run dev`. Vite forwards the browser's console requests to the Node service on port 4180 on localhost. Try `help`, `status`, `projects` or `articles`.

The service handles a fixed set of portfolio commands. It reads the sitemap and article index from `public/`, and serves the puzzle from a virtual filesystem. The command history lives in the browser tab. There is no shell process or connection to the Proxmox management API.

A GitHub Pages build uses demo mode by default. To connect a deployed service, set `VITE_CONSOLE_API` to its HTTPS endpoint ending in `/api/console` at build time. Run the service with `CONSOLE_ORIGIN=https://kappino.me` and place the HTTPS ingress in front of its loopback listener. Keep the server and the two portfolio indexes together, and apply per-client rate limits at the ingress before exposing it publicly.

---

## Project Structure

```
├── public/
│   ├── 404.html              # GitHub Pages SPA redirect router
│   ├── blog/                 # Technical Markdown articles and index.json
│   ├── CNAME                 # Custom domain configuration (kappino.me)
│   ├── favicon.svg           # Vector shield icon
│   ├── og-image.png          # High-resolution 1200x630 Open Graph social preview
│   ├── robots.txt            # Search engine crawler directives
│   ├── sitemap.xml           # XML sitemap for SEO discovery
│   └── site.webmanifest      # PWA metadata & bookmarking manifest
├── src/
│   ├── components/
│   │   ├── cards/            # ProjectCard, PublicationCard
│   │   ├── common/           # Badge, Icons, ScrollToTop
│   │   └── layout/           # Header, Footer, Layout
│   ├── data/                 # Typed Single Source of Truth
│   │   ├── personal.ts       # Contact and bio data
│   │   ├── projects.ts       # Detailed project specifications & metrics
│   │   ├── publications.ts   # Peer-reviewed papers and BibTeX
│   │   ├── experience.ts     # PNRR Age-IT and engineering history
│   │   └── education.ts      # Academic qualifications
│   ├── pages/                # Lazy-loaded route views
│   ├── types/                # TypeScript interface definitions
│   ├── utils/                # Blog loader & markdown parser
│   ├── App.tsx               # Client router with Suspense
│   ├── index.css             # Tailwind base & engineering grid
│   └── main.tsx
├── .github/workflows/
│   └── deploy.yml            # Automated GitHub Actions deployment
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Contact & Inquiries

- **Email**: `crescenzo.esposito@outlook.it`
- **GitHub**: [@kappino](https://github.com/kappino)
- **LinkedIn**: [Crescenzo Esposito](https://linkedin.com/in/crescenzo-esposito)
