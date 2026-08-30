# GIAL College Website — Project Memory

## Project Intent
A modern, ultra-fast, standalone web portal replacing the legacy `girideepamcollege.ac.in` website entirely with zero external redirects, featuring:
- **Interactive Constellation Particle Mesh Background Everywhere**:
  - Main Campus Homepage (`index.html`), Dedicated About Portal (`about-gial.html`), and all Program Portal Windows (`program.html`) now run the interactive constellation particle mesh with dynamic connecting lines and cursor laser attraction.
  - Transparent glassmorphic section backgrounds (`background: transparent; backdrop-filter: blur(8px)`) ensure the animation is visible from the top header to the footer.
  - Domain-themed neon color palettes:
    - **Cyber Forensics**: Neon green (`#00ff66`, `#34d399`) + cipher glyphs (`01`, `0x`, `FF`, `⚡`, `🛡️`) + green laser constellation
    - **Psychology**: Electric violet & fuchsia (`#c084fc`, `#e879f9`) + neural synaptic connectors (`Ψ`, `🧠`, `α`, `β`, `∞`)
    - **BCA**: Electric cyan & blue (`#38bdf8`, `#00f2fe`) + logic circuit nodes (`</>`, `AI`, `&&`, `{}`)
    - **Logistics & IB**: Marine teal & amber (`#14b8a6`, `#5eead4`) + trade corridor flight routes (`⚓`, `🚢`, `✈️`, `📦`)
    - **BBA**: Royal gold & sapphire (`#fbbf24`, `#60a5fa`) + growth analytics vectors (`📈`, `▲`, `ROI`, `💼`)
    - **Commerce & Taxation**: Emerald wealth & gold (`#10b981`, `#fbbf24`) + quantitative ledger math (`₹`, `$`, `€`, `∑`, `∆`)
    - **MSW (Social Work)**: Coral rose & gold (`#fb7185`, `#f59e0b`) + empathy community mesh (`🤝`, `♥`, `★`, `👥`)
- **2-Second Continuous Cinematic Scroll Translation with LERP Physics**:
  - **Unobstructed Initial Panorama (0% → 6% scroll)**: Crystal clear campus photography.
  - **Gradual 2-Second Cinematic Translation (6% → 52% scroll)**: Smooth, continuous LERP physics with `requestAnimationFrame` translating **"Girideepam Institute of Advanced Learning"** upward from `translateY(60px)` to `0px` over ~600px of natural scroll travel (~1.5–2 seconds of scrolling), with slow camera push-in and deep vignette transition.
  - **Comfortable Hold Zone (52% → 78% scroll)**: 100% visible, stable, fully readable, with interactive CTA buttons.
  - **Fixed "Advanced Learning" Transparent-Clip Blackout Bug**: Replaced fragile `-webkit-text-fill-color: transparent` with rich, 100% solid luminous amber gold (`#fbbf24`) backed by warm gold text shadow.
  - **Seamless Docking (78% → 100% scroll)**: Dissolves into the official ISO 9001:2015 About Us section with zero empty gap.
- **Clubs & Associations Hover-Reveal Interactive Showcase (`#clubs`)**:
  - Full-bleed photographic thumbnails for all 8 clubs with smooth hover zoom and glassmorphic description reveal overlay.
- **Scrollbar Ergonomics & Aesthetics Polish**:
  - Suppressed default browser scrollbars on faculty detail modals, dialogs, drawers, and overlay cards while preserving natural, fluid mousewheel & touch scrolling.
  - Sleek custom 6px dark emerald glass track on main viewport.

