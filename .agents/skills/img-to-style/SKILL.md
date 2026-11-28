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
  Default when not specified: the full CONTRIBUTING.md "Minimum component
  set" (Button, Input, Card, Typography scale, Link, Container, Item, Field,
  Detail, Blockquote, Skeleton) — that's the floor for a package that's
  actually ready for a PR, not just a 3-component smoke test. A smaller
  explicit list (e.g. "just button, card, input") is fine when the user asks
  for a quick preview instead of a finished package.
- **Bonus components** — when the image contains pieces that are clearly
  domain-specific rather than generic UI atoms (a game tile, a board socket,
  a gauge, a transport control), ask whether to add them as additional
  custom elements alongside the minimum set. Don't invent these unprompted,
  and don't let them replace the minimum set.
- Any explicit design values the user already knows (hex codes, font names,
  spacing unit) — these override anything read from the image.

## Process

1. **Copy the starter.** Copy `packages/theme-<tech-starter>` to
   `packages/theme-<name>` (CONTRIBUTING.md "Adding a new theme package",
   steps 1–2). Rename the package to `@tkottke90/theme-<name>` in
   `package.json`, update `description`. Keep the `build`, `test`, `lint`,
   `storybook`, and `build-storybook` scripts untouched — do not add,
   remove, or rewrite them.

   **Immediately rename every Storybook story title.** The starter's story
   files all carry a stale `title:` prefix (`Theme/Starter WC/...` or
   `Theme/Starter CSS/...`) that silently rides along into the copy — it's
   not something you'll notice by looking at the component code. Do this
   now, not at the end:

   ```
   grep -rln "Starter" stories/ src/ 2>/dev/null | xargs sed -i 's#Theme/Starter [A-Za-z]*#Theme/<Name>#g'
   grep -rn "Starter" stories/ src/ 2>/dev/null   # must return nothing
   ```

