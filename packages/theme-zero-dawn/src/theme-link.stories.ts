import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-link.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Link",
  parameters: {
    intro: {
      tag: "theme-link",
      title: "Link",
      description: [
        "Links are machine cyan with a fine underline that thickens on hover, and focus draws a cyan outline offset from the text.",
        "On a light card the bright cyan would fail contrast, so the link switches to a deep cyan token tuned for exactly that surface: it holds 4.6:1 even in the card's darkest corner.",
      ],
    },
  },
  render: (args) => html`<theme-link href=${args["href"]}>${args["content"]}</theme-link>`,
  args: { href: "https://example.com", content: "Visit example.com" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
