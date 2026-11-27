import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Forest Isle/Button",
  parameters: {
    intro: {
      tag: ".theme-button",
      title: "Button",
      description: [
        "A fully rounded pill in the sage brand colour with parchment ink, like a painted wooden token. The secondary variant is an outlined pill and the ghost variant is text only; both pick up a pale sage wash on hover.",
        "Hover deepens the primary to the darkest forest green, keyboard focus draws a 2px sage outline offset from the edge, and :disabled drops to flat neutral sand with a not-allowed cursor.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Primary: Story = {
  render: () => `<button class="theme-button">Click me</button>`,
};

export const Secondary: Story = {
  render: () => `<button class="theme-button theme-button--secondary">Click me</button>`,
};

export const Ghost: Story = {
  render: () => `<button class="theme-button theme-button--ghost">Click me</button>`,
};

export const Disabled: Story = {
  render: () => `<button class="theme-button" disabled>Click me</button>`,
};
