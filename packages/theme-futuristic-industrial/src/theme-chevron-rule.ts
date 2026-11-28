import { LitElement, css, html, svg, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { computeChevrons, type ChevronDirection } from "./chevron-geometry.js";
import { ResizeFrameController } from "./resize-frame-controller.js";

/**
 * A directional divider — a row of steep chevrons, from the reference sheet.
 * `right`/`left` fill the width at `size` px tall; `down`/`up` fill the
 * parent's height at `size` px wide.
 */
@customElement("theme-chevron-rule")
export class ThemeChevronRule extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
      :host([direction="down"]),
      :host([direction="up"]) {
        display: inline-block;
        height: 100%;
      }
    `,
  ];

  @property({ type: String, reflect: true }) direction: ChevronDirection = "right";
  /** Rule thickness, px. */
  @property({ type: Number }) size = 20;

  private frame = new ResizeFrameController(this, (w, h) => computeChevrons(w, h, this.direction));

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("role", "separator");
  }

  protected updated(changed: PropertyValues<this>): void {
    const vertical = this.direction === "down" || this.direction === "up";
    this.setAttribute("aria-orientation", vertical ? "vertical" : "horizontal");
    if (changed.has("direction")) this.frame.measure();
  }

  render() {
    const g = this.frame.geometry;
    const vertical = this.direction === "down" || this.direction === "up";
    const box = vertical ? `width:${this.size}px;height:100%` : `width:100%;height:${this.size}px`;
    return html`<svg
      class="block"
      style=${box}
      viewBox=${g?.viewBox ?? "0 0 1 1"}
      aria-hidden="true"
    >
      ${svg`<path d=${g?.d ?? ""} fill="var(--color-neutral-900)" />`}
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-chevron-rule": ThemeChevronRule;
  }
}
