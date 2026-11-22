import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./theme-journal-book.js";
import "./theme-journal-page.js";
import "./theme-ribbon.js";
import "./theme-progress.js";
import "./theme-quest-card.js";
import "./theme-divider.js";
import type { JournalTab } from "./theme-journal-book.js";

const TABS: JournalTab[] = [
  { id: "quests", label: "Quests", color: "red", icon: "quest" },
  { id: "places", label: "Places", color: "blue", icon: "pin" },
  { id: "people", label: "People", color: "tan", icon: "person" },
  { id: "creatures", label: "Creatures", color: "green", icon: "paw" },
  { id: "notes", label: "Notes", color: "purple", icon: "feather" },
  { id: "collection", label: "Collection", color: "orange", icon: "bag" },
];

// The tabs stick out ~92px to the left of the cover and the strap ~46px to
// the right (see this package's README) — a consumer leaves room for that
// in their own page padding, which this wrapper stands in for.
const meta: Meta = {
  title: "Theme/Field Journal WC/Journal Book",
  render: () => html`
    <div style="padding: 8px 60px 90px 108px;">
      <theme-journal-book .tabs=${TABS} selected="quests">
        <theme-journal-page slot="left" side="left">
          <h1
            style="font-family: var(--font-title); font-weight: 400; font-size: 40px; letter-spacing: .03em; text-align: center; margin: 0;"
          >
            Field Journal
          </h1>
          <theme-divider></theme-divider>
          <p
            style="font-family: var(--font-title); font-size: 16px; text-align: center; color: var(--color-text-muted); margin: 2px 0 18px;"
          >
            The Lakeside Region
          </p>
        </theme-journal-page>
        <theme-journal-page slot="right" side="right">
          <theme-ribbon>Active Quests</theme-ribbon>
          <div style="margin-bottom: 18px;">
            <theme-progress label="Overall progress" value="42"></theme-progress>
          </div>
          <div style="display: grid; gap: 14px;">
            <theme-quest-card
              heading="The Lost Parcel"
              location="Lakeside Village"
              description="A villager's parcel went missing on its way to the far dock. Find it and return it to its owner."
              color="red"
              icon="parcel"
              favorite
              .tasks=${[{ label: "Find the parcel", count: "0/1" }]}
            ></theme-quest-card>
            <theme-quest-card
              heading="A Light in the Woods"
              location="Whisperwood"
              description="Strange lights have been seen in the forest at night. Investigate and discover the truth."
              color="blue"
              icon="lantern"
              favorite
              .tasks=${[
                { label: "Talk to the ranger", done: true },
                { label: "Investigate the lights", count: "0/1" },
              ]}
            ></theme-quest-card>
          </div>
        </theme-journal-page>
      </theme-journal-book>
    </div>
  `,
};
export default meta;

type Story = StoryObj;

export const Default: Story = {};
