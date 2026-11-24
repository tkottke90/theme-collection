# AGENTS.md — @tkottke90/theme-pixel-quest

Guidance for AI agents (and people) who **use** this package, or who need to
build UI that matches it. It has two parts:

1. [Style guide](#1-style-guide): the design rules, so you can style elements
   this package doesn't include and have them belong.
2. [Package overview and usage](#2-package-overview-and-usage): what ships, and
   how to use it in a vanilla project and in Preact.

If you are working on this package's source inside its monorepo, also follow
the repository's root `AGENTS.md` and `CONTRIBUTING.md`.

---

## 1. Style guide

### The idea in one paragraph

A pixel-art RPG character sheet printed on a poster. The page is warm
**parchment**; content sits in boxes **inked in near-black with
pixel-stepped round corners**, as if drawn on a low-resolution grid; the
important things (titles, primary actions) are **dark forest-green badges
ringed in gold**; and the sheet's signature widget is a **stat meter**: icon,
label, a short progress bar and a `value/max` readout. Type comes in three
voices: a pixel bitmap face for banners, a slab typewriter face for labels,
and a plain sans for everything you read.

### Rule 1: four kinds of surface

| Surface   | Use for                                    | Fill                                | Edge                                                                         |
| --------- | ------------------------------------------ | ----------------------------------- | ---------------------------------------------------------------------------- |
| **Page**  | Behind everything                          | `--color-bg` (parchment)            | none, or `theme-page-frame` around the whole sheet                           |
| **Panel** | Cards, containers, callouts, disclosures   | `--color-bg`, same as the page      | 2px `--color-panel-border`, pixel-stepped corners (24px radius)              |
| **Well**  | Anything you type or choose into           | `--color-bg-alt` (darker parchment) | 2px `--color-panel-border`, pixel-stepped corners (16px radius)              |
| **Badge** | Banner headings, primary buttons, one-offs | `--color-panel` (forest green)      | 2px `--color-panel-border`, then a 3px gold `--color-panel-border-gold` ring |

Panels are **not raised**: they share the page's fill and are told apart only
by their inked outline, like boxes printed on the same sheet. Don't give a
panel its own background colour or a drop shadow. A well is the one surface
that's darker than the page, so fields read as recessed.

Status callouts keep the panel outline and add a **4px left rule** in the
status colour. Change the rule's colour, never the outline's.

### Rule 2: corners are rasterised circles

- **Every framed shape rounds its corners as pixel art does**: a circle
  rasterised on a grid, with long shallow steps near the straight edges and
  short tight steps near the 45° point. Not a CSS `border-radius`, and not a
  uniform staircase (equal steps read as a diagonal cut, not a curve).
- Sizes in use: panels and banner badges round to 24px on a 2px grid; wells
  to 16px on a 1px grid; buttons to 6px on a 1px grid; the stat meter's 10px
  bar to 2px on a 1px grid. Outlines are 2px everywhere except the stat bar
  (1px). Scale the radius with the element, as you would a border-radius.
- `clip-path` removes a CSS border, so draw the outline as a layer **under**
  the fill: the border colour clipped to the outer shape, then the fill clipped
  to the same shape inset by the border width. Because the steps are
  axis-aligned, insetting needs no correction (see the recipe below).
- **Straight, square edges** are reserved for the page itself
  (`theme-page-frame`) and for skeleton bars (`--radius-theme` is `0px`).

### Rule 3: the badge is the emphasis

The badge (forest-green fill, cream `--color-panel-text` ink, gold ring inside
a near-black edge) is the theme's only strong emphasis. Use it for:

- the page title and section titles (`theme-heading banner`), in Pixelify Sans;
- the primary action (`theme-button`, the default variant), in Courier Prime.

Everything else is ink on parchment. **Secondary** actions keep the outline
but drop the fill (green text on parchment); **ghost** actions drop the outline
too. **Disabled** turns the badge into parchment with muted ink. Hover only
brightens a little (`filter: brightness(1.08)`); there's no press animation.

One or two badges per screen region. A page where everything is a badge has no
emphasis left.

### Rule 4: colour

| Colour                                             | Means                                  | Where                                                           |
| -------------------------------------------------- | -------------------------------------- | --------------------------------------------------------------- |
| `--color-bg` / `--color-bg-alt`                    | Page and panels / wells                | everywhere                                                      |
| `--color-panel-border`                             | Ink outline                            | every frame's edge                                              |
| `--color-panel` + `--color-panel-text`             | Emphasis                               | badge fill and its cream ink                                    |
| `--color-panel-border-gold`                        | Trim                                   | the ring inside a badge, the page frame's pinstripe; never text |
| `--color-brand-600`                                | Interactive                            | links, secondary/ghost button text, focus ring, checkbox accent |
| `--color-progress-fill` / `--color-progress-track` | A stat's value / its remaining range   | stat meter bars                                                 |
| `--color-text` / `--color-text-muted`              | Content / secondary content and labels | everywhere                                                      |
| `--color-border`                                   | Hairline dividers                      | rules between list items                                        |

- Status callouts use the ten `--color-<type>-500` tokens. They're
  deliberately **earthy and desaturated** (slate, moss, plum, ochre, brick) so
  they sit on parchment like old print. Keep any status colour you add in that
  register, and always pair it with a word.
- Don't add a bright or saturated accent. The palette is ink, parchment,
  forest green and gold; nothing glows.

### Rule 5: typography

| Role                     | Font                           | Treatment                                                            |
| ------------------------ | ------------------------------ | -------------------------------------------------------------------- |
| Banner heading           | Pixelify Sans (`--font-pixel`) | 700, cream on a badge; h1–h4 sizes as below                          |
| h1–h4                    | Courier Prime (`--font-slab`)  | 700, `--color-text`; 2.25 / 1.75 / 1.375 / 1.125rem, line height 1.2 |
| Card titles              | Courier Prime                  | 700, 1.125rem (the h4 step)                                          |
| Disclosure summaries     | Courier Prime                  | 700, body size                                                       |
| Buttons                  | Courier Prime                  | 700                                                                  |
| Stat labels and readouts | Courier Prime                  | 700; readouts use tabular numerals                                   |
| Field labels             | Inter (`--font-sans`)          | 600, `--color-text-muted`                                            |
| Body, inputs             | Inter                          | 400, `--color-text`                                                  |
| Caption, stat sublabels  | Inter                          | 0.8125rem, `--color-text-muted`                                      |

Pixelify Sans is for big titles only; at body size a bitmap face is hard to
read. Courier Prime means "this names something" (a stat, a panel, an action).
Inter means "this is content".

### Rule 6: focus

Every focusable element shows a **2px `--color-brand-600` outline** on
keyboard focus: offset 1px on wells (input, select, textarea), 2px on buttons,
links and disclosure summaries. Give your own controls the same outline; never
remove a focus ring or swap it for a colour change.
Links keep their underline at all times: colour alone wouldn't separate them
from body text.

### Rule 7: contrast, measured

Measured in Chromium from the resolved tokens (WCAG ratios), on the surface
each ink actually sits on:

| Ink                                                | On                       | Ratio     |
| -------------------------------------------------- | ------------------------ | --------- |
| `--color-text`                                     | page/panel, well         | 11.3, 9.7 |
| `--color-text-muted`                               | page/panel, well         | 5.6, 4.8  |
| placeholder (`--color-text-muted`)                 | well                     | 4.8       |
| `--color-brand-600` (links, secondary buttons)     | page/panel               | 5.2       |
| `--color-panel-text`                               | badge (`--color-panel`)  | 8.7       |
| status labels (all ten `--color-<type>-500`)       | panel                    | 4.7–6.1   |
| `--color-panel-border` (outlines)                  | page                     | 11.8      |
| `--color-border` (item rules)                      | page                     | 3.9       |
| `--color-progress-fill`                            | `--color-progress-track` | 3.3       |
| `--color-brand-600` focus ring (non-text, needs 3) | well                     | 4.5       |

Known failures. Work around them rather than copying them:

- **`--color-brand-600` as text on a well is 4.48:1**, just under AA for small
  text. No component does this; if you put green text inside a field, use
  `--color-text` or `--color-brand-900` instead.
- **Disabled buttons are 2.8:1** (`--color-neutral-500` on
  `--color-neutral-100`). WCAG exempts disabled controls, but don't reuse that
  pair for anything a user needs to read.
- **Skeletons are barely visible**: `--color-skeleton-base` and
  `-highlight` are 1.1–1.2:1 against the parchment. They're a faint shimmer by
  design and are `aria-hidden` in the demo; don't use them as the only sign
  that something is loading for anyone who needs it (add a text status for
  screen readers, e.g. a polite live region).
- **The gold ring is 1.8:1 on parchment**. It's trim that sits between the
  dark edge and the green fill, where it reads fine (6.5:1 on the edge); never
  use gold as text or as an outline directly on the page.

### Using the tokens

Load the tokens on your page (see [Part 2](#tokens-for-your-own-elements)) and
style your own elements with `var(--color-…)`, `var(--font-…)`. Never paste the
hex values; the token file is generated from the theme's single source.

Two scoping rules, verified in the browser:

- Components declare the tokens inside their own shadow roots. Overriding a
  token on `:root` restyles **your** elements but **not** the components.
- To restyle a component, set the token **on the element** (or a selector that
  matches it): `theme-link { --color-brand-600: … }`.

### Recipes for your own elements

These use only tokens.

**The page**:

```css
body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
}
```

**A pixel-cornered panel** (sidebar, modal, toolbar). The outline is a layer
under the fill, both clipped to the same stepped shape. Each corner is a
5-cell pixel circle on a 2px grid: a long 4px step off the straight edge, then
a tight 2px one.

```css
.pq-panel {
  --bw: 2px; /* outline width */
  position: relative;
  isolation: isolate;
  padding: 1rem 1.25rem;
  color: var(--color-text);
}
.pq-panel::before,
.pq-panel::after {
  content: "";
  position: absolute;
  z-index: -1;
  clip-path: polygon(
    6px 0,
    calc(100% - 6px) 0,
    calc(100% - 6px) 2px,
    calc(100% - 2px) 2px,
    calc(100% - 2px) 6px,
    100% 6px,
    100% calc(100% - 6px),
    calc(100% - 2px) calc(100% - 6px),
    calc(100% - 2px) calc(100% - 2px),
    calc(100% - 6px) calc(100% - 2px),
    calc(100% - 6px) 100%,
    6px 100%,
    6px calc(100% - 2px),
    2px calc(100% - 2px),
    2px calc(100% - 6px),
    0 calc(100% - 6px),
    0 6px,
    2px 6px,
    2px 2px,
    6px 2px
  );
}
.pq-panel::before {
  inset: 0;
  background: var(--color-panel-border);
}
.pq-panel::after {
  inset: var(--bw);
  background: var(--color-bg); /* --color-bg-alt for a well */
}
```

**A badge tag** (level, rank, a small label that should stand out):

```css
.pq-badge {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: var(--color-panel);
  color: var(--color-panel-text);
  font: 700 0.875rem var(--font-slab);
  /* gold ring inside a near-black edge, square like a single pixel block */
  box-shadow:
    inset 0 0 0 2px var(--color-panel-border-gold),
    0 0 0 2px var(--color-panel-border);
}
```

### Do and don't

- **Do** ink every box with a near-black outline and pixel-stepped corners,
  and leave its fill the same parchment as the page.
- **Do** save the green-and-gold badge for titles and the one primary action.
- **Do** label every control (`theme-field`, a `<label>`, or `aria-label`),
  and give the stat meter a `label`.
- **Don't** use CSS `border-radius`, drop shadows, gradients or glows on
  panels; don't set body text in Pixelify Sans.
- **Don't** hand-copy token hex values or introduce colours outside the
  tokens.

---

## 2. Package overview and usage

### What it is

`@tkottke90/theme-pixel-quest` is a library of **framework-agnostic Web
Components** built with [Lit](https://lit.dev). Each component is a custom
element with its own Shadow DOM and styles, so it works in plain HTML, Preact,
or any framework that renders DOM.

- Importing the package **registers every `theme-*` element** as a side effect.
- ESM (`dist/index.mjs`) and CommonJS (`dist/index.cjs`) builds, with types.
- **`lit` is a peer dependency** (`^3.2.0`) and is not bundled: install it
  alongside, and make sure your toolchain or import map can resolve `lit`.
- `@tkottke90/theme-pixel-quest/tokens.css` exports the design tokens as plain
  `:root` custom properties for styling your own elements.
- Designed for a **parchment page**: `--color-bg`.
- The fonts (Pixelify Sans, Courier Prime, Inter) load from Google Fonts; add
  the link to your page head. Without it, system monospace and sans-serif
  fonts are used.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Inter:wght@400;600;700&family=Pixelify+Sans:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

### Components

| Tag                                             | What it is                         | Attributes / properties                                                                                                    |
| ----------------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `theme-button`                                  | Badge (primary) or outlined button | `label`, `variant` (`primary`, `secondary`, `ghost`), `disabled`, `accessible-label`; or slot the text                     |
| `theme-card`                                    | Pixel-framed panel with a title    | `heading`; slot content                                                                                                    |
| `theme-container`                               | Pixel-framed panel                 | `as` (`div`, `ol`, `ul`; list markers are removed)                                                                         |
| `theme-item`                                    | Row with a rule underneath         | `as` (`li`, `div`)                                                                                                         |
| `theme-detail`                                  | Collapsible pixel-framed panel     | `summary`; slot content                                                                                                    |
| `theme-blockquote`                              | Callout panel with a coloured rule | `type` (`info`, `tip`, `question`, `success`, `warning`, `failure`, `danger`, `bug`, `example`, `quote`)                   |
| `theme-heading`                                 | Heading                            | `level` (1–4), `banner` (the badge treatment, in Pixelify Sans)                                                            |
| `theme-text`                                    | Body copy or caption               | `variant` (`body`, `caption`)                                                                                              |
| `theme-link`                                    | Link                               | `href`                                                                                                                     |
| `theme-field`                                   | Label above a control              | `label`, `for`; slot the control                                                                                           |
| `theme-input`                                   | Form control                       | `type` (`text`, `email`, `password`, `number`, `checkbox`, `radio`), `name`, `value`, `placeholder`, `checked`, `disabled` |
| `theme-select`                                  | Form control                       | `name`, `value`, `disabled`; `<option>` children                                                                           |
| `theme-textarea`                                | Form control                       | `name`, `value`, `placeholder`, `rows`, `disabled`                                                                         |
| `theme-skeleton-heading`, `theme-skeleton-text` | Loading placeholders               | `width`                                                                                                                    |
| `theme-stat-meter`                              | Labelled stat bar with a readout   | `label`, `sublabel`, `value`, `max` (default 10); slot `icon` an SVG; CSS `--stat-meter-label-width` (default `9rem`)      |
| `theme-page-frame`                              | The sheet's outer border           | slot the page                                                                                                              |

Pairing rules:

- `theme-stat-meter`'s bar is a `meter` named by `label`; always set one. The
  `icon` slot fills a 1.75rem square: slot an `<svg slot="icon">` with a
  `viewBox` (`fill="currentColor"` picks up the ink colour) and mark it
  `aria-hidden="true"`.
- Stacked `theme-stat-meter`s line up because the label column has a fixed
  width (`--stat-meter-label-width`, default `9rem`) and the readout a minimum
  one. Widen the column on the parent if your labels are longer:
  `.stats { --stat-meter-label-width: 12rem; }`.
- `theme-page-frame` goes around a whole page once. It has square corners on
  purpose; don't nest one inside a panel.
- `theme-button` is a plain button, not a form control: it doesn't submit a
  form. Call `form.requestSubmit()` from a click handler.

Form controls are **form-associated**: inside a `<form>` they submit under
their `name`, reset with the form, follow `<fieldset disabled>`, fire `change`
from the element, and work with `<label for>` or a wrapping `<label>`. Radios
group by `name`.

Accessible names reach screen readers: each control forwards its name to the
native element inside its shadow root, taken from `aria-label` on the element
or else from its `<label>` (text inside the control itself, such as a select's
options, is excluded). `theme-field` gives the control it wraps the field's
label as its name, unless the control already has an `aria-label` or
`aria-labelledby`, and clicking the field label focuses the control (or
toggles a checkbox). If the field wraps more than one control, point `for` at
the one it labels. Radios are labelled as a group: wrap them in an element and
the field names that element as a `radiogroup`, so each radio keeps its own
label:

```html
<theme-field label="Starting weapon">
  <div>
    <label
      ><theme-input type="radio" name="weapon" value="staff" checked></theme-input> Staff</label
    >
    <label><theme-input type="radio" name="weapon" value="bow"></theme-input> Bow</label>
  </div>
</theme-field>
```

### Vanilla (with a bundler)

```bash
npm install @tkottke90/theme-pixel-quest lit
```

```js
// main.js — once, at your entry point
import "@tkottke90/theme-pixel-quest"; // registers the elements
import "@tkottke90/theme-pixel-quest/tokens.css"; // tokens for your own CSS
```

```html
<body style="margin: 0; background: var(--color-bg); color: var(--color-text)">
  <theme-page-frame>
    <theme-heading level="1" banner>Character Sheet</theme-heading>
    <theme-card heading="Today's stats">
      <theme-stat-meter label="Energy" sublabel="How much you can do" value="6" max="10">
        <svg slot="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
        </svg>
      </theme-stat-meter>
    </theme-card>

    <form id="hero">
      <theme-field label="Hero name">
        <theme-input name="hero"></theme-input>
      </theme-field>
      <label
        ><theme-input type="checkbox" name="hardcore" value="yes"></theme-input> Hardcore
        mode</label
      >
      <theme-button label="Save hero"></theme-button>
    </form>
  </theme-page-frame>
</body>
```

Set non-string values as **properties** from script, and listen for events on
the element:

```js
const energy = document.querySelector("theme-stat-meter");
energy.value = 7;

const form = document.getElementById("hero");
form.querySelector("theme-button").addEventListener("click", () => form.requestSubmit());
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log([...new FormData(form)]);
});
```

### Vanilla (no bundler)

Browsers need an import map to resolve `lit` and the packages Lit imports
internally. All seven entries are required:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@tkottke90/theme-pixel-quest/dist/tokens.css"
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
  src="https://cdn.jsdelivr.net/npm/@tkottke90/theme-pixel-quest/dist/index.mjs"
></script>
```

### Preact

```bash
npm install @tkottke90/theme-pixel-quest lit
```

Import once at your entry point, then use the tags directly in JSX:

```jsx
import "@tkottke90/theme-pixel-quest";
import "@tkottke90/theme-pixel-quest/tokens.css";
import { useState } from "preact/hooks";

export function HeroForm() {
  const [energy, setEnergy] = useState(6);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log([...new FormData(e.currentTarget)]);
      }}
    >
      <theme-stat-meter label="Energy" value={energy} max={10} />
      <theme-button
        variant="secondary"
        label="Rest"
        onClick={() => setEnergy((n) => Math.min(10, n + 1))}
      />
      <theme-field label="Hero name">
        <theme-input name="hero" onChange={(e) => console.log(e.target.value)} />
      </theme-field>
      <theme-heading level={2} banner>
        Daily Quests
      </theme-heading>
      <theme-button
        label="Save hero"
        onClick={(e) => e.currentTarget.closest("form").requestSubmit()}
      />
    </form>
  );
}
```

Behaviour you can rely on (verified with Preact 10):

- Preact sets these as **properties**, so numbers and booleans arrive typed
  (`value={energy}` is a number; `banner` is `true`).
- `onChange` receives the element's `change` event; `onClick` works on
  `theme-button`. In a `.tsx` file, read the value as
  `(e.target as ThemeInput).value` (`ThemeInput` is exported).
- A native `<form>` collects the custom controls' values on submit.
- No attribute in this package starts with `on`, so none clashes with
  Preact's event-handler props.

**TypeScript.** Preact doesn't know the custom tags, so declare them once (for
example in `src/theme-pixel-quest.d.ts`). Each tag accepts normal HTML
attributes plus its element's own typed properties:

```ts
import type {
  ThemeButton,
  ThemeField,
  ThemeHeading,
  ThemeInput,
  ThemeStatMeter,
} from "@tkottke90/theme-pixel-quest";

type ThemeProps<T> = preact.JSX.HTMLAttributes<HTMLElement> &
  Partial<Omit<T, keyof HTMLElement>> & { style?: preact.JSX.CSSProperties | string };

declare module "preact" {
  namespace JSX {
    interface IntrinsicElements {
      "theme-button": ThemeProps<ThemeButton>;
      "theme-field": ThemeProps<ThemeField>;
      "theme-heading": ThemeProps<ThemeHeading>;
      "theme-input": ThemeProps<ThemeInput>;
      "theme-stat-meter": ThemeProps<ThemeStatMeter>;
      // …add the other theme-* tags you use the same way
    }
  }
}
```

Every element class is exported (`ThemeCard`, `ThemeStatMeter`,
`ThemePageFrame`, …), so wrong attribute values (for example
`variant="tertiary"`) become type errors.

### Tokens for your own elements

`@tkottke90/theme-pixel-quest/tokens.css` defines every design token on
`:root`:

- Surfaces: `--color-bg` (parchment), `--color-bg-alt` (well).
- Badge and frames: `--color-panel`, `--color-panel-text`,
  `--color-panel-border`, `--color-panel-border-gold`.
- Stat bars: `--color-progress-fill`, `--color-progress-track`.
- Green: `--color-brand-50`, `-100`, `-500`, `-600` (interactive), `-900`.
- Status: `--color-{info,tip,question,success,warning,failure,danger,bug,example,quote}-500`.
- Ink and rules: `--color-text`, `--color-text-muted`, `--color-border`; a
  `--color-neutral-*` scale.
- Skeleton: `--color-skeleton-base`, `--color-skeleton-highlight`.
- Type and shape: `--font-pixel`, `--font-slab`, `--font-sans`,
  `--radius-theme` (`0px`), `--pixel-step` (`6px`) and `--shadow-theme` (a
  hard 3px ink offset shadow). No component uses the last two; don't put
  `--shadow-theme` on a panel (see Rule 1).

It contains tokens only, no resets or utility classes, so it is safe to load on
any page. See [Using the tokens](#using-the-tokens) for the scoping rules.
