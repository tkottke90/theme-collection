# AGENTS.md — @tkottke90/theme-tactical-wc

Guidance for AI agents (and people) who **use** this package, or who need to
build UI that matches it. It has two parts:

1. [Style guide](#1-style-guide): the design rules, so you can style elements
   this package doesn't include and have them belong.
2. [Package overview and usage](#2-package-overview-and-usage): what ships, and
   how to use it in a vanilla project and in Preact.

If you are working on this package's source inside its monorepo, also follow
the repository's root `AGENTS.md` and `CONTRIBUTING.md`.

> **Keep Part 1 in step with `@tkottke90/theme-tactical-react`.** Part 1 is the
> shared tactical style guide and is copied unchanged into that package's
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

`@tkottke90/theme-tactical-wc` is a library of **framework-agnostic Web
Components** built with [Lit](https://lit.dev). Each component is a custom
element with its own Shadow DOM and styles, so it works in plain HTML, Preact,
or any framework that renders DOM.

- Importing the package **registers every `theme-*` element** as a side effect.
- ESM (`dist/index.mjs`) and CommonJS (`dist/index.cjs`) builds, with types.
- **`lit` is a peer dependency** (`^3.2.0`) and is not bundled: install it
  alongside, and make sure your toolchain or import map can resolve `lit`.
- `@tkottke90/theme-tactical-wc/tokens.css` exports the design tokens as plain
  `:root` custom properties, for styling your own elements.
- Designed for the tactical page background, `--color-bg`: near-black.
- **No fonts to load**: the theme uses system sans and monospace stacks only.
- **Dark only:** no light mode and no `data-theme` to set.

### Components

| Tag                                             | What it is                    | Attributes / properties                                                                                                                |
| ----------------------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `theme-button`                                  | Button                        | `label`, `variant` (`primary`, `secondary`, `ghost`), `disabled`, `type` (`button`, `submit`, `reset`), `aria-label`; or slot the text |
| `theme-card`                                    | Framed content panel          | `heading`; slot content                                                                                                                |
| `theme-viewfinder`                              | Panel with a viewfinder frame | `heading`; slot content                                                                                                                |
| `theme-stat`                                    | Large numeric readout         | `label`, `value`, `unit`                                                                                                               |
| `theme-progress`                                | Segmented bar meter           | `label`, `value`, `max`                                                                                                                |
| `theme-gauge`                                   | Radial gauge                  | `label`, `value`, `max`                                                                                                                |
| `theme-container`                               | Neutral wrapper               | `as` (`div`, `ol`, `ul`)                                                                                                               |
| `theme-item`                                    | List row                      | `as` (`li`, `div`)                                                                                                                     |
| `theme-detail`                                  | Collapsible section           | `summary`; slot content                                                                                                                |
| `theme-blockquote`                              | Callout                       | `type` (`info`, `tip`, `question`, `success`, `warning`, `failure`, `danger`, `bug`, `example`, `quote`)                               |
| `theme-heading`                                 | Heading                       | `level` (1–4)                                                                                                                          |
| `theme-text`                                    | Body copy or caption          | `variant` (`body`, `caption`)                                                                                                          |
| `theme-link`                                    | Link                          | `href`                                                                                                                                 |
| `theme-field`                                   | Label above a control         | `label`, `for`; slot the control                                                                                                       |
| `theme-input`                                   | Form control                  | `type` (`text`, `email`, `password`, `number`, `checkbox`, `radio`), `name`, `value`, `placeholder`, `checked`, `disabled`             |
| `theme-select`                                  | Form control                  | `name`, `value`, `disabled`; `<option>` children                                                                                       |
| `theme-textarea`                                | Form control                  | `name`, `value`, `placeholder`, `rows`, `disabled`                                                                                     |
| `theme-skeleton-heading`, `theme-skeleton-text` | Loading placeholders          | `width`                                                                                                                                |

`theme-card`, `theme-stat` and `theme-viewfinder` redraw their SVG frame to
fit their size, so give them room (a grid cell or block width) rather than a
fixed height. Put a `theme-stat`, `theme-progress` or `theme-gauge` inside a
`theme-card` for a titled telemetry panel.

Form controls are **form-associated**: inside a `<form>` they submit under
their `name`, reset with the form, follow `<fieldset disabled>`, fire `change`
from the element, and work with `<label for>` or a wrapping `<label>`. Radios
group by `name`. Each control forwards its accessible name (its `aria-label`,
else its `<label>`'s text) to the native element inside it; `theme-field`
names the control it wraps with its label; wrapping radios in an element, it
names that element as a `radiogroup`, so each radio keeps its own label.
`theme-progress` and `theme-gauge` expose `role="progressbar"` and
`role="meter"`, named by their `label`.

### Vanilla (with a bundler)

```bash
npm install @tkottke90/theme-tactical-wc lit
```

```js
// main.js — once, at your entry point
import "@tkottke90/theme-tactical-wc"; // registers the elements
import "@tkottke90/theme-tactical-wc/tokens.css"; // tokens for your own CSS
```

```html
<body style="background: var(--color-bg); color: var(--color-text)">
  <form id="contact">
    <theme-field label="Email">
      <theme-input name="email" type="email"></theme-input>
    </theme-field>
    <label><theme-input type="checkbox" name="news" value="yes"></theme-input> Newsletter</label>
    <theme-button type="submit" label="Send"></theme-button>
  </form>
</body>
```

Set non-string values as **properties** from script, and listen for events on
the element:

```js
document.querySelector("theme-input[name=email]").addEventListener("change", (e) => {
  console.log(e.target.value);
});
```

### Vanilla (no bundler)

Browsers need an import map to resolve `lit` and the packages Lit imports
internally. All seven entries are required:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@tkottke90/theme-tactical-wc/dist/tokens.css"
/>
<script type="importmap">
  {
    "imports": {
      "lit": "https://cdn.jsdelivr.net/npm/lit@3/index.js",
      "lit/": "https://cdn.jsdelivr.net/npm/lit@3/",
      "lit-html": "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js",
      "lit-html/": "https://cdn.jsdelivr.net/npm/lit-html@3/",
      "lit-element/": "https://cdn.jsdelivr.net/npm/lit-element@4/",
      "@lit/reactive-element": "https://cdn.jsdelivr.net/npm/@lit/reactive-element@2/reactive-element.js",
      "@lit/reactive-element/": "https://cdn.jsdelivr.net/npm/@lit/reactive-element@2/"
    }
  }
</script>
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@tkottke90/theme-tactical-wc/dist/index.mjs"
></script>
```

### Preact

Import once at your entry point, then use the tags directly in JSX. Preact
sets them as **properties**, so `checked={true}` and `rows={3}` arrive typed,
`onChange` receives the element's `change` event, and a native `<form>`
collects the controls' values on submit. Don't name your own attribute `on…`:
Preact treats it as an event listener.

```jsx
import "@tkottke90/theme-tactical-wc";
import "@tkottke90/theme-tactical-wc/tokens.css";

export function Contact() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log([...new FormData(e.currentTarget)]);
      }}
    >
      <theme-field label="Email">
        <theme-input name="email" type="email" onChange={(e) => console.log(e.target.value)} />
      </theme-field>
      <theme-button type="submit" label="Send" />
    </form>
  );
}
```

**TypeScript.** Declare the custom tags once (for example in
`src/theme-tactical-wc.d.ts`):

```ts
import type { ThemeButton, ThemeInput } from "@tkottke90/theme-tactical-wc";

type ThemeProps<T> = preact.JSX.HTMLAttributes<HTMLElement> &
  Partial<Omit<T, keyof HTMLElement>> & { style?: preact.JSX.CSSProperties | string };

declare module "preact" {
  namespace JSX {
    interface IntrinsicElements {
      "theme-button": ThemeProps<ThemeButton>;
      "theme-input": ThemeProps<ThemeInput>;
      // …add the other theme-* tags you use the same way
    }
  }
}
```

### Tokens for your own elements

`@tkottke90/theme-tactical-wc/tokens.css` defines every design token on
`:root`. It contains tokens only, no resets or utility classes, so
it is safe to load on any page. The groups:

- Colours: `--color-bg`, `--color-surface`, `--color-surface-alt`,
  `--color-border`, `--color-frame-inner`, the brand scale `--color-brand-{50,100,500,600,900}`,
  the neutral scale `--color-neutral-{50,100,300,500,900}`, the status set
  `--color-{info,tip,question,success,warning,failure,danger,bug,example,quote}-500`,
  `--color-text`, `--color-text-muted`, and the skeleton pair.
- Fonts: `--font-sans`, `--font-mono`.
- Shape and light: `--radius-theme`, `--radius-theme-sm`, `--shadow-glow`.
