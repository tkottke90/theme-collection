# @tkottke90/theme-network-ops

Dark, monitoring-dashboard theme authored with Tailwind v4's CSS-first
`@theme` directive and built to a single self-contained stylesheet.
Tokens are modeled on a network-topology/infra monitoring dashboard design:
a near-black surface, coral/red accent for alert states, and an indigo
accent for secondary data.

![Component gallery for @tkottke90/theme-network-ops](./docs/screenshot.png)

## Usage

```
npm install @tkottke90/theme-network-ops
```

```js
import "@tkottke90/theme-network-ops";
```

or link `dist/index.css` directly in an HTML `<link>` tag.

## Components

- `.theme-card` / `.theme-card__title` / `.theme-card__body`
- `.theme-button` — add `.theme-button--secondary` or `.theme-button--ghost`
  for the other variants, `disabled` for the disabled state, or
  `.theme-button--glow` for an alert/critical state
- `.theme-input` — text inputs (also used as-is for email/password/number);
  combine with a modifier for other field types:
  - `.theme-textarea`, `.theme-select` (use alongside `.theme-input` for the
    shared box styling, e.g. `class="theme-input theme-textarea"`)
  - `.theme-checkbox`, `.theme-radio`, `.theme-range` (standalone, native
    `accent-color` theming)
- `.theme-field` — binds a `label` above an input/select; `.theme-field-label`
  is the narrower inline variant for a checkbox/radio + its label text
- `.theme-container` / `.theme-item` — a generic styled wrapper (`div`/`ol`/`ul`)
  and its children
- `.theme-details` / `.theme-details__body` — a themed `<details>`/`<summary>`
  disclosure
- `.theme-blockquote` + `.theme-blockquote__label` — 10 color variants:
  `--info`, `--tip`, `--question`, `--success`, `--warning`, `--failure`,
  `--danger`, `--bug`, `--example`, `--quote`
- `.theme-skeleton-heading` / `.theme-skeleton-text` — standalone shimmering
  placeholders, manually placed (respects `prefers-reduced-motion`)
- Typography is applied directly to elements, not classes: `h1`–`h6`, `p`,
  `a`, `small`, `code`/`pre`/`kbd`

## Local development

```
npm run build              # compiles src/index.css -> dist/index.css
npm run storybook          # preview the theme's component classes
```
