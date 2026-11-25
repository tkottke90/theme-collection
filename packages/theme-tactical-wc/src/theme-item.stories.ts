import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-container.js";
import "./theme-item.js";

const meta: Meta = {
  title: "Theme/Tactical WC/Item",
  parameters: {
    intro: {
      tag: "theme-item",
      title: "Item",
      description: [
        "A list row with a hairline divider under it, drawn on every row except the last. Renders an li by default, or a div via the as attribute. Use it inside a container.",
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