2. **Read the image closely before extracting anything.** Work out what the
   user wants captured (the style, not necessarily the exact screen — their
   notes override what's in the image) and build a short component inventory
   by surface role before you touch tokens:

   | Role        | Question                      | Examples                       |
   | ----------- | ----------------------------- | ------------------------------ |
   | Background  | What's behind everything?     | Page background, app shell     |
   | Container   | What holds content?           | Card, panel, list row          |
   | Raised item | What sits on top?             | Popup, tooltip, dropdown       |
   | Control     | What gets pressed?            | Buttons, tabs, toggles, inputs |
   | Accent      | What decorates edges/corners? | Dividers, badges, focus rings  |

   For each role present in the image, note shape (rectangle, rounded,
   cut corners), edge treatment (outline weight, double rules), surface
   (flat, gradient, texture), and depth (shadow, bevel, inset). This is what
   turns into the token groups below — don't skip straight to colors.

   **Read geometry carefully.** The most common mistake is misreading which
   way a shape goes (a rounded corner read as square, a border read as inset
   when it's a drop shadow). Zoom in mentally on edges and corners before
   deciding border-radius/shadow values, and state your reading in plain
   words in the summary so the user can correct it quickly if it's wrong.

   **Surface every bonus-component candidate now, not after delivery.** Go
   back through the inventory table you just built and flag any row that
   doesn't map onto a CONTRIBUTING.md minimum-set component (a sidebar, a
   game tile, a gauge, a transport control) as a bonus-component candidate.
   List these explicitly when you present the read-back and ask once,
   whether or not the user's request mentioned them — recognizing the
   surface during sampling and then staying quiet about it is the failure
   mode to avoid. Don't wait for the user to notice it's missing after
   you've already delivered the package.

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

3. **Apply tokens** in a new `themes/<name>/theme.css` (a Tailwind v4
   `@theme {}` block, copied from `themes/theme-starter/theme.css`) and
   point the copied starter's build at it (`themeDir` in its
   `scripts/generate.mjs` or `scripts/build.mjs`, or the `@import` in a CSS
   package's `src/index.css`). Never put token values in the package
   itself; see `docs/adr/0001-theme-token-architecture.md`.

4. **Check contrast before building components.** A color's being "read
   directly" from the image or carefully "estimated" doesn't mean it's
   usable as text — sampled mid-tone brand colors and pastel accents
   routinely fail WCAG AA. For every text/background pairing your token set
   implies (body text on surface, each semantic/blockquote color on its
   fill, a button's label on its fill, nav-link text on its surface), check
   the contrast ratio and require 4.5:1 for normal text or 3:1 for large/
   bold text and non-text indicators (borders, icons):

   ```python
   def lum(h):
       c = [int(h.lstrip('#')[i:i+2], 16) / 255 for i in (0, 2, 4)]
       c = [x / 12.92 if x <= .03928 else ((x + .055) / 1.055) ** 2.4 for x in c]
       return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]
   def ratio(a, b):
       a, b = lum(a), lum(b); return (max(a, b) + .05) / (min(a, b) + .05)
   ```

   Fix a failure by shifting the color darker or lighter **within the same
   hue** — never by changing which color it is — and say in the final
   summary which tokens were adjusted this way and what they were sampled
   or estimated as originally. This applies to tokens the image's own
   design fails at too (a low-contrast nav label in the source is still a
   bug once it's in a token, not a faithful reproduction worth preserving).

5. **Replace the starter's example components** with real implementations
   of the requested component list, built on the tokens from step 3 — not
   hardcoded values. This is CONTRIBUTING.md step 3 ("Replace the example
   styles/components with the real theme").

   **Map the image's own surfaces onto the generic component set** instead
   of reskinning each starter component with new colors and calling it done.
   Use the component inventory from step 2 to decide, e.g.:

   | Generic component        | Maps to, if the image has one                                                                                 |
   | ------------------------ | ------------------------------------------------------------------------------------------------------------- |
   | Card / Container         | The image's panel/frame treatment (border, cut, texture)                                                      |
   | Item                     | A row or tile treatment from a list/tray in the image                                                         |
   | Detail                   | A collapsible panel in the same frame treatment                                                               |
   | Blockquote (10 variants) | The image's semantic-color-coded callouts, if any, else the palette's accent colors applied to the same frame |
   | Skeleton                 | The image's own muted/placeholder tone, shimmering between its two closest neutral tokens                     |

   A component that only swaps `bg-brand-50` for `bg-brand-500` across the
   starter's existing rectangular markup is not "real" if the image's actual
   containers have cut corners, hexagonal sockets, rings, or bevels — that's
   a token pass, not a style port. Build the real shape.

   **Technique ladder for shapes Tailwind's utility classes can't express.**
   Try these in order and stop at the first one that works; higher rungs are
   hand-written CSS/SVG, not Tailwind classes:

   1. **Tailwind tokens, incl. `--background-image-*`**: flat colors, fonts,
      radius, shadow — and Tailwind v4's `--background-image-*` namespace in
      `themes/<name>/theme.css` for a repeatable texture or a data-URI SVG
      background (e.g. `--background-image-carbon: linear-gradient(...)`,
      `--background-image-brackets: url("data:image/svg+xml,...")`),
      which compiles to a plain `bg-carbon` / `bg-brackets` utility class.
   2. **A shared hand-written CSS module** for a shape 2+ components need
      (cut-corner panels, hexagon sockets): one `css` tagged-template export
      other components import, not copy-pasted per file. `theme-tactical-wc`
      already does this (`hud-frame-controller.ts` + `hud-frame-svg.ts`) —
      follow that precedent rather than inventing a new pattern.
   3. **Per-component hand-written `css`** for a shape only one component
      needs: `clip-path: polygon(...)` for cut corners (two layered
      pseudo-elements — one for the border color, one inset by the border
      width for the fill — since `clip-path` removes a regular CSS border),
      `conic-gradient` + `mask` for rings/gauges, `transform: skewX(...)`
      for slanted elements.

   **Whichever rung you're on, colors and fonts still come from the
   compiled tokens** (`var(--color-brand-500)`, `var(--font-sans)`), never
   a hex literal or font name copied straight from the image into
   component CSS — that's what step 3 is for. Hand-written CSS is for
   shape and layout Tailwind can't reach, not an excuse to bypass the
   token pipeline.

6. **Meet the package standard** (CONTRIBUTING.md, "Package standard").
   The starter you copied already meets it, so keep each piece and fill it
   in for the new theme rather than deleting it:
   - **Stories and tests**: at least one Storybook story and one Jest test
     per component (CSS-only packages: stories only). Don't skip this even
     if the component is simple.
   - **An intro on every story**: each stories file's `meta` sets
     `parameters.intro` (`tag`, `title`, 1–2 paragraphs on how the
     component was designed for this theme). Replace the starter's
     template intros; don't leave its "describe here..." guidance in.
   - **A demo story**: a stories file titled `.../Demo` (with
     `intro: null`) composing a full page from only this package's
     components, including a working form.
   - **Form-ready controls**: WC packages keep the shared
     `FormControlElement`/`FieldElement` bases from `src/generated/core/`
     (see `docs/adr/0002-shared-wc-core.md`) and name controls with
     `aria-label`; Preact and CSS packages keep the native form wiring the
     starter has.
   - **README.md and AGENTS.md**: rewrite both from the starter's
     templates for this theme. AGENTS.md is the style guide for agents
     building UI with the package, and stays in `package.json` `files`.
   - **Screenshot**: regenerate `docs/screenshot.png` (see CONTRIBUTING.md,
     "Screenshots for style changes") and view it. It shows only the demo
     story, so check every component appears there.

7. **Run the required checks** scoped to the new package, per
   `AGENTS.md` ("Before considering a change done"):

   ```
   npm run lint
   npm run typecheck
   npm run format:check
   npm run test -w packages/theme-<name>
   npm run build -w packages/theme-<name>
   npm run build-storybook -w packages/theme-<name>
   npm run screenshot -w packages/theme-<name>
   ```

   `npm run lint` also runs `scripts/check-package-standard.mjs`, which
   fails if the package lacks AGENTS.md, its screenshot or README link, a
   demo story, or an intro on any story.

   A change isn't finished if any of these fail — fix the underlying
   issue, don't weaken a check to get it green.

   **Verify every declared token survived compilation.** A Tailwind v4
   `@theme` token that nothing references gets silently dropped from the
   compiled CSS — it won't error, it'll just resolve to nothing at runtime.
   After building, grep the compiled output for each token name declared in
   `theme.css`:

   ```
   grep -q -- "--color-your-token" packages/theme-<name>/dist/index.css && echo found || echo MISSING
   ```

   A token that didn't survive is either dead (nothing uses it — delete
   it from `theme.css`) or genuinely needed by hand-written CSS that only
   reaches it through a plain `var(...)` with no matching Tailwind utility
   class anywhere in the content-scanned files (the common case for a WC
   package's rung-2/3 hand-written `css` blocks, which Tailwind's content
   scan doesn't parse as real CSS). In that case switch `@theme {}` to
   `@theme static {}` in `theme.css` to force full emission, rather than
   leaving a token that looks wired up but silently isn't.

8. **Summarize for the user**: which values were read directly from the
   image/inputs vs. estimated, which contrast fixes were applied and why,
   which components were built (minimum set plus any bonus components),
   which technique-ladder rung each non-trivial shape used, and confirm all
   checks in step 7 passed and the package meets the standard from step 6.

## Guardrails

- Don't touch any package other than the new one.
- Don't add a per-package ESLint/Prettier/Jest config — the starter you
  copied already extends the root configs; keep it that way.
- Don't change component tech mid-scaffold (e.g. starting from
  `theme-starter-css` and adding a JS framework) — tech is fixed by the
  required input in step 0.
- Don't commit build output (`dist/`, `storybook-static/`) — same as every
  other package in this repo.
- Hand-written CSS for a shape Tailwind can't express (step 5's technique
  ladder, rungs 2–3) still reads colors and fonts from `var(--color-*)` /
  `var(--font-*)` tokens, never a literal hex code or font name — the same
  "no hand-copied token values" rule from `AGENTS.md` applies whether the
  CSS comes from a Tailwind class or a hand-written rule.
