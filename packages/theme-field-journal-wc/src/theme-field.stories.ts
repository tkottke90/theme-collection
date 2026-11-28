import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-field.js";
import "./theme-input.js";

const meta: Meta = {
  title: "Theme/Field Journal WC/Field",
  parameters: {
    intro: {
      tag: "theme-field",
      title: "Field",
      description: [
        "A small-caps label stacked over the control slotted into it. The label is linked to the control for you: it names it for assistive technology and clicking it focuses the control.",
        "Set for to pick a control by id when the field holds more than one. Group radios in a wrapper element and the field names the group.",
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
