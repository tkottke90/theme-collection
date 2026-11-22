import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-gauge.js";

const meta: Meta = {
  title: "Theme/Tactical WC/Gauge",
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

/** See theme-card.stories.ts for why `data-theme` is set on the element itself. */
export const Light: Story = {
  render: (args) =>
    html`<theme-gauge
      data-theme="light"
      label=${args["label"]}
      value=${args["value"]}
    ></theme-gauge>`,
};
