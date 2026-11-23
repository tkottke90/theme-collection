import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { themeStyles } from "./generated/theme-styles.js";

export type ThemeItemTag = "li" | "div";

const TAGS: Record<ThemeItemTag, StaticValue> = {
  li: literal`li`,
  div: literal`div`,
};

/** A generic styled child with a hazard-stripe tab on its leading edge. */
@customElement("theme-item")
export class ThemeItem extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: String }) as: ThemeItemTag = "li";

  render() {
    const tag = TAGS[this.as] ?? TAGS.li;
    return staticHtml`<${tag} class="relative pl-4 py-2 border-b border-neutral-100 text-neutral-900 last:border-b-0 before:absolute before:inset-y-0.5 before:left-0 before:w-1.5 before:bg-hazard"><slot></slot></${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-item": ThemeItem;
  }
}
