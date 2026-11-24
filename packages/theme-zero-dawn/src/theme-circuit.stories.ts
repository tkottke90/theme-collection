import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-circuit.js";
import "./theme-heading.js";
import "./theme-text.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Circuit",
  parameters: {
    intro: {
      tag: "theme-circuit",
      title: "Circuit",
      description: [
        "A backdrop of old-world circuitry for heroes and empty states. The traces are drawn for one half and mirrored, giving the symmetry of the reference's circuit motif, with right-angle runs, rounded elbows and ring terminals, around a stacked-chevron emblem.",
        "The traces are masked to stay out of the content's way: they fade to a faint texture behind the centre, where a heading and copy sit, and dissolve at the top and bottom instead of ending in a hard crop. The glow attribute lights them in machine cyan.",
      ],
    },
  },
  render: (args) =>
    html`<theme-circuit ?glow=${args["glow"]}>
      <theme-heading level="1">The world remade</theme-heading>
      <theme-text>Nothing logged here yet.</theme-text>
    </theme-circuit>`,
  args: { glow: false },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
export const Glow: Story = { args: { glow: true } };
