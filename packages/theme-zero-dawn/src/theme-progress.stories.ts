import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-progress.js";
import "./theme-card.js";
import "./theme-container.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Progress",
  parameters: {
    intro: {
      tag: "theme-progress",
      title: "Progress",
      description: [
        "Progress is a glowing cyan channel divided into segments by seam ticks, in two variants. Raised puts the channel in a bevelled steel plate with its own drop shadow, for dark containers. Recessed has no plate at all: it is a slot cut into whatever surface it sits on.",
        "The recessed slot's walls are lit as the inside of a hole, the reverse of a raised edge: top and left in shadow, bottom and right catching the light. The fill glows from the slot's floor and tints its walls without spilling onto the surface, so on a light card the light seems to come from inside the plate. The variant is always set explicitly; the bar never guesses it from its surroundings.",
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
      ></theme-progress>
    </div>`,
  args: { value: 60, segments: 10, label: "Armour", variant: "raised" },
  argTypes: { variant: { control: "select", options: ["raised", "recessed"] } },
};
export default meta;

type Story = StoryObj;

export const Raised: Story = {};
export const Empty: Story = { args: { value: 0 } };
export const Full: Story = { args: { value: 100 } };

/** Recessed sits on a light plate: the light reads as coming from inside it. */
export const Recessed: Story = {
  render: () =>
    html`<div style="max-width: 24rem">
      <theme-card heading="Armour">
        <theme-progress variant="recessed" value="60" label="Plating"></theme-progress>
      </theme-card>
    </div>`,
};

/** Each variant on the surface it pairs with. */
export const Pairings: Story = {
  render: () =>
    html`<div
      style="display: grid; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); gap: 2rem; max-width: 48rem"
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
 * One variable recolours a bar: set --zd-progress-fill on the element. The
 * fill, glow, leading edge and recessed wall tint all follow it.
 */
export const CustomFill: Story = {
  render: () =>
    html`<div style="max-width: 24rem; display: flex; flex-direction: column; gap: 1.5rem">
      <theme-progress value="70" label="Default"></theme-progress>
      <theme-progress
        value="35"
        label="Ochre"
        style="--zd-progress-fill: var(--color-tribe-ochre)"
      ></theme-progress>
      <theme-card heading="On a light plate">
        <theme-progress
          variant="recessed"
          value="55"
          label="Ochre, recessed"
          style="--zd-progress-fill: var(--color-tribe-ochre)"
        ></theme-progress>
      </theme-card>
    </div>`,
};
