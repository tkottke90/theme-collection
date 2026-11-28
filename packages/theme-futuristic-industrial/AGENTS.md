# AGENTS.md — @tkottke90/theme-futuristic-industrial

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

A stencilled industrial console, taken from a sheet of hazard-tag graphics: a
light blue-grey page, charcoal "stencil ink", one hazard orange, and caution
yellow kept for warnings. Panels are plates with corners cut at 45°, held by
rivets and edged with hazard tape where something needs attention; everything
is set in one monospace face, with stencil-style uppercase labels. Every frame
is drawn to the element's measured size, so the cuts, bolts and stripes stay in
place at any size.

### Rules

1. **Cut corners, don't round them.** Panels are chamfered at 45°: Card at the
   top-left and bottom-right, Plate at the opposite pair, Container at one
   corner. Only small controls use `--radius-theme` (2px). The dark Casing, the
   Tile and the Conduit Panel have rounded bevels because their source shapes
   do.
2. **Orange never stands alone on the page.** The brand orange
   (`--color-brand-500`) is 2.1:1 against the page, so it is only ever a fill
   or a stripe, always beside ink: primary buttons carry ink labels,
   the rail and stripe band have ink outlines, hazard stripes alternate with
   ink. For orange **text** on the page use `--color-brand-700` (4.96:1).
3. **Hazard tape means attention.** Use `theme-hazard-container` (or the
   `--background-image-hazard` stripes) for restricted or high-attention areas,
   and `variant="light"` for areas that need marking but not alarm. Don't stripe
   every panel; the tape loses its meaning.
4. **One dark surface.** `theme-casing` and `theme-tile` are the only charcoal
   surfaces. Inside them, theme text, headings, links, list items and field
   labels switch to light colours by themselves. Don't paint other components
   dark; put them in a Casing.
5. **Caution yellow is for warnings.** `--color-caution-500` is the warning
   Blockquote's plate, with ink text. Don't use it as decoration.
6. **One face, two voices.** Everything is monospace. Labels, headings and
   buttons are uppercase with wide letter spacing (the stencil voice); body text
   and captions are sentence case.
