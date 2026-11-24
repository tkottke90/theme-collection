import type { Meta, StoryObj } from "@storybook/web-components";
import { html, svg } from "lit";
import "./index.js";

/**
 * A full control-panel page composed only from this package's components:
 * a node board with its toolbar and transport, a working deployment form,
 * and the supporting panels around them.
 */

// Original placeholder icons, drawn for this demo.
const ICON = {
  arrow: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3L4 11h5v3h6v-3h5z" fill="currentColor"/></svg>`,
  split: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21v-8M12 13L5 6M12 13l7-7M3 4h5M16 4h5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="square"/></svg>`,
  upload: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4M7 9l5-5 5 5M4 15v5h16v-5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="square"/></svg>`,
  trash: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square"/></svg>`,
  play: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l12 8-12 8z" fill="currentColor"/></svg>`,
  stop: svg`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" fill="currentColor"/></svg>`,
};

const ROW = "display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;";
const STACK = "display: flex; flex-direction: column; gap: 1rem;";
const SECTION = "display: flex; flex-direction: column; gap: 1.25rem; margin-top: 2.5rem;";
const GRID = (cols: string) => `display: grid; grid-template-columns: ${cols}; gap: 1.5rem;`;
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
  if (out) out.textContent = "Awaiting orders.";
}

function onSubmit(e: SubmitEvent) {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  const entries = [...new FormData(form)].map(([k, v]) => `${k}=${String(v)}`);
  const out = form.querySelector(".demo-result");
  if (out) out.textContent = entries.length ? `Deployed: ${entries.join(", ")}` : "Empty orders.";
}

