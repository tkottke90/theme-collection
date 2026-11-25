import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-container.js";
import "./theme-item.js";

const meta: Meta = {
  title: "Theme/Tactical WC/Container",
  parameters: {
    intro: {
      tag: "theme-container",
      title: "Container",
      description: [
        "A plain bordered surface: the alt-surface fill, a hairline border and the theme's small radius. Renders a div by default, or a ul/ol/section via the as attribute, for grouping items and forms.",
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
