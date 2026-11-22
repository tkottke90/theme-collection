import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeProgress } from "./ThemeProgress.js";

const meta: Meta<typeof ThemeProgress> = {
  title: "Theme/Tactical React/Progress",
  component: ThemeProgress,
  args: {
    label: "Signal",
    value: 65,
    max: 100,
  },
};
export default meta;

type Story = StoryObj<typeof ThemeProgress>;

export const Default: Story = {};

export const Empty: Story = {
  args: { value: 0 },
};

export const Full: Story = {
  args: { value: 100 },
};
