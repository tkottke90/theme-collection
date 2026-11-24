# @tkottke90/theme-starter-wc

Starter / reference template for a component-library theme built as
framework-agnostic Web Components with [Lit](https://lit.dev). Its look is
deliberately plain (a neutral page, one brand blue, rounded corners) so the
package shows the full package standard without a theme getting in the way.
It works in any project, with or without a framework.

> **Copying this starter?** Replace this paragraph with two or three sentences
> on your theme's look: the mood, the materials, the colours a reader should
> expect. Rename the package everywhere (`package.json`, this README,
> `AGENTS.md`, the stories' `Theme/Starter WC/…` titles) and point the build
> at your own `themes/<name>/` folder. See the repo's `CONTRIBUTING.md`.

![Demo page for @tkottke90/theme-starter-wc](./docs/screenshot.png)

> The screenshot is generated: run `npm run screenshot` after
> `npm run build-storybook`. The `Demo` story comes first, then each
> component's intro and its stories.

## Usage

```
npm install @tkottke90/theme-starter-wc lit
```

```js
import "@tkottke90/theme-starter-wc";
```

```html
<theme-card heading="Hello">
  <theme-text>Body content</theme-text>
</theme-card>
<theme-button label="Save"></theme-button>
```

`lit` is a peer dependency so every theme package in this repo shares a
single copy of it.

To style your own elements with the theme's colours and fonts, load the design
tokens on your page:

```js
import "@tkottke90/theme-starter-wc/tokens.css";
```

**For AI agents and anyone extending the theme:** [`AGENTS.md`](./AGENTS.md)
(shipped with the package) has the style guide and usage for vanilla and
Preact projects.

The theme names Inter as its font but doesn't load it; without it, the stack
falls back to system fonts. The components are designed for a light page
(`--color-neutral-50`).

> **Copying this starter?** Document any fonts your theme loads (and the
> `<link>` tags a consumer adds) and the page background it expects.

## Components

`theme-button`, `theme-input`, `theme-textarea`, `theme-select`,
`theme-card`, `theme-heading`, `theme-text`, `theme-link`, `theme-container`,
`theme-item`, `theme-field`, `theme-detail`, `theme-blockquote` (10 types),
`theme-skeleton-heading`, and `theme-skeleton-text`.

> **Copying this starter?** Keep this standard set. List any extra,
> theme-specific elements in a table here (element, what it is, its
> attributes).

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
</form>
```

**Migrating:** the form controls no longer read an `accessible-label`
attribute; use `aria-label` instead. `theme-button` keeps `accessible-label`
for now.

This behaviour comes from the shared `FormControlElement` and `FieldElement`
base classes (see `docs/adr/0002-shared-wc-core.md`), so a copied package gets
it for free. Restyle the controls; don't reimplement the base.

## Local development

```
npm run generate         # src/generated/: compiled theme styles + shared WC base classes
npm run build            # esbuild -> dist/{index.mjs,index.cjs,*.d.ts,tokens.css}
npm test                 # jest + jsdom
npm run storybook        # preview components
npm run build-storybook  # static Storybook, used by the screenshot
npm run screenshot       # regenerate docs/screenshot.png
```

Tokens live in `themes/theme-starter/theme.css`; component styles are
compiled from them, never hand-copied.
