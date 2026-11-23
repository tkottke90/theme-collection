/**
 * Shared classes for the recessed "socket" wrapper around text-like form
 * controls (Input, Textarea, Select): a dark core well with a plate-grey
 * edge that turns machine-cyan on focus.
 */
export const SOCKET_CLASSES =
  "zd-plate zd-socket block [--zd-cut:8px] [--zd-bw:1.5px] [--zd-face:var(--color-core)] [--zd-edge:var(--color-plate-300)] focus-within:[--zd-edge:var(--color-brand-500)]";

export const SOCKET_CONTROL_CLASSES =
  "block w-full border-0 bg-transparent px-3 py-2 font-sans text-text outline-none placeholder:text-text-muted [font:inherit] [color-scheme:dark]";
