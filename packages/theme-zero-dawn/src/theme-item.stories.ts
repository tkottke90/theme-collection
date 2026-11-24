import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-container.js";
import "./theme-item.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Item",
  parameters: {
    intro: {
      tag: "theme-item",
      title: "Item",
      description: [
        "List rows borrow from beadwork rather than bullets: each row leads with a small painted diamond, and rows are divided by a thin seam line, the way plates meet on a machine. The last row drops its seam so a list ends cleanly against its container.",
        "The bead takes its colour from the surface it sits on, amber on steel and tribal red on a light card, so a list never needs restyling when it moves between them.",
      ],
    },
  },
  render: () => html`
    <theme-container as="ul">
      <theme-item>First item</theme-item>
      <theme-item>Second item</theme-item>
      <theme-item>Third item</theme-item>
    </theme-container>
  `,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
