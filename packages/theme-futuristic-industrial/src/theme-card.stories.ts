import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-card.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Card",
  parameters: {
    intro: {
      tag: "theme-card",
      title: "Card",
      description: [
        "The theme's main panel: a plate with 45° cuts at the top-left and bottom-right, a bolt in each square corner, and a strip of hazard tape along the top-left cut. A thin inner rule sits inside the ink outline, and a soft shadow lifts the plate off the page.",
        "The frame is SVG drawn from the panel's measured size, so the cuts, bolts and stripe stay in place at any width or height.",
      ],
    },
  },
  render: (args) => html` <theme-card heading=${args["heading"]}>${args["body"]}</theme-card> `,
  args: {
    heading: "Card title",
    body: "Body copy rendered inside the default slot.",
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
