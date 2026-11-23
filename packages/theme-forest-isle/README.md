# @tkottke90/theme-forest-isle

Warm, illustrated cozy-life-sim dashboard CSS theme, authored with
Tailwind v4's CSS-first `@theme` directive and built to a single
self-contained stylesheet. Sage-green primary accent, parchment
surfaces, a serif heading / sans body pairing, and fully rounded
shapes throughout — inspired by a cottage-island dashboard design.

Covers CONTRIBUTING.md's full minimum component set (Button, Input, Card,
Typography, Link, Container, Item, Field, Detail, Blockquote, Skeleton),
plus bonus sidebar/nav components for the source's dashboard layout:
`.theme-sidebar`, `.theme-sidebar-sign` (a CSS-only notched wood-grain
header, no images), `.theme-nav`, and `.theme-nav-link` (selected and
deselected states).

![Component gallery for @tkottke90/theme-forest-isle](./docs/screenshot.png)

## Usage

```
npm install @tkottke90/theme-forest-isle
```

```js
import "@tkottke90/theme-forest-isle";
```

or link `dist/index.css` directly in an HTML `<link>` tag.

## Local development

```
npm run build              # compiles src/index.css -> dist/index.css
npm run storybook          # preview the theme's component classes
```
