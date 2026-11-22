import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-notes.js";

const meta: Meta = {
  title: "Theme/Field Journal WC/Notes",
  render: (args) =>
    html`<div style="max-width: 320px;">
      <theme-notes heading=${args["heading"]}>${args["content"]}</theme-notes>
    </div>`,
  args: {
    heading: "Local notes",
    content: "The people here are friendly, and the lake is said to shimmer most brightly at dawn.",
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
export const WithoutHeading: Story = { args: { heading: "" } };
