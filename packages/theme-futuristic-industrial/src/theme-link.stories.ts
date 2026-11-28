import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-link.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Link",
  parameters: {
    intro: {
      tag: "theme-link",
      title: "Link",
      description: [
        "Underlined text in a darker shade of the brand orange: 4.96:1 on the page, where the sampled orange is only 2.1:1.",
        "On a dark surface it switches to the sampled orange, which reads at 4.55:1 on charcoal.",
      ],
    },
  },
  render: (args) => html`<theme-link href=${args["href"]}>${args["content"]}</theme-link>`,
  args: { href: "https://example.com", content: "Visit example.com" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
