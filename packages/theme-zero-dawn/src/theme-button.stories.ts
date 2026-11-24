import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-button.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Button",
  parameters: {
    intro: {
      tag: "theme-button",
      title: "Button",
      description: [
        "Buttons are small machine plates. Only the top-left and bottom-right corners are cut, the same diagonal the cards use, and primary and secondary buttons carry the faceted bevel: each edge is a flat facet shaded by how squarely it faces a light from the top-left. Under them sits a hard, unblurred drop shadow in the deep core colour.",
        "Pressing is physical. The plate and its label travel exactly the drop shadow's distance, 3px down and right, so the button lands on its own shadow and sits flush, and the face darkens a step. It snaps in and eases back out. Ghost buttons have no plate to sink, so they nudge 1px. Focus traces the cut outline in machine cyan rather than drawing a rectangle around it.",
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
