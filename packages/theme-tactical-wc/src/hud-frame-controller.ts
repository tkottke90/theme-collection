import type { ReactiveController, ReactiveControllerHost } from "lit";
import { computeHudFrame, type HudFrameGeometry } from "./hud-geometry.js";

export interface HudFrameOptions {
  /** Corner cut size, px. */
  cut?: number;
  /** How far the top-left/bottom-right tabs stick out, px. */
  notch?: number;
  /** How far each tab runs along its edge, px (clamped to 40% of the width). */
  notchLength?: number;
}

/**
 * Measures its host element with a `ResizeObserver` and recomputes the HUD
 * frame's SVG path strings whenever the host's border-box size changes
 * (fixed size, fluid width, or content-driven height all trigger this the
 * same way), then calls `host.requestUpdate()` so the component's own
 * template re-renders with the new `geometry`.
 *
 * This is the Lit-idiomatic equivalent of directly calling
 * `svg.querySelector(...).setAttribute(...)` from a `ResizeObserver`
 * callback: it keeps the actual DOM writes declarative (inside the host's
 * `render()`) instead of fighting Lit's own re-rendering.
 */
export class HudFrameController implements ReactiveController {
  private readonly host: ReactiveControllerHost & HTMLElement;
  private readonly options: Required<HudFrameOptions>;
  private resizeObserver?: ResizeObserver;

  geometry: HudFrameGeometry | null = null;

  constructor(host: ReactiveControllerHost & HTMLElement, options: HudFrameOptions = {}) {
    this.host = host;
    this.options = {
      cut: options.cut ?? 22,
      notch: options.notch ?? 6,
      notchLength: options.notchLength ?? 170,
    };
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

  private measure(): void {
    const { cut, notch, notchLength } = this.options;
    this.geometry = computeHudFrame(
      this.host.offsetWidth,
      this.host.offsetHeight,
      cut,
      notch,
      notchLength,
    );
    this.host.requestUpdate();
  }
}
