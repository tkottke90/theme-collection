import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { FormButtonElement } from "./generated/core/form-button.js";
import { themeStyles } from "./generated/theme-styles.js";

const VARIANT_CLASSES: Record<"primary" | "secondary" | "ghost", string> = {
  primary: "chamfer bg-brand-500 text-neutral-900 hover:bg-brand-600",
  secondary:
    "rounded-theme bg-transparent text-link border border-current hover:bg-[color-mix(in_srgb,currentColor_10%,transparent)]",
  ghost:
    "rounded-theme bg-transparent text-link hover:bg-[color-mix(in_srgb,currentColor_10%,transparent)]",
};

/**
 * A form-associated button (see `FormButtonElement`): `type="submit"` or
 * `"reset"` acts on its form, it follows `<fieldset disabled>`, and it is
 * named by the host's `aria-label`.
 */
@customElement("theme-button")
export class ThemeButton extends FormButtonElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
      }
      /* Chamfered corners for the primary (solid-fill) variant only —
         clip-path removes a regular CSS border, so it's reserved for the
         fill-only variant here. A bordered chamfer needs the two-layer
         pseudo-element trick (see theme-hexagon-tactical's panel-frame.ts),
         which is overkill for a button-sized shape; secondary/ghost keep a
         plain radius + real border instead. */
      .chamfer {
        clip-path: polygon(
          8px 0,
          100% 0,
          100% calc(100% - 8px),
          calc(100% - 8px) 100%,
          0 100%,
          0 8px
        );
      }
    `,
  ];

  @property({ type: String }) label = "Click me";
  @property({ type: String, reflect: true }) variant: "primary" | "secondary" | "ghost" = "primary";

  render() {
    return html`<button
      aria-label=${ifDefined(this.accessibleName)}
      ?disabled=${this.isDisabled}
      class="px-4 py-2 cursor-pointer whitespace-nowrap text-sm font-semibold tracking-wide uppercase [font:inherit] disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-100 disabled:text-neutral-500 disabled:border-neutral-100 ${VARIANT_CLASSES[this.variant]}"
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
