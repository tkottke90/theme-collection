import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-container.js";
import "./theme-item.js";

const meta: Meta = {
  title: "Theme/Starter WC/Container",
  parameters: {
    intro: {
      tag: "theme-container",
      title: "Container",
      description: [
        "A neutral wrapper for grouping content, rendered as a div, ol or ul. It's quieter than a card: a neutral-50 panel with a neutral-100 edge, so it groups without competing.",
        "Copying this starter? Describe how your container differs from a card and what goes inside one.",
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
