import type { Meta, StoryObj } from "@storybook/web-components";
import { html, svg } from "lit";
import "./index.js";

/**
 * A full character-sheet page composed only from this package's components:
 * a stat panel, a working character-creation form, and the quest log and
 * notes around them, all inside the poster's page frame.
 */

// Original placeholder icons, drawn for this demo on a 12px pixel grid.
const ICON = {
  heart: svg`<svg slot="icon" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" shape-rendering="crispEdges"><path d="M1 3h1V2h3v1h2V2h3v1h1v3h-1v1H9v1H8v1H7v1H5V9H4V8H3V7H2V6H1z"/></svg>`,
  bolt: svg`<svg slot="icon" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" shape-rendering="crispEdges"><path d="M6 0h3v1H8v2H7v1h3v1H9v1H8v1H7v1H6v1H5v1H4v1H3v1H2V9h1V7h1V6H2V5h1V3h1V2h1V1h1z"/></svg>`,
  coin: svg`<svg slot="icon" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" shape-rendering="crispEdges"><path d="M4 1h4v1h2v2h1v4h-1v2H8v1H4v-1H2V8H1V4h1V2h2zM5 3v6h2V3z"/></svg>`,
  moon: svg`<svg slot="icon" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" shape-rendering="crispEdges"><path d="M4 1h3v1H6v1H5v5h1v1h1v1h3v1H9v1H4v-1H3v-1H2V9H1V4h1V3h1V2h1z"/></svg>`,
};

const ROW = "display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;";
const STACK = "display: flex; flex-direction: column; gap: 1rem;";
const GRID = (cols: string) => `display: grid; grid-template-columns: ${cols}; gap: 1.5rem;`;
const INLINE_LABEL =
  "display: inline-flex; gap: 0.5rem; align-items: center; font-family: var(--font-sans); color: var(--color-text)";

function onReset(e: Event) {
  const out = (e.currentTarget as HTMLFormElement).querySelector(".demo-result");
  if (out) out.textContent = "Nothing submitted yet.";
}

function onSubmit(e: SubmitEvent) {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  const entries = [...new FormData(form)].map(([k, v]) => `${k}=${String(v)}`);
  const out = form.querySelector(".demo-result");
  if (out) out.textContent = entries.length ? `Saved: ${entries.join(", ")}` : "Nothing to save.";
}

export const demoPage = () => html`
  <theme-page-frame>
    <div style="max-width: 60rem; margin: 0 auto; ${STACK} gap: 2rem">
      <header style="${STACK} align-items: center; text-align: center">
        <theme-text variant="caption">Pixel Quest · Web Components</theme-text>
        <theme-heading level="1" banner>Your Character Sheet</theme-heading>
        <theme-text
          >Track today's stats, roll a new hero and keep your quest log. Every panel on this page is
          a component from the package.</theme-text
        >
        <div style=${ROW}>
          <theme-button label="Start quest"></theme-button>
          <theme-button variant="secondary" label="Load save"></theme-button>
          <theme-button variant="ghost" label="Skip intro"></theme-button>
          <theme-button label="Boss locked" disabled></theme-button>
        </div>
      </header>

      <div style=${GRID("repeat(auto-fit, minmax(18rem, 1fr))")}>
        <theme-card heading="Today's stats">
          <div style=${STACK}>
            <theme-stat-meter label="Health" sublabel="Move, eat, hydrate" value="8" max="10"
              >${ICON.heart}</theme-stat-meter
            >
            <theme-stat-meter label="Energy" sublabel="How much you can do" value="6" max="10"
              >${ICON.bolt}</theme-stat-meter
            >
            <theme-stat-meter label="Money" sublabel="Freedom & options" value="4" max="10"
              >${ICON.coin}</theme-stat-meter
            >
            <theme-stat-meter label="Sleep" sublabel="Rest = progress" value="10" max="10"
              >${ICON.moon}</theme-stat-meter
            >
          </div>
        </theme-card>

        <theme-card heading="New hero">
          <form style=${STACK} @submit=${onSubmit} @reset=${onReset}>
            <theme-field label="Hero name">
              <theme-input name="hero" value="Ayla" placeholder="Name your hero"></theme-input>
            </theme-field>
            <theme-field label="Class">
              <theme-select name="class">
                <option value="warrior">Warrior</option>
                <option value="mage" selected>Mage</option>
                <option value="ranger">Ranger</option>
              </theme-select>
            </theme-field>
            <theme-field label="Starting weapon">
              <div style=${ROW}>
                ${["Staff", "Sword", "Bow"].map(
                  (w) =>
                    html`<label style=${INLINE_LABEL}
                      ><theme-input
                        type="radio"
                        name="weapon"
                        value=${w.toLowerCase()}
                        ?checked=${w === "Staff"}
                      ></theme-input
                      >${w}</label
                    >`,
                )}
              </div>
            </theme-field>
            <theme-field label="Backstory">
              <theme-textarea
                name="backstory"
                rows="3"
                placeholder="Where does your hero come from?"
              ></theme-textarea>
            </theme-field>
            <label style=${INLINE_LABEL}
              ><theme-input type="checkbox" name="hardcore" value="yes"></theme-input>Hardcore
              mode</label
            >
            <div style=${ROW}>
              <theme-button type="submit" label="Save hero"></theme-button>
              <theme-button type="reset" variant="secondary" label="Reset"></theme-button>
            </div>
            <theme-text variant="caption" class="demo-result" aria-live="polite"
              >No hero saved yet.</theme-text
            >
          </form>
        </theme-card>
      </div>

      <div style=${GRID("repeat(auto-fit, minmax(18rem, 1fr))")}>
        <div style=${STACK}>
          <theme-heading level="2" banner>Daily Quests</theme-heading>
          <theme-container as="ol">
            <theme-item>Drink a potion of water</theme-item>
            <theme-item>Walk 5,000 steps</theme-item>
            <theme-item>Read one chapter</theme-item>
          </theme-container>
          <theme-detail summary="How do stats level up?">
            <theme-text
              >Each finished quest adds a point to its stat, up to ten. See the
              <theme-link href="#">package README</theme-link> for the attributes.</theme-text
            >
          </theme-detail>
        </div>

        <div style=${STACK}>
          <theme-heading level="2" banner>Notes</theme-heading>
          <theme-blockquote type="tip"
            >Every control in the hero form submits with it and resets with it.</theme-blockquote
          >
          <theme-blockquote type="warning"
            >Money is running low. Skip the shop today.</theme-blockquote
          >
          <theme-container>
            <theme-heading level="3">Loading next area…</theme-heading>
            <div aria-hidden="true" style="margin-top: 0.75rem">
              <theme-skeleton-heading width="50%"></theme-skeleton-heading>
              <theme-skeleton-text></theme-skeleton-text>
              <theme-skeleton-text width="80%"></theme-skeleton-text>
            </div>
          </theme-container>
        </div>
      </div>
    </div>
  </theme-page-frame>
`;

const meta: Meta = {
  title: "Theme/Pixel Quest/Demo",
  // demoPage is exported for reuse (e.g. a standalone demo bundle), not as a story.
  excludeStories: ["demoPage"],
  parameters: { intro: null, layout: "fullscreen" },
};
export default meta;

export const Overview: StoryObj = { render: demoPage };
