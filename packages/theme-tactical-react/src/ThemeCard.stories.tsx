import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeCard } from "./ThemeCard.js";

const meta: Meta<typeof ThemeCard> = {
  title: "Theme/Tactical React/Card",
  component: ThemeCard,
  parameters: {
    intro: {
      tag: "ThemeCard",
      title: "Card",
      description: [
        "A content panel framed by a resizable SVG HUD outline with a tab and chevron notch at the top. An optional heading sits above the children in tracked cyan capitals.",
        "The frame redraws as the card is resized, so give it room (a grid cell or block width) rather than a fixed height.",
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
