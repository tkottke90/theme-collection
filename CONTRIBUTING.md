# Contributing

This repo is an npm-workspaces monorepo. Every theme is published as its own
package under the `@tkottke90/theme-*` scope, and shares the same root
tooling (TypeScript, ESLint, Prettier, Jest, esbuild).

## Repo layout

```
packages/      every published theme package (@tkottke90/theme-*)
themes/        shared design tokens per theme (themes/<name>/theme.css) —
               not an npm workspace, not published on its own; see below
shared/        internal code shared by packages, never published:
               wc-core/ (Web Component base classes, a private workspace) and
               storybook/ (the story-intro decorators)
apps/site      the Eleventy site that showcases the repo + each package's Storybook
scripts/       shared build helpers used by package build scripts
docs/adr/      architecture decision records
```

### `themes/` vs `packages/`

A theme's design tokens (colors, radius, font) live once, in
`themes/<name>/theme.css`, as a Tailwind v4 `@theme {}` block — nothing
else. Every package for that theme (CSS, Web Components, React) compiles
its own styling from that one file via `scripts/compile-theme.mjs`, rather
than each package hand-copying token values. See
`docs/adr/0001-theme-token-architecture.md` for why: token values had
already drifted out of sync across package types before this split
existed.

When a theme has more than one package (e.g. a CSS theme plus a matching
Web Components or React variant), name them `theme-<name>`,
`theme-<name>-wc`, `theme-<name>-react` — all three paired with the same
`themes/<name>/theme.css`. The three `theme-starter-*` packages are the
exception: they're generic reference templates, not a specific theme, so
they keep their current names and are paired with `themes/theme-starter/`.

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
6. Meet the package standard below. The starter already does, so keep its
   pieces and fill them in for your theme.

The component tech (Web Components vs Preact/React vs CSS-only) is a
**per-package choice** — pick whichever fits that theme.

