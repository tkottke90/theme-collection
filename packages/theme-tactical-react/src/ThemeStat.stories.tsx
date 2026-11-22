import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeStat } from "./ThemeStat.js";

const meta: Meta<typeof ThemeStat> = {
  title: "Theme/Tactical React/Stat",
  component: ThemeStat,
  args: {
    label: "System Status",
    value: "1565",
  },
};
export default meta;

type Story = StoryObj<typeof ThemeStat>;

export const Default: Story = {};

export const WithUnit: Story = {
  args: { label: "Altitude", value: "12800", unit: "ft" },
};
