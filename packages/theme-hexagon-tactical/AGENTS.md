# AGENTS.md — @tkottke90/theme-hexagon-tactical

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

A piece of tactical hardware: a control panel for a hex-grid board game. The
page is dark carbon fibre; content sits on **plates with 45° cut corners**;
anything you press is a **chunky physical key** that drops onto a hard ledge;
and colour is **signal, not decoration**: lime means active, red means alert,
blue and rust identify tiles, and everything else is grey. Type is one
squared-off face, Chakra Petch, uppercase and tracked wherever it labels
hardware.

### Rule 1: three kinds of surface

| Surface   | Use for                              | Fill                                                                                                  | Edge                                                     |
| --------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **Page**  | Behind everything                    | `--color-bg` under `--background-image-carbon` (20px tile), with a faint light-to-dark vertical sheen | none                                                     |
| **Plate** | Cards, panels, callouts, disclosures | vertical gradient `--color-surface-raised` → `--color-surface`                                        | 3px `--color-border`, corners cut 16px; soft drop shadow |
| **Well**  | Anything you type or choose into     | flat `--color-surface-alt`                                                                            | 1px `--color-border`, `--radius-theme` (5px)             |

A plate's border can be recoloured to mark it: `--color-brand-500` for the
active or selected panel, `--color-danger-500` for an alert, a status
`--color-*-500` for a callout. Change the colour, never the thickness.

For a recessed panel (a slot cut into a plate), fill with `--color-void` and
edge with `--color-border-lo`, and drop the shadow.

### Rule 2: cut corners on plates, small radii on keys

- **Plates have corners cut at 45°, never rounded.** All four cut 16px for a
  primary plate (Card, Container, Blockquote). Only the top-left and
  bottom-right cut for a secondary plate (Detail). A heavy plate cuts 22px
  with a 5px border.
- `clip-path` removes a CSS border, so draw a cut-corner border as two clipped
  layers: the border colour underneath, the fill on top inset by the border
  width. Shrink the fill's cut by `border × 0.586` so the diagonal edges look
  as thick as the straight ones (see the recipe below).
- **Keys and wells keep small radii**: `--radius-theme` (5px) on buttons,
  toolbar keys and inputs; `--radius-theme-sm` (4px) on transport keys.
- **Skew is the motif for indicators**: title tabs lean −30°, meter bars
  −22°. Use it for small marks, never for text or containers.
- Board pieces are geometric: flat-topped hexagons for cells, circles for
  tiles.

### Rule 3: keys are lit from above and press down

Every pressable key (Button, Toolbar Button) is built the same way:

- A **three-stop vertical gradient**: lighter top, the base colour at 45%,
  darker bottom (lime keys use `--color-brand-400` → `-500` → `-600`).
- A **3px `--color-void` border**, an inset 2px white highlight (28%) along
  the top and an inset 3px black shade (30%) along the bottom.
- A **hard ledge**: `0 3px 0 var(--color-void)`, plus a soft
  `0 6px 10px rgba(0,0,0,.5)` shadow.
- **Hover** brightens the whole key (`filter: brightness(1.12)`). **Pressing**
  moves it down 2px onto its ledge (ledge shrinks to 1px), in 60ms.
- **Disabled** flattens: `--color-surface-alt` face, `--color-border` edge,
  muted ink, no ledge or shadow.

Plates get only the soft shadow (`drop-shadow(0 6px 10px rgba(0,0,0,.55))`),
never a ledge: they're mounted, not pressable.

### Rule 4: colour is signal

| Colour                                        | Means                                  | Where                                                                |
| --------------------------------------------- | -------------------------------------- | -------------------------------------------------------------------- |
| `--color-brand-500` (lime)                    | Active, primary, selected, on, focus   | primary key face, links, pressed toggles, lit meter bars, focus ring |
| `--color-danger-500` (red)                    | Alert, overload, destructive           | alert plates, hot meter bars, danger keys                            |
| `--color-chip-blue` / `--color-chip-rust`     | Tile identity, not state               | tile faces, each with its brighter `--color-chip-ring-*`             |
| `--color-text` / `--color-text-muted`         | Content / secondary content and labels | everywhere                                                           |
| greys (`--color-border*`, `--color-surface*`) | Structure                              | plates, wells, rims                                                  |

- **Glow only for lit things.** A lit indicator gets a small glow in its own
  colour (`0 0 6px rgb(163 206 66 / .5)` for lime); `--shadow-glow` is the
  token for a lime-lit edge. Static content never glows.
