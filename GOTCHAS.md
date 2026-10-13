# Gotchas

A running log of things that cost time on this project. Agents read it at
the start of every session and add to it when they hit something new (see
the Session protocol in `AGENTS.md`). Never delete an entry — update its
`Status` instead.

Lessons from earlier builds are in the skill, not here:
`.claude/skills/webflow-build/lessons/` (one file per area). Read the file
for the area you work in. Entries tagged `Scope: template-candidate` are
collected from client repos into those files.

## Entry format

```md
### YYYY-MM-DD · Short title
- Area: designer | css | loader | release | mcp | ci | js | perf
- Scope: project | template-candidate
- Symptom: what was observed
- Cause: why it happened
- Fix: what was done, or the workaround
- Status: open | fixed <sha> | upstreamed wf-template <sha>
- Found by: claude | codex | human
```

## This project

<!-- Add new entries here, newest first. -->

### 2026-10-12 · WHTML importer: six things learned building the style guide
- Area: mcp
- Scope: template-candidate
- Symptom / cause / fix:
  - An inline `style="background: var(--x)"` becomes a junk combo
    (`inline-div-0`) on the element's class. Generate named combos bound
    to the variable instead (Sg Swatch Color + Is Brand Ink) and create
    them before importing; `gen-style-guide.mjs` now does this.
  - A boolean attribute imports as `hidden=""` and reads back, but is
    not in the published HTML. Set it with a value (`hidden="hidden"`)
    after the import; that one publishes.
  - Every `<img>` attribute but `alt` is dropped, including a `data-*`
    marker. Bind assets by matching Image elements to the markup in
    document order, checking the class of each pair.
  - Collapsing whitespace between tags (`>\s+<`) to keep the payload
    small also removes the word space between inline spans ("Strategyfor").
    Keep one space between inline neighbours; repaired with `set_text`
    on the Span (" for …").
  - A form import adds empty combos (`.form._w-form`, `._w-input`,
    `.form-input._w-select`, `.button._w-button`) and gives every field
    `id="field"`; a `<button type="submit">` with children becomes a
    plain form button. Remove the stray combos afterwards.
  - One imported `<section>` came in as type Section without its id, and
    then refused `set_dom_id` on itself and its wrapper (component-map
    conflict); `set_attributes` can't write `id` at all. Left as a manual
    step (MANUAL-TODO E).
  Sizes that worked: 3 root elements and up to 15 KB per call.
- Status: open
- Found by: claude

### 2026-10-12 · A WebGL context before the first paint delays that paint
- Area: perf
- Scope: template-candidate
- Symptom: Lighthouse mobile showed an observed first paint at 2.1 s on
  localhost with 0 ms blocking time; desktop was fine.
- Cause: the hero shader created its WebGL context and compiled during
  boot. Where the GPU is emulated (headless Chrome, lab tests) that work
  holds back the first frame without showing up as main-thread time.
- Fix: a canvas on screen at load starts after `load`, two animation
  frames and idle time; the still image is the first paint. Observed first
  paint went to 0.26 s. Canvases further down start near the viewport.
- Status: open (prototype only; move to `src/modules/hero-shader.ts` with
  the rest of the home page)
- Found by: claude

### 2026-10-12 · A screenshot of a canvas includes what sits on top of it
- Area: perf
- Scope: template-candidate
- Symptom: the still image made for a shader panel had the panel's text
  baked into it.
- Cause: a Playwright element screenshot captures the page region, not the
  canvas pixels.
- Fix: hide the overlapping content (`visibility: hidden`) before
  capturing a still from a canvas.
- Status: fixed (prototype asset regenerated)
- Found by: human

### 2026-10-12 · Checked at three widths, broke between them
- Area: css
- Scope: template-candidate
- Symptom: the prototype passed at 1680, 820 and 390, but between 992 and
  1440 the contact form, logo strip, badges and footer columns ran off
  screen, and the centred nav menu overlapped the nav buttons. The person
  found it, not a check.
- Cause: the fluid scale holds at the min width (1440) down to 992, so
  anything sized in fixed em stops fitting there; an absolutely centred
  menu knows nothing about its neighbours. The three check widths never
  land in that range.
