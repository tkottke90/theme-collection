import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-bracket-rail.js";
import "./theme-heading.js";
import "./theme-link.js";
import "./theme-text.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Bracket Rail",
  render: () => html`
    <theme-bracket-rail>
      <theme-heading level="4">Decks</theme-heading>
      <p><theme-link href="#">Deck 1 — Command</theme-link></p>
      <p><theme-link href="#">Deck 2 — Habitation</theme-link></p>
      <p><theme-link href="#">Deck 3 — Engineering</theme-link></p>
      <theme-text variant="caption">Deck 4 sealed for maintenance.</theme-text>
    </theme-bracket-rail>
  `,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
