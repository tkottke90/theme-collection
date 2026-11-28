import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { themeStyles } from "./generated/theme-styles.js";

export type ThemeItemTag = "li" | "div";

const TAGS: Record<ThemeItemTag, StaticValue> = {
  li: literal`li`,
  div: literal`div`,
};

/**
 * A generic styled child with a hazard-stripe tab on its leading edge. In a
 * `ul` the tab is the row's bullet; an `ol` container hides it and shows the
 * native number instead (see `theme-container`).
 */
@customElement("theme-item")
export class ThemeItem extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
      /* Each <li> is the only child of its shadow root, so a last: utility would
         match every row; key the last row off the host instead. */
      :host(:last-child) .row {
        border-bottom-width: 0;
      }
      .row {
        padding-left: var(--fi-item-gutter, 1rem);
      }
      .row::before {
        content: "";
        position: absolute;
        inset-block: 2px;
        left: 0;
        width: 6px;
        background-image: var(--background-image-hazard);
        display: var(--fi-item-tab-display, block);
      }
      li::marker {
        color: var(--color-fg-muted);
        font-weight: 600;
      }
    `,
  ];

  @property({ type: String }) as: ThemeItemTag = "li";

  render() {
    const tag = TAGS[this.as] ?? TAGS.li;
    return staticHtml`<${tag} class="row relative py-2 border-b border-neutral-100 text-fg"><slot></slot></${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-item": ThemeItem;
  }
}
