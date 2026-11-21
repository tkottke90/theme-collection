import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Starter CSS",
};
export default meta;

type Story = StoryObj;

export const Card: Story = {
  render: () => `
    <div class="theme-card">
      <h2>Card title</h2>
      <p>Body copy styled with theme tokens.</p>
      <button class="theme-button">Action</button>
    </div>
  `,
};

export const Button: Story = {
  render: () => `<button class="theme-button">Click me</button>`,
};
