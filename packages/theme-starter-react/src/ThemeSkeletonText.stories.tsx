import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeSkeletonText } from "./ThemeSkeletonText.js";

const meta: Meta<typeof ThemeSkeletonText> = {
  title: "Theme/Starter React/Skeleton/Text",
  component: ThemeSkeletonText,
};
export default meta;

type Story = StoryObj<typeof ThemeSkeletonText>;

export const Default: Story = {};

export const Short: Story = {
  args: { width: "50%" },
};
