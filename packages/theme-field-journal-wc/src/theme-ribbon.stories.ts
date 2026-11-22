import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-ribbon.js";

const meta: Meta = {
  title: "Theme/Field Journal WC/Ribbon",
  render: (args) => html`<theme-ribbon color=${args["color"]}>${args["content"]}</theme-ribbon>`,
  args: { content: "Active Quests", color: "red" },
};
export default meta;

type Story = StoryObj;

export const Red: Story = { args: { color: "red", content: "Active Quests" } };
export const Blue: Story = { args: { color: "blue", content: "Completed Quests" } };
export const Tan: Story = { args: { color: "tan", content: "Notable People" } };
export const Green: Story = { args: { color: "green", content: "Creature Log" } };
export const Purple: Story = { args: { color: "purple", content: "Field Notes" } };
export const Orange: Story = { args: { color: "orange", content: "Collection" } };
