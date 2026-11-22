import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-quest-card.js";
import type { JournalTask } from "./theme-quest-card.js";

const meta: Meta = {
  title: "Theme/Field Journal WC/Quest Card",
  render: (args) => html`
    <div style="max-width: 460px;">
      <theme-quest-card
        heading=${args["heading"]}
        location=${args["location"]}
        description=${args["description"]}
        status=${args["status"]}
        ?favorite=${args["favorite"]}
        color=${args["color"]}
        icon=${args["icon"]}
        .tasks=${args["tasks"]}
      ></theme-quest-card>
    </div>
  `,
  args: {
    heading: "The Lost Parcel",
    location: "Lakeside Village",
    description:
      "A villager's parcel went missing on its way to the far dock. Find it and return it to its owner.",
    status: "active",
    favorite: true,
    color: "red",
    icon: "parcel",
    tasks: [{ label: "Find the parcel", count: "0/1" }] satisfies JournalTask[],
  },
};
export default meta;

type Story = StoryObj;

export const Active: Story = {};

export const WithMixedTasks: Story = {
  args: {
    heading: "Three Rare Mushrooms",
    location: "Misty Grove",
    description: "A travelling chef needs three rare mushrooms for a special dish.",
    color: "green",
    icon: "mushroom",
    favorite: false,
    tasks: [
      { label: "Find Azure Cap", done: true },
      { label: "Find Dewbell", count: "0/1" },
      { label: "Find Emberhead", count: "0/1" },
    ] satisfies JournalTask[],
  },
};

export const Done: Story = {
  args: {
    heading: "A Light in the Woods",
    location: "Whisperwood",
    description:
      "Strange lights have been seen in the forest at night. Investigate and discover the truth.",
    status: "done",
    color: "blue",
    icon: "lantern",
    favorite: false,
    tasks: [
      { label: "Talk to the ranger", done: true },
      { label: "Investigate the lights", done: true },
    ] satisfies JournalTask[],
  },
};
