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
      /* The inner element is the only child in this shadow root, so Tailwind's
         last: variant always matched it; key the last row off the host instead. */
      :host(:last-child) > * {
        border-bottom-width: 0;
      }
    `,
  ];

  @property({ type: String }) as: ThemeItemTag = "li";

  render() {
    const tag = TAGS[this.as] ?? TAGS.li;
    return staticHtml`<${tag} class="py-2 border-b border-border text-text"><slot></slot></${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-item": ThemeItem;
  }
}
