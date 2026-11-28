import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Starter CSS/Skeleton",
  parameters: {
    intro: {
      tag: ".theme-skeleton-heading, .theme-skeleton-text",
      title: "Skeleton",
      description: [
        "Loading placeholders in two sizes: theme-skeleton-heading for a title bar and theme-skeleton-text for lines of copy. A soft shimmer moves across them, and stops under prefers-reduced-motion.",
        "When you copy the starter, describe the placeholder's shape and motion in your theme, and what readers see when motion is reduced.",
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
