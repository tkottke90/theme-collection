import type { Meta, StoryObj } from "@storybook/web-components";
import { html, svg } from "lit";
import "./theme-transport-control.js";

// Original placeholder icons.
const PLAY_ICON = svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l12 8-12 8z" fill="currentColor"/></svg>`;
const STOP_ICON = svg`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" fill="currentColor"/></svg>`;

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Transport Control",
  render: (args) => html`
    <theme-transport-control ?pressed=${args["pressed"]} label=${args["label"]}>
      ${args["icon"] === "play" ? PLAY_ICON : STOP_ICON}
    </theme-transport-control>
  `,
  args: { pressed: false, label: "Play", icon: "play" },
};
export default meta;

type Story = StoryObj;

export const Active: Story = { args: { pressed: true } };
export const Inactive: Story = { args: { pressed: false, label: "Stop", icon: "stop" } };
