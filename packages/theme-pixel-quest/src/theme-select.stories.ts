import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-select.js";

const meta: Meta = {
  title: "Theme/Pixel Quest/Select",
  parameters: {
    intro: {
      tag: "theme-select",
      title: "Select",
      description: [
        "A native select in the same recessed, thin-framed parchment well as the input, with the same forest-green focus outline.",
        "The light-DOM options are mirrored into the shadow select (Chromium doesn't render options slotted into a shadow-root select). The host is form-associated: it submits under name, resets to the option marked selected, follows a disabled fieldset, and fires change from the element.",
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
