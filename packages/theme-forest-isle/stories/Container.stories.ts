import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Forest Isle/Container",
  parameters: {
    intro: {
      tag: ".theme-container",
      title: "Container",
      description: [
        "A vertical stack that spaces its children 0.75rem apart. Use it on a div, ul or ol to lay out items without margins on the items themselves.",
        "A ul or div shows no markers, but an ol keeps its numbers, set in the muted ink in the gap left of the items.",
      ],
    },
  },
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