## Architecture
- **Stack**: Express.js Backend + Pure HTML5 / CSS3 / Vanilla JavaScript Frontend + 2D HTML5 Canvas Domain Animation Engines (100% self-contained, zero external site dependencies)
- **Folder Structure**:
  - `public/index.html` — Main campus home page with **Site-Wide Constellation Particle Mesh**, **Hover-Reveal Interactive Club Cards**, **Mobile Bottom Action Bar**, **Navbar Scroll Spy**, **Responsive Faculty Cards Grid**, **Official News & Events Showcase (`#news`)**, **Clean Program Cards**, **Official ISO 9001:2015 Emblem & About Us Showcase**, dynamic faculty directory with positions and **Authentic Faculty Profile Details Modal**, **Institutional Placement Showcase**, official facilities & gallery
  - `public/about-gial.html` — Dedicated standalone portal for Bethany Navajyothi Province, Archbishop Mar Ivanios history, RICRAC values, statutory approvals, and governance
  - `public/program.html` — Dedicated program portal window with semester-by-semester CBCS syllabus, domain HUD hero thumbnail, **Authentic Faculty Profile Details Modal**, lab details, and direct admission application
  - `public/programs_data.js` — Comprehensive database of all 10 UG/PG programs, syllabi, official faculty portraits, official designations, education, specialization areas, and bios
  - `public/program.js` — Dynamic rendering logic for program details portal, clean faculty profile modal, **Dynamic Cyber / Psychology / BCA / Logistics / BBA / Commerce / MSW Theme Applicators**, and **Interactive Domain Constellation Particle Engines**
  - `public/style.css` — High-contrast `.hero-title-highlight` styling, transparent section styling for site-wide background animation visibility, `.mobile-action-bar` layout, `.faculty__grid` responsive layout, `.club-card` hover-reveal full-bleed layout, modal scrollbar suppression, fixed 330px flip-cards with 210px photo frame, styling for all 7 program categories, clean modal layout, and responsive layouts
  - `public/script.js` — 2-second smooth LERP physics scroll storytelling engine, interactive constellation particle mesh, faculty department filtering, active section scroll spy, sleek card elevation, dynamic faculty directory, and smooth in-page hash navigation with instant reveal

## Session Log
- **2026-08-30**:
  - Rebuilt `program.js` with the interactive constellation particle mesh and domain-specific color themes, floating symbols, transparent hero backdrops, and robust ready-state execution.
  - Resolved empty section rendering bug by introducing an intelligent URL parameter alias resolver in `program.js` and `programs_data.js` covering all program query variants (`commerce`, `logistics`, `bcom`, `mcom`, `cyber-forensics`, etc.).
  - Restored full interactive Faculty Profile Details Modal on both `index.html` and `program.html` with official photos, designation badges, contact actions (`tel:` and `mailto:`), qualifications, specializations, and bios.
  - Synchronized root workspace files with `public/` to ensure identical behavior regardless of server root or preview environment.
  - Implemented authentic classic ASCII CMatrix digital rain engine in `program.js` with vertical streaming columns (12–28 chars deep, half-width Katakana + ASCII + numerics), white glowing lead heads, emerald phosphor gradients, character mutation flicker, and black hole gravitational vortex suction without any cursor overlays.
  - Built immersive domain-thematic Faculty Profile Modals: for Cyber Forensics (`modal--theme-cyber`), features neon HUD corner brackets, glowing top holographic telemetry banner (`[ CYBER_FORENSICS // ENCRYPTED DOSSIER ]`), rotating biometric HUD avatar scanner ring with vertical laser scanlines, agent ID chip badges, declassified operational dossier bio layout, and live cipher character scramble text decryption upon opening. Tailored thematic modes also implemented for Psychology (neural synapse), BCA (logic circuit), Logistics, BBA, Commerce, and MSW.
  - Enhanced CMatrix black hole absorption: expanded event horizon (300px), amplified gravitational inward pull & accretion swirl torque, added ionized white-green compression glowing, and introduced orbiting quantum matrix dust sparks that spiral and plunge into the cursor center.
  - Polished faculty profile modal: removed rotating dashed HUD ring around avatar, and transformed modal overlay & card backing into a sleek translucent frosted glass theme (`backdrop-filter: blur(12px)`) so background Matrix digital rain and theme animations remain visible moving behind the modal.
  - Redesigned mouse interaction: removed tornado/swirling physics and sparks, implementing direct vertical mouse code absorption where falling matrix streams flow straight down into the cursor, illuminate and get swallowed upon arrival, and disappear completely without continuing to fall below the pointer.
  - Cleaned up faculty profile modal badges: completely removed the bottom avatar badge banner (`AGENT ID: VERIFIED`) and top telemetry HUD banner for a refined, professional presentation.
  - Implemented smooth gravitational spacetime curvature: matrix streams falling within a 260px event horizon bend and curve inward along smooth gravitational vectors directly into the cursor, illuminating with white-green ionization before vanishing into the singularity.
  - Published and deployed clean repository to GitHub: initialized Git repository with `main` branch, audited and verified all JavaScript and CSS files with 0 errors, created comprehensive `README.md`, pushed to `https://github.com/cid-moosa/website`, and enabled GitHub Pages live deployment at `https://cid-moosa.github.io/website/`.
  - Rebranded documentation, metadata, and package info as an Academic Student Testing & Prototype Project for teacher demonstration.
  - Reverted repository to Public on GitHub (`cid-moosa/website`) and re-enabled live GitHub Pages deployment at `https://cid-moosa.github.io/website/`.

