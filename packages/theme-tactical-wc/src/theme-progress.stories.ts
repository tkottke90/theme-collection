import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-progress.js";

const meta: Meta = {
  title: "Theme/Tactical WC/Progress",
  render: (args) =>
    html`<theme-progress
      label=${args["label"]}
      value=${args["value"]}
      max=${args["max"]}
    ></theme-progress>`,
  args: { label: "Signal", value: 65, max: 100 },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Empty: Story = {
  args: { value: 0 },
};

export const Full: Story = {
  args: { value: 100 },
};
