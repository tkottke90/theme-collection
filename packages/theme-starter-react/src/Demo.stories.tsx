import type { Meta, StoryObj } from "@storybook/preact";
import type { JSX } from "preact";
import { useState } from "preact/hooks";
import {
  ThemeBlockquote,
  ThemeButton,
  ThemeCard,
  ThemeContainer,
  ThemeDetail,
  ThemeField,
  ThemeHeading,
  ThemeInput,
  ThemeItem,
  ThemeLink,
  ThemeSelect,
  ThemeSkeletonHeading,
  ThemeSkeletonText,
  ThemeText,
  ThemeTextarea,
} from "./index.js";

/**
 * A full page composed only from this package's components. When copying the
 * starter, rewrite it as a page in your theme's world, keep it to this
 * package's components, and keep a working form in it.
 */

const SECTION: JSX.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
  marginTop: "3rem",
};
const grid = (min: string): JSX.CSSProperties => ({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fit, minmax(${min}, 1fr))`,
  gap: "1.5rem",
  alignItems: "start",
});
const STACK: JSX.CSSProperties = { display: "flex", flexDirection: "column", gap: "1rem" };
const ROW: JSX.CSSProperties = { display: "flex", flexWrap: "wrap", gap: "0.75rem" };
const INLINE_LABEL: JSX.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
};

const PLANTS = [
  {
    name: "Window fern",
    body: "Bright, indirect light and evenly damp soil. Mist it on dry days.",
  },
  {
    name: "Desk cactus",
    body: "Full sun and very little water. Let the soil dry out completely between drinks.",
  },
  {
    name: "Trailing ivy",
    body: "Happy almost anywhere. Trim the runners back in spring to keep it bushy.",
  },
];

function CareLogForm() {
  const [saved, setSaved] = useState<string | null>(null);

  function onSubmit(event: Event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);
    const parts = [
      data.get("plant") || "Unnamed plant",
      data.get("task"),
      data.get("amount") ? `amount ${data.get("amount")}` : null,
      data.get("fed") ? "fed" : null,
    ].filter(Boolean);
    setSaved(parts.join(", "));
  }

  return (
    <form
      onSubmit={onSubmit}
      onReset={() => setSaved(null)}
      style={{ ...STACK, marginTop: "1rem" }}
    >
      <ThemeField label="Plant">
        <ThemeInput name="plant" placeholder="e.g. Window fern" required />
      </ThemeField>
      <ThemeField label="Task">
        <ThemeSelect name="task" defaultValue="watered">
          <option value="watered">Watered</option>
          <option value="repotted">Repotted</option>
          <option value="pruned">Pruned</option>
        </ThemeSelect>
      </ThemeField>
      <ThemeField label="Amount">
        <div style={ROW}>
          {["Light", "Normal", "Soak"].map((amount) => (
            <label key={amount} style={INLINE_LABEL}>
              <ThemeInput
                type="radio"
                name="amount"
                value={amount.toLowerCase()}
                defaultChecked={amount === "Normal"}
              />
              {amount}
            </label>
          ))}
        </div>
      </ThemeField>
      <ThemeField label="Notes">
        <ThemeTextarea name="notes" rows={3} placeholder="New leaves? Yellowing?" />
      </ThemeField>
      <label style={INLINE_LABEL}>
        <ThemeInput type="checkbox" name="fed" value="yes" />
        Added plant food
      </label>
      <div style={ROW}>
        <ThemeButton type="submit" label="Save entry" />
        <ThemeButton type="reset" variant="secondary" label="Clear" />
        <ThemeButton variant="ghost" label="Share" disabled />
      </div>
      {saved ? <ThemeBlockquote type="success">Saved: {saved}.</ThemeBlockquote> : null}
    </form>
  );
}

function DemoPage() {
  return (
    <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
      <header style={{ ...STACK, maxWidth: "40rem" }}>
        <ThemeText variant="caption">Starter theme · demo page</ThemeText>
        <ThemeHeading level={1}>Houseplant care log</ThemeHeading>
        <ThemeText>
          Keep track of what each plant needs and when it last got it. Every element on this page is
          a component from this package.
        </ThemeText>
        <div style={ROW}>
          <ThemeButton label="Add a plant" />
          <ThemeButton variant="secondary" label="Import list" />
          <ThemeButton variant="ghost" label="Skip" />
        </div>
      </header>

      <section style={SECTION}>
        <ThemeHeading level={2}>Your plants</ThemeHeading>
        <div style={grid("16rem")}>
          {PLANTS.map((plant) => (
            <ThemeCard key={plant.name} heading={plant.name}>
              <ThemeText>{plant.body}</ThemeText>
            </ThemeCard>
          ))}
        </div>
      </section>

      <section style={SECTION}>
        <ThemeHeading level={2}>Log care</ThemeHeading>
        <div style={grid("20rem")}>
          <ThemeCard heading="New entry">
            <CareLogForm />
          </ThemeCard>
          <div style={STACK}>
            <ThemeHeading level={3}>This week</ThemeHeading>
            <ThemeContainer as="ul">
              <ThemeItem>Water the fern on Monday and Thursday</ThemeItem>
              <ThemeItem>Turn the cactus towards the window</ThemeItem>
              <ThemeItem>Trim the ivy runners</ThemeItem>
            </ThemeContainer>
            <ThemeDetail summary="How often should I water?">
              <ThemeText>
                Check the top few centimetres of soil first, and{" "}
                <ThemeLink href="#">read the watering guide</ThemeLink> before changing a routine.
              </ThemeText>
            </ThemeDetail>
          </div>
        </div>
      </section>

      <section style={SECTION}>
        <ThemeHeading level={2}>Reminders</ThemeHeading>
        <div style={grid("18rem")}>
          <ThemeBlockquote type="warning">The fern&rsquo;s soil is drying out.</ThemeBlockquote>
          <ThemeBlockquote type="tip">Rainwater is gentler than tap water.</ThemeBlockquote>
          <ThemeBlockquote type="info">Days are getting shorter: water less.</ThemeBlockquote>
          <ThemeBlockquote type="quote">
            &ldquo;Overwatering kills more plants than neglect.&rdquo;
          </ThemeBlockquote>
        </div>
      </section>

      <section style={SECTION}>
        <ThemeHeading level={3}>Loading history</ThemeHeading>
        <div style={{ maxWidth: "28rem" }}>
          <ThemeSkeletonHeading width="50%" />
          <ThemeSkeletonText />
          <ThemeSkeletonText width="85%" />
          <ThemeSkeletonText width="60%" />
        </div>
      </section>
    </div>
  );
}

const meta: Meta = {
  title: "Theme/Starter React/Demo",
  parameters: { layout: "fullscreen", intro: null },
};
export default meta;

export const CareLog: StoryObj = { render: () => <DemoPage /> };
