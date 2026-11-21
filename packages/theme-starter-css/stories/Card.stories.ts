import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Starter CSS/Card",
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div class="theme-card">
      <h2>Card title</h2>
      <p>Body copy styled with theme tokens.</p>
      <button class="theme-button">Action</button>
    </div>
  `,
};
