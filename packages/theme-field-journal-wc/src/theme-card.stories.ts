import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-card.js";

const meta: Meta = {
  title: "Theme/Field Journal WC/Card",
  parameters: {
    intro: {
      tag: "theme-card",
      title: "Card",
      description: [
        "A plain cream card: the base surface that quest cards, notes and item slots build on. An optional heading sits above the slotted content in the theme's title face.",
        "A fine paper grain, a tan border and a soft shadow make it read as a card laid on the page.",
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
