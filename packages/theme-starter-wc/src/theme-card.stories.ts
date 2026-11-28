import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-card.js";

const meta: Meta = {
  title: "Theme/Starter WC/Card",
  parameters: {
    intro: {
      tag: "theme-card",
      title: "Card",
      description: [
        "A content surface: a brand-50 panel with a faint brand-100 edge and dark brand-900 ink, rounded to the theme radius. An optional heading sits above the slotted content.",
        "Copying this starter? Describe your card's surface (material, edge, depth) and which ink colours slotted text should use on it.",
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
