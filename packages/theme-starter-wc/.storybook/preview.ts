import type { Preview } from "@storybook/web-components";
import { html } from "lit";
import { litIntroDecorator } from "../../../shared/storybook/intro-lit.js";
import "../src/index.js";
import { themeStyles } from "../src/generated/theme-styles.js";

// Load the compiled tokens as a page-level stylesheet too, so the backdrop
// below (outside any shadow root) can use the same tokens.
const pageStyle = document.createElement("style");
pageStyle.textContent = themeStyles.cssText;
document.head.appendChild(pageStyle);

// When copying this starter: swap the backdrop for your theme's page
// background (from its own tokens) and render the intro text with your
// theme's text components.
const preview: Preview = {
  decorators: [
    litIntroDecorator({
      backdrop:
        "background: var(--color-neutral-50); color: var(--color-neutral-900); font-family: var(--font-sans)",
      eyebrow: (text) => html`<theme-text variant="caption">${text}</theme-text>`,
      heading: (text) => html`<theme-heading level="2">${text}</theme-heading>`,
      paragraph: (text) => html`<theme-text>${text}</theme-text>`,
    }),
  ],
};

export default preview;
