import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-bracket-tag.js";
import "./theme-casing.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Bracket Tag",
  parameters: {
    intro: {
      tag: "theme-bracket-tag",
      title: "Bracket Tag",
      description: [
        "An inline code or ID label. square wraps the text in square brackets like the sheet's “[MT-22467R]”; flared sets it between a rule above and below that bend out at the ends, like “MOD:X5C”.",
        "The text is bold, uppercase monospace. The lines use the current text colour, so the tag reads on light and dark surfaces alike.",
      ],
    },
  },
  render: () => html`<theme-bracket-tag>MT-22467R</theme-bracket-tag>`,
};
export default meta;

type Story = StoryObj;

export const Square: Story = {};

export const Flared: Story = {
  render: () => html`<theme-bracket-tag variant="flared">Mod : X5C</theme-bracket-tag>`,
};

export const InlineAndOnDark: Story = {
  render: () => html`
    <p>
      Unit <theme-bracket-tag>MT-22467R</theme-bracket-tag> is fitted to bay
      <theme-bracket-tag variant="flared">04</theme-bracket-tag>.
    </p>
    <theme-casing>
      <theme-bracket-tag>OP-1182</theme-bracket-tag>
      <theme-bracket-tag variant="flared">Mod : X5C</theme-bracket-tag>
    </theme-casing>
  `,
};
