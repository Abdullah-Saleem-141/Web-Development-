# Gemini Instructions & Guidelines: Welly Clone Project

This document provides instructions, coding conventions, and development principles for AI assistants and contributors working on this codebase.

## 1. Project Philosophy & Architecture
- **Lightweight & Modular**: Keep dependencies minimal. Rely on standard HTML5, CSS3, modern Vanilla JavaScript (ES6+), and Bootstrap 5 CDN. Do not introduce heavy frontend frameworks or build steps unless requested.
- **Semantic HTML**: Use semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) to maintain accessibility and clean structure.
- **Mobile-First & Responsive**: Ensure every component works seamlessly across mobile (phone), tablet, and desktop viewports.

## 2. Code Organization & Asset Paths
- **Custom Styles**: Place all custom styles, color palettes, and component overrides in `css/style.css`. Leverage Bootstrap 5 utility classes where appropriate and complement them with custom CSS.
- **Custom Scripts**: Keep JavaScript logic cleanly organized in `js/main.js` with clear event-driven handlers and clean functions.
- **Assets**:
  - Image files (banners, product photos) belong in `assets/images/`.
  - SVG or icon files belong in `assets/icons/`.
  - Always use relative paths (e.g., `assets/images/...`) for portability.

## 3. Workflow & Tracking
- **Progress Updates**: Keep `PROGRESS.md` up to date whenever new milestones or major components are implemented.
- **Consistency**: Maintain Welly's vibrant, playful design identity (clean typography, curved cards/buttons, bold product photography, and pastel/bright accents).
