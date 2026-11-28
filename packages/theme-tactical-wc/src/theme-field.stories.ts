import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-field.js";
import "./theme-input.js";

const meta: Meta = {
  title: "Theme/Tactical WC/Field",
  parameters: {
    intro: {
      tag: "theme-field",
      title: "Field",
      description: [
        "A tracked-capitals label stacked over the control slotted into it. The field names that control and focuses it when the label is clicked, so the control is announced with the label text. Put radios in a wrapper element inside the field and it names the group.",
      ],
    },
  },
  render: (args) => html`
    <theme-field label=${args["label"]} for="email-input">
      <theme-input id="email-input" type="email" placeholder="you@example.com"></theme-input>
    </theme-field>
  `,
  args: { label: "Email address" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
