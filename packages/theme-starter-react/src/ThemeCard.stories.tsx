import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeCard } from "./ThemeCard.js";

const meta: Meta<typeof ThemeCard> = {
  title: "Theme/Starter React/Card",
  component: ThemeCard,
  parameters: {
    intro: {
      tag: "ThemeCard",
      title: "Card",
      description: [
        "A self-contained panel with an optional heading, for featured content. The starter uses a soft brand tint, a hairline border and the shared corner radius.",
        "When copying the starter, describe the card as your theme's primary surface: its material, edges and shadow, and which ink colours read on it.",
      ],
    },
  },
  args: {
    heading: "Card title",
    children: "Body copy rendered as children.",
  },
};
export default meta;

type Story = StoryObj<typeof ThemeCard>;

export const Default: Story = {};
