import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-select.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Select",
  parameters: {
    intro: {
      tag: "theme-select",
      title: "Select",
      description: [
        "A native select inside a form control, styled to match Input.",
        "The options you write inside it are copied into the inner select, because Chromium doesn't render options passed into a shadow root.",
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
