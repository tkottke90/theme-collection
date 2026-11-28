import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./index.js";

/**
 * A full page composed only from this package's components: a control-deck
 * console with a working access form, the plant-floor panels, a status row
 * and the alert board.
 */

const PAGE =
  "background: var(--color-neutral-50); color: var(--color-neutral-900); font-family: var(--font-sans); padding: 2rem; min-height: 100vh; display: flex; flex-direction: column; gap: 2rem";
const GRID = (min: string) =>
  `display: grid; grid-template-columns: repeat(auto-fit, minmax(${min}, 1fr)); gap: 1.5rem; align-items: start`;
const STACK = "display: flex; flex-direction: column; gap: 1rem";
const ROW = "display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem";
const INLINE_LABEL =
  "display: inline-flex; gap: 0.5rem; align-items: center; font-family: var(--font-sans); font-size: 0.875rem; color: var(--color-fg)";

function onReset(e: Event) {
  const out = (e.currentTarget as HTMLFormElement).querySelector(".demo-result");
  if (out) out.textContent = "No request sent yet.";
}

function onSubmit(e: SubmitEvent) {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  const entries = [...new FormData(form)].map(([k, v]) => `${k}=${String(v)}`);
  const out = form.querySelector(".demo-result");
  if (out) out.textContent = entries.length ? `Sent: ${entries.join(", ")}` : "Empty form.";
}

