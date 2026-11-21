import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Cyber Frame/Container",
};
export default meta;

type Story = StoryObj;

export const AsDiv: Story = {
  render: () => `
    <div class="theme-container">
      <div class="theme-item">First child</div>
      <div class="theme-item">Second child</div>
    </div>
  `,
};

export const AsOl: Story = {
  render: () => `
    <ol class="theme-container">
      <li class="theme-item">First step</li>
      <li class="theme-item">Second step</li>
    </ol>
  `,
};

export const AsUl: Story = {
  render: () => `
    <ul class="theme-container">
      <li class="theme-item">First item</li>
      <li class="theme-item">Second item</li>
    </ul>
  `,
};
