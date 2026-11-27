# AGENTS.md — @tkottke90/theme-forest-isle

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

A cottage-island journal. The page is warm sand (`--color-bg`) and
everything on it is a parchment card (`--color-surface`) lifted by one soft,
warm shadow; things inside a card sit on a slightly darker parchment
(`--color-surface-alt`). Shapes are generous and round: 1rem corners on
surfaces and fully rounded pills for buttons and nav links. Sage green
(`--color-brand-*`) is the only accent. Headings are a serif, body text a
rounded sans. The one dark element is the forest-green sidebar with its
wood-grain sign.

### Rules

1. **Colour roles.** Sage `--color-brand-600` fills the primary button and
   inks links and outlined buttons; hover deepens to `--color-brand-900`.
   `--color-brand-500` is for focus borders and the checked-control accent;
   `--color-brand-50`/`-100` are washes (hover backgrounds, focus rings).
   Ink is `--color-text`; secondary ink is `--color-text-muted`. Never use
   brand green for status: status has its own colours.
2. **Surfaces.** Page `--color-bg`; cards and details `--color-surface`;
   things inside a card (items, inputs) `--color-surface-alt`. Cards are lifted
   by `--shadow-theme`, not a border; items and fields have a 1px border.
3. **Shape.** `--radius-theme` (1rem) on every surface, item and field;
   `--radius-theme-pill` on buttons and nav links. The only shadow is
   `--shadow-theme`.
4. **States.** Focus is always visible: a 2px `--color-brand-600` outline
   offset 2px on buttons, links and `<summary>` (a parchment outline on
   nav links, which sit on dark green), and on text fields a sage border plus
   a 3px `--color-brand-100` ring. Disabled is `--color-neutral-100` fill
   with `--color-neutral-500` ink and a not-allowed cursor. Invalid is a
   `--color-danger-500` border. Status colours (`--color-<type>-500`, ten
   types) are for callouts only, and always come with a text label.
5. **Type.** `--font-serif` (Lora) for headings and the `<summary>` of a
   details, 700 weight on a 2.25 / 1.75 / 1.375 / 1.125rem scale.
   `--font-sans` (Nunito) for everything else: body 1rem at 1.6 line height,
   captions 0.8125rem in muted ink, field labels 0.875rem semibold.
6. **Motion.** Only the skeleton shimmer moves, and it stops under
   `prefers-reduced-motion`.
7. **Contrast.** Measured in Chromium from the resolved tokens, on the surface
   each ink sits on. What passes WCAG AA (4.5:1 for text, 3:1 for
   boundaries and focus indicators):
   - Text on a card (`--color-surface`): ink 12.1:1, muted 4.73:1, links and
     the primary button 4.67:1 (hover 8.1:1), outlined and ghost buttons
     4.67:1 (4.89:1 on their hover wash).
   - Placeholders (a mix of muted and ink) 5.34:1 on the field fill.
   - Blockquote labels are pulled toward the ink
     (`color-mix(--bq-accent 70%, --color-text)`) and measure 5.4:1 or better
     on their tint; the left rule keeps the pure status colour.
   - Text fields and selects use `--field-border` (the ink mixed 50% into the
     field fill): 3.24:1 against a card. Focus outlines are 4.67:1 on a card
     and 8.1:1 (parchment on green) in the sidebar. Sidebar ink is 8.1:1 and
     muted nav ink 5.26:1; the sign's text is 4.77:1 on the wood.
   - A field's focus border (`--color-brand-500`) is 3.38:1 on a card.

   What fails, and is left as it is because fixing it means changing tokens,
   which is a separate decision:
   - **Muted ink and brand ink directly on the page (`--color-bg`)**: caption
     text 3.88:1, links and outlined/ghost buttons 3.83:1. Put them on a card
     or an item; the Demo page's caption above its heading is an example of
     the failure.
   - **Disabled controls**: 2.56:1 (neutral-500 on neutral-100). WCAG exempts
     disabled controls, but they are low-contrast on purpose; don't use
     disabled state to carry information.
   - A text field's border against its own fill is 2.74:1, below the 3:1 bar
     (it passes against the card behind it).
   - The sign's leaf icon is 1.41:1 on the wood. It is decorative and
     `aria-hidden`; don't use that pairing for anything meaningful.
   - Skeleton bars are 1.06:1 on a card; they are placeholders, not content.
   - An unchecked checkbox or radio is drawn by the browser, so its outline is
     the browser's, not the theme's.

