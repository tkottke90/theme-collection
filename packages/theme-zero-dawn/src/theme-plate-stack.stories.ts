import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-plate-stack.js";
import "./theme-card.js";

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
  args: { value: 60, segments: 10, label: "Armour", variant: "shards" },
  argTypes: {
    variant: { control: "select", options: ["shards", "channel", "cells", "peaks"] },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
export const Empty: Story = { args: { value: 0 } };
export const Full: Story = { args: { value: 100 } };
export const Channel: Story = { args: { variant: "channel" } };
export const Cells: Story = { args: { variant: "cells" } };
export const Peaks: Story = { args: { variant: "peaks" } };

const VARIANTS = ["shards", "channel", "cells", "peaks"];

/** Every face at 30% and 70%, on the dark page and on a light card. */
export const Compare: Story = {
  render: () =>
    html`<div
      style="display: grid; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); gap: 2rem; max-width: 56rem"
    >
      <div style="display: flex; flex-direction: column; gap: 1.5rem">
        ${VARIANTS.map(
          (v) => html`<theme-plate-stack variant=${v} value="70" label=${v}></theme-plate-stack>`,
        )}
      </div>
      <theme-card heading="On a light plate">
        <div style="display: flex; flex-direction: column; gap: 1.5rem">
          ${VARIANTS.map(
            (v) => html`<theme-plate-stack variant=${v} value="30" label=${v}></theme-plate-stack>`,
          )}
        </div>
      </theme-card>
    </div>`,
};
