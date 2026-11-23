import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { themeStyles } from "./generated/theme-styles.js";
import { pixelFrameStyles, pixelFrameShapes, pixelFrameShapeStyle } from "./pixel-frame.js";

const TAGS: Record<1 | 2 | 3 | 4, StaticValue> = {
  1: literal`h1`,
  2: literal`h2`,
  3: literal`h3`,
  4: literal`h4`,
};

const BADGE_SHAPE = pixelFrameShapes(2, 2, 3, 24);
const BADGE_STYLE = pixelFrameShapeStyle(BADGE_SHAPE);

/**
 * The source image's own headings are never plain text — every one of them
 * (the page title, "Daily Quests", "Power-Ups") is this exact dark-green /
 * gold-ring badge shape with a true pixel bitmap font. That's a step beyond
 * what CONTRIBUTING.md's typography scale literally asks for (plain h1-h4),
 * so it's opt-in via `banner` rather than the default — but it's the one
 * piece of this theme that most directly carries the source's pixel-art
 * identity, so it's here as a first-class heading variant, not a separate
 * bonus component.
 */
@customElement("theme-heading")
export class ThemeHeading extends LitElement {
  static styles = [
    themeStyles,
    pixelFrameStyles,
    css`
      :host {
        display: block;
      }
      h1,
      h2,
      h3,
      h4 {
        margin: 0;
        font-family: var(--font-slab);
        font-weight: 700;
        color: var(--color-text);
      }
      .pixel-frame {
        display: inline-block;
      }
      .pixel-frame__fill {
        display: block;
        padding: 0.75rem 1.5rem;
        text-align: center;
      }
      .pixel-frame__fill h1,
      .pixel-frame__fill h2,
      .pixel-frame__fill h3,
      .pixel-frame__fill h4 {
        font-family: var(--font-pixel);
        color: var(--color-panel-text);
      }
    `,
  ];

  @property({ type: Number }) level: 1 | 2 | 3 | 4 = 1;
  @property({ type: Boolean, reflect: true }) banner = false;

  render() {
    const tag = TAGS[this.level] ?? TAGS[1];
    const heading = staticHtml`<${tag}><slot></slot></${tag}>`;
    if (!this.banner) {
      return heading;
    }
    return staticHtml`<div class="pixel-frame badge" style=${BADGE_STYLE}>
      <div class="pixel-frame__fill">${heading}</div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-heading": ThemeHeading;
  }
}
