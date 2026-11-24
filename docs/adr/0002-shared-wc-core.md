# 0002: Shared Web Component base classes via `shared/wc-core`

## Status

Accepted

## Context

Until now every `@tkottke90/theme-*` package was independent: apart from
build tooling in `scripts/` and tokens in `themes/`, it owned all of its
own source. That held while each package's components were small and
mostly presentational.

`theme-zero-dawn` introduced behaviour that isn't presentational at all:

- `FormControlElement`, a form-associated base for Input, Select and
  Textarea (form submission, reset, `<fieldset disabled>`, label
  association, accessible-name forwarding into the shadow root).
- The `theme-field` linking logic: naming the slotted control with the
  field's label and making the label click focus or toggle it.

Every Web Component package needs exactly this behaviour (issue #19), and
none of it varies by theme. Copying it into each package would repeat the
token drift ADR 0001 fixed, this time with accessibility and form bugs.

The five older WC packages also name controls through a custom
`accessible-label` attribute, while zero-dawn reads the host's standard
`aria-label` and falls back to associated `<label>`s via
`ElementInternals.labels`. One API has to win.

## Decision

1. **Shared source lives in `shared/wc-core`.** It's an internal, private
   npm workspace (`@tkottke90/theme-wc-core`) holding `FormControlElement`
   (`form-control.ts`), `FieldElement` (`field.ts`) and their Jest suites.
   It sits outside `packages/` so the Eleventy site, the screenshot script
   and the package-standard check, which all enumerate `packages/*`, never
   see it. It is never published.

2. **Packages get a build-time copy, not a dependency.** Each WC package's
   generate step (`scripts/generate.mjs`) calls `syncWcCore()` from
   `scripts/wc-core.mjs`, which copies the non-test sources into the
   package's gitignored `src/generated/core/` with a do-not-edit header.
   Components import from `./generated/core/*.js`.

   An import of `@tkottke90/theme-wc-core` would bundle fine with esbuild,
   but tsc would then emit declarations such as
   `import { FormControlElement } from "@tkottke90/theme-wc-core"` into
   the published `dist/*.d.ts`, pointing consumers at a package that
   doesn't exist on npm. A copy inside the package's own `src` keeps the
   bundle and the declarations self-contained without adding a
   declaration-bundling tool.

3. **The accessible-name API is `aria-label`.** Controls read the host's
   `aria-label`, else the text of their associated `<label>`s, and forward
   the result to the inner native element. `FieldElement` sets
   `aria-label` on the control it labels. The `accessible-label` attribute
   is retired for form controls as each package migrates. `theme-button`
   is not a form control and keeps its existing `accessible-label` until
   it gets its own decision.

## Consequences

- The shared code is tested once, in `shared/wc-core`; each package keeps
  tests for its own controls' rendering and behaviour.
- Changing `shared/wc-core` changes every WC package on its next build.
  Run the whole workspace's tests, not just the core's.
- `src/generated/core/` must be gitignored in every WC package, like
  `src/generated/theme-styles.ts` already is.
- The packages are no longer fully independent: a WC package can't be
  built outside this repo without `shared/wc-core`. That was already true
  of `scripts/` and `themes/`.
- Consumers who named controls with `accessible-label` need to switch to
  `aria-label` when their package migrates. Each per-package migration
  notes this in its README.
