import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { themeStyles } from "./generated/theme-styles.js";

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
    css`
      :host {
        display: block;
      }
      /*
       * Lists keep their markers: numbers for ol, bullets for ul. Each theme-item's
       * <li> sits in its own shadow root, but list numbering and list-style
       * inheritance follow the flat tree, so the markers come from here.
       */
      ol.list {
        list-style: decimal;
        padding-left: 2.75rem;
      }
      ul.list {
        list-style: disc;
        padding-left: 2.75rem;
      }
    `,
  ];

  @property({ type: String }) as: ThemeContainerTag = "div";

  render() {
    const tag = TAGS[this.as] ?? TAGS.div;
    return staticHtml`<${tag} class="list list-none rounded-theme border border-border bg-[image:var(--grain-soft)] bg-surface-alt text-text px-5 py-4 m-0"><slot></slot></${tag}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-container": ThemeContainer;
  }
}
