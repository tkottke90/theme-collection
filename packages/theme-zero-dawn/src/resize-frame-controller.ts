import type { ReactiveController, ReactiveControllerHost } from "lit";

/**
 * Measures its host element with a `ResizeObserver` and recomputes whatever
 * `compute(width, height)` returns whenever the host's border-box size
 * changes, then calls `host.requestUpdate()` so the component re-renders its
 * SVG frame with the new `geometry`.
 *
 * Same measure-and-redraw primitive as `theme-tactical-wc`'s; it knows
 * nothing about path geometry, only about keeping `geometry` in sync with the
 * host's rendered size.
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
    // jsdom has no ResizeObserver and reports 0x0 sizes — geometry stays null
    // and the frame degrades to nothing rather than throwing.
    if (typeof ResizeObserver === "undefined") return;
    this.resizeObserver = new ResizeObserver(() => this.measure());
    this.resizeObserver.observe(this.host, { box: "border-box" });
  }

  hostDisconnected(): void {
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
  }

  private measure(): void {
    this.geometry = this.compute(this.host.offsetWidth, this.host.offsetHeight);
    this.host.requestUpdate();
  }
}
