import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Skeleton",
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

export const CardLoading: Story = {
  render: () => `
    <div class="theme-card">
      <div class="theme-skeleton-heading"></div>
      <div class="theme-skeleton-text"></div>
      <div class="theme-skeleton-text"></div>
      <div class="theme-skeleton-text" style="width: 80%;"></div>
    </div>
  `,
};
