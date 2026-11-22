import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

/** A cream card with ruled lines, for handwritten margin notes — the default slot sits on the ruling, matching Caveat's 28px line height. */
@customElement("theme-notes")
export class ThemeNotes extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
      .notes p {
        margin: 0;
        font-family: var(--font-hand);
        font-size: 21px;
        line-height: 28px;
        background: repeating-linear-gradient(transparent 0 27px, rgba(120, 90, 50, 0.2) 27px 28px);
      }
    `,
  ];

  @property({ type: String }) heading = "";

  render() {
    return html`
      <div
        class="notes rounded-theme bg-[image:var(--grain-soft)] bg-surface-alt border border-border shadow-card px-[18px] pt-3.5 pb-4"
      >
        ${
          this.heading
            ? html`<h4
                class="m-0 mb-1.5 text-center font-title text-sm font-normal tracking-[0.06em]"
              >
                ${this.heading}
              </h4>`
            : null
        }
        <p><slot></slot></p>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-notes": ThemeNotes;
  }
}
