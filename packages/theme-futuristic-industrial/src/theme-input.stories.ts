import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-input.js";

const meta: Meta = {
  title: "Theme/Futuristic Industrial/Input",
  parameters: {
    intro: {
      tag: "theme-input",
      title: "Input",
      description: [
        "A native input inside a form control: it submits under its name, resets with its form and follows <fieldset disabled>.",
        "Square-cornered, with a grey edge, the page's light fill and an orange focus ring. Checkboxes and radios use the brand orange as their accent colour.",
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
