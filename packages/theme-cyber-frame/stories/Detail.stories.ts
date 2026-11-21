import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Cyber Frame/Detail",
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <details class="theme-detail">
      <summary>Click to expand</summary>
      <p class="theme-text">Hidden content revealed once the detail is expanded.</p>
    </details>
  `,
};
