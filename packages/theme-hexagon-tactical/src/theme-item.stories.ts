import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-container.js";
import "./theme-item.js";

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Item",
  parameters: {
    intro: {
      tag: "theme-item",
      title: "Item",
      description: [
        "A plain row for Container: body text in the light text colour over a 1px border-lo rule, with no rule after the last row, so a list reads as rows etched into the panel. It renders as an li or a div to match its container.",
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
