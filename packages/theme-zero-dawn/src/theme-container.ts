import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { themeStyles } from "./generated/theme-styles.js";
import { PLATE_INK_CLASSES, PlateFrameController, renderPlateFrame } from "./plate-frame-svg.js";

export type ThemeContainerTag = "div" | "ol" | "ul";

const TAGS: Record<ThemeContainerTag, StaticValue> = {
  div: literal`div`,
  ol: literal`ol`,
  ul: literal`ul`,
};

/** Shaded steel plate — the general-purpose wrapper for grouped content. */
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
      /*
       * An ol shows numbers instead of the diamond bead: list-style inherits
       * through the flat tree into each theme-item's <li>, and the inherited
       * custom property tells the item to hide its bead. ul keeps the beads.
       */
      ol.list {
        list-style: decimal;
        padding-left: 3rem;
        --zd-bead-display: none;
        --zd-row-display: inline;
      }
    `,
  ];

  @property({ type: String }) as: ThemeContainerTag = "div";

  private frame = new PlateFrameController(this, { cut: 14, notch: false });

  render() {
    const tag = TAGS[this.as] ?? TAGS.div;
    return html`${renderPlateFrame(this.frame.geometry, "steel")}${staticHtml`<${tag} class="list relative m-0 list-none px-6 py-5 font-serif text-text ${PLATE_INK_CLASSES.steel}"><slot></slot></${tag}>`}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-container": ThemeContainer;
  }
}
