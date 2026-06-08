# Michael Dattolo — Product Design Portfolio

**Portfolio Version:** v3.0.3

A modern, **semantically-structured and recruiter-ready portfolio** featuring 10 case studies across product design, robotics, AI, and emerging technologies — built on a custom "engineering-meets-design" dark theme with a molten-amber signature accent.

**Live:** `mike-dattolo.com`


## 📋 Redesign (v3.0.3 — June 2026)

A ground-up visual + discoverability overhaul:

- 🎨 **New design system** — Token-driven dark theme, molten-amber accent, fluid type scale, Space Grotesk / Inter pairing
- ✨ **Motion & depth** — Animated aurora hero, pointer-driven spotlight cards, animated stat counters, role rotator, tools marquee, scroll reveals (all reduced-motion safe)
- 🤖 **AI / machine discoverability** — `llms.txt`, `robots.txt`, `sitemap.xml`, JSON-LD structured data (`Person`, `WebSite`, `ItemList`, per-project `CreativeWork`), canonical URLs, and a branded Open Graph card
- ♿ **Accessibility** — WCAG AA contrast, semantic HTML, keyboard nav, visible focus, `prefers-reduced-motion`
- 📱 **Responsive** — Mobile-first, fluid layouts, no layout shift

**See:** `IMPROVEMENTS_CHANGELOG.md` for prior history.

---

## Overview

A **static HTML/CSS/JavaScript site** (no frameworks, no build step) designed for:

- **Recruiter conversion** — Clear CTAs, outcomes-focused project cards, resume access, contact form
- **Rich case studies** — Detailed narratives, process, and measurable results
- **Accessibility** — Semantic HTML, keyboard nav, focus states, reduced-motion support, WCAG AA compliance
- **Maintainability** — Clean code, token-driven CSS, progressive JS enhancements

---

## Project Structure

```
.
├── index.html                              # Home / featured work
├── llms.txt                                # Machine-readable site map for LLM/AI agents
├── robots.txt                              # Crawler directives + sitemap pointer
├── sitemap.xml                             # XML sitemap
├── about/
│   └── index.html                          # About + skills + experience + resume
├── contact/
│   └── index.html                          # Contact methods
├── work/
│   ├── index.html                          # Work grid + filters
│   ├── martian-construction-robot/
│   ├── 5-axis-3d-printing-waste-reduction/
│   ├── bloominbeds-monitoring-system/
│   ├── edison-ai-assistant/
│   ├── total-ergonomics-micropipette/
│   ├── artificial-magnetic-fields/
│   ├── willies-cafe-space-study/
│   ├── growth-algorithm-simulation/
│   ├── storage-concepts/
│   ├── jrm-enterprises-feasibility/
│   └── release-the-beast/
│       └── (each contains index.html case study)
├── styles/
│   ├── tokens.css                          # Design tokens
│   ├── base.css                            # Global resets, layout
│   ├── components.css                      # Reusable UI patterns
│   └── pages.css                           # Page-specific layouts
├── scripts/
│   ├── main.js                             # Core JS: year, scroll-reveal, progress
│   └── filters.js                          # Work grid filtering
└── assets/
    ├── img/                                # Project images
    └── icons/                              # UI icons
```

---

## Architecture

### HTML & Semantics

- **Landmarks:** `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`
- **Navigation:** Unified across all pages (Work, About, Resume, Contact)
- **Skip link:** Jump to main content  
- **Progressive enhancement:** Fully functional without JS

### CSS Strategy (Token-Driven)

**Layer 1: Variables** (`tokens.css`)
- Colors: dark bg (#0b0f1a), blue accent (#3b82f6), orange (#f97316)
- Spacing scale, typography, shadows, transitions

**Layer 2: Globals** (`base.css`)
- Resets, body/heading styles, utilities (.sr-only, focus states)
- Scroll-reveal animation classes (.will-reveal, .is-revealed)
- Header/footer, reading progress bar

**Layer 3: Components** (`components.css`)
- .button, .card, .chip, .callout, .card-media, etc.
- Reusable across pages

**Layer 4: Page-Specific** (`pages.css`)
- .hero, .contact-page, .case-study, .rtb-*, etc.

### JavaScript (Progressive Enhancement)

**No external dependencies.** All features degrade gracefully.

1. **Year injection** — Auto-update copyright
2. **Scroll reveal** — Fade-in cards via IntersectionObserver
   - Uses CSS classes (not inline styles)
   - Respects `prefers-reduced-motion`
3. **Reading progress** — Case study scroll indicator
4. **Work filters** — Tag-based grid filtering with URL state

---

## Case Studies (11 Projects)

| Project | Discipline | Key Outcome |
|---------|-----------|------------|
| **M.A.R.T.I.A.N Bot** | Robotics | 8-legged Mars robot, topology-optimized, 5-step autonomous workflow |
| **EcoPrint — 5-Axis 3D Printing** | Sustainability | ~40% waste reduction via multi-axis toolpath strategy |
| **BloominBeds Monitoring System** | Health-Tech / IoT | Raspberry Pi sensor network, real-time environmental control |
| **EDISON AI Assistant** | AI / Software | Offline multi-modal LLM + voice + image gen + RAG |
| **Total Ergonomics™ Micropipette** | Health-Tech / UX | User-centered redesign for rheumatoid arthritis; foot-pedal validated |
| **Artificial Magnetic Fields for Mars** | Robotics / Simulation | Parametric EM shield for radiation protection |
| **Willie's Café Space Study** | Space Design | Data-driven seating analysis, ADA-compliant redesign |
| **Growth Algorithm Simulation** | Computational | Grasshopper/Rhino generative design with collision detection |
| **Storage Concepts** | Product Design | Modular + wearable carry unit explorations |
| **JRM Enterprises Feasibility** | Business | $2M startup plan, market research, tiered pricing |
| **Release the Beast** | Brand / Apparel | Full identity system: logos, apparel lineup, web assets |

---

## Quick Start

### Local Development

No build step needed. Choose any:

```bash
# Python 3
python3 -m http.server 8000

# Or Node
npx http-server

# Or VS Code Live Server (right-click root → "Open with Live Server")
```

Then open `http://localhost:8000`

### Deploy to GitHub Pages

1. Ensure repo is pushed to GitHub
2. **Settings → Pages**
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)`
3. Save → deployed in ~1 min

Site available at: `https://<github-username>.github.io/<repo-name>/`

