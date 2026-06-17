# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal blog and project notebook built with Astro 6. Static-site output, deployed as an nginx-served container image.

## Commands

Package manager is **pnpm** (do not use npm/yarn).

- `pnpm dev` — start the dev server
- `pnpm build` — runs `astro check` (type-checking) then `astro build`; build fails on type errors
- `pnpm preview` — preview the production build locally
- `pnpm astro ...` — run the Astro CLI directly (e.g. `pnpm astro check`)

There is no test suite. `astro check` is the closest thing to validation; run it (or `pnpm build`) before considering a change done. Formatting is Prettier with the Astro and Tailwind plugins (`.prettierrc.mjs`).

## Architecture

Content-driven site using Astro's content collections. Two collections are defined in `src/content.config.ts`, both loaded via the `glob` loader from `src/content/`:

- **blog** — `src/content/blog/<slug>/index.md`, schema: `title`, `description`, `date`, optional `draft`, `tags[]`
- **projects** — `src/content/projects/<slug>/index.md`, schema adds optional `demoURL`, `repoURL`

To add a post, create a new folder with an `index.md` matching the Zod schema; co-locate images in the same folder. Schema validation happens at build via `astro check`.

Routing (`src/pages/`) follows Astro file-based conventions. Dynamic routes `blog/[...id].astro` and `projects/[...id].astro` render individual entries via `getStaticPaths`; `tags/[...id].astro` generates a page per tag. Site-wide content (title, descriptions, socials, homepage post/project counts) lives in `src/consts.ts`, typed by `src/types.ts`.

Search is provided by **pagefind** (`astro-pagefind` integration), which indexes the built HTML — it only works against the production build, not `pnpm dev`.

### Conventions

- **Import aliases** (from `tsconfig.json`): `@/*`, `@components/*`, `@layouts/*`, `@lib/*`, `@consts`, `@types`. Prefer these over relative paths.
- Styling is **Tailwind CSS v4**, configured via the Vite plugin (`@tailwindcss/vite`) — there is no `tailwind.config.js`; global styles and theme are in `src/styles/global.css`. Use `clsx` + `tailwind-merge` (`src/lib/utils.ts`) for conditional classes.
- Code-block highlighting uses Shiki with the `css-variables` theme (set in `astro.config.mjs`), so syntax colors are driven by CSS custom properties.
- TypeScript is `astro/tsconfigs/strict`.

## Deployment

`Dockerfile` is a multi-stage build (pnpm install → `pnpm build` → copy `dist/` into nginx). CI is **Forgejo Actions** (`.forgejo/workflows/docker-image.yml`), not GitHub Actions — pushes to `main` build and push a multi-arch image to `git.home.mhlg.io`. Deployment to the cluster is via the Helm chart in `charts/blog/` and ArgoCD config in `argocd/`.
