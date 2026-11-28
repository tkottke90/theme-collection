import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { themeStyles } from "./generated/theme-styles.js";

export type ThemeItemTag = "li" | "div";

const TAGS: Record<ThemeItemTag, StaticValue> = {
  li: literal`li`,
  div: literal`div`,
};

@customElement("theme-item")
export class ThemeItem extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
      /*
       * Every row has a rule underneath except the last. A "last" utility
       * can't do this: each <li> is the only child of its own shadow root,
       * so it would match every row. Ask whether the host is the last child.
       */
      :host(:last-child) .row {
        border-bottom-width: 0;
      }
      li::marker {
        color: var(--color-text-muted);
        font-family: var(--font-slab);
        font-weight: 700;
      }
    `,
  ];

  @property({ type: String }) as: ThemeItemTag = "li";

  render() {
    const tag = TAGS[this.as] ?? TAGS.li;
    return staticHtml`<${tag}
      class="row py-2 border-b border-border font-sans text-text"
      ><slot></slot
    ></${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-item": ThemeItem;
  }
}
