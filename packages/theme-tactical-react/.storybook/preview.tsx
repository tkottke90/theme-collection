import type { Preview } from "@storybook/preact";
import { h } from "preact";
import { preactIntroDecorator } from "../../../shared/storybook/intro-preact.js";
import { ThemeHeading, ThemeText } from "../src/index.js";

// Built by `npm run build` (runs automatically via the pre* npm hooks
// before `storybook dev` / `build-storybook`). It carries the tokens from
// themes/tactical/theme.css as custom properties, so the backdrop below can
// use them too. Tailwind only emits the tokens the components use, so the
// backdrop tokens are ones the components use as well.
import "../dist/theme.css";

const preview: Preview = {
  decorators: [
    preactIntroDecorator({
      backdrop:
        "background: var(--color-bg); color: var(--color-text); font-family: var(--font-sans)",
      eyebrow: (text) => h(ThemeText, { variant: "caption" }, text),
      heading: (text) => h(ThemeHeading, { level: 2 }, text),
      paragraph: (text) => h(ThemeText, null, text),
    }),
  ],
};

export default preview;
