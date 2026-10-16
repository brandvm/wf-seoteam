# SEO Team Toronto — design handoff → Webflow build

The brief every build session starts from. Written when the design is
approved (by the designer, or at the end of the prototype phase) and kept
current during the build. Agents read it after `AGENTS.md` and `GOTCHAS.md`.

## Read first

1. `AGENTS.md`, `GOTCHAS.md`, and the skill's `conventions.md`.
2. This file, then `MANUAL-TODO.md` and `BUILD-NOTES.md` in this folder.
3. The approved design: Figma
   [SEO Team Toronto](https://www.figma.com/design/f9yJTcyy7UWnpL9q7emgYi/SEO-Team-Toronto?node-id=585-2),
   frame **HOME** `638:3521` (1680 wide, the "Mari's Design" frame under
   the HOME section label), and the localhost prototype in
   `../prototype` (`pnpm dev` → http://127.0.0.1:5173, also on the local
   network).

## Status

2026-10-09 — Prototype phase. Five Home sections are confirmed by the
client and built in the prototype: hero (with nav, logo strip and stats
band), research/articles, FAQ, contact CTA, footer. The rest of Home
(services, why us, AI technology, unified strategy, case studies,
industries, testimonials) is not confirmed yet and not built.

2026-10-12 — In Webflow: the Inter font, all variables (P1–P12) and all
classes for the five sections (179 styles; read back and diffed against
the prototype: identical except the select caret, see MANUAL-TODO A).
The prototype now renders from the refreshed snapshot, so it shows what
Webflow holds. Nothing is published and no element is on a page yet.
The hero shader was approved (Kajal) and is in the repo
(`src/modules/hero-shader.ts`) with its S Bg Canvas class in Webflow.
Next: the Sg style-guide classes and page, tag styles, then the
sections (Home needs the To Slot drag).

2026-10-12 (later) — The rest of the home page was approved for Webflow
(Kajal): variables Brand/Stone and Radius/16, the 149 new classes and
combos (209 actions; read back and diffed: identical to the prototype),
Dark mode on Glow Panel and Case Card Is Dark / Is Orange, and all 44
images in the asset library. The style guide page is built in Webflow
from the reorganised prototype page (13 sections with a menu; Sg classes
and 61 variable-bound swatch/scale combos) inside a To Slot wrapper, and
published to staging: every one of the prototype page's 383 class names
is on it and all 39 images load. Open on that page: MANUAL-TODO C, D, E;
its 24 `<button>`s are still Links (to rebuild as DOM buttons); the form's
submit is a plain Webflow form button. The home sections themselves are
not built in Webflow yet. The prototype snapshot still needs a refresh so
`new-classes.css` empties into `webflow.css`.

2026-10-13 — Home is built in Webflow and published to staging: nav and
footer in their components, the 11 sections in the G | Main slot, 72
images bound, 28 real `<button>` elements (27 rebuilt from imported
links, plus the form's submit, rebuilt as a DOM button with its icon
chip). The loader snippets are installed (MANUAL-TODO D), so staging
runs the repo bundle. Compared with the prototype at 1680, 1280, 820
and 390: same page height and the same height for every section, nav
and footer; no missing class, no broken image; tabs, FAQ, Read more and
the testimonial slider work. Open: MANUAL-TODO E and F, the prototype
snapshot refresh, and everything under Open decisions.

2026-10-13 (later) — **New home design.** The client confirmed a new frame:
Figma page "Confirmed Sections" › frame **new version** `731:2761`
(1680 wide). The prototype home page is rebuilt from it and is **pending
approval**; Webflow and staging still show the previous design. What
changed: the approach and testimonials sections are gone; services is a
heading block over four tab cards and a photo stage; the AI cards have a
banner; case cards, industries, research (authors line, four real cards)
and the contact heading are restyled; the rails sit 80px in (were 60px);
square corners on cards. Class changes are in
`prototype/src/css/new-classes-home-v2.css` (A changed, B new, C no longer
used), variables P15–P17 in `proposed.css`. The prototype style guide page
is not updated for it yet (`pnpm check:style-guide` lists 26 classes), and
`pnpm wf:preflight` has 44 items to fix on that page, none on Home. Copy:
`../Assets/reference/SEO Team Service Pages.rtf` (Home, v3) and the
keyword map next to it; those cover the service and industry pages too,
which are not started.

2026-10-13 (evening) — **In Webflow and on staging.** Kajal approved the
new home design. Variables (Rail/Inset 5em, Brand/Plum, Brand/Charcoal)
and classes (43 updated, 36 new) were written and read back identical to
`new-classes-home-v2.css`. Home is rebuilt from the prototype and
published: at 1680, 1280, 820 and 390 every section has the prototype's
height except Contact (+14px, Webflow's form block), same class set, text
and hooks. The Style Guide page is rebuilt in the template's fixed layout
(11 sections, all 401 classes of the generated page) and `/design/media`
exists as on the starter (no videos: the site plays none). The asset
library is in folders with alt text; nothing was deleted (old versions are
in "Previous design (not used)"). Repo: modules and repo CSS for the new
home are on `master` (`feda28d`), the Dev/Staging switcher and the Made in
Webflow badge are hidden on staging for now (`9d723d9`, `974abe1`). The
Inter files were subset to Latin (about 22 KB each, were about 100 KB;
full files in `../Assets/fonts/inter-full/`) and replaced in Webflow.
Lighthouse on staging after that, local, DNS stall off: mobile 94–95,
desktop 99. The nav wrapper is `position: fixed` (Kajal). Open: MANUAL-TODO
E–K; the prototype's Webflow snapshot still needs a refresh.

2026-10-14 — **Home runs on the CMS.** Collections Services (services and
industries, 22 items), Case Studies (4), Research (4) and FAQs (12); the
Home lists are bound to them: 4 service tabs and panes, 1 featured case
and 3 cards (one of three card designs per item by Card Style), 10
industry tiles, the 4 latest articles, 12 FAQs. Every card links to its
item page (`/services/…`, `/case-studies/…`, `/research/…`; the template
pages are not designed yet). Published to staging and checked at 1680
and 390: links, dates ("Sep 8, 2026"), count-ups, charts, no broken
image. The tabs and FAQ modules pair by position, so CMS markup needs no
ids.

2026-10-14 (evening) — **Service pages on staging.** One Services Template
serves all 22 service and industry pages (`/services/<slug>`): hero with
the shader in a per-service palette (Hero Palette, poster as fallback),
logo band, capabilities from the new Capabilities collection (102 items),
an optional second list, why us with per-service copy, three featured case
studies (Featured Case Studies field), industries (Show Industries),
research, contact. Logo Band and Contact Section are components now (Home
uses them too); sections with Collection Lists can't be components
(GOTCHAS). SEO title and description come from Meta Title / Meta
Description. Copy without a field yet: the capabilities intro on three
pages and the varying title of the technology card. Next: Case Studies
overview and template, then About.

2026-10-14 (night) — **About page on staging** (`/about`, Figma `802:1027`),
built from the approved prototype and checked at 1680, 1280, 820 and 390
(every section the prototype's height, except the existing nav-height
padding and Logo Band at phone width). The hero reuses the Service Hero
classes with a still of Figma's CN Tower texture; the story panel runs the
hero shader in a dark espresso-to-accent ramp over a still. The team is
the new **Team** CMS collection (Role, Photo, Order, LinkedIn; six
"Name Surname" placeholders); its template page is draft. 61 About
classes, images in the asset folder "About". The nav's About link points
to `/about`; the footer is unchanged. Open: real team names and photos,
the View Careers link (no careers page).

2026-10-15 — **Case Studies on staging.** `/case-studies` (overview, Finsweet
filter by Filter Group, one of three card designs per item by Layout) and
the Case Studies Template (12 pages, sections hidden when their fields are
empty, "More Results" = 3 non-featured cases excluding the current one).
SEO: template title Name + " | SEO Team Case Study", description Client +
Stat Label (Result is filled on 2 items only). Service hero centred on
wide screens (GOTCHAS). **Desktop nav is Apple-style** (Kajal): one shared
flyout card whose height follows the open panel, staggered link fade, a
curtain that blurs and dims the page and the bar's background; nav.ts and
repo CSS, Webflow classes Nav Curtain, Nav Flyout, Nav Flyout Card.
The bar turns light once the page scrolls (Kajal): nav.ts adds the
classes in `data-nav-scroll-class` on G | Nav W, which holds the Light
variant's class (`w-variant-282b023e-…`) and `data-nav-scroll-deep` puts it on
the bar's elements too (Webflow styles each one by it); if that variant is ever
recreated, update the attribute.
Device check (Playwright, nine Apple screen sizes): fine on phones, iPad
portrait and Macs; iPad Pro 13" (1032) and iPad landscape squeeze the
desktop layout (footer email, Home case facts and industry tiles, article
column, assessment form): open, a 1100px layout step proposed.

2026-10-15 (later) — **Links, iPad layouts, copy fixes.** Nav Case Studies
→ `/case-studies`; every footer link points at its page (socials still
`#`, no URLs yet). 992–1279px gets a roomier layout (footer 3 columns,
featured case halves with stacked facts, industries 2 columns, lead CTA and
article stacked, author posts 2 columns, story halves); the 1280 breakpoint
holds the full desktop layout. Copy audit against the doc and keyword map:
all 23 map pages live at their slugs, meta matches. Fixed: technology card
title per page (Services › Tech Title), the three missing capabilities
intros (Capabilities Intro + Has Capabilities Intro), the doc's three-level
breadcrumbs (Breadcrumb Parent, Breadcrumb Parent Link, Has Breadcrumb
Parent), Home's View All Case Studies and Read Our Research links. Still
open: Home Testimonials (in the doc, not in the confirmed design), Home
FAQ answers, Explore Industries on Home (no industries page), the doc's
`/contact` CTA target. Prototype only, awaiting review: Careers, Privacy,
Terms, Accessibility, HTML Sitemap, 404, Contact (`scripts/gen-pages.py`).
Legal copy is a general template for the client's lawyer to review.

2026-10-15 (evening) — **New pages in Webflow.** Careers (application
form, CV input without a submission target), Privacy, Terms,
Accessibility, HTML Sitemap (Collection Lists), 404, Contact (noindex,
unlinked), Industries overview (`/industries`, cards from Services with
Industry Summary, ordered by `cms-order.ts`), Home Testimonials
(placeholder quotes, scroll-snap slider with progress). Nav "All
Industries", Home "Explore Industries" and the industry breadcrumbs point
to `/industries`. Unpublished CMS templates (FAQs, Topics, Capabilities,
Team) use the template publish toggle, not draft.

2026-10-15 (night) — **Content from the client's current site**
(seoteamtoronto.ca CMS exports, used where they don't override the copy doc
or keyword map; Kajal). Home FAQs: all 12 answers, adapted from the old
site's answers with links to the new URLs ($2,500 CAD starting price
confirmed); the "approach" answer is drafted from the doc's Why SEO Team
copy. Research: the old site's 39 blog posts imported through the
Designer's CSV import (slugs kept, links rewritten, images re-hosted,
Topic and SEO Team Research author set); seven titles that targeted a
keyword the map gives a service page are retitled and link to that page
(site migration, dentists, doctors, lawyers, Shopify, Google Business
Profile, citations); the nine placeholder articles are unpublished (not
deleted), the four placeholder studies stay; featured article: GEO vs SEO
vs AEO; Strategy shows in the filter. Case studies stay anonymous: the six
matching cases got their story fields (industry, results, challenge, work)
from the old data without names or quotes. Logo Band: its seven logos are
already from the client's list; showing all 23 needs a marquee (design
change, not made). Redirect map for the old URLs in BUILD-NOTES. Service-page
FAQs (64 on the old site) not used, per Kajal.