export const demoPage = () => html`
  <div style=${PAGE}>
    <header style=${STACK}>
      <theme-text variant="caption">Futuristic Industrial — component library</theme-text>
      <theme-heading level="1">Sector 12 Control Deck</theme-heading>
      <div style=${GRID("160px")}>
        <theme-plate label="Code" value="13-V-2-44"></theme-plate>
        <theme-plate label="Mod" value="X5C"></theme-plate>
        <theme-plate label="Zone" value="SEC-12"></theme-plate>
      </div>
      <theme-segmented-rule size="10"></theme-segmented-rule>
    </header>

    <section style=${GRID("260px")}>
      <theme-card heading="Access request">
        <form style=${STACK} @submit=${onSubmit} @reset=${onReset}>
          <theme-field label="Operator ID">
            <theme-input name="operator" placeholder="OP-0000"></theme-input>
          </theme-field>
          <theme-field label="Clearance">
            <theme-select name="clearance">
              <option value="1">Level 1 — Observer</option>
              <option value="2" selected>Level 2 — Technician</option>
              <option value="3">Level 3 — Engineer</option>
            </theme-select>
          </theme-field>
          <theme-field label="Shift">
            <div style=${ROW}>
              ${["Day", "Night"].map(
                (s) =>
                  html`<label style=${INLINE_LABEL}
                    ><theme-input
                      type="radio"
                      name="shift"
                      value=${s.toLowerCase()}
                      ?checked=${s === "Day"}
                    ></theme-input
                    >${s}</label
                  >`,
              )}
            </div>
          </theme-field>
          <theme-field label="Reason">
            <theme-textarea name="reason" rows="2" placeholder="Bay 4 inspection"></theme-textarea>
          </theme-field>
          <label style=${INLINE_LABEL}
            ><theme-input type="checkbox" name="escort" value="yes"></theme-input>Escort
            required</label
          >
          <div style=${ROW}>
            <theme-button type="submit" label="Authorize"></theme-button>
            <theme-button type="reset" variant="secondary" label="Clear"></theme-button>
          </div>
          <theme-text variant="caption" class="demo-result">No request sent yet.</theme-text>
        </form>
      </theme-card>

      <theme-card heading="System log">
        <theme-container as="ol">
          <theme-item>04:12:08 — Containment seal verified</theme-item>
          <theme-item>04:12:41 — Pressure within tolerance</theme-item>
          <theme-item>04:13:02 — Access attempt: OP-1182</theme-item>
          <theme-item>04:13:03 — Clearance granted: Level 2</theme-item>
        </theme-container>
      </theme-card>

      <theme-card heading="Diagnostics">
        <div style=${STACK}>
          <theme-detail summary="Reactor Bay 4">
            <theme-text>Core temperature nominal. Coolant flow steady at 92%.</theme-text>
          </theme-detail>
          <theme-detail summary="Loading Bay 2 (syncing)">
            <theme-skeleton-heading width="45%"></theme-skeleton-heading>
            <theme-skeleton-text></theme-skeleton-text>
            <theme-skeleton-text width="70%"></theme-skeleton-text>
          </theme-detail>
          <theme-container as="ul">
            <theme-item>Pumps — online</theme-item>
            <theme-item>Vents — online</theme-item>
          </theme-container>
        </div>
      </theme-card>
    </section>

    <theme-girder></theme-girder>

    <section style=${STACK}>
      <theme-heading level="2">Plant floor</theme-heading>
      <div style=${GRID("260px")}>
        <theme-casing heading="Reactor control">
          <div style=${STACK}>
            <theme-text>Core output holding at 92% of rated load.</theme-text>
            <theme-text variant="caption"
              >Rod bank <theme-bracket-tag>RB-07</theme-bracket-tag> at 40% insertion.</theme-text
            >
            <div style=${ROW}>
              <theme-well>
                <theme-button variant="ghost" label="▲" aria-label="Raise rods"></theme-button>
              </theme-well>
              <theme-well>
                <theme-button variant="ghost" label="▼" aria-label="Lower rods"></theme-button>
              </theme-well>
              <theme-button label="Vent"></theme-button>
            </div>
          </div>
        </theme-casing>

        <theme-tab-panel heading="Sector map">
          <div style=${STACK}>
            <theme-text
              >Deck 3 is sealed for maintenance. Route cargo through the east lift.</theme-text
            >
            <theme-text variant="caption"
              >Unit <theme-bracket-tag>MT-22467R</theme-bracket-tag> fitted to bay
              <theme-bracket-tag variant="flared">04</theme-bracket-tag></theme-text
            >
          </div>
        </theme-tab-panel>

        <theme-conduit-panel heading="Lift controls">
          <div style=${STACK}>
            <theme-text>East lift idle at deck 2.</theme-text>
            <theme-well>
              <theme-button variant="secondary" label="Up"></theme-button>
              <theme-button variant="ghost" label="Down"></theme-button>
            </theme-well>
          </div>
        </theme-conduit-panel>
      </div>
    </section>

    <theme-chevron-rule size="22"></theme-chevron-rule>

    <section style=${GRID("240px")}>
      <div style=${STACK}>
        <theme-heading level="3">Bays</theme-heading>
        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem">
          <theme-tile><theme-heading level="2">04</theme-heading></theme-tile>
          <theme-tile><theme-heading level="4">Locked</theme-heading></theme-tile>
          <theme-tile plain><theme-heading level="4">Open</theme-heading></theme-tile>
        </div>
      </div>
      <theme-registration-frame>
        <theme-heading level="4">Target lock</theme-heading>
        <theme-text>Contact 07 holding at 1,200 m, bearing 042.</theme-text>
      </theme-registration-frame>
      <theme-bracket-rail>
        <div style=${STACK}>
          <theme-heading level="4">Decks</theme-heading>
          <theme-link href="#command">Deck 1 — Command</theme-link>
          <theme-link href="#habitation">Deck 2 — Habitation</theme-link>
          <theme-text variant="caption">Deck 4 sealed.</theme-text>
        </div>
      </theme-bracket-rail>
    </section>

    <section style=${STACK}>
      <theme-heading level="2">Alerts</theme-heading>
      <theme-hazard-container>
        <div style=${GRID("300px")}>
          <theme-blockquote type="warning"
            >Restrict unescorted access beyond Bay 4.</theme-blockquote
          >
          <theme-blockquote type="danger"
            >Do not override protocol MOD:X5C without Level 3 clearance.</theme-blockquote
          >
          <theme-blockquote type="info">Shift handover begins at 06:00.</theme-blockquote>
          <theme-blockquote type="tip"
            >Run the diagnostic sweep before each cycle.</theme-blockquote
          >
        </div>
      </theme-hazard-container>
      <theme-hazard-container variant="light">
        Maintenance in progress on Deck 3. Keep clear of the lift shaft.
      </theme-hazard-container>
    </section>

    <footer style=${STACK}>
      <theme-stripe-band size="22"></theme-stripe-band>
      <theme-text variant="caption">Sector 12 · theme-futuristic-industrial</theme-text>
    </footer>
  </div>
`;

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Demo",
  // demoPage is exported for reuse (e.g. a standalone demo bundle), not as a story.
  excludeStories: ["demoPage"],
  parameters: { intro: null, layout: "fullscreen" },
};
export default meta;

export const Overview: StoryObj = { render: demoPage };
