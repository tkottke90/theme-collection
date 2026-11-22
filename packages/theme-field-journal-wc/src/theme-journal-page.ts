import { LitElement, css, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { renderPaperFilters, renderPageGradients, renderFlourishPath } from "./journal-defs-svg.js";

const STACK = [
  { d: 7.5, dy: 6, fill: "var(--paper-edge-2)" },
  { d: 5, dy: 4, fill: "var(--paper-edge-1)" },
  { d: 2.5, dy: 2, fill: "var(--paper-edge-0)" },
];

/**
 * A parchment page: a stack of paper edges fanning toward the spine, a
 * grainy/stained sheet, a soft vignette and gutter shadow, a double ruled
 * frame and four corner flourishes.
 *
 * Nothing here measures the host's size — every shape is a full-size rect
 * (`width="100%" height="100%"`), and the organic detail (rough edges,
 * grain, stains) comes from SVG filters, which work at any size. That's
 * deliberately unlike `@tkottke90/theme-tactical-wc`'s HUD frames, which do
 * need to measure (their outline has to land on a specific pixel geometry).
 */
@customElement("theme-journal-page")
export class ThemeJournalPage extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
        position: relative;
        isolation: isolate;
        min-width: 0;
        min-height: 420px;
      }
      /*
       * The padding that clears the corner flourishes lives on this inner
       * wrapper, not on :host. A consumer's page can legitimately load a
       * copy of this theme's compiled stylesheet at the document level
       * (its own base-layer reset sets padding to zero on the universal
       * selector, which also matches custom element hosts) — and a
       * same-origin, layered rule at an outer scope can still out-cascade
       * an unlayered host rule at this element's own shadow root for the
       * host element itself, zeroing out host padding no matter what
       * value is set here. An element that only exists inside the shadow
       * tree (this wrapper) is never reachable by any outer-document
       * selector at all, layered or not, so it has no such conflict.
       * Confirmed against this package's own Storybook preview, which
       * does exactly this (see .storybook/preview.ts).
       */
      .content {
        /* Themeable — see --page-padding in themes/field-journal/theme.css
           for the default and why it's sized the way it is. Override
           per-instance with style="--page-padding: …" on a
           <theme-journal-page> (any 1-4 value padding shorthand works). */
        padding: var(--page-padding);
      }
      :host::before,
      :host::after {
        content: "";
        position: absolute;
        pointer-events: none;
        border: 1px solid var(--ink-faint);
      }
      :host::before {
        inset: 18px;
      }
      :host::after {
        inset: 23px;
        border-width: 0.5px;
      }
      .page-art {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        overflow: visible;
        z-index: -1;
        pointer-events: none;
      }
      .page-corner {
        position: absolute;
        width: 38px;
        height: 38px;
        color: var(--ink-soft);
        pointer-events: none;
      }
      .page-corner.tl {
        top: 12px;
        left: 12px;
      }
      .page-corner.tr {
        top: 12px;
        right: 12px;
        transform: scaleX(-1);
      }
      .page-corner.br {
        bottom: 12px;
        right: 12px;
        transform: scale(-1, -1);
      }
      .page-corner.bl {
        bottom: 12px;
        left: 12px;
        transform: scaleY(-1);
      }
    `,
  ];

  /** Which side of the spine this page sits on — decides which way the page stack fans out and the gutter shadow falls. */
  @property({ type: String, reflect: true }) side: "left" | "right" = "left";

  render() {
    const left = this.side !== "right";
    const dir = left ? -1 : 1;

    return html`
      <svg class="page-art" aria-hidden="true">
        <defs>${renderPaperFilters()} ${renderPageGradients()}</defs>
        <g filter="url(#j-rough)">
          ${STACK.map(
            (s) => svg`
              <rect
                width="100%"
                height="100%"
                rx="3"
                fill="${s.fill}"
                stroke="rgba(110,78,45,.35)"
                stroke-width=".6"
                transform="translate(${s.d * dir} ${s.dy})"
              />
            `,
          )}
          <rect width="100%" height="100%" rx="3" fill="var(--paper)" filter="url(#j-paper)" />
          <rect width="100%" height="100%" rx="3" fill="url(#j-vignette)" />
          <rect
            width="100%"
            height="100%"
            rx="3"
            fill="url(#j-gutter-${left ? "left" : "right"})"
          />
        </g>
      </svg>
      <svg class="page-corner tl" viewBox="0 0 40 40" aria-hidden="true">
        ${renderFlourishPath()}
      </svg>
      <svg class="page-corner tr" viewBox="0 0 40 40" aria-hidden="true">
        ${renderFlourishPath()}
      </svg>
      <svg class="page-corner br" viewBox="0 0 40 40" aria-hidden="true">
        ${renderFlourishPath()}
      </svg>
      <svg class="page-corner bl" viewBox="0 0 40 40" aria-hidden="true">
        ${renderFlourishPath()}
      </svg>
      <div class="content"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-journal-page": ThemeJournalPage;
  }
}
