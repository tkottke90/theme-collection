# @tkottke90/theme-futuristic-industrial

Light, stencilled industrial/hazard-tape component theme, built as
framework-agnostic Web Components with [Lit](https://lit.dev). A mono-sized
display font, an orange/charcoal caution-tag palette, and resizable SVG
panel frames — chamfered corners, bolt "rivets", and a diagonal hazard-stripe
accent — on Card, Container, and a bonus ID-plate readout component, on top
of the repo's baseline component set.

![Component gallery for @tkottke90/theme-futuristic-industrial](./docs/screenshot.png)

## Usage

```
npm install @tkottke90/theme-futuristic-industrial lit
```

```js
import "@tkottke90/theme-futuristic-industrial";
```

```html
<theme-card heading="Status">
  <theme-plate label="Code" value="13-V-2-44"></theme-plate>
  <theme-plate label="Mod" value="X5C"></theme-plate>
</theme-card>
```

`lit` is a peer dependency so every theme package in this repo shares a
single copy of it.

## Panel frames

Three components share one tested geometry module (`plate-geometry.ts`) with
different option presets, so each reads as a distinct border style rather
than a single reskinned shape:

- **Card** — both a top-left and bottom-right chamfer, rivets at the two
  remaining square corners, and a hazard-stripe band along the top-left cut.
- **Container** — a single top-left chamfer only, no rivets, no stripe — a
  plainer crate/bin panel.
- **Plate** (bonus ID-plate/readout component) — the opposite corner pair
  chamfered (top-right/bottom-left) with the stripe on the bottom-left cut,
  so it doesn't read as a smaller Card.

**Hazard Container** uses a separate frame (`hazard-frame-geometry.ts`)
rebuilt from the reference sheet's hazard-stripe bar: an orange band with
charcoal diagonal stripes inset from both edges, chamfered at the top-right
and bottom-left like the bar's ends. Stripe spacing, width, margin and lean
are the bar's measured proportions scaled to the band thickness, and the
stripes are one continuous pattern, so they run around the corners instead of
restarting on each edge. Use it for restricted or high-attention areas, not
everyday grouping.

```html
<theme-hazard-container>Restricted zone. Authorised personnel only.</theme-hazard-container>
```

## Local development

```
npm run build        # esbuild -> dist/{index.mjs,index.cjs,index.d.ts}
npm test             # jest + jsdom
npm run storybook    # preview components
```