8. **Lists.** The Tailwind reset removes list markers, and `.theme-container`
   does too, so an `<ol>` shows no numbers. That is left to the repo-wide
   fix (tracked in issue #32); until then, number steps in the text.

### Using the tokens

`dist/index.css` puts every token on `:root` as a custom property (inside
`@layer theme`). Style your own elements with `var(--color-surface)`,
`var(--font-sans)` and `var(--radius-theme)`; never paste hex values, since
the tokens are compiled from the theme's single source
(`themes/forest-isle/theme.css`). The ones an outside element needs:
`--color-bg`, `--color-surface`, `--color-surface-alt`, `--color-border`,
`--color-text`, `--color-text-muted`, `--color-brand-50`/`-100`/`-500`/`-600`/`-900`,
`--color-neutral-100`/`-300`/`-500`, the `--color-<type>-500` status colours,
`--color-sidebar`, `--color-sidebar-text`, `--color-sidebar-text-muted`,
`--color-wood`, `--font-sans`, `--font-serif`, `--radius-theme`,
`--radius-theme-pill` and `--shadow-theme`.

---

## 2. Package overview and usage

### What it is

`@tkottke90/theme-forest-isle` is a **CSS-only** theme: one stylesheet,
`dist/index.css`, with the tokens on `:root` and a set of `theme-*` classes
for native HTML elements. There is no JavaScript, so it works with any
framework or none. It sets `color-scheme: light`, styles `body` (page
background and ink) and includes Tailwind's base reset, so bare headings are
unstyled and lists have no markers: use the classes.

```js
import "@tkottke90/theme-forest-isle"; // with a bundler
```

```html
<!-- or without one -->
<link rel="stylesheet" href="node_modules/@tkottke90/theme-forest-isle/dist/index.css" />
```

Add Lora and Nunito yourself (the package doesn't load them; without them
text falls back to Georgia and the system sans-serif):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Nunito:wght@400;600;700&display=swap"
  rel="stylesheet"
/>
```

### Classes

| Class                                              | Use on                  | Modifiers / parts                                                                                                              |
| -------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `.theme-button`                                    | `<button>`              | `--secondary`, `--ghost`; `disabled`                                                                                           |
| `.theme-card`                                      | any block               | spaces its children 0.75rem apart                                                                                              |
| `.theme-container`, `.theme-item`                  | `<ul>`/`<ol>`/`<div>`   | items go inside the container                                                                                                  |
| `.theme-detail`                                    | `<details>`             |                                                                                                                                |
| `.theme-blockquote`                                | `<blockquote>`          | `--info`, `--tip`, `--question`, `--success`, `--warning`, `--failure`, `--danger`, `--bug`, `--example`, `--quote`; `__label` |
| `.theme-heading`                                   | `<h1>`–`<h4>`           | `--h1` to `--h4` (independent of the element)                                                                                  |
| `.theme-text`                                      | `<p>`, `<span>`         | `--caption`                                                                                                                    |
| `.theme-link`                                      | `<a>`                   |                                                                                                                                |
| `.theme-field`                                     | `<div>`, `<fieldset>`   | `__option` on a `<label>` wrapping a checkbox/radio                                                                            |
| `.theme-input`, `.theme-select`, `.theme-textarea` | native controls         |                                                                                                                                |
| `.theme-skeleton-heading`, `.theme-skeleton-text`  | empty `<div>`           |                                                                                                                                |
| `.theme-sidebar`                                   | `<aside>`               | 220px wide; put one `.theme-sidebar-sign` and one `.theme-nav` inside                                                          |
| `.theme-sidebar-sign`                              | `<div>` in the sidebar  | `__icon` (an `<svg>`), `__eyebrow`, `__name`, `__subtitle`                                                                     |
| `.theme-nav`, `.theme-nav-link`                    | `<ul>`, `<a>` in `<li>` | `--selected` or `aria-current="page"` on the current link; an `<svg>` before the label                                         |

Pairing rules: the sidebar classes are for the dark green column only (nav
link colours assume that background); everything else sits on the sand page
or on a card.

### Forms

The form controls are **native elements**, so a `<form>` works unchanged and
needs nothing extra for forms or labels: give each control a `name`, label it
with `<label for>`/`id` or a wrapping `<label class="theme-field__option">`,
group checkboxes or radios that share a `name` in a
`<fieldset class="theme-field">` with a `<legend>`, and use
`<fieldset disabled>` to disable a group. There is nothing to register or
upgrade. Mark server-side errors with `aria-invalid="true"` and point
`aria-describedby` at a `.theme-text--caption` message.

```html
<form>
  <div class="theme-field">
    <label for="email">Email address</label>
    <input class="theme-input" type="email" id="email" name="email" required />
  </div>
  <div class="theme-field">
    <label for="season">Season</label>
    <select class="theme-select" id="season" name="season">
      <option value="spring">Spring</option>
      <option value="summer">Summer</option>
    </select>
  </div>
  <label class="theme-field__option">
    <input class="theme-input" type="checkbox" name="subscribe" value="yes" /> Subscribe
  </label>
  <button class="theme-button" type="submit">Save</button>
</form>
```

### A dashboard in plain HTML

```html
<div style="display: flex">
  <aside class="theme-sidebar">
    <div class="theme-sidebar-sign">
      <p class="theme-sidebar-sign__eyebrow">Welcome to</p>
      <p class="theme-sidebar-sign__name">Driftwood Cove</p>
      <p class="theme-sidebar-sign__subtitle">Island</p>
    </div>
    <ul class="theme-nav">
      <li>
        <a class="theme-nav-link theme-nav-link--selected" href="#" aria-current="page">Home</a>
      </li>
      <li><a class="theme-nav-link" href="#">Tasks</a></li>
    </ul>
  </aside>
  <main style="flex: 1; padding: 2rem">
    <section class="theme-card">
      <h2 class="theme-heading theme-heading--h2">Overview</h2>
      <p class="theme-text">8 of 10 cottages are occupied.</p>
      <blockquote class="theme-blockquote theme-blockquote--tip">
        <span class="theme-blockquote__label">Tip</span>
        <p class="theme-text">Finish tasks to raise the island rating.</p>
      </blockquote>
      <button class="theme-button" type="button">View map</button>
    </section>
  </main>
</div>
```
