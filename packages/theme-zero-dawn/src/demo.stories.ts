import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./index.js";
import type { GlyphColor, GlyphName } from "./glyphs.js";

/**
 * A full page composed only from this package's components: a field guide
 * to (invented) machines. All names and copy are placeholders written for
 * this demo.
 */

interface Machine {
  name: string;
  role: string;
  glyph: GlyphName;
  color: GlyphColor;
  armour: number;
  body: string;
}

const MACHINES: Machine[] = [
  {
    name: "Ridgestrider",
    role: "Grazer · Herd",
    glyph: "peaks",
    color: "moss",
    armour: 30,
    body: "Travels the valley floors in loose herds, shedding plates as it feeds. The fuel cells along its spine glow brightest at dusk.",
  },
  {
    name: "Dishcrown",
    role: "Relay · Solitary",
    glyph: "focus",
    color: "cobalt",
    armour: 70,
    body: "A tall, slow walker that carries a segmented dish where a head should be. It maps the land around it, and climbing it reveals the map.",
  },
  {
    name: "Shardback",
    role: "Hunter · Pack",
    glyph: "claw",
    color: "red",
    armour: 90,
    body: "Overlapping shards run nose to tail. The gaps between plates are narrow, so aim for the exposed core under the jaw.",
  },
];

const SIGILS: Array<{ name: GlyphName; color: GlyphColor; label: string }> = [
  { name: "spear", color: "red", label: "Hunters" },
  { name: "sun", color: "ochre", label: "Sunward" },
  { name: "feather", color: "teal", label: "Windriders" },
  { name: "wave", color: "cobalt", label: "Rivermark" },
  { name: "hearth", color: "orange", label: "Forgekin" },
  { name: "eye", color: "violet", label: "Seers" },
];

/**
 * Hue slider: drives --zd-progress-fill for every progress bar on the page.
 * theme-progress keeps only the hue (lightness and chroma are locked to a
 * contrast-safe band), so the slider can only ever produce readable bars.
 * Its track is painted with exactly that band.
 */
const DEFAULT_HUE = 216; // the theme cyan's hue
const BAND = Array.from({ length: 13 }, (_, i) => `oklch(0.72 0.12 ${i * 30})`).join(", ");

const HUE_STYLES = html`<style>
  .zd-hue {
    margin-top: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  .zd-hue-head {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-text);
  }
  .zd-hue-value {
    color: var(--color-text-muted);
  }
  .zd-hue-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .zd-hue input[type="range"] {
    flex: 1;
    min-width: 0;
    height: 1.25rem;
    margin: 0;
    background: transparent;
    appearance: none;
    cursor: pointer;
  }
  .zd-hue input[type="range"]::-webkit-slider-runnable-track {
    height: 0.5rem;
    background: linear-gradient(to right, ${BAND});
    clip-path: polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px);
  }
  .zd-hue input[type="range"]::-moz-range-track {
    height: 0.5rem;
    background: linear-gradient(to right, ${BAND});
    clip-path: polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px);
  }
  .zd-hue input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 1.25rem;
    height: 1.25rem;
    margin-top: -0.375rem;
    border: 0;
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
    background:
      linear-gradient(var(--color-paint), var(--color-paint)) center / 40% 40% no-repeat,
      var(--color-core-deep);
  }
  .zd-hue input[type="range"]::-moz-range-thumb {
    width: 1.25rem;
    height: 1.25rem;
    border: 0;
    border-radius: 0;
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
    background:
      linear-gradient(var(--color-paint), var(--color-paint)) center / 40% 40% no-repeat,
      var(--color-core-deep);
  }
  .zd-hue input[type="range"]:focus-visible {
    outline: 2px solid var(--color-brand-500);
    outline-offset: 4px;
  }
</style>`;

function setHue(root: Element | null, hue: number | null) {
  const demo = root?.closest(".zd-demo") as HTMLElement | null;
  if (!demo) return;
  const input = demo.querySelector<HTMLInputElement>("#zd-hue");
  const output = demo.querySelector(".zd-hue-value");
  const shown = hue ?? DEFAULT_HUE;
  if (hue === null) demo.style.removeProperty("--zd-progress-fill");
  else demo.style.setProperty("--zd-progress-fill", `oklch(0.72 0.12 ${hue})`);
  if (input) {
    input.value = String(shown);
    input.setAttribute("aria-valuetext", `${shown} degrees`);
  }
  if (output) output.textContent = `${shown}°`;
}

function onHueInput(e: Event) {
  const input = e.target as HTMLInputElement;
  setHue(input, Number(input.value));
}

