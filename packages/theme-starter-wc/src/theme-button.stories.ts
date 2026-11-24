import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-button.js";

const meta: Meta = {
  title: "Theme/Starter WC/Button",
  parameters: {
    intro: {
      tag: "theme-button",
      title: "Button",
      description: [
        "The theme's action button. Primary is a solid brand-500 fill with white text, secondary is a brand outline, and ghost is text only; all three share the theme radius and dim to neutral when disabled.",
        "Copying this starter? Describe what makes your button belong to the theme (shape, fill, edge, hover and pressed states) and when to reach for each variant.",
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
