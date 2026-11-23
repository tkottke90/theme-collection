import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { themeStyles } from "./generated/theme-styles.js";
import { panelFrameStyles } from "./panel-frame.js";

export type ThemeContainerTag = "div" | "ol" | "ul";

const TAGS: Record<ThemeContainerTag, StaticValue> = {
  div: literal`div`,
  ol: literal`ol`,
  ul: literal`ul`,
};

@customElement("theme-container")
export class ThemeContainer extends LitElement {
  static styles = [
    themeStyles,
    panelFrameStyles,
    css`
      :host {
        display: block;
      }
      .panel {
        margin: 0;
        list-style: none;
      }
    `,
  ];

  @property({ type: String }) as: ThemeContainerTag = "div";

  render() {
    const tag = TAGS[this.as] ?? TAGS.div;
    return staticHtml`<${tag} class="panel"><slot></slot></${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-container": ThemeContainer;
  }
}
