import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-container.js";
import "./theme-item.js";

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Container",
  parameters: {
    intro: {
      tag: "theme-container",
      title: "Container",
      description: [
        "The same cut-corner panel frame as Card, without a title, for grouping content: a 3px grey border layer around a dark gradient fill, with a soft drop shadow.",
        "It renders as a div, ol or ul with list styling removed, so a list keeps its semantics inside the frame. Pair it with Item for rows.",
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