2026-10-15 (late night) — **Final copy with internal links** (client doc,
`../Assets/reference/final-copy-internal-links/`, parsed to
`../Assets/reference/final-copy.json`). Page text unchanged except the Home
H1 ("Research-Based Toronto SEO Agency") and E-commerce's second list (two
paragraphs). On staging: 147 FAQs from the doc (10 on Home, 5–10 per service
and industry page; the old-site answers deleted, Kajal), a new FAQ section on
the Services Template (Home's design, FAQs › Service reference, filter
Service = Current Service), ~180 in-copy links through new rich-text fields
(Services: Intro Rich, Capabilities Intro Rich, Second List Text Rich, Tab
Summary Rich; Capabilities: Body Rich) and the two static Home phrases;
"Speak With a Consultant" → `/contact` (Home, template hero, FAQ sections,
mobile menu). Contact is indexable again; Open Graph copies the SEO fields
on every page. Open: the in-copy link style (prototype
`src/css/new-classes-links.css`, awaiting Kajal), the Home service-tab TAGS
lists (not in the design), nav Contact / Get a Quote / footer Contact still
`/#contact`, the old PlainText fields (keep or delete), schema and OG image
(SEO-PLAN).

2026-10-16 — **Schema and share images on staging** (Kajal: the 416 number,
`https://www.seoteamtoronto.ca`, link style approved). JSON-LD on Home
(ProfessionalService + WebSite), About, Contact, /research, /case-studies,
/industries (API), and on the Services, Research, Case Studies and Authors
templates (typed in the Designer with CMS field tokens; GOTCHAS). Sources in
`docs/seo/schema/`. Open Graph image: the default 1200×630 card on static
pages and the Services Template; Research → Image, Case Studies → Photo,
Authors → Photo. Checked after publishing on all 88 pages: every JSON-LD
block parses, no empty values or HTML entities, ISO dates, og:image on every
page. No schema, as planned: legal pages, Sitemap, Careers. In-copy link
style applied (Kajal): nested All Links styles on Service Hero Intro, Cap
Text, Service Card Text, Body S › Is Answer and the new Text Secondary ›
Is Copy Text combo (capabilities intro and second list on the Services
Template); class Copy Link (and › Is On Dark) on the two static Home links.
Underline 1px at 0.2em in Ink 32 (Paper 48 on dark), accent on hover, 0.2s
transition. Open: favicon and webclip still
Webflow's defaults, share images on articles and cases are WebP (LinkedIn
may not show them).

