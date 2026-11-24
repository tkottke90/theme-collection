import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Starter CSS/Button",
  parameters: {
    intro: {
      tag: ".theme-button",
      title: "Button",
      description: [
        "A rounded brand-colour button with secondary (outlined) and ghost (text-only) modifiers. Hover darkens a step, keyboard focus draws a brand-colour outline offset from the edge, and :disabled drops to neutral greys with a not-allowed cursor.",
        "When you copy the starter, describe your theme's button: its shape, how each variant differs, and what hover, press, focus and disabled look like and why.",
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
