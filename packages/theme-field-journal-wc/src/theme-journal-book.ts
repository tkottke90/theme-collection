import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { JOURNAL_ICON_PATHS, type JournalIconName } from "./journal-icons.js";
import { CATEGORY_BG, type JournalCategoryColor } from "./journal-categories.js";

export interface JournalTab {
  id: string;
  label: string;
  color: JournalCategoryColor;
  icon: JournalIconName;
}

/**
 * The leather book: a two-column cover holding a left/right page (projected
 * via the `left`/`right` slots — typically a pair of `theme-journal-page`
 * elements), a column of colored leather tabs for navigation, and a
 * decorative bookmark ribbon. Below 980px wide the cover stacks to one
 * column and the tabs become a wrapping row along the top.
 */
@customElement("theme-journal-book")
export class ThemeJournalBook extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
      .cover {
        position: relative;
        /* Establishes its own stacking context so the negative z-index on
           its ::before/::after below (see there for why) only sends them
           behind *this* element's own background — without this, nothing
           here was an actual stacking context, so a negative z-index sent
           them behind whatever ancestor stacking context was next, which
           made them vanish behind other, more distant backgrounds
           entirely instead of just this one's leather. */
        isolation: isolate;
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 22px 26px 30px;
        border-radius: var(--radius-book);
        background:
          var(--grain),
          radial-gradient(
            ellipse at 30% 15%,
            var(--leather-highlight) 0%,
            var(--leather) 45%,
            var(--leather-dark) 100%
          );
        box-shadow:
          inset 0 0 0 2px #24140a,
          inset 0 0 0 4px rgba(255, 220, 170, 0.06),
          inset 0 0 40px rgba(0, 0, 0, 0.55),
          var(--shadow-book);
      }
      .cover::after {
        content: "";
        position: absolute;
        inset: 9px;
        border: 2px dashed var(--stitch);
        border-radius: 12px;
        /* Without an explicit (negative) z-index here, this paints over
           the bookmark ribbon where it crosses it — raising .ribbon's own
           z-index (already 3) doesn't fix that, only giving this element
           a negative one does; confirmed empirically against a real
           render, not just reasoned from the spec. */
        z-index: -1;
        pointer-events: none;
      }
      .cover::before {
        content: "";
        position: absolute;
        top: 4px;
        bottom: 4px;
        left: calc(50% - 18px);
        width: 36px;
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.5),
          rgba(255, 220, 170, 0.08) 50%,
          rgba(0, 0, 0, 0.5)
        );
        z-index: -1;
        pointer-events: none;
      }
      .pages {
        display: contents;
      }
      ::slotted([slot="left"]),
      ::slotted([slot="right"]) {
        position: relative;
        z-index: 1;
      }

      .tabs {
        position: absolute;
        z-index: 0;
        left: -92px;
        top: 34px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .label-plate {
        width: 132px;
        padding: 10px 44px 10px 12px;
        font-family: var(--font-title);
        font-size: 17px;
        line-height: 1.05;
        text-align: center;
        white-space: pre-line;
        color: var(--ink);
        background: var(--grain-soft), var(--card);
        border-radius: 4px 0 0 4px;
        box-shadow:
          inset 0 0 0 1px var(--card-line),
          inset 0 0 0 4px var(--card),
          inset 0 0 0 5px var(--ink-faint),
          0 3px 6px rgba(0, 0, 0, 0.4);
      }
      .tab {
        position: relative;
        display: flex;
        align-items: center;
        gap: 8px;
        width: 132px;
        padding: 12px 44px 12px 14px;
        border: 0;
        border-radius: var(--radius-tab) 0 0 var(--radius-tab);
        font-family: var(--font-title);
        font-size: 13px;
        letter-spacing: 0.04em;
        color: var(--text-on-dark);
        text-align: left;
        cursor: pointer;
        background:
          var(--grain),
          linear-gradient(
            180deg,
            color-mix(in srgb, var(--tab-color) 88%, white),
            color-mix(in srgb, var(--tab-color) 80%, black)
          );
        box-shadow:
          inset 0 0 0 1px rgba(0, 0, 0, 0.35),
          0 3px 6px rgba(0, 0, 0, 0.45);
        transition: transform 0.15s ease;
      }
      .tab::after {
        content: "";
        position: absolute;
        inset: 4px 0 4px 4px;
        border: 1px dashed rgba(255, 240, 210, 0.45);
        border-right: 0;
        border-radius: 4px 0 0 4px;
        pointer-events: none;
      }
      .tab svg {
        width: 18px;
        height: 18px;
        flex: none;
      }
      .tab:hover,
      .tab[aria-current="page"] {
        transform: translateX(-8px);
      }
      .tab:focus-visible {
        outline: 2px solid var(--text-on-dark);
        outline-offset: 2px;
      }

      .ribbon {
        position: absolute;
        z-index: 3;
        left: calc(50% + 26px);
        bottom: -52px;
        width: 20px;
        height: 92px;
        background:
          var(--grain),
          linear-gradient(
            90deg,
            color-mix(in srgb, var(--red) 80%, black),
            var(--red) 50%,
            color-mix(in srgb, var(--red) 80%, black)
          );
        clip-path: polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 10px), 0 100%);
        filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.4));
      }

      @media (max-width: 980px) {
        .cover {
          grid-template-columns: 1fr;
          gap: 26px;
        }
        .cover::before {
          display: none;
        }
        .tabs {
          position: static;
          grid-column: 1 / -1;
          flex-direction: row;
          flex-wrap: wrap;
        }
        .label-plate,
        .tab {
          width: auto;
          padding-right: 14px;
          border-radius: var(--radius-tab);
        }
        .tab:hover,
        .tab[aria-current="page"] {
          transform: translateY(-3px);
        }
      }
    `,
  ];

  /** Text on the label plate above the tabs. A literal newline breaks it onto a second line. */
  @property({ type: String }) label = "Field\nJournal";
  @property({ type: Array }) tabs: JournalTab[] = [];
  @property({ type: String }) selected = "";

  private selectTab(id: string) {
    this.selected = id;
    this.dispatchEvent(
      new CustomEvent("journal-tab-change", { detail: { id }, bubbles: true, composed: true }),
    );
  }

  render() {
    return html`
      <div class="cover">
        <nav class="tabs" aria-label="Journal sections">
          <div class="label-plate">${this.label}</div>
          ${this.tabs.map(
            (tab) => html`
              <button
                class="tab"
                style="--tab-color:${CATEGORY_BG[tab.color]}"
                aria-current=${tab.id === this.selected ? "page" : nothing}
                @click=${() => this.selectTab(tab.id)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">${JOURNAL_ICON_PATHS[tab.icon]}</svg>
                ${tab.label}
              </button>
            `,
          )}
        </nav>
        <div class="pages">
          <slot name="left"></slot>
          <slot name="right"></slot>
        </div>
        <div class="ribbon" aria-hidden="true"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-journal-book": ThemeJournalBook;
  }
}
