# @tkottke90/theme-pixel-quest

A Web Component theme (Lit) that looks like a pixel-art RPG character sheet:
a parchment page, panels outlined in near-black with pixel-stepped round
corners, dark forest-green badges ringed in gold, a pixel bitmap face for
titles and a slab typewriter face for labels. It also ships the sheet's stat
meter and its outer page frame.

![Demo page for @tkottke90/theme-pixel-quest](./docs/screenshot.png)

> The screenshot is generated: run `npm run screenshot` after
> `npm run build-storybook`. The `Demo` story comes first, then each
> component's intro and its stories.

## Usage

```
npm install @tkottke90/theme-pixel-quest lit
```

```js
import "@tkottke90/theme-pixel-quest";
```

```html
<theme-card heading="Today's stats">
  <theme-stat-meter label="Energy" sublabel="How much you can do" value="6" max="10">
  </theme-stat-meter>
</theme-card>
<theme-button label="Start quest"></theme-button>
```

`lit` is a peer dependency so every theme package in this repo shares a
single copy of it.

To style your own elements with the theme's colours and fonts, load the design
tokens on your page:

```js
import "@tkottke90/theme-pixel-quest/tokens.css";
```

**For AI agents and anyone extending the theme:** [`AGENTS.md`](./AGENTS.md)
(shipped with the package) has the full style guide and usage for vanilla and
Preact projects.

### Fonts

The theme uses three Google Fonts: [Pixelify Sans](https://fonts.google.com/specimen/Pixelify+Sans)
for banner headings, [Courier Prime](https://fonts.google.com/specimen/Courier+Prime)
for headings, labels and buttons, and [Inter](https://fonts.google.com/specimen/Inter)
for body copy and form controls. Add them to your page head; without them the
stacks fall back to system monospace and sans-serif fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Inter:wght@400;600;700&family=Pixelify+Sans:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

The components are designed for a parchment page (`--color-bg`, `#e8cfa0`).

## Components

The standard set: `theme-button`, `theme-input`, `theme-textarea`,
`theme-select`, `theme-card`, `theme-heading` (with a `banner` variant),
`theme-text`, `theme-link`, `theme-container`, `theme-item`, `theme-field`,
`theme-detail`, `theme-blockquote` (10 types), `theme-skeleton-heading`, and
`theme-skeleton-text`.

Theme-specific extras:

| Element            | What it is                                                                                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `theme-stat-meter` | Icon, label and sublabel, a pixel-framed progress bar and a `value/max` readout. `label`, `sublabel`, `value`, `max`; slot `icon` an SVG; CSS `--stat-meter-label-width` lines stacked meters up |
| `theme-page-frame` | The sheet's outer border: a near-black edge with a gold pinstripe around a padded parchment page. Wrap a whole page in it, once                                                                  |

`theme-stat-meter`'s bar is a `meter` named by `label`, so screen readers
announce it as, for example, "Energy, meter, 6 of 10".

### Forms

`theme-input`, `theme-select` and `theme-textarea` are form-associated custom
elements: inside a `<form>` they submit under their `name`, reset with the
form, follow `<fieldset disabled>`, and fire `change` from the host. They're
labelable, so both `<label for="id">` and a wrapping `<label>` work, including
toggling a checkbox or radio by clicking the label text. Radios with the same
`name` form a group.

Each control passes its accessible name to the native element inside it, so
screen readers announce the label: from `aria-label` on the element, or from
its `<label>`. `theme-field` names the control it wraps with its own label
(unless the control already has a name) and focuses it when the label is
clicked. Wrapping radios, it labels their group instead: put the radios in an
element (a `<div>`) and the field names that element as a `radiogroup`, so
each radio keeps its own label.

```html
<form>
  <theme-field label="Hero name">
    <theme-input name="hero"></theme-input>
  </theme-field>
  <label
    ><theme-input type="checkbox" name="hardcore" value="yes"></theme-input> Hardcore mode</label
  >
  <theme-select name="class" aria-label="Class"
    ><option>Warrior</option>
    <option>Mage</option></theme-select
  >
</form>
```

`theme-button` is a plain button, not a form control: it doesn't submit a
form on its own. Call `form.requestSubmit()` from its click handler.

**Migrating:** the form controls no longer read an `accessible-label`
attribute; use `aria-label` instead (or a `<label>`, or `theme-field`).
`theme-button` keeps `accessible-label` for now.

## Local development

```
npm run generate         # src/generated/: compiled theme styles + shared WC base classes
npm run build            # esbuild -> dist/{index.mjs,index.cjs,*.d.ts,tokens.css}
npm test                 # jest + jsdom
npm run storybook        # preview components
npm run build-storybook  # static Storybook, used by the screenshot
npm run screenshot       # regenerate docs/screenshot.png
```

Tokens live in `themes/pixel-quest/theme.css`; component styles are compiled
from them, never hand-copied.
