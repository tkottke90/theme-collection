import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-field.js";
import "./theme-input.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Field",
  parameters: {
    intro: {
      tag: "theme-field",
      title: "Field",
      description: [
        "A field stacks a label over its control. The label is set in the display face's tracked capitals and led by a small amber diamond, the same bead used on list items, so forms share the theme's beadwork.",
        "Like text, the label reads its ink and bead colour from the surrounding surface, so a field looks right on steel or on a light card.",
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
