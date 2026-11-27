import type { Preview } from "@storybook/html";
import { htmlIntroDecorator } from "../../../shared/storybook/intro-html.js";

// Built by `npm run build` (runs automatically via the pre* npm hooks
// before `storybook dev` / `build-storybook`). It carries the tokens from
// themes/network-ops/theme.css as custom properties, so the backdrop
// below can use them too.
import "../dist/index.css";

const preview: Preview = {
  decorators: [
    // Typography here is applied to elements, not classes, so the intro uses
    // plain h2 / p / code and picks up the theme's rules.
    htmlIntroDecorator({
      backdrop:
        "background: var(--color-bg); color: var(--color-text); font-family: var(--font-sans)",
      eyebrow: (text) => `<p><small><code>${text}</code></small></p>`,
      heading: (text) => `<h2>${text}</h2>`,
      paragraph: (text) => `<p>${text}</p>`,
    }),
  ],
};

export default preview;
