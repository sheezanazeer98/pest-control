# EcoShield Pest Control — Eco-Friendly Pest Control Website

Professional website for **EcoShield Pest Control**, a licensed pest control company serving Northeastern Pennsylvania. Built as a single-page application with a config-driven architecture — fully reusable for any local service business.

**Live site:** [www.ecoshieldpest.com](https://www.ecoshieldpest.com)

## Tech Stack

- **Single-Page Application** — Client-side routing, one `index.html` with `<template>` elements for each page
- **Tailwind CSS 3.4** — Utility-first CSS with custom reddish primary + orange accent color theme
- **Vanilla JavaScript** — Zero frontend framework dependencies
- **Decap CMS** — Git-based headless CMS for managing blog posts
- **Netlify** — Hosting, forms, identity, CI/CD, and SPA routing

## Project Structure

```
├── index.html                 # SPA shell — all page templates live here
├── js/
│   ├── config.js              # Site configuration (company info, services, areas, SEO)
│   ├── components.js          # Header, footer, icons, shared UI components
│   └── app.js                 # SPA router, page initializers, blog logic
├── css/
│   ├── input.css              # Tailwind CSS source with custom components
│   └── styles.css             # Compiled & minified CSS (generated)
├── content/
│   └── blog/                  # Markdown blog posts (managed via CMS or manually)
│       ├── how-to-prevent-ants-from-invading-your-home.md
│       ├── signs-of-termite-damage-in-your-home.md
│       ├── how-to-keep-mice-out-of-your-home-this-winter.md
│       ├── bed-bug-myths-vs-facts.md
│       ├── protect-your-yard-from-mosquitoes-and-ticks.md
│       ├── what-to-do-when-you-find-wildlife-in-your-attic.md
│       └── spring-pest-prevention-checklist-for-homeowners.md
├── data/
│   └── posts.json             # Blog index (auto-generated from markdown)
├── images/
│   ├── uploads/               # CMS-uploaded images (blog featured images)
│   ├── service-*.jpg          # Service page images
│   ├── hero-bg.jpg            # Home page hero background
│   └── logo.png               # Company logo
├── admin/
│   ├── index.html             # Decap CMS admin panel
│   └── config.yml             # CMS field configuration
├── scripts/
│   ├── build-blog.js          # Generates posts.json from markdown front matter
│   ├── dev-server.js          # Local development server
│   └── dev-start.js           # Starts dev server + CSS watcher together
├── _redirects                 # Netlify SPA routing + legacy URL redirects
├── serve.json                 # Local server SPA routing config
├── netlify.toml               # Netlify build configuration
├── tailwind.config.js         # Tailwind theme (colors, fonts)
├── package.json
└── README.md
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, services overview, testimonials, service areas, recent blog posts |
| `/about` | Company story, values, credentials |
| `/services` | Detailed service listings with images, features, and CTAs |
| `/service-areas` | Coverage map and list of 30+ NEPA communities served |
| `/contact` | Contact form (Netlify Forms) + business info + map |
| `/blog` | Blog listing with pagination |
| `/blog/:slug` | Individual blog post (markdown rendered client-side) |

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### Development

```bash
# Install dependencies
npm install

# Build CSS + blog index, then start dev server with CSS watcher
npm run dev
```

The dev server starts at `http://localhost:3000` with live SPA routing.

### Individual Commands

```bash
npm run build          # Build CSS + blog index (for production)
npm run build:css      # Compile and minify Tailwind CSS only
npm run build:blog     # Regenerate data/posts.json from markdown files
npm run dev:css        # Watch CSS changes during development
npm run serve          # Start local dev server only
npm run cms            # Start local Decap CMS proxy server
```

## Deployment

### Netlify (Recommended)

The site is configured for Netlify out of the box:

1. Push to GitHub
2. Connect the repo in Netlify
3. Build settings are pre-configured in `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `.`
4. SPA routing is handled by `_redirects`

### Post-Deploy Setup

**Enable CMS access:**
1. Site settings → Identity → Enable Identity
2. Registration → Invite only
3. Services → Git Gateway → Enable
4. Invite yourself under Identity → Invite users
5. Access CMS at `https://your-site.com/admin/`

**Enable form notifications:**
1. Site settings → Forms → Form notifications
2. Add email notification for the `contact` form

## License

This project is provided as a template. Feel free to use, modify, and distribute for any purpose.
