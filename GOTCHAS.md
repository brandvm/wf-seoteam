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

### 2026-10-14 · Binding the Home lists to the CMS: what the API and importer do
- Area: mcp
- Scope: template-candidate
- Symptom / cause / fix:
  - A text Span made by the importer can't be bound to a field; build
    the element as a builder `span` (DOM element) and bind that.
  - Connect the Collection List to its collection before adding
    elements inside it, and bind after the structure is built.
  - Webflow writes `role="list"` / `role="listitem"` on `w-dyn-items`
    and `w-dyn-item`, over a custom `role="tablist"`. The tabs module
    now resets them (tablist on the list, `presentation` on the items).
  - Conditional visibility can be bound through the API only to switch
    fields; an option field (Card Style) is a Designer step, and so is a
    link to the current item and a date format.
  - Imported links carry a custom attribute `href=#`. After pointing a
    link at the current item in the Designer, delete that attribute or
    it can override the link.
  - Several card variants per item (one per style, shown by conditional
    visibility) stack in the canvas until visibility is set; with
    `height: 100%` on the card they overlap the next section and can't
    be clicked. Set visibility first, then the links.
- Status: fixed (Home, 2026-10-14)
- Found by: claude

### 2026-10-14 · Form labels published `for=""`, linked to nothing
- Area: mcp
- Scope: template-candidate
- Symptom: Kajal saw "T Form Field" holding the SR Only span and the
  input in the Navigator. The published markup was a real `<label>`
  wrapping its field, but with `for=""`, and three inputs shared
  `id="field"`.
- Cause: the importer turns `<label>` into a Form Label and writes an
  empty For. A label with a `for` attribute labels only the element with
  that id, so the wrapping no longer counts and screen readers fall back
  to the placeholder.
- Fix: a custom attribute `for` on each Form Label (the API has no For
  setting; the attribute replaces the empty one on publish) and a unique
  id on every field. An id must not equal a section anchor: the services
  select became `services-field` because `#services` is the section.
  Check after any form import: every `for` matches an id in the same
  form, no id repeats.
- Status: fixed (Home and Style Guide, 2026-10-14)
- Found by: human

### 2026-10-14 · No responsive sizes for an image uploaded through the API
- Area: mcp
- Scope: template-candidate
- Symptom: a new 4K hero poster (65 KB) was served to phones in full; the
  old poster had `-p-500`/`-p-800`/`-p-1080` copies and a `srcset`.
  Mobile Lighthouse dropped two points.
- Cause: assets created through the API get no responsive variants, and
  `set_attributes` refuses `srcset` and `sizes` on an Image element
  ("An internal error occurred"), although `loading` and `fetchpriority`
  are accepted on the same element.
- Fix: bind a mid-size file (2560 wide) for now; for proper sizes, pick the
  image in the Designer (variants are made then) or add `srcset`/`sizes`
  there (MANUAL-TODO L). Size an API-uploaded image for phones first.
- Status: workaround
- Found by: claude

### 2026-10-13 · "Made in Webflow" badge hidden in repo CSS, for now
- Area: css
- Scope: project
- Symptom: the badge shows on seo-teams.webflow.io; Kajal wanted it gone
  while the staging site is shown around.
- Cause: the badge is a site setting (Site settings › General) that can
  only be switched off on a paid Workspace or site plan; the API has no
  control for it.
- Fix: `html .w-webflow-badge { display: none !important; }` in
  `src/styles.css` §03, tagged `override-webflow`, approved by Kajal as
  temporary. Hiding the badge on an unpaid site is against Webflow's
  terms: remove the rule when the plan is in place and the setting is off.
  In the same round the Dev/Staging switcher was hidden on this host
  (`environment-switcher.ts`; `?wfc-switcher` shows it).
- Status: open (remove both before launch)
- Found by: human

### 2026-10-13 · A later stylesheet's base rule beats an earlier breakpoint rule
- Area: css
- Scope: template-candidate
- Symptom: after restyling existing classes in a new prototype file
  (`new-classes-home-v2.css`), the phone layout broke: a stacked intro was
  43em tall, the first pillar kept its desktop indent, padded panels kept
  desktop padding.
- Cause: the new file loads after the old one, so its plain rule wins
  over the old file's `@media` rule for the same class (same specificity,
  later source). A `flex-basis` meant as a width becomes a height once the
  parent is a column.
- Fix: every changed property that has a breakpoint value is restated in
  the new file's own media blocks. In Webflow this can't happen (one class,
  one value per breakpoint); it is a prototype-only trap, so check 820 and
  390 after any override file.
- Status: fixed (prototype)
- Found by: claude

### 2026-10-13 · Figma: a layer's screenshot is clipped to its frame and capped at 1x
- Area: designer
- Scope: template-candidate
- Symptom: a background was needed without the card drawn over it. A
  screenshot of the frame bakes the card in; screenshots of the layers
  under it came back cut to the frame and never larger than 1x.
- Cause: the connector renders a node as it shows in its parent, at most
  at its own size. Figma stays read-only, so the card can't be hidden.
