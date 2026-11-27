import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Card",
  parameters: {
    intro: {
      tag: ".theme-card",
      title: "Card",
      description: [
        "A raised panel: the surface colour on the near-black page, a 1px border and generous padding, with a title and a muted body. It is the container for one metric, node or alert.",
        "Depth comes from the surface step and the border, not from shadows. The only glow in the theme belongs to the critical button.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div class="theme-card">
      <h2 class="theme-card__title">Inbound Traffic</h2>
      <p class="theme-card__body">Node E &middot; 10.23.84.44</p>
      <button class="theme-button theme-button--glow">View details</button>
    </div>
  `,
};
