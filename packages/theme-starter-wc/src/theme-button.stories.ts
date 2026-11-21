import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-button.js";

const meta: Meta = {
  title: "Theme/Starter WC/Button",
  render: (args) => html`<theme-button label=${args["label"]}></theme-button>`,
  args: { label: "Click me" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const CustomLabel: Story = {
  args: { label: "Submit" },
};
