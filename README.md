# 90s Website Generator - Version 2

Modern implementation of the 90s website generator using cutting-edge tech stack.

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + **shadcn/ui** for modern UI components
- **Convex** for real-time database and backend
- **Vercel** for deployment

## Features

- Modern, responsive generator interface
- Real-time database storage with Convex
- Download generated sites as HTML
- Gallery view (coming soon)
- Share links (coming soon)
- All the classic 90s elements from version 1

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start Convex dev server:
```bash
npx convex dev
```

3. In another terminal, start Next.js:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Convex provider
│   ├── page.tsx            # Main generator page
│   ├── providers.tsx       # Convex client setup
│   └── gallery/            # Gallery page (TODO)
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── generator/
│       └── GeneratorForm.tsx
├── convex/
│   ├── schema.ts           # Database schema
│   └── sites.ts            # Queries and mutations
└── lib/
    ├── site-generator.ts   # HTML generation logic
    └── themes.ts           # Theme configurations
```

## Next Steps

This is the exploration version before finalizing specs. Future features:
- Gallery with all generated sites
- Real-time collaboration
- Template library
- Canvas-based cursor trails
- More 90s effects

## Deployment

Deploy to Vercel:
```bash
vercel
```

Convex will automatically deploy with your Vercel deployment.
