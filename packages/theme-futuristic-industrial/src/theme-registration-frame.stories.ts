import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-registration-frame.js";
import "./theme-heading.js";
import "./theme-text.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Registration Frame",
  render: () => html`
    <theme-registration-frame>
      <theme-heading level="4">Target lock</theme-heading>
      <theme-text>Contact 07 holding at 1,200 m, bearing 042.</theme-text>
    </theme-registration-frame>
  `,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

/** Framing media: a placeholder block stands in for an image. */
export const AroundMedia: Story = {
  render: () => html`
    <theme-registration-frame style="width:260px">
      <div
        style="aspect-ratio:4/3;background:repeating-linear-gradient(45deg,#dde1e8 0 8px,#eff2f7 8px 16px)"
      ></div>
    </theme-registration-frame>
  `,
};
