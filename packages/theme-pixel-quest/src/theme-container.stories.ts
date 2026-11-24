import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-container.js";
import "./theme-item.js";

const meta: Meta = {
  title: "Theme/Pixel Quest/Container",
  parameters: {
    intro: {
      tag: "theme-container",
      title: "Container",
      description: [
        "A container is the card's frame without the heading: the same pixel-stepped dark outline around parchment, holding a div, ol or ul (the as attribute) so list semantics survive inside the frame.",
        "Body text inside is Inter in the dark brown ink the whole theme uses for copy.",
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
