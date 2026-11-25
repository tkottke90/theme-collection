import type { Meta, StoryObj } from "@storybook/web-components";
import { html, svg, type SVGTemplateResult } from "lit";
import "./index.js";
import type { JournalTab } from "./theme-journal-book.js";

/**
 * The journal as a consumer would build it: one book, six tabs, a pair of
 * pages per tab. Clicking a tab swaps which pair is slotted into the book.
 * The first tab carries a working form, so the screenshot proves the
 * controls submit and reset.
 */

const TABS: JournalTab[] = [
  { id: "quests", label: "Quests", color: "red", icon: "quest" },
  { id: "places", label: "Places", color: "blue", icon: "pin" },
  { id: "people", label: "People", color: "tan", icon: "person" },
  { id: "creatures", label: "Creatures", color: "green", icon: "paw" },
  { id: "notes", label: "Notes", color: "purple", icon: "feather" },
  { id: "collection", label: "Collection", color: "orange", icon: "bag" },
];

const STACK = "display: grid; gap: 14px";
const ROW = "display: flex; flex-wrap: wrap; gap: 10px; align-items: center";
const INLINE_LABEL =
  "display: inline-flex; gap: 0.5rem; align-items: center; font-family: var(--font-sans); color: var(--color-text)";

const formOf = (e: Event) => (e.currentTarget as Element).closest("form");

/** theme-button isn't a form control, so the demo's buttons drive the form by hand. */
function onSubmitClick(e: Event) {
  formOf(e)?.requestSubmit();
}

function onResetClick(e: Event) {
  const form = formOf(e);
  form?.reset();
  const out = form?.querySelector(".demo-result");
  if (out) out.textContent = "Nothing logged yet.";
}

function onSubmit(e: SubmitEvent) {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  const entries = [...new FormData(form)].map(([k, v]) => `${k}=${String(v)}`);
  const out = form.querySelector(".demo-result");
  if (out) out.textContent = entries.length ? `Logged: ${entries.join(", ")}` : "Empty form.";
}

/** Slot the pair of pages for the chosen tab into the book. */
function onTabChange(e: CustomEvent<{ id: string }>) {
  const book = e.currentTarget as HTMLElement & { selected: string };
  book.querySelectorAll("theme-journal-page[data-pair]").forEach((page) => {
    const active = (page as HTMLElement).dataset["pair"] === e.detail.id;
    if (active) page.setAttribute("slot", (page as HTMLElement).dataset["side"] ?? "left");
    else page.removeAttribute("slot");
  });
  book.selected = e.detail.id;
}

const sketch = (label: string, body: SVGTemplateResult) => html`
  <svg
    viewBox="0 0 220 130"
    role="img"
    aria-label=${label}
    style="display: block; width: 100%; height: auto"
  >
    ${body}
  </svg>
`;

