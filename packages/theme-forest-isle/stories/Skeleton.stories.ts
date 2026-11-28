import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Forest Isle/Skeleton",
  parameters: {
    intro: {
      tag: ".theme-skeleton-heading, .theme-skeleton-text",
      title: "Skeleton",
      description: [
        "Placeholder bars for content that is loading, in two sand tones with a light shimmer that sweeps across. Use the heading bar for a title and stacked text bars for paragraphs.",
        "The shimmer is the only animation in the theme, and it stops when the user prefers reduced motion.",
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
