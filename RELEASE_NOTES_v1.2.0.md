# AstroDeck v1.2.0 – "AI Ready for Takeoff" 🚀

**Release Date:** December 25, 2024

---

## 🎄 Holiday Release: AI-Friendly Development

This release transforms AstroDeck into a truly AI-native starter kit. We've consolidated our AI configuration into the industry-standard AGENTS.md format, added a dedicated Claude Code Agent, and completely redesigned the homepage to showcase these capabilities.

---

## ✨ Highlights

### 🤖 AGENTS.md Standard Support

AstroDeck now follows the [AGENTS.md standard](https://agents.md) – an open format for guiding AI coding agents, adopted by **60,000+ repositories** and stewarded by the Linux Foundation.

**Supported tools include:**
- OpenAI Codex
- GitHub Copilot
- Cursor
- Google Jules
- Gemini CLI
- Windsurf
- VS Code (Copilot Agent)
- Claude Code
- And many more (Zed, Aider, Factory, Amp, RooCode...)

### 🧠 Dedicated Claude Code Agent

A custom sub-agent configuration (`.claude/agents/astrodeck.md`) that:
- Understands the entire AstroDeck project structure
- Provides proactive security, accessibility, and SEO warnings
- Offers intelligent code suggestions following project conventions
- References the AGENTS.md as single source of truth

### 🎨 Redesigned Homepage

- **New AI Feature Section** – Showcases supported tools with official logos via [lobe-icons](https://github.com/lobehub/lobe-icons)
- **Highlighted USPs** – Custom `<mark>` effect for key phrases (subtle green highlight)
- **Updated Hero Copy** – "Ready to take off" messaging with clear value proposition
- **Reordered Sections** – AI Feature section now prominently placed before Features

---

## 📝 All Changes

### Features

- Add Claude Code AI Agent for project assistance
- Consolidate AI guidelines into AGENTS.md standard
- Use lobe-icons CDN for AI tool logos (OpenAI, GitHub Copilot, Cursor, Gemini, Windsurf, Claude)
- Add Gemini CLI and VS Code to AI tools grid (now 8 tools)
- Highlight key phrases in Hero with `<mark>` effect
- Move AI section before Features section (key USP positioning)

### Improvements

- Update Hero title: "ready to go" → "ready to take off" (matches Astro rocket logo)
- Update Hero subtitle with AGENTS.md standard and major supporters (OpenAI, GitHub, Google)
- Redesign AI tools grid to match Features section style (gap-px borders, shadows)
- Simplify AI Feature section layout (two balanced text paragraphs)
- Custom mark styling: subtle green background with bold dark text
- Rename badge from "AI-Powered" to "AI-Friendly Development"

### Documentation

- Add comprehensive AGENTS.md tool support documentation with verification links
- Add Git workflow rules: no auto-push without explicit user request
- Update README with Claude Code Agent documentation

### Fixes

- Align AI section container width with rest of page (max-w-5xl)
- Fix mark styling for dark mode compatibility

---

## 🔧 Technical Details

### New Files

- `AGENTS.md` – Single source of truth for AI coding assistants (361 lines)
- `.claude/agents/astrodeck.md` – Claude Code sub-agent configuration
- `CLAUDE.md` – Symlink to AGENTS.md for Claude Code compatibility

### Modified Files

- `src/components/sections/Hero.astro` – HTML subtitle support via `set:html`
- `src/components/sections/AIFeature.astro` – Complete redesign with lobe-icons
- `src/pages/index.astro` – Updated Hero props, section reordering
- `src/styles/globals.css` – Custom `<mark>` styling
- `.cursorrules` – Now symlinks to AGENTS.md

---

## 📦 Upgrade Guide

```bash
# Pull latest changes
git pull origin main

# Install dependencies (if any new ones)
npm install

# Start development server
npm run dev
```

No breaking changes – this is a fully backward-compatible release.

---

## 🙏 Acknowledgments

- [lobe-icons](https://github.com/lobehub/lobe-icons) for the beautiful AI/LLM brand logos
- [AGENTS.md](https://agents.md) standard and the Agentic AI Foundation
- The Astro team for the amazing framework

---

**Full Changelog:** [v1.1.0...v1.2.0](https://github.com/holger1411/astrodeck/compare/v1.1.0...v1.2.0)
