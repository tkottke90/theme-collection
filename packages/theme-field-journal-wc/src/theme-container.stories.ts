import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-container.js";
import "./theme-item.js";

const meta: Meta = {
  title: "Theme/Field Journal WC/Container",
  parameters: {
    intro: {
      tag: "theme-container",
      title: "Container",
      description: [
        "A grainy cream panel with a tan border that renders as a div, ul or ol through its as property, so a list keeps its native semantics.",
        "Pair it with theme-item for list children.",
      ],
    },
  },
  render: (args) => html`
    <theme-container as=${args["as"]}>
      <theme-item as=${args["as"] === "div" ? "div" : "li"}>First item</theme-item>
      <theme-item as=${args["as"] === "div" ? "div" : "li"}>Second item</theme-item>
    </theme-container>
  `,
  args: { as: "div" },
};
export default meta;

type Story = StoryObj;

export const AsDiv: Story = { args: { as: "div" } };
export const AsOrderedList: Story = { args: { as: "ol" } };
export const AsUnorderedList: Story = { args: { as: "ul" } };