## Ground rules for this project

- Prototype first (wf-template workflow): the design is built and
  approved on localhost, then made in Webflow batch by batch, each batch
  with the go-ahead of Kajal (kajal@brandvm.com).
- Figma is read-only. Assets are exported to `../Assets` (originals) and
  `../prototype/public/assets` (web versions).
- The hero video comes from the `.fig` file (the Figma MCP can't export
  video fills): `videos/302408d…` → `hero-bg.mp4` (H.264, no audio,
  faststart, 1.1 MB) + `hero-bg-poster.webp`.

## Pages

| URL | Design source | Webflow page | Notes |
| --- | --- | --- | --- |
| `/` | Figma `731:2761` "new version" (desktop only; was `638:3521`); prototype `index.html` | Home | 9 sections, confirmed by the client 2026-10-13; prototype pending Kajal's approval |
| `/design/style-guide` | prototype `design/style-guide` (`pnpm style-guide`; hand-written part in `components.html`) | Style guide (folder `design`) | excluded from search; all 172 classes applied (`pnpm check:style-guide`) |

Breakpoints: 991 (tablet), 767 (mobile landscape), 479 (mobile). Checked at
1680, 820 and 390. Figma has the 1680 desktop frame only; tablet and mobile
layouts in the prototype are Claude's defaults (Open decisions).

