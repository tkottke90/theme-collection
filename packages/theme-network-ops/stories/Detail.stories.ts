import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Detail",
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <details class="theme-details" open>
      <summary>Nginx &middot; 10.23.43.324</summary>
      <p class="theme-details__body">Inbound traffic node A. No active alerts.</p>
    </details>
  `,
};
