import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-stat-meter.js";

const meta: Meta = {
  title: "Theme/Pixel Quest/Stat Meter",
  parameters: {
    intro: {
      tag: "theme-stat-meter",
      title: "Stat Meter",
      description: [
        "The poster's most repeated widget: an icon, a bold slab label over a muted Inter sublabel, a short pixel-framed progress bar, and a tabular value / max readout. The bar is a 10px dark-earth track with a mid-green fill, inside a 1px near-black outline with tiny stepped corners, small enough to stay crisp at that height.",
        'The bar is a meter named by the label, so a screen reader announces it as, say, "Energy, meter, 6 of 10"; the visual readout is hidden from it to avoid saying the value twice.',
      ],
    },
  },
  render: (args) => html`
    <div style="max-width: 320px;">
      <theme-stat-meter
        label=${args["label"]}
        sublabel=${args["sublabel"]}
        value=${args["value"]}
        max=${args["max"]}
      >
        <svg slot="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
        </svg>
      </theme-stat-meter>
    </div>
  `,
  args: { label: "Energy", sublabel: "How much you can do", value: 6, max: 10 },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Low: Story = {
  args: { label: "Money", sublabel: "Freedom & options", value: 4, max: 10 },
};

export const Full: Story = {
  args: { label: "Sleep", sublabel: "Rest = progress", value: 10, max: 10 },
};
