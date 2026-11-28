import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Container",
  parameters: {
    intro: {
      tag: ".theme-container",
      title: "Container",
      description: [
        "A vertical stack with a 0.75rem gap, for a group of items. It works on a div, ul or ol. A ul shows no bullets, but an ol keeps its numbers, in muted ink in the gap left of the items.",
        "Put theme-item children inside it. The container has no surface of its own, so it sits directly on the page or inside a card.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const AsDiv: Story = {
  render: () => `
    <div class="theme-container">
      <div class="theme-item">Nginx &middot; 10.23.43.324</div>
      <div class="theme-item">MySQL &middot; 10.23.54.32</div>
    </div>
  `,
};

export const AsOl: Story = {
  render: () => `
    <ol class="theme-container">
      <li class="theme-item">Acknowledge the alert on Node C</li>
      <li class="theme-item">Check failover status for Node B</li>
    </ol>
  `,
};

export const AsUl: Story = {
  render: () => `
    <ul class="theme-container">
      <li class="theme-item">Nginx &middot; 10.23.43.324 &middot; Healthy</li>
      <li class="theme-item">Couchbase &middot; 10.23.84.44 &middot; Degraded</li>
    </ul>
  `,
};
