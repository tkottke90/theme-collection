import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-girder.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Girder",
  render: () => html`<theme-girder></theme-girder>`,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => html`
    <div style="display:grid;gap:16px">
      <theme-girder style="height:24px"></theme-girder>
      <theme-girder style="height:48px"></theme-girder>
      <theme-girder style="height:48px;width:180px"></theme-girder>
    </div>
  `,
};
