import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Item",
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `<div class="theme-item">Nginx &middot; 10.23.43.324</div>`,
};
