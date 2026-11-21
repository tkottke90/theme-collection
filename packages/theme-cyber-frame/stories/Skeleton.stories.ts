import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Cyber Frame/Skeleton",
};
export default meta;

type Story = StoryObj;

export const Heading: Story = {
  render: () => `<div class="theme-skeleton-heading"></div>`,
};

export const Text: Story = {
  render: () => `
    <div class="theme-skeleton-text"></div>
    <div class="theme-skeleton-text"></div>
    <div class="theme-skeleton-text" style="width: 80%;"></div>
  `,
};
