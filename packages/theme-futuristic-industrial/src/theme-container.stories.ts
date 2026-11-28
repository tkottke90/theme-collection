import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-container.js";
import "./theme-item.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Container",
  parameters: {
    intro: {
      tag: "theme-container",
      title: "Container",
      description: [
        "A generic wrapper (div, ol or ul) on a plainer plate than Card: one chamfered corner, no bolts and no stripe.",
        "In an ol, each row shows its number. In a ul, each row's hazard-stripe tab is its bullet.",
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
