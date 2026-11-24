import type { Preview } from "@storybook/preact";
import { h } from "preact";
import { preactIntroDecorator } from "../../../shared/storybook/intro-preact.js";
import { ThemeHeading, ThemeText } from "../src/index.js";

// Built by `npm run build` (runs automatically via the pre* npm hooks
// before `storybook dev` / `build-storybook`). It carries the theme's tokens
// (from themes/theme-starter/theme.css) as custom properties, so the
// backdrop below can use them. Tailwind only emits the tokens the
// components use, so pick backdrop tokens that the components use too.
import "../dist/theme.css";

const preview: Preview = {
  decorators: [
    preactIntroDecorator({
      // When copying the starter: replace with your theme's page background.
      backdrop:
        "background: linear-gradient(180deg, var(--color-brand-50), var(--color-neutral-50) 24rem); color: var(--color-neutral-900); font-family: var(--font-sans)",
      eyebrow: (text) => h(ThemeText, { variant: "caption" }, text),
      heading: (text) => h(ThemeHeading, { level: 2 }, text),
      paragraph: (text) => h(ThemeText, null, text),
    }),
  ],
};

export default preview;
