import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-button.js";

const meta: Meta = {
  title: "Theme/Pixel Quest/Button",
  parameters: {
    intro: {
      tag: "theme-button",
      title: "Button",
      description: [
        "The primary button is the theme's badge: three nested pixel-stepped layers, a near-black outer edge, a gold ring and a dark forest-green fill with cream bold slab-serif (Courier Prime) text. It's the same plate the banner headings use, shrunk to a button.",
        "Secondary keeps the dark outline but drops the fill, so its green text sits straight on the parchment. Ghost removes the frame entirely. Disabled greys the badge out to parchment and muted ink, and hover only brightens the fill slightly, as a sprite would.",
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
