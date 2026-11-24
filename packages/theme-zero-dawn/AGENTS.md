# AGENTS.md — @tkottke90/theme-zero-dawn

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

A post-collapse world where machines and tribes share the landscape. UI is
built from **two material languages that never blur**: _machine_ (precise,
cool, faceted metal plates over dark cores, lit by thin cyan light) carries
**structure**, and _tribal_ (hand-painted, warm, rough-edged, saturated) carries
**decoration and meaning**. Everything sits on a dark dusk-steel page.

### Rule 1: one light source, top-left

Every surface is lit from the top-left and every depth cue agrees with that:

- **Bevels are flat facets, not soft shading.** A raised plate has a band
  around its edge (3–7px) split into one flat facet per edge and per cut
  corner. Each facet is shaded by how squarely it faces the light:
  - facing the light: a `--color-paint` wash at `0.1875 × facing` opacity
    (subtle, a catch-light, never an outline);
  - facing away: `--color-core` at `0.12 + 0.38 × (away)` opacity.
    So top and left edges are faintly lit, right and bottom edges are shaded,
    and the bottom-right corner is darkest.
- **Drop shadows are hard and offset, never blurred.** A flat copy of the
  shape in `--color-core-deep`, offset equally down and right (3px for small
  controls, 5px for panels). No `blur`, no spread.
- **Faces slope away from the light**: a diagonal gradient from top-left to
  bottom-right (light plate `--color-plate-50` → darker plate; steel
  `--color-plate-700` → `--color-core`).
- **Recessed things are lit in reverse.** A slot cut _into_ a surface has its
  top and left walls in shadow and its bottom and right walls lit.
- **Pressing is physical.** A pressed raised control moves exactly its
  shadow's offset down-right, covering its shadow, and its face darkens a step.

### Rule 2: faceted geometry, never rounded

- No `border-radius` anywhere. Corners are **cut at 45°**.
- Plates cut the **top-left and bottom-right** corners larger (cards 18px,
  panels 14px, buttons 10px, inputs 8px, skeleton bars 4–8px); the other two
  corners get a small cut (6px) or stay square.
- Markers and ornaments are **diamonds, triangles and chevrons**: list bullets
  are diamonds, the disclosure marker is a triangle, ornaments are tapered
  rules around a diamond bead.
- Use SVG (or `clip-path`) for shapes; the theme draws its frames in SVG so
  bevels, notches and seams stay crisp at any size.

### Rule 3: surfaces and which ink goes on them

| Surface                | Use for                          | Fill                                                              | Ink (text)                                                                     |
| ---------------------- | -------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Page**               | Behind everything                | `--color-bg` + `--background-image-tri-grid`                      | `--color-text`, muted `--color-text-muted`                                     |
| **Light plate** (Card) | Primary content, featured items  | `--color-plate-50` → `--color-plate-100`/`-300` gradient, bevel   | `--color-core`, muted `--color-plate-ink-muted`, link `--color-plate-ink-link` |
| **Steel plate**        | Grouping, panels, notices, forms | `--color-plate-700` → `--color-core` gradient, bevel              | `--color-text`, muted `--color-text-muted`, link `--color-brand-300`           |
| **Socket** (inputs)    | Anything you type or choose into | `--color-core` well, `--color-plate-300` 1.5px edge, **no bevel** | `--color-text`, placeholder `--color-text-muted`                               |

Sockets are deliberately _not_ bevelled: they glow instead (see Rule 4). That
emissive glow is the world's technology; don't replace it with a physical edge.

Details that make a plate read as machinery: a **seam notch** cut into the top
edge revealing the dark core with a thin `--color-wire` (amber) line through
it, and a **cyan glow seam** on the top-left cut corner. Use them on large
plates only; on thin panels a notch reads as a glitch.

### Rule 4: cyan is light, not paint

`--color-brand-500` (machine cyan) is **emitted light**. Use it only for:
thin seams and hairlines, focus rings, progress and gauge fills, small glowing
cores. Never as a large flat fill or a background.

- Glow = `filter: drop-shadow(0 0 4–6px var(--color-brand-500))` (CSS) or an
  SVG Gaussian blur of 1.5–2.5 merged under the shape.
- **Focus** turns an element's edge cyan and adds that glow; it traces the
  element's real (cut) outline rather than drawing a rectangle.
- **Motion: only the light moves.** Structure stays still; arcs travel, cores
  pulse in **opacity and glow, never scale**. Durations: hover/state 0.12–0.15s;
  press 40ms in, 120ms out; spinners 1.4–1.6s. Honour
  `prefers-reduced-motion` by stopping animation while keeping a readable
  still state.

### Rule 5: tribal paint carries meaning

