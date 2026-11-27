import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeGauge } from "./ThemeGauge.js";

const meta: Meta<typeof ThemeGauge> = {
  title: "Theme/Tactical React/Gauge",
  component: ThemeGauge,
  parameters: {
    intro: {
      tag: "ThemeGauge",
      title: "Gauge",
      description: [
        "A radial gauge: a cyan arc with a glow on a dim track, with the value and label in the centre in the monospace face. Value runs from 0 to max.",
        "It is exposed as a meter named by its label.",
      ],
    },
  },
  args: {
    label: "Power",
    value: 72,
    max: 100,
  },
};
export default meta;

type Story = StoryObj<typeof ThemeGauge>;

export const Default: Story = {};

export const Low: Story = {
  args: { value: 15, label: "Fuel" },
};

export const Full: Story = {
  args: { value: 100, label: "Shield" },
};
