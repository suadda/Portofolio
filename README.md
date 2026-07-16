# Portfolio — Firdaus Rabby Mohamad Rafhael

Personal portfolio website of Firdaus Rabby Mohamad Rafhael, Frontend Developer.
Built with **React 19** and **Vite**, featuring a dark theme, scroll-reveal
animations, and a responsive layout.

🔗 **Live site:** _replace with your deployed URL (GitHub Pages / Vercel / Netlify)_

## Tech stack

- React 19
- Vite 7
- Plain CSS + inline styles (no UI framework)
- Google Fonts: Syne, Space Mono, Inter

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build     # outputs to /dist
npm run preview   # preview the production build locally
```

## Editing your content

All personal content lives in the `DATA` object at the top of `src/App.jsx`:
name, role, about text, email, links, skills, and projects. Update it there.

- Replace the profile photo at `public/foto3.jpeg`.
- Update the page metadata (title, description, Open Graph image, canonical URL)
  in `index.html` — remember to swap the placeholder domain for your real one.

## SEO notes

This is a client-side-rendered SPA, so the meta tags in `index.html` are what
search engines and social scrapers read. For full content indexing, consider
pre-rendering or migrating to a framework with SSG (Astro / Next.js).