- Status callouts use the ten `--color-<type>-500` tokens; five reuse the
  palette (info = blue tile ring, success = lime, failure = danger, example =
  rust tile ring, quote = muted grey). Always pair the colour with a word.
- Don't add a second accent. If something needs emphasis, it's either active
  (lime) or an alert (red).

### Rule 5: typography

Chakra Petch (`--font-sans`) for everything. `--font-mono` (Share Tech Mono)
is a token for your own code or readouts; no component uses it and the
package doesn't load it.

| Role               | Treatment                                                              |
| ------------------ | ---------------------------------------------------------------------- |
| h1, h2             | 700, uppercase, tracking 0.025em; 1.875rem and 1.5rem                  |
| h3, h4             | 600, sentence case; 1.25rem and 1.125rem (titles inside plates)        |
| Plate titles       | 700, 13px, uppercase, tracking 0.14em, muted, led by a skewed lime tab |
| Field labels       | 600, 0.75rem, uppercase, tracking 0.1em, muted                         |
| Buttons            | 700, 0.875rem, uppercase, tracking 0.05em                              |
| Disclosure summary | 700, body size, uppercase, tracking 0.08em, lime                       |
| Body               | 400, 1rem, relaxed line height (1.625), `--color-text`                 |
| Caption            | 0.8125rem, `--color-text-muted`                                        |
| Readouts           | 700, large (2.125rem counter), lime                                    |

Uppercase means "this labels hardware". Sentence case means "this is content".

### Rule 6: focus is one lime ring

Every interactive element shows a **2px `--color-brand-500` outline** on focus:
offset 3px on keys and board cells, 2px on links, 1px on wells. Don't
substitute a glow or a colour change.

### Rule 7: contrast, measured

Measured in Chromium from the resolved tokens (WCAG ratios):

| Ink                                                | On                              | Ratio      |
| -------------------------------------------------- | ------------------------------- | ---------- |
| `--color-text`                                     | page, plate, well               | 11.3–15.3  |
| `--color-text-muted`                               | page, plate                     | 6.1–6.9    |
| `--color-text-muted`                               | well (`--color-surface-alt`)    | 5.1        |
| `--color-brand-500`                                | page, plate, well               | 7.8–10.6   |
| `--color-brand-900`                                | lime key face (`-400` / `-500`) | 11.3 / 8.3 |
| status labels (tip, question, warning, bug, quote) | plate                           | 6.1–9.2    |
| `--color-danger-500`, `--color-example-500`        | plate                           | 4.5, 4.8   |

Known failures. Work around them rather than copying them:

- **`--color-info-500` on a plate is 4.2:1**, below AA for small text. Use it
  for borders and large text; for small info text use `--color-text`.
- **Well edges are 1.6:1** (`--color-border` on `--color-surface-alt`), below
  the 3:1 non-text minimum. The well is found by its fill and label, not its
  edge; don't rely on the edge alone to show where a field is, and keep a
  visible label on every field.
- **Graphite toolbar keys** have muted ink at 3.1:1 on the face's middle and
  1.9:1 at its top; **danger keys** have red ink at 2.9–3.9:1. Use icons at
  least 28px or a bold glyph, and always give the key a `label`.
- **Skeletons vanish on a plate**: `--color-skeleton-base` equals the plate's
  `--color-surface-raised` (1:1). Put skeletons on the page, or on a well.

### Using the tokens

