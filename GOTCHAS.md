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

### 2026-10-16 · A Link Block with a negative margin is capped by Webflow's max-width: 100%
- Area: designer
- Scope: template-candidate
- Symptom: the rebuilt nav dropdown on staging wrapped six service
  descriptions onto two lines; the prototype wrapped two. Every grid,
  gap, padding and font size measured the same.
- Cause: Webflow publishes Link Blocks with `w-inline-block`
  (`max-width: 100%`). The rows use `margin-left: -1em` so their hover box
  lines up with the label; in the prototype the row grows 1em wider than
  its column, in Webflow the cap keeps it at 100% and the text loses 1em.
- Fix: `max-width: none` on the row combo (Nav Panel Link › Is Panel Row).
  Any Link Block that bleeds with a negative margin needs the same. When a
  Webflow build wraps differently from the prototype, compare the element's
  computed max-width before anything else.
- Status: fixed (Webflow, 2026-10-16)
- Found by: claude

### 2026-10-16 · Styling links inside CMS rich text: nested styles are Designer-only
- Area: designer
- Scope: template-candidate
- Symptom: the in-copy link style needed `.cap-text a`-type rules; the
  style API writes classes, combos and states only, and a bound RichText
  in the Designer offers states, not nested selectors.
- Cause: nested ("When nested inside of") styles aren't in the API, and a
  bound rich text has no child to select.
- Fix: build a temporary unbound RichText through the API with the same
  classes (it comes with Webflow's sample content, links included), select
  a link in it in the Designer, style selector › HTML Tag › All Links ›
  "Nest selector inside of" (+), set the styles, then remove the temporary
  block; the nested style stays. Through Claude in Chrome: find the link's
  canvas position with JS on the canvas iframe
  (`iframe.contentDocument`, scale by 1461/innerWidth for screenshots).
  Traps: a link pointing at the current page adds a "Current" state to the
  selector (point it elsewhere); Decoration › "…" holds thickness, colour
  and offset; bind colours with the purple dot or the pill's variable
  list. A colour entered through the Custom value editor and committed
  with Return published as `color: @var_variable-…` (invalid); clear it
  and bind through the dot. After publishing, grep the CSS for `@var_`.
  Plain Link elements in a paragraph take a class instead (Copy Link,
  Copy Link › Is On Dark), which the API can write, including
  `text-decoration-thickness`, `text-underline-offset` and
  `text-decoration-color`.
  Transitions: Effects › Transitions (+), Type is a native menu with Font
  Color and Text Decoration Color; `transition` can't be entered under
  Custom properties. The Style panel's rows shift between elements (a
  Variable modes row, the window size), so take a screenshot before each
  click: one blind sequence produced "Background-Position: 875ms".
- Status: done (2026-10-16): Service Hero Intro, Cap Text, Service Card
  Text, Body S › Is Answer, Text Secondary › Is Copy Text, with 0.2s
  transitions
- Found by: claude

### 2026-10-16 · Template JSON-LD with CMS fields: Designer only
- Area: mcp
- Scope: template-candidate
- Symptom: schema written to a CMS template through
  `bulk_update_pages_schema_markup` with field tokens published with every
  bound value empty (`"name": ""`).
- Cause: the API accepts only valid JSON and stores it parsed, then
  re-serialises it. Webflow's field token is
  `{{wf {&quot;path&quot;:&quot;name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}`
  (entities and a bare `\}`), which isn't valid JSON; every escaped form
  the API takes comes out wrong (`\\}` or `\"`), and the token renders
  empty. A `<script>`-wrapped string is validated the same way.
