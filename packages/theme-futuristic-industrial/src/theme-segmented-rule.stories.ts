import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-segmented-rule.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Segmented Rule",
  render: () => html`<theme-segmented-rule></theme-segmented-rule>`,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display:grid;gap:20px">
      <theme-segmented-rule size="6" segments="3"></theme-segmented-rule>
      <theme-segmented-rule size="15"></theme-segmented-rule>
      <div style="height:140px">
        <theme-segmented-rule orientation="vertical" size="10" segments="4"></theme-segmented-rule>
      </div>
    </div>
  `,
};
