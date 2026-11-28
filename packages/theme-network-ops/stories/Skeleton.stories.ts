import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Skeleton",
  parameters: {
    intro: {
      tag: ".theme-skeleton-heading, .theme-skeleton-text",
      title: "Skeleton",
      description: [
        "Placeholders for content that is loading: a heading bar at 60% width and text bars at full width, each with a slow indigo-tinted shimmer. Place them by hand to match the layout that will replace them.",
        "The shimmer stops under prefers-reduced-motion, leaving flat bars.",
      ],
    },
  },
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
