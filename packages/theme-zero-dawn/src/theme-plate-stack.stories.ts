import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-plate-stack.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Plate Stack",
  render: (args) =>
    html`<div style="max-width: 24rem">
      <theme-plate-stack
        value=${args["value"]}
        segments=${args["segments"]}
        label=${args["label"]}
      ></theme-plate-stack>
    </div>`,
  args: { value: 60, segments: 10, label: "Armour" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
export const Empty: Story = { args: { value: 0 } };
export const Full: Story = { args: { value: 100 } };
