import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-disc.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Disc",
  render: (args) => html`<theme-disc .value=${args["value"]} label=${args["label"]}></theme-disc>`,
  args: { value: 64, label: "Override" },
};
export default meta;

type Story = StoryObj;

export const Gauge: Story = {};
export const Spinner: Story = { args: { value: undefined, label: "Syncing" } };