- Colours: `--color-tribe-red`, `-orange`, `-ochre`, `-moss`, `-teal`,
  `-cobalt`, `-violet`, with off-white `--color-paint` strokes.
- **Rough edges**: painted shapes pass through an SVG filter,
  `feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2"` into
  `feDisplacementMap scale="2–5"`, so vector fills read as dry brush.
- Marks are **symmetric, chevron-based, a few chunky strokes** on a painted
  triangle, shield or diamond. Design original marks; don't copy existing
  emblems.
- Semantic states use painted chips: the theme's ten `--color-<type>-500` fills
  each with a matching `--color-<type>-ink` chosen for contrast. Always pair
  colour with a text label; colour is never the only signal.
- Woven bands (sawtooth peaks, zigzag hems with beads) make dividers; a
  diamond medallion (ochre, core, cyan centre) joins them.

### Rule 6: typography

| Role            | Face (token)                 | Treatment                                                                                        |
| --------------- | ---------------------------- | ------------------------------------------------------------------------------------------------ |
| Headings        | Saira (`--font-sans`)        | Uppercase; 700, tracking 0.08em (h1 2.25rem, h2 1.75rem); 600, 0.06em (h3 1.375rem, h4 1.125rem) |
| Labels, buttons | Saira                        | Uppercase, 600, 0.75–0.875rem, tracking 0.12–0.14em                                              |
| Captions        | Saira                        | Uppercase, 500, 0.75rem, tracking 0.1em, muted ink                                               |
| Body            | Crimson Pro (`--font-serif`) | 1.125rem, relaxed line height                                                                    |

Headings at levels 1–2 carry a 120px ornament (tapered rules around a diamond
bead) centred on the text. Body serif against stencil-like sans is the point:
printed field notes beside machine labelling.

### Rule 7: contrast is guaranteed by the tokens, keep it that way

Every ink above was checked for WCAG AA (4.5:1 for text, 3:1 for indicators)
on its surface, **including the darkest corner of each gradient**. When you
need a colour that fails, shift it lighter or darker _within the same hue_;
don't swap to a different colour. Text on a raised plate's dark corner is the
usual failure: check it.

### Using the tokens

