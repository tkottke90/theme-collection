# AGENTS.md — @tkottke90/theme-starter-react

Guidance for AI agents (and people) who **use** this package, or who need to
build UI that matches it. It has two parts:

1. [Style guide](#1-style-guide): the design rules, so you can style elements
   this package doesn't include and have them belong.
2. [Package overview and usage](#2-package-overview-and-usage): what ships, and
   how to use it in Preact and React (via `preact/compat`).

If you are working on this package's source inside its monorepo, also follow
the repository's root `AGENTS.md` and `CONTRIBUTING.md`.

> **Copying the starter?** This file ships with the package (it is in
> `files`), so write it for someone using your theme who can't see the source.
> Keep both parts and their order. Each section below has a note saying what it
> must contain; replace the starter's content and delete the notes.

---

## 1. Style guide

### The idea in one paragraph

A neutral, light-on-white starting point: a near-white page, white controls
with a hairline border, one indigo brand colour for actions and focus, and a
single corner radius on everything. It is meant to be easy to read and easy to
replace, not to have a strong personality.

> **Copying the starter?** One paragraph on the theme's concept: the world or
> material it evokes, and the two or three ideas everything else follows from.

### Rules

1. **One accent.** `--color-brand-500` is for actions, links and focus rings.
   Tints (`--color-brand-50`, `-100`) are for quiet surfaces such as cards and
   secondary buttons; `--color-brand-900` is ink on those tints.
2. **One radius.** Every surface and control uses `--radius-theme` (0.5rem).
3. **Surfaces and ink.**

   | Surface   | Fill                                               | Ink                                                   |
   | --------- | -------------------------------------------------- | ----------------------------------------------------- |
   | Page      | `--color-neutral-50`                               | `--color-neutral-900`, muted `--color-neutral-500`    |
   | Card      | `--color-brand-50`, border `--color-brand-100`     | `--color-brand-900`                                   |
   | Container | `--color-neutral-50`, border `--color-neutral-100` | `--color-neutral-900`                                 |
   | Control   | white, border `--color-neutral-300`                | `--color-neutral-900`; disabled `--color-neutral-100` |

4. **Focus is a 2px `--color-brand-500` outline**, offset 1px, on every
   interactive element.
5. **Semantic colour never stands alone.** Callouts use
   `--color-<type>-500` (info, tip, question, success, warning, failure,
   danger, bug, example, quote) as a rule and a wash, always with a text label.
6. **Typography.** `--font-sans` (Inter, falling back to the system UI face)
   for everything. Headings are bold, stepping down from 2.25rem (level 1) to
   1.25rem (level 4); body is 1rem; captions are 0.75rem in the muted ink.
7. **Motion.** Only the skeleton shimmer moves, and it stops under
   `prefers-reduced-motion`.

> **Copying the starter?** Write your theme's rules as numbered, checkable
> statements: light and depth, shape and corners, the surface/ink table,
> what the accent colour may and may not be used for, typography per role,
> motion, and contrast (which pairs were checked for WCAG AA). Name tokens,
> never raw values.

### Using the tokens

`theme.css` defines the tokens as CSS custom properties, so style your own
elements with `var(--color-…)`, `var(--font-sans)` and `var(--radius-theme)`.
Never paste hex values: they come from `themes/theme-starter/theme.css` in the
monorepo. Only the tokens the components use are emitted; check `theme.css` if
a variable seems to be missing.

```css
.my-panel {
  padding: 1rem 1.25rem;
  border: 1px solid var(--color-neutral-100);
  border-radius: var(--radius-theme);
  background: var(--color-neutral-50);
  color: var(--color-neutral-900);
}
```

> **Copying the starter?** Explain how to restyle a component (which tokens or
> custom properties it reads), and give a recipe or two for common elements
> the package doesn't ship (a panel, a badge, a table).

---

## 2. Package overview and usage

### What it is

`@tkottke90/theme-starter-react` is a library of **Preact function
components**. They render plain DOM (no Shadow DOM) styled by one stylesheet.

- ESM (`dist/index.mjs`) and CommonJS (`dist/index.cjs`) builds, with types.
- **`preact` is a peer dependency** (`^10.24.0`) and is not bundled.
- `@tkottke90/theme-starter-react/theme.css` is **required**: it carries the
  component styles and the tokens.
- Designed for a light page (`--color-neutral-50`).

### Components

| Component                                   | What it is            | Props                                                                                        |
| ------------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------- |
| `ThemeButton`                               | Button                | `label`, `variant` (`primary`, `secondary`, `ghost`), `type`, `disabled`, `onClick`          |
| `ThemeCard`                                 | Featured panel        | `heading`; children                                                                          |
| `ThemeContainer`                            | Grouping panel        | `as` (`div`, `ul`, `ol`); children                                                           |
| `ThemeItem`                                 | Row in a container    | `as` (`li`, `div`); children                                                                 |
| `ThemeDetail`                               | Collapsible section   | `summary`; children                                                                          |
| `ThemeBlockquote`                           | Labelled callout      | `type` (the ten semantic types); children                                                    |
| `ThemeHeading`                              | Heading               | `level` (1–4); children                                                                      |
| `ThemeText`                                 | Body copy or caption  | `variant` (`body`, `caption`); children                                                      |
| `ThemeLink`                                 | Link                  | `href`, `onClick`; children                                                                  |
| `ThemeField`                                | Label above a control | `label`, `htmlFor` (optional); the control as children                                       |
| `ThemeInput`                                | Form control          | `type` (`text`, `email`, `password`, `number`, `checkbox`, `radio`) + all native input props |
| `ThemeSelect`                               | Form control          | all native select props, `defaultValue`; `<option>` children                                 |
| `ThemeTextarea`                             | Form control          | all native textarea props (`rows` defaults to 4)                                             |
| `ThemeSkeletonHeading`, `ThemeSkeletonText` | Loading placeholders  | `width`                                                                                      |

**Forms.** The controls render native elements and forward every native prop,
so they behave exactly like `<input>`, `<select>` and `<textarea>`: they
submit under `name`, reset with the form (to `defaultValue` /
`defaultChecked`), follow `<fieldset disabled>`, and work controlled or
uncontrolled. `ThemeField` links its label with `<label for>`, using the
child's `id` or a generated one; around several controls it renders a labelled
`role="group"`. A wrapping `<label>` also works for checkboxes and radios.

> **Copying the starter?** Keep this table in step with `src/index.ts`, and
> add rows for theme-specific components with their pairing rules.

### Preact

```bash
npm install @tkottke90/theme-starter-react preact
```

```tsx
import { ThemeButton, ThemeField, ThemeInput } from "@tkottke90/theme-starter-react";
import "@tkottke90/theme-starter-react/theme.css";
import { useState } from "preact/hooks";

export function Rename() {
  const [name, setName] = useState("Ada");
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <ThemeField label="Name">
        <ThemeInput name="name" value={name} onInput={(e) => setName(e.currentTarget.value)} />
      </ThemeField>
      <ThemeButton type="submit" label="Save" />
    </form>
  );
}
```

This package imports `preact/compat` (for `forwardRef`, so a `ref` reaches each
control's native element). Importing compat installs it for the whole app: text
inputs' `onChange` then fires on every keystroke, as in React, everywhere in
your Preact tree, not just in these components. `onInput` works either way.

### React (via `preact/compat`)

Alias React to Preact's compat layer in your bundler, then use the components
as React components:

```js
// vite.config.js
export default {
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
};
```

`ThemeInput`,
`ThemeSelect`, `ThemeTextarea` and `ThemeButton` forward a `ref` to their
native element (via `forwardRef` from `preact/compat`, which ships inside
`preact`), so ref-based form libraries work.

> **Copying the starter?** If the theme needs fonts or other page setup, add
> it to both examples.
