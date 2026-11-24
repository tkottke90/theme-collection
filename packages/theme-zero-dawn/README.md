# @tkottke90/theme-zero-dawn

A Web Component theme (Lit) built around a post-apocalyptic "machine and
tribe" look: light, faceted armour plates sitting on dark machine cores,
thin cyan seams, amber wiring, and hand-painted tribal glyphs. Nearly every
surface is drawn in SVG.

![Component gallery for @tkottke90/theme-zero-dawn](./docs/screenshot.png)

## Usage

```
npm install @tkottke90/theme-zero-dawn lit
```

```js
import "@tkottke90/theme-zero-dawn";
```

```html
<theme-card heading="Field notes">
  <theme-text>Plates overlap like scales; the core shows through every seam.</theme-text>
</theme-card>
<theme-glyph name="spear" color="red" shape="shield" label="Hunters"></theme-glyph>
```

`lit` is a peer dependency so every theme package in this repo shares a
single copy of it.

### Fonts

The theme uses [Saira](https://fonts.google.com/specimen/Saira) (display/UI)
and [Crimson Pro](https://fonts.google.com/specimen/Crimson+Pro) (body).
Add these to your page head; the stacks fall back to system fonts without them:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Saira:wght@400;500;600;700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap"
  rel="stylesheet"
/>
```

The components are designed for a dark page (`--color-bg`, `#262b3a`).

## Components

The standard set: `theme-button`, `theme-input`, `theme-textarea`,
`theme-select`, `theme-card`, `theme-heading`, `theme-text`, `theme-link`,
`theme-container`, `theme-item`, `theme-field`, `theme-detail`,
`theme-blockquote` (10 types), `theme-skeleton-heading`, and
`theme-skeleton-text`.

Theme-specific extras:

| Element          | What it is                                                                                                                                                                               |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `theme-glyph`    | Hand-painted emblem. `name` (10 original glyphs), `color` (tribal paints), `shape`, `size`, `label`                                                                                      |
| `theme-divider`  | Woven band rule: `variant="peaks"` (sawtooth) or `"trim"` (zigzag and beads)                                                                                                             |
| `theme-disc`     | Radial progress: a meter with `value`, a spinner without. `variant` is `dish`, `segments` or `peaks`; only the light moves                                                               |
| `theme-circuit`  | Symmetric circuit-trace backdrop for heroes and empty states; `glow` lights the traces                                                                                                   |
| `theme-progress` | Progress bar: a glowing cyan channel. `variant="raised"` (steel plate, for dark containers) or `"recessed"` (cut into the surface, for light cards); `value`, `max`, `segments`, `label` |

### Surfaces and ink

A light `theme-card` sets dark ink for its slotted content, and steel surfaces
(Container, Detail, Blockquote) set light ink. They do this through the
`--zd-ink`, `--zd-ink-muted`, `--zd-link` and `--zd-accent` custom properties,
so `theme-text`, `theme-link` and the other components keep AA contrast on
either surface without extra attributes.

## Local development

```
npm run build        # esbuild -> dist/{index.mjs,index.cjs,index.d.ts}
npm test             # jest + jsdom
npm run storybook    # preview components
```

Tokens live in `themes/zero-dawn/theme.css`.
