import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { CATEGORY_BG, type JournalCategoryColor } from "./journal-categories.js";
import { JOURNAL_ICON_PATHS, type JournalIconName } from "./journal-icons.js";

export interface JournalTask {
  label: string;
  /** Shown instead of `count` once the task is complete, e.g. a checkmark. */
  done?: boolean;
  /** Progress text for an incomplete task, e.g. "0/3". Ignored when `done`. */
  count?: string;
}

/** A quest card: a cream card with a colored pennant strip down the side, a title/tag/favorite header, a location line, and a description/task-list split. */
@customElement("theme-quest-card")
export class ThemeQuestCard extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
      .quest {
        display: grid;
        grid-template-columns: 40px 1fr;
        gap: 14px;
        padding: 10px 14px 12px 12px;
      }
      .pennant {
        display: grid;
        place-items: start center;
        padding-top: 12px;
        margin: -10px 0 -12px;
        color: var(--text-on-dark);
        background:
          var(--grain),
          linear-gradient(
            90deg,
            color-mix(in srgb, var(--pennant-color) 85%, black),
            var(--pennant-color) 50%,
            color-mix(in srgb, var(--pennant-color) 85%, black)
          );
        clip-path: polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 12px), 0 100%);
      }
      .pennant svg {
        width: 22px;
        height: 22px;
      }
      .tasks li::before {
        content: "◆";
        font-size: 8px;
        line-height: 2.2;
        color: var(--ink-soft);
      }
    `,
  ];

  @property({ type: String }) heading = "";
  @property({ type: String }) location = "";
  @property({ type: String }) description = "";
  @property({ type: String }) status: "active" | "done" = "active";
  @property({ type: Boolean }) favorite = false;
  @property({ type: String }) color: JournalCategoryColor = "red";
  @property({ type: String }) icon: JournalIconName = "quest";
  @property({ type: Array }) tasks: JournalTask[] = [];

  render() {
    return html`
      <article
        class="quest rounded-theme bg-[image:var(--grain-soft)] bg-surface-alt border border-border shadow-card"
      >
        <div class="pennant" style="--pennant-color:${CATEGORY_BG[this.color]}">
          <svg viewBox="0 0 24 24" aria-hidden="true">${JOURNAL_ICON_PATHS[this.icon]}</svg>
        </div>
        <div>
          <header class="flex items-center gap-2.5">
            <h3 class="m-0 flex-1 font-head text-lg font-normal">${this.heading}</h3>
            <span
              class="rounded-theme-sm border px-2.5 py-px font-title text-[11px] tracking-[0.08em] uppercase"
              style="color:var(--green-dark); border-color:color-mix(in srgb, var(--green-dark) 55%, transparent); background:color-mix(in srgb, var(--green-dark) 12%, transparent)"
            >
              ${this.status === "done" ? "Done" : "Active"}
            </span>
            ${
              this.favorite
                ? html`<svg
                    class="h-4 w-4"
                    style="color:var(--favorite)"
                    aria-label="Favourite"
                    viewBox="0 0 24 24"
                  >
                    ${JOURNAL_ICON_PATHS.star}
                  </svg>`
                : null
            }
          </header>
          ${
            this.location
              ? html`<p class="text-text-muted my-0.5 mb-1.5 flex items-center gap-1 text-[13px]">
                  <svg class="h-3 w-3" viewBox="0 0 24 24" aria-hidden="true">
                    ${JOURNAL_ICON_PATHS.pin}
                  </svg>
                  ${this.location}
                </p>`
              : null
          }
          <div class="grid grid-cols-[1.2fr_1fr] gap-4 text-[13.5px] leading-[1.35]">
            <p class="m-0 text-text">${this.description}</p>
            <ul class="tasks m-0 grid content-start gap-1 p-0" style="list-style: none">
              ${this.tasks.map(
                (task) => html`
                  <li class="flex items-center justify-between gap-2">
                    <span
                      class="flex-1 ${task.done ? "text-[color:var(--green-dark)]" : "text-text"}"
                      >${task.label}</span
                    >
                    <span class=${task.done ? "text-[color:var(--green-dark)]" : "text-text-muted"}
                      >${task.done ? "✓" : task.count}</span
                    >
                  </li>
                `,
              )}
            </ul>
          </div>
        </div>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-quest-card": ThemeQuestCard;
  }
}
