import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-hex-board.js";
import "./theme-hex-socket.js";
import "./theme-chip.js";

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Hex Board",
  parameters: {
    intro: {
      tag: "theme-hex-board",
      title: "Hex Board",
      description: [
        "A flat-topped hex grid. It sizes itself from cols, rows and the hex width w, and publishes w as a custom property that each slotted Hex Socket reads, along with its own q and r, to place itself. Custom properties inherit into slotted children across the shadow boundary, so the board needs no layout script.",
        "Coordinates are axial: q is the column, and each column sits half a hex lower than the one before it, so r counts down within a column.",
      ],
    },
  },
  render: () => html`
    <theme-hex-board cols="3" rows="3.6" w="88">
      <theme-hex-socket q="0" r="0" step="3" aria-label="Lift, step 3">
        <theme-chip></theme-chip>
      </theme-hex-socket>
      <theme-hex-socket q="0" r="2" step="1" aria-label="Grab, step 1">
        <theme-chip></theme-chip>
      </theme-hex-socket>
      <theme-hex-socket q="1" r="0" step="4" aria-label="Split, step 4">
        <theme-chip variant="blue"></theme-chip>
      </theme-hex-socket>
      <theme-hex-socket q="1" r="1" add selected aria-label="Add a tile here"></theme-hex-socket>
      <theme-hex-socket q="1" r="2" aria-label="Empty socket" empty></theme-hex-socket>
      <theme-hex-socket q="2" r="0" aria-label="Counter C1, 40% charged">
        <theme-chip variant="charge" .charge=${0.4}>C1</theme-chip>
      </theme-hex-socket>
      <theme-hex-socket q="2" r="2" step="2" aria-label="Rotate, step 2">
        <theme-chip variant="rust"></theme-chip>
      </theme-hex-socket>
    </theme-hex-board>
  `,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
