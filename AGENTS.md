# AGENTS.md - VashonSoftware Project Guidelines

> **Single Source of Truth for AI Coding Assistants**
> This file provides guidance to AI agents (Cursor, GitHub Copilot, Claude Code, Codex, etc.) when working with the VashonSoftware codebase.

---

## ⚠️ IMPORTANT: Project-Specific Customizations

**Before following the guidelines below, ALWAYS check `PROJECT.md` first.**

The `PROJECT.md` file contains **project-specific customizations that override these defaults**:
- Custom colors, fonts, and design tokens
- Brand voice and content guidelines
- Project-specific rules and workflows
- Business context and goals

**Priority Hierarchy:**
1. **PROJECT.md** (highest) - Your project-specific instructions
2. **AGENTS.md** (this file) - VashonSoftware defaults and patterns for AI assistants
3. **README.md** - Human-readable documentation (installation, deployment, troubleshooting)
4. **Component documentation** - Individual component guidelines

**When to consult README.md:**
- README.md is written for humans and provides additional context
- Useful for understanding deployment options, installation methods, and user-facing documentation
- Contains detailed explanations of features, troubleshooting guides, and community resources
- Subordinate to AGENTS.md for AI coding conventions, but valuable for project context

If `PROJECT.md` says "use vibrant blue for primary color" but this file says "use Astro blue,"
the **PROJECT.md instruction wins**.

---

## Project Overview

**VashonSoftware** is an open-source component library and starter kit for building Astro.js websites. It provides pre-built, production-ready sections for landing pages and SaaS websites.

| Aspect | Details |
|--------|---------|
| **Purpose** | Help developers ship beautiful websites faster with copy-paste ready components |
| **Target Users** | Web developers, SaaS founders, agencies, indie hackers |
| **Repository** | <https://github.com/VashJuan/VashonSoftware> |
| **Live Demo** | <https://VashonSoftware.com> |

---

## AI-Assisted Development

VashonSoftware is designed to be AI-friendly and serves as your **starting point** for Astro projects.

**Default Workflow:**
- ✅ Use VashonSoftware as the foundation (unless user explicitly requests otherwise)
- ✅ Build on existing components, layouts, and patterns
- ✅ Extend and customize rather than recreate from scratch

**Why VashonSoftware First:**
- Pre-configured with best practices
- Battle-tested component library
- Consistent patterns and architecture
- AI-optimized documentation (AGENTS.md)

---

## Tech Stack

```text
┌─────────────────────────────────────┐
│         Astro v5.x (latest)         │  ← Framework (island architecture)
├─────────────────────────────────────┤
│    Tailwind CSS v4.x (latest)       │  ← Styling (utility-first)
│         via @tailwindcss/vite       │  ← Uses Vite plugin (NOT Astro integration)
├─────────────────────────────────────┤
│    shadcn/ui + Radix UI             │  ← UI Components (React)
├─────────────────────────────────────┤
│         TypeScript (latest)         │  ← Type Safety
└─────────────────────────────────────┘
```

**CRITICAL:** This project uses **Tailwind CSS v4** with the **@tailwindcss/vite** plugin.
Do NOT suggest using `@astrojs/tailwind` integration (which only supports v3).

---

## MCP Servers (Recommended for Claude Code)

For the best development experience with Claude Code, install these **Model Context Protocol (MCP)** servers:

### 1. Astro Docs MCP Server

Provides real-time access to current Astro.js documentation.

**Installation (Claude Code):**

```bash
claude mcp add --transport http astro-docs https://mcp.docs.astro.build/mcp
```

**Manual Configuration (other tools):**

```json
{
  "mcpServers": {
    "astro-docs": {
      "type": "http",
      "url": "https://mcp.docs.astro.build/mcp"
    }
  }
}
```

**Benefits:**

- Real-time access to current Astro documentation
- Prevents outdated API recommendations
- Especially important for newer features (Sessions, Actions, etc.)

