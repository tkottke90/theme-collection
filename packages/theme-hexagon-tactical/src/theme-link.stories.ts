import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-link.js";

const meta: Meta = {
  title: "Theme/Hexagon Tactical WC/Link",
  parameters: {
    intro: {
      tag: "theme-link",
      title: "Link",
      description: [
        "Lime brand-500 text with a 2px underline offset 2px, brightening to brand-400 on hover. Keyboard focus draws the theme's 2px lime outline.",
      ],
    },
  },
  render: (args) => html`<theme-link href=${args["href"]}>${args["content"]}</theme-link>`,
  args: { href: "https://example.com", content: "Visit example.com" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
