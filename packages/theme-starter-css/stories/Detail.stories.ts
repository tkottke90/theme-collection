import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Starter CSS/Detail",
  parameters: {
    intro: {
      tag: ".theme-detail",
      title: "Detail",
      description: [
        "A native details element styled as a quiet neutral panel. The summary is bold and focusable, and the browser's own disclosure marker and keyboard behaviour are kept.",
        "When you copy the starter, describe how your theme shows something collapsible: the marker, the panel, and what changes when it opens.",
      ],
    },
  },
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
