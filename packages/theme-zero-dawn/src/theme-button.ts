import { LitElement, css, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import type { PlateGeometry } from "./plate-geometry.js";
import { PlateFrameController, renderBevel } from "./plate-frame-svg.js";

type ButtonVariant = "primary" | "secondary" | "ghost";

/**
 * Per-variant face/edge colours as arbitrary-property utilities (so they
 * resolve from theme tokens), plus whether the button is a raised plate:
 * raised buttons get the faceted bevel and the hard core drop, like Card.
 */
const VARIANTS: Record<ButtonVariant, { classes: string; raised: boolean }> = {
  primary: {
    classes:
      "text-core [--zd-face:var(--color-plate-100)] [--zd-edge:transparent] hover:[--zd-face:var(--color-plate-50)]",
    raised: true,
  },
  secondary: {
    classes:
      "text-text [--zd-face:var(--color-plate-700)] [--zd-edge:transparent] hover:[--zd-face:var(--color-plate-500)]",
    raised: true,
  },
  ghost: {
    classes:
      "text-brand-300 [--zd-face:transparent] [--zd-edge:transparent] hover:[--zd-face:var(--color-core)]",
    raised: false,
  },
};

const DISABLED = {
  classes:
    "cursor-not-allowed text-text-muted [--zd-face:var(--color-plate-800)] [--zd-edge:var(--color-plate-700)]",
  raised: false,
};

/** Chamfered top-left and bottom-right only, as before; a 3px bevel band. */
const BUTTON_PLATE = { cut: 10, smallCut: 0, groove: 3, drop: 3, notch: false };

function renderButtonFrame(g: PlateGeometry | null, raised: boolean) {
  return svg`
    <svg
      class="frame pointer-events-none absolute inset-0 -z-10 block h-full w-full"
      style="overflow: visible"
      viewBox=${g?.viewBox ?? "0 0 1 1"}
      aria-hidden="true"
    >
      ${
        g
          ? svg`
            <defs><clipPath id="zd-btn-clip"><path d=${g.underD} /></clipPath></defs>
            ${raised ? svg`<path class="drop" d=${g.dropD} fill="var(--color-core-deep)" />` : null}
            <path class="face" d=${g.underD} style="fill: var(--zd-face)" />
            ${raised ? renderBevel(g, "zd-btn-clip") : null}
            <path class="edge" d=${g.underD} fill="none" style="stroke: var(--zd-edge)" stroke-width="1.5" />
          `
          : null
      }
    </svg>
  `;
}

@customElement("theme-button")
export class ThemeButton extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
        position: relative;
        isolation: isolate;
      }
      .face,
      .edge {
        transition:
          fill 0.15s ease,
          stroke 0.15s ease;
      }
      button:focus-visible {
        outline: none;
        --zd-edge: var(--color-brand-500);
      }
      button:focus-visible .frame {
        filter: drop-shadow(0 0 5px var(--color-brand-500));
      }
      @media (prefers-reduced-motion: reduce) {
        .face,
        .edge {
          transition: none;
        }
      }
    `,
  ];

  @property({ type: String }) label = "Click me";
  @property({ type: String, reflect: true }) variant: ButtonVariant = "primary";
  @property({ type: Boolean, reflect: true }) disabled = false;

  private frame = new PlateFrameController(this, BUTTON_PLATE);

  render() {
    const v = this.disabled ? DISABLED : (VARIANTS[this.variant] ?? VARIANTS.primary);
    return html`<button
      ?disabled=${this.disabled}
      class="relative isolate block cursor-pointer border-0 bg-transparent px-5 py-2.5 font-sans text-sm font-semibold tracking-[0.12em] uppercase ${v.classes}"
    >
      ${renderButtonFrame(this.frame.geometry, v.raised)}
      <slot>${this.label}</slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-button": ThemeButton;
  }
}