**Supported Tools:** Claude Code, Cursor, VS Code, Windsurf, Warp, ChatGPT Pro/Team/Enterprise

### 2. shadcn/ui MCP Server

Enhanced shadcn/ui component integration and installation.

**Installation (Claude Code):**

```bash
claude mcp add --transport http shadcn https://www.shadcn.io/api/mcp
```

**Alternative Setup:**

```bash
pnpm dlx shadcn@latest mcp init --client claude
```

**Manual Configuration:**

```json
{
  "mcpServers": {
    "shadcn": {
      "type": "http",
      "url": "https://www.shadcn.io/api/mcp"
    }
  }
}
```

**Features:**

- Browse all available shadcn/ui components, blocks, and templates
- Install components using natural language
- Search across multiple registries
- Support for private/custom component registries

**Supported Tools:** Claude Code, Cursor, VS Code, Codex

---

**⚠️ Important:**

- If using Claude Code, ask the user for permission before installing MCP servers
- After installation, restart Claude Code to activate the servers
- MCP servers enhance AI assistance but are optional

---

## Project Structure

``` text
VashonSoftware/
├── src/
│   ├── components/
│   │   ├── sections/          # Pre-built page sections (Hero, CTA, Pricing, etc.)
│   │   └── ui/                # shadcn/ui React components (Button, Card, etc.)
│   ├── layouts/               # Page templates (BaseLayout, FullWidthLayout, AuthLayout)
│   ├── pages/                 # File-based routing (index.astro → /)
│   ├── content/               # Content Collections (blog posts)
│   ├── styles/
│   │   └── globals.css        # Design tokens + Tailwind v4 @theme
│   └── lib/
│       └── utils.ts           # Helper functions (cn, etc.)
├── public/                    # Static assets (fonts, favicon)
├── astro.config.mjs           # Astro configuration
└── tsconfig.json              # TypeScript configuration
```

---

## Code Conventions

### Imports - ALWAYS use `@/` alias

```astro
// ✅ CORRECT
import Hero from "@/components/sections/Hero.astro";
import { Button } from "@/components/ui/button";
import BaseLayout from "@/layouts/BaseLayout.astro";

// ❌ WRONG - Never use relative paths
import Hero from "../components/sections/Hero.astro";
```

### Styling - ONLY Tailwind utility classes

```astro
// ✅ CORRECT - Use CSS variables for theming
<div class="py-20 px-6 bg-background text-foreground">
<button class="bg-primary text-primary-foreground">

// ❌ WRONG - Hardcoded colors break dark mode
<div class="bg-blue-500 text-white">

// ❌ WRONG - Never use inline styles
<div style="padding: 80px;">
```

### Responsive Design - Mobile-first

```astro
// ✅ CORRECT - Start small, scale up
<h1 class="text-3xl md:text-5xl lg:text-6xl">

// ❌ WRONG - Don't start large
<h1 class="text-6xl lg:text-3xl">
```

### TypeScript - Always type props

```astro
---
interface Props {
  title: string;
  description?: string;
  variant?: 'default' | 'centered' | 'wide';
}

const { title, description, variant = 'default' } = Astro.props;
---
```

### File Types - When to use .astro vs .tsx

| Use `.astro` | Use `.tsx` |
|--------------|------------|
| Static content (99% of cases) | Interactive components requiring client-side JS |
| Page sections (Hero, CTA, etc.) | Forms with validation |
| Layouts and pages | Modals, dropdowns with state |

---

## Component Patterns

### Section Component Template

```astro
---
// src/components/sections/NewSection.astro
interface Props {
  title?: string;
  subtitle?: string;
}

const { 
  title = "Default Title",
  subtitle 
} = Astro.props;
---

<section class="py-20 px-6">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold mb-4">{title}</h2>
      {subtitle && (
        <p class="text-lg text-muted-foreground">{subtitle}</p>
      )}
    </div>
    <slot />
  </div>
</section>
```

### Page Template

