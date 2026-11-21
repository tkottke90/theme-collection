# AGENTS.md

Guidance for AI coding agents working in this repo. See `CONTRIBUTING.md`
for the full human-facing rationale — this file doesn't duplicate it, only
points at it and adds agent-specific guardrails.

## Repo map

- `packages/*` — every `@tkottke90/theme-*` package. `theme-starter-css`,
  `theme-starter-wc`, and `theme-starter-react` are **reference templates**,
  not throwaway examples — don't delete them, and base new packages on
  whichever one matches the shape you need (see `CONTRIBUTING.md`).
- `apps/site` — the Eleventy site. It lists packages by reading
  `packages/*/package.json` at build time; you don't need to hand-edit a
  page when a package is added or removed.
- `themes/*` — shared design tokens, one `theme.css` per theme. Not an npm
  workspace, not published on its own. A package's styling is compiled
  from here via `scripts/compile-theme.mjs`, never hand-copied into the
  package. See `CONTRIBUTING.md`'s "`themes/` vs `packages/`" and
  `docs/adr/` for why.
- `scripts/` — shared build helpers (`esbuild-base.mjs`, `compile-theme.mjs`).
  Package-level `scripts/build.mjs` files should stay thin wrappers around them.
- Root `tsconfig.base.json`, `eslint.config.mjs`, `.prettierrc.json`,
  `jest.config.base.cjs` — the single source of truth for TS/lint/format/test
  config. Packages extend these; they don't redefine them.

## Adding or changing a theme package

1. Follow `CONTRIBUTING.md`'s "Adding a new theme package" steps — copy the
   matching starter, don't scaffold a new shape from scratch.
2. Component tech (Web Components vs Preact/React vs CSS-only) is a
   per-package decision already made by whichever starter you copied; don't
   change a package's underlying framework as a side effect of an unrelated
   change.
3. Every package keeps the `build`, `test`, `lint`, `storybook`, and
   `build-storybook` npm scripts — the Eleventy site and CI both assume they
   exist.

## Before considering a change done

Run from the repo root (or scope with `-w <package>` for a single package):

```
npm run lint
npm run format:check
npm run test --workspaces --if-present
npm run build --workspaces --if-present
npm run build-storybook -w <package-name>   # for any package you touched
```

A change isn't finished if any of these fail. These are also the exact
checks CI enforces (`Test`, `Lint`, `Style`, `Build Site`).

## Guardrails

- Don't commit build output (`dist/`, `storybook-static/`, `_site/`,
  `packages/theme-starter-wc/src/generated/`) — all gitignored on purpose.
- Don't hand-copy token values into a WC/React package's own source (a
  `tokens.ts`, an inline hex, a duplicated custom property). Styling is
  compiled from `themes/<name>/theme.css` via `scripts/compile-theme.mjs` —
  see `CONTRIBUTING.md` and `docs/adr/0001-theme-token-architecture.md`.
- Don't add a per-package ESLint/Prettier/Jest config, or a new root
  dependency that duplicates something already in `scripts/esbuild-base.mjs`,
  `tsconfig.base.json`, `eslint.config.mjs`, or `jest.config.base.cjs` —
  extend the shared config instead.
- Don't add an npm-publish workflow or `NPM_TOKEN` usage — publishing to the
  `@tkottke90` scope is an intentionally deferred follow-up (tracked as a
  GitHub issue), not something to wire up opportunistically.
- Don't fill in the S3 upload step in `.github/workflows/site-deploy.yml` —
  it's a deliberate TODO stub until the user connects the bucket/credentials
  themselves. Don't add deploy credentials or secrets on your own initiative.
- Don't weaken or remove the `Test`/`Lint`/`Style`/`Build Site` CI jobs to
  get a PR green — fix the underlying failure instead.
