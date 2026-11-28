import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-blockquote.js";
import "./theme-link.js";
import "./theme-text.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Blockquote",
  parameters: {
    intro: {
      tag: "theme-blockquote",
      title: "Blockquote",
      description: [
        "Ten callout types. Eight keep a light tint of their status colour, a 4px rule down the left and the label in the status colour.",
        "Warning and danger use the reference sheet's CAUTION and BIOHAZARD tags instead: a solid plate (caution yellow or deep red), an ink outline separated from it by a hairline of the page, and the label in its own strip. Text and links slotted inside switch to colours that pass AA on each plate.",
      ],
    },
  },
  render: (args) =>
    html`<theme-blockquote type=${args["type"]}>${args["content"]}</theme-blockquote>`,
  args: { content: "A blockquote styled with theme tokens." },
};
export default meta;

type Story = StoryObj;

export const Info: Story = { args: { type: "info" } };
export const Tip: Story = { args: { type: "tip" } };
export const Question: Story = { args: { type: "question" } };
export const Success: Story = { args: { type: "success" } };
export const Warning: Story = { args: { type: "warning" } };
export const Failure: Story = { args: { type: "failure" } };
export const Danger: Story = { args: { type: "danger" } };
export const Bug: Story = { args: { type: "bug" } };
export const Example: Story = { args: { type: "example" } };
export const Quote: Story = { args: { type: "quote" } };

/** Slotted text and links switch to colors that pass on each tag's plate. */
export const TagsWithContent: Story = {
  render: () => html`
    <div style="display:grid;gap:16px">
      <theme-blockquote type="warning">
        <theme-text>Restrict unescorted access beyond Bay 4.</theme-text>
        <theme-text variant="caption"
          >Issued 04:12 · <theme-link href="#">directive</theme-link></theme-text
        >
      </theme-blockquote>
      <theme-blockquote type="danger">
        <theme-text>Containment breach protocol is armed.</theme-text>
        <theme-text variant="caption"
          >Override needs Level 3 · <theme-link href="#">protocol</theme-link></theme-text
        >
      </theme-blockquote>
    </div>
  `,
};