- Fix: static pages through the API (`jsonLdSchema`); templates in the
  Designer: page settings › Schema markup. What worked: type the whole block
  as raw text, field tokens included in the form above (types `PlainText`,
  `ImageRef`, `Date` → ISO, `Link`; reference subfields as
  `author-profile:name`); the editor turns each token into a chip. Start
  with `<script type="application/ld+json">` (without it the JSON publishes
  as bare text in the head) and don't type `</script>`: the editor closes
  it itself, and a typed one doubles it. Pressing Escape closes the panel
  and loses unsaved text. The result is stored in `rawJsonLdSchema`,
  readable through the API. Drafts in `docs/seo/schema/`. Plain fields
  publish an apostrophe as `&#39;` (valid JSON, wrong text): use ’ in
  meta copy. Validate every CMS page after a change.
  Open Graph image on a template: page settings › Open Graph image lists
  the collection's image fields (Designer only).
- Status: workaround confirmed (2026-10-16)
- Found by: claude

### 2026-10-15 · Links inside CMS copy: new rich-text fields and elements, built through the API
- Area: mcp
- Scope: template-candidate
- Symptom: the client's final copy adds ~180 internal links inside running
  text, but most service copy sat in PlainText fields (Intro, Capabilities
  Intro, Capability Body, Tab Summary), which can't hold a link.
- Cause: a field's type can't be changed, and a Paragraph can't bind to a
  RichText field.
- Fix: add a RichText companion field per PlainText field ("Intro Rich"…),
  fill it from the doc (linked version where the text matches, the plain text
  wrapped in `<p>` otherwise; `prototype/scripts/parse-final-copy.py` parses
  the Google Docs export with links), then in the template create a
  `RichText` element next to the paragraph with the same classes
  (`data_element_builder`), bind `richText` to the new field
  (`set_settings`), and remove the paragraph. Keep the PlainText fields
  filled: "is set" visibility conditions still read them. Also learnt:
  - A RichText built through the API starts with Webflow's sample content
    (Heading 1…, lorem); the binding replaces it on publish. A Heading built
    with children keeps a default "Heading" text node: remove it.
  - Static text with a link: rebuild the paragraph with the WHTML builder
    (`<p>… <a href>…</a> …</p>`), delete the old one, then remove the custom
    `href` attribute the importer adds to the new link.
  - Global links are plain (no underline, inherited colour), so links in
    copy are invisible until each rich-text class gets a nested
    "All Links" style in the Designer.
  - Collection List source/sort/attributes take `static_json` values in
    the shape `get_settings` returns (`{"collectionId": …}`,
    `[{"fieldSlug":"order","direction":"ascending"}]`); "Service = Current
    Service" is still a Designer step.
- Status: done on Home and the Services Template (2026-10-15); link style
  approved and applied 2026-10-16 (entry above)
- Found by: claude

### 2026-10-15 · Bulk rich-text content: the Designer's CSV import, not the API
- Area: mcp
- Scope: template-candidate
- Symptom: 39 blog posts (870 KB of HTML) from the client's old Webflow
  site had to go into the Research collection; sending each body through
  `create_collection_items` would mean pasting every article into a tool
  call.
- Cause: the MCP only takes field data inline.
- Fix: clean the export into a CSV whose headers match the field names
  (script: rewrite internal links, drop the body's own `<h1>`, strip
  `<strong>` inside headings and zero-width joiners), then CMS › collection
  › Import in the Designer (Claude in Chrome `file_upload` on the dialog's
  file input). Columns map by name; take the offered backup. Results: cover
  and body images are re-hosted on this site's CDN, items arrive staged
  (not draft), a `<table>` becomes one run-together paragraph (rebuild it
  as a list), image alt in rich text becomes `__wf_reserved_inherit`, and
  references (Topic, Author) still need an API write after the import.
  Also: renaming a form field's Name in the Designer or API changes its
  DOM id too (the label `for` had to follow), and a double click in the
  Components panel inserts an instance on the page (Cmd+Z).
- Status: workaround confirmed (Research, 2026-10-15)
- Found by: claude

### 2026-10-15 · A Collection List that refuses sort and filter on one page
- Area: mcp
- Scope: template-candidate
- Symptom: on /industries (a page duplicated from About), every sort write
  on the cards list failed with "[Conflict] The operation could not be
  applied to the component map", in the Designer too, at body level and on
  a freshly created list. Filter and curated items reported success and
  read back empty; limit was accepted. The same sort on the Sitemap page
  worked. Copy and paste of a working list from another page arrived with
  no source, filter or sort ("pasting cross-site, CMS bindings removed").
