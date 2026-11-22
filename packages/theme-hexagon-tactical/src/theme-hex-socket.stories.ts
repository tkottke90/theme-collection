import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-hex-socket.js";
import "./theme-chip.js";

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Hex Socket",
  render: (args) => html`
    <div style="position: relative; width: 90px; height: 80px;">
      <theme-hex-socket
        q="0"
        r="0"
        ?empty=${args["empty"]}
        ?add=${args["add"]}
        ?selected=${args["selected"]}
        step=${args["step"]}
        aria-label=${args["ariaLabel"]}
      >
        ${args["showChip"] ? html`<theme-chip style="--size: 45%"></theme-chip>` : null}
      </theme-hex-socket>
    </div>
  `,
  args: {
    empty: false,
    add: false,
    selected: false,
    step: "",
    showChip: true,
    ariaLabel: "Socket",
  },
};
export default meta;

type Story = StoryObj;

export const HoldingAChip: Story = { args: { step: "7" } };
export const Empty: Story = { args: { empty: true, showChip: false } };
export const AddSocket: Story = { args: { add: true, showChip: false } };
export const Selected: Story = { args: { selected: true, add: true, showChip: false } };