```astro
---
// src/pages/new-page.astro
import BaseLayout from "@/layouts/BaseLayout.astro";
import Hero from "@/components/sections/Hero.astro";

const title = "Page Title - VashonSoftware";
const description = "SEO description (150-160 characters ideal)";
---

<BaseLayout title={title} description={description}>
  <Hero />
  <!-- More sections -->
</BaseLayout>
```

### Layout Selection Guide

| Layout | Use Case |
|--------|----------|
| `BaseLayout` | Content pages, blog posts, documentation (boxed, max-w-5xl) |
| `FullWidthLayout` | Showcase pages, portfolios, galleries (full viewport width) |
| `MinimalLayout` | Standalone pages without navigation (404, maintenance, landing) |
| `AuthLayout` | Login, signup, password reset (split screen with branding) |
| `ArticleLayout` | Blog articles with reading-optimized typography |

---

## Theme System

Colors are defined as CSS variables in `src/styles/globals.css`:

```css
:root {
  --background: 0 0% 100%;        /* Light mode background */
  --foreground: 222 47% 11%;      /* Light mode text */
  --primary: 221 83% 53%;         /* Primary color */
  --primary-foreground: 0 0% 100%;
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;
}

.dark {
  --background: 222 47% 11%;      /* Dark mode background */
  --foreground: 0 0% 100%;        /* Dark mode text */
}
```

**To customize colors:** Edit CSS variables in `globals.css`, NOT in Tailwind config.

---

## SEO Features

VashonSoftware includes comprehensive SEO support out of the box:

| Feature | File | Description |
|---------|------|-------------|
| **SEO Component** | `src/components/SEO.astro` | OpenGraph, Twitter Cards, canonical URLs |
| **Sitemap** | Auto-generated | Via `@astrojs/sitemap` integration |
| **RSS Feed** | `src/pages/rss.xml.ts` | Blog post feed at `/rss.xml` |
| **robots.txt** | `public/robots.txt` | Search engine directives |

**Usage in layouts:**

```astro
<SEO 
  title="Page Title"
  description="Page description"
  image="/cover.png"
  type="website"  // or "article" for blog posts
  noindex={false} // Set true for auth pages
/>
```

---

## Commands

```bash
npm run dev          # Start dev server (http://localhost:4321)
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

---

## Git Workflow

**IMPORTANT:** Never push to remote without explicit user request.

- ✅ Commit changes locally when work is complete
- ❌ Do NOT run `git push` unless the user explicitly asks to push
- ❌ Do NOT automatically push after commits
- Ask for confirmation before any push operation

```bash
# Commit is okay
git add -A && git commit -m "feat: description"

# Push requires explicit user command like:
# "push", "push to main", "deploy", "push it"
git push origin main
```

---

## Do's and Don'ts

### ✅ Always Do

1. Use `@/` import alias for all src/ imports
2. Use Tailwind utility classes exclusively
3. Use CSS variables for colors (supports dark mode)
4. Add TypeScript types for component props
5. Follow mobile-first responsive design
6. Test in both light and dark mode
7. Use semantic HTML (`<section>`, `<article>`, `<nav>`)
8. Follow existing component patterns
9. Add proper accessibility attributes (ARIA, alt text)
10. Use Astro components for static content
11. Use `astro add` command for official integrations (e.g., `astro add tailwind`)
12. Start with VashonSoftware components unless explicitly instructed otherwise
13. Verify modern Astro APIs against current documentation (especially Sessions/Actions)

### ❌ Never Do

1. Use relative imports - always use `@/` alias
2. Hardcode colors - use CSS variables
3. Use inline styles or component-specific CSS files
4. Create `.tsx` files for static content (use `.astro`)
5. Ignore TypeScript errors - fix them
6. Use `any` type - be specific
7. Skip responsive design
8. Modify `public/` folder structure unnecessarily
9. Add global styles outside of `globals.css`
10. Use emojis in code comments

---

## Common Tasks

### Create a New Page

1. Create `src/pages/your-page.astro`
2. Import appropriate layout
3. Add sections as needed
4. File name = URL route (`about.astro` → `/about`)

### Create a New Section

1. Create `src/components/sections/YourSection.astro`
2. Follow the section template pattern above
3. Use semantic HTML and responsive Tailwind classes
4. Support light and dark mode via CSS variables

### Add a shadcn/ui Component

1. Components are in `src/components/ui/`
2. Import as React components
3. Use `client:load` directive if interactive:

```astro
import { Button } from "@/components/ui/button";
<Button client:load>Click me</Button>
```

### Customize Theme Colors

1. Open `src/styles/globals.css`
2. Edit CSS variables under `:root` (light) and `.dark` (dark)
3. Changes apply to entire design system automatically

---

## Debugging Checklist

When something doesn't work, check:

- [ ] Using `@/` import alias?
- [ ] Using CSS variable classes (bg-primary, not bg-blue-500)?
- [ ] Layout imported and used correctly?
- [ ] TypeScript types defined for props?
- [ ] Component responsive on mobile?
- [ ] Works in dark mode?
- [ ] Dev server running (`npm run dev`)?

---

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Hero.astro`, `ThemeToggle.astro` |
| Pages | kebab-case | `index.astro`, `about-us.astro` |
| Utilities | camelCase | `utils.ts` |
| UI Components | kebab-case | `button.tsx`, `card.tsx` |

