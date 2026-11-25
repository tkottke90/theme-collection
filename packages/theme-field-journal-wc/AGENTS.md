# AGENTS.md — @tkottke90/theme-field-journal-wc

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

An explorer's leather-bound field journal lying open on a green table. The
interface is four layers, from back to front: the dark green **table**, the
brown **leather** book, the cream **parchment** pages, and **hand-placed
items** (ribbons, cards, taped sketches, notes) lying on the parchment. It is
warm and muted: brown ink, never black; hairline rules and soft warm shadows,
never glossy or neon; texture from paper grain, never flat white.

### Rules

1. **Layer, don't flatten.** Put things on the layer they belong to: the table
   is only a page backdrop, pages go inside a `theme-journal-book`, and
   everything else sits on a `theme-journal-page`. Don't put a card straight
   on the table.
2. **Brown ink.** Text is `--color-text` (`#4a3423`); secondary text and
   labels are `--color-text-muted`. Never `#000`, never grey. Light text
   (`--text-on-dark`, a cream) is only for the table, leather tabs, ribbons
   and the primary button.
3. **One accent for actions.** `--color-brand-500` (a faded red) marks links,
   the primary button, section titles in a `theme-detail` and focus rings.
   Don't add a second action colour.
4. **Category colours name sections.** Red, blue, tan, green, purple and
   orange (`--red`, `--blue`, `--tan`, `--green`, `--purple`, `--orange`) are
   one per section: the tab, its ribbon and its quest cards share a colour.
   Behind light text use the darkened `--tan-dark`, `--green-dark` and
   `--orange-dark`, never the plain swatch. Don't use a category colour for
   status; the status `--color-{info,tip,…}-500` tokens do that.
5. **Soft, nearly square corners.** `--radius-theme` (3px) for surfaces,
   `--radius-tab` for tabs, `--radius-book` only for the cover. No pills.
6. **Hairlines and warm shadows.** Borders are 1px `--color-border` (tan).
   Shadows are `--shadow-card` (low, brown); only the book gets
   `--shadow-book`. No cool-grey shadows, no outlines thicker than 2px.
7. **Grain on surfaces.** Cards and fields sit on `--grain-soft` over their
   cream; the leather and the tabs use `--grain`; the parchment page draws its own grain with SVG filters. Layer it:
   `background: var(--grain-soft), var(--color-surface-alt)`. Don't use
   `--grain` on a light surface: it turns cream grey.
8. **Three typefaces.** `--font-head` (IM Fell English) for page titles,
   `--font-title` (IM Fell English SC, small caps) for labels, tabs, ribbons
   and buttons, `--font-sans` (EB Garamond) for body, and `--font-hand`
   (Caveat) only for handwriting: captions on taped sketches and notes. Don't
   set body text in the hand font.
9. **Focus is a 2px outline.** Brand red, offset 1px, on every field. Tabs use
   a cream outline because they are dark. Don't remove an outline; if you
   put a focusable element inside a clipped element (`clip-path`), check in
   a screenshot that the ring isn't cut off.
10. **Contrast, measured.** Figures below are WCAG ratios computed from the
    resolved token values (grain ignored) on the surface each ink sits on.
    AA needs 4.5:1 for normal text.

    | Ink on surface                                                                     | Ratio                             |
    | ---------------------------------------------------------------------------------- | --------------------------------- |
    | Body text on card / on page                                                        | 9.8 / 9.0                         |
    | Muted text on card / on page                                                       | 4.9 / 4.5                         |
    | Placeholder (muted) on a field's fill                                              | 4.9                               |
    | Link, brand on page / hover on page                                                | 4.6 / 6.3                         |
    | Primary button label on brand / on hover                                           | 5.0 / 6.8                         |
    | Secondary and ghost label on page                                                  | 4.6                               |
    | Tab or ribbon label on the flat colour: red / blue / tan / green / purple / orange | 5.0 / 4.5 / 5.2 / 5.5 / 5.0 / 5.3 |
    | Completed task green on card                                                       | 5.5                               |
    | Blockquote label on its tint: info / tip / question / success / warning            | 5.0 / 4.6 / 5.1 / 5.4 / 5.2       |
    | Blockquote label: failure / danger / bug / example / quote                         | 5.6 / 5.1 / 4.8 / 4.8 / 5.1       |
    | Blockquote panel against the page (not text): lowest / highest                     | 1.14 / 1.28                       |

    Tab and ribbon gradients start at the flat category colour and darken
    from there, so the flat figure is their lightest point; the blue label is
    the tightest at 4.5. Blockquote panels are the type's colour at 22% over the card
    cream (the pale bug and example hues use 26% and 24% so they read as
    panels at all); labels are that colour blended into the body brown (55%
    colour; bug and example use 35% and 40% to pass), while the left border
    keeps the pure colour, and the other three edges get a 1px border
    halfway between the panel tint and the pure colour, so the panel lifts off
    the page. A darker panel lowers the text's contrast, so
    raise the panel tint and the label blend together and re-measure.

    **Known gaps (not claimed as AA).**

    - **Disabled buttons** (muted on `--color-neutral-100`) measure 3.9.
      Disabled controls are exempt from WCAG's contrast rule, but they are
      visibly different from enabled ones, which is the point.
    - There is no `forced-colors` (Windows High Contrast) fallback.

