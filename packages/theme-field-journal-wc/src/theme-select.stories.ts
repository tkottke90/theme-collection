import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-select.js";

const meta: Meta = {
  title: "Theme/Field Journal WC/Select",
  parameters: {
    intro: {
      tag: "theme-select",
      title: "Select",
      description: [
        "A styled native select that looks like the text input and, like it, submits under name, resets with its form and follows a disabled fieldset. Options are written as ordinary option children.",
        "The options are mirrored into the shadow root because Chromium does not render options slotted into a shadow select. Name it with aria-label or a label element.",
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
