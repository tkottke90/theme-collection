import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeSkeletonText } from "./ThemeSkeletonText.js";

const meta: Meta<typeof ThemeSkeletonText> = {
  title: "Theme/Starter React/Skeleton/Text",
  component: ThemeSkeletonText,
  parameters: {
    intro: {
      tag: "ThemeSkeletonText",
      title: "Skeleton text",
      description: [
        "A loading placeholder for a line of body text. Stack a few at different widths to suggest a paragraph.",
        "When copying the starter, keep it in step with the skeleton heading: the same shimmer, at body-text height.",
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
