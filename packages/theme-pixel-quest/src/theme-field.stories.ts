import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-field.js";
import "./theme-input.js";

const meta: Meta = {
  title: "Theme/Pixel Quest/Field",
  parameters: {
    intro: {
      tag: "theme-field",
      title: "Field",
      description: [
        "A field stacks a semibold, muted-brown Inter label over its control.",
        "The label lives in the field's shadow root, where a for attribute can't reach a control slotted in from outside, so the field links them itself: it names the control with the label for screen readers, unless the control already has a name, and clicking the label focuses the control, or toggles a checkbox. Wrapping a group of radios, it names the group instead, so each radio keeps its own label.",
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

export const RadioGroup: Story = {
  render: () => html`
    <theme-field label="Starting weapon">
      <div style="display: flex; gap: 1rem; align-items: center">
        <label style="display: inline-flex; gap: 0.4rem; align-items: center"
          ><theme-input type="radio" name="weapon" value="sword" checked></theme-input> Sword</label
        >
        <label style="display: inline-flex; gap: 0.4rem; align-items: center"
          ><theme-input type="radio" name="weapon" value="bow"></theme-input> Bow</label
        >
      </div>
    </theme-field>
  `,
};
