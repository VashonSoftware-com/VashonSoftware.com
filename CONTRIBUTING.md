# VashonSoftware Style Guide

This file is an internal style and workflow reference for maintaining the VashonSoftware site.

For setup, commands, and deployment workflow, see README.md.

## Purpose

- Keep implementation quality consistent.
- Keep design and content aligned with the brand.
- Reduce rework by using repeatable patterns.

## Core standards

- Use Astro for page and section composition.
- Use Tailwind utility classes (no inline styles).
- Use CSS variables and project theme tokens for colors.
- Use mobile-first responsive patterns.
- Prefer semantic HTML and accessible markup.
- Keep solutions simple; follow existing patterns before inventing new ones.

## File and naming conventions

- Components: PascalCase, for example Hero.astro.
- Pages: kebab-case, for example about-us.astro.
- Utilities: camelCase, for example utils.ts.
- Import path style: always use @/ alias for src imports.

## Astro, Tailwind, and component rules

- Use .astro for static content and section components.
- Use interactive islands only when required.
- Keep layout selection intentional:
  - BaseLayout for most content pages.
  - FullWidthLayout for showcase pages.
  - AuthLayout for auth flows.
- Use spacing and typography scales that match existing sections.
- Avoid hard-coded colors like bg-blue-500 when a token class exists.

## Accessibility standards

- Maintain heading hierarchy (h1 -> h2 -> h3).
- Add alt text for informative images.
- Add aria-label for icon-only controls.
- Ensure keyboard access for interactive elements.
- Verify contrast in light and dark themes.

## Content and copy style

- Write clear, direct, benefit-first copy.
- Keep marketing language confident but specific.
- Avoid hype language that does not explain value.
- Use short paragraphs and scannable section headings.

## Workflow for changes

1. Start from an existing section/layout pattern when possible.
2. Implement the smallest complete change.
3. Run local checks:
   - pnpm run lint
   - pnpm run build
4. Verify the page in both light and dark mode.
5. Verify mobile and desktop layouts.
6. Document meaningful behavior changes in README.md when needed.

## Quick review checklist

- Imports use @/ alias.
- No inline style attributes.
- No hard-coded off-theme colors.
- Responsive behavior works at mobile/tablet/desktop.
- Accessibility basics are covered.
- Build and lint succeed.
