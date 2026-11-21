import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeCard } from "./ThemeCard.js";

const meta: Meta<typeof ThemeCard> = {
  title: "Theme/Starter React/Card",
  component: ThemeCard,
  args: {
    heading: "Card title",
    children: "Body copy rendered as children.",
  },
};
export default meta;

type Story = StoryObj<typeof ThemeCard>;

export const Default: Story = {};
