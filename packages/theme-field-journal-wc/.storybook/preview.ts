import type { Preview } from "@storybook/web-components";
import { html } from "lit";
import { litIntroDecorator } from "../../../shared/storybook/intro-lit.js";
import "../src/index.js";
import { themeStyles } from "../src/generated/theme-styles.js";

// Load the compiled tokens as a real page-level stylesheet (not just each
// component's own shadow-scoped copy) so the green-felt backdrop below, and
// anything else outside a `theme-*` element's shadow tree, can use the same
// tokens.
const pageStyle = document.createElement("style");
pageStyle.textContent = themeStyles.cssText;
document.head.appendChild(pageStyle);

// The backdrop is the dark green table, so the intro text is set in the
// theme's cream-on-dark ink (`--text-on-dark`) rather than the parchment
// theme-text components, whose dark ink would vanish against it.
const INK = "color: var(--text-on-dark); margin: 0";

const preview: Preview = {
  decorators: [
    litIntroDecorator({
      backdrop:
        "background: var(--grain), radial-gradient(ellipse at 50% 35%, var(--table-highlight) 0%, var(--color-bg) 45%, var(--table-dark) 100%); color: var(--color-text); font-family: var(--font-sans)",
      eyebrow: (text) =>
        html`<span style="${INK}; font-family: var(--font-hand); font-size: 1.25rem"
          >${text}</span
        >`,
      heading: (text) =>
        html`<h2 style="${INK}; font-family: var(--font-head); font-size: 2rem; font-weight: 400">
          ${text}
        </h2>`,
      paragraph: (text) =>
        html`<p
          style="${INK}; font-family: var(--font-sans); font-size: 1.0625rem; line-height: 1.5"
        >
          ${text}
        </p>`,
    }),
  ],
};

export default preview;
