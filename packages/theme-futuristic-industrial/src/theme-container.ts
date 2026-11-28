import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { themeStyles } from "./generated/theme-styles.js";
import { lightSurface } from "./surfaces.js";
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
    lightSurface,
    css`
      :host {
        display: block;
        position: relative;
        isolation: isolate;
      }
      /*
       * An ol shows numbers in place of each item's hazard tab: list-style
       * inherits through the flat tree into each theme-item's <li>, and the
       * inherited custom property tells the item to hide its tab. A ul keeps
       * the tabs as its bullets.
       */
      ol.list {
        list-style: decimal;
        padding-left: 2.75rem;
        --fi-item-tab-display: none;
        --fi-item-gutter: 0.5rem;
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
      <${tag} class="list list-none relative font-sans text-neutral-900 px-5 py-4 m-0"><slot></slot></${tag}>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-container": ThemeContainer;
  }
}
