# @tkottke90/theme-tactical-react

Dark HUD-inspired component theme, built with
[Preact](https://preactjs.com) (React-API compatible). Cyan glow accents,
resizable SVG panel frames (a tab-and-chevron style on Card/Stat, a rounded
tab-notch-and-bracket style on Viewfinder), and a data-display set
(stat readout, segmented progress bar, radial gauge) on top of the repo's
baseline component set. Swap `preact` for `react` in this package's own
dependencies if you specifically need React instead of Preact.

![Component gallery for @tkottke90/theme-tactical-react](./docs/screenshot.png)

## Usage

```
npm install @tkottke90/theme-tactical-react preact
```

```tsx
import {
  ThemeCard,
  ThemeStat,
  ThemeProgress,
  ThemeGauge,
  ThemeViewfinder,
} from "@tkottke90/theme-tactical-react";
import "@tkottke90/theme-tactical-react/theme.css";
```

`preact` is a peer dependency so every component theme package in this repo
shares a single copy of it. The compiled stylesheet is a separate export
(`./theme.css`) — import it once, globally, rather than per component.

## Local development

```
npm run build        # esbuild -> dist/{index.mjs,index.cjs,index.d.ts}; tailwind -> dist/theme.css
npm test             # jest + jsdom + @testing-library/preact
npm run storybook    # preview components
```
