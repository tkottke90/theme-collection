import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { themeStyles } from "./generated/theme-styles.js";
import { pixelFrameStyles, pixelFrameShapes, pixelFrameShapeStyle } from "./pixel-frame.js";

export type ThemeContainerTag = "div" | "ol" | "ul";

const TAGS: Record<ThemeContainerTag, StaticValue> = {
  div: literal`div`,
  ol: literal`ol`,
  ul: literal`ul`,
};

const FRAME_SHAPE = pixelFrameShapes(2, 2, 0, 24);
const SHAPE_STYLE = pixelFrameShapeStyle(FRAME_SHAPE);

@customElement("theme-container")
export class ThemeContainer extends LitElement {
  static styles = [
    themeStyles,
    pixelFrameStyles,
    css`
      :host {
        display: block;
      }
      .pixel-frame {
        display: block;
      }
      .pixel-frame__fill {
        display: block;
        margin: 0;
        padding: 1rem 1.25rem;
        font-family: var(--font-sans);
        color: var(--color-text);
      }
    `,
  ];

  @property({ type: String }) as: ThemeContainerTag = "div";

  render() {
    const tag = TAGS[this.as] ?? TAGS.div;
    return staticHtml`<div class="pixel-frame" style=${SHAPE_STYLE}>
      <${tag} class="pixel-frame__fill"><slot></slot></${tag}>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-container": ThemeContainer;
  }
}
