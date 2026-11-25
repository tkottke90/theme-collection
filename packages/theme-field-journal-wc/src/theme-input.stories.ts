import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-input.js";

const meta: Meta = {
  title: "Theme/Field Journal WC/Input",
  parameters: {
    intro: {
      tag: "theme-input",
      title: "Input",
      description: [
        "A parchment-coloured field with a thin tan border and the body serif face, in a host that behaves like a native input: it submits under name, resets with its form and follows a disabled fieldset.",
        "Text types, checkbox and radio are supported. Name it with aria-label or a label element; radios group by name.",
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
