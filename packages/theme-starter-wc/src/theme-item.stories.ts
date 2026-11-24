import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-container.js";
import "./theme-item.js";

const meta: Meta = {
  title: "Theme/Starter WC/Item",
  parameters: {
    intro: {
      tag: "theme-item",
      title: "Item",
      description: [
        "A row inside a container, as an li or a div. Rows are divided by a thin rule that's dropped after the last one.",
        "Copying this starter? Describe how your theme separates or marks list rows (rules, bullets, beads, spacing).",
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