export const demoPage = () => html`
  <div style="padding: 8px 24px 90px 108px">
    <theme-journal-book .tabs=${TABS} selected="quests" @journal-tab-change=${onTabChange}>
      <!-- Quests -->
      <theme-journal-page data-pair="quests" data-side="left" slot="left" side="left">
        <theme-heading level="1" style="text-align: center; display: block"
          >Field Journal</theme-heading
        >
        <theme-divider></theme-divider>
        <theme-text
          variant="caption"
          style="text-align: center; display: block; margin-bottom: 20px"
          >The Lakeside Region</theme-text
        >
        <theme-taped
          tilt="l"
          caption="Lakeside Bridge"
          style="display: block; max-width: 280px; margin: 0 auto 18px"
        >
          ${sketch(
            "Sketch of a lakeside bridge",
            svg`<rect width="220" height="130" fill="#dfe6da" />
              <path d="M0 62 C40 30 80 44 110 34 C150 22 180 40 220 30 V130 H0Z" fill="#a9b996" />
              <rect y="96" width="220" height="34" fill="#9cc2cc" />
              <path
                d="M14 66 H206 V98 H190 A80 24 0 0 0 30 98 H14Z"
                fill="#bfae90"
                stroke="#6b5a45"
                stroke-width="1.2"
              />`,
          )}
        </theme-taped>
        <theme-container as="ul">
          <theme-item>Return the parcel to the far dock.</theme-item>
          <theme-item>Look into the lights in Whisperwood.</theme-item>
          <theme-item>Ask the ferryman about the lighthouse.</theme-item>
        </theme-container>
      </theme-journal-page>
      <theme-journal-page data-pair="quests" data-side="right" slot="right" side="right">
        <theme-ribbon color="red">Active Quests</theme-ribbon>
        <div style="margin-bottom: 16px">
          <theme-progress label="Overall progress" value="42"></theme-progress>
        </div>
        <div style=${STACK}>
          <theme-quest-card
            heading="The Lost Parcel"
            location="Lakeside Village"
            description="A villager's parcel went missing on its way to the far dock."
            color="red"
            icon="parcel"
            .tasks=${[
              { label: "Find the parcel", count: "1/2" },
              { label: "Deliver it", count: "0/1" },
            ]}
            favorite
          ></theme-quest-card>
          <form style=${STACK} @submit=${onSubmit}>
            <theme-heading level="3">Log a find</theme-heading>
            <theme-field label="Name" for="demo-name">
              <theme-input
                id="demo-name"
                name="name"
                placeholder="What did you find?"
              ></theme-input>
            </theme-field>
            <theme-field label="Kind" for="demo-kind">
              <theme-select id="demo-kind" name="kind">
                <option value="plant">Plant</option>
                <option value="stone">Stone</option>
                <option value="coin">Coin</option>
              </theme-select>
            </theme-field>
            <theme-field label="Notes" for="demo-notes">
              <theme-textarea
                id="demo-notes"
                name="notes"
                rows="2"
                placeholder="Where, and in what light?"
              ></theme-textarea>
            </theme-field>
            <theme-field label="Condition">
              <div style="display: flex; gap: 1rem">
                <label style=${INLINE_LABEL}
                  ><theme-input type="radio" name="condition" value="good" checked></theme-input
                  >Good</label
                >
                <label style=${INLINE_LABEL}
                  ><theme-input type="radio" name="condition" value="worn"></theme-input>Worn</label
                >
              </div>
            </theme-field>
            <label style=${INLINE_LABEL}
              ><theme-input type="checkbox" name="keep" value="yes"></theme-input>Keep it in the
              collection</label
            >
            <div style=${ROW}>
              <theme-button label="Log it" @click=${onSubmitClick}></theme-button>
              <theme-button variant="secondary" label="Reset" @click=${onResetClick}></theme-button>
              <theme-button variant="ghost" label="Skip"></theme-button>
              <theme-button label="Closed" disabled></theme-button>
            </div>
            <theme-text variant="caption" class="demo-result" aria-live="polite"
              >Nothing logged yet.</theme-text
            >
          </form>
        </div>
      </theme-journal-page>

      <!-- Places -->
      <theme-journal-page data-pair="places" data-side="left" side="left">
        <theme-ribbon color="blue">The Lakeside Region</theme-ribbon>
        <theme-notes heading="Local notes">
          The people here are friendly, and the lake is said to shimmer most brightly at dawn.
        </theme-notes>
      </theme-journal-page>
      <theme-journal-page data-pair="places" data-side="right" side="right">
        <theme-heading level="2">Lakeside Village</theme-heading>
        <theme-text>
          A modest fishing village at the lake's southern shore. The dock trades mostly in river
          pike and reed-woven baskets.
        </theme-text>
        <theme-blockquote type="tip"
          >Ask the ferryman about the old lighthouse. He knows every rumor on the
          water.</theme-blockquote
        >
        <p style="margin-top: 14px">
          <theme-link href="#">Read the full survey of the region</theme-link>
        </p>
      </theme-journal-page>

      <!-- People -->
      <theme-journal-page data-pair="people" data-side="left" side="left">
        <theme-ribbon color="tan">Notable People</theme-ribbon>
        <theme-container as="ul">
          <theme-item>Old Maren, the ferryman: knows every rumor on the water.</theme-item>
          <theme-item>Captain Soren, harbor master: short-tempered, fair-minded.</theme-item>
          <theme-item>Little Tam, the ranger's apprentice: asks too many questions.</theme-item>
        </theme-container>
      </theme-journal-page>
      <theme-journal-page data-pair="people" data-side="right" side="right">
        <theme-heading level="2">Maren</theme-heading>
        <theme-text>Has worked the ferry for forty years and never once been late.</theme-text>
        <theme-blockquote type="quote"
          >"Collect what you can carry, not what you can find."</theme-blockquote
        >
      </theme-journal-page>

      <!-- Creatures -->
      <theme-journal-page data-pair="creatures" data-side="left" side="left">
        <theme-ribbon color="green">Creature Log</theme-ribbon>
        <theme-quest-card
          heading="Three Rare Mushrooms"
          location="Misty Grove"
          description="A travelling chef needs three rare mushrooms for a special dish."
          color="green"
          icon="mushroom"
          status="done"
        ></theme-quest-card>
        <theme-blockquote type="danger" style="margin-top: 14px"
          >Do not approach the Emberhead cluster without gloves. The spores sting.</theme-blockquote
        >
      </theme-journal-page>
      <theme-journal-page data-pair="creatures" data-side="right" side="right">
        <theme-heading level="2">Field Guide</theme-heading>
        <theme-detail summary="What is an Azure Cap?">
          <theme-text>
            A pale blue mushroom found only near still water. Harmless, and prized for its faint
            sweetness when dried.
          </theme-text>
        </theme-detail>
      </theme-journal-page>

      <!-- Notes -->
      <theme-journal-page data-pair="notes" data-side="left" side="left">
        <theme-ribbon color="purple">Field Notes</theme-ribbon>
        <theme-taped
          tilt="r"
          caption="A pressed leaf"
          style="display: block; max-width: 220px; margin: 0 auto"
        >
          ${sketch(
            "Sketch of a pressed leaf",
            svg`<rect width="220" height="130" fill="#f3ecd6" />
              <path
                d="M110 10 C140 30 150 70 110 120 C70 70 80 30 110 10Z"
                fill="#8aa868"
                stroke="#5f7d47"
                stroke-width="2"
              />`,
          )}
        </theme-taped>
      </theme-journal-page>
      <theme-journal-page data-pair="notes" data-side="right" side="right">
        <theme-heading level="2">Loading…</theme-heading>
        <theme-skeleton-heading width="70%"></theme-skeleton-heading>
        <theme-skeleton-text width="100%"></theme-skeleton-text>
        <theme-skeleton-text width="92%"></theme-skeleton-text>
        <theme-skeleton-text width="60%"></theme-skeleton-text>
      </theme-journal-page>

      <!-- Collection -->
      <theme-journal-page data-pair="collection" data-side="left" side="left">
        <theme-ribbon color="orange">Collection</theme-ribbon>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px">
          <theme-card heading="Pressed Flora">A small book of dried flowers.</theme-card>
          <theme-card heading="River Stones">Smooth stones from the lakeshore.</theme-card>
        </div>
      </theme-journal-page>
      <theme-journal-page data-pair="collection" data-side="right" side="right">
        <theme-heading level="2">Margin Notes</theme-heading>
        <div style=${STACK}>
          <theme-blockquote type="info">Items only count once logged here.</theme-blockquote>
          <theme-blockquote type="question"
            >Is the third coin foreign, or just old?</theme-blockquote
          >
          <theme-blockquote type="warning">The feather box is getting crowded.</theme-blockquote>
        </div>
      </theme-journal-page>
    </theme-journal-book>
  </div>
`;

const meta: Meta = {
  title: "Theme/Field Journal WC/Demo",
  // demoPage is exported for reuse, not as a story.
  parameters: { intro: null, layout: "fullscreen" },
};
export default meta;

export const Overview: StoryObj = { render: demoPage };
