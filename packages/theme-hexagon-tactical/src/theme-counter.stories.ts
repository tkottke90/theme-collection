import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-counter.js";

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Counter",
  render: (args) =>
    html`<theme-counter value=${args["value"]} label=${args["label"]}></theme-counter>`,
  args: { value: "9", label: "9 tiles left" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
