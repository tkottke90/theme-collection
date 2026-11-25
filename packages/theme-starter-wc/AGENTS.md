# AGENTS.md — @tkottke90/theme-starter-wc

Guidance for AI agents (and people) who **use** this package, or who need to
build UI that matches it. It has two parts:

1. [Style guide](#1-style-guide): the design rules, so you can style elements
   this package doesn't include and have them belong.
2. [Package overview and usage](#2-package-overview-and-usage): what ships, and
   how to use it in a vanilla project and in Preact.

If you are working on this package's source inside its monorepo, also follow
the repository's root `AGENTS.md` and `CONTRIBUTING.md`.

> **Copying this starter?** This file ships with the package (it's in
> `files`), so write it for the package's users, not its maintainers. Keep
> both parts and their headings. Replace each _Template note_ below with the
> real content for your theme, and delete the notes. See
> `packages/theme-zero-dawn/AGENTS.md` for a fully written example.

---

## 1. Style guide

### The idea in one paragraph

A plain, neutral interface: light grey page, near-black text, one brand blue
for actions and focus, and soft rounded corners throughout. Nothing is
decorative; every colour carries meaning.

_Template note: describe the theme's look and the idea behind it in one
paragraph, so a reader can predict how a new element should look._

### Rules

1. **One accent.** `--color-brand-500` marks actions, links and focus. Don't
   introduce a second accent colour; use the brand scale (`-50` to `-900`).
2. **Rounded, flat surfaces.** Every surface uses `--radius-theme` and a
   1px border; no shadows or gradients.
3. **Ink.** Text is `--color-neutral-900`; secondary text is
   `--color-neutral-500`. On a card, use `--color-brand-900`.
4. **Status colours only for status.** The `--color-{info,tip,…}-500` tokens
   belong to callouts and messages, not to decoration.

_Template note: give the rules a designer would enforce: shape, light and
depth, which ink goes on which surface, typography, and the contrast each
pairing was checked for. Each rule should say what to do, not only what the
theme looks like._

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
- **Don't** rely on colour alone for meaning.

_Template note: add a short recipe or two (CSS for a common element the
package doesn't ship, such as a badge) and the mistakes people make with this
theme._

---

## 2. Package overview and usage

### What it is

`@tkottke90/theme-starter-wc` is a library of **framework-agnostic Web
Components** built with [Lit](https://lit.dev). Each component is a custom
element with its own Shadow DOM and styles, so it works in plain HTML, Preact,
or any framework that renders DOM.

- Importing the package **registers every `theme-*` element** as a side effect.
- ESM (`dist/index.mjs`) and CommonJS (`dist/index.cjs`) builds, with types.
- **`lit` is a peer dependency** (`^3.2.0`) and is not bundled: install it
  alongside, and make sure your toolchain or import map can resolve `lit`.
- `@tkottke90/theme-starter-wc/tokens.css` exports the design tokens as plain
  `:root` custom properties for styling your own elements.
- Designed for a **light page** (`--color-neutral-50`). The font stack names
  Inter but the package doesn't load it.

_Template note: keep the bullets and fill in your page background and fonts
(with the `<link>` tags to load them)._

### Components

| Tag                                             | What it is            | Attributes / properties                                                                                                                |
| ----------------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `theme-button`                                  | Button                | `label`, `variant` (`primary`, `secondary`, `ghost`), `disabled`, `type` (`button`, `submit`, `reset`), `aria-label`; or slot the text |
| `theme-card`                                    | Content surface       | `heading`; slot content                                                                                                                |
| `theme-container`                               | Neutral wrapper       | `as` (`div`, `ol`, `ul`)                                                                                                               |
| `theme-item`                                    | List row              | `as` (`li`, `div`)                                                                                                                     |
| `theme-detail`                                  | Collapsible section   | `summary`; slot content                                                                                                                |
| `theme-blockquote`                              | Callout               | `type` (`info`, `tip`, `question`, `success`, `warning`, `failure`, `danger`, `bug`, `example`, `quote`)                               |
| `theme-heading`                                 | Heading               | `level` (1–4)                                                                                                                          |
| `theme-text`                                    | Body copy or caption  | `variant` (`body`, `caption`)                                                                                                          |
| `theme-link`                                    | Link                  | `href`                                                                                                                                 |
| `theme-field`                                   | Label above a control | `label`, `for`; slot the control                                                                                                       |
| `theme-input`                                   | Form control          | `type` (`text`, `email`, `password`, `number`, `checkbox`, `radio`), `name`, `value`, `placeholder`, `checked`, `disabled`             |
| `theme-select`                                  | Form control          | `name`, `value`, `disabled`; `<option>` children                                                                                       |
| `theme-textarea`                                | Form control          | `name`, `value`, `placeholder`, `rows`, `disabled`                                                                                     |
| `theme-skeleton-heading`, `theme-skeleton-text` | Loading placeholders  | `width`                                                                                                                                |

Form controls are **form-associated**: inside a `<form>` they submit under
their `name`, reset with the form, follow `<fieldset disabled>`, fire `change`
from the element, and work with `<label for>` or a wrapping `<label>`. Radios
group by `name`. Each control forwards its accessible name (its `aria-label`,
else its `<label>`'s text) to the native element inside it; `theme-field`
names the control it wraps with its label; wrapping radios in an element, it
names that element as a `radiogroup`, so each radio keeps its own label.

_Template note: add a row for every theme-specific element, and any pairing
rules (which variant goes on which surface)._

### Vanilla (with a bundler)

```bash
npm install @tkottke90/theme-starter-wc lit
```

```js
// main.js — once, at your entry point
import "@tkottke90/theme-starter-wc"; // registers the elements
import "@tkottke90/theme-starter-wc/tokens.css"; // tokens for your own CSS
```

```html
<body style="background: var(--color-neutral-50); color: var(--color-neutral-900)">
  <form id="contact">
    <theme-field label="Email">
      <theme-input name="email" type="email"></theme-input>
    </theme-field>
    <label><theme-input type="checkbox" name="news" value="yes"></theme-input> Newsletter</label>
    <theme-button label="Send"></theme-button>
  </form>
</body>
```

Set non-string values as **properties** from script, and listen for events on
the element:

```js
document.querySelector("theme-input[name=email]").addEventListener("change", (e) => {
  console.log(e.target.value);
});
```

### Vanilla (no bundler)

Browsers need an import map to resolve `lit` and the packages Lit imports
internally. All seven entries are required:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@tkottke90/theme-starter-wc/dist/tokens.css"
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
  src="https://cdn.jsdelivr.net/npm/@tkottke90/theme-starter-wc/dist/index.mjs"
></script>
```

### Preact

Import once at your entry point, then use the tags directly in JSX. Preact
sets them as **properties**, so `checked={true}` and `rows={3}` arrive typed,
`onChange` receives the element's `change` event, and a native `<form>`
collects the controls' values on submit.

```jsx
import "@tkottke90/theme-starter-wc";
import "@tkottke90/theme-starter-wc/tokens.css";

export function Contact() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log([...new FormData(e.currentTarget)]);
      }}
    >
      <theme-field label="Email">
        <theme-input name="email" type="email" onChange={(e) => console.log(e.target.value)} />
      </theme-field>
      <theme-button label="Send" />
    </form>
  );
}
```

**TypeScript.** Declare the custom tags once (for example in
`src/theme-starter-wc.d.ts`):

```ts
import type { ThemeButton, ThemeInput } from "@tkottke90/theme-starter-wc";

type ThemeProps<T> = preact.JSX.HTMLAttributes<HTMLElement> &
  Partial<Omit<T, keyof HTMLElement>> & { style?: preact.JSX.CSSProperties | string };

declare module "preact" {
  namespace JSX {
    interface IntrinsicElements {
      "theme-button": ThemeProps<ThemeButton>;
      "theme-input": ThemeProps<ThemeInput>;
      // …add the other theme-* tags you use the same way
    }
  }
}
```

### Tokens for your own elements

`@tkottke90/theme-starter-wc/tokens.css` defines every design token on
`:root`: colours (`--color-brand-*`, `--color-neutral-*`, the status
`--color-*-500` set, skeleton colours), `--font-sans` and `--radius-theme`. It
contains tokens only, no resets or utility classes, so it is safe to load on
any page.

_Template note: list your theme's token groups here so readers know what's
available without opening the file._
