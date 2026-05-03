# VashonSoftware

Open-source Astro starter and component library for shipping modern marketing, SaaS, and content websites quickly.

Live site: https://vashonsoftware.com

## What this repo includes

- Astro 6 site with reusable sections and layout patterns
- Tailwind CSS 4 via @tailwindcss/vite
- Svelte 5 support for interactive islands
- Blog-ready structure with RSS and sitemap support
- CI build checks in GitHub + deployment through Cloudflare Pages

## Project structure

This is the high-level structure used by the project:

```text
/
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── astro.config.mjs
├── package.json
└── wrangler.jsonc
```

Pages are file-routed from src/pages. Reusable UI and sections live in src/components.

## Commands

Run commands from the repository root.

| Type | Command | Action |
| :--- | :--- | :--- |
| pnpm | pnpm install | Install dependencies from pnpm-lock.yaml |
| pnpm | pnpm dev | Start local dev server at http://localhost:4321 |
| pnpm | pnpm run build | Build production output to dist |
| pnpm | pnpm run preview | Preview the production build locally |
| pnpm | pnpm run lint | Run ESLint checks |
| pnpm | pnpm run lint:fix | Run ESLint and auto-fix safe issues |
| pnpm | pnpm run format | Format the repository with Prettier |
| pnpm | pnpm run format:check | Check formatting without changing files |
| pnpm | pnpm run lint:md | Lint markdown files |
| pnpm | pnpm run astro -- --help | Show Astro CLI help |

## Updating the toolchain

This section separates PowerShell environment commands from pnpm project dependency commands.

### PowerShell environment commands

Use these to verify or update developer tooling installed on your machine.

```powershell
node -v
pnpm -v
```

Update pnpm through Corepack:

```powershell
corepack enable
corepack prepare pnpm@latest --activate
pnpm -v
```

Update Node.js using winget (Windows):

```powershell
winget upgrade OpenJS.NodeJS
```

If you use Node LTS specifically:

```powershell
winget upgrade OpenJS.NodeJS.LTS
```

### pnpm project dependency commands

Use these to update package versions used by this repository.

```bash
pnpm update --latest
pnpm install
pnpm run lint
pnpm run build
```

If you want targeted upgrades instead of all packages:

```bash
pnpm up astro @astrojs/svelte @astrojs/sitemap @astrojs/mdx @astrojs/rss --latest
pnpm up tailwindcss @tailwindcss/vite @tailwindcss/typography --latest
pnpm install
pnpm run build
```

After successful updates, commit both package.json and pnpm-lock.yaml.

## Cloudflare deployment workflow

This repository uses Cloudflare Pages for deployments and GitHub Actions for CI build checks.

### One-time setup in Cloudflare Pages

1. Create a new Pages project and connect this GitHub repository.
2. Set Build command to: pnpm run build
3. Set Build output directory to: dist
4. Set environment variable NODE_VERSION to the Node version you want Cloudflare to use.

### CI workflow in GitHub

The workflow file .github/workflows/cloudflare-pages-deploy.yml runs on every push and manual dispatch. It:

1. Checks out source
2. Sets up pnpm
3. Sets up Node
4. Installs dependencies with frozen lockfile
5. Runs pnpm run build

This validates changes before or alongside Cloudflare Pages builds.

### Day-to-day deploy flow

1. Make changes locally
2. Run:

```bash
pnpm install
pnpm run lint
pnpm run build
```

3. Push to GitHub
4. GitHub Actions runs CI build checks
5. Cloudflare Pages detects the push and builds/deploys automatically
6. Verify production deployment in the Cloudflare Pages dashboard

### Manual redeploy options

- Cloudflare dashboard: open the latest deployment and click Retry deployment.
- GitHub Actions: use Run workflow to re-run CI checks.

## Style guide and maintenance workflow

This repository is maintained more as an internal site than a public contribution project. Use these standards for consistent updates:

- Use Astro composition patterns already present in src/components and src/layouts.
- Use Tailwind utilities and theme token classes; avoid inline styles and hard-coded colors.
- Use @/ import aliases for all src imports.
- Keep components mobile-first and verify at multiple breakpoints.
- Keep semantic HTML and accessibility basics (heading order, alt text, aria labels).
- Run quality checks before sharing changes:
	- pnpm run lint
	- pnpm run build

For the full internal guide, see CONTRIBUTING.md.

## Learn more

- Astro docs: https://docs.astro.build
- Cloudflare Pages docs: https://developers.cloudflare.com/pages/
- Tailwind docs: https://tailwindcss.com/docs
