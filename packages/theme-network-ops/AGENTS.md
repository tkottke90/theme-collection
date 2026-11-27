# AGENTS.md — @tkottke90/theme-network-ops

Guidance for AI agents (and people) who **use** this package, or who need to
build UI that matches it. It has two parts:

1. [Style guide](#1-style-guide): the design rules, so you can style elements
   this package doesn't include and have them belong.
2. [Package overview and usage](#2-package-overview-and-usage): what ships, and
   how to use it.

If you are working on this package's source inside its monorepo, also follow
the repository's root `AGENTS.md` and `CONTRIBUTING.md`.

---

## 1. Style guide

### The idea in one paragraph

A network-operations dashboard at night. The page is near-black
(`--color-bg`) and everything on it is a slightly lighter slab
(`--color-surface`, then `--color-surface-alt` for things inside a slab),
outlined by a 1px border; depth comes from those steps, never from shadows.
Ink is near-white with a grey-blue muted tone. Coral (`--color-brand-500`)
is the signal colour: the primary action, and alerts. Indigo
(`--color-accent-*`) is the quiet colour: links, focus and checked controls.
Values (addresses, thresholds) are set in monospace.

### Rules

1. **Colour roles.** Coral is for the primary button, the glow button and
   danger callouts only; hover darkens it to `--color-brand-600`. Indigo is
   for links (`--color-accent-400`), focus rings and checked controls
   (`--color-accent-500`), and pressed links (`--color-accent-600`). Never use
   coral for decoration, so it keeps meaning "act now".
2. **Surfaces.** Page `--color-bg`; panels (card, details) `--color-surface`;
   things inside a panel (items, inputs) `--color-surface-alt`. Every panel
   and control has a 1px `--color-border`. Text on a surface is
   `--color-text` or `--color-text-muted`.
3. **Shape.** Panels use `--radius-theme` (0.75rem); controls and items use
   `--radius-theme-sm` (0.5rem). The only shadow is `--shadow-glow`, a coral
   halo on `.theme-button--glow`, used at most once per panel for the
   critical action.
4. **States.** Focus is always visible: a 2px `--color-accent-400` outline
   offset 2px (inside the box for `<summary>`, which sits in a clipped panel),
   and on text fields an indigo border plus a 1px ring. Disabled is flat:
   `--color-surface-alt` fill (page colour for fields) with muted ink and a
   not-allowed cursor; outlined buttons lose their coral border. Invalid is
   a `--color-failure-500` border and ring. Status colours
   (`--color-<type>-500`, ten types) are for callouts only, and always come
   with a text label.
5. **Type.** `--font-sans` (Inter) for text and `--font-mono` for values and
   code. Headings are 600 weight (h1 700) on a 2.5 / 1.5 / 1.125 / 1rem
   scale; h5/h6 are 0.8125rem uppercase muted labels. Body is 0.9375rem at 1.5
   line height; small text is 0.8125rem, muted.
6. **Motion.** Only the skeleton shimmer moves, and it stops under
   `prefers-reduced-motion`.
7. **Contrast.** Measured in Chromium from the resolved tokens, on the surface
   each ink sits on. Body text, headings, links, placeholders, disabled
   buttons and the seven other blockquote labels meet WCAG AA (4.5:1).
   **These do not**, and are not claimed:
   - `--color-text` on `--color-brand-500` (primary and glow buttons): 3.41:1.
     On hover (`--color-brand-600`) it is 4.64:1.
   - Secondary and ghost buttons (coral ink): 5.0:1 on the page, but 4.45:1 on
     a card (`--color-surface`) and 3.98:1 on `--color-surface-alt`. Their
     hover wash lowers it further, to 3.4–4.4:1 depending on the surface.
   - `.theme-blockquote__label` on its tinted background: `--danger` 3.77:1,
     `--example` 3.35:1, `--quote` 4.18:1.
   - A field's 1px `--color-border` against its `--color-surface-alt` fill is
     1.12:1, below the 3:1 WCAG asks of a control's boundary. The text and
     the focus ring (3.57:1) are fine.

   Fixing these means changing tokens, which is a separate decision.

### Using the tokens

`dist/index.css` puts every token on `:root` as a custom property (inside
`@layer theme`). Style your own elements with `var(--color-surface)`,
`var(--font-sans)` and `var(--radius-theme)`; never paste hex values, since
the tokens are compiled from the theme's single source
(`themes/theme-network-ops/theme.css`). The ones an outside element needs:
`--color-bg`, `--color-surface`, `--color-surface-alt`, `--color-border`,
`--color-text`, `--color-text-muted`, `--color-brand-500`/`-600`,
`--color-accent-400`/`-500`/`-600`, the `--color-<type>-500` status colours,
`--font-sans`, `--font-mono`, `--radius-theme`, `--radius-theme-sm` and
`--shadow-glow`.

---

## 2. Package overview and usage

### What it is

`@tkottke90/theme-network-ops` is a **CSS-only** theme: one stylesheet,
`dist/index.css`, with the tokens on `:root` and a set of `theme-*` classes
for native HTML elements. There is no JavaScript, so it works with any
framework or none. It sets `color-scheme: dark` and styles `body` (page
background, text colour, font), and styles `h1`–`h6`, `p`, `a`, `small`,
`code`, `pre` and `kbd` as elements, with no class.

```js
import "@tkottke90/theme-network-ops"; // with a bundler
```

```html
<!-- or without one -->
<link rel="stylesheet" href="node_modules/@tkottke90/theme-network-ops/dist/index.css" />
```

Add Inter yourself (the package doesn't load it; without it text falls back
to the system sans-serif):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

### Classes

| Class                                             | Use on                  | Modifiers / parts                                                                                                              |
| ------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `.theme-button`                                   | `<button>`              | `--secondary`, `--ghost`, `--glow`; `disabled`                                                                                 |
| `.theme-card`                                     | any block               | `__title`, `__body`                                                                                                            |
| `.theme-container`                                | `<div>`, `<ul>`, `<ol>` | vertical stack; removes list markers, so an `<ol>` shows no numbers                                                            |
| `.theme-item`                                     | `<div>`, `<li>`         | goes inside a container                                                                                                        |
| `.theme-details`                                  | `<details>`             | `__body` on the content after `<summary>`                                                                                      |
| `.theme-blockquote`                               | `<blockquote>`          | `--info`, `--tip`, `--question`, `--success`, `--warning`, `--failure`, `--danger`, `--bug`, `--example`, `--quote`; `__label` |
| `.theme-field`                                    | `<div>`, `<fieldset>`   | styles its `<label>`/`<legend>`; stacks label over control                                                                     |
| `.theme-field-label`                              | `<label>`               | wraps one checkbox or radio plus its text                                                                                      |
| `.theme-input`                                    | `<input>`               | text-like types; add `.theme-select` on `<select>`, `.theme-textarea` on `<textarea>`                                          |
| `.theme-checkbox`, `.theme-radio`, `.theme-range` | `<input>` of that type  | standalone, painted with `accent-color`                                                                                        |
| `.theme-skeleton-heading`, `.theme-skeleton-text` | empty `<div>`           | place by hand                                                                                                                  |
| `.theme-text-small`                               | `<span>`, `<p>`         | same as `<small>`                                                                                                              |

`.theme-select` and `.theme-textarea` do not draw a box themselves: always
combine them with `.theme-input` (`class="theme-input theme-select"`).

### Forms

The form controls are **native elements**, so a `<form>` works unchanged:
give each control a `name`, label it with `<label for>`/`id` or a wrapping
`.theme-field-label`, group checkboxes or radios that share a `name` in a
`<fieldset class="theme-field">` with a `<legend>`, and use
`<fieldset disabled>` to disable a group. There is nothing to register or
upgrade. Mark server-side errors with `aria-invalid="true"` and point
`aria-describedby` at a `<small>` message.

```html
<form>
  <div class="theme-field">
    <label for="host">Hostname</label>
    <input class="theme-input" type="text" id="host" name="hostname" required />
  </div>
  <div class="theme-field">
    <label for="service">Service</label>
    <select class="theme-input theme-select" id="service" name="service">
      <option value="nginx">Nginx</option>
      <option value="mysql">MySQL</option>
    </select>
  </div>
  <label class="theme-field-label">
    <input class="theme-checkbox" type="checkbox" name="alert" value="yes" /> Alert on breach
  </label>
  <button class="theme-button" type="submit">Save</button>
</form>
```

### A dashboard panel in plain HTML

```html
<section class="theme-card">
  <h2 class="theme-card__title">Hosts</h2>
  <ul class="theme-container">
    <li class="theme-item">Nginx · 10.23.43.324 · Healthy</li>
    <li class="theme-item">Couchbase · 10.23.84.44 · Degraded</li>
  </ul>
  <blockquote class="theme-blockquote theme-blockquote--warning">
    <span class="theme-blockquote__label">Warning</span>
    <p>Couchbase latency is rising.</p>
  </blockquote>
  <button class="theme-button theme-button--glow" type="button">Acknowledge alert</button>
</section>
```
