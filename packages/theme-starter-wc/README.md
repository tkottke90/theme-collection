# @tkottke90/theme-starter-wc

Starter / reference template for a component-library theme built as
framework-agnostic Web Components with [Lit](https://lit.dev). Works in any
project regardless of framework.

## Usage

```
npm install @tkottke90/theme-starter-wc lit
```

```js
import "@tkottke90/theme-starter-wc";
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
