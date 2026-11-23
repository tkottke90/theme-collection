# @tkottke90/theme-hexagon-tactical

Dark, carbon-fibre tactical/control-panel theme built as framework-agnostic
Web Components with [Lit](https://lit.dev). Cut-corner bevelled panels, a
lime-green primary accent, blue/rust tile colors, and a red alert state.

Covers CONTRIBUTING.md's full minimum component set (Button, Input, Card,
Typography, Link, Container, Item, Field, Detail, Blockquote, Skeleton),
plus bonus domain components for a hex-grid node board: `theme-hex-board`,
`theme-hex-socket`, `theme-chip`, `theme-toolbar-button`,
`theme-transport-control`, `theme-counter`, `theme-slots`.

![Component gallery for @tkottke90/theme-hexagon-tactical](./docs/screenshot.png)

## Usage

```
npm install @tkottke90/theme-hexagon-tactical lit
```

```js
import "@tkottke90/theme-hexagon-tactical";
```

```html
<theme-button label="Save"></theme-button> <theme-card heading="Hello">Body content</theme-card>
```

`lit` is a peer dependency so every theme package in this repo shares a
single copy of it.

## Local development

```
npm run build        # esbuild -> dist/{index.mjs,index.cjs,index.d.ts}
npm test             # jest + jsdom
npm run storybook    # preview components
```
