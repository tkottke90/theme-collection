# @tkottke90/theme-tactical-react

A HUD-inspired component theme built with [Preact](https://preactjs.com)
(React-API compatible). It is dark only: a near-black ground, cyan glow
accents, tracked uppercase labels, monospace readouts, and resizable SVG panel
frames (a tab-and-chevron outline on Card and Stat, a tab-notch-and-bracket
frame on Viewfinder), plus a data-display set (stat readout, segmented
progress bar, radial gauge).

![Demo page for @tkottke90/theme-tactical-react](./docs/screenshot.png)

## Usage

```
npm install @tkottke90/theme-tactical-react preact
```

```tsx
import {
  ThemeCard,
  ThemeGauge,
  ThemeProgress,
  ThemeStat,
  ThemeViewfinder,
} from "@tkottke90/theme-tactical-react";
import "@tkottke90/theme-tactical-react/theme.css";

export function Status() {
  return (
    <>
      <ThemeCard heading="Status">
        <ThemeStat label="Uptime" value="1565" unit="h" />
        <ThemeProgress label="Signal" value={65} />
        <ThemeGauge label="Power" value={72} />
      </ThemeCard>
      <ThemeViewfinder heading="Target lock">Locked on contact 07.</ThemeViewfinder>
    </>
  );
}
```

`preact` is a peer dependency so every component theme package in this repo
shares a single copy of it. React projects can use the package through
`preact/compat` (alias `react` and `react-dom` to it in your bundler).

`theme.css` is required: it holds the compiled component styles and the design
tokens the components use, as CSS custom properties, which you can use to style
your own elements (`var(--color-brand-500)`, `var(--font-mono)`). **It also
includes Tailwind's base reset, which applies to the whole page** (headings
inherit their size and weight, lists lose their markers, form controls become
transparent), and it does not style `body`: set
`background: var(--color-bg); color: var(--color-text)` on the page yourself.

**For AI agents and anyone extending the theme:** [`AGENTS.md`](./AGENTS.md)
(shipped with the package) has the style guide and usage for Preact and
React-compat projects.

## Dark only

The theme has one look, dark. It ignores `prefers-color-scheme` and has no
`data-theme` switch, so there is nothing to set per element. Put the
components on the tactical page background, `--color-bg`.

## Fonts

The theme uses system font stacks only (`ui-sans-serif, system-ui, …` and
`ui-monospace, …`), so there is nothing to load. The components are designed
for the tactical page background, `--color-bg` (near-black).

## Components

The standard set: `ThemeButton`, `ThemeInput`, `ThemeTextarea`, `ThemeSelect`,
`ThemeCard`, `ThemeHeading`, `ThemeText`, `ThemeLink`, `ThemeContainer`,
`ThemeItem`, `ThemeField`, `ThemeDetail`, `ThemeBlockquote` (10 types),
`ThemeSkeletonHeading` and `ThemeSkeletonText`. Theme-specific extras:

| Component         | What it is                    | Props                                 |
| ----------------- | ----------------------------- | ------------------------------------- |
| `ThemeStat`       | Large numeric readout         | `label`, `value`, `unit`              |
| `ThemeProgress`   | Segmented bar meter           | `label`, `value`, `max` (default 100) |
| `ThemeGauge`      | Radial gauge                  | `label`, `value`, `max` (default 100) |
| `ThemeViewfinder` | Panel with a viewfinder frame | `heading`; children                   |

`ThemeCard`, `ThemeStat` and `ThemeViewfinder` redraw their SVG frame to fit
their size, so give them room (a grid cell or block width) rather than a fixed
height. `ThemeProgress` and `ThemeGauge` are exposed as a `progressbar` and a
`meter`, named by their `label`.

### Forms

`ThemeInput`, `ThemeSelect` and `ThemeTextarea` render native form controls
and forward every native prop (`name`, `id`, `value` / `defaultValue`,
`checked` / `defaultChecked`, `disabled`, `required`, `onInput`, `onChange`,
`aria-*`, ...). So inside a `<form>` they submit under their `name`, reset with
the form, follow `<fieldset disabled>`, and work both controlled (`value` plus
`onInput`) and uncontrolled (`defaultValue`). `ThemeButton` takes
`type="submit"` or `type="reset"`.

`ThemeField` labels its control natively with `<label for>`: it uses the
control's `id`, or gives it a generated one. Clicking the label focuses the
control, and the label is its accessible name. Wrapping several controls (such
as a radio group), it labels them as a group.

```tsx
<form onSubmit={(e) => console.log(new FormData(e.currentTarget))}>
  <ThemeField label="Callsign">
    <ThemeInput name="callsign" defaultValue="Raven 2-1" required />
  </ThemeField>
  <ThemeField label="Channel">
    <ThemeSelect name="channel" defaultValue="command">
      <option value="command">Command</option>
      <option value="logistics">Logistics</option>
    </ThemeSelect>
  </ThemeField>
  <label>
    <ThemeInput type="checkbox" name="ack" value="yes" /> Request acknowledgement
  </label>
  <ThemeButton type="submit" label="Transmit" />
</form>
```

This package imports `preact/compat` (for `forwardRef`, so a `ref` reaches each
control's native element). Importing compat installs it for the whole app: text
inputs' `onChange` then fires on every keystroke, as in React, everywhere in
your Preact tree, not just in these components. `onInput` works either way.

## Local development

```
npm run build             # esbuild -> dist/{index.mjs,index.cjs,index.d.ts} + dist/theme.css
npm test                  # jest + jsdom + @testing-library/preact
npm run storybook         # preview components
npm run build-storybook   # static Storybook, used by the screenshot
npm run screenshot        # regenerate docs/screenshot.png
```

Tokens live in `themes/tactical/theme.css` and are compiled into
`dist/theme.css` by `scripts/build.mjs`; don't copy token values into the
components. Each stories file sets `parameters.intro` (shown above its
stories), and `src/Demo.stories.tsx` is the full-page demo the screenshot
shows. The style guide in `AGENTS.md` (Part 1) is shared with
`@tkottke90/theme-tactical-wc`; change both together.