### Other Platforms

- **Vercel/Netlify**: Connect GitHub repo, zero config needed
- **Traditional host**: Upload entire folder to web server

---

## Navigation

All pages have **consistent header nav:**

```
Work  |  About  |  Resume  |  Contact
```

- **Resume** links to `/about/#resume` (anchor to Resume section)
- **Active page** denoted with `aria-current="page"`
- Mobile-responsive hamburger (if implemented; currently always visible)

---

## Features

✅ Custom dark theme with molten-amber signature accent  
✅ Animated aurora hero + pointer-driven spotlight cards  
✅ Animated stat counters, role rotator, tools marquee  
✅ Scroll-reveal animations + reading progress bar  
✅ JSON-LD structured data + `llms.txt` for AI discoverability  
✅ Branded Open Graph / Twitter card  
✅ Unified navigation + brand mark across all pages  
✅ Keyboard accessible + `prefers-reduced-motion` support  
✅ Contact form with validation (Cloudflare Worker + Resend)  

---

## Customization

### Change Colors

Edit `styles/tokens.css`:

```css
:root {
  --bg: #0a0a0c;            /* Deep graphite canvas */
  --accent: #ff7a45;        /* Molten amber signature */
  --accent-bright: #ffb15c; /* Lighter amber */
  --accent-deep: #ff5a36;   /* Deep orange */
  --text-heading: #ffffff;  /* Headings */
  --text-body: #b6b6c0;     /* Body copy */
  --text-dim: #85858f;      /* Secondary text */
  /* legacy --color-* aliases are kept and repointed for back-compat */
}
```

The accent is also exposed as `--accent-gradient`. All components update automatically.

### Add a Case Study

1. Create `work/<slug>/index.html` (copy from existing case)
2. Update <title>, metadata, content
3. Add card to `work/index.html`:
   ```html
   <article class="card" data-tags="tag1 tag2">
     <div class="card-media">
       <img src="../assets/img/..." alt="..." loading="lazy">
     </div>
     <p class="tag-list"><span class="tag">Tag</span></p>
     <h2><a href="<slug>/">Project Title</a></h2>
     <p>Brief description highlighting problem & outcome.</p>
   </article>
   ```
4. Add featured card to `index.html` (same structure, class="card card-large")
5. Push to deploy

### Update Personal Info

Search-replace:
- Email: `mike.dattolo@yahoo.com`
- LinkedIn: `mikedattolo`
- Location: `Hackettstown, NJ`
- Name: `Michael Dattolo`

---

## Accessibility

✅ **WCAG 2.1 Level AA** (target)

- Semantic HTML landmarks
- Descriptive image alt text
- Keyboard-navigable (Tab, Enter, arrows work)
- Visible focus states on all interactive elements
- Color contrast ≥ 4.5:1 on dark background
- Respects `prefers-reduced-motion` media query
- Skip link to main content
- Proper heading hierarchy (H1 > H2 > H3)
- Lists use semantic `<ul>`/`<ol>`/`<li>`
- Buttons/links clearly labeled

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile: iOS Safari, Chrome Mobile (tested to 320px width)

---

## Performance Notes

- **No external JS libraries** → faster load
- **Images optimized** (webp, contain fit)
- **Minimal CSS** (~900 lines across 4 files)
- **Lazy loading** on images (`loading="lazy"`)
- **Single JS bundle** (main.js deferred)

Typical page: <100KB total

---

## Notes & Assumptions

- **Image placeholders:** Some project images are placeholders or low-res. Replace with final assets
- **Metrics:** Case study outcomes use actual data where available; some emphasize process/narrative
- **No backend:** Contact link sends email client; no form submissions
- **No analytics default:** Add your own (Google Analytics, Plausible, etc.)
- **Static-only:** Suitable for static hosting (GitHub Pages, Vercel, Netlify, etc.)

---

## Future Enhancements

- Contact form integration (Formspree, Netlify Forms)
- Dark/light mode toggle
- Full-text search across case studies
- Blog/articles section
- Video embeds
- Social sharing buttons

---

Built with **semantic HTML**, **token-driven CSS**, and **progressive JavaScript.**  
Optimized for recruiters, clients, and accessibility.

