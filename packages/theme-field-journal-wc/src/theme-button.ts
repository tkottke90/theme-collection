import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { themeStyles } from "./generated/theme-styles.js";

/**
 * A small leather tab: solid colour, grain, light cream label text — the
 * same treatment as the book's navigation tabs (see theme-journal-book),
 * scaled down to an inline control.
 */
const VARIANT_CLASSES: Record<"primary" | "secondary" | "ghost", string> = {
  primary:
    "bg-[image:var(--grain)] bg-brand-500 text-[color:var(--text-on-dark)] shadow-card hover:bg-brand-600",
  secondary: "bg-transparent text-brand-500 border border-brand-500 hover:bg-brand-50",
  ghost: "bg-transparent text-brand-500 hover:bg-brand-50",
};

@customElement("theme-button")
export class ThemeButton extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
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
      class="rounded-tab px-4 py-2 cursor-pointer font-title text-sm tracking-wide uppercase border-0 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-text-muted disabled:border-neutral-100 disabled:opacity-70 disabled:shadow-none ${VARIANT_CLASSES[this.variant]}"
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
