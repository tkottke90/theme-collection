import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./index.js";

/**
 * A full page composed only from this package's components: a mission
 * dashboard with telemetry panels, a working contact form and a few
 * supporting blocks.
 */

const SYSTEMS = [
  { label: "Signal", value: 65 },
  { label: "Shields", value: 88 },
  { label: "Fuel", value: 31 },
];

const SECTION = "display: flex; flex-direction: column; gap: 1.25rem; margin-top: 2.5rem;";
const GRID = (min: string) =>
  `display: grid; grid-template-columns: repeat(auto-fit, minmax(${min}, 1fr)); gap: 1.5rem;`;
const STACK = "display: flex; flex-direction: column; gap: 1rem;";
const INLINE_LABEL =
  "display: inline-flex; gap: 0.5rem; align-items: center; font-family: var(--font-sans); color: var(--color-text)";

function onReset(e: Event) {
  const out = (e.currentTarget as HTMLFormElement).querySelector(".demo-result");
  if (out) out.textContent = "Nothing transmitted yet.";
}

function onSubmit(e: SubmitEvent) {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  const entries = [...new FormData(form)].map(([k, v]) => `${k}=${String(v)}`);
  const out = form.querySelector(".demo-result");
  if (out) out.textContent = entries.length ? `Transmitted: ${entries.join(", ")}` : "Empty form.";
}

export const demoPage = () => html`
  <div
    style="background: var(--color-bg); color: var(--color-text); font-family: var(--font-sans); padding: 2.5rem; min-height: 100vh"
  >
    <div style="max-width: 64rem; margin: 0 auto">
      <header style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 40rem">
        <theme-text variant="caption">Tactical theme · Web Components</theme-text>
        <theme-heading level="1">Mission control</theme-heading>
        <theme-text
          >Telemetry, comms and crew status in one HUD. Every panel here is a component from this
          package, styled only from the tactical tokens.</theme-text
        >
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 0.5rem">
          <theme-button label="Engage"></theme-button>
          <theme-button variant="secondary" label="Hold"></theme-button>
          <theme-button variant="ghost" label="Abort"></theme-button>
        </div>
      </header>

      <section style=${SECTION}>
        <theme-heading level="2">Telemetry</theme-heading>
        <div style=${GRID("16rem")}>
          <theme-card heading="System status">
            <theme-stat label="Uptime" value="1565" unit="h"></theme-stat>
          </theme-card>
          <theme-card heading="Systems">
            <div style=${STACK}>
              ${SYSTEMS.map(
                (s) => html`<theme-progress label=${s.label} value=${s.value}></theme-progress>`,
              )}
            </div>
          </theme-card>
          <theme-card heading="Reactor">
            <theme-gauge label="Power" value="72"></theme-gauge>
          </theme-card>
        </div>
        <theme-viewfinder heading="Target lock">
          <theme-text>Locked on contact 07, bearing 214, range 3.2 km.</theme-text>
        </theme-viewfinder>
      </section>

      <section style=${SECTION}>
        <theme-heading level="2">Comms</theme-heading>
        <div style=${GRID("20rem")}>
          <theme-container>
            <form style=${STACK} @submit=${onSubmit} @reset=${onReset}>
              <theme-field label="Callsign">
                <theme-input name="callsign" placeholder="Raven 2-1"></theme-input>
              </theme-field>
              <theme-field label="Contact email">
                <theme-input name="email" type="email" placeholder="raven@example.com">
                </theme-input>
              </theme-field>
              <theme-field label="Channel">
                <theme-select name="channel">
                  <option>Command</option>
                  <option>Logistics</option>
                  <option>Medical</option>
                </theme-select>
              </theme-field>
              <theme-field label="Message">
                <theme-textarea name="message" rows="3" placeholder="Report in…"> </theme-textarea>
              </theme-field>
              <theme-field label="Priority">
                <div style="display: flex; gap: 1.25rem">
                  ${["Routine", "Urgent"].map(
                    (c) =>
                      html`<label style=${INLINE_LABEL}
                        ><theme-input
                          type="radio"
                          name="priority"
                          value=${c.toLowerCase()}
                          ?checked=${c === "Routine"}
                        ></theme-input
                        >${c}</label
                      >`,
                  )}
                </div>
              </theme-field>
              <label style=${INLINE_LABEL}
                ><theme-input type="checkbox" name="ack" value="yes"></theme-input>Request
                acknowledgement</label
              >
              <div style="display: flex; gap: 0.75rem; flex-wrap: wrap">
                <theme-button type="submit" label="Transmit"></theme-button>
                <theme-button type="reset" variant="secondary" label="Clear"></theme-button>
              </div>
              <theme-text variant="caption" class="demo-result" aria-live="polite"
                >Nothing transmitted yet.</theme-text
              >
            </form>
          </theme-container>

          <div style=${STACK}>
            <theme-blockquote type="warning"
              >Solar activity is rising. Expect intermittent signal loss.</theme-blockquote
            >
            <theme-container as="ul">
              <theme-item>Run pre-flight checks</theme-item>
              <theme-item>Confirm crew roster</theme-item>
              <theme-item>Open the comms channel</theme-item>
            </theme-container>
            <theme-detail summary="How is signal strength measured?">
              <theme-text
                >Relative to the last handshake with the relay. See the
                <theme-link href="#">field manual</theme-link> for the full table.</theme-text
              >
            </theme-detail>
            <theme-container>
              <theme-skeleton-heading width="50%"></theme-skeleton-heading>
              <theme-skeleton-text></theme-skeleton-text>
              <theme-skeleton-text width="80%"></theme-skeleton-text>
            </theme-container>
          </div>
        </div>
      </section>
    </div>
  </div>
`;

const meta: Meta = {
  title: "Theme/Tactical WC/Demo",
  // demoPage is exported for reuse (e.g. a standalone demo bundle), not as a story.
  excludeStories: ["demoPage"],
  parameters: { intro: null, layout: "fullscreen" },
};
export default meta;

export const Overview: StoryObj = { render: demoPage };
