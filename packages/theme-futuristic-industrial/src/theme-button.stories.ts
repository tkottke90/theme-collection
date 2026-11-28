import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-button.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Button",
  parameters: {
    intro: {
      tag: "theme-button",
      title: "Button",
      description: [
        "Primary is a solid orange plate with two corners cut, the theme's chamfer at button size. Its label is ink, because white on this orange is only 2.4:1. Secondary and ghost use the link colour, which switches to the brighter orange on dark surfaces.",
        'The button is a form control: type="submit" or "reset" acts on its form, it follows <fieldset disabled>, and an icon-only button is named by its aria-label.',
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