- Cause: unknown; page-specific state in Webflow's component map.
- Fix: no list query at all. The item's visibility is bound to a Switch
  (Industry Tile), the item carries `data-order` bound to Tile Order, the
  list carries `data-sort-by-order`, and `src/modules/cms-order.ts` puts
  the items in order on load (without the script the CMS order shows).
  If a list refuses a query write once, stop: later writes won't take.
  Later: Kajal rebuilt the list in the Designer with a native sort, so the
  script was removed. Lesson: report a refused native setting first
  (Designer step) before writing workaround code.
- Status: fixed natively by Kajal (2026-10-15); cms-order.ts removed
- Found by: claude

### 2026-10-15 · Keep a CMS template unpublished with its toggle, not with draft
- Area: mcp
- Scope: template-candidate
- Symptom: the FAQs, Topics, Capabilities and Team templates had been set
  to draft through the API to keep their item pages off the site; Kajal
  pointed out that templates have their own switch for this.
- Cause: `update_page_settings` exposes `draft` but not the template's
  "Publish this Collection Template page" setting (the API reads it back
  as `shouldPublish`, read-only).
- Fix: switch "Publish this Collection Template page" off in the template's
  page settings in the Designer (the template moves under "Unpublished
  Collections"), then set `draft: false` through the API. Draft is for
  static pages only. Read back `shouldPublish: false`.
- Status: fixed (2026-10-15)
- Found by: human

### 2026-10-15 · Conditional visibility without the Designer: a Switch field
- Area: mcp
- Scope: template-candidate
- Symptom: new template elements (a middle breadcrumb level, an optional
  intro) needed "show when field is set"; the Designer tab was unresponsive.
- Cause: the API binds visibility only to Switch fields; "is set" on a text
  field is Designer-only.
- Fix: a Switch next to the text field ("Has Breadcrumb Parent", "Has
  Capabilities Intro"), set per item through the API, and `set_visibility`
  with a CMS binding to it. Costs an extra field for editors to tick; the
  help text says so. Also: Link fields accept relative URLs (`/#industries`),
  and a Heading's or Link's text binds through `set_settings` key `text`.
- Status: replaced by native "is set" conditions in the Designer and the
  two switch fields deleted (2026-10-15)
- Found by: claude

### 2026-10-15 · An invisible script-hidden overlay blocks the Designer canvas
- Area: designer
- Scope: template-candidate
- Symptom: below 992px every click on the canvas selected the nav (Kajal).
- Cause: the full-screen mobile menu is hidden by nav.ts (`hidden`); the
  canvas runs no script, so it sat there at opacity 0 over the page. The
  canvas also ignored `pointer-events: none` (or kept the cached old sheet:
  the 2a link is fetched without a cache-buster in the Designer, so a new
  repo rule can take up to 10 minutes to reach the canvas).
- Fix: `html.wf-design-mode .mobile-menu:not(.is-open) { display: none; }`
  (canvas-preview). To edit the menu, add Is Open to Mobile Menu for the
  session. Any overlay that a script hides needs the same rule.
- Status: fixed (repo, 2026-10-15)
- Found by: human

### 2026-10-15 · Turning a component variant on from JS; a border that flashes black
- Area: designer
- Scope: template-candidate
- Symptom: adding the Light variant's class to G | Nav W on scroll turned
  the bar light but left the links white; then the new bottom border
  flashed black before fading to the light grey.
- Cause: Webflow puts a variant's class (`w-variant-<id>`) on every element
  the variant styles, with compound selectors (`.nav-link.w-variant-…`),
  not descendant ones. And a border with no colour set is `currentColor`
  (dark here), so `transition: border-color` animates from it.
- Fix: nav.ts adds the class to the wrapper and, with
  `data-nav-scroll-deep`, to everything in the bar; the class name sits in
  `data-nav-scroll-class` in Webflow, not in the code. The base bar has
  `border-bottom: 1px solid transparent`, so the variant's border fades
  from transparent.
- Status: fixed (Webflow and e64cbc7, 2026-10-15)
- Found by: human

### 2026-10-15 · The Webflow nav root had no data-nav
- Area: designer
- Scope: project
- Symptom: building the Apple-style dropdown, the G | Nav W root in
  Webflow had no `data-nav`, which the prototype markup has; nav.ts then
  scopes "leave the nav" and "click outside" to `body`.
- Cause: lost in the original nav import (the importer keeps some
  attributes and drops others).
- Fix: set `data-nav` on the component root through the API. After any
  import, compare the root's `data-*` hooks with the prototype.
- Status: fixed (Webflow, 2026-10-15)
- Found by: claude

### 2026-10-15 · A capped bleed panel sticks to the left on wide screens; Finsweet's two counts
- Area: designer
- Scope: template-candidate
- Symptom: (1) on a 2000px+ screen the service and About hero panel sat
  against the left edge, outside the left rail, with a wide gap on the
  right. The device check (fixed widths, overflow only) did not catch it;
  Kajal did. (2) On /case-studies "Showing 12 case studies" stayed at 12
  with a filter on; the inactive "All results" count was white on paper.
- Cause: (1) Service Hero had `max-width: 105em` and bleed margins of
  `-1.875em`; once the parent is wider than the cap, nothing centres the
  panel. (2) In Finsweet List v2 `fs-list-element="items-count"` is the
  total; the filtered number is `results-count`. The count colour was
  set for the dark active chip only.
- Fix: (1) margin-left and margin-right
  `max(-1.875em, calc((100% - 105em) / 2))` (the API accepts it and the
  Designer keeps it): the bleed below the cap, centred on the rails above
  it; checked at 2560, 2000, 1680, 1280 and 390. Any capped element with
  negative margins needs the same. Check wide screens by comparing an
  element's left and right gaps, not only overflow. (2) `results-count`
  on the span; CS Filter Count `color: inherit`, opacity 0.6.
- Status: fixed (Webflow, 2026-10-15)
- Found by: human

### 2026-10-14 · The importer drops a section id and a link's new-tab target
- Area: mcp
- Scope: template-candidate
- Symptom: on the About page the Location section published without
  `id="location"`, and the Brand Vision and Get Directions links opened
  in the same tab.
- Cause: the WHTML importer kept other ids but dropped this one (as it
  did `forms`, MANUAL-TODO E), and it turns `target="_blank"` and `rel`
  into custom attributes next to its own `href` attribute instead of
  link settings.
- Fix: after an import, read back every section id and set missing ones
  with `set_dom_id`; set new-tab links through `set_settings` key `link`
  (`static_link` with `open_in_new_tab`) and remove the custom `href`,
  `target` and `rel` attributes the importer left.
- Status: fixed (About, 2026-10-14)
- Found by: claude

### 2026-10-14 · A section with a Collection List can't become a component
- Area: mcp
- Scope: template-candidate
- Symptom: to reuse Home's case study, industry and research sections on
  the service template, `transform_element_to_component` was refused for
  each: "Components can't hold a live CMS binding".
- Cause: platform limit. Unbinding the list first lets the conversion
  through, but the list inside the component can't be bound again ("not
  inside a CMS context").
- Fix: only static sections become components (Logo Band, Contact
  Section, group Sections; Home keeps instances, output unchanged). Lists
  are rebuilt per page or template, so any change to a card has to be made
  on Home, the service template and later templates alike.
- Status: workaround confirmed
- Found by: claude

<!-- Add new entries here, newest first. -->

### 2026-10-14 · An imported combo published as a bare class; shared hiding on a shared combo
- Area: mcp
- Scope: template-candidate
- Symptom: on the author page the photo tags were 19.5px instead of 13px;
  on phones the article's "Get My Free Assessment" and "Subscribe" buttons
  were missing.
- Cause: (1) the WHTML importer created `.post-card-title.is-small` while
  other "Is Small" combos existed; Webflow published its properties as a
  bare `.is-small { font-size: 24px … }`, so every element carrying an
  `is-small` combo (buttons, badges, icons, card media) got them. The style
  API still reported the selector as `.post-card-title.is-small`.
  (2) Button › Is Small had `display: none` at 479 to hide the nav's Get
  a Quote, which hid every small button on phones.
- Fix: renamed the imported combo (Is Compact Title) so it publishes under
  its own class; moved the phone hiding to a Nav Quote combo on the nav
  button only. After an import, grep the published CSS for bare `.is-…`
  rules. Never hide a shared combo to hide one instance.
- Status: fixed (Webflow, 2026-10-14)
- Found by: claude

### 2026-10-14 · Getting content into an empty slot, and Designer controls that resist automation
- Area: designer
- Scope: template-candidate
- Symptom / cause / fix:
  - The API can't insert into an empty component slot, and dragging an
    element onto the slot's Navigator row is refused ("can't be dragged
    into component instances outside of slots"). Select the element,
    Cmd+X, select the slot's row in the Navigator, Cmd+V: it lands in
    the slot. Build template content in a wrapper at body level, then
    cut and paste it.
  - The date format menu in a CMS text binding is a custom list; clicks
    on its options often miss. Open it and use ArrowDown + Enter
    (MMMM D, YYYY → three down = MMM D, YYYY), then read the text back.
  - "Exclude current item" is a filter: field = the collection's own
    item field (e.g. "Article"), condition "is not", value Current item.
    It defaults to "is"; re-open the filter and check before closing.
  - Template SEO title/description: page settings › "+ Add field"
    inserts a field token; type plain text around it.
- Status: workaround confirmed
- Found by: claude

### 2026-10-14 · Collection List settings: filters fail inside a slot, one key per write
- Area: mcp
- Scope: template-candidate
- Symptom: building the Research page lists, `filters` writes on a
  Collection List inside the G | Main slot either reported "applied" and
  read back empty, or failed with "[Conflict] The operation could not be
  applied to the component map"; one combined write (filters + sort +
  limit) left that list refusing every later write.
- Cause: unconfirmed; the same write on a list outside the slot works.
- Fix: build the Collection List at body level, write `source`, then
  `filters`, `sort`, `limit`, `pagination` in separate `set_settings`
  calls (one key each), fill and bind the item, then `move_element` the
  list into the slot (ids, settings and bindings are kept). A filter
  "Author Profile = current item" or "exclude current item" has no API
  value shape that works: Designer step. Also: the element builder can't
  bind a CMS field at creation ("not inside a CMS context"); create, then
  bind. Reference fields bind as `<refFieldId>:::<targetFieldId>`.
  `set_attributes` `for` on a Form Label reported success but did not
  persist here; `set_settings` key `attributes` did.
- Status: workaround confirmed (Research page, 2026-10-14)
- Found by: claude

### 2026-10-14 · A grid class without rows shows Webflow's 2-row default
- Area: designer
- Scope: template-candidate
- Symptom: Kajal saw "2 rows" on grids in the Designer that were
  created through the API with columns only.
- Cause: the published CSS was fine (no `grid-template-rows`, so rows
  are implicit), but the Designer's grid panel shows its own default
  (`.w-layout-grid`: `1fr 1fr` / `auto auto`) where a value is missing,
  and writes it as soon as someone edits the grid.
- Fix: every grid class gets both `grid-template-columns` and
  `grid-template-rows` explicitly; rows `auto` where the grid just
  flows (extra rows stay implicit and auto, so nothing moves). Set on
  Pillar Grid, Rail Layout, Service Layout, Service Stage, AI Grid,
  Case Facts, Proof Grid, Case Grid, Stat Card, Case Feature, Industry
  Grid, and Tab List at 991. Home section heights unchanged at 1680,
  820 and 390. Check with a query for `display: grid` styles without
  `grid-template-rows`.
- Status: fixed (Webflow, 2026-10-14)
- Found by: human

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
