import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-plate-stack.js";
import "./theme-card.js";
import "./theme-container.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Plate Stack",
  render: (args) =>
    html`<div style="max-width: 24rem">
      <theme-plate-stack
        value=${args["value"]}
        segments=${args["segments"]}
        label=${args["label"]}
        variant=${args["variant"]}
      ></theme-plate-stack>
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
        <theme-plate-stack variant="recessed" value="60" label="Plating"></theme-plate-stack>
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
          <theme-plate-stack variant="raised" value="70" label="Raised"></theme-plate-stack>
          <theme-plate-stack variant="raised" value="25" label="Raised"></theme-plate-stack>
        </div>
      </theme-container>
      <theme-card heading="On a light plate">
        <div style="display: flex; flex-direction: column; gap: 1.5rem">
          <theme-plate-stack variant="recessed" value="70" label="Recessed"></theme-plate-stack>
          <theme-plate-stack variant="recessed" value="25" label="Recessed"></theme-plate-stack>
        </div>
      </theme-card>
    </div>`,
};
