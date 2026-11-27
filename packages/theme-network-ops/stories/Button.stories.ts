import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Button",
  parameters: {
    intro: {
      tag: ".theme-button",
      title: "Button",
      description: [
        "A coral, rounded button. Secondary is an outline in coral and ghost is coral text only; both gain a faint coral wash on hover. theme-button--glow adds a coral halo to mark the one critical action on a panel.",
        "Keyboard focus draws an indigo ring offset from the edge. Disabled drops to the raised surface colour with muted ink and a not-allowed cursor, and the outlined variant loses its coral border so it reads as off.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Primary: Story = {
  render: () => `<button class="theme-button">Acknowledge</button>`,
};

export const Secondary: Story = {
  render: () => `<button class="theme-button theme-button--secondary">Dismiss</button>`,
};

export const Ghost: Story = {
  render: () => `<button class="theme-button theme-button--ghost">View raw logs</button>`,
};

export const Disabled: Story = {
  render: () => `<button class="theme-button" disabled>Acknowledge</button>`,
};

export const Glow: Story = {
  render: () => `<button class="theme-button theme-button--glow">Critical alert</button>`,
};
