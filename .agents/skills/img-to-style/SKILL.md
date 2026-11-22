---
name: img-to-style
description: Scaffold a new @tkottke90/theme-* package from an image of a design (screenshot, mockup, Figma export). Use when the user wants to turn a design image into a new theme package in this repo.
---

# img-to-style

Turns a design image into a new theme package under `packages/theme-<name>`,
following this repo's `CONTRIBUTING.md` and `AGENTS.md` rules exactly — this
skill does not introduce a new way of adding a package, it automates the
existing one.

## Required inputs

Stop and ask the user for anything missing here. Never guess these:

- **Image** of the design (file path or pasted image).
- **Theme name** — used as `packages/theme-<name>` and
  `@tkottke90/theme-<name>`. Fail if `packages/theme-<name>` already exists;
  ask for a different name instead of overwriting.
- **Component tech**: `css` | `wc` | `react`. This selects the starter
  (`theme-starter-css` / `theme-starter-wc` / `theme-starter-react` per the
  table in `CONTRIBUTING.md`). Do not infer this from the image — ask if the
  user didn't say.

## Optional inputs

- **Description** for `package.json`.
- **Component list** — which components to build on top of the tokens.
  Default when not specified: `button`, `card`, `input`.
- Any explicit design values the user already knows (hex codes, font names,
  spacing unit) — these override anything read from the image.

## Process

1. **Copy the starter.** Copy `packages/theme-<tech-starter>` to
   `packages/theme-<name>` (CONTRIBUTING.md "Adding a new theme package",
   steps 1–2). Rename the package to `@tkottke90/theme-<name>` in
   `package.json`, update `description`. Keep the `build`, `test`, `lint`,
   `storybook`, and `build-storybook` scripts untouched — do not add,
   remove, or rewrite them.

2. **Read the image closely before extracting anything.** Work out what the
   user wants captured (the style, not necessarily the exact screen — their
   notes override what's in the image) and build a short component inventory
   by surface role before you touch tokens:

   | Role | Question | Examples |
   |---|---|---|
   | Background | What's behind everything? | Page background, app shell |
   | Container | What holds content? | Card, panel, list row |
   | Raised item | What sits on top? | Popup, tooltip, dropdown |
   | Control | What gets pressed? | Buttons, tabs, toggles, inputs |
   | Accent | What decorates edges/corners? | Dividers, badges, focus rings |

   For each role present in the image, note shape (rectangle, rounded,
   cut corners), edge treatment (outline weight, double rules), surface
   (flat, gradient, texture), and depth (shadow, bevel, inset). This is what
   turns into the token groups below — don't skip straight to colors.

   **Read geometry carefully.** The most common mistake is misreading which
   way a shape goes (a rounded corner read as square, a border read as inset
   when it's a drop shadow). Zoom in mentally on edges and corners before
   deciding border-radius/shadow values, and state your reading in plain
   words in the summary so the user can correct it quickly if it's wrong.

   **Sample colors from the image instead of eyeballing them.** If the image
   is a file on disk, use Python (PIL) to read actual pixel values from each
   surface and round to sensible hex:

   ```python
   from PIL import Image
   im = Image.open(path).convert('RGB')
   for name, xy in {'bg': (20, 20), 'card': (300, 400)}.items():
       print(name, '#%02x%02x%02x' % im.getpixel(xy))
   ```

   Extract, per role identified above:
   - Color palette: primary, secondary/accent, neutral/background, text,
     and any clearly distinct state colors (error, success, etc.) actually
     present in the image. Don't invent colors the image doesn't show.
   - Typography: font family (only if identifiable — e.g. a common system
     or web font; otherwise pick a sane fallback stack and say so), and a
     type scale (headings/body/small) based on the relative sizes visible.
   - Spacing/sizing: a spacing scale and border-radius based on what's
     visible (buttons, cards, gaps).
   - Shadows/borders if the design uses them.

   Never copy copyrighted characters, logos, or artwork from the image into
   placeholder content — note where a placeholder was used instead.

   **Mark every extracted value as either "read directly" (sampled from the
   image or given by the caller) or "estimated" (eyeballed/inferred).** This
   distinction goes in the PR/summary at the end — do not present estimates
   as exact specs. Ask a clarifying question only when a wrong guess would
   materially change the component implementation (e.g. which of two colors
   is primary); otherwise make the call and list it as an assumption.

3. **Apply tokens** to the copied starter in whatever form that starter
   already uses for tokens (CSS custom properties for `theme-starter-css`,
   Lit base styles/CSS vars for `theme-starter-wc`, a theme/tokens module
   for `theme-starter-react`). Don't invent a new tokens mechanism — use
   the one the starter ships with.

4. **Replace the starter's example components** with real implementations
   of the requested component list (default `button`, `card`, `input`),
   built on the tokens from step 3 — not hardcoded values. This is
   CONTRIBUTING.md step 3 ("Replace the example styles/components with the
   real theme").

5. **Tests and stories** (CONTRIBUTING.md step 5): write at least one
   Storybook story and one Jest test per component. Don't skip this even
   if the component is simple.

6. **Run the required checks** scoped to the new package, per
   `AGENTS.md` ("Before considering a change done"):

   ```
   npm run lint
   npm run format:check
   npm run test -w packages/theme-<name>
   npm run build -w packages/theme-<name>
   npm run build-storybook -w packages/theme-<name>
   ```

   A change isn't finished if any of these fail — fix the underlying
   issue, don't weaken a check to get it green.

7. **Summarize for the user**: which values were read directly from the
   image/inputs vs. estimated, which components were built, and confirm
   all checks in step 6 passed.

## Guardrails

- Don't touch any package other than the new one.
- Don't add a per-package ESLint/Prettier/Jest config — the starter you
  copied already extends the root configs; keep it that way.
- Don't change component tech mid-scaffold (e.g. starting from
  `theme-starter-css` and adding a JS framework) — tech is fixed by the
  required input in step 0.
- Don't commit build output (`dist/`, `storybook-static/`) — same as every
  other package in this repo.
