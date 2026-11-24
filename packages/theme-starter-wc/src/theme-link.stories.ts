import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-link.js";

const meta: Meta = {
  title: "Theme/Starter WC/Link",
  parameters: {
    intro: {
      tag: "theme-link",
      title: "Link",
      description: [
        "An inline link in brand-500 that darkens to brand-600 on hover and keeps its underline, so it's never told apart by colour alone.",
        "Copying this starter? Describe your link colour and its hover and focus states, and confirm it holds contrast on each surface it can sit on.",
      ],
    },
  },
  render: (args) => html`<theme-link href=${args["href"]}>${args["content"]}</theme-link>`,
  args: { href: "https://example.com", content: "Visit example.com" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
