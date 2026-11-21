import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tokens } from "./tokens.js";

@customElement("theme-card")
export class ThemeCard extends LitElement {
  static styles = [
    tokens,
    css`
      :host {
        display: block;
      }
      .card {
        border-radius: var(--radius-theme);
        background-color: var(--brand-50);
        color: var(--brand-900);
        border: 1px solid var(--brand-100);
        padding: 1rem 1.25rem;
      }
    `,
  ];

  @property({ type: String }) heading = "";

  render() {
    return html`
      <div class="card">
        ${this.heading ? html`<h2>${this.heading}</h2>` : null}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-card": ThemeCard;
  }
}
