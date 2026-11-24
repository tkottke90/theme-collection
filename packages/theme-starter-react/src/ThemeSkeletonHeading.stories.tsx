import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeSkeletonHeading } from "./ThemeSkeletonHeading.js";

const meta: Meta<typeof ThemeSkeletonHeading> = {
  title: "Theme/Starter React/Skeleton/Heading",
  component: ThemeSkeletonHeading,
  parameters: {
    intro: {
      tag: "ThemeSkeletonHeading",
      title: "Skeleton heading",
      description: [
        "A loading placeholder the height of a heading, with a configurable width. It shimmers between the theme's two skeleton tokens, and holds still for people who prefer reduced motion.",
        "When copying the starter, describe your placeholder shape and the shimmer, and set the skeleton tokens to suit your surfaces.",
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
