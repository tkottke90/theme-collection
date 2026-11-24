import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-text.js";

const meta: Meta = {
  title: "Theme/Starter WC/Text",
  parameters: {
    intro: {
      tag: "theme-text",
      title: "Text",
      description: [
        "Body copy and captions in the theme's sans face. Body text is neutral-900; captions are smaller and neutral-500, for metadata and eyebrows.",
        "Copying this starter? Describe your theme's body face and inks, and which surfaces each one is cleared to sit on.",
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
