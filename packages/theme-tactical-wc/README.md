# @tkottke90/theme-tactical-wc

A HUD-inspired component theme built as framework-agnostic Web Components with
[Lit](https://lit.dev). It is dark by default: a near-black ground, cyan glow
accents, tracked uppercase labels, monospace readouts, and resizable SVG panel
frames (a tab-and-chevron outline on Card and Stat, a tab-notch-and-bracket
frame on Viewfinder). A light mode follows the OS setting or an explicit
`data-theme`. It works in any project, with or without a framework.

![Demo page for @tkottke90/theme-tactical-wc](./docs/screenshot.png)

> The screenshot is generated: run `npm run build-storybook`, then
> `npm run screenshot`. It shows the dark `Demo` story as it looks when the
> story loads; the light version is the `Demo` story's **Light** variant.

## Usage

```
npm install @tkottke90/theme-tactical-wc lit
```

```js
import "@tkottke90/theme-tactical-wc";
```

```html
<theme-card heading="Status">
  <theme-stat label="System Status" value="1565"></theme-stat>
  <theme-progress label="Signal" value="65"></theme-progress>
  <theme-gauge label="Power" value="72"></theme-gauge>
</theme-card>

<theme-viewfinder heading="Target lock">Locked on contact 07.</theme-viewfinder>
```

`lit` is a peer dependency so every theme package in this repo shares a
single copy of it.

To style your own elements with the theme's colours and fonts, load the design
tokens on your page:

```js
import "@tkottke90/theme-tactical-wc/tokens.css";
```

**For AI agents and anyone extending the theme:** [`AGENTS.md`](./AGENTS.md)
(shipped with the package) has the style guide and usage for vanilla and
Preact projects.

## Light / dark mode

The theme is dark by default and follows the OS/browser `prefers-color-scheme`
setting whenever nothing overrides it. To override it, set `data-theme="light"`
or `data-theme="dark"` **directly on each `theme-*` element** you want to
change, e.g. `<theme-card data-theme="light">`. See the **Light** stories on
Card, Stat, Gauge, Viewfinder and the Demo for a live example.

This per-element requirement (rather than one attribute on `<html>`) is a
Shadow DOM constraint, not a choice: a `data-theme` set on an ancestor outside a
component's shadow tree does not cascade into it. Set it on your own page
wrapper as well, so your own elements (which read the tokens from `tokens.css`)
change with the components. The React variant of this theme
(`@tkottke90/theme-tactical-react`) has no such limitation: there `data-theme`
can be set once on any ancestor and it cascades normally.

## Fonts

The theme uses system font stacks only (`ui-sans-serif, system-ui, …` and
`ui-monospace, …`), so there is nothing to load. The components are designed
for the tactical page background: `--color-bg` (a near-black in dark mode,
`#eef5f7` in light mode).

## Components

`theme-button`, `theme-input`, `theme-textarea`, `theme-select`, `theme-card`,
`theme-heading`, `theme-text`, `theme-link`, `theme-container`, `theme-item`,
`theme-field`, `theme-detail`, `theme-blockquote` (10 types),
`theme-skeleton-heading` and `theme-skeleton-text`, plus the theme-specific
elements below.

| Element            | What it is                                                 | Attributes               |
| ------------------ | ---------------------------------------------------------- | ------------------------ |
| `theme-stat`       | Large numeric readout in a HUD frame                       | `label`, `value`, `unit` |
| `theme-progress`   | Segmented bar meter (`role="progressbar"`, named by label) | `label`, `value`, `max`  |
| `theme-gauge`      | Radial gauge (`role="meter"`, named by label)              | `label`, `value`, `max`  |
| `theme-viewfinder` | Panel framed with a tab notch and corner brackets          | `heading`; slot content  |

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
  <theme-field label="Email">
    <theme-input name="email" type="email"></theme-input>
  </theme-field>
  <label><theme-input type="checkbox" name="news" value="yes"></theme-input> Newsletter</label>
  <theme-select name="plan" aria-label="Plan"
    ><option>Starter</option>
    <option>Team</option></theme-select
  >
  <theme-button type="submit" label="Send"></theme-button>
</form>
```

**Migrating:** `theme-input`, `theme-select` and `theme-textarea` no longer read
an `accessible-label` attribute; use `aria-label` instead. `theme-field` still
names its control for you. `theme-button` likewise uses `aria-label`, and
`type="submit"` / `type="reset"` to submit or reset its form.

This behaviour comes from the shared `FormControlElement` and `FieldElement`
base classes (see `docs/adr/0002-shared-wc-core.md`). Restyle the controls;
don't reimplement the base.

## Local development

```
npm run generate         # src/generated/: compiled theme styles + shared WC base classes
npm run build            # esbuild -> dist/{index.mjs,index.cjs,*.d.ts,tokens.css}
npm test                 # jest + jsdom
npm run storybook        # preview components
npm run build-storybook  # static Storybook, used by the screenshot
npm run screenshot       # regenerate docs/screenshot.png
```

Tokens live in `themes/tactical/theme.css` (light/dark overrides in
`theme-modes.css`); component styles are compiled from them, never
hand-copied.
