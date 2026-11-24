import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-card.js";

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Card",
  parameters: {
    intro: {
      tag: "theme-card",
      title: "Card",
      description: [
        "The theme's main panel: a plate with all four corners cut at 45°. A clip-path would remove a CSS border, so the frame is two clipped layers instead: a 3px grey border layer, and inside it a raised-surface-to-surface gradient fill whose corner cut is shrunk so the diagonal edges read as thick as the straight ones. A soft drop shadow lifts the plate off the carbon-fibre page.",
        "The heading is a small, uppercase, widely tracked muted title led by a skewed lime tab, the label motif the theme repeats wherever a panel is named.",
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