Section map, new frame (screenshots in `../Assets/figma/home-oct13/`):

| Section | Figma | Prototype |
| --- | --- | --- |
| Hero, logo strip, stats | `725:834` | `#top`, `section.is-proof` |
| Services | `746:2951` (other three stages: `746:3127` GEO, `746:3246` paid, `746:3172` marketing) | `#services` |
| Why SEO Team + AI panel | `726:1867` | `#why` |
| Case studies | `728:2131` | `#case-studies` |
| Industries | `731:2660` | `#industries` |
| Research | `726:1541` | `#research` |
| FAQ | `726:1590` | `#faq` |
| Contact | `726:1666` | `#contact` |
| Footer | `726:1750` | `partials/footer.html` |

Outside the frame, so not built: `728:2109` approach, `741:906`
testimonials.

Section map of the previous design (Figma node → prototype):

| Section | Figma | Prototype |
| --- | --- | --- |
| Nav | `638:3529` | `partials/nav.html` (G \| Nav W) |
| Hero | `638:3524` | `section.is-hero.is-dark#top` |
| Logo strip + stats | `638:3588`, `638:3599` | `section.is-proof` |
| Research | `638:4206` | `section.is-tinted#research` |
| FAQ | `638:4255` | `section#faq` |
| Contact CTA | `638:4331` | `section.is-flush#contact` |
| Footer | `638:4415` | `partials/footer.html` (G \| Footer W) |

