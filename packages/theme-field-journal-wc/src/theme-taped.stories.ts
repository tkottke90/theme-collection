import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-taped.js";
import { renderInkFilter } from "./journal-defs-svg.js";

/** A tiny placeholder sketch with the hand-drawn wobble filter, standing in for a real illustration (see this package's README). */
const sketch = html`
  <svg viewBox="0 0 220 130" role="img" aria-label="Sketch of a lakeside hill">
    <defs>${renderInkFilter()}</defs>
    <g filter="url(#j-ink)">
      <rect width="220" height="130" fill="#dfe6da" />
      <path d="M0 62 C40 30 80 44 110 34 C150 22 180 40 220 30 V130 H0Z" fill="#a9b996" />
      <path d="M0 76 C50 60 100 72 140 62 C170 56 200 64 220 60 V130 H0Z" fill="#8ea57a" />
      <g fill="#6e8c52">
        <circle cx="20" cy="66" r="8" />
        <circle cx="32" cy="62" r="9" />
        <circle cx="196" cy="56" r="8" />
      </g>
    </g>
  </svg>
`;

const meta: Meta = {
  title: "Theme/Field Journal WC/Taped",
  parameters: {
    intro: {
      tag: "theme-taped",
      title: "Taped",
      description: [
        "A taped-in sketch or photo: a white photo border, tape strips across opposite corners, a slight tilt and a handwritten caption. The tilt is l, r or none.",
        "The slotted content fills the frame, so give it an image or any block that has its own size.",
      ],
    },
  },
  render: (args) => html`
    <div style="max-width: 240px;">
      <theme-taped tilt=${args["tilt"]} caption=${args["caption"]}>${sketch}</theme-taped>
    </div>
  `,
  args: { tilt: "l", caption: "Lakeside Bridge" },
};
export default meta;

type Story = StoryObj;

export const TiltLeft: Story = { args: { tilt: "l" } };
export const TiltRight: Story = { args: { tilt: "r" } };
export const NoTilt: Story = { args: { tilt: "none" } };
export const NoCaption: Story = { args: { caption: "" } };
