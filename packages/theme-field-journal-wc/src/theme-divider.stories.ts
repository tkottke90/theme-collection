import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-divider.js";

const meta: Meta = {
  title: "Theme/Field Journal WC/Divider",
  parameters: {
    intro: {
      tag: "theme-divider",
      title: "Divider",
      description: [
        "Two thin lines with curls meeting a central diamond. It sits under page titles and between major sections, taking the place of a plain rule.",
        "It has no properties: it is decoration and is hidden from assistive technology.",
      ],
    },
  },
  render: () => html`<theme-divider></theme-divider>`,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
