import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { themeStyles } from "./generated/theme-styles.js";
import { PlateFrameController } from "./plate-frame-controller.js";
import { renderPlateFrame } from "./plate-frame-svg.js";

export type ThemeContainerTag = "div" | "ol" | "ul";

const TAGS: Record<ThemeContainerTag, StaticValue> = {
  div: literal`div`,
  ol: literal`ol`,
  ul: literal`ul`,
};

/**
 * A generic styled wrapper with a lighter plate border than `theme-card`:
 * one chamfered corner, no rivets, no hazard stripe — a plainer crate/bin
 * panel rather than a riveted, tagged plate.
 */
@customElement("theme-container")
export class ThemeContainer extends LitElement {
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

  private frame = new PlateFrameController(this, {
    cut: 14,
    cutCorners: ["tl"],
    rivets: false,
    stripeCorner: null,
  });

  render() {
    const tag = TAGS[this.as] ?? TAGS.div;
    return staticHtml`
      ${renderPlateFrame(this.frame.geometry)}
      <${tag} class="relative font-sans text-neutral-900 px-5 py-4 m-0"><slot></slot></${tag}>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-container": ThemeContainer;
  }
}
