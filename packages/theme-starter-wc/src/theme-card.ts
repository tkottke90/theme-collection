import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("theme-card")
export class ThemeCard extends LitElement {
  static styles = css`
    :host {
      --brand-50: #f5f7ff;
      --brand-100: #e8ecfe;
      --brand-900: #262d6b;
      display: block;
    }
    .card {
      border-radius: 0.5rem;
      background-color: var(--brand-50);
      color: var(--brand-900);
      border: 1px solid var(--brand-100);
      padding: 1rem 1.25rem;
    }
  `;

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
