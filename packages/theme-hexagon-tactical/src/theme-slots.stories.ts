import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-slots.js";

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Slots",
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
