import type { Preview } from "@storybook/web-components";
import { html } from "lit";
import "../src/index.js";
import { themeStyles } from "../src/generated/theme-styles.js";

// Load the compiled tokens as a real page-level stylesheet (not just each
// component's own shadow-scoped copy) so the green-felt backdrop below —
// and anything else outside a `theme-*` element's shadow tree — can use the
// same `var(--color-bg)` etc. tokens.
const pageStyle = document.createElement("style");
pageStyle.textContent = themeStyles.cssText;
document.head.appendChild(pageStyle);

const preview: Preview = {
  decorators: [
    (story) => html`
      <div
        style="background: var(--grain), radial-gradient(ellipse at 50% 35%, var(--table-highlight) 0%, var(--color-bg) 45%, var(--table-dark) 100%); min-height: 100vh; padding: 3rem; font-family: var(--font-sans); color: var(--color-text);"
      >
        ${story()}
      </div>
    `,
  ],
};

export default preview;
