import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-card.js";

const meta: Meta = {
  title: "Theme/Tactical WC/Card",
  parameters: {
    intro: {
      tag: "theme-card",
      title: "Card",
      description: [
        "A content panel framed by a resizable SVG HUD outline with a tab and chevron notch at the top. An optional heading sits above the slotted content in tracked cyan capitals. The frame redraws as the card is resized.",
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