function onHueReset(e: Event) {
  setHue(e.target as Element, null);
}

/** One dial face per relay: a live reading and one still coming in. */
const TELEMETRY = [
  { variant: "dish", value: 64, reading: "Relay link", pending: "Syncing" },
  { variant: "segments", value: 82, reading: "Cell charge", pending: "Charging" },
  { variant: "peaks", value: 45, reading: "Hunt standing", pending: "Tallying" },
] as const;

const SECTION = "display: flex; flex-direction: column; gap: 1.25rem; margin-top: 3rem;";
const GRID = (min: string) =>
  `display: grid; grid-template-columns: repeat(auto-fit, minmax(${min}, 1fr)); gap: 1.75rem;`;

function machineCard(m: Machine) {
  return html`<theme-card heading=${m.name}>
    <div style="display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1rem">
      <theme-glyph name=${m.glyph} color=${m.color} shape="shield" size="56"></theme-glyph>
      <div style="flex: 1; min-width: 0">
        <theme-text variant="caption">${m.role}</theme-text>
        <theme-text>${m.body}</theme-text>
      </div>
    </div>
    <div style="margin-top: auto; display: flex; flex-direction: column; gap: 1.25rem">
      <theme-progress
        variant="recessed"
        value=${m.armour}
        segments="10"
        label="Armour"
      ></theme-progress>
      <div><theme-button variant="primary" label="Track"></theme-button></div>
    </div>
  </theme-card>`;
}

