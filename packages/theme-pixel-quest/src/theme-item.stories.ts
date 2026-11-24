import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-container.js";
import "./theme-item.js";

const meta: Meta = {
  title: "Theme/Pixel Quest/Item",
  parameters: {
    intro: {
      tag: "theme-item",
      title: "Item",
      description: [
        "A list row in Inter, separated from the next by a 1px olive rule (the theme's border colour). The last row drops its rule so a framed list doesn't double up on the container's outline. Inside a numbered or bulleted container, the row's marker is bold Courier Prime in muted brown.",
        "It renders an li by default, or a div (the as attribute) inside a non-list container.",
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
