import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

export type ThemeToolbarButtonMaterial = "graphite" | "steel" | "danger" | "toggle";

@customElement("theme-toolbar-button")
export class ThemeToolbarButton extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
      }
      .tbtn {
        --face-hi: #6a6a6a;
        --face: #4b4b4b;
        --face-lo: #333;
        --ink: var(--color-text-muted);
        position: relative;
        display: inline-grid;
        place-items: center;
        width: 56px;
        height: 56px;
        padding: 0;
        border: 3px solid var(--color-void);
        border-radius: var(--radius-theme);
        color: var(--ink);
        font-family: var(--font-sans);
        font-size: 1.875rem;
        font-weight: 700;
        line-height: 1;
        cursor: pointer;
        background:
          linear-gradient(315deg, rgba(0, 0, 0, 0.5) 0 11px, transparent 11px),
          linear-gradient(180deg, var(--face-hi), var(--face) 45%, var(--face-lo));
        background-size:
          var(--fold, 0 0),
          100% 100%;
        background-position:
          right bottom,
          0 0;
        background-repeat: no-repeat;
        box-shadow:
          inset 0 2px 0 rgba(255, 255, 255, 0.28),
          inset 0 -3px 0 rgba(0, 0, 0, 0.3),
          0 3px 0 var(--color-void),
          0 6px 10px rgba(0, 0, 0, 0.5);
        transition:
          transform 0.06s ease,
          filter 0.15s ease;
      }
      ::slotted(svg) {
        width: 28px;
        height: 28px;
      }
      .tbtn:hover {
        filter: brightness(1.12);
      }
      .tbtn:active {
        transform: translateY(2px);
        box-shadow:
          inset 0 2px 0 rgba(255, 255, 255, 0.2),
          inset 0 -2px 0 rgba(0, 0, 0, 0.3),
          0 1px 0 var(--color-void);
      }
      .tbtn:focus-visible {
        outline: 2px solid var(--color-brand-500);
        outline-offset: 3px;
      }
      .tbtn.toggle {
        --fold: 100% 100%;
      }
      .tbtn.toggle[aria-pressed="true"] {
        --face-hi: var(--color-brand-400);
        --face: var(--color-brand-500);
        --face-lo: var(--color-brand-600);
        --ink: var(--color-brand-900);
      }
      .tbtn.toggle[aria-pressed="false"] {
        --ink: var(--color-text-muted);
      }
      .tbtn.danger {
        --face-hi: #6b2622;
        --face: #4a1a17;
        --face-lo: #2e0f0d;
        --ink: var(--color-danger-500);
      }
      .tbtn.steel {
        --face-hi: #f2f2f2;
        --face: #d6d6d6;
        --face-lo: #a9a9a9;
        --ink: #2a2a2a;
      }
    `,
  ];

  @property({ type: String, reflect: true }) material: ThemeToolbarButtonMaterial = "graphite";
  @property({ type: Boolean }) pressed = false;
  @property({ type: String }) label = "";

  render() {
    const materialClass = this.material === "graphite" ? "" : this.material;
    const pressedAttr = this.material === "toggle" ? String(Boolean(this.pressed)) : nothing;
    return html`<button
      class="tbtn ${materialClass}"
      aria-pressed=${pressedAttr}
      aria-label=${this.label}
    >
      <slot></slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-toolbar-button": ThemeToolbarButton;
  }
}
