import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { themeStyles } from "./generated/theme-styles.js";
import { HazardFrameController } from "./hazard-frame-controller.js";
import { renderHazardFrame } from "./hazard-frame-svg.js";
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
 * or high-attention areas rather than everyday grouping.
 */
@customElement("theme-hazard-container")
export class ThemeHazardContainer extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
        position: relative;
        isolation: isolate;
      }
    `,
  ];

  @property({ type: String }) as: ThemeContainerTag = "div";

  private frame = new HazardFrameController(this);

  render() {
    const tag = TAGS[this.as] ?? TAGS.div;
    return staticHtml`
      ${renderHazardFrame(this.frame.geometry)}
      <${tag} class="relative font-sans text-neutral-900 p-8 m-0"><slot></slot></${tag}>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-hazard-container": ThemeHazardContainer;
  }
}
