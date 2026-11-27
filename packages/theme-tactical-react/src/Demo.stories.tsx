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
  ThemeGauge,
  ThemeHeading,
  ThemeInput,
  ThemeItem,
  ThemeLink,
  ThemeProgress,
  ThemeSelect,
  ThemeSkeletonHeading,
  ThemeSkeletonText,
  ThemeStat,
  ThemeText,
  ThemeTextarea,
  ThemeViewfinder,
} from "./index.js";

/**
 * A full page composed only from this package's components: a mission
 * dashboard with telemetry panels, a working comms form and a few
 * supporting blocks. It mirrors the Web Components demo so the two
 * packages' screenshots read as one theme.
 */

const SYSTEMS = [
  { label: "Signal", value: 65 },
  { label: "Shields", value: 88 },
  { label: "Fuel", value: 31 },
];

const SECTION: JSX.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
  marginTop: "2.5rem",
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
  fontFamily: "var(--font-sans)",
  color: "var(--color-text)",
};

function CommsForm() {
  const [sent, setSent] = useState<string | null>(null);

  function onSubmit(event: Event) {
    event.preventDefault();
    const entries = [...new FormData(event.currentTarget as HTMLFormElement)].map(
      ([key, value]) => `${key}=${String(value)}`,
    );
    setSent(entries.length ? entries.join(", ") : "Empty form.");
  }

  return (
    <form onSubmit={onSubmit} onReset={() => setSent(null)} style={STACK}>
      <ThemeField label="Callsign">
        <ThemeInput name="callsign" placeholder="Raven 2-1" />
      </ThemeField>
      <ThemeField label="Contact email">
        <ThemeInput name="email" type="email" placeholder="raven@example.com" />
      </ThemeField>
      <ThemeField label="Channel">
        <ThemeSelect name="channel" defaultValue="command">
          <option value="command">Command</option>
          <option value="logistics">Logistics</option>
          <option value="medical">Medical</option>
        </ThemeSelect>
      </ThemeField>
      <ThemeField label="Message">
        <ThemeTextarea name="message" rows={3} placeholder="Report in…" />
      </ThemeField>
      <ThemeField label="Priority">
        <div style={{ display: "flex", gap: "1.25rem" }}>
          {["Routine", "Urgent"].map((priority) => (
            <label key={priority} style={INLINE_LABEL}>
              <ThemeInput
                type="radio"
                name="priority"
                value={priority.toLowerCase()}
                defaultChecked={priority === "Routine"}
              />
              {priority}
            </label>
          ))}
        </div>
      </ThemeField>
      <label style={INLINE_LABEL}>
        <ThemeInput type="checkbox" name="ack" value="yes" />
        Request acknowledgement
      </label>
      <div style={ROW}>
        <ThemeButton type="submit" label="Transmit" />
        <ThemeButton type="reset" variant="secondary" label="Clear" />
        <ThemeButton variant="ghost" label="Archive" disabled />
      </div>
      <ThemeText variant="caption">
        {sent ? `Transmitted: ${sent}` : "Nothing transmitted yet."}
      </ThemeText>
    </form>
  );
}

function DemoPage() {
  return (
    <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
      <header style={{ ...STACK, maxWidth: "40rem" }}>
        <ThemeText variant="caption">Tactical theme · Preact</ThemeText>
        <ThemeHeading level={1}>Mission control</ThemeHeading>
        <ThemeText>
          Telemetry, comms and crew status in one HUD. Every panel here is a component from this
          package, styled only from the tactical tokens.
        </ThemeText>
        <div style={ROW}>
          <ThemeButton label="Engage" />
          <ThemeButton variant="secondary" label="Hold" />
          <ThemeButton variant="ghost" label="Abort" />
        </div>
      </header>

      <section style={SECTION}>
        <ThemeHeading level={2}>Telemetry</ThemeHeading>
        <div style={grid("16rem")}>
          <ThemeCard heading="System status">
            <ThemeStat label="Uptime" value="1565" unit="h" />
          </ThemeCard>
          <ThemeCard heading="Systems">
            <div style={STACK}>
              {SYSTEMS.map((system) => (
                <ThemeProgress key={system.label} label={system.label} value={system.value} />
              ))}
            </div>
          </ThemeCard>
          <ThemeCard heading="Reactor">
            <ThemeGauge label="Power" value={72} />
          </ThemeCard>
        </div>
        <ThemeViewfinder heading="Target lock">
          <ThemeText>Locked on contact 07, bearing 214, range 3.2 km.</ThemeText>
        </ThemeViewfinder>
      </section>

      <section style={SECTION}>
        <ThemeHeading level={2}>Comms</ThemeHeading>
        <div style={grid("20rem")}>
          <ThemeContainer>
            <CommsForm />
          </ThemeContainer>

          <div style={STACK}>
            <ThemeBlockquote type="warning">
              Solar activity is rising. Expect intermittent signal loss.
            </ThemeBlockquote>
            <ThemeContainer as="ul">
              <ThemeItem>Run pre-flight checks</ThemeItem>
              <ThemeItem>Confirm crew roster</ThemeItem>
              <ThemeItem>Open the comms channel</ThemeItem>
            </ThemeContainer>
            <ThemeDetail summary="How is signal strength measured?">
              <ThemeText>
                Relative to the last handshake with the relay. See the{" "}
                <ThemeLink href="#">field manual</ThemeLink> for the full table.
              </ThemeText>
            </ThemeDetail>
            <ThemeContainer>
              <ThemeSkeletonHeading width="50%" />
              <ThemeSkeletonText />
              <ThemeSkeletonText width="80%" />
            </ThemeContainer>
          </div>
        </div>
      </section>
    </div>
  );
}

const meta: Meta = {
  title: "Theme/Tactical React/Demo",
  parameters: { layout: "fullscreen", intro: null },
};
export default meta;

export const Overview: StoryObj = { render: () => <DemoPage /> };
