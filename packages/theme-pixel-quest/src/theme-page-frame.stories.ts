import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-page-frame.js";

const meta: Meta = {
  title: "Theme/Pixel Quest/Page Frame",
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <theme-page-frame>
      <p>
        The whole-page frame the source image's own poster uses — a straight dark border with a gold
        pinstripe.
      </p>
    </theme-page-frame>
  `,
};
