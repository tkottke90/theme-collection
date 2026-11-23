import type { Preview } from "@storybook/web-components";
import { html } from "lit";
import "../src/index.js";
import { themeStyles } from "../src/generated/theme-styles.js";

// Load the compiled tokens as a real page-level stylesheet (not just each
// component's own shadow-scoped copy) so the parchment backdrop below —
// and anything else outside a `theme-*` element's shadow tree — can use
// the same `var(--color-bg)` etc. tokens.
const pageStyle = document.createElement("style");
pageStyle.textContent = themeStyles.cssText;
document.head.appendChild(pageStyle);

const preview: Preview = {
  decorators: [
    (story) => html`
      <div
        style="background-color: var(--color-bg); color: var(--color-text); min-height: 100vh; padding: 2rem; font-family: var(--font-sans);"
      >
        ${story()}
      </div>
    `,
  ],
};

export default preview;
