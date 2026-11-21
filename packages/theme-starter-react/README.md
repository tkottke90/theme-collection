# @tkottke90/theme-starter-react

Starter / reference template for a component-library theme built with
[Preact](https://preactjs.com) (React-API compatible). Swap `preact` for
`react` in this package's own dependencies if a given theme specifically
needs React instead of Preact.

## Usage

```
npm install @tkottke90/theme-starter-react preact
```

```tsx
import { ThemeButton, ThemeCard } from "@tkottke90/theme-starter-react";
```

`preact` is a peer dependency so every component theme package in this repo
shares a single copy of it.

## Local development

```
npm run build        # esbuild -> dist/{index.mjs,index.cjs,index.d.ts}
npm test             # jest + jsdom + @testing-library/preact
npm run storybook    # preview components
```
