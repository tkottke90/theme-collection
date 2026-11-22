import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-link.js";

const meta: Meta = {
  title: "Theme/Field Journal WC/Link",
  render: (args) => html`<theme-link href=${args["href"]}>${args["content"]}</theme-link>`,
  args: { href: "https://example.com", content: "Visit example.com" },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
