import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeSkeletonHeading } from "./ThemeSkeletonHeading.js";

const meta: Meta<typeof ThemeSkeletonHeading> = {
  title: "Theme/Tactical React/Skeleton/Heading",
  component: ThemeSkeletonHeading,
  parameters: {
    intro: {
      tag: "ThemeSkeletonHeading",
      title: "Skeleton Heading",
      description: [
        "A loading placeholder for a heading: a shimmering bar in the dark skeleton tones. Width is configurable.",
        "The shimmer stops under prefers-reduced-motion.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj<typeof ThemeSkeletonHeading>;

export const Default: Story = {};

export const Narrow: Story = {
  args: { width: "30%" },
};
