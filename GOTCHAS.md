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
