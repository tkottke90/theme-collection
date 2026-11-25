import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-button.js";

const meta: Meta = {
  title: "Theme/Tactical WC/Button",
  parameters: {
    intro: {
      tag: "theme-button",
      title: "Button",
      description: [
        'A form-associated button. Primary is a solid cyan plate with a glow; secondary is an outlined cyan label on the dark ground; ghost drops the outline. Labels are uppercase and tracked like HUD readouts. type="submit" and type="reset" act on the surrounding form, and aria-label names it for assistive tech.',
      ],
    },
  },
  render: (args) =>
    html`<theme-button
      label=${args["label"]}
      variant=${args["variant"]}
      ?disabled=${args["disabled"]}
    ></theme-button>`,
  args: { label: "Click me", variant: "primary", disabled: false },
};
export default meta;

type Story = StoryObj;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", label: "Secondary" },
};

export const Ghost: Story = {
  args: { variant: "ghost", label: "Ghost" },
};

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled" },
};
