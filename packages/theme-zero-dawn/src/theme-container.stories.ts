import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-container.js";
import "./theme-item.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Container",
  parameters: {
    intro: {
      tag: "theme-container",
      title: "Container",
      description: [
        "The container is the card's shaded counterpart: a steel plate built on the same geometry, with the same faceted rim, but no seam notch, so it recedes behind the content it groups. Its face slopes from steel at the lit corner down into the core colour.",
        "That slope was limited by contrast, not taste. The light end is held at the exact steel tone where muted text just clears AA, and every text colour only gains contrast toward the dark end. Slotted content switches to light inks automatically.",
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
