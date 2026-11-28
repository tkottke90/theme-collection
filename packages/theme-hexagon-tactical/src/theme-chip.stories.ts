import type { Meta, StoryObj } from "@storybook/web-components";
import { html, svg } from "lit";
import "./theme-chip.js";

// Original placeholder icon — a simple arrow, not copied from any source.
const PLACEHOLDER_ICON = svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3L4 11h5v3h6v-3h5z" fill="currentColor"/></svg>`;

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Chip",
  parameters: {
    intro: {
      tag: "theme-chip",
      title: "Chip",
      description: [
        "A round game tile. Its face is a radial gradient lit from above, separated by a 4px void gap from a thin 3px outer ring, so it reads as a token seated in a bezel. Default is graphite; blue and rust are the two tile colours, each with its own brighter ring. Slot a glyph or an SVG icon, which is sized to 58% of the tile.",
        "Charge swaps the ring for a eight-segment red gauge filled to charge (0 to 1). Wheel is a red-and-grey segmented dial with a dark hub. nub adds a small white pointer on the ring, turned by rotation in degrees, to show which way a tile faces.",
      ],
    },
  },
  render: (args) => html`
    <theme-chip
      variant=${args["variant"]}
      .charge=${args["charge"]}
      ?nub=${args["nub"]}
      .rotation=${args["rotation"]}
      style="--size: 50px"
    >
      ${args["variant"] === "charge" ? args["label"] : PLACEHOLDER_ICON}
    </theme-chip>
  `,
  args: { variant: "default", charge: 0.5, nub: true, rotation: 60, label: "C1" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
export const Blue: Story = { args: { variant: "blue" } };
export const Rust: Story = { args: { variant: "rust" } };
export const Charge: Story = { args: { variant: "charge", nub: false, charge: 0.6, label: "C2" } };
export const Wheel: Story = { args: { variant: "wheel", nub: false } };
