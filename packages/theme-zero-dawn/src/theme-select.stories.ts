import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-select.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Select",
  parameters: {
    intro: {
      tag: "theme-select",
      title: "Select",
      description: [
        "The select shares the input's recessed socket and cyan focus glow, with the native arrow replaced by a cyan chevron in the theme's angular style.",
        "You write ordinary option elements inside it. They are mirrored into the internal select and kept in sync, because Chromium does not render options slotted into a shadow-DOM select. It submits with its form and resets to whichever option is marked selected.",
      ],
    },
  },
  render: () => html`
    <theme-select>
      <option value="one">One</option>
      <option value="two">Two</option>
      <option value="three">Three</option>
    </theme-select>
  `,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
