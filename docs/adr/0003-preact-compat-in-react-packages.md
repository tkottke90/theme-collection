# 0003: Preact component packages import `preact/compat`

## Status

Accepted

## Context

The Preact packages (`theme-starter-react`, `theme-tactical-react`) need a
`ref` to reach the native element inside `ThemeInput`, `ThemeSelect`,
`ThemeTextarea` and `ThemeButton`, so ref-based form libraries and
`<label for>` code work. In Preact, `forwardRef` comes from `preact/compat`.

Importing `preact/compat` installs the compat layer for the whole app, not
only for these components. The visible side effect is React semantics for
text inputs: `onChange` fires on every keystroke, in the consumer's whole
Preact tree. `onInput` behaves the same either way. The alternative was a
`ref`-style prop (for example `inputRef`) with no compat import, which keeps
Preact's native semantics but is not the React API and breaks ref-based
libraries that pass `ref`.

## Decision

Keep `preact/compat`. The packages are advertised as "React-API compatible",
so `ref` working like React's matters more than keeping Preact's native
`onChange`. The side effect is documented in each package's README and
AGENTS.md ("This package imports `preact/compat` …"), and `onInput` is the
documented way to react to typing in either setting.

## Consequences

- Consumers who want Preact's native `onChange` cannot use these packages
  without the compat layer. They can still use the CSS-only theme.
- New Preact packages copied from `theme-starter-react` inherit the choice
  and its documentation.
- The decision is reversible: switching to a ref-style prop would be a
  breaking change to the four forwarding components.
