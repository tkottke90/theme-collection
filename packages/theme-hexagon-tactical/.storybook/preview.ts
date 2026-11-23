import type { Preview } from "@storybook/web-components";
import { html } from "lit";
import "../src/index.js";
import { themeStyles } from "../src/generated/theme-styles.js";

// Load the compiled tokens as a real page-level stylesheet (not just each
// component's own shadow-scoped copy) so the carbon backdrop below — and
// anything else outside a `theme-*` element's shadow tree — can use the same
// `var(--color-bg)` etc. tokens.
const pageStyle = document.createElement("style");
pageStyle.textContent = themeStyles.cssText;
document.head.appendChild(pageStyle);

const preview: Preview = {
  decorators: [
    (story) => html`
      <div
        style="background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(0,0,0,.35)), var(--background-image-carbon); background-color: var(--color-bg); background-size: 100% 100%, 20px 20px, 20px 20px, 20px 20px, 20px 20px, 20px 20px, 20px 20px; color: var(--color-text); min-height: 100vh; padding: 2rem; font-family: var(--font-sans);"
      >
        ${story()}
      </div>
    `,
  ],
};

export default preview;
