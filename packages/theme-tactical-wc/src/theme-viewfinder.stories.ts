import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-viewfinder.js";

const meta: Meta = {
  title: "Theme/Tactical WC/Viewfinder",
  parameters: {
    intro: {
      tag: "theme-viewfinder",
      title: "Viewfinder",
      description: [
        "A content panel framed like a camera viewfinder: a tab-notch at the top and corner brackets in cyan, resizing with its content. An optional heading sits above the slotted content.",
      ],
    },
  },
  render: (args) => html`
    <theme-viewfinder heading=${args["heading"]}>${args["body"]}</theme-viewfinder>
  `,
  args: {
    heading: "Target lock",
    body: "Body copy rendered inside the default slot.",
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const NoHeading: Story = {
  args: { heading: "", body: "A viewfinder panel with no heading." },
};

/** See theme-card.stories.ts for why `data-theme` is set on the element itself. */
export const Light: Story = {
  render: (args) =>
    html`<theme-viewfinder data-theme="light" heading=${args["heading"]}
      >${args["body"]}</theme-viewfinder
    >`,
};
