# @tkottke90/theme-field-journal-wc

A fantasy/medieval "leather-bound explorer's field journal" component theme,
built as framework-agnostic Web Components with [Lit](https://lit.dev). A
leather book cover with colored navigation tabs, parchment pages with a
ruled double frame and corner flourishes, and hand-placed content (ribbon
headings, quest cards with colored pennants, taped sketches, handwritten
notes) on top of the repo's baseline component set. Warm and muted
throughout — no glossy or neon colors, no thick cartoon outlines; texture
comes from hairline rules, warm shadows and SVG-filter grain.

![Component gallery for @tkottke90/theme-field-journal-wc](./docs/screenshot.png)

## Usage

```
npm install @tkottke90/theme-field-journal-wc lit
```

```js
import "@tkottke90/theme-field-journal-wc";
```

This theme's fonts (IM Fell English / IM Fell English SC, EB Garamond,
Caveat) load from Google Fonts — add these tags to your page's `<head>`
(Storybook loads the same tags for its own preview, via
`.storybook/preview-head.html`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=IM+Fell+English+SC&family=EB+Garamond:wght@400;500;600&family=Caveat:wght@500&display=swap"
  rel="stylesheet"
/>
```

Without them, every component still renders — font-family falls back to
Georgia/serif/cursive, just without the period look.

```html
<theme-journal-book id="book" selected="quests">
  <theme-journal-page slot="left" side="left">
    <theme-heading level="1" style="text-align: center; display: block;"
      >Field Journal</theme-heading
    >
    <theme-divider></theme-divider>
  </theme-journal-page>

  <theme-journal-page slot="right" side="right">
    <theme-ribbon>Active Quests</theme-ribbon>
    <theme-progress label="Overall progress" value="42"></theme-progress>
    <theme-quest-card
      heading="The Lost Parcel"
      location="Lakeside Village"
      description="A villager's parcel went missing on its way to the far dock."
      color="red"
      icon="parcel"
    ></theme-quest-card>
  </theme-journal-page>
</theme-journal-book>

<script type="module">
  const book = document.getElementById("book");
  book.tabs = [
    { id: "quests", label: "Quests", color: "red", icon: "quest" },
    { id: "places", label: "Places", color: "blue", icon: "pin" },
  ];
</script>
```

`lit` is a peer dependency so every theme package in this repo shares a
single copy of it. See Storybook for every component (baseline set plus the
field-journal signature components below) and its stories.

### Signature components

Beyond the repo's baseline set (Button, Input/Textarea/Select, Card,
Heading/Text, Link, Container/Item, Field, Detail, Blockquote, Skeleton),
this theme adds the book itself:

| Component            | What it is                                                                                                            |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `theme-journal-page` | A parchment page: stacked paper edges, grain/stains, vignette, gutter shadow, a double ruled frame, corner flourishes |
| `theme-journal-book` | The leather cover: two slotted pages (`slot="left"`/`slot="right"`), colored nav tabs, strap, bookmark ribbon         |
| `theme-ribbon`       | A notched cloth banner heading, one of six category colors                                                            |
| `theme-quest-card`   | A cream card with a colored pennant strip, title/status-tag/favorite, location, description + task list               |
| `theme-progress`     | A pressed-in parchment track with a grainy green fill                                                                 |
| `theme-taped`        | A taped-in sketch/photo: tape corners, slight tilt, handwritten caption                                               |
| `theme-notes`        | A cream card with ruled lines for handwritten margin notes                                                            |
| `theme-divider`      | An ornamental divider for under page titles / between sections                                                        |

`theme-journal-book`'s tabs, `theme-ribbon` and `theme-quest-card`'s pennant
all take the same `color` enum — `"red" | "blue" | "tan" | "green" |
"purple" | "orange"` — one per section (Quests/Places/People/Creatures/
Notes/Collection in the reference). Give each section one color and use it
everywhere that section appears.

## Where Tailwind stops

Component styling in this repo is normally authored with Tailwind utility
classes against the theme's shared `themes/<name>/theme.css` tokens (see
`docs/adr/0001-theme-token-architecture.md`). This theme's skeuomorphic
chrome — the leather gradients, grain textures, ribbon/pennant notches
(`clip-path`), and the page's SVG filters — has no Tailwind utility
equivalent, the same reasoning `@tkottke90/theme-tactical-wc` already
applies to its HUD frame SVGs. That CSS is hand-written (still only
`var(--…)` references into `themes/field-journal/theme.css` — no hex values
live in a component file) inside each component's own `static styles`,
alongside Tailwind classes for the parts Tailwind does express well
(padding, flex/grid layout, font selection, simple colors).

Every filter/gradient a component needs is defined inline in that
component's own shadow root (see `journal-defs-svg.ts`), rather than once in
a page-level `<svg>`: Shadow DOM scopes element IDs, so a filter declared in
one shadow root can't be reached via `url(#id)` from another — the same
constraint `theme-tactical-wc`'s `hud-frame-svg.ts` documents for its own
glow filter. Duplicating these tiny, static filters per instance is cheap.

## Accessibility

The style guide this theme was built from flagged several contrast
failures for light text on three of its six category colors (tan, orange,
green), plus green status text on a cream card. This theme fixes those by
darkening those three colors specifically for use behind light text or as
status text (`--tan-dark`, `--orange-dark`, `--green-dark` in
`themes/field-journal/theme.css`) — every component that needs one of
those colors reaches for the darkened version automatically (see
`journal-categories.ts`), so consumers never pick the wrong variant. These
are estimated darkenings, not measured to the same rigor as the style
guide's own numbers — re-verify with a contrast checker before relying on
them for a production UI.

Known gaps carried over from the style guide, not yet addressed here:

- No Windows High Contrast fallback (`@media (forced-colors: active)`).
- `theme-journal-book`'s tabs are plain `<button>`s with `aria-current`,
  not a full ARIA tab pattern (`role="tablist"`, arrow-key navigation).

## Local development

```
npm run build        # esbuild -> dist/{index.mjs,index.cjs,index.d.ts}
npm test             # jest + jsdom
npm run storybook    # preview components
```
