import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-gauge.js";

const meta: Meta = {
  title: "Theme/Tactical WC/Gauge",
  parameters: {
    intro: {
      tag: "theme-gauge",
      title: "Gauge",
      description: [
        "A radial gauge: a cyan arc with a glow on a dim track, with the value and label in the centre in the monospace face. Value runs from 0 to max.",
      ],
    },
  },
  render: (args) =>
    html`<theme-gauge
      label=${args["label"]}
      value=${args["value"]}
      max=${args["max"]}
    ></theme-gauge>`,
  args: { label: "Power", value: 72, max: 100 },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Low: Story = {
  args: { value: 15, label: "Fuel" },
};

export const Full: Story = {
  args: { value: 100, label: "Shield" },
};
