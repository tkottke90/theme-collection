import "./theme-journal-book.js";
import type { ThemeJournalBook, JournalTab } from "./theme-journal-book.js";

const TABS: JournalTab[] = [
  { id: "quests", label: "Quests", color: "red", icon: "quest" },
  { id: "places", label: "Places", color: "blue", icon: "pin" },
];

describe("theme-journal-book", () => {
  it("renders one tab button per entry", async () => {
    const el = document.createElement("theme-journal-book") as ThemeJournalBook;
    el.tabs = TABS;
    document.body.appendChild(el);
    await el.updateComplete;

    const buttons = el.shadowRoot?.querySelectorAll(".tab");
    expect(buttons?.length).toBe(2);
    expect(buttons?.[0]?.textContent?.trim()).toContain("Quests");

    el.remove();
  });

  it("marks the selected tab with aria-current", async () => {
    const el = document.createElement("theme-journal-book") as ThemeJournalBook;
    el.tabs = TABS;
    el.selected = "places";
    document.body.appendChild(el);
    await el.updateComplete;

    const buttons = el.shadowRoot?.querySelectorAll(".tab");
    expect(buttons?.[0]?.getAttribute("aria-current")).toBeNull();
    expect(buttons?.[1]?.getAttribute("aria-current")).toBe("page");

    el.remove();
  });

  it("selects a tab and emits journal-tab-change on click", async () => {
    const el = document.createElement("theme-journal-book") as ThemeJournalBook;
    el.tabs = TABS;
    document.body.appendChild(el);
    await el.updateComplete;

    const onChange = jest.fn();
    el.addEventListener("journal-tab-change", onChange);

    const secondTab = el.shadowRoot?.querySelectorAll(".tab")[1] as HTMLButtonElement;
    secondTab.click();
    await el.updateComplete;

    expect(el.selected).toBe("places");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect((onChange.mock.calls[0]?.[0] as CustomEvent).detail).toEqual({ id: "places" });

    el.remove();
  });

  it("renders named left/right slots for the pages", async () => {
    const el = document.createElement("theme-journal-book") as ThemeJournalBook;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('slot[name="left"]')).not.toBeNull();
    expect(el.shadowRoot?.querySelector('slot[name="right"]')).not.toBeNull();

    el.remove();
  });
});