Load the tokens on your page (see [Part 2](#tokens-for-your-own-elements)) and
style your own elements with `var(--color-…)`, `var(--font-…)`. Never paste the
hex values; the token file is generated from the theme's single source.

Two scoping rules, verified in the browser:

- Components declare the tokens inside their own shadow roots. Overriding a
  token on `:root` restyles **your** elements but **not** the components.
- To restyle a component, set the token **on the element** (or a selector that
  matches it): `theme-button { --color-brand-500: … }`.

### Recipes for your own elements

These use only tokens.

**The page background** (the carbon weave plus a faint sheen):

```css
body {
  margin: 0;
  color: var(--color-text);
  font-family: var(--font-sans);
  background:
    linear-gradient(180deg, rgb(255 255 255 / 0.06), rgb(0 0 0 / 0.35)),
    var(--background-image-carbon);
  background-color: var(--color-bg);
  /* one size per layer: the sheen, then the weave's six */
  background-size:
    100% 100%,
    20px 20px,
    20px 20px,
    20px 20px,
    20px 20px,
    20px 20px,
    20px 20px;
}
```

**A cut-corner plate** (panel, modal, sidebar), with the border drawn as a
layer under the fill:

```css
.ht-plate {
  --cut: 16px;
  --bw: 3px;
  --edge: var(--color-border); /* or --color-brand-500 / --color-danger-500 */
  position: relative;
  isolation: isolate;
  padding: 20px 22px;
  color: var(--color-text);
  filter: drop-shadow(0 6px 10px rgb(0 0 0 / 0.55));
}
.ht-plate::before,
.ht-plate::after {
  content: "";
  position: absolute;
  z-index: -1;
  --c: var(--cut);
  clip-path: polygon(
    var(--c) 0,
    calc(100% - var(--c)) 0,
    100% var(--c),
    100% calc(100% - var(--c)),
    calc(100% - var(--c)) 100%,
    var(--c) 100%,
    0 calc(100% - var(--c)),
    0 var(--c)
  );
}
.ht-plate::before {
  inset: 0;
  background: var(--edge);
}
.ht-plate::after {
  inset: var(--bw);
  --c: calc(var(--cut) - var(--bw) * 0.586);
  background: linear-gradient(180deg, var(--color-surface-raised), var(--color-surface));
}
```

**A lit status tag** (badge, state label):

```css
.ht-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font: 700 0.75rem var(--font-sans);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
.ht-tag::before {
  content: "";
  width: 14px;
  height: 4px;
  transform: skewX(-30deg);
  background: var(--color-border-hi);
}
.ht-tag[data-state="on"] {
  color: var(--color-brand-500);
}
.ht-tag[data-state="on"]::before {
  background: var(--color-brand-500);
  box-shadow: 0 0 6px rgb(163 206 66 / 0.5);
}
.ht-tag[data-state="alert"] {
  color: var(--color-danger-500);
}
.ht-tag[data-state="alert"]::before {
  background: var(--color-danger-500);
  box-shadow: 0 0 6px rgb(224 87 60 / 0.5);
}
```

### Do and don't

- **Do** cut plate corners at 45°, light keys from above, and press them down
  onto a hard ledge.
- **Do** keep lime for active and red for alerts, and pair every status colour
  with a word.
- **Do** label every control (`theme-field`, a `<label>`, or `aria-label`),
  and give icon-only keys and board cells an accessible name.
- **Don't** round a plate, blur a key's ledge, add a second accent colour, or
  make static content glow.
- **Don't** hand-copy token hex values or introduce colours outside the
  tokens.

---

## 2. Package overview and usage

### What it is

`@tkottke90/theme-hexagon-tactical` is a library of **framework-agnostic Web
Components** built with [Lit](https://lit.dev). Each component is a custom
element with its own Shadow DOM and styles, so it works in plain HTML, Preact,
or any framework that renders DOM.

- Importing the package **registers every `theme-*` element** as a side effect.
- ESM (`dist/index.mjs`) and CommonJS (`dist/index.cjs`) builds, with types.
- **`lit` is a peer dependency** (`^3.2.0`) and is not bundled: install it
  alongside, and make sure your toolchain or import map can resolve `lit`.
- `@tkottke90/theme-hexagon-tactical/tokens.css` exports the design tokens as
  plain `:root` custom properties for styling your own elements.
- Designed for a **dark page**: `--color-bg` with the carbon weave (see the
  page background recipe above).
- The font (Chakra Petch) loads from Google Fonts; add the link to your page
  head. Without it, system fonts are used.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

### Components

| Tag                                             | What it is                    | Attributes / properties                                                                                                       |
| ----------------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `theme-button`                                  | Pressable key                 | `label`, `variant` (`primary`, `secondary`, `ghost`), `disabled`, `accessible-label`; or slot the text                        |
| `theme-card`                                    | Cut-corner plate with a title | `heading`; slot content                                                                                                       |
| `theme-container`                               | Cut-corner plate              | `as` (`div`, `ol`, `ul`; list markers are removed)                                                                            |
| `theme-item`                                    | Row with a rule underneath    | `as` (`li`, `div`)                                                                                                            |
| `theme-detail`                                  | Collapsible secondary plate   | `summary`; slot content                                                                                                       |
| `theme-blockquote`                              | Callout plate                 | `type` (`info`, `tip`, `question`, `success`, `warning`, `failure`, `danger`, `bug`, `example`, `quote`)                      |
| `theme-heading`                                 | Heading                       | `level` (1–4); 1–2 uppercase                                                                                                  |
| `theme-text`                                    | Body copy or caption          | `variant` (`body`, `caption`)                                                                                                 |
| `theme-link`                                    | Link                          | `href`                                                                                                                        |
| `theme-field`                                   | Label above a control         | `label`, `for`; slot the control                                                                                              |
| `theme-input`                                   | Form control                  | `type` (`text`, `email`, `password`, `number`, `checkbox`, `radio`), `name`, `value`, `placeholder`, `checked`, `disabled`    |
| `theme-select`                                  | Form control                  | `name`, `value`, `disabled`; `<option>` children                                                                              |
| `theme-textarea`                                | Form control                  | `name`, `value`, `placeholder`, `rows`, `disabled`                                                                            |
| `theme-skeleton-heading`, `theme-skeleton-text` | Loading placeholders          | `width`                                                                                                                       |
| `theme-hex-board`                               | Hex grid that places sockets  | `cols`, `rows`, `w` (hex width, px)                                                                                           |
| `theme-hex-socket`                              | Hex cell (a button)           | `q`, `r` (axial position), `empty`, `add`, `selected`, `step`, `aria-label`; slot a chip                                      |
| `theme-chip`                                    | Round tile                    | `variant` (`default`, `blue`, `rust`, `charge`, `wheel`), `charge` (0–1), `nub`, `rotation` (deg); CSS `--size`; slot an icon |
| `theme-toolbar-button`                          | Square icon key               | `material` (`graphite`, `steel`, `danger`, `toggle`), `pressed`, `label`; slot an icon or glyph                               |
| `theme-transport-control`                       | Play/stop key                 | `pressed`, `label`; slot an icon                                                                                              |
| `theme-counter`                                 | Readout in corner brackets    | `value`, `label`                                                                                                              |
| `theme-slots`                                   | Segmented meter               | `total`, `on`, `hot`, `label`                                                                                                 |

Pairing rules:

- `theme-hex-socket`s go inside a `theme-hex-board`, which sets their size.
  Coordinates are axial: `q` is the column, and each column sits half a hex
  lower than the one before, so a 3-column board needs about `rows="3.6"` to
  fit three cells per column. Give every socket an `aria-label`; without one
  it's announced by its step number, or not at all.
- `theme-toolbar-button` and `theme-transport-control` don't toggle
  themselves: flip `pressed` in your click handler. `pressed` only applies to
  `material="toggle"` on a toolbar button.
- `theme-button`, `theme-toolbar-button`, `theme-transport-control` and
  `theme-hex-socket` are plain buttons, not form controls: they don't submit
  a form. Call `form.requestSubmit()` from a click handler.

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
toggles a checkbox). If the field wraps more than one control, point
`for` at the one it labels. Radios are labelled as a group: wrap them in an
element and the field names that element as a `radiogroup`, so each radio
keeps its own label:

```html
<theme-field label="Formation">
  <div>
    <label
      ><theme-input type="radio" name="formation" value="wedge" checked></theme-input> Wedge</label
    >
    <label><theme-input type="radio" name="formation" value="line"></theme-input> Line</label>
  </div>
</theme-field>
```

### Vanilla (with a bundler)

```bash
npm install @tkottke90/theme-hexagon-tactical lit
```

```js
// main.js — once, at your entry point
import "@tkottke90/theme-hexagon-tactical"; // registers the elements
import "@tkottke90/theme-hexagon-tactical/tokens.css"; // tokens for your own CSS
```

```html
<body style="background: var(--color-bg); color: var(--color-text)">
  <theme-card heading="Board A-7">
    <theme-hex-board cols="2" rows="1.5">
      <theme-hex-socket q="0" r="0" step="1" aria-label="Grab, step 1">
        <theme-chip>G</theme-chip>
      </theme-hex-socket>
      <theme-hex-socket q="1" r="0" add aria-label="Add a tile here"></theme-hex-socket>
    </theme-hex-board>
    <theme-toolbar-button material="toggle" label="Program A">a</theme-toolbar-button>
  </theme-card>

  <form id="squad">
    <theme-field label="Callsign">
      <theme-input name="callsign"></theme-input>
    </theme-field>
    <label
      ><theme-input type="checkbox" name="silent" value="yes"></theme-input> Radio silence</label
    >
    <theme-button label="Deploy"></theme-button>
  </form>
</body>
```

Set non-string values as **properties** from script, and listen for events on
the element:

```js
const program = document.querySelector("theme-toolbar-button");
program.addEventListener("click", () => {
  program.pressed = !program.pressed;
});

const form = document.getElementById("squad");
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
  href="https://cdn.jsdelivr.net/npm/@tkottke90/theme-hexagon-tactical/dist/tokens.css"
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
  src="https://cdn.jsdelivr.net/npm/@tkottke90/theme-hexagon-tactical/dist/index.mjs"
></script>
```

### Preact

```bash
npm install @tkottke90/theme-hexagon-tactical lit
```

Import once at your entry point, then use the tags directly in JSX:

```jsx
import "@tkottke90/theme-hexagon-tactical";
import "@tkottke90/theme-hexagon-tactical/tokens.css";
import { useState } from "preact/hooks";

export function Squad() {
  const [program, setProgram] = useState("a");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log([...new FormData(e.currentTarget)]);
      }}
    >
      {["a", "b"].map((p) => (
        <theme-toolbar-button
          material="toggle"
          label={`Program ${p.toUpperCase()}`}
          pressed={program === p}
          onClick={() => setProgram(p)}
        >
          {p}
        </theme-toolbar-button>
      ))}
      {/* `on` would be read as an event handler: set it through a ref */}
      <theme-slots
        total={6}
        label="C1 charge"
        ref={(el) => {
          if (el) el.on = 4;
        }}
      />
      <theme-field label="Callsign">
        <theme-input name="callsign" onChange={(e) => console.log(e.target.value)} />
      </theme-field>
      <theme-button
        label="Deploy"
        onClick={(e) => e.currentTarget.closest("form").requestSubmit()}
      />
    </form>
  );
}
```

Behaviour you can rely on (verified with Preact 10):

- Preact sets these as **properties**, so numbers and booleans arrive typed
  (`total={6}` is the number 6; `pressed={program === p}` toggles).
- **Except `theme-slots`' `on`:** Preact treats every prop that starts with
  `on` as an event listener, so `on={4}` throws. Set it through a `ref`, as
  above.
- `onChange` receives the element's `change` event; `onClick` works on the
  button-like elements.
- A native `<form>` collects the custom controls' values on submit.

**TypeScript.** Preact doesn't know the custom tags, so declare them once (for
example in `src/theme-hexagon-tactical.d.ts`). Each tag accepts normal HTML
attributes plus its element's own typed properties:

```ts
import type {
  ThemeButton,
  ThemeInput,
  ThemeSlots,
  ThemeToolbarButton,
} from "@tkottke90/theme-hexagon-tactical";

type ThemeProps<T> = preact.JSX.HTMLAttributes<HTMLElement> &
  Partial<Omit<T, keyof HTMLElement>> & { style?: preact.JSX.CSSProperties | string };

declare module "preact" {
  namespace JSX {
    interface IntrinsicElements {
      "theme-button": ThemeProps<ThemeButton>;
      "theme-input": ThemeProps<ThemeInput>;
      "theme-slots": ThemeProps<ThemeSlots>;
      "theme-toolbar-button": ThemeProps<ThemeToolbarButton>;
      // …add the other theme-* tags you use the same way
    }
  }
}
```

Every element class is exported (`ThemeCard`, `ThemeHexSocket`, `ThemeChip`,
…), so wrong attribute values (for example `material="wood"`) become type
errors.

### Tokens for your own elements

`@tkottke90/theme-hexagon-tactical/tokens.css` defines every design token on
`:root`:

- Surfaces: `--color-bg`, `--color-void`, `--color-surface`,
  `--color-surface-raised`, `--color-surface-alt`.
- Edges: `--color-border`, `--color-border-hi`, `--color-border-lo`.
- Lime: `--color-brand-400`, `-500`, `-600`, `-900` (ink on lime).
- Tiles: `--color-chip`, `--color-chip-blue`, `--color-chip-rust` and their
  `--color-chip-ring*` rings.
- Status: `--color-{info,tip,question,success,warning,failure,danger,bug,example,quote}-500`,
  plus `--color-danger-btn`.
- Ink: `--color-text`, `--color-text-muted`; a `--color-neutral-*` scale.
- Skeleton: `--color-skeleton-base`, `--color-skeleton-highlight`.
- Type and shape: `--font-sans`, `--font-mono`, `--radius-theme`,
  `--radius-theme-sm`, `--shadow-glow`.
- Images: `--background-image-carbon` (the page weave, tile it at 20px),
  `--background-image-brackets` (corner brackets) and
  `--background-image-socket` (empty hex outline).

It contains tokens only, no resets or utility classes, so it is safe to load on
any page. See [Using the tokens](#using-the-tokens) for the scoping rules.
