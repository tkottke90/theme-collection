import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeSkeletonHeading } from "./ThemeSkeletonHeading.js";

const meta: Meta<typeof ThemeSkeletonHeading> = {
  title: "Theme/Tactical React/Skeleton/Heading",
  component: ThemeSkeletonHeading,
};
export default meta;

type Story = StoryObj<typeof ThemeSkeletonHeading>;

export const Default: Story = {};

export const Narrow: Story = {
  args: { width: "30%" },
};