Load the tokens on your page (see [Part 2](#tokens-for-your-own-elements)) and
style your own elements with `var(--color-…)`, `var(--font-…)`. Never paste the
hex values; the token file is generated from the theme's single source.

Two scoping rules, verified in the browser:

- Components declare the tokens inside their own shadow roots. Overriding a
  token on `:root` restyles **your** elements but **not** the components.
- To restyle a component, set the token **on the element** (or a selector that
  matches it): `theme-progress { --color-brand-500: … }`.

Inside a theme surface, slotted content can read the surface's inks:
`--zd-ink`, `--zd-ink-muted`, `--zd-link`, `--zd-accent` are set by Card (light
inks) and Container, Detail and Blockquote (steel inks). Use
`color: var(--zd-ink, var(--color-text))` and your element adapts to whichever
plate it lands on.

### Recipes for your own elements

These use only tokens. They approximate the faceted bevel in plain CSS; for an
exact bevel, draw an SVG with the exported `computePlate(width, height,
options)` geometry (it returns the plate, drop, groove and per-facet paths).

**A raised steel plate** (panel, modal, toolbar):

```css
.zd-plate {
  --cut: 14px;
  padding: 1.25rem 1.5rem;
  color: var(--color-text);
  background: linear-gradient(135deg, var(--color-plate-700), var(--color-core));
  /* faint lit top/left edge, shaded bottom/right edge */
  box-shadow:
    inset 2px 2px 0 color-mix(in srgb, var(--color-paint) 12%, transparent),
    inset -3px -3px 0 color-mix(in srgb, var(--color-core) 45%, transparent);
  clip-path: polygon(
    var(--cut) 0,
    100% 0,
    100% calc(100% - var(--cut)),
    calc(100% - var(--cut)) 100%,
    0 100%,
    0 var(--cut)
  );
}
/* the hard drop shadow must sit on a wrapper: clip-path would cut it off */
.zd-plate-wrap {
  filter: drop-shadow(5px 5px 0 var(--color-core-deep));
}
```

**A socket with the focus glow** (custom input, search box):

```css
.zd-socket {
  background: var(--color-core);
  color: var(--color-text);
  border: 1.5px solid var(--color-plate-300);
  font: 400 1rem var(--font-sans);
  padding: 0.5rem 0.75rem;
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
}
.zd-socket:focus-visible {
  outline: none;
  border-color: var(--color-brand-500);
}
.zd-socket-wrap:focus-within {
  filter: drop-shadow(0 0 6px var(--color-brand-500));
}
```

**A painted status chip** (tag, badge):

```css
.zd-chip {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  font: 700 0.75rem var(--font-sans);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: var(--color-danger-500);
  color: var(--color-danger-ink);
  clip-path: polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
}
```

### Do and don't

- **Do** cut corners, light from the top-left, keep shadows hard, keep cyan thin.
- **Do** put structure in machine plates and meaning in painted marks.
- **Don't** round corners, blur shadows, fill large areas with cyan, or animate
  scale.
- **Don't** introduce colours outside the tokens or hand-copy token hex values.
- **Don't** rely on colour alone for meaning.

---

## 2. Package overview and usage

### What it is

`@tkottke90/theme-zero-dawn` is a library of **framework-agnostic Web
Components** built with [Lit](https://lit.dev). Each component is a custom
element with its own Shadow DOM and styles, so it works in plain HTML, Preact,
or any framework that renders DOM.

- Importing the package **registers every `theme-*` element** as a side effect.
- ESM (`dist/index.mjs`) and CommonJS (`dist/index.cjs`) builds, with types.
- **`lit` is a peer dependency** (`^3.2.0`) and is not bundled: install it
  alongside, and make sure your toolchain or import map can resolve `lit`.
- `@tkottke90/theme-zero-dawn/tokens.css` exports the design tokens as plain
  `:root` custom properties for styling your own elements.
- Designed for a **dark page**. Set your page background to `--color-bg`.
- Fonts (Saira, Crimson Pro) load from Google Fonts; add the link to your
  page head. Without it, system fonts are used.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Saira:wght@400;500;600;700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap"
  rel="stylesheet"
/>
```

### Components

| Tag                                             | What it is                 | Attributes / properties                                                                                                                                                                                                                                    |
| ----------------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `theme-button`                                  | Raised plate button        | `label`, `variant` (`primary`, `secondary`, `ghost`), `disabled`; or slot the text                                                                                                                                                                         |
| `theme-card`                                    | Light plate                | `heading`; slot content                                                                                                                                                                                                                                    |
| `theme-container`                               | Steel plate wrapper        | `as` (`div`, `ol`, `ul`)                                                                                                                                                                                                                                   |
| `theme-item`                                    | List row with diamond bead | `as` (`li`, `div`)                                                                                                                                                                                                                                         |
| `theme-detail`                                  | Collapsible steel plate    | `summary`; slot content                                                                                                                                                                                                                                    |
| `theme-blockquote`                              | Painted callout            | `type` (`info`, `tip`, `question`, `success`, `warning`, `failure`, `danger`, `bug`, `example`, `quote`)                                                                                                                                                   |
| `theme-heading`                                 | Display heading            | `level` (1–4); levels 1–2 have the ornament                                                                                                                                                                                                                |
| `theme-text`                                    | Body copy or caption       | `variant` (`body`, `caption`)                                                                                                                                                                                                                              |
| `theme-link`                                    | Link                       | `href`                                                                                                                                                                                                                                                     |
| `theme-field`                                   | Label above a control      | `label`; slot the control                                                                                                                                                                                                                                  |
| `theme-input`                                   | Form control               | `type` (`text`, `email`, `password`, `number`, `checkbox`, `radio`), `name`, `value`, `placeholder`, `checked`, `disabled`                                                                                                                                 |
| `theme-select`                                  | Form control               | `name`, `value`, `disabled`; `<option>` children                                                                                                                                                                                                           |
| `theme-textarea`                                | Form control               | `name`, `value`, `placeholder`, `rows`, `disabled`                                                                                                                                                                                                         |
| `theme-skeleton-heading`, `theme-skeleton-text` | Loading placeholders       | `width`                                                                                                                                                                                                                                                    |
| `theme-glyph`                                   | Painted emblem             | `name` (`spear`, `peaks`, `eye`, `sun`, `feather`, `wave`, `hearth`, `focus`, `claw`, `quote`), `color` (`red`, `orange`, `ochre`, `moss`, `teal`, `cobalt`, `violet`, `band`, `core`), `shape` (`triangle`, `shield`, `diamond`, `none`), `size`, `label` |
| `theme-divider`                                 | Woven band rule            | `variant` (`peaks`, `trim`)                                                                                                                                                                                                                                |
| `theme-disc`                                    | Radial gauge / spinner     | `value` (omit for spinner), `max`, `label`, `size`, `variant` (`dish`, `segments`, `peaks`)                                                                                                                                                                |
| `theme-progress`                                | Progress bar               | `value`, `max`, `segments`, `label`, `variant` (`raised`, `recessed`); CSS `--zd-progress-fill`                                                                                                                                                            |
| `theme-circuit`                                 | Circuit-trace backdrop     | `glow`; slot content; CSS `--zd-circuit-min-height`                                                                                                                                                                                                        |

Pairing rules: `theme-progress variant="recessed"` goes on light cards,
`raised` on steel containers (always chosen explicitly).
`--zd-progress-fill` takes any colour but only its hue is used; lightness and
chroma are locked so every hue stays readable.

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
toggles a checkbox/radio). If the field wraps more than one control, point
`for` at the one it labels.

### Vanilla (with a bundler)

```bash
npm install @tkottke90/theme-zero-dawn lit
```

```js
// main.js — once, at your entry point
import "@tkottke90/theme-zero-dawn"; // registers the elements
import "@tkottke90/theme-zero-dawn/tokens.css"; // tokens for your own CSS
```

```html
<body style="background: var(--color-bg); color: var(--color-text)">
  <theme-card heading="Field notes">
    <theme-text>Plates overlap like scales; the core shows through every seam.</theme-text>
    <theme-progress variant="recessed" value="60" label="Armour"></theme-progress>
  </theme-card>

  <form id="sighting">
    <label>Machine <theme-input name="machine"></theme-input></label>
    <label><theme-input type="checkbox" name="core" value="yes"></theme-input> Core exposed</label>
    <theme-button label="Save"></theme-button>
  </form>
</body>
```

Set rich or non-string values as **properties** from script, and listen for
events on the element:

```js
const bar = document.querySelector("theme-progress");
bar.value = 75;

document.querySelector("theme-input[name=machine]").addEventListener("change", (e) => {
  console.log(e.target.value);
});
```

### Vanilla (no bundler)

Browsers need an import map to resolve `lit` and the packages Lit imports
internally. All seven entries are required:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@tkottke90/theme-zero-dawn/dist/tokens.css"
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
  src="https://cdn.jsdelivr.net/npm/@tkottke90/theme-zero-dawn/dist/index.mjs"
></script>
```

### Preact

```bash
npm install @tkottke90/theme-zero-dawn lit
```

Import once at your entry point, then use the tags directly in JSX:

```jsx
import "@tkottke90/theme-zero-dawn";
import "@tkottke90/theme-zero-dawn/tokens.css";
import { useState } from "preact/hooks";

export function Sighting() {
  const [core, setCore] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log([...new FormData(e.currentTarget)]);
      }}
    >
      <theme-card heading="Ridgestrider">
        <theme-progress
          variant="recessed"
          value={42}
          label="Armour"
          style={{ "--zd-progress-fill": "var(--color-tribe-ochre)" }}
        />
      </theme-card>
      <label>
        <theme-input
          type="checkbox"
          name="core"
          value="yes"
          checked={core}
          onChange={(e) => setCore(e.target.checked)}
        />
        Core exposed
      </label>
      <theme-button label="Save" variant="secondary" onClick={() => {}} />
    </form>
  );
}
```

Behaviour you can rely on (verified with Preact 10):

- Preact sets these as **properties**, so numbers and booleans arrive typed
  (`value={42}` is the number 42; `checked={core}` toggles).
- `onChange` receives the element's `change` event; `onClick` works on
  buttons. Controlled `value` / `checked` stay in sync.
- CSS custom properties work in a `style` object.
- A native `<form>` collects the custom controls' values on submit.

**TypeScript.** Preact doesn't know the custom tags, so declare them once (for
example in `src/theme-zero-dawn.d.ts`). Each tag accepts normal HTML attributes
plus its element's own typed properties:

```ts
import type { ThemeButton, ThemeInput, ThemeProgress } from "@tkottke90/theme-zero-dawn";

type ThemeProps<T> = preact.JSX.HTMLAttributes<HTMLElement> &
  Partial<Omit<T, keyof HTMLElement>> & { style?: preact.JSX.CSSProperties | string };

declare module "preact" {
  namespace JSX {
    interface IntrinsicElements {
      "theme-button": ThemeProps<ThemeButton>;
      "theme-input": ThemeProps<ThemeInput>;
      "theme-progress": ThemeProps<ThemeProgress>;
      // …add the other theme-* tags you use the same way
    }
  }
}
```

Every element class is exported (`ThemeCard`, `ThemeDisc`, `ThemeGlyph`, …),
so wrong attribute values (for example `variant="sideways"`) become type
errors.

### Tokens for your own elements

`@tkottke90/theme-zero-dawn/tokens.css` defines every design token on `:root`:
colours (`--color-*`), fonts (`--font-sans`, `--font-serif`) and the page's
triangle lattice (`--background-image-tri-grid`). It contains tokens only, no
resets or utility classes, so it is safe to load on any page. See
[Using the tokens](#using-the-tokens) for the scoping rules.
