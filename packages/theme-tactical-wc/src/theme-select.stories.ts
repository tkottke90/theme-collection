import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-select.js";

const meta: Meta = {
  title: "Theme/Tactical WC/Select",
  parameters: {
    intro: {
      tag: "theme-select",
      title: "Select",
      description: [
        "A styled native select in a form-associated host, built from light-DOM option children. It submits under its name, resets with its form, follows a disabled fieldset and fires change from the element.",
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
