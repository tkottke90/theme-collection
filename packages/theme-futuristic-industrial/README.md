# @tkottke90/theme-futuristic-industrial

Light, stencilled industrial/hazard-tape component theme, built as
framework-agnostic Web Components with [Lit](https://lit.dev). A mono-sized
display font, an orange/charcoal caution-tag palette, and a family of
resizable SVG frames, bands and labels, each traced from a specific element
of the reference sheet, on top of the repo's baseline component set.

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

## Containers and panels

| Element                    | Look                                                                                           | Use it for                                     |
| -------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `theme-card`               | Chamfered top-left/bottom-right, rivets in the square corners, hazard band on the top-left cut | Primary content panels                         |
| `theme-container`          | One chamfered corner, no rivets or stripe                                                      | Everyday grouping (`as="ul"`/`"ol"` for lists) |
| `theme-plate`              | Opposite corners chamfered, stripe on the bottom-left cut; label + mono value                  | ID/code readouts like "CODE-13-V-2-44"         |
| `theme-hazard-container`   | Hazard-tape band all round; `variant="light"` for orange stripes on a light band               | Restricted or high-attention areas             |
| `theme-casing`             | Dark charcoal panel, inset rule, rivets, hazard strip in the bottom edge                       | The theme's dark surface                       |
| `theme-tab-panel`          | Thin rule; heading in a raised tab sized to the label; stepped bottom edge                     | Labelled sections                              |
| `theme-conduit-panel`      | Thin double rule, rounded bevels, screw holes, striped channel across the top-right corner     | Control groups and readouts                    |
| `theme-registration-frame` | Chamfered corner brackets with registration ticks at each edge's midpoint                      | Media, "target" panels                         |
| `theme-tile`               | Dark rounded tile, light stripes cut into the bottom-right corner (`plain` removes them)       | Icons, short statuses, numbers                 |
| `theme-well`               | Chamfered double-rule recess                                                                   | Icon buttons and small control groups          |
| `theme-bracket-rail`       | Outlined orange rail down the left with a "√" foot                                             | Sidebars, nav groups, callouts                 |

## Bands, rules and labels

| Element                | Look                                                                        |
| ---------------------- | --------------------------------------------------------------------------- |
| `theme-girder`         | Dark Warren-truss band; set its height with CSS (default 36px)              |
| `theme-segmented-rule` | Two orange bars with slots between; `orientation`, `size`, `segments`       |
| `theme-chevron-rule`   | Row of chevrons; `direction` right/left/down/up, `size`                     |
| `theme-stripe-band`    | Solid orange block breaking into even stripes; `size`, `solid` (0–1)        |
| `theme-bracket-tag`    | Inline label in square brackets, or `variant="flared"` rules like "MOD:X5C" |

Warning and danger `theme-blockquote`s use the sheet's warning-tag treatment
(the CAUTION/BIOHAZARD labels): a solid plate, an outline separated from it by
a hairline, and the label in its own strip.

## Dark surfaces

Text, headings, links, list items, field labels and secondary/ghost buttons
read four text-role tokens (`--color-fg`, `--color-fg-muted`, `--color-link`,
`--color-link-hover`). `theme-casing` and `theme-tile` switch them to light,
contrast-checked values for everything slotted inside; light panels (Card,
Container, Detail, Blockquote, ...) reset them, so a Card inside a Casing
keeps dark-on-light text.

## Accessibility notes

- Icon-only buttons: set `accessible-label` on `theme-button`. An `aria-label`
  on the host doesn't reach the inner `<button>`.
- Decorative frames and bands are `aria-hidden`. The rules
  (`theme-segmented-rule`, `theme-chevron-rule`) are `role="separator"`.
- The sampled brand orange is 2.1:1 on the background, so it's only used for
  fills that sit against ink (stripes, rails with an ink outline) or as
  decoration. Brand text and the light hazard tape use darker shades of the
  same hue.

## Local development

```
npm run build        # esbuild -> dist/{index.mjs,index.cjs,index.d.ts}
npm test             # jest + jsdom
npm run storybook    # preview components
```
