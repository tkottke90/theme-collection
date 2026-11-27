# AGENTS.md — @tkottke90/theme-tactical-react

Guidance for AI agents (and people) who **use** this package, or who need to
build UI that matches it. It has two parts:

1. [Style guide](#1-style-guide): the design rules, so you can style elements
   this package doesn't include and have them belong.
2. [Package overview and usage](#2-package-overview-and-usage): what ships, and
   how to use it in Preact and in React.

If you are working on this package's source inside its monorepo, also follow
the repository's root `AGENTS.md` and `CONTRIBUTING.md`.

> **Keep Part 1 in step with `@tkottke90/theme-tactical-wc`.** Part 1 is the
> shared tactical style guide and is copied unchanged from that package's
> `AGENTS.md`. Change both files together, or neither.

---

## 1. Style guide

### The idea in one paragraph

A heads-up display. A near-black ground, thin cyan linework and glow, small
tracked capitals for labels, and monospace numerals for readouts. Surfaces are
dark glass panels with hairline borders and almost no corner radius; depth comes
from a cyan glow, never from a drop shadow. Cyan is the only accent. The theme is dark only.

### Rules

1. **One accent: cyan.** `--color-brand-500` marks actions, links, headings on
   panels, frame lines and focus. Use the brand scale (`-50` to `-900`) for
   other shades. Don't introduce a second accent.
2. **Flat, square-ish panels.** Surfaces use `--radius-theme` (2px) or
   `--radius-theme-sm` (1px) and a 1px `--color-border`. Larger panels are
   framed with an SVG outline (tab and chevron on Card/Stat, tab notch and
   corner brackets on Viewfinder), not a thicker border.
3. **Glow, not shadow.** Emphasis is `--shadow-glow` (a 1px cyan ring plus a
   soft cyan bloom) on the primary action and on meter fills. No black drop
   shadows, no gradients on surfaces.
4. **Ink.** Primary text is `--color-text`; secondary text and captions are
   `--color-text-muted`. Headings are primary ink. Panel titles and links are
   `--color-brand-500`. Ink on a solid cyan fill is `--color-neutral-900`.
5. **Labels are small capitals.** Labels, headings, buttons and panel titles are
   uppercase with letter-spacing (`tracking-wide` to `tracking-[0.2em]`);
   body copy is sentence case.
6. **Numbers are monospace.** Readouts and values (stat, gauge) use
   `--font-mono`; everything else uses `--font-sans`. Both are system stacks.
7. **Status colours only for status.** `--color-{info,tip,question,success,
warning,failure,danger,bug,example,quote}-500` belong to callouts and
   messages, never to decoration. A tinted panel is the status colour mixed
   into `--color-surface` at about 14%, with a 4px bar of the full colour on the
   left.
8. **Focus is visible.** Text fields draw a 2px `--color-brand-500` outline with
   a 1px offset. Buttons, checkboxes, radios and `<summary>` keep the browser's
   focus ring, which shows on both backgrounds. Never remove an outline without
   replacing it.
9. **Contrast is measured, not assumed.** See the table at the end of this
   part: every text pairing passes AA.

### Dark only

The theme has a single, dark look. There is no light mode and no `data-theme`
switch: it ignores `prefers-color-scheme`, so there is nothing to set per
element (Web Components) or per ancestor (React). Put the components on
`--color-bg`, and style your own elements with tokens, not hex values.

### Using the tokens

Load the tokens on your page (see [Part 2](#tokens-for-your-own-elements)) and
style your own elements with `var(--color-…)` and `var(--font-…)`. Never paste
the hex values; the token file is generated from the theme's single source.

Components declare the tokens inside their own shadow roots (Web Components) or
read them from the page (React). Overriding a token on `:root` restyles **your**
elements but, for Web Components, **not** the components. To restyle one, set
the token **on the element**: `theme-button { --color-brand-500: … }`.

### Recipes

A status chip in the theme (uses tokens only):

```css
.chip {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border: 1px solid var(--color-brand-500);
  border-radius: var(--radius-theme);
  color: var(--color-brand-500);
  font: 600 0.75rem/1.4 var(--font-sans);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
```

A monospace readout line:

```css
.readout {
  color: var(--color-brand-500);
  font: 1.5rem/1 var(--font-mono);
}
```

### Do and don't

- **Do** use `theme-field` (or a `<label>`) for every form control.
- **Do** keep panel titles short and uppercase; they are labels, not sentences.
- **Don't** rely on colour alone for meaning; pair a status colour with its label.
- **Don't** add rounded "pill" shapes, soft shadows or gradients.

### Contrast (measured)

Measured in Chromium from the resolved colours on the surface each ink sits on
(WCAG 2.x; text needs 4.5:1, large text and UI parts 3:1). Re-measure if the
tokens change.

| Pairing                                           | Ratio              | AA        |
| ------------------------------------------------- | ------------------ | --------- |
| `text` on `bg` / `surface` / `surface-alt`        | 17.7 / 16.7 / 15.3 | pass      |
| `text-muted` on `bg` / `surface-alt`              | 5.29 / 4.58        | pass      |
| Placeholder (`text-muted`) on a field's fill      | 4.58               | pass      |
| `brand-500` on `bg` (links, headings)             | 11.06              | pass      |
| `brand-500` on `surface-alt` (detail summary)     | 9.58               | pass      |
| Link hover `brand-600` on `bg`                    | 6.85               | pass      |
| Primary button: `neutral-900` on `brand-500`      | 10.60              | pass      |
| Primary button hover: on `brand-600`              | 6.56               | pass      |
| Secondary/ghost hover: `brand-500` on `brand-900` | 7.28               | pass      |
| Callout label on its tint (10 types)              | 4.55–8.66          | pass      |
| Callout body text on its tint                     | 12.7–14.8          | pass      |
| Disabled button text on its fill (exempt)         | 2.38               | n/a       |
| Field border on its fill (UI part, needs 3)       | **1.36**           | **fails** |

Known failures, not fixed here because changing tokens is a separate decision:

- **Field borders.** The 1px `--color-border` is under 3:1 against the field
  fill. The field is still identifiable by its fill and the 2px
  focus ring, but the resting edge is faint.
- **Disabled controls** are dimmed (60% opacity on a `surface-alt` fill with a
  `border` outline, a visible change from every enabled variant) and are exempt
  from the contrast minimum.

---

## 2. Package overview and usage

### What it is

`@tkottke90/theme-tactical-react` is a library of **Preact function
components**. They render plain DOM (no Shadow DOM) styled by one stylesheet.

- ESM (`dist/index.mjs`) and CommonJS (`dist/index.cjs`) builds, with types.
- **`preact` is a peer dependency** (`^10.24.0`) and is not bundled.
- `@tkottke90/theme-tactical-react/theme.css` is **required**: it carries the
  component styles and the design tokens.
- **`theme.css` includes Tailwind's base reset, and it applies to the whole
  page**, not only to these components: `h1`–`h6` inherit their size and
  weight, `ol`/`ul` lose their markers (`ThemeContainer as="ol"` brings its numbers back), and `button`, `input`, `select` and
  `textarea` become transparent and inherit font and colour. Style your own
  elements with that in mind (use the tokens, set the sizes you want).
- It does **not** style `body`. Put the page on the tactical ground yourself:
  `body { background: var(--color-bg); color: var(--color-text); }`.
- **No fonts to load**: the theme uses system sans and monospace stacks only.
- **Dark only:** no light mode and no `data-theme` to set.

### Components

| Component                                   | What it is                    | Props                                                                                                              |
| ------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `ThemeButton`                               | Button                        | `label`, `variant` (`primary`, `secondary`, `ghost`), `type` (`button`, `submit`, `reset`), `disabled`, `onClick`  |
| `ThemeCard`                                 | Framed content panel          | `heading`; children                                                                                                |
| `ThemeViewfinder`                           | Panel with a viewfinder frame | `heading`; children                                                                                                |
| `ThemeStat`                                 | Large numeric readout         | `label`, `value`, `unit`                                                                                           |
| `ThemeProgress`                             | Segmented bar meter           | `label`, `value`, `max` (default 100)                                                                              |
| `ThemeGauge`                                | Radial gauge                  | `label`, `value`, `max` (default 100)                                                                              |
| `ThemeContainer`                            | Bordered wrapper              | `as` (`div`, `ul`, `ol`; an `ol` shows its numbers); children                                                      |
| `ThemeItem`                                 | Row in a container            | `as` (`li`, `div`); children                                                                                       |
| `ThemeDetail`                               | Collapsible section           | `summary`; children                                                                                                |
| `ThemeBlockquote`                           | Labelled callout              | `type` (`info`, `tip`, `question`, `success`, `warning`, `failure`, `danger`, `bug`, `example`, `quote`); children |
| `ThemeHeading`                              | Heading                       | `level` (1–4); children                                                                                            |
| `ThemeText`                                 | Body copy or caption          | `variant` (`body`, `caption`); children                                                                            |
| `ThemeLink`                                 | Link                          | `href`, `onClick`; children                                                                                        |
| `ThemeField`                                | Label above a control         | `label`, `htmlFor` (optional); the control as children                                                             |
| `ThemeInput`                                | Form control                  | `type` (`text`, `email`, `password`, `number`, `checkbox`, `radio`) + all native input props                       |
| `ThemeSelect`                               | Form control                  | all native select props, `defaultValue`; `<option>` children                                                       |
| `ThemeTextarea`                             | Form control                  | all native textarea props (`rows` defaults to 4)                                                                   |
| `ThemeSkeletonHeading`, `ThemeSkeletonText` | Loading placeholders          | `width`                                                                                                            |

`ThemeCard`, `ThemeStat` and `ThemeViewfinder` redraw their SVG frame to fit
their size, so give them room (a grid cell or block width) rather than a fixed
height. Put a `ThemeStat`, `ThemeProgress` or `ThemeGauge` inside a
`ThemeCard` for a titled telemetry panel. `ThemeProgress` and `ThemeGauge`
expose `role="progressbar"` and `role="meter"`, named by their `label`.

**Forms.** The controls render native elements and forward every native prop,
so they behave exactly like `<input>`, `<select>` and `<textarea>`: they
submit under `name`, reset with the form (to `defaultValue` /
`defaultChecked`), follow `<fieldset disabled>`, and work controlled or
uncontrolled. There is nothing to register or upgrade. `ThemeField` links its
label with `<label for>`, using the child's `id` or a generated one, so
clicking the label focuses the control and the label is its accessible name;
around several controls (such as radios) it renders a `role="group"` named by
the label. A wrapping `<label>` also works for checkboxes and radios. Give a
lone control without a field an `aria-label`.

### Preact

```bash
npm install @tkottke90/theme-tactical-react preact
```

```tsx
import { ThemeButton, ThemeField, ThemeInput } from "@tkottke90/theme-tactical-react";
import "@tkottke90/theme-tactical-react/theme.css";
import { useState } from "preact/hooks";

export function Callsign() {
  const [name, setName] = useState("Raven 2-1");
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <ThemeField label="Callsign">
        <ThemeInput name="callsign" value={name} onInput={(e) => setName(e.currentTarget.value)} />
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

The props types are exported (`ThemeInputProps`, `ThemeButtonProps`, …), so
there is nothing to declare for TypeScript.

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

`ThemeInput`, `ThemeSelect`, `ThemeTextarea` and `ThemeButton` forward a `ref`
to their native element (via `forwardRef` from `preact/compat`, which ships
inside `preact`), so ref-based form libraries work.

### Tokens for your own elements

`theme.css` defines every design token as a CSS custom property on `:root`
(inside `@layer theme`), whether or not a component uses it, so style your own
elements with `var(--color-…)`, `var(--font-sans)` and `var(--radius-theme)`.
The groups are the ones in Part 1:

- Colours: `--color-bg`, `--color-surface`, `--color-surface-alt`,
  `--color-border`, `--color-frame-inner`, the brand scale
  `--color-brand-{50,100,500,600,900}`, the neutral scale
  `--color-neutral-{50,100,300,500,900}`, the status set
  `--color-{info,tip,question,success,warning,failure,danger,bug,example,quote}-500`,
  `--color-text`, `--color-text-muted`, and the skeleton pair
  (`--color-skeleton-base`, `--color-skeleton-highlight`).
- Fonts: `--font-sans`, `--font-mono`.
- Shape and light: `--radius-theme`, `--radius-theme-sm`, `--shadow-glow`.

Never paste the hex values; they come from `themes/tactical/theme.css` in the
monorepo. Tailwind's own variables (spacing, type scale, `--tw-*`) are in the
file too; don't rely on them.

```css
.my-panel {
  padding: 1rem 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-theme);
  background: var(--color-surface-alt);
  box-shadow: var(--shadow-glow);
  color: var(--color-text);
}
```
