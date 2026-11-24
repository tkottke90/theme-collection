import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { themeStyles } from "./generated/theme-styles.js";

const VARIANT_CLASSES: Record<"primary" | "secondary" | "ghost", string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

@customElement("theme-button")
export class ThemeButton extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
      }
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
        border: 3px solid var(--color-void);
        border-radius: var(--radius-theme);
        padding: 0.5rem 1.25rem;
        font-family: var(--font-sans);
        font-size: 0.875rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        cursor: pointer;
        color: var(--ink);
        background: linear-gradient(180deg, var(--face-hi), var(--face) 45%, var(--face-lo));
        box-shadow:
          inset 0 2px 0 rgba(255, 255, 255, 0.28),
          inset 0 -3px 0 rgba(0, 0, 0, 0.3),
          0 3px 0 var(--color-void),
          0 6px 10px rgba(0, 0, 0, 0.5);
        transition:
          transform 0.06s ease,
          filter 0.15s ease;
      }
      .btn:hover {
        filter: brightness(1.12);
      }
      .btn:active {
        transform: translateY(2px);
        box-shadow:
          inset 0 2px 0 rgba(255, 255, 255, 0.2),
          inset 0 -2px 0 rgba(0, 0, 0, 0.3),
          0 1px 0 var(--color-void);
      }
      .btn:focus-visible {
        outline: 2px solid var(--color-brand-500);
        outline-offset: 3px;
      }
      .btn-primary {
        --face-hi: var(--color-brand-400);
        --face: var(--color-brand-500);
        --face-lo: var(--color-brand-600);
        --ink: var(--color-brand-900);
      }
      .btn-secondary {
        --face-hi: var(--color-surface-raised);
        --face: var(--color-surface);
        --face-lo: var(--color-void);
        --ink: var(--color-brand-500);
        border-color: var(--color-brand-500);
      }
      .btn-ghost {
        --face-hi: transparent;
        --face: transparent;
        --face-lo: transparent;
        --ink: var(--color-brand-500);
        border-color: transparent;
        box-shadow: none;
      }
      .btn-ghost:hover {
        --face: var(--color-surface-raised);
      }
      .btn:disabled {
        cursor: not-allowed;
        filter: none;
        box-shadow: none;
        border-color: var(--color-border);
        --face-hi: var(--color-surface-alt);
        --face: var(--color-surface-alt);
        --face-lo: var(--color-surface-alt);
        --ink: var(--color-text-muted);
      }
    `,
  ];

  @property({ type: String }) label = "Click me";
  @property({ type: String, reflect: true }) variant: "primary" | "secondary" | "ghost" = "primary";
  @property({ type: Boolean, reflect: true }) disabled = false;
  /**
   * Accessible name, forwarded to the inner `<button>` — an `aria-label` left
   * on the host never reaches it. Needed for icon-only buttons.
   */
  @property({ type: String, attribute: "accessible-label" }) accessibleLabel?: string;

  render() {
    return html`<button
      aria-label=${ifDefined(this.accessibleLabel)}
      ?disabled=${this.disabled}
      class="btn ${VARIANT_CLASSES[this.variant]}"
    >
      <slot>${this.label}</slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-button": ThemeButton;
  }
}
