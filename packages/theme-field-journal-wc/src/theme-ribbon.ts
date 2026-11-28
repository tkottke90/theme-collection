import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { CATEGORY_BG, type JournalCategoryColor } from "./journal-categories.js";

/** A cloth banner heading with notched ends — a section heading on a page (the page title itself uses theme-heading). */
@customElement("theme-ribbon")
export class ThemeRibbon extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
      .ribbon {
        display: block;
        width: fit-content;
        margin: 0 auto;
        padding: 7px 34px 6px;
        font-family: var(--font-title);
        font-size: 15px;
        font-weight: 400;
        letter-spacing: 0.08em;
        color: var(--text-on-dark);
        background:
          var(--grain),
          linear-gradient(
            180deg,
            var(--ribbon-color),
            color-mix(in srgb, var(--ribbon-color) 85%, black)
          );
        clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 50%, 100% 100%, 0 100%, 12px 50%);
      }
    `,
  ];

  @property({ type: String }) color: JournalCategoryColor = "red";

  render() {
    return html`<h2 class="ribbon" style="--ribbon-color:${CATEGORY_BG[this.color]}">
      <slot></slot>
    </h2>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-ribbon": ThemeRibbon;
  }
}
