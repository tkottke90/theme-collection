import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-link.js";

const meta: Meta = {
  title: "Theme/Pixel Quest/Link",
  parameters: {
    intro: {
      tag: "theme-link",
      title: "Link",
      description: [
        "An underlined Inter link in the theme's forest green, darkening to the panel green on hover. It stays underlined at rest, because colour alone wouldn't separate it from dark brown body copy on parchment.",
      ],
    },
  },
  render: (args) => html`<theme-link href=${args["href"]}>${args["content"]}</theme-link>`,
  args: { href: "https://example.com", content: "Visit example.com" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
