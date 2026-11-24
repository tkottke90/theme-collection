import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-input.js";

const meta: Meta = {
  title: "Theme/Starter WC/Input",
  parameters: {
    intro: {
      tag: "theme-input",
      title: "Input",
      description: [
        "A native input in a form-associated host: it submits under its name, resets with its form, follows a disabled fieldset and fires change from the element. Text types get a neutral border with a brand focus ring; checkbox and radio stay native, tinted with the brand accent colour.",
        "Copying this starter? Keep the form behaviour (it comes from the shared FormControlElement base) and describe how your theme draws the field, its focus state and the checkbox and radio marks.",
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
