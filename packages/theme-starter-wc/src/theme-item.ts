import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { tokens } from "./tokens.js";

export type ThemeItemTag = "li" | "div";

const TAGS: Record<ThemeItemTag, StaticValue> = {
  li: literal`li`,
  div: literal`div`,
};

@customElement("theme-item")
export class ThemeItem extends LitElement {
  static styles = [
    tokens,
    css`
      :host {
        display: block;
      }
      li,
      div {
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--neutral-100);
        color: var(--neutral-900);
      }
      li:last-child,
      div:last-child {
        border-bottom: none;
      }
    `,
  ];

  @property({ type: String }) as: ThemeItemTag = "li";

  render() {
    const tag = TAGS[this.as] ?? TAGS.li;
    return staticHtml`<${tag}><slot></slot></${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-item": ThemeItem;
  }
}
