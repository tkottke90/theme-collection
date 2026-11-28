import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-bracket-rail.js";
import "./theme-heading.js";
import "./theme-link.js";
import "./theme-text.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Bracket Rail",
  parameters: {
    intro: {
      tag: "theme-bracket-rail",
      title: "Bracket Rail",
      description: [
        "An accent for a sidebar, nav group or callout: the orange rail down the left edge of the reference sheet, ending in a foot that rises to the right like a “√”. Bar width, arm width, lean and rise are measured from the source.",
        "The rail has an ink outline because the sampled orange is only 2.1:1 against the page; the outline gives its edge 9.5:1. Content sits to its right, and the rail itself is hidden from assistive technology.",
      ],
    },
  },
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
