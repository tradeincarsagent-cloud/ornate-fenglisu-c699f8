# Trade In Cars Agent

AI-powered dealer stock acquisition landing page for UK car dealerships.

## About

A marketing landing page for "Trade In Cars Agent" — an AI service that helps independent UK car dealers discover under-market vehicle opportunities before the competition. The page features a WebGL radar animation, lead capture modal, pricing section, and feature showcase.

## Key Technologies

- **TanStack Start** (React + Vite) — SSR-capable React framework
- **Tailwind CSS v4** — utility-first styling via `@tailwindcss/vite`
- **Formspree** — serverless form submissions for lead capture
- **WebGL** — real-time radar sweep animation in the hero section
- **Netlify** — hosting with the `@netlify/vite-plugin-tanstack-start` adapter

## Running Locally

```bash
npm install
npm run dev
```

The app starts on [http://localhost:3000](http://localhost:3000).

To run with Netlify platform features (edge functions, etc.):

```bash
netlify dev --port 8889
```
