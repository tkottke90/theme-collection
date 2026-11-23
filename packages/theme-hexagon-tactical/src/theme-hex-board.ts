import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

/**
 * Flat-topped hex grid container. Sets `--w`/`--cols`/`--rows` as inherited
 * custom properties on itself; each slotted `theme-hex-socket` reads `--w`
 * (plus its own `--q`/`--r`) to position itself, since custom properties
 * inherit from a light-DOM parent into its slotted children regardless of
 * the shadow boundary — see hex-tactical-style-guide.md §4.4.
 */
@customElement("theme-hex-board")
export class ThemeHexBoard extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        position: relative;
        display: block;
        --h: calc(var(--w) * 0.866);
        width: calc((var(--cols) * 0.75 + 0.25) * var(--w));
        height: calc((var(--rows) + 0.5) * var(--h));
      }
    `,
  ];

  @property({ type: Number }) cols = 5;
  @property({ type: Number }) rows = 5;
  @property({ type: Number }) w = 88;

  protected updated(): void {
    this.style.setProperty("--w", `${this.w}px`);
    this.style.setProperty("--cols", String(this.cols));
    this.style.setProperty("--rows", String(this.rows));
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-hex-board": ThemeHexBoard;
  }
}
