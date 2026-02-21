# Michael Dattolo Portfolio

Recruiter-friendly portfolio site built with semantic HTML, token-driven CSS, and minimal JavaScript.

## Mission

This portfolio presents one integrated practice across:
- **EDISON-ComfyUI**: Practical, production-minded AI systems that are private and multimodal.
- **BloominBeds**: Sustainable, sensor-driven prototyping grounded in real-world outcomes.
- **InkAndCrayons**: Human-centered creative storytelling paired with technical execution.

## Information Architecture

- `/` Home
- `/work/` Work index
- `/work/<slug>/` Case study pages
- `/about/` About
- `/contact/` Contact

## Run Locally

No build step required.

### Option 1: Python

```bash
python3 -m http.server 8000
```

Open: `http://localhost:8000`

### Option 2: VS Code Live Server

Serve the workspace root and open the generated local URL.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
4. Save and wait for Pages to publish.
5. Your site will be available at your Pages URL.

## Project Structure

```text
.
├── index.html
├── about/
│   └── index.html
├── contact/
│   └── index.html
├── work/
│   ├── index.html
│   ├── martian-construction-robot/
│   │   └── index.html
│   ├── 5-axis-3d-printing-waste-reduction/
│   │   └── index.html
│   ├── bloominbeds-monitoring-system/
│   │   └── index.html
│   ├── edison-ai-assistant/
│   │   └── index.html
│   ├── total-ergonomics-micropipette/
│   │   └── index.html
│   ├── artificial-magnetic-fields/
│   │   └── index.html
│   ├── willies-cafe-space-study/
│   │   └── index.html
│   ├── growth-algorithm-simulation/
│   │   └── index.html
│   ├── storage-concepts/
│   │   └── index.html
│   └── jrm-enterprises-feasibility/
│       └── index.html
├── styles/
│   ├── tokens.css
│   ├── base.css
│   ├── components.css
│   └── pages.css
└── scripts/
    ├── main.js
    └── filters.js
```

## Notes

- Case study pages contain full narrative copy sourced from actual project repositories and research.
- Image placeholders include descriptive "Replace with:" captions that specify exactly what photo/screenshot to insert.
- Work filters progressively enhance with JavaScript and preserve state with URL query params.
