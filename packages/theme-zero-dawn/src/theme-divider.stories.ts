import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-divider.js";

const meta: Meta = {
  title: "Theme/Zero Dawn/Divider",
  parameters: {
    intro: {
      tag: "theme-divider",
      title: "Divider",
      description: [
        "Two woven bands from the art book's page edges: peaks, a sawtooth of alternating tall and short triangles, and trim, a zigzag hem threaded with amber beads. The pattern tiles, so the divider stretches to any width without measuring itself.",
        "The right half is a mirror of the left, so both bands meet symmetrically at the centre medallion: an ochre diamond holding a cyan core, a small instance of machine light inside tribal paint.",
      ],
    },
  },
  render: (args) => html`<theme-divider variant=${args["variant"]}></theme-divider>`,
  args: { variant: "peaks" },
  argTypes: { variant: { control: "select", options: ["peaks", "trim"] } },
};
export default meta;

type Story = StoryObj;

export const Peaks: Story = {};
export const Trim: Story = { args: { variant: "trim" } };
