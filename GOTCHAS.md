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
