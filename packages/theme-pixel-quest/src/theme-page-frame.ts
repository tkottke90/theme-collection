import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

/**
 * Bonus component, beyond CONTRIBUTING.md's minimum set — the source
 * image's own outer page frame: a straight dark border with a gold
 * pinstripe, matching the source's own border lines. Corner ornaments
 * (a square medallion and a diagonal ribbon flourish) were attempted and
 * dropped — not worth the complexity relative to how little of the source
 * image they reproduced accurately.
 */
@customElement("theme-page-frame")
export class ThemePageFrame extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
      .frame-border {
        background: var(--color-panel-border);
        padding: 3px;
      }
      .frame-pinstripe {
        background: var(--color-panel-border-gold);
        padding: 2px;
      }
      .frame-fill {
        display: block;
        box-sizing: border-box;
        background: var(--color-bg);
        padding: 2rem;
        font-family: var(--font-sans);
        color: var(--color-text);
      }
    `,
  ];

  render() {
    return html`
      <div class="frame-border">
        <div class="frame-pinstripe">
          <div class="frame-fill"><slot></slot></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-page-frame": ThemePageFrame;
  }
}
