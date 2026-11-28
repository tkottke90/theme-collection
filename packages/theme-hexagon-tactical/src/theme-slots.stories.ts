import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-slots.js";

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Slots",
  parameters: {
    intro: {
      tag: "theme-slots",
      title: "Slots",
      description: [
        "A segmented meter: a row of skewed bars, like a charge track on a device panel. The first on bars light lime with a soft glow, the next hot bars light red, and the rest stay dark void with a grey edge.",
        "It is exposed as a meter (value is on plus hot, max is total), so give it a label naming what it measures.",
      ],
    },
  },
  render: (args) =>
    html`<theme-slots
      total=${args["total"]}
      on=${args["on"]}
      hot=${args["hot"]}
      label=${args["label"]}
    ></theme-slots>`,
  args: { total: 6, on: 2, hot: 0, label: "C1 charge" },
};
export default meta;

type Story = StoryObj;

export const OnOnly: Story = {};
export const Hot: Story = { args: { on: 0, hot: 3, label: "C2 charge" } };
export const Full: Story = { args: { on: 6, hot: 0 } };
