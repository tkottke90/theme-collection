import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeStat } from "./ThemeStat.js";

const meta: Meta<typeof ThemeStat> = {
  title: "Theme/Tactical React/Stat",
  component: ThemeStat,
  parameters: {
    intro: {
      tag: "ThemeStat",
      title: "Stat",
      description: [
        "A large numeric readout in the same HUD frame as the card: a tracked muted label above a monospace cyan value with an optional unit.",
        "Readouts use the monospace face; everything else is sans.",
      ],
    },
  },
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
