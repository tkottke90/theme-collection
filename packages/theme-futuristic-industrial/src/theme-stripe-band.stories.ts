import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-stripe-band.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Stripe Band",
  parameters: {
    intro: {
      tag: "theme-stripe-band",
      title: "Stripe Band",
      description: [
        "A band for a footer or the end of a section, from the sheet's bottom-right corner: a solid orange block that breaks into evenly spaced stripes, inside a thin ink outline with a slanted end.",
        "Stripe width, spacing and lean are measured from the source. solid sets how much of the band is solid block.",
      ],
    },
  },
  render: () => html`<theme-stripe-band></theme-stripe-band>`,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display:grid;gap:16px">
      <theme-stripe-band size="40"></theme-stripe-band>
      <theme-stripe-band size="16" solid="0.6"></theme-stripe-band>
      <theme-stripe-band size="24" solid="0"></theme-stripe-band>
    </div>
  `,
};
