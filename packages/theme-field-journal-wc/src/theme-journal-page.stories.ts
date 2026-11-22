import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-journal-page.js";

const meta: Meta = {
  title: "Theme/Field Journal WC/Journal Page",
  render: (args) => html`
    <div style="max-width: 420px;">
      <theme-journal-page side=${args["side"]}>
        <h1
          style="font-family: var(--font-title); font-weight: 400; margin: 0 0 8px; text-align: center;"
        >
          Field Journal
        </h1>
        <p style="font-family: var(--font-sans); color: var(--color-text); margin: 0;">
          A parchment page: a stack of paper edges, grain and faint stains, a vignette toward the
          edges, and a gutter shadow toward the spine.
        </p>
      </theme-journal-page>
    </div>
  `,
  args: { side: "left" },
};
export default meta;

type Story = StoryObj;

export const Left: Story = { args: { side: "left" } };
export const Right: Story = { args: { side: "right" } };

/** A left/right spread, as the page would actually be used inside theme-journal-book. */
export const Spread: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr; max-width: 820px;">
      <theme-journal-page side="left">
        <h1
          style="font-family: var(--font-title); font-weight: 400; margin: 0; text-align: center;"
        >
          Field Journal
        </h1>
      </theme-journal-page>
      <theme-journal-page side="right">
        <p style="font-family: var(--font-sans); color: var(--color-text); margin: 0;">
          The right-hand page fans its stack and gutter shadow the other way.
        </p>
      </theme-journal-page>
    </div>
  `,
};
