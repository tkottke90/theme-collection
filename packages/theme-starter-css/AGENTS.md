# AGENTS.md — @tkottke90/theme-starter-css

Guidance for AI agents (and people) who **use** this package, or who need to
build UI that matches it. It has two parts:

1. [Style guide](#1-style-guide): the design rules, so you can style elements
   this package doesn't include and have them belong.
2. [Package overview and usage](#2-package-overview-and-usage): what ships, and
   how to use it.

If you are working on this package's source inside its monorepo, also follow
the repository's root `AGENTS.md` and `CONTRIBUTING.md`.

> **Copying this starter?** Keep both parts and this file's place in
> `package.json` `files`. Each section below has a note saying what it must
> cover for a real theme; replace the starter's content, then delete the
> notes. `packages/theme-zero-dawn/AGENTS.md` is a full worked example.

---

## 1. Style guide

### The idea in one paragraph

A neutral, friendly default: light surfaces, one indigo brand colour, soft
rounded corners and a single sans-serif face. Nothing is decorative; the
starter exists to show the package shape, not a look.

> **For a real theme:** the look in one paragraph: its materials, mood, and
> the one or two ideas every component follows.

### Rules

1. **Colour.** `--color-brand-500` is the only accent: primary buttons,
   links, focus rings and checked controls. Hover darkens to
   `--color-brand-600`. Surfaces are white or `--color-neutral-50`/`-100`;
   ink is `--color-neutral-900`, muted ink `--color-neutral-500`.
2. **Shape.** Every surface and control uses `--radius-theme` (0.5rem) and a
   1px border from the neutral scale. No shadows, except the 3px
   `--color-brand-100` focus ring on text-like controls.
3. **States.** Focus is always visible (`:focus-visible`: ring on fields,
   2px outline elsewhere). Disabled is `--color-neutral-100` fill with
   `--color-neutral-500` ink and a not-allowed cursor. Invalid is a
   `--color-danger-500` border. Status colours (`--color-<type>-500`, ten
   types) are for callouts only, and always come with a text label.
4. **Type.** `--font-sans` throughout. Headings are 700 weight on a
   2.25 / 1.75 / 1.375 / 1.125rem scale; body is 1rem at 1.6 line height;
   captions are 0.8125rem, muted.
5. **Motion.** Only the skeleton shimmer moves, and it stops under
   `prefers-reduced-motion`.

> **For a real theme:** the rules that make something belong, each concrete
> enough to apply to a new element: which tokens go where, shape, depth and
> light, every interactive state, type roles, motion, and the contrast the
> ink/surface pairs are checked to (WCAG AA).

### Using the tokens

The stylesheet defines every token on `:root` as a custom property. Style
your own elements with `var(--color-…)`, `var(--font-sans)` and
`var(--radius-theme)`; never paste hex values, since the tokens are compiled
from the theme's single source (`themes/theme-starter/theme.css`).

> **For a real theme:** the token names an outside element needs, and any
> scoping rules.

---

## 2. Package overview and usage

### What it is

`@tkottke90/theme-starter-css` is a **CSS-only** theme: one stylesheet,
`dist/index.css`, with the tokens and a set of `theme-*` classes for native
HTML elements. There is no JavaScript, so it works with any framework or
none.

```js
import "@tkottke90/theme-starter-css"; // with a bundler
```

```html
<!-- or without one -->
<link rel="stylesheet" href="node_modules/@tkottke90/theme-starter-css/dist/index.css" />
```

> **For a real theme:** what ships and anything a consumer must add (fonts,
> page background, peer dependencies).

### Classes

| Class                                              | Use on                | Modifiers / parts                                                                                                              |
| -------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `.theme-button`                                    | `<button>`            | `--secondary`, `--ghost`; `disabled`                                                                                           |
| `.theme-card`                                      | any block             | spaces its children 0.75rem apart                                                                                              |
| `.theme-container`, `.theme-item`                  | `<ul>`/`<ol>`/`<div>` | items go inside; `ol` shows numbers, `ul` bullets                                                                              |
| `.theme-detail`                                    | `<details>`           |                                                                                                                                |
| `.theme-blockquote`                                | `<blockquote>`        | `--info`, `--tip`, `--question`, `--success`, `--warning`, `--failure`, `--danger`, `--bug`, `--example`, `--quote`; `__label` |
| `.theme-heading`                                   | `<h1>`–`<h4>`         | `--h1` to `--h4` (independent of the element)                                                                                  |
| `.theme-text`                                      | `<p>`, `<span>`       | `--caption`                                                                                                                    |
| `.theme-link`                                      | `<a>`                 |                                                                                                                                |
| `.theme-field`                                     | `<div>`, `<fieldset>` | `__option` on a `<label>` wrapping a checkbox/radio                                                                            |
| `.theme-input`, `.theme-select`, `.theme-textarea` | native controls       |                                                                                                                                |
| `.theme-skeleton-heading`, `.theme-skeleton-text`  | empty `<div>`         |                                                                                                                                |

> **For a real theme:** every class and modifier, kept in step with
> `src/index.css`, plus any pairing rules (which class goes on which surface).

### Forms

The controls are native, so a `<form>` works unchanged: give each control a
`name`, label it with `<label for>`/`id` or a wrapping `<label>`, group
checkboxes or radios that share a `name` in a `<fieldset class="theme-field">`
with a `<legend>`, and use `<fieldset disabled>` to disable a group. Mark
server-side errors with `aria-invalid="true"` and point `aria-describedby` at
a `.theme-text--caption` message.

```html
<form>
  <div class="theme-field">
    <label for="email">Email address</label>
    <input class="theme-input" type="email" id="email" name="email" required />
  </div>
  <label class="theme-field__option">
    <input class="theme-input" type="checkbox" name="subscribe" value="yes" /> Subscribe
  </label>
  <button class="theme-button" type="submit">Save</button>
</form>
```

> **For a real theme:** how forms behave, and an example in each setting a
> consumer is likely to use (plain HTML, Preact/React).
