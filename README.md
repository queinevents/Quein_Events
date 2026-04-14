# Quein Private Events & Exhibitions Website

A luxury event management website built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.x
- **Animation**: Framer Motion
- **Form Handling**: React Hook Form + Zod
- **Utilities**: clsx, tailwind-merge

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
quein-event-website/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Navigation, Footer
│   ├── sections/         # Page sections
│   ├── ui/               # Reusable UI components
│   └── animations/       # Animation wrappers
├── lib/                  # Utilities and constants
│   ├── constants.ts      # Brand colors, content
│   ├── schemas.ts        # Zod validation schemas
│   └── utils.ts          # Utility functions
├── types/                # TypeScript type definitions
│   └── index.ts
└── public/               # Static assets
    ├── images/
    └── icons/
```

## Build

```bash
npm run build
```

This generates a static export in the `out/` directory.

## Performance Optimization

### Code Splitting

The application uses dynamic imports to split code into smaller chunks:

- **Critical components** (Hero, Statistics, Services) are loaded immediately
- **Below-the-fold sections** (Team, Testimonials, Gallery, Newsletter) are lazy-loaded
- **Animation components** are code-split for optimal bundle size

### Bundle Analysis

Analyze bundle sizes:

```bash
# Build and analyze
npm run build
npm run analyze

# Interactive visualization
npm run build:analyze
```

See [CODE_SPLITTING_GUIDE.md](./CODE_SPLITTING_GUIDE.md) for detailed documentation.

### Performance Targets

- Main bundle: < 200KB (gzipped)
- First Load JS: < 100KB
- Lighthouse Performance: > 90
- Time to Interactive: < 3.8s

## License

© 2024 Quein Private Events & Exhibitions LLC. All rights reserved.
