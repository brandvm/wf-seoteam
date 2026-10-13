# Manual Designer steps

Everything the Webflow MCP can't do, for a person to do in the Designer.
Claude adds a row the moment it hits a limit, with *why* the API can't;
the person marks it done; Claude then reads the result back (or checks it on
the canvas when the API can't read it) and says so.

Common reasons, so they don't need re-explaining (see the skill's
`lessons/mcp.md`):
- a value mixing a variable with `calc()`, a gradient or a shadow;
- conditional visibility on a CMS field; a list sourced from a
  multi-reference or multi-image field; "exclude current item";
- a link to the current CMS item, in a list or a component prop;
- tag styles that have never been set; reserved class names;
- placeholders, slot names, variant props exposed from nested instances.

How to enter a value with variables: select the class, switch to the
breakpoint, type `calc(` in the field and insert variables with the
variable picker. Gradients: Backgrounds → gradient, pick each stop from the
variables.

Letters run A, B, C… then AA, AB… and are never reused, so a letter
mentioned in GOTCHAS or a commit stays unambiguous.

| ID | Where (page › element or class) | Breakpoint | Set | Why the API can't | Done |
| --- | --- | --- | --- | --- | --- |
| A | Class **Form Input** › **Is Select** | Desktop | Backgrounds → image: pick `caret-down-muted.svg` from the asset library (uploaded 2026-10-12); position right `1.0667em`, centre; size `1.0667em`; no tile (size and tile are already set) | A background image needs an asset picked in the Designer; the API stored the size but dropped `background-position` while there was no image | ☐ |
| B | Class **Service Stage** | Desktop | Backgrounds → image: pick `cell-tile.svg` from the asset library (uploaded 2026-10-12); size `12.9375em` × `16.25em`; position left `-2.625em`, top `-5.3125em`; tile both ways | A background image needs an asset picked in the Designer | ☐ |
| C | Style Guide page › **To Slot** wrapper (last element in Body) | — | Drag it into the **G \| Main** slot of G \| Page W, then ungroup it so the 14 sections sit directly in the slot | The API can't put content into an empty slot | ☐ |
| D | G \| Components › stylesheet Embed, and Site settings › head / footer code | — | Paste the three snippets from `loader.html`: the published page still requests `https://org.github.io/REPO/styles.css` (the template placeholder), so the repo stylesheet (fluid scaling, state rules) and the script don't load on staging | Snippets are pasted by a person (AGENTS.md › Snippets are not versioned) | ☐ |
| E | Style Guide page › section "Form" (the Section element) | — | Element settings → ID: `forms` | `set_dom_id` on this section and its wrapper is rejected ("could not be applied to the component map"); the menu link `#forms` has no target until it is set | ☐ |
