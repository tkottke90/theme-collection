import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-text.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Text",
  parameters: {
    intro: {
      tag: "theme-text",
      title: "Text",
      description: [
        "Body copy is set in Crimson Pro, a book serif chosen to echo the art book's text pages; captions switch to the display face in small tracked capitals, so labels read as machine stencilling against the printed prose.",
        "Neither sets a fixed colour. Both read their ink from the surface they sit on, which is how the same text works on the dark page, a steel panel and a light card without extra attributes.",
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
