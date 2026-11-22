import "./theme-quest-card.js";
import type { ThemeQuestCard, JournalTask } from "./theme-quest-card.js";

const TASKS: JournalTask[] = [
  { label: "Find Azure Cap", done: true },
  { label: "Find Dewbell", count: "0/1" },
];

describe("theme-quest-card", () => {
  it("renders the heading, location and description", async () => {
    const el = document.createElement("theme-quest-card") as ThemeQuestCard;
    el.heading = "Three Rare Mushrooms";
    el.location = "Misty Grove";
    el.description = "A travelling chef needs three rare mushrooms for a special dish.";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("h3")?.textContent).toBe("Three Rare Mushrooms");
    expect(el.shadowRoot?.textContent).toContain("Misty Grove");
    expect(el.shadowRoot?.textContent).toContain("A travelling chef needs three rare mushrooms");

    el.remove();
  });

  it("renders a checkmark for done tasks and the count for incomplete ones", async () => {
    const el = document.createElement("theme-quest-card") as ThemeQuestCard;
    el.tasks = TASKS;
    document.body.appendChild(el);
    await el.updateComplete;

    const items = el.shadowRoot?.querySelectorAll(".tasks li");
    expect(items?.length).toBe(2);
    expect(items?.[0]?.textContent).toContain("✓");
    expect(items?.[1]?.textContent).toContain("0/1");

    el.remove();
  });

  it("shows the favourite star only when favorite is true", async () => {
    const el = document.createElement("theme-quest-card") as ThemeQuestCard;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('[aria-label="Favourite"]')).toBeNull();

    el.favorite = true;
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('[aria-label="Favourite"]')).not.toBeNull();

    el.remove();
  });

  it("shows the Done tag when status is done", async () => {
    const el = document.createElement("theme-quest-card") as ThemeQuestCard;
    el.status = "done";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain("Done");

    el.remove();
  });
});
