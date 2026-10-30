# AGENTS.md

Single-package Next.js 16 (App Router) app. Not a monorepo. Package manager: npm (`package-lock.json`).

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint (flat config, `eslint-config-next`)
- No `test` or `typecheck` script exists. Verify types with `npx tsc --noEmit`.

## Toolchain quirks

- **Next.js 16.4.3 with breaking changes** — consult `node_modules/next/dist/docs/` before writing Next.js code; it differs from older versions. Notably, the root layout is typed: `LayoutProps<"/">`.
- **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`). Do not add manual `useMemo`/`useCallback`/`React.memo` boilerplate.
- **Tailwind CSS v4, CSS-first config** — no `tailwind.config.*`; theme lives in `src/app/globals.css` via `@theme inline`. Loaded through the `@tailwindcss/turbopack` rule in `next.config.ts`.

## UI stack

- shadcn/ui, style **`base-nova`** — built on `@base-ui/react`, **not Radix**. Do not import Radix packages.
- Add components with `npx shadcn add <component>`; all UI primitives live in `src/components/ui/`.
- `cn()` is re-exported from the `cn` npm package via `src/lib/utils.ts` (not `clsx` + `tailwind-merge`).
- Code highlighting uses Shiki with a custom lazy language registry in `src/lib/highlighter.tsx`.

## Structure & conventions

- Path alias: `@/*` → `./src/*`.
- App entrypoints: `src/app/page.tsx`, `src/app/layout.tsx`. Shared layout components (`Navbar`, `Footer`) live in `src/app/components/shared/` — colocated with `app/`, not in `src/components/`.
- Custom hooks in `src/hooks/`, utilities in `src/lib/`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
