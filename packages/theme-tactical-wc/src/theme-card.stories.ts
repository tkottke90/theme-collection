import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-card.js";

const meta: Meta = {
  title: "Theme/Tactical WC/Card",
  render: (args) => html` <theme-card heading=${args["heading"]}>${args["body"]}</theme-card> `,
  args: {
    heading: "Card title",
    body: "Body copy rendered inside the default slot.",
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

/**
 * Shadow DOM means a `data-theme` attribute only takes effect when set
 * directly on the `theme-*` element itself (see this package's README) — so
 * this story demonstrates the override by rendering `<theme-card
 * data-theme="light">` directly, rather than toggling a page-level setting.
 */
export const Light: Story = {
  render: (args) =>
    html`<theme-card data-theme="light" heading=${args["heading"]}>${args["body"]}</theme-card>`,
};