---

## Useful Tailwind Patterns

```astro
<!-- Container with max width -->
<div class="max-w-7xl mx-auto px-6">

<!-- Responsive grid -->
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

<!-- Centered content -->
<div class="flex items-center justify-center min-h-screen">

<!-- Card with hover effect -->
<div class="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">

<!-- Button group -->
<div class="flex flex-col sm:flex-row gap-4">
```

---

## Performance Best Practices

- Astro components are static by default (no JS shipped)
- Use `client:load` only when absolutely necessary
- Optimize images with Astro's `<Image />` component
- Keep JavaScript bundle size minimal
- Lazy load below-fold content

---

## Accessibility Guidelines

- Use semantic HTML elements
- Add alt text to all images
- Ensure keyboard navigation works
- Use proper heading hierarchy (h1 → h2 → h3)
- Check color contrast (4.5:1 minimum for text)
- Add ARIA labels for interactive elements

---

## Resources

- **Astro Docs:** <https://docs.astro.build>
- **Astro AI Guide:** <https://docs.astro.build/en/guides/build-with-ai/>
- **Astro MCP Server:** <https://mcp.docs.astro.build/mcp>
- **Astro Discord (#support-ai):** <https://astro.build/chat>
- **Astro Templates:** <https://astro.build/themes/>
- **Tailwind CSS Docs:** <https://tailwindcss.com/docs>
- **shadcn/ui:** <https://ui.shadcn.com>
- **shadcn/ui MCP Server:** <https://ui.shadcn.com/docs/mcp>
- **Project README:** See `README.md` for:
  - 📦 Installation options (degit, ZIP download, GitHub clone)
  - 🚀 Deployment guides (Vercel, Netlify, Cloudflare, GitHub Pages)
  - 🔍 Troubleshooting common issues (port conflicts, module errors, dark mode, TypeScript)
  - 🎨 Component library catalog (15+ pre-built sections with variants)
  - 🏗️ Build optimization tips and performance best practices
  - 📊 Analytics integration examples (Google Analytics, Vercel Analytics)
  - 🤖 Detailed AI-friendly development guide
  - 📄 License information and acknowledgments

---

## Claude Code Integration (Optional)

For Claude Code users, VashonSoftware includes pre-built commands in `.claude/commands/`:

| Command | Description |
|---------|-------------|
| `/new-page` | Create a new page with proper layout and SEO |
| `/new-section` | Create a reusable section component |
| `/audit` | Run comprehensive quality checks |
| `/theme` | Customize design tokens and colors |

These commands are optional enhancements. The `AGENTS.md` file remains the primary source of truth for all AI coding tools.

---

**Remember:** Keep code simple, follow the patterns, prioritize user experience.