- Fix: read each layer's image hash, scale mode and crop transform
  (read-only `use_figma`), take the source images from the `.fig`
  (`images/<hash>`), and rebuild the stack in a local HTML page: source
  images at their node rectangles, 1x layer exports for textures, the
  layers' blend modes as `mix-blend-mode`; screenshot that page at 1.5x.
  The page must be opened from a file (`page.goto('file://…')`):
  `setContent` runs on about:blank, which may not load local images.
- Status: workaround confirmed
- Found by: claude

### 2026-10-13 · The loader fetched the stylesheet three times and shifted the page
- Area: loader
- Scope: template-candidate
- Symptom: staging mobile Lighthouse 74 with CLS 0.18 and 0 ms blocking
  time; two layout shifts of 0.085 on the hero. The network log showed
  `styles.css?v=1`, then `styles.css?v=<time>`, then `styles.css?v=<time+50>`.
- Cause: the 2a link is fetched by the parser; the 2b script rewrote its
  href with a cache-buster (second fetch), and the footer loader rewrote
  it again to "match" the bundle's query string (third fetch). Each
  rewrite drops the applied sheet until the new copy arrives: the page
  falls back to Webflow's 14px base and jumps back. On mobile the fluid
  size is fixed at 1rem, so the jump is large.
- Fix (loader.html, re-pasted through the API): on staging 2b keeps the
  parsed sheet and, after `load`, fetches a cache-busted copy and swaps it
  in only once it has loaded; on production it still points the sheet at
  the pinned release. The footer loader re-points the sheet only when the
  bundle comes from a different source (a fallback). Two tests cover it.
  CLS went to 0.005; mobile 96–98, desktop 99–100 on staging.
- Still open for launch: on production the parser fetches the staging
  sheet named in 2a before 2b switches to jsDelivr, a wasted
  render-blocking request. Worth solving in the template before a site
  goes live.
- Status: fixed in loader.html (uncommitted until approved); installed in
  Webflow 2026-10-13
- Found by: claude

### 2026-10-13 · Local Lighthouse added a second to two hosts; and what an image's loading needs
- Area: perf
- Scope: template-candidate
- Symptom: every local Lighthouse run showed the GitHub Pages stylesheet
  and Webflow's jQuery taking ~1.1 s, which put mobile at 82 when the
  page deserved 96. `curl` and Playwright fetched the same files in 70 ms.
- Cause: Chrome's newer DNS / connection path in the Chrome that
  Lighthouse launches, on this network; not the site.
- Fix: run local Lighthouse with
  `--chrome-flags="--headless=new --disable-features=HappyEyeballsV3,AsyncDns"`
  and check the request list for a host that is slow only there before
  believing a score. The keyless PageSpeed API quota is usually spent;
  the PageSpeed website is the reference.
  Also: Webflow publishes every image `loading="lazy"`, the hero's
  included, and the API has no loading setting. Custom attributes
  `loading="eager"` and `fetchpriority="high"` on the Image element are
  accepted and replace the default in the published tag.
  Not possible through the API: a font stack in a FontFamily variable
  (`custom_value` is rejected), so a metric-matched fallback font (to stop
  text re-wrapping when Inter loads, CLS 0.02–0.06 on the hero) needs a
  decision and a Designer step.
- Status: workaround confirmed
- Found by: claude

### 2026-10-13 · Three "manual" steps the API can do after all, and Webflow's form defaults
- Area: mcp
- Scope: template-candidate
- Symptom / cause / fix:
  - A background image on a class: `update_style` with
    `background-image: url("<the asset's cdn.prod.website-files.com URL>")`
    is stored and reads back, and position, size and repeat sent in the
    same call are kept (sent without an image they are dropped). No
    Designer step needed once the asset is uploaded.
  - The loader: an HtmlEmbed's content is the setting `code`
    (`set_settings`, with `scope_component_id` inside a component), and
    Site settings › head / footer code is `set_site_freeform_code`.
    Both read back. The starter's 2a embed still held
    `https://ORG.github.io/REPO/styles.css`, and head and footer were
    empty: nothing from the repo loaded on staging until this was done,
    so every page rendered at 14px with no states or scripts. Do it
    before comparing staging with the prototype.
  - Webflow's own form CSS shows through an imported form: labels get
    `margin-bottom: 5px` and bold, inputs `line-height: 1.43` and
    `vertical-align: middle`, and the importer puts the form's classes on
    the wrapper div, not the `<form>`. Fix in the Designer classes, not in
    repo CSS: Form Field margin-bottom 0 and Weight/Regular; Form Input
    Line Height/Normal, Weight/Regular, vertical-align baseline; Form on
    the wrapper (its margin reset), the layout class on FormForm.
  - A form's submit: import its label and chip into a holder, create a
    DOM `button` with `type="submit"` before the FormButton, move the
    children in, remove holder and FormButton.
- Status: fixed (Webflow, 2026-10-13); the first two also apply to
  MANUAL-TODO.md's "common reasons"
- Found by: claude

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
- Status: fixed 3357530
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
