import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { themeStyles } from "./generated/theme-styles.js";
import { lightSurface } from "./surfaces.js";
import { HazardFrameController } from "./hazard-frame-controller.js";
import { renderHazardFrame, type HazardVariant } from "./hazard-frame-svg.js";
import type { ThemeContainerTag } from "./theme-container.js";

const TAGS: Record<ThemeContainerTag, StaticValue> = {
  div: literal`div`,
  ol: literal`ol`,
  ul: literal`ul`,
};

/**
 * Same role as `theme-container`, framed in the reference sheet's hazard tape
 * instead of a plate: an orange band with charcoal diagonal stripes, chamfered
 * at the top-right and bottom-left like the source bar's ends. For restricted
 * or high-attention areas rather than everyday grouping; `variant="light"` is
 * the quieter tape for areas that need marking but not alarm.
 */
@customElement("theme-hazard-container")
export class ThemeHazardContainer extends LitElement {
  static styles = [
    themeStyles,
    lightSurface,
    css`
      :host {
        display: block;
        position: relative;
        isolation: isolate;
      }
    `,
  ];

  @property({ type: String }) as: ThemeContainerTag = "div";
  /** `dark`: charcoal stripes on orange. `light`: orange stripes on a light band. */
  @property({ type: String, reflect: true }) variant: HazardVariant = "dark";

  private frame = new HazardFrameController(this);

  render() {
    const tag = TAGS[this.as] ?? TAGS.div;
    return staticHtml`
      ${renderHazardFrame(this.frame.geometry, this.variant)}
      <${tag} class="relative font-sans text-fg p-8 m-0"><slot></slot></${tag}>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-hazard-container": ThemeHazardContainer;
  }
}
