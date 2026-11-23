import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-divider.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Divider",
  render: (args) => html`<theme-divider variant=${args["variant"]}></theme-divider>`,
  args: { variant: "peaks" },
  argTypes: { variant: { control: "select", options: ["peaks", "trim"] } },
};
export default meta;

type Story = StoryObj;

export const Peaks: Story = {};
export const Trim: Story = { args: { variant: "trim" } };
