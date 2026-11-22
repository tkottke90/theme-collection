import type { Meta, StoryObj } from "@storybook/web-components";
import { html, svg } from "lit";
import "./theme-toolbar-button.js";

// Original placeholder icon.
const UPLOAD_ICON = svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4M7 9l5-5 5 5M4 15v5h16v-5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="square"/></svg>`;

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Toolbar Button",
  render: (args) => html`
    <theme-toolbar-button
      material=${args["material"]}
      ?pressed=${args["pressed"]}
      label=${args["label"]}
    >
      ${args["content"] === "icon" ? UPLOAD_ICON : args["content"]}
    </theme-toolbar-button>
  `,
  args: { material: "graphite", pressed: false, label: "Action", content: "a" },
};
export default meta;

type Story = StoryObj;

export const Graphite: Story = {};
export const Steel: Story = { args: { material: "steel", content: "icon", label: "Upload" } };
export const Danger: Story = { args: { material: "danger", content: "icon", label: "Delete" } };
export const TogglePressed: Story = {
  args: { material: "toggle", pressed: true, content: "a", label: "Program A" },
};
export const ToggleUnpressed: Story = {
  args: { material: "toggle", pressed: false, content: "b", label: "Program B" },
};
