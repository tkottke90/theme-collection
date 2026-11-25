import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-link.js";

const meta: Meta = {
  title: "Theme/Field Journal WC/Link",
  parameters: {
    intro: {
      tag: "theme-link",
      title: "Link",
      description: [
        "An inline link in the brand red with a hairline underline, darkening on hover.",
        "It renders a real anchor, so open-in-new-tab and copy-link work.",
      ],
    },
  },
  render: (args) => html`<theme-link href=${args["href"]}>${args["content"]}</theme-link>`,
  args: { href: "https://example.com", content: "Visit example.com" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
