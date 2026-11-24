import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-input.js";

const meta: Meta = {
  title: "Theme/Pixel Quest/Input",
  parameters: {
    intro: {
      tag: "theme-input",
      title: "Input",
      description: [
        "A text input sits in a thin 1px pixel frame with small stepped corners, filled with the slightly darker parchment (bg-alt) so it reads as a recessed well in the page. Focus draws a 2px forest-green outline.",
        "Checkbox and radio stay native, tinted forest green. The host is a form-associated element: it submits under name, resets with its form, follows a disabled fieldset, and takes its accessible name from aria-label or an associated label. Same-named radios uncheck each other, since each one lives in its own shadow root.",
      ],
    },
  },
  render: (args) =>
    html`<theme-input type=${args["type"]} placeholder=${args["placeholder"]}></theme-input>`,
  args: { placeholder: "" },
};
export default meta;

type Story = StoryObj;

export const Text: Story = { args: { type: "text", placeholder: "Text" } };
export const Email: Story = { args: { type: "email", placeholder: "Email" } };
export const Password: Story = { args: { type: "password", placeholder: "Password" } };
export const Number: Story = { args: { type: "number", placeholder: "Number" } };
export const Checkbox: Story = { args: { type: "checkbox" } };
export const Radio: Story = { args: { type: "radio" } };