7. **Contrast is measured, not assumed.** See [Contrast](#contrast-measured).
   Keep any new pairing at 4.5:1 for text and 3:1 for control edges and focus
   rings.

### Surfaces and ink

| Surface                                    | Fill                  | Text                  | Muted text                        | Links, accents                              |
| ------------------------------------------ | --------------------- | --------------------- | --------------------------------- | ------------------------------------------- |
| Page, Card, Container, Plate, Detail, Well | `--color-neutral-50`  | `--color-neutral-900` | `--color-neutral-500`             | `--color-brand-700` (hover `-900`)          |
| Casing, Tile (dark)                        | `--color-neutral-900` | `--color-neutral-50`  | `--color-neutral-300`             | `--color-brand-500` (hover `-50`)           |
| Primary button                             | `--color-brand-500`   | `--color-neutral-900` | —                                 | —                                           |
| Warning tag                                | `--color-caution-500` | `--color-neutral-900` | `--color-neutral-900`             | `--color-neutral-900`                       |
| Danger tag                                 | `--color-danger-500`  | `--color-neutral-50`  | `--color-neutral-100`             | `--color-neutral-50` (hover caution yellow) |
| Form fields                                | `--color-neutral-50`  | `--color-neutral-900` | placeholder `--color-neutral-500` | edge `--color-border-strong`                |

### Accent and motion

- Orange marks actions (primary buttons), links, focus rings (as the darker
  link colour) and hazard tape. Nothing else.
- The only motion is the skeleton shimmer, which stops under
  `prefers-reduced-motion`, and Detail's ▸ turning when it opens. Don't add
  more.

### Typography

- `--font-sans` and `--font-mono` are the same stack: JetBrains Mono, then IBM
  Plex Mono, then the system monospace fonts. Load JetBrains Mono (see
  [Part 2](#what-it-is)) or the page falls back to the system monospace.
- `theme-heading` levels: h1 `text-3xl` bold, h2 `text-2xl` bold, h3 `text-lg`
  semibold, h4 `text-sm` semibold, all uppercase, with letter spacing widening
  as the size drops.
- Labels (field labels, panel headings, plate labels) are small uppercase with
  wide tracking.

### Contrast (measured)

Measured in Chromium from the computed colours on the surface each ink sits on.

| Pairing                                                        | Ratio           |
| -------------------------------------------------------------- | --------------- |
| Body text and headings on the page                             | 9.53:1          |
| Captions, plate labels, placeholders, list numbers on the page | 4.77:1          |
| Brand text (panel headings, Detail summary, links) on the page | 4.96:1          |
| Field edge against the field and the page                      | 3.31:1          |
| Focus ring on the page / on charcoal                           | 4.96:1 / 4.55:1 |
| Primary button label on orange / on its hover fill             | 4.55:1 / 5.68:1 |
| Secondary/ghost label on the page                              | 4.96:1          |
| Text on the Casing or a Tile                                   | 9.53:1          |
| Muted text on the Casing                                       | 4.90:1          |
| Links, headings and ghost buttons on the Casing                | 4.55:1          |
| Warning tag text and label strip                               | 6.86:1          |
| Danger tag text                                                | 8.03:1          |
| Info / tip callout labels on their tints                       | 4.56:1 / 5.31:1 |

Left below AA on purpose:

- **Skeleton bars are 1.17:1** against the page: they are loading placeholders,
  meant to be quiet, and carry no information.
- **Disabled controls** are dimmed to 50% opacity (exempt from WCAG's contrast
  rule, and meant to recede).
- **Decorative frames** (hazard tape, rivets, girder, chevrons, the sampled
  orange in stripes) are hidden from assistive technology and carry no
  information. The light hazard tape's orange is `--color-brand-600`, 3.13:1.
- Unchecked checkboxes and radios are drawn by the browser; their outline
  isn't measured or claimed.

### Using the tokens

Load the tokens on your page (see [Part 2](#tokens-for-your-own-elements)) and
style your own elements with `var(--color-…)`, `var(--font-…)`. Never paste the
hex values; the token file is generated from the theme's single source.

Components declare the tokens inside their own shadow roots. Overriding a
token on `:root` restyles **your** elements but **not** the components. To
restyle a component, set the token **on the element**:
`theme-card { --color-brand-700: … }`.

**Dark areas of your own.** The text-role tokens (`--color-fg`,
`--color-fg-muted`, `--color-link`, `--color-link-hover`) read optional
`--theme-fg`, `--theme-fg-muted`, `--theme-link` and `--theme-link-hover`
overrides. Setting those on a container switches the **theme components**
inside it to light text, which is how `theme-casing` works. Your **own**
elements read the page-level tokens, which were resolved once on `:root`, so on
your own dark element set the role tokens directly as well:

```css
.my-dark-panel {
  background: var(--color-neutral-900);
  /* theme components inside */
  --theme-fg: var(--color-neutral-50);
  --theme-fg-muted: var(--color-neutral-300);
  --theme-link: var(--color-brand-500);
  --theme-link-hover: var(--color-brand-50);
  /* your own elements inside */
  --color-fg: var(--color-neutral-50);
  --color-fg-muted: var(--color-neutral-300);
  color: var(--color-fg);
}
```

### Recipes

A hazard-tape badge and a stencil label, using only tokens:

```css
.hazard-badge {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border: 2px solid var(--color-neutral-900);
  background: var(--color-neutral-50);
  box-shadow: inset 6px 0 0 0 var(--color-brand-500);
  font: 600 0.75rem/1.4 var(--font-mono);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-neutral-900);
}
.hazard-strip {
  height: 10px;
  background-image: var(--background-image-hazard);
}
.chamfered {
  background: var(--color-neutral-50);
  clip-path: polygon(
    12px 0,
    100% 0,
    100% calc(100% - 12px),
    calc(100% - 12px) 100%,
    0 100%,
    0 12px
  );
}
```

`clip-path` cuts away a border and a focus outline as well as the corners: for
an outlined chamfer, use the theme's frame components, or draw the fill on a
clipped `::before` layer as `theme-button` does.

### Do and don't

- **Do** use `theme-field` (or a `<label>`) for every form control.
- **Do** put dark content in `theme-casing` rather than restyling components.
- **Don't** put orange text, borders or focus rings straight on the page; use
  `--color-brand-700` or the link colour.
- **Don't** use hazard tape or caution yellow as decoration.
- **Don't** round panel corners; cut them.
- **Don't** rely on colour alone: the warning and danger tags also carry a label.

---

## 2. Package overview and usage

### What it is

`@tkottke90/theme-futuristic-industrial` is a library of **framework-agnostic
Web Components** built with [Lit](https://lit.dev). Each component is a custom
element with its own Shadow DOM and styles, so it works in plain HTML, Preact,
or any framework that renders DOM.

- Importing the package **registers every `theme-*` element** as a side effect.
- ESM (`dist/index.mjs`) and CommonJS (`dist/index.cjs`) builds, with types.
- **`lit` is a peer dependency** (`^3.2.0`) and is not bundled: install it
  alongside, and make sure your toolchain or import map can resolve `lit`.
- `@tkottke90/theme-futuristic-industrial/tokens.css` exports the design tokens
  as plain `:root` custom properties for styling your own elements.
- Designed for a **light page** (`--color-neutral-50`, `#eff2f7`).
- The font is **JetBrains Mono**, which the package doesn't load. Add it to your
  page head, or text falls back to the system monospace:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

### Components

The standard set:

| Tag                                             | What it is            | Attributes / properties                                                                                                                  |
| ----------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `theme-button`                                  | Button                | `label`, `variant` (`primary`, `secondary`, `ghost`), `disabled`, `type` (`button`, `submit`, `reset`), `aria-label`; or slot the text   |
| `theme-card`                                    | Main panel            | `heading`; slot content                                                                                                                  |
| `theme-container`                               | Plainer panel         | `as` (`div`, `ol`, `ul`; `ol` numbers its rows, `ul` uses each row's hazard tab as the bullet)                                           |
| `theme-item`                                    | List row              | `as` (`li`, `div`)                                                                                                                       |
| `theme-detail`                                  | Collapsible section   | `summary`; slot content                                                                                                                  |
| `theme-blockquote`                              | Callout               | `type` (`info`, `tip`, `question`, `success`, `warning`, `failure`, `danger`, `bug`, `example`, `quote`)                                 |
| `theme-heading`                                 | Heading               | `level` (1–4)                                                                                                                            |
| `theme-text`                                    | Body copy or caption  | `variant` (`body`, `caption`)                                                                                                            |
| `theme-link`                                    | Link                  | `href`                                                                                                                                   |
| `theme-field`                                   | Label above a control | `label`, `for`; slot the control                                                                                                         |
| `theme-input`                                   | Form control          | `type` (`text`, `email`, `password`, `number`, `checkbox`, `radio`), `name`, `value`, `placeholder`, `checked`, `disabled`, `aria-label` |
| `theme-select`                                  | Form control          | `name`, `value`, `disabled`, `aria-label`; `<option>` children                                                                           |
| `theme-textarea`                                | Form control          | `name`, `value`, `placeholder`, `rows`, `disabled`, `aria-label`                                                                         |
| `theme-skeleton-heading`, `theme-skeleton-text` | Loading placeholders  | `width`                                                                                                                                  |

This theme's extras:

| Tag                        | What it is                                         | Attributes / properties                                           |
| -------------------------- | -------------------------------------------------- | ----------------------------------------------------------------- |
| `theme-plate`              | ID/code readout                                    | `label`, `value`                                                  |
| `theme-hazard-container`   | Container framed in hazard tape                    | `as` (`div`, `ol`, `ul`), `variant` (`dark`, `light`)             |
| `theme-casing`             | The dark surface                                   | `heading`; slot content                                           |
| `theme-tab-panel`          | Panel with its heading in a raised tab             | `heading`; slot content                                           |
| `theme-conduit-panel`      | Double-ruled panel with a striped corner channel   | `heading`; slot content                                           |
| `theme-registration-frame` | Corner brackets and registration ticks, for media  | slot content                                                      |
| `theme-tile`               | Dark tile for an icon, status or number            | `plain` (drops the hatched corner); slot content                  |
| `theme-well`               | Recessed frame for icon buttons or a control group | slot the controls                                                 |
| `theme-bracket-rail`       | Orange rail down the left of a sidebar or callout  | slot content                                                      |
| `theme-girder`             | Truss band (decorative)                            | set its height with CSS (default 36px)                            |
| `theme-segmented-rule`     | Bars-and-slots divider (a separator)               | `orientation` (`horizontal`, `vertical`), `size` (px), `segments` |
| `theme-chevron-rule`       | Chevron divider (a separator)                      | `direction` (`right`, `left`, `down`, `up`), `size` (px)          |
| `theme-stripe-band`        | Solid block breaking into stripes (decorative)     | `size` (px), `solid` (0–1)                                        |
| `theme-bracket-tag`        | Inline code/ID label                               | `variant` (`square`, `flared`); slot the text                     |

Form controls are **form-associated**: inside a `<form>` they submit under
their `name`, reset with the form, follow `<fieldset disabled>`, fire `change`
from the element, and work with `<label for>` or a wrapping `<label>`. Radios
group by `name`. Each control forwards its accessible name (its `aria-label`,
else its `<label>`'s text) to the native element inside it; `theme-field`
names the control it wraps with its label, and stretches a text control to its
width; wrapping radios in an element, it names that element as a
`radiogroup`, so each radio keeps its own label. `theme-button` with
`type="submit"` or `type="reset"` acts on its form; an icon-only button needs
`aria-label`.

The frames redraw themselves whenever the element changes size, so put them in
flexible layouts freely.

### Vanilla (with a bundler)

```bash
npm install @tkottke90/theme-futuristic-industrial lit
```

```js
// main.js — once, at your entry point
import "@tkottke90/theme-futuristic-industrial"; // registers the elements
import "@tkottke90/theme-futuristic-industrial/tokens.css"; // tokens for your own CSS
```

```html
<body style="background: var(--color-neutral-50); color: var(--color-neutral-900)">
  <theme-card heading="Access request">
    <form id="access">
      <theme-field label="Operator ID">
        <theme-input name="operator" placeholder="OP-0000"></theme-input>
      </theme-field>
      <label><theme-input type="checkbox" name="escort" value="yes"></theme-input> Escort</label>
      <theme-button type="submit" label="Authorize"></theme-button>
    </form>
  </theme-card>
</body>
```

Set non-string values as **properties** from script, and listen for events on
the element:

```js
document.querySelector("theme-input[name=operator]").addEventListener("change", (e) => {
  console.log(e.target.value);
});
```

### Vanilla (no bundler)

Browsers need an import map to resolve `lit` and the packages Lit imports
internally. All seven entries are required:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@tkottke90/theme-futuristic-industrial/dist/tokens.css"
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
  src="https://cdn.jsdelivr.net/npm/@tkottke90/theme-futuristic-industrial/dist/index.mjs"
></script>
```

### Preact

Import once at your entry point, then use the tags directly in JSX. Preact
sets them as **properties**, so `checked={true}` and `rows={3}` arrive typed,
`onChange` receives the element's `change` event, and a native `<form>`
collects the controls' values on submit.

```jsx
import "@tkottke90/theme-futuristic-industrial";
import "@tkottke90/theme-futuristic-industrial/tokens.css";

export function Access() {
  return (
    <theme-casing heading="Reactor control">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log([...new FormData(e.currentTarget)]);
        }}
      >
        <theme-field label="Operator ID">
          <theme-input name="operator" onChange={(e) => console.log(e.target.value)} />
        </theme-field>
        <theme-button type="submit" label="Authorize" />
      </form>
    </theme-casing>
  );
}
```

**TypeScript.** Declare the custom tags once (for example in
`src/theme-futuristic-industrial.d.ts`):

```ts
import type {
  ThemeButton,
  ThemeCasing,
  ThemeField,
  ThemeInput,
} from "@tkottke90/theme-futuristic-industrial";

type ThemeProps<T> = preact.JSX.HTMLAttributes<HTMLElement> &
  Partial<Omit<T, keyof HTMLElement>> & { style?: preact.JSX.CSSProperties | string };

declare module "preact" {
  namespace JSX {
    interface IntrinsicElements {
      "theme-button": ThemeProps<ThemeButton>;
      "theme-casing": ThemeProps<ThemeCasing>;
      "theme-field": ThemeProps<ThemeField>;
      "theme-input": ThemeProps<ThemeInput>;
      // …add the other theme-* tags you use the same way
    }
  }
}
```

### Tokens for your own elements

`@tkottke90/theme-futuristic-industrial/tokens.css` defines every design token
on `:root`: the neutrals (`--color-neutral-*`), the control edge
(`--color-border-strong`), the text roles (`--color-fg`, `--color-fg-muted`,
`--color-link`, `--color-link-hover`), the brand oranges (`--color-brand-*`),
caution yellow (`--color-caution-500`), the status `--color-*-500` set,
skeleton colours, `--font-sans` and `--font-mono`, `--radius-theme`,
`--shadow-plate` and the hazard stripes (`--background-image-hazard`). It
contains tokens only, no resets or utility classes, so it is safe to load on
any page. For dark areas of your own, see
[Using the tokens](#using-the-tokens).