export const demoPage = () => html`
  <div style="max-width: 60rem; margin: 0 auto">
    <header style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 40rem">
      <theme-text variant="caption">Hexagon Tactical · Web Components</theme-text>
      <theme-heading level="1">Node control panel</theme-heading>
      <theme-text
        >Seat tiles in the board, set their order, then run the program. Every panel on this page is
        a component from the package.</theme-text
      >
      <div style="${ROW} margin-top: 0.5rem">
        <theme-button label="Run program"></theme-button>
        <theme-button variant="secondary" label="Load preset"></theme-button>
        <theme-button variant="ghost" label="Skip tutorial"></theme-button>
        <theme-button label="Locked" disabled></theme-button>
      </div>
    </header>

    <section style=${SECTION}>
      <theme-heading level="2">Program board</theme-heading>
      <div style=${GRID("auto 1fr")}>
        <theme-card heading="Board A-7">
          <theme-hex-board cols="3" rows="3.6" w="88">
            <theme-hex-socket q="0" r="0" step="3" aria-label="Lift, step 3">
              <theme-chip nub rotation="60">${ICON.arrow}</theme-chip>
            </theme-hex-socket>
            <theme-hex-socket q="0" r="2" step="1" aria-label="Grab, step 1">
              <theme-chip nub rotation="180">${ICON.arrow}</theme-chip>
            </theme-hex-socket>
            <theme-hex-socket q="1" r="0" step="4" aria-label="Split, step 4">
              <theme-chip variant="blue">${ICON.split}</theme-chip>
            </theme-hex-socket>
            <theme-hex-socket
              q="1"
              r="1"
              add
              selected
              aria-label="Add a tile here"
            ></theme-hex-socket>
            <theme-hex-socket q="1" r="2" empty aria-label="Empty socket"></theme-hex-socket>
            <theme-hex-socket q="2" r="0" aria-label="Counter C1, 40% charged">
              <theme-chip variant="charge" .charge=${0.4}>C1</theme-chip>
            </theme-hex-socket>
            <theme-hex-socket q="2" r="2" step="2" aria-label="Rotate, step 2">
              <theme-chip variant="rust" nub rotation="300">${ICON.arrow}</theme-chip>
            </theme-hex-socket>
            <theme-hex-socket q="2" r="1" aria-label="Drive wheel">
              <theme-chip variant="wheel"></theme-chip>
            </theme-hex-socket>
          </theme-hex-board>
        </theme-card>

        <div style=${STACK}>
          <theme-container>
            <div style=${STACK}>
              <theme-heading level="3">Toolbar</theme-heading>
              <div style=${ROW}>
                <theme-toolbar-button material="toggle" pressed label="Program A"
                  >a</theme-toolbar-button
                >
                <theme-toolbar-button material="toggle" label="Program B">b</theme-toolbar-button>
                <theme-toolbar-button label="Program C">c</theme-toolbar-button>
                <theme-toolbar-button material="steel" label="Upload"
                  >${ICON.upload}</theme-toolbar-button
                >
                <theme-toolbar-button material="danger" label="Clear board"
                  >${ICON.trash}</theme-toolbar-button
                >
              </div>
              <theme-heading level="4">Transport</theme-heading>
              <div style=${ROW}>
                <theme-transport-control pressed label="Play">${ICON.play}</theme-transport-control>
                <theme-transport-control label="Stop">${ICON.stop}</theme-transport-control>
              </div>
            </div>
          </theme-container>

          <theme-container>
            <div style="${ROW} justify-content: space-between">
              <div style=${STACK}>
                <theme-text variant="caption">C1 charge</theme-text>
                <theme-slots total="6" on="4" label="C1 charge"></theme-slots>
                <theme-text variant="caption">C2 overload</theme-text>
                <theme-slots total="6" on="2" hot="3" label="C2 overload"></theme-slots>
              </div>
              <div style="display: flex; flex-direction: column; align-items: center; gap: 0.25rem">
                <theme-counter value="9" label="9 tiles left"></theme-counter>
                <theme-text variant="caption">Tiles left</theme-text>
              </div>
            </div>
          </theme-container>
        </div>
      </div>
    </section>

    <section style=${SECTION}>
      <theme-heading level="2">Deploy squad</theme-heading>
      <div style=${GRID("repeat(auto-fit, minmax(20rem, 1fr))")}>
        <theme-container>
          <form style=${STACK} @submit=${onSubmit}>
            <theme-field label="Callsign">
              <theme-input name="callsign" placeholder="Hex-01"></theme-input>
            </theme-field>
            <theme-field label="Operator email">
              <theme-input name="email" type="email" placeholder="ops@example.com"></theme-input>
            </theme-field>
            <div style=${GRID("1fr 1fr")}>
              <theme-field label="Squad">
                <theme-select name="squad">
                  <option>Vanguard</option>
                  <option selected>Recon</option>
                  <option>Support</option>
                </theme-select>
              </theme-field>
              <theme-field label="Units">
                <theme-input name="units" type="number" value="4"></theme-input>
              </theme-field>
            </div>
            <theme-field label="Access code">
              <theme-input name="code" type="password" placeholder="••••"></theme-input>
            </theme-field>
            <theme-field label="Orders">
              <theme-textarea name="orders" rows="3" placeholder="Hold the north ridge.">
              </theme-textarea>
            </theme-field>
            <theme-field label="Formation">
              <div style="display: flex; gap: 1.25rem">
                ${["Wedge", "Line"].map(
                  (c) =>
                    html`<label style=${INLINE_LABEL}
                      ><theme-input
                        type="radio"
                        name="formation"
                        value=${c.toLowerCase()}
                        ?checked=${c === "Wedge"}
                      ></theme-input
                      >${c}</label
                    >`,
                )}
              </div>
            </theme-field>
            <label style=${INLINE_LABEL}
              ><theme-input type="checkbox" name="silent" value="yes"></theme-input>Radio
              silence</label
            >
            <div style=${ROW}>
              <theme-button label="Deploy" @click=${onSubmitClick}></theme-button>
              <theme-button variant="secondary" label="Reset" @click=${onResetClick}></theme-button>
            </div>
            <theme-text variant="caption" class="demo-result" aria-live="polite"
              >Awaiting orders.</theme-text
            >
          </form>
        </theme-container>

        <div style=${STACK}>
          <theme-blockquote type="warning"
            >C2 is running hot. Clear a slot before the next cycle.</theme-blockquote
          >
          <theme-blockquote type="tip"
            >Every control here submits with the form and resets with it.</theme-blockquote
          >
          <theme-container as="ol">
            <theme-item>Seat a tile in an empty socket</theme-item>
            <theme-item>Number the run order</theme-item>
            <theme-item>Press play</theme-item>
          </theme-container>
          <theme-detail summary="How are sockets placed?">
            <theme-text
              >Each socket reads its column and row from the board, in axial hex coordinates. See
              the <theme-link href="#">package README</theme-link> for the attributes.</theme-text
            >
          </theme-detail>
          <!-- Skeletons sit on the page: their base colour matches a panel's fill. -->
          <div aria-hidden="true">
            <theme-skeleton-heading width="50%"></theme-skeleton-heading>
            <theme-skeleton-text></theme-skeleton-text>
            <theme-skeleton-text width="80%"></theme-skeleton-text>
          </div>
        </div>
      </div>
    </section>
  </div>
`;

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Demo",
  // demoPage is exported for reuse (e.g. a standalone demo bundle), not as a story.
  excludeStories: ["demoPage"],
  parameters: { intro: null, layout: "fullscreen" },
};
export default meta;

export const Overview: StoryObj = { render: demoPage };