export const demoPage = () => html`
  ${HUE_STYLES}
  <div class="zd-demo" style="max-width: 72rem; margin: 0 auto">
    <theme-circuit glow style="--zd-circuit-min-height: 320px">
      <theme-text variant="caption">Survey log · Season of thaw</theme-text>
      <theme-heading level="1">Field guide to the machines</theme-heading>
      <div style="max-width: 36rem">
        <theme-text
          >Plated walkers roam the valleys again. Record what you see, mark what you hunt, and note
          where the cores show through.</theme-text
        >
      </div>
      <div
        style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-top: 1.5rem"
      >
        <theme-button variant="primary" label="Begin survey"></theme-button>
        <theme-button variant="secondary" label="Read the lore"></theme-button>
        <theme-button variant="ghost" label="Skip intro"></theme-button>
      </div>
    </theme-circuit>

    <theme-divider variant="peaks"></theme-divider>

    <section style=${SECTION}>
      <theme-heading level="2">Catalogued machines</theme-heading>
      <div style=${GRID("18rem")}>${MACHINES.map(machineCard)}</div>
    </section>

    <section style=${SECTION}>
      <theme-heading level="2">Expedition</theme-heading>
      <div style=${GRID("20rem")}>
        <theme-container style="align-self: start">
          <theme-heading level="3">Log a sighting</theme-heading>
          <div style="display: flex; flex-direction: column; gap: 1.1rem">
            <theme-field label="Machine">
              <theme-input placeholder="e.g. Ridgestrider" style="display: block"></theme-input>
            </theme-field>
            <theme-field label="Class">
              <theme-select style="display: block">
                <option>Grazer</option>
                <option>Relay</option>
                <option>Hunter</option>
              </theme-select>
            </theme-field>
            <theme-field label="Notes">
              <theme-textarea
                rows="3"
                placeholder="Where were the seams?"
                style="display: block"
              ></theme-textarea>
            </theme-field>
            <theme-field label="Threat">
              <div style="display: flex; gap: 1.25rem; align-items: center">
                ${["Low", "Medium", "High"].map(
                  (t) =>
                    html`<label
                      style="display: inline-flex; gap: 0.5rem; align-items: center; font-family: var(--font-sans)"
                      ><theme-input
                        type="radio"
                        name="threat"
                        ?checked=${t === "Medium"}
                      ></theme-input
                      >${t}</label
                    >`,
                )}
              </div>
            </theme-field>
            <label
              style="display: inline-flex; gap: 0.6rem; align-items: center; font-family: var(--font-sans)"
              ><theme-input type="checkbox"></theme-input>Core was exposed</label
            >
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem">
              <theme-button label="Save entry"></theme-button>
              <theme-button variant="secondary" label="Discard"></theme-button>
              <theme-button disabled label="Share"></theme-button>
            </div>
          </div>
        </theme-container>

        <div style="display: flex; flex-direction: column; gap: 1.75rem">
          <theme-container>
            <theme-heading level="3">Progress</theme-heading>
            <div style="display: flex; gap: 2rem; justify-content: space-around; flex-wrap: wrap">
              <theme-disc value="64" label="Surveyed"></theme-disc>
              <theme-disc value="22" label="Overridden"></theme-disc>
              <theme-disc label="Syncing"></theme-disc>
            </div>
            <div style="margin-top: 1.5rem">
              <theme-progress
                variant="raised"
                value="48"
                segments="8"
                label="Expedition supplies"
              ></theme-progress>
            </div>
            <div class="zd-hue">
              <div class="zd-hue-head">
                <label for="zd-hue">Channel hue</label>
                <output for="zd-hue" class="zd-hue-value">${DEFAULT_HUE}°</output>
              </div>
              <div class="zd-hue-row">
                <input
                  id="zd-hue"
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  .value=${String(DEFAULT_HUE)}
                  aria-valuetext="${DEFAULT_HUE} degrees"
                  @input=${onHueInput}
                />
                <theme-button variant="ghost" label="Reset" @click=${onHueReset}></theme-button>
              </div>
            </div>
          </theme-container>
          <theme-container as="ul">
            <theme-item>Climb the relay at the northern ridge</theme-item>
            <theme-item>Collect three fuel cells from grazers</theme-item>
            <theme-item>Return to the lodge before nightfall</theme-item>
          </theme-container>
          <theme-detail summary="How plating works">
            <theme-text
              >Each plate is bolted over a dark core. Strike the seams, not the plate faces, and
              <theme-link href="#">read the anatomy notes</theme-link> before a hunt.</theme-text
            >
          </theme-detail>
          <theme-detail summary="Recovered fragments">
            <theme-text>Fragments are still being decoded.</theme-text>
          </theme-detail>
        </div>
      </div>
    </section>

    <section style=${SECTION}>
      <theme-heading level="2">Lodge notices</theme-heading>
      <div style=${GRID("20rem")}>
        <theme-blockquote type="danger"
          >Shardback packs reported near the river crossing.</theme-blockquote
        >
        <theme-blockquote type="warning">Storms after dusk. Relays may go dark.</theme-blockquote>
        <theme-blockquote type="tip">Ochre paint marks a safe trail.</theme-blockquote>
        <theme-blockquote type="info">New survey maps are posted at the gate.</theme-blockquote>
        <theme-blockquote type="success">Last season's herd count was completed.</theme-blockquote>
        <theme-blockquote type="quote">"Read the seams, not the plates."</theme-blockquote>
      </div>
    </section>

    <section style=${SECTION}>
      <theme-heading level="2">Tribal sigils</theme-heading>
      <div style="display: flex; flex-wrap: wrap; gap: 1.75rem">
        ${SIGILS.map(
          (s) =>
            html`<div
              style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem"
            >
              <theme-glyph name=${s.name} color=${s.color} size="80" label=${s.label}></theme-glyph>
              <theme-text variant="caption">${s.label}</theme-text>
            </div>`,
        )}
      </div>
    </section>

    <section style=${SECTION}>
      <theme-heading level="2">Machine telemetry</theme-heading>
      <theme-container>
        <div
          style="display: grid; grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr)); gap: 2rem; justify-items: center"
        >
          ${TELEMETRY.map(
            (t) =>
              html`<div
                style="display: flex; flex-direction: column; gap: 1.5rem; align-items: center"
              >
                <theme-disc variant=${t.variant} value=${t.value} label=${t.reading}></theme-disc>
                <theme-disc variant=${t.variant} label=${t.pending}></theme-disc>
              </div>`,
          )}
        </div>
      </theme-container>
    </section>

    <section style=${SECTION}>
      <theme-heading level="2">Incoming report</theme-heading>
      <div style="max-width: 32rem">
        <theme-container>
          <theme-skeleton-heading width="55%"></theme-skeleton-heading>
          <theme-skeleton-text></theme-skeleton-text>
          <theme-skeleton-text width="90%"></theme-skeleton-text>
          <theme-skeleton-text width="70%"></theme-skeleton-text>
        </theme-container>
      </div>
    </section>

    <div style="margin-top: 3rem"><theme-divider variant="trim"></theme-divider></div>
    <theme-text variant="caption" style="text-align: center">
      Field guide · all machines and tribes are invented for this demo
    </theme-text>
  </div>
`;

const meta: Meta = {
  title: "Theme/Zero Dawn/Demo",
  // demoPage is exported for the standalone demo bundle, not as a story.
  excludeStories: ["demoPage"],
  parameters: { layout: "fullscreen" },
};
export default meta;

export const FieldGuide: StoryObj = { render: demoPage };
