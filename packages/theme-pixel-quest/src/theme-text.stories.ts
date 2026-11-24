import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-text.js";

const meta: Meta = {
  title: "Theme/Pixel Quest/Text",
  parameters: {
    intro: {
      tag: "theme-text",
      title: "Text",
      description: [
        "Body copy is Inter in the theme's dark brown ink on parchment. The caption variant is a smaller (13px) muted brown, for secondary notes and eyebrows.",
      ],
    },
  },
  render: (args) => html`<theme-text variant=${args["variant"]}>${args["content"]}</theme-text>`,
  args: { content: "Body copy styled with theme tokens." },
};
export default meta;

type Story = StoryObj;

export const Body: Story = { args: { variant: "body" } };
export const Caption: Story = {
  args: { variant: "caption", content: "Caption copy styled with theme tokens." },
};
