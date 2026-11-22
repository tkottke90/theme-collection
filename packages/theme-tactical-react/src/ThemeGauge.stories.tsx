import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeGauge } from "./ThemeGauge.js";

const meta: Meta<typeof ThemeGauge> = {
  title: "Theme/Tactical React/Gauge",
  component: ThemeGauge,
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
