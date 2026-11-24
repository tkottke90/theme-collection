import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-button.js";

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Button",
  parameters: {
    intro: {
      tag: "theme-button",
      title: "Button",
      description: [
        "A chunky physical key. Each variant sets a face colour that runs as a three-stop vertical gradient (lighter top, base, darker bottom) inside a 3px near-black void border, with an inset highlight along the top, an inset shade along the bottom and a hard 3px ledge underneath. Pressing drops the key 2px onto its ledge. Labels are bold, uppercase, tracked Chakra Petch.",
        "Primary is the lime brand face with dark brand-900 ink. Secondary is a dark surface face with a lime border and lime ink. Ghost is lime text alone and only picks up a raised-surface face on hover. Disabled flattens to surface-alt with muted ink and no ledge. Focus is a 2px lime outline offset 3px, the ring every interactive element in the theme shares.",
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
