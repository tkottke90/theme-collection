import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Starter CSS/Item",
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `<div class="theme-item">A single themed item</div>`,
};
