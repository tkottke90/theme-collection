import type { Preview } from "@storybook/web-components";
import { html } from "lit";
import { litIntroDecorator } from "../../../shared/storybook/intro-lit.js";
import "../src/index.js";
import { themeStyles } from "../src/generated/theme-styles.js";

// Load the compiled tokens as a real page-level stylesheet (not just each
// component's own shadow-scoped copy) so the backdrop below, and anything
// else outside a `theme-*` element's shadow tree, can use the same
// `var(--color-bg)` etc. tokens. They follow the OS light/dark setting.
const pageStyle = document.createElement("style");
pageStyle.textContent = themeStyles.cssText;
document.head.appendChild(pageStyle);

const preview: Preview = {
  decorators: [
    litIntroDecorator({
      backdrop:
        "background: var(--color-bg); color: var(--color-text); font-family: var(--font-sans)",
      eyebrow: (text) => html`<theme-text variant="caption">${text}</theme-text>`,
      heading: (text) => html`<theme-heading level="2">${text}</theme-heading>`,
      paragraph: (text) => html`<theme-text>${text}</theme-text>`,
    }),
  ],
};

export default preview;