### Using the tokens

Load the tokens on your page (see [Part 2](#tokens-for-your-own-elements)) and
style your own elements with `var(--color-…)`, `var(--font-…)`. Never paste the
hex values; the token file is generated from the theme's single source.

Components declare the tokens inside their own shadow roots. Overriding a
token on `:root` restyles **your** elements but **not** the components. To
restyle a component, set the token **on the element**:
`theme-button { --color-brand-500: … }`.

### Do and don't

- **Do** use `theme-field` (or a `<label>`) for every form control.
- **Do** give each section one category colour and reuse it for its tab,
  ribbon and quest cards.
- **Do** leave room on the left of the book for its tabs, which stick out
  about 92px.
- **Don't** use plain `<h1>`–`<h6>` for page titles; `theme-heading` carries the type scale.
- **Don't** rely on colour alone for meaning: quest cards also say
  "Active"/"Done".

A small example, a margin tag for your own element:

```css
.margin-tag {
  font: 0.8125rem var(--font-title);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-on-dark);
  background: var(--grain), var(--tan-dark);
  border-radius: var(--radius-theme-sm);
  padding: 0.125rem 0.5rem;
}
```

---

## 2. Package overview and usage

### What it is

`@tkottke90/theme-field-journal-wc` is a library of **framework-agnostic Web
Components** built with [Lit](https://lit.dev). Each component is a custom
element with its own Shadow DOM and styles, so it works in plain HTML, Preact,
or any framework that renders DOM.

- Importing the package **registers every `theme-*` element** as a side effect.
- ESM (`dist/index.mjs`) and CommonJS (`dist/index.cjs`) builds, with types.
- **`lit` is a peer dependency** (`^3.2.0`) and is not bundled: install it
  alongside, and make sure your toolchain or import map can resolve `lit`.
- `@tkottke90/theme-field-journal-wc/tokens.css` exports the design tokens as
  plain `:root` custom properties for styling your own elements.
- Designed to sit on the **green table** (`--color-bg`, usually with a radial
  gradient and `--grain`), with the book on it.
- **Fonts are not bundled.** Add these to your `<head>`, or components fall
  back to Georgia and a system cursive:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=IM+Fell+English+SC&family=EB+Garamond:wght@400;500;600&family=Caveat:wght@500&display=swap"
  rel="stylesheet"
/>
```

### Components

| Tag                                             | What it is                 | Attributes / properties                                                                                                          |
| ----------------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `theme-button`                                  | Leather-tab button         | `label`, `variant` (`primary`, `secondary`, `ghost`), `disabled`, `type` (`button`, `submit`, `reset`), `aria-label`             |
| `theme-card`                                    | Cream content surface      | `heading`; slot content                                                                                                          |
| `theme-container`                               | Panel wrapper              | `as` (`div`, `ol`, `ul`)                                                                                                         |
| `theme-item`                                    | List row                   | `as` (`li`, `div`)                                                                                                               |
| `theme-detail`                                  | Collapsible section        | `summary`; slot content                                                                                                          |
| `theme-blockquote`                              | Callout                    | `type` (`info`, `tip`, `question`, `success`, `warning`, `failure`, `danger`, `bug`, `example`, `quote`)                         |
| `theme-heading`                                 | Heading                    | `level` (1–4)                                                                                                                    |
| `theme-text`                                    | Body copy or caption       | `variant` (`body`, `caption`)                                                                                                    |
| `theme-link`                                    | Link                       | `href`                                                                                                                           |
| `theme-field`                                   | Label above a control      | `label`, `for`; slot the control                                                                                                 |
| `theme-input`                                   | Form control               | `type` (`text`, `email`, `password`, `number`, `checkbox`, `radio`), `name`, `value`, `placeholder`, `checked`, `disabled`       |
| `theme-select`                                  | Form control               | `name`, `value`, `disabled`; `<option>` children                                                                                 |
| `theme-textarea`                                | Form control               | `name`, `value`, `placeholder`, `rows`, `disabled`                                                                               |
| `theme-skeleton-heading`, `theme-skeleton-text` | Loading placeholders       | `width`                                                                                                                          |
| `theme-journal-book`                            | The leather cover and tabs | `tabs` (property, array of `{ id, label, color, icon }`), `selected`, `label`; slots `left`, `right`; event `journal-tab-change` |
| `theme-journal-page`                            | A parchment page           | `side` (`left`, `right`); `--page-padding`                                                                                       |
| `theme-ribbon`                                  | Notched section banner     | `color` (`red`, `blue`, `tan`, `green`, `purple`, `orange`)                                                                      |
| `theme-quest-card`                              | Quest with pennant         | `heading`, `location`, `description`, `status` (`active`, `done`), `favorite`, `color`, `icon`, `tasks` (property)               |
| `theme-progress`                                | Pressed-in progress track  | `label`, `value`, `max`                                                                                                          |
| `theme-taped`                                   | Taped-in sketch or photo   | `tilt` (`l`, `r`, `none`), `caption`; slot the image                                                                             |
| `theme-notes`                                   | Ruled handwritten note     | `heading`; slot the text                                                                                                         |
| `theme-divider`                                 | Ornamental divider         | none                                                                                                                             |

Form controls are **form-associated**: inside a `<form>` they submit under
their `name`, reset with the form, follow `<fieldset disabled>`, fire `change`
from the element, and work with `<label for>` or a wrapping `<label>`. Radios
group by `name`. Each control forwards its accessible name (its `aria-label`,
else its `<label>`'s text) to the native element inside it; `theme-field`
names the control it wraps with its label; wrapping radios in an element, it
names that element as a `radiogroup`, so each radio keeps its own label.

The form controls no longer read an `accessible-label` attribute; use
`aria-label`, as does `theme-button`. `theme-button` is form-associated too:
`type="submit"` submits its form, `type="reset"` resets it, and no `type`
does neither.

**Pairing rules.** A `theme-journal-book` holds two `theme-journal-page`s, one
in `slot="left"` and one in `slot="right"`; switching tabs is your job: listen
for `journal-tab-change` and re-slot a different pair (see the demo story).
`theme-ribbon`, a tab and a `theme-quest-card` pennant take the same `color`
enum. `theme-quest-card`'s `tasks` is `{ label, done?, count? }[]`, set as a
property. Set `tabs` as a property too; an attribute can't carry an array.

### Vanilla (with a bundler)

```bash
npm install @tkottke90/theme-field-journal-wc lit
```

```js
// main.js — once, at your entry point
import "@tkottke90/theme-field-journal-wc"; // registers the elements
import "@tkottke90/theme-field-journal-wc/tokens.css"; // tokens for your own CSS
```

```html
<body style="margin: 0; padding: 2rem 2rem 2rem 7rem; background: var(--color-bg)">
  <theme-journal-book id="book" selected="quests">
    <theme-journal-page slot="left" side="left">
      <theme-heading level="1">Field Journal</theme-heading>
      <theme-divider></theme-divider>
    </theme-journal-page>
    <theme-journal-page slot="right" side="right">
      <form id="find">
        <theme-field label="Name">
          <theme-input name="name"></theme-input>
        </theme-field>
        <label><theme-input type="checkbox" name="keep" value="yes"></theme-input> Keep it</label>
        <theme-button type="submit" label="Log it"></theme-button>
      </form>
    </theme-journal-page>
  </theme-journal-book>
</body>
```

```js
const book = document.getElementById("book");
book.tabs = [
  { id: "quests", label: "Quests", color: "red", icon: "quest" },
  { id: "places", label: "Places", color: "blue", icon: "pin" },
];
book.addEventListener("journal-tab-change", (e) => console.log(e.detail.id));
```

Set non-string values (`tabs`, `tasks`) as **properties** from script, and
listen for events on the element.

### Vanilla (no bundler)

Browsers need an import map to resolve `lit` and the packages Lit imports
internally. All seven entries are required:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@tkottke90/theme-field-journal-wc/dist/tokens.css"
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
  src="https://cdn.jsdelivr.net/npm/@tkottke90/theme-field-journal-wc/dist/index.mjs"
></script>
```

### Preact

Import once at your entry point, then use the tags directly in JSX. Preact
sets them as **properties**, so `tabs` and `tasks` arrive as arrays, `onChange`
receives the element's `change` event, and a native `<form>` collects the
controls' values on submit.

```jsx
import "@tkottke90/theme-field-journal-wc";
import "@tkottke90/theme-field-journal-wc/tokens.css";

const TABS = [
  { id: "quests", label: "Quests", color: "red", icon: "quest" },
  { id: "places", label: "Places", color: "blue", icon: "pin" },
];

export function Journal() {
  return (
    <theme-journal-book tabs={TABS} selected="quests">
      <theme-journal-page slot="left" side="left">
        <theme-heading level={1}>Field Journal</theme-heading>
      </theme-journal-page>
      <theme-journal-page slot="right" side="right">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log([...new FormData(e.currentTarget)]);
          }}
        >
          <theme-field label="Name">
            <theme-input name="name" onChange={(e) => console.log(e.target.value)} />
          </theme-field>
          <button type="submit">Log it</button>
        </form>
      </theme-journal-page>
    </theme-journal-book>
  );
}
```

**Don't name an attribute `on…`:** Preact treats any such prop as an event
listener. (None of this package's attributes do.)

**TypeScript.** Declare the custom tags once (for example in
`src/theme-field-journal-wc.d.ts`):

```ts
import type {
  ThemeField,
  ThemeHeading,
  ThemeInput,
  ThemeJournalBook,
  ThemeJournalPage,
} from "@tkottke90/theme-field-journal-wc";

type ThemeProps<T> = preact.JSX.HTMLAttributes<HTMLElement> &
  Partial<Omit<T, keyof HTMLElement>> & { style?: preact.JSX.CSSProperties | string };

declare module "preact" {
  namespace JSX {
    interface IntrinsicElements {
      "theme-field": ThemeProps<ThemeField>;
      "theme-heading": ThemeProps<ThemeHeading>;
      "theme-input": ThemeProps<ThemeInput>;
      "theme-journal-book": ThemeProps<ThemeJournalBook>;
      "theme-journal-page": ThemeProps<ThemeJournalPage>;
      // …add the other theme-* tags you use the same way
    }
  }
}
```

Type a `tabs` array with the exported `JournalTab` (`const TABS: JournalTab[] = …`),
or its `color` widens to `string` and doesn't match the colour enum.

### Tokens for your own elements

`@tkottke90/theme-field-journal-wc/tokens.css` defines every design token on
`:root`:

- **Baseline schema:** `--color-bg`, `--color-surface`, `--color-surface-alt`,
  `--color-border`, `--color-brand-*`, `--color-neutral-*`, `--color-text`,
  `--color-text-muted`, the status `--color-*-500` set, the skeleton colours,
  `--font-sans`, `--font-title`, `--font-head`, `--font-hand`, the radii and
  `--shadow-*`.
- **Journal literals:** the table (`--table*`), leather (`--leather*`,
  `--stitch`), paper and card (`--paper*`, `--card*`), ink (`--ink*`), the six
  category colours and their `-dark` variants, `--favorite`, `--text-on-dark`,
  `--tape`, and the grain textures `--grain` and `--grain-soft`.

It contains tokens only, no resets or utility classes, so it is safe to load
on any page.
