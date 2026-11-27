# @tkottke90/theme-network-ops

A dark monitoring-dashboard theme: a near-black page, slightly lighter
raised panels, a coral brand colour for alerts and primary actions, and an
indigo accent for focus and secondary data. It is CSS only: one stylesheet
of hand-written classes (`.theme-button`, `.theme-card`, `.theme-input`, …)
authored with Tailwind v4's CSS-first `@theme` directive. No JavaScript
ships.

![Demo page for @tkottke90/theme-network-ops](./docs/screenshot.png)

## Usage

```
npm install @tkottke90/theme-network-ops
```

With a bundler (Vite, esbuild, webpack, …):

```js
import "@tkottke90/theme-network-ops";
```

Without one, link the built file:

```html
<link rel="stylesheet" href="node_modules/@tkottke90/theme-network-ops/dist/index.css" />
```

Then use the classes on ordinary HTML:

```html
<div class="theme-card">
  <h2 class="theme-card__title">Inbound traffic</h2>
  <p class="theme-card__body">Node E · 10.23.84.44</p>
  <button class="theme-button theme-button--glow">View details</button>
</div>
```

The stylesheet also puts every design token on `:root` as a custom
property (`--color-brand-500`, `--font-sans`, `--radius-theme`, …), so you
can style your own elements to match.

The stylesheet sets `color-scheme: dark` and styles `body` with the page
background and text colour, so it is meant to own the whole page. Headings,
paragraphs, links, `small`, `code`, `pre` and `kbd` are styled as elements,
with no class.

**For AI agents and anyone extending the theme:** [`AGENTS.md`](./AGENTS.md)
(shipped with the package) has the style guide and usage notes.

### Fonts

The sans face is [Inter](https://rsms.me/inter/), and the package does not
load it; without it the text falls back to the system sans-serif. Add it to
your page:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

Code uses the system monospace stack and needs nothing.

## Components

Every class is plain CSS on native elements:

| Class                                             | Use on                                             | Modifiers / parts                                                                                                                                          |
| ------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.theme-button`                                   | `<button>`                                         | `--secondary`, `--ghost`, `--glow`; `disabled`                                                                                                             |
| `.theme-card`                                     | any block                                          | `__title`, `__body`                                                                                                                                        |
| `.theme-container`                                | `<div>`, `<ul>`, `<ol>`                            |                                                                                                                                                            |
| `.theme-item`                                     | `<div>`, `<li>`                                    |                                                                                                                                                            |
| `.theme-details`                                  | `<details>`                                        | `__body` on the content                                                                                                                                    |
| `.theme-blockquote`                               | `<blockquote>`                                     | `--info`, `--tip`, `--question`, `--success`, `--warning`, `--failure`, `--danger`, `--bug`, `--example`, `--quote`; label with `.theme-blockquote__label` |
| `.theme-field`                                    | `<div>` or `<fieldset>`                            | a `<label>` (or `<legend>`) is styled inside it                                                                                                            |
| `.theme-field-label`                              | `<label>` wrapping a control                       | for one checkbox or radio and its text                                                                                                                     |
| `.theme-input`                                    | `<input>` (text-like)                              | add `.theme-select` on `<select>` or `.theme-textarea` on `<textarea>`                                                                                     |
| `.theme-checkbox`, `.theme-radio`, `.theme-range` | `<input>` of that type                             |                                                                                                                                                            |
| `.theme-skeleton-heading`, `.theme-skeleton-text` | empty `<div>`                                      |                                                                                                                                                            |
| `.theme-text-small`                               | `<span>`, `<p>`                                    | same look as `<small>`                                                                                                                                     |
| _(no class)_                                      | `h1`–`h6`, `p`, `a`, `small`, `code`, `pre`, `kbd` | styled as elements                                                                                                                                         |

### Forms

The form classes style native controls, so everything a browser form does
keeps working: controls submit under their `name`, reset with the form, and
follow `<fieldset disabled>`. Label a control with `<label for>` and a
matching `id`, or wrap it in a `.theme-field-label`. Checkboxes and radios
that share a `name` form a group; put them in a `<fieldset class="theme-field">`
with a `<legend>`.

States are styled from the native pseudo-classes: `:focus-visible` (indigo
ring), `:disabled` (flat, muted), `:checked` (indigo `accent-color`), and
invalid (`:user-invalid`, so fields only turn red after the user has
interacted, or `aria-invalid="true"` to set it yourself).

```html
<form>
  <div class="theme-field">
    <label for="email">Contact email</label>
    <input class="theme-input" type="email" id="email" name="email" required />
  </div>
  <fieldset class="theme-field">
    <legend>Scan mode</legend>
    <label class="theme-field-label">
      <input class="theme-radio" type="radio" name="scan" value="passive" checked /> Passive
    </label>
    <label class="theme-field-label">
      <input class="theme-radio" type="radio" name="scan" value="active" /> Active
    </label>
  </fieldset>
  <button class="theme-button" type="submit">Save</button>
</form>
```

## Local development

```
npm run build              # compiles src/index.css -> dist/index.css
npm run storybook          # preview the theme's component classes
npm run screenshot         # regenerate docs/screenshot.png (after build-storybook)
```

Tokens live in `themes/theme-network-ops/theme.css`; `src/index.css` imports
them. Every stories file sets `parameters.intro` (shown above its stories),
and `stories/Demo.stories.ts` is a full page built from the classes, and is
what the screenshot shows.
