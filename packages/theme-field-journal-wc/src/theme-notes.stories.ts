import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-notes.js";

const meta: Meta = {
  title: "Theme/Field Journal WC/Notes",
  parameters: {
    intro: {
      tag: "theme-notes",
      title: "Notes",
      description: [
        "A cream card with ruled lines, for handwritten margin notes. The slotted text sits on the ruling in Caveat, with the line height matched to the rules.",
        "Keep it to a few lines: it is meant as a scribble beside the main content.",
      ],
    },
  },
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
