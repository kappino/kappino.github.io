# Crescenzo Esposito — Engineering & Research Portfolio

[![Deploy to GitHub Pages](https://github.com/kappino/kappino.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/kappino/kappino.github.io/actions/workflows/deploy.yml)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Personal engineering and academic portfolio for **Crescenzo Esposito** (`kappino`), showcasing applied research in **Cybersecurity**, **Zero-Trust IoT Hardening**, **ROS2 Robotic Coordination**, and **Biomedical Machine Learning**.

---

## Architecture & Highlights

- **Lean & Zero-Debt Core**: No ghost dependencies, no bloated bundles. Production code split across dynamic lazy-loaded routes via `React.lazy()` and `<Suspense>`.
- **Zero-Trust Client Security**: No API tokens, private keys, or credentials bundled into client artifacts. Form inquiries are handled cleanly without exposing private endpoints.
- **W3C Semantic Standards**: Clean HTML structure with zero illegal interactive nesting (no `<a>` inside `<a>`). Accessible keyboard navigation.
- **Dynamic Markdown Blog Engine**: Native parsing of technical `.md` articles with GFM support and automatic read-time calculation.
- **Academic Research Portal**: Features the **IAS-19** peer-reviewed publication with verified metrics and a 1-click BibTeX citation exporter.

---

## Local Development

### Prerequisites
- Node.js `>= 18` (v20+ recommended)
- npm `>= 9`

### Setup & Run

```bash
# Clone the repository
git clone https://github.com/kappino/kappino.github.io.git
cd kappino.github.io

# Install dependencies
npm install

# Start development server
npm run dev

# Compile TypeScript & verify production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Project Structure

```
├── public/
│   ├── 404.html              # GitHub Pages SPA redirect router
│   ├── blog/                 # Technical Markdown articles and index.json
│   └── favicon.svg           # Vector shield icon
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