## Variables and classes

- Variable changes, as old → new: `../prototype/src/css/proposed.css`,
  blocks P1–P10 (brand colours, tints, semantic Base and Dark modes, Inter
  and the type scale, type roles with a new Caption role, breakpoint type
  sizes, layout, radius, and the existing classes re-bound: Button, Is
  Secondary, Chip, G | Nav, G | Footer W, Is Hero).
- New classes, with what each is for: `../prototype/CLASSES.md`
  (generated by `pnpm classes` from `src/css/new-classes.css`).
- Approval state: P1–P9 approved and made in Webflow 2026-10-09; P10–P12
  and every class in `new-classes.css` approved and made 2026-10-12
  (Kajal). `proposed.css` is empty; `new-classes.css` holds only the
  select caret (manual) and the rules that live in repo CSS.

## CMS

| Collection | Fields | Used on |
| --- | --- | --- |
| Research (planned) | Name, Slug, Category (option or reference), Summary (plain text), Image (alt on the field), Date, Author/byline ("SEO Team Research") | Home › Research: 4 latest, sorted by date. Needs an article template design |
| Services (planned) | Name, Slug, Short name (tab label), Number/sort order, Summary (the card text), Button label, Stage image, plus the service page fields (copy doc) | Home › Services: the four top-level services as tabs and panes; footer; nav dropdown. The tabs module needs the tab and pane ids to pair (bind both to the slug) |
| Industries (planned) | Name, Slug, Tagline (the tile's second line), Sort order, plus the industry page fields | Home › Industries: 10 tiles; footer (5 + "All Industries") |
| Case Studies (planned) | Name, Slug, Client, Category (tag), Headline, Featured (switch), Stat, Stat label, Source tag, Challenge / What we did / Result, Photo, Card style (option: dark, light, photo), chart | Home › Case studies: one featured + three cards. The three card visuals (bars, columns, line) differ per card: decide whether they are an image field or fixed per style |
| FAQs (planned) | Question, Answer (rich text), Sort order, Page or topic (so each page lists its own) | Home › FAQ: 12, in three columns of four (one list, three columns by CSS, or three lists with offset/limit) |

Confirmed by Kajal 2026-10-13: FAQs, articles, services, industries and
case studies are CMS. The prototype shows them static. Fields above are a
first proposal from the home page; the service, industry and article page
designs will add to them.

## Components to make

| Component | Used on | Props | Behaviour inside |
| --- | --- | --- | --- |
| G \| Nav W | every page | — | `nav` module (mobile toggle) |
| G \| Footer W | every page | — | — |
| Article Card | Home › Research (CMS list item) | — (bound to CMS) | — |

## Modules

| Module | `data-*` hooks | What it does |
| --- | --- | --- |
| `nav` | `data-nav-toggle`, `data-nav-menu` | Opens/closes the menu below 992px (`.is-open` on the nav); Escape and link clicks close it |
| `faq` | `data-faq-trigger` + `aria-controls` | Opens each answer in place (`hidden`, `aria-expanded`) |
| `hero-shader` | `data-hero-shader` (a `canvas` in the hero's S Bg, class S Bg Canvas, after the poster image) | Draws the hero background in WebGL: ribbed glass, a dark wave every 6s from bottom-left to top-right, a light that follows the pointer. Leaves the poster image showing without WebGL; one still frame with reduced motion; pauses off screen |

## Decisions

- 2026-10-09 · Prototype phase before any Webflow write (wf-template
  workflow); asked for by Kajal.
- 2026-10-09 · Only the five confirmed sections are built; the others
  wait for the client.
- 2026-10-09 · The "Mari's Design" HOME frame (`638:3521`) is the source;
  the "SECTIONS AND IDEAS" board is reference only.
- 2026-10-09 · Icons are Phosphor **Bold** (its 1.5px stroke at 16px
  matches Figma's Lucide strokes), inline SVG with `currentColor` so they
  follow the theme; in Webflow they become SVG DOM elements. Exception:
  the select caret is a background image (`caret-down-muted.svg`). Social
  links keep Figma's text badges (in, X, IG, YT): Phosphor's social icons
  aren't wanted (Kajal).
- 2026-10-09 · Text tones follow Figma's variables: Text/Secondary ink
  80%, Text/Muted ink 64% (= #3b2e29 at 72% opacity in the layers),
  Text/Soft taupe for heading second lines, Text/Faint ink 32% for dates.
- 2026-10-09 · Hero tag's gradient border is a masked `::before` in repo
  CSS (`designer-cant`); button shadows, glass blurs and the arrow chip
  are Designer styles.
- 2026-10-09 · Disabled button and field state added (40% opacity, no
  shadow); not in Figma.
- 2026-10-09 · Font: Inter 3.19 static (400, 500, 600; rsms/inter
  release, SIL OFL), to match Figma's metrics. Uploaded to Webflow as
  custom font "Inter" (font ids 6ac9633a93e3d071ae93b983 / …b997 /
  6ac9633a5ae875a49f5729ee); the prototype loads the same files from
  `public/fonts`. Family/Base switches to it in the variables batch (P5).
- 2026-10-12 · Fluid scaling 1440–1920 on the 1680 frame (Kajal):
  `--size-container-max: 1920px` in `src/styles.css` §01.
- 2026-10-12 · One content cap: Container/Max Width 98.75em (1580px) for
  every S Wrapper, the nav and the logo strip; S Rails and CTA Panel cap
  at 105em (1680px) so the vertical lines stay 50px outside the content.
- 2026-10-12 · Lines: a line between two sections spans the viewport
  (Section Is Ruled, the stats band and footer borders); a line inside a
  section stops at the rails (Rule). The contact panel touches the lines
  above and below it (Is Flush: no vertical padding).
- 2026-10-12 · Button height 48px (Button/Height 3em).
- 2026-10-12 · Social icons are Remix Icon (Apache 2.0) fills; all other
  icons stay Phosphor Bold.
- 2026-10-12 · Desktop layouts are fluid from 992 to 2560: grid columns
  in fr with `minmax(0, …)`, the nav is a `1fr auto 1fr` grid, checked
  for overflow and overlap at 19 widths.
- 2026-10-12 · Hero background: WebGL shader in place of the video in the
  prototype (`hero-shader.ts`, plain WebGL, no library). It recreates the
  Figma video: ribbed glass over a warm gradient, and every 6s a soft dark
  wave forms at the bottom-left and sweeps to the top-right. A light
  follows the pointer. Rib edges are anti-aliased in the shader; the
  canvas has a 2.5M-pixel budget and lowers its own resolution when
  frames run long. Poster image underneath as fallback; one still frame
  for reduced motion; paused off screen. Approved by Kajal and moved to
  the repo 2026-10-12; `hero-video` removed. The video file stays in
  `prototype/public/assets` as the source of the poster.
- 2026-10-09 · Small type deviations accepted for a consistent scale:
  research intro uses Body (lh 1.56, Figma 1.75); research heading
  tracking −6% (Figma −8%); "See More Insights" at 16px (Figma 15px);
  stat numbers tracking −4% (Figma −5%).

- 2026-10-12 · Rest of the home page built in the prototype (services, why,
  approach, case studies, industries, testimonials): **pending approval**,
  nothing of it is in Webflow or this repo yet. New classes are in
  `prototype/src/css/new-classes.css`, two new variables (Brand/Stone,
  Radius/16) in `proposed.css`; the style guide doesn't carry them yet
  (`pnpm check:style-guide` fails until it does).
- 2026-10-12 · Backgrounds, as asked by Kajal: the dark panels (AI
  technology, industries, the dark case card) get clean columns of orange
  light whose wave travels left to right in a 9 s loop, 1px dividers, no
  texture, no pointer reaction (`panel-shader`). The contact panel runs
  the hero shader in a dark palette (`data-shader-theme="dark"`). Orange
  cards and the diagram use Figma's textures as still images. PageSpeed is
  the priority: every canvas sits on a still image, the hero's starts
  after the first paint, the others when they near the viewport, and none
  of the lower ones run below 768px, with reduced motion or Save-Data.
  Not Figma's own shader runtime: it needs WebGPU and an experimental flag.
- 2026-10-12 · Testimonials: three cards fill the row, on the same grid as
  the three cards below; native scroll-snap, no slider library.

- 2026-10-13 · PageSpeed on staging (Kajal's priority): the loader no longer
  refetches the stylesheet (see GOTCHAS), the hero image is eager with high
  fetch priority. Local Lighthouse, with this machine's DNS stall switched
  off: mobile 96–98 (one 90 straight after a publish), desktop 99–100,
  0 ms blocking time. Not confirmed on Google's PageSpeed website yet.
  Possible next steps, not done: Inter subset to Latin (three files of
  ~100 KB), a metric-matched fallback font, production's wasted staging
  stylesheet request.

- 2026-10-13 · New home frame, differences kept on purpose (say if any
  should follow Figma exactly): H1 stays on the type scale at 64px (Figma
  69px); the services H2 uses D2 56px like every other section (Figma
  50px); content starts 110px in for every section (Figma varies 110–145);
  the contact panel keeps the dark hero shader (Figma: a blurred glow
  image); social icons stay Remix (Figma shows letters); Read more in the
  hero has a down caret, as the other Read more buttons, because it opens
  text in place (Figma: a right caret).
- 2026-10-13 · Service stage images are flattened from the Figma layers
  (source images from the `.fig`, composed without the white card) at
  1583px wide; the panel glows take the panel's colour
  (`data-glow-base`, `data-glow-strength` on the canvas; the repo's
  `panel-shader.ts` needs the same change when this is built).
- 2026-10-13 · Read more text comes from the copy doc: the design shows
  the first sentences, the button opens the rest of the same paragraph.
- 2026-10-13 · Contact form → HubSpot (Kajal): the designed form stays as
  built and posts to one HubSpot form through the Forms API from a repo
  module (no HubSpot embed, so no extra script or styling from HubSpot).
  Each field's `name` is the HubSpot property's internal name; the
  prototype uses HubSpot's defaults where they exist (`firstname`,
  `lastname`, `email`, `phone`, `website`, `city`, `message`). Needed from
  the HubSpot account: portal ID, form ID, the internal names and option
  values of the three dropdown properties (services, source, budget), the
  required fields and the consent wording. Webflow's own form handling is
  the alternative if submissions should also land in Webflow.

## Open decisions

| Item | Now | Options |
| --- | --- | --- |
| Template 0.3–0.4 changes not taken yet | Skills updated to template master `07a21f1` (0.4.5), new `wf:*` checks and skill links added | Move the prototype style guide to the template's fixed layout; take the template loader's `WFC.setCSS` (this repo has its own fix for the same problem, already installed); the Phosphor icon font (not needed: icons are inline SVG) |
| Tablet and mobile layouts | Claude's defaults: stacked hero, 2 / 1-column grids, 1-column FAQ, form below contact details | Designer supplies 991 / 767 / 479 frames, or approves the defaults |
| Nav dropdowns (Services, Industries) | Designed by Claude (no Figma frame), approved and built 2026-10-14; mechanism changed to Apple's (apple.ca) 2026-10-15 at Kajal's request: one Nav Flyout Card shared by both panels (height animates to the open panel, content swaps without closing), staggered fade of labels and links, Nav Curtain blurs and dims the page and the bar's background; first hover opens after 140ms, switching is immediate. Research and Case Studies are plain links | Designer can replace the panels; their links are static (components can't hold CMS lists) |
| Mobile menu | Designed by Claude, approved by Kajal and built 2026-10-14: full-screen espresso panel in G \| Nav W, numbered rows (Services and Industries open in place, Case Studies, Research, About), Speak With a Consultant, phone and email; `nav.ts` (dialog, scroll lock, focus trap) | About has no page yet (links to #) |
| States | Hover/focus/pressed are Claude's defaults (accent hover, darker accent, focus ring) | Designer confirms or supplies states; FAQ open state, form error and success |
| Button hover colour | Brand/Accent Dark `#e03f12` (not in Figma) | Designer picks the hover colour |
| Contact form spec | Fields as designed, stand-in select options, no submission target | Where submissions go, who is notified, success and error copy, the options for City, Services, Source, Budget, which fields are required |
| SEO fields for Home | Prototype title only | Title, meta description, slug, Open Graph image |
| FAQ answers | Filled 2026-10-15 from the old site's answers (adapted) | Client to review the wording, especially pricing and the drafted "approach" answer |
| Research articles | 39 posts imported from the old site; 4 placeholder studies remain | Real studies to replace the 4 placeholders, or unpublish them |
| Hero card link | Arrow button links to `#` | Where it goes |
| Logo strip | 7 logos from Figma, 80% opacity, `mix-blend-mode: exclusion` | Confirm logo usage rights |

## Stand-in assets and placeholders

- FAQ answers: "Answer to come." · client.
- Research cards: placeholder copy, "Category name", same image ×4 · client / designer.
- Links to pages that don't exist yet are `#`: nav items, footer link
  columns, social links, legal links, "See More Insights", the hero card
  arrow, "Get directions" · fill in as pages are built.
- Contact form select options are stand-ins · form spec.
- Services tabs: only "Organic Search Growth" has copy in Figma; the other
  three cards say "Placeholder copy" · client.
- "Read more" (why pillars, Vantage, Horizon): the expanded text isn't in
  Figma; panels say "Placeholder copy" · client.
- Case studies, industries and testimonials are static placeholders (one
  quote ×6, one avatar ×3) until their collections and pages exist ·
  client / designer. The featured case's figure reads "+168+" in Figma;
  the prototype shows "+168%" · designer to confirm.
