import { LitElement, css, html, svg, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { ResizeFrameController } from "./resize-frame-controller.js";
import { lightSurface } from "./surfaces.js";
import { computeTabPanel } from "./tab-panel-geometry.js";

const TAB_HEIGHT = 30;
/** Space either side of the label inside the tab, px. */
const TAB_PADDING = 16;

/**
 * A thin-ruled panel whose heading sits in a raised tab, from the reference
 * sheet's large outlined panel. The tab is sized to the rendered heading.
 */
@customElement("theme-tab-panel")
export class ThemeTabPanel extends LitElement {
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

  @property({ type: String }) heading = "";

  private frame = new ResizeFrameController(this, (w, h) =>
    computeTabPanel(w, h, { tabWidth: this.labelWidth(), tabHeight: TAB_HEIGHT }),
  );

  private labelWidth(): number | undefined {
    const label = this.renderRoot?.querySelector<HTMLElement>(".tab-label");
    return label ? label.getBoundingClientRect().width + 2 * TAB_PADDING : undefined;
  }

  protected updated(changed: PropertyValues<this>): void {
    if (changed.has("heading")) this.frame.measure();
  }

  render() {
    const g = this.frame.geometry;
    return html`
      <svg
        class="pointer-events-none absolute inset-0 block h-full w-full"
        viewBox=${g?.viewBox ?? "0 0 1 1"}
        aria-hidden="true"
      >
        ${svg`
          <path d=${g?.outerD ?? ""} fill="var(--color-neutral-50)" stroke="var(--color-neutral-900)" stroke-width="2" />
          <path d=${g?.innerD ?? ""} fill="none" stroke="var(--color-neutral-300)" stroke-width="1" />
        `}
      </svg>
      ${
        this.heading
          ? html`<h2
              class="tab-label absolute top-0.5 left-4 m-0 h-[30px] max-w-[55%] truncate text-xs leading-[30px] font-semibold tracking-widest text-brand-700 uppercase"
            >
              ${this.heading}
            </h2>`
          : null
      }
      <div class="relative px-7 pt-12 pb-8 font-sans text-fg"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-tab-panel": ThemeTabPanel;
  }
}
