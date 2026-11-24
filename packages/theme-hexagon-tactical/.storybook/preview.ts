import type { Preview } from "@storybook/web-components";
import { html } from "lit";
import { litIntroDecorator } from "../../../shared/storybook/intro-lit.js";
import "../src/index.js";
import { themeStyles } from "../src/generated/theme-styles.js";

// Load the compiled tokens as a page-level stylesheet too, so the carbon
// backdrop below (outside any shadow root) can use the same tokens.
const pageStyle = document.createElement("style");
pageStyle.textContent = themeStyles.cssText;
document.head.appendChild(pageStyle);

const preview: Preview = {
  decorators: [
    litIntroDecorator({
      backdrop:
        "background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(0,0,0,.35)), var(--background-image-carbon); background-color: var(--color-bg); background-size: 100% 100%, 20px 20px, 20px 20px, 20px 20px, 20px 20px, 20px 20px, 20px 20px; color: var(--color-text); font-family: var(--font-sans)",
      eyebrow: (text) => html`<theme-text variant="caption">${text}</theme-text>`,
      heading: (text) => html`<theme-heading level="2">${text}</theme-heading>`,
      paragraph: (text) => html`<theme-text>${text}</theme-text>`,
    }),
  ],
};

export default preview;
