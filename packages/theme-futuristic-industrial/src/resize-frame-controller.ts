import type { ReactiveController, ReactiveControllerHost } from "lit";

/**
 * Measures its host element with a `ResizeObserver` and recomputes whatever
 * `compute(width, height)` returns whenever the host's border-box size
 * changes (fixed size, fluid width, or content-driven height all trigger
 * this the same way), then calls `host.requestUpdate()` so the component's
 * own template re-renders with the new `geometry`.
 *
 * This is the generic measure-and-redraw primitive behind every SVG frame in
 * this package (`HudFrameController` for Card/Stat's tab-and-chevron frame,
 * `ViewfinderFrameController` for the rounded corner-bracket frame) — it
 * knows nothing about path geometry, only about keeping `geometry` in sync
 * with the host's actual rendered size. It's the Lit-idiomatic equivalent of
 * directly calling `svg.querySelector(...).setAttribute(...)` from a
 * `ResizeObserver` callback: it keeps the actual DOM writes declarative
 * (inside the host's `render()`) instead of fighting Lit's own re-rendering.
 */
export class ResizeFrameController<TGeometry> implements ReactiveController {
  private readonly host: ReactiveControllerHost & HTMLElement;
  private readonly compute: (width: number, height: number) => TGeometry | null;
  private resizeObserver?: ResizeObserver;

  geometry: TGeometry | null = null;

  constructor(
    host: ReactiveControllerHost & HTMLElement,
    compute: (width: number, height: number) => TGeometry | null,
  ) {
    this.host = host;
    this.compute = compute;
    host.addController(this);
  }

  hostConnected(): void {
    this.measure();
    // Environments without ResizeObserver (e.g. jsdom in tests) just never
    // get a redraw past the initial measurement — offsetWidth/Height are 0
    // there anyway, so `geometry` stays `null` and the frame degrades to
    // nothing rather than throwing.
    if (typeof ResizeObserver === "undefined") return;
    this.resizeObserver = new ResizeObserver(() => this.measure());
    this.resizeObserver.observe(this.host, { box: "border-box" });
  }

  hostDisconnected(): void {
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
  }

  /** Recomputes `geometry`; call it when something other than size changes the shape. */
  measure(): void {
    this.geometry = this.compute(this.host.offsetWidth, this.host.offsetHeight);
    this.host.requestUpdate();
  }
}
