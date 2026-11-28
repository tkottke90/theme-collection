import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-segmented-rule.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Segmented Rule",
  parameters: {
    intro: {
      tag: "theme-segmented-rule",
      title: "Segmented Rule",
      description: [
        "A divider from the top of the sheet: two equal orange bars with a run of short slots between them. Slot width and spacing are measured from the source and scale with size.",
        "Horizontal or vertical. Assistive technology treats it as a separator.",
      ],
    },
  },
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
