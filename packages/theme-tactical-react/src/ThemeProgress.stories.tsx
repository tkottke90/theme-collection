import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeProgress } from "./ThemeProgress.js";

const meta: Meta<typeof ThemeProgress> = {
  title: "Theme/Tactical React/Progress",
  component: ThemeProgress,
  parameters: {
    intro: {
      tag: "ThemeProgress",
      title: "Progress",
      description: [
        "A segmented progress bar in a bordered track, filled with a glowing cyan bar cut into ticks like a HUD meter.",
        "It is exposed as a progressbar named by its label.",
      ],
    },
  },
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