- Fix: grid columns as `minmax(0, Nfr)` in the design's proportions,
  `min-width: 0` on flex and grid children that must shrink, a
  `1fr auto 1fr` grid for the nav. Check with a script at many widths
  (2560 … 360, including 1366, 1280, 1200, 1100, 1024, 992): every
  element's right edge against the viewport and its parent, plus the gaps
  between nav items. A wf:overflow check would be worth adding to the
  skill's scripts.
- Status: fixed (prototype and Webflow classes)
- Found by: human

### 2026-10-12 · Three small traps in one sync
- Area: designer
- Scope: template-candidate
- Symptom / cause / fix:
  - Logos disappeared when their row moved inside S Wrapper: S Wrapper
    is `position: relative; z-index: 1`, a stacking context, so the
    row's `mix-blend-mode` no longer blended with the band behind it.
    Keep blended elements out of S Wrapper (cap them directly).
  - A bar with a small type class (Caption) had narrower side padding
    than the sections: its padding variable is in em and was computed
    against 13px. Put the type class on the inner row, not on the padded
    wrapper (conventions.md §6).
  - `background-position` sent with no background image was dropped
    silently (the call reported success). Read back after writing; set it
    in the Designer with the image.
- Status: fixed
- Found by: claude

### 2026-10-09 · Variable batch: a suffixed name, rename works, modes inherit
- Area: mcp
- Scope: template-candidate
- Symptom: in a batch of ~200 variable writes (all succeeded, no 429 at
  20 per call), `create_color_variable` "Paper Tint/Paper 4" came back
  named "Paper Tint/Paper 4-9" (CSS `--…paper-4-9`). No other variable
  had that name.
- Cause: unconfirmed; probably a deleted variable of the starter still
  holds the name. Webflow suffixes silently and reports success.
- Fix: check the `name` in every create result. `rename_variable` now
  works through the MCP (ids and aliases kept; the CSS name follows), so
  AGENTS.md › Webflow MCP limits "No variable rename" is out of date.
  Also seen: a variable created in a collection with modes takes its base
  value in every mode (read back: no gaps), so only the modes that differ
  need a write; and an update without `mode_id` writes Base only, so a
  role change that must hold at every breakpoint is four writes.
- Status: workaround confirmed
- Found by: claude

### 2026-10-09 · Buttons drop the inherited letter-spacing
- Area: css
- Scope: template-candidate
- Symptom: FAQ questions wrapped to two lines where Figma has one; the
  heading's −3% tracking was missing on the text inside it.
- Cause: the browser's default stylesheet sets `letter-spacing: normal`
  (and word-spacing, text-transform) on `<button>`; `font: inherit` does
  not cover letter-spacing.
- Fix: `letter-spacing: inherit` on every class used on a `<button>`
  that should take its parent's type (FAQ Trigger); classes that set their
  own tracking (Button, Nav Link) are fine.
- Status: fixed (prototype)
- Found by: claude

### 2026-10-09 · Figma MCP can't export video fills; the .fig has them
- Area: designer
- Scope: template-candidate
- Symptom: the hero background is a VIDEO fill; `get_design_context`
  returned an empty div for it and no asset URL, and `get_screenshot`
  only renders a frame.
- Cause: the Figma MCP exports image and SVG assets only.
- Fix: a `.fig` file is a zip; the video sits at `videos/<videoHash>`
  (hash from a read-only `use_figma` call on the node's `fills`). Unzip
  that one entry into its own folder, then re-encode for the web with
  ffmpeg (H.264, `-an`, `+faststart`) and take the poster from frame 1.
  Images are under `images/<imageHash>` the same way, at full size.
- Status: open
- Found by: claude

### 2026-10-09 · Every prototype defaults to port 5173
- Area: ci
- Scope: template-candidate
- Symptom: the new prototype couldn't start: another client's prototype
  was already on 5173 (`--strictPort` not set, so Vite would also have
  silently moved to 5174 while `webflow-build.config.json` still said
  5173).
- Cause: prototype-starter hard-codes `--port 5173` for every project.
- Fix: stopped the other project's server (with the person's OK) and
  added `--strictPort` and `--host 0.0.0.0` (network preview for the
  team) to `dev`. Template idea: pick the port per project in
  `pnpm new-project` and write it to both the prototype and the config.
- Status: open
- Found by: claude
