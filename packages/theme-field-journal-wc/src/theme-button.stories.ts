import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-button.js";

const meta: Meta = {
  title: "Theme/Field Journal WC/Button",
  parameters: {
    intro: {
      tag: "theme-button",
      title: "Button",
      description: [
        "A small leather tab: the primary variant is a solid brand-red fill with grain and cream label text, the same treatment as the book's navigation tabs, scaled to an inline control. Secondary is outlined, ghost is text only, and disabled turns pale and muted.",
        "An icon-only button needs accessible-label, because an aria-label on the host never reaches the inner button.",
      ],
    },
  },
  render: (args) =>
    html`<theme-button
      label=${args["label"]}
      variant=${args["variant"]}
      ?disabled=${args["disabled"]}
    ></theme-button>`,
  args: { label: "Click me", variant: "primary", disabled: false },
};
export default meta;

type Story = StoryObj;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", label: "Secondary" },
};

export const Ghost: Story = {
  args: { variant: "ghost", label: "Ghost" },
};

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled" },
};
