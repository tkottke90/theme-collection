# 0001: Shared theme-token architecture via `themes/`

## Status

Accepted

## Context

Each `@tkottke90/theme-*` theme can ship as a plain-CSS package, a Web
Components (Lit) package, and/or a Preact/React package. Before this
change, each of those three package types hand-maintained its own copy of
the same design tokens, in three different shapes, with no shared source:

- `theme-starter-css`'s `src/index.css` defined tokens inline as a Tailwind
  v4 `@theme {}` block of CSS custom properties (`--color-brand-500`, ...).
- `theme-starter-wc`'s `src/tokens.ts` defined the same tokens as a Lit
  `css` tagged template of custom properties, but named without the
  `color-` prefix (`--brand-500`), and baked the result into every
  component's `static styles`.
- `theme-starter-react`'s `src/tokens.ts` defined the same tokens again as
  a plain JS object of hex strings, inlined directly into components'
  `style={{}}` props.

These had already drifted: `--tip-500` was `#0ea5a0` in the CSS package,
`#0d9488` in the WC package, and `#10b981` in the React package — the same
named token, three different colors, for the same theme. Each package type
also applied styling through a fundamentally different mechanism
(Tailwind-generated classes, Lit shadow-DOM `css` templates, inline hex
styles), so there was no single place to change a theme's look.

## Decision

- A new top-level `themes/` directory, sibling to `packages/` and **not**
  an npm workspace, holds one `theme.css` per theme — hand-authored only as
  a Tailwind v4 `@theme {}` block of custom-property declarations. No
  selectors, no component classes, no imports.
- `theme-starter-css` (and `theme-network-ops`) stop defining `@theme{}`
  inline; their `src/index.css` instead does
  `@import "tailwindcss"; @import "../../../themes/<name>/theme.css";`
  (in that order — Tailwind first keeps the token layer inside its
  `@layer theme`, verified by diffing compiled output before and after),
  then keeps every hand-written component class unchanged.
- `theme-starter-wc` and `theme-starter-react` both adopt Tailwind as their
  actual styling-authorship tool, not just a token format: every
  component's markup uses Tailwind utility classes directly, and the
  hand-written `css` blocks / `VARIANT_STYLES` inline-style objects are
  deleted. A new shared build helper, `scripts/compile-theme.mjs`, runs the
  Tailwind CLI against a theme's `theme.css` plus a package's own source
  (for Tailwind's utility-class content scan), since `@theme {}` is
  Tailwind-dialect syntax a plain browser or bundler can't interpret on its
  own.
  - **Web Components keep Shadow DOM** — every component uses `<slot>` for
    content projection, which only works inside Shadow DOM, so dropping it
    would mean rewriting content projection in every component for no
    benefit. Because a page-level stylesheet can't reach into a shadow
    root (only inherited custom properties cross that boundary), the
    compiled Tailwind output is generated as a TypeScript module
    (`src/generated/theme-styles.ts`, exporting `unsafeCSS(...)`) and
    consumed via `static styles`, rather than a raw `.css` import.
  - **React ships a real `dist/theme.css`**, exposed via a `"./theme.css"`
    `package.json` `exports` entry. Consumers do the standard two-import
    pattern (`import "@tkottke90/theme-starter-react"` for behavior,
    `import "@tkottke90/theme-starter-react/theme.css"` for styles —
    the same pattern Shoelace, MUI, and Bootstrap use), rather than an
    auto-injected `<style>` tag, which would be a hidden side effect on
    module import and would break under a strict CSP `style-src` policy.
- Tailwind fundamentally cannot style `:host` from inside a Shadow DOM
  component's own template (there's no element a utility class can attach
  to that represents the host from inside the shadow root). A small
  hand-written `css` block — `:host { display: ...; }`, and
  `font-family: var(--font-sans);` specifically where a form control
  relies on `font: inherit` to pick it up — is kept for exactly that,
  alongside the generated Tailwind styles. This is the one deliberate,
  bounded exception to "styling is Tailwind utilities, not hand-written
  CSS."
- Real themes that need more than one package type are named
  `theme-<name>`, `theme-<name>-wc`, `theme-<name>-react`, all paired with
  the same `themes/<name>/theme.css`. The `theme-starter-*` packages are
  generic reference templates, not a specific theme, so they keep their
  existing names.

## Consequences

- Every package touching a theme's styling now has two extra build-time
  dependencies: the theme's `themes/<name>/theme.css`, and the Tailwind
  CLI (added as a devDependency to `theme-starter-wc`/`theme-starter-react`,
  matching the existing per-package precedent rather than hoisting to the
  workspace root).
- `theme-starter-wc` gains a short, gitignored generated file
  (`src/generated/theme-styles.ts`) that must exist before `tsc`, esbuild,
  Jest, or Storybook's Vite dev server can resolve it — handled by a
  `generate-theme-styles` npm script wired into `build`, `pretest`,
  `prestorybook`, and `prebuild-storybook`.
- `theme-starter-react` needs no such hook: its components only ever use
  `className` strings, never import generated CSS from source, so neither
  its tests nor its build depend on build-time generation ordering the way
  WC's do. Its Storybook does need the full `npm run build` as a
  `prestorybook`/`prebuild-storybook` hook, since `dist/theme.css` is a
  real build artifact its preview imports.
- Future theme packages no longer hand-copy token values — they reference
  `themes/<name>/theme.css` through `scripts/compile-theme.mjs`, the same
  way `theme-starter-*` now does, which is what actually prevents the
  token-drift problem from recurring.
