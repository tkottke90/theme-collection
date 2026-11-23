import type { Preview } from "@storybook/web-components";
import { html } from "lit";
import "../src/index.js";
import { themeStyles } from "../src/generated/theme-styles.js";

// Load the compiled tokens as a page-level stylesheet too, so the backdrop
// below (outside any shadow root) can use the same tokens.
const pageStyle = document.createElement("style");
pageStyle.textContent = themeStyles.cssText;
document.head.appendChild(pageStyle);

const preview: Preview = {
  decorators: [
    (story) => html`
      <div
        style="background: var(--background-image-tri-grid), radial-gradient(ellipse at 50% -20%, color-mix(in srgb, var(--color-haze) 16%, transparent), transparent 65%), var(--color-bg); color: var(--color-text); min-height: 100vh; padding: 2.5rem; font-family: var(--font-serif);"
      >
        ${story()}
      </div>
    `,
  ],
};

export default preview;
