# Contributing

This repo is an npm-workspaces monorepo. Every theme is published as its own
package under the `@tkottke90/theme-*` scope, and shares the same root
tooling (TypeScript, ESLint, Prettier, Jest, esbuild).

## Repo layout

```
packages/      every published theme package (@tkottke90/theme-*)
apps/site      the Eleventy site that showcases the repo + each package's Storybook
scripts/       shared build helpers used by package build scripts
```

## Adding a new theme package

Copy the starter package closest to what you're building — don't start from
scratch, and don't invent a fourth package shape without updating this doc
first:

| Starter                        | When to use it                                                                                                                                                                |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/theme-starter-css`   | A plain CSS theme (design tokens, utility classes), optionally authored with Tailwind. No JS bundle.                                                                          |
| `packages/theme-starter-wc`    | A component library built as framework-agnostic Web Components (Lit). Works in any project regardless of framework.                                                           |
| `packages/theme-starter-react` | A component library built with Preact (React-API compatible). Swap `preact` for `react` in that package's own dependencies if a given theme specifically needs React instead. |

Steps:

1. Copy the starter directory to `packages/theme-<name>`.
2. Rename the package in `package.json` to `@tkottke90/theme-<name>` and
   update its `description`.
3. Replace the example styles/components with the real theme.
4. Keep the `build`, `test`, `lint`, `storybook`, and `build-storybook`
   scripts — they're what CI and the Eleventy site expect every package to
   have.
5. Write at least one Storybook story and one Jest test (component
   packages) before opening a PR.

The component tech (Web Components vs Preact/React vs CSS-only) is a
**per-package choice** — pick whichever fits that theme.

## Package conventions

Every package:

- Is named `@tkottke90/theme-<name>`.
- Has `main`/`module`/`types` fields pointing at its `dist/` output
  (component packages), or a plain `dist/index.css` (CSS-only packages).
- Extends the shared root configs instead of redefining them:
  - `tsconfig.json` extends `../../tsconfig.base.json`.
  - `jest.config.cjs` extends `../../jest.config.base.cjs`.
  - Lint and format rules come from the root `eslint.config.mjs` and
    `.prettierrc.json` — there is no per-package ESLint/Prettier config.
- Builds through `scripts/esbuild-base.mjs`'s `buildPackage()` helper rather
  than a bespoke esbuild setup, so every package produces the same
  ESM + CJS + type-declaration shape in `dist/`.
- Has its own `.storybook/` config and `*.stories.ts(x)` files — Storybook is
  per package, not a single root instance.

## Required checks before opening a PR

Run, from the repo root:

```
npm run lint
npm run format:check
npm run test --workspaces --if-present
npm run build --workspaces --if-present
```

And, for any package you touched:

```
npm run build-storybook -w <package-name>
```

These are the same checks CI runs (`Test`, `Lint`, `Style`, `Build Site`).
