import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-field.js";
import "./theme-input.js";

const meta: Meta = {
  title: "Theme/Starter WC/Field",
  parameters: {
    intro: {
      tag: "theme-field",
      title: "Field",
      description: [
        "A field stacks a semibold label over its control. The label lives in the field's shadow root, where a for attribute can't reach a control slotted in from outside, so the field links them itself: it names the control with the label for screen readers, unless the control already has a name, and clicking the label focuses the control.",
        "Copying this starter? Keep that linking behaviour (it comes from the shared FieldElement base) and describe only how your label looks and sits relative to its control.",
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
