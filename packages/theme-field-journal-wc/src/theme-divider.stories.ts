import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-divider.js";

const meta: Meta = {
  title: "Theme/Field Journal WC/Divider",
  render: () => html`<theme-divider></theme-divider>`,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
