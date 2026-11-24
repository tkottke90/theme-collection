import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-select.js";

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Select",
  parameters: {
    intro: {
      tag: "theme-select",
      title: "Select",
      description: [
        "A native select with Input's recessed surface-alt well, grey border and lime focus ring, in a form-associated host that submits, resets and follows a disabled fieldset.",
        "Write options as light-DOM option children. They're mirrored into the shadow select rather than slotted, because Chromium doesn't render options slotted into one.",
      ],
    },
  },
  render: () => html`
    <theme-select>
      <option value="one">One</option>
      <option value="two">Two</option>
      <option value="three">Three</option>
    </theme-select>
  `,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
