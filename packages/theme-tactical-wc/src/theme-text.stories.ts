import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-text.js";

const meta: Meta = {
  title: "Theme/Tactical WC/Text",
  parameters: {
    intro: {
      tag: "theme-text",
      title: "Text",
      description: [
        "Body copy in the primary ink on the dark ground, with a muted caption variant for secondary information.",
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
