import type { Preview } from "@storybook/html";
import { htmlIntroDecorator } from "../../../shared/storybook/intro-html.js";

// Built by `npm run build` (runs automatically via the pre* npm hooks
// before `storybook dev` / `build-storybook`). It carries the tokens from
// themes/forest-isle/theme.css as custom properties, so the backdrop below
// can use them too.
import "../dist/index.css";

const preview: Preview = {
  decorators: [
    htmlIntroDecorator({
      backdrop:
        "background: var(--color-bg); color: var(--color-text); font-family: var(--font-sans)",
      eyebrow: (text) => `<p class="theme-text theme-text--caption"><code>${text}</code></p>`,
      heading: (text) => `<h2 class="theme-heading theme-heading--h2">${text}</h2>`,
      paragraph: (text) => `<p class="theme-text">${text}</p>`,
    }),
  ],
};

export default preview;
