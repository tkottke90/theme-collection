import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeSkeletonText } from "./ThemeSkeletonText.js";

const meta: Meta<typeof ThemeSkeletonText> = {
  title: "Theme/Tactical React/Skeleton/Text",
  component: ThemeSkeletonText,
  parameters: {
    intro: {
      tag: "ThemeSkeletonText",
      title: "Skeleton Text",
      description: [
        "A loading placeholder for a line of body text: a shorter shimmering bar in the dark skeleton tones. Width is configurable.",
        "The shimmer stops under prefers-reduced-motion.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj<typeof ThemeSkeletonText>;

export const Default: Story = {};

export const Short: Story = {
  args: { width: "50%" },
};
