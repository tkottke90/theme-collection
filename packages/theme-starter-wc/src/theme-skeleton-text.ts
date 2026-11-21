import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tokens } from "./tokens.js";

@customElement("theme-skeleton-text")
export class ThemeSkeletonText extends LitElement {
  static styles = [
    tokens,
    css`
      :host {
        display: block;
      }
      @keyframes shimmer {
        0% {
          background-position: -200px 0;
        }
        100% {
          background-position: 200px 0;
        }
      }
      .bar {
        height: 0.875rem;
        margin-bottom: 0.375rem;
        border-radius: var(--radius-theme);
        background: linear-gradient(
          90deg,
          var(--skeleton-base) 25%,
          var(--skeleton-highlight) 37%,
          var(--skeleton-base) 63%
        );
        background-size: 400px 100%;
        animation: shimmer 1.4s ease-in-out infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .bar {
          animation: none;
        }
      }
    `,
  ];

  @property({ type: String }) width = "100%";

  render() {
    return html`<div class="bar" style="width:${this.width}"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-skeleton-text": ThemeSkeletonText;
  }
}
