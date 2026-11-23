import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-plate.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Plate",
  render: (args) => html`<theme-plate label=${args["label"]} value=${args["value"]}></theme-plate>`,
  args: { label: "Code", value: "13-V-2-44" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const ModelTag: Story = {
  args: { label: "Mod", value: "X5C" },
};
