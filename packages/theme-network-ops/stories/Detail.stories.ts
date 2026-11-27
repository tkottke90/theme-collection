import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Detail",
  parameters: {
    intro: {
      tag: ".theme-details",
      title: "Detail",
      description: [
        "A native details element dressed as a panel: surface fill, 1px border, and a bold summary with an indigo plus that becomes a minus when open. The browser's own disclosure behaviour and keyboard handling are kept.",
        "The focus ring is drawn inside the panel, because the panel clips its overflow and an outside ring would be cut off.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <details class="theme-details" open>
      <summary>Nginx &middot; 10.23.43.324</summary>
      <p class="theme-details__body">Inbound traffic node A. No active alerts.</p>
    </details>
  `,
};
