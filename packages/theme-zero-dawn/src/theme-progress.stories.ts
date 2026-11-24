import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-progress.js";
import "./theme-card.js";
import "./theme-container.js";

/** The fill control as a style: set on a bar, or on a wrapper so every bar inside inherits it. */
function fillStyle(args: Record<string, unknown>): string {
  return args["fill"] ? `--zd-progress-fill: ${String(args["fill"])}` : "";
}

const meta: Meta = {
  title: "Theme/Zero Dawn/Progress",
  parameters: {
    intro: {
      tag: "theme-progress",
      title: "Progress",
      description: [
        "Progress is a glowing cyan channel divided into segments by seam ticks, in two variants. Raised puts the channel in a bevelled steel plate with its own drop shadow, for dark containers. Recessed has no plate at all: it is a slot cut into whatever surface it sits on.",
        "The recessed slot's walls are lit as the inside of a hole, the reverse of a raised edge: top and left in shadow, bottom and right catching the light. The fill glows from the slot's floor and tints its walls without spilling onto the surface, so on a light card the light seems to come from inside the plate. The variant is always set explicitly; the bar never guesses it from its surroundings.",
        "Its colour takes only a hue. Set --zd-progress-fill to any colour and the bar keeps the hue but locks lightness and chroma to the band the theme cyan sits in, so every possible hue holds over 7:1 against the empty channel. The fill control above takes any colour to try it.",
      ],
    },
  },
  render: (args) =>
    html`<div style="max-width: 24rem">
      <theme-progress
        value=${args["value"]}
        segments=${args["segments"]}
        label=${args["label"]}
        variant=${args["variant"]}
        style=${fillStyle(args)}
      ></theme-progress>
    </div>`,
  args: { value: 60, segments: 10, label: "Armour", variant: "raised", fill: "" },
  argTypes: {
    variant: { control: "select", options: ["raised", "recessed"] },
    fill: {
      control: "color",
      description:
        "--zd-progress-fill. Pick any colour: the bar keeps its hue and locks lightness and chroma so it always contrasts with the channel.",
    },
  },
};
export default meta;

type Story = StoryObj;

export const Raised: Story = {};
// An empty bar has no fill to colour, so the fill control would do nothing.
export const Empty: Story = {
  args: { value: 0 },
  parameters: { controls: { exclude: ["fill"] } },
};
export const Full: Story = { args: { value: 100 } };

/** Recessed sits on a light plate: the light reads as coming from inside it. */
export const Recessed: Story = {
  parameters: { controls: { include: ["fill"] } },
  render: (args) =>
    html`<div style="max-width: 24rem; ${fillStyle(args)}">
      <theme-card heading="Armour">
        <theme-progress variant="recessed" value="60" label="Plating"></theme-progress>
      </theme-card>
    </div>`,
};

/** Each variant on the surface it pairs with. */
export const Pairings: Story = {
  parameters: { controls: { include: ["fill"] } },
  render: (args) =>
    html`<div
      style="display: grid; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); gap: 2rem; max-width: 48rem; ${fillStyle(
        args,
      )}"
    >
      <theme-container>
        <div style="display: flex; flex-direction: column; gap: 1.5rem">
          <theme-progress variant="raised" value="70" label="Raised"></theme-progress>
          <theme-progress variant="raised" value="25" label="Raised"></theme-progress>
        </div>
      </theme-container>
      <theme-card heading="On a light plate">
        <div style="display: flex; flex-direction: column; gap: 1.5rem">
          <theme-progress variant="recessed" value="70" label="Recessed"></theme-progress>
          <theme-progress variant="recessed" value="25" label="Recessed"></theme-progress>
        </div>
      </theme-card>
    </div>`,
};

/**
 * Any colour can go in; only its hue comes out. A dark red, a neon green and
 * the tribe's moss all land at the same lightness and chroma as the cyan, so
 * every bar keeps the same weight and contrast.
 */
export const CustomFill: Story = {
  // Fixed inputs are the point here, so no controls to override them.
  parameters: { controls: { disable: true } },
  render: () =>
    html`<div style="max-width: 24rem; display: flex; flex-direction: column; gap: 1.5rem">
      ${[
        ["Default (theme cyan)", ""],
        ["#84212b (dark red)", "#84212b"],
        ["#39ff14 (neon green)", "#39ff14"],
        ["Tribe moss", "var(--color-tribe-moss)"],
      ].map(
        ([label, fill]) =>
          html`<theme-progress
            value="55"
            label=${label}
            style=${fill ? `--zd-progress-fill: ${fill}` : ""}
          ></theme-progress>`,
      )}
      <theme-card heading="On a light plate">
        <theme-progress
          variant="recessed"
          value="55"
          label="#84212b, recessed"
          style="--zd-progress-fill: #84212b"
        ></theme-progress>
      </theme-card>
    </div>`,
};
