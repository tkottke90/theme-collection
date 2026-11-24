import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-select.js";

const meta: Meta = {
  title: "Theme/Starter WC/Select",
  parameters: {
    intro: {
      tag: "theme-select",
      title: "Select",
      description: [
        "A native select in a form-associated host, styled like the text input. Write option elements as children: they're mirrored into the shadow select, because Chromium doesn't render options slotted into one.",
        "Copying this starter? Keep the mirroring and form behaviour and describe how your theme draws the closed control and its arrow.",
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