Component styling is authored with Tailwind utility classes against the
theme's shared `themes/<name>/theme.css`, not bespoke per-component CSS or
inline-style objects — see `docs/adr/0001-theme-token-architecture.md`.
Web Components keep Shadow DOM and get their compiled styles embedded via
a generated `src/generated/theme-styles.ts` (see `theme-starter-wc`'s
`scripts/generate.mjs`); React ships a real `dist/theme.css`
consumers import separately (see `theme-starter-react`'s `scripts/build.mjs`).
A `:host { display: ...; }` rule (and, where a form control relies on
`font: inherit`, `font-family`) is the one piece of CSS Tailwind genuinely
can't express for Shadow DOM components — keep it as a small hand-written
`css` block alongside the generated styles, nothing more.

### Package standard

Every package ships the same documentation and Storybook shape, so the site,
the README galleries and agents building with a theme can rely on it. The
three starters meet it; copy them.

- [ ] **README.md** following the starter's template, linking
      `./docs/screenshot.png`.
- [ ] **AGENTS.md** following the starter's template: a style guide for
      agents (and people) building UI that matches the theme, plus usage.
      Listed in `package.json` `files` so it ships with the package.
- [ ] **An intro on every story.** Each stories file's `meta` sets
      `parameters.intro` (`tag`, `title`, and 1–2 paragraphs on how the
      component was designed). The package's `.storybook/preview` renders
      it with the shared decorator for its renderer from
      `shared/storybook/` (`intro-lit.ts`, `intro-preact.ts` or
      `intro-html.ts`), supplying only the theme's backdrop and text
      components.
- [ ] **A demo story**: a stories file titled `.../Demo`, with
      `intro: null`, composing a full page from only the package's own
      components, including a working form. It is what the README
      screenshot shows, so it should use every component.
- [ ] **Form-ready controls.** Inputs, selects and textareas submit under
      `name`, reset with their form, follow `<fieldset disabled>`, and get
      their accessible name from a label. Web Component packages get this
      from `FormControlElement` and `FieldElement` in `shared/wc-core`
      (copied into `src/generated/core/` by the package's
      `scripts/generate.mjs`; see `docs/adr/0002-shared-wc-core.md`) and
      name controls with `aria-label`. Preact and CSS packages use native
      elements and `<label for>`.
- [ ] **Web Component packages** export `./tokens.css` (the theme's tokens
      on `:root`, for consumers' own elements), written at build time by
      `scripts/generate-tokens-css.mjs`.

`npm run lint` runs `scripts/check-package-standard.mjs`, which fails when a
package lacks AGENTS.md (or omits it from `files`), lacks a screenshot linked
from its README, has no demo story, or has a stories `meta` without an
`intro`. Packages not yet migrated are listed in its `PENDING` set, each
tracked by an issue under #19; remove a package from that list when you
migrate it.

### Minimum component set

Every new theme package (regardless of tech) implements the same baseline
set of components before it's ready for review, so every
`@tkottke90/theme-*` package offers a consistent surface and shows off the
theme's styling across real UI patterns:

- [ ] **Button** — primary, secondary, ghost, and disabled variants
- [ ] **Input** — text, email, password, number, textarea, select, checkbox,
      and radio
- [ ] **Card**
- [ ] **Typography scale** — headings (a reasonable subset of h1-h6), body
      text, and caption text
- [ ] **Link**
- [ ] **Container** — a generic styled wrapper, used with `ol`/`ul`/`div` to
      express visual hierarchy
- [ ] **Item** — a generic styled child, used with `li` or other container
      children
- [ ] **Field** — binds a `label` to an `input`/`select` with consistent
      spacing/layout
- [ ] **Detail** — `<details>`/`<summary>`
- [ ] **Blockquote** — 10 color variants (info, tip, question, success,
      warning, failure, danger, bug, example, quote), each visually distinct
      by color
- [ ] **Skeleton** — standalone placeholder elements per typography level
      (e.g. `theme-skeleton-heading`, `theme-skeleton-text`), manually
      placed by the consumer — not an auto-detecting wrapper

Skipping an item requires a note in the PR description explaining why it
doesn't apply to that theme.

### Screenshots for style changes

Any PR that adds or changes a package's styles (new components, new
variants, token/color changes) must regenerate that package's component
screenshot and commit it:

```
npm run build-storybook -w <package-name>
npm run screenshot -w <package-name>
```

This renders the package's demo story (the stories file titled
`.../Demo`) headlessly (via [Playwright](https://playwright.dev)) at 1000px
wide and writes it to `packages/<package-name>/docs/screenshot.png`. The
demo composes every component into one page, so keep it up to date when you
add a component. Look at the PNG before committing it. Commit the updated PNG and
make sure it's linked from the package's `README.md` (see the starter
packages for the exact markdown). The screenshot script uses a headless
Chromium browser; run `npx playwright install chromium` once after
`npm install` if you haven't already. If your environment instead ships a
browser preinstalled at a fixed path (some sandboxes/CI images do this
rather than using Playwright's own managed install), point the script at
it with `SCREENSHOT_CHROMIUM_PATH=/path/to/chromium npm run screenshot -w
<package-name>` instead of running `playwright install`. In Claude Code's
cloud environment that's `SCREENSHOT_CHROMIUM_PATH=/opt/pw-browsers/chromium`:
the repo's pinned Playwright expects a browser build that isn't installed
there.

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
- A component package (WC or React) with styling depends on its theme's
  `themes/<name>/theme.css` through `scripts/compile-theme.mjs`, not a
  hand-copied token file — see "`themes/` vs `packages/`" above.

## Required checks before opening a PR

Run, from the repo root:

```
npm run lint
npm run typecheck
npm run format:check
npm run test --workspaces --if-present
npm run build --workspaces --if-present
```

And, for any package you touched:

```
npm run build-storybook -w <package-name>
```

`npm run typecheck` (`scripts/typecheck.mjs`) type-checks what package
builds skip: tests, stories, `.storybook/` config and `shared/`. Package
`tsconfig.json`s exclude those so they stay out of the published `.d.ts`
files.

These are the same checks CI runs (`Test`, `Lint` (which also runs
`typecheck`), `Style`, `Build Site`).
