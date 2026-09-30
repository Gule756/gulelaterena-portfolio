# Gulelat Erena — Developer Portfolio

A responsive personal portfolio for Gulelat Erena, showcasing software engineering projects, full-stack development work, technical range, and ways to connect.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/gulelat-portfolio/src/App.tsx` — single-page portfolio content, project filtering, mobile navigation, and interactions
- `artifacts/gulelat-portfolio/src/index.css` — visual system, typography, responsive layout, texture, and motion
- `artifacts/gulelat-portfolio/vite.config.ts` — Vite app configuration and artifact routing

## Architecture decisions

- The portfolio is a frontend-only React/Vite artifact; all content is intentionally sourced from the provided resume.
- The page uses one scroll-based narrative instead of multiple routes so the work, background, skills, and contact path stay connected.
- Project filtering and expandable notes are client-side interactions because the content is static and does not require persistence.

## Product

- Editorial hero introducing Gulelat and his focus
- Academic metrics for CGPA and National Exit Exam performance
- Filterable project showcase with expandable project notes
- Internship, approach, education, leadership, skills, and contact sections
- Responsive navigation and direct GitHub, email, and phone actions

## User preferences

- Build the portfolio with a modern, attractive, senior-level visual finish based on the resume.

## Gotchas

- The frontend build expects `PORT` and `BASE_PATH` from the managed workflow. For manual checks use `PORT=5000 BASE_PATH=/ pnpm --filter @workspace/gulelat-portfolio run build`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
