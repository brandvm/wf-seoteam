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
| A | Class **Form Input** › **Is Select** | Desktop | Backgrounds → image: pick `caret-down-muted.svg` from the asset library (uploaded 2026-10-12); position right `1.0667em`, centre; size `1.0667em`; no tile (size and tile are already set) | A background image needs an asset picked in the Designer; the API stored the size but dropped `background-position` while there was no image | ☑ 2026-10-13, through the API: `background-image: url(<asset hosted URL>)` is accepted and reads back; checked on staging |
| B | Class **Service Stage** | Desktop | Backgrounds → image: pick `cell-tile.svg` from the asset library (uploaded 2026-10-12); size `12.9375em` × `16.25em`; position left `-2.625em`, top `-5.3125em`; tile both ways | A background image needs an asset picked in the Designer | ☑ 2026-10-13, through the API (same way); checked on staging |
| C | Style Guide page › **To Slot** wrapper (last element in Body) | — | Drag it into the **G \| Main** slot of G \| Page W, then ungroup it so the 14 sections sit directly in the slot | The API can't put content into an empty slot | ☑ done by Kajal (the sections are in the slot on staging) |
| D | G \| Components › stylesheet Embed, and Site settings › head / footer code | — | Paste the three snippets from `loader.html`: the published page still requests `https://org.github.io/REPO/styles.css` (the template placeholder), so the repo stylesheet (fluid scaling, state rules) and the script don't load on staging | Snippets are pasted by a person (AGENTS.md › Snippets are not versioned) | ☑ 2026-10-13, through the API: embed 2a via `set_settings` key `code`, head and footer via `set_site_freeform_code`, verbatim from `loader.html`; staging loads the bundle |
| E | Style Guide page › section "Form" (the Section element) | — | Element settings → ID: `forms` | `set_dom_id` on this section and its wrapper is rejected ("could not be applied to the component map"); the menu link `#forms` has no target until it is set. Template lesson (0.3.1): Webflow refuses `forms` as an element id; use `form-elements` for the id and the menu link | ☐ |
| F | Site settings › Forms › spam protection, checked in a normal browser on staging | — | Open `seo-teams.webflow.io`, wait a few seconds and check that "Speak with a consultant" in the contact form becomes clickable. In the tools' browsers the form stays in Webflow's `w-form-loading` state (submit disabled) because the Turnstile check never completes there; the style guide's form with Webflow's own submit button does the same, so it is not the custom button | Needs a real browser session; spam protection is a site setting | ☐ |
| G | Home › Contact form › select "What services are you looking for?" | — | Change option 2 to `AI Search Visibility (GEO & AEO)` | The importer cut the option text at "&" and the API has no setting for select options | ☐ |
| H | Style Guide › Forms › Contact Form › Phone input | — | Add custom attribute `disabled` = `disabled`; set the two selects' names to `city` and `budget` | Attribute writes are refused on these pages ("could not be applied to the component map") | ☐ |
| I | Pages Style Guide and Media › page settings | — | Exclude from site search and from the sitemap (both carry `noindex, nofollow` already) | The control needs a site plan | ☐ |
| J | Site settings › General | — | Switch off "Display Made in Webflow badge" once the plan allows, then delete the `html .w-webflow-badge` rule in `src/styles.css` §03 and the host check in `environment-switcher.ts` | A paid plan is needed; both are hidden in repo code for now (GOTCHAS 2026-10-13) | ☐ |
| K | Designer › Style Manager | — | Optional, after Home is confirmed: "Clean up unused styles" removes about 55 old Sg classes and the classes of the removed approach and testimonials sections | A person should run it and look at the list first | ☐ |
