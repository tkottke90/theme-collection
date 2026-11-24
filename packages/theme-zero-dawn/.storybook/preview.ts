import type { Preview } from "@storybook/web-components";
import { html } from "lit";
import "../src/index.js";
import { themeStyles } from "../src/generated/theme-styles.js";

// Load the compiled tokens as a page-level stylesheet too, so the backdrop
// below (outside any shadow root) can use the same tokens.
const pageStyle = document.createElement("style");
pageStyle.textContent = themeStyles.cssText;
document.head.appendChild(pageStyle);

/**
 * A component's design notes, shown above every one of its stories. Set
 * `parameters.intro` on a stories file's `meta`; set it to `null` on a story
 * to leave that story bare.
 */
export interface StoryIntro {
  /** The custom element's tag, shown as an eyebrow, e.g. "theme-button". */
  tag: string;
  title: string;
  /** One or more paragraphs on how the element was designed. */
  description: string[];
}

const preview: Preview = {
  decorators: [
    (story, context) => {
      const intro = context.parameters["intro"] as StoryIntro | null | undefined;
      return html`
        <div
          style="background: var(--background-image-tri-grid), radial-gradient(ellipse at 50% -20%, color-mix(in srgb, var(--color-haze) 16%, transparent), transparent 65%), var(--color-bg); color: var(--color-text); min-height: 100vh; padding: 2.5rem; font-family: var(--font-serif);"
        >
          ${
            intro
              ? html`<header
                  class="story-intro"
                  style="max-width: 44rem; margin-bottom: 2.5rem; display: flex; flex-direction: column; gap: 0.75rem"
                >
                  <theme-text variant="caption">&lt;${intro.tag}&gt;</theme-text>
                  <theme-heading level="2">${intro.title}</theme-heading>
                  ${intro.description.map((p) => html`<theme-text>${p}</theme-text>`)}
                </header>`
              : null
          }
          ${story()}
        </div>
      `;
    },
  ],
};

export default preview;
