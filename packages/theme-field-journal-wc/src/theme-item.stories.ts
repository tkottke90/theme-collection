import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-container.js";
import "./theme-item.js";

const meta: Meta = {
  title: "Theme/Field Journal WC/Item",
  parameters: {
    intro: {
      tag: "theme-item",
      title: "Item",
      description: [
        "A generic child for a theme-container, rendered as an li by default. It carries the theme's row spacing and a tan rule under each row except the last.",
        "Set as to div to use it outside a list.",
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
