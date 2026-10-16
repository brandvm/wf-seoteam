# SEO metadata, Open Graph, canonical and schema — plan

Written 2026-10-15 while the Webflow MCP was disconnected. Nothing here is
done yet. Rule of thumb, as for CSS: whatever Webflow does natively stays in
Webflow (page settings, CMS bindings); only what it can't do goes into
custom code, and that code is kept here in the repo as the source of truth.

> **Update 2026-10-15 (MCP reconnected):** the pages tool now writes a page's
> JSON-LD (`jsonLdSchema`, also on CMS templates) and its Open Graph image
> (`openGraph.imageAssetId`), so steps 3 and 6 need no Designer pasting.
> Done: Contact noindex removed; Open Graph copies the SEO title and
> description on every page.
>
> **Update 2026-10-16:** steps 3 and 6 done on staging and checked on all 88
> pages (HANDOFF 2026-10-16). Template schema with CMS fields turned out to
> be Designer-only (GOTCHAS). Confirmed by Kajal: phone (416) 360-3434,
> domain `https://www.seoteamtoronto.ca`. Still to do: step 5 (site-wide head
> tags in `loader.html`), step 7 (`wf:seo` check), step 4 at launch;
> socials for `sameAs` when the URLs exist.
>
> **Update 2026-10-16 (later):** step 5 done: the head code (loader.html
> piece 1, re-installed) adds `og:site_name` (SEO Team Toronto) and
> `og:locale` (en_CA), and `theme-color` is the light bar's `#fcfaf9`. No
> `twitter:site` until there is an X handle. Step 7 done: `pnpm wf:seo
> [url] [--canonical] [--json]` (scripts/wf-seo.mjs) crawls every page and
> fails on missing title, description or Open Graph tags, not exactly one
> h1, invalid JSON-LD or HTML entities in it, unexpected noindex, and (with
> --canonical, for production) a missing canonical. Staging: 90 pages, all
> pass. Warnings left: 25 titles over 60 characters (imported article Meta
> Titles and the case study pattern Name + " | SEO Team Case Study") and
> 3 article descriptions over 160. Fixed on the way: Arman Tale's Role "&"
> → "and" (Webflow wrote `&amp;` into the schema). Still to do: Rich
> Results Test on one page of each type.

## What staging outputs today (checked 2026-10-15 with curl)

| Tag | Webflow does it? | Now |
| --- | --- | --- |
| `<title>`, meta description | Yes, page settings (templates: bound fields) | Set on every page checked (Home, About, services, articles, case studies, listings, careers, legal, authors) |
| `og:title`, `og:description`, `twitter:*` | Yes, page settings ("same as SEO") | On Home, About, Services Template, Industries only. Missing on /research, /case-studies, Research, Case Studies and Authors templates, Careers, legal pages, Sitemap, 404 |
| `og:image` | Yes, page settings (upload, or bind an image field on templates) | None on any page |
| `og:type`, `twitter:card` | Yes, automatic with OG | Present where OG is set |
| `<link rel="canonical">` | Yes, once Site settings › SEO › Global canonical URL is set | None (no production domain yet) |
| `og:url`, `og:site_name`, `og:locale`, `twitter:site` | No | None |
| JSON-LD schema | No | None |
| `lang` | Yes (`en`, from the primary locale) | `lang="en"`; `en-CA` would come from the locale setting |
| sitemap.xml, robots.txt | Yes (site settings) | sitemap 404, robots empty |

## Steps when the MCP is back

### 1. Inventory (API, read-only)
`list_pages` with SEO and OG fields for every static page and template; write a
table of page → title (length), description (length), OG title/description,
noindex, and what's missing. Include utility pages (404, Sitemap, Style Guide,
Media, Contact).

### 2. Titles and descriptions (Webflow native, API)
- The 23 keyword-map pages already carry the doc's meta (content audit
  2026-10-15); don't change them.
- Draft the missing or weak ones (listing pages, careers, legal, 404,
  sitemap; template patterns already exist for articles, case studies and
  authors) within 50–60 / 140–160 characters → Kajal approves → write with
  `update_page_settings`.
- Case Studies Template description is Client + Stat Label ("PR and
  communications agency: Organic search clicks in six months…"); propose
  binding a proper field (Summary, or a new Meta Description field).

### 3. Open Graph (Webflow native)
- OG title/description "same as SEO" on every page: API if the page settings
  accept it, else Designer.
- OG image, Designer only (the API has no OG image setting):
  - A default 1200×630 image for static pages: designed in the prototype from
    the hero still and logo, approved, uploaded.
  - Template bindings: Research → Image, Case Studies → Photo, Authors →
    Photo, Services → a hero image field (Services has no per-page image yet:
    use the default, or add a field: Kajal decides).
  - Done through Claude in Chrome in the Designer, as with earlier Designer steps.

### 4. Canonical (Webflow native, at launch)
- Site settings › SEO › Global canonical tag URL = the production domain
  (`https://www.seoteamtoronto.ca`, www or apex to confirm). Webflow then
  writes a canonical on every static and CMS page; Finsweet's `?…_page=2`
  URLs canonicalise to the clean path.
- Site settings › SEO has no API (`webflow-build/starter-site.md` §G): a
  person or a browser session sets it, together with Auto-generate sitemap.
- Not on staging: a canonical pointing at a domain the site isn't served from
  yet would be wrong. Instead switch on "Disable Webflow subdomain indexing"
  (asked before, still unanswered).
- No per-page canonical code is needed unless a page should point elsewhere
  (none known).

### 5. Site-wide tags Webflow doesn't write (custom code, head)
`og:site_name` (SEO Team Toronto), `og:locale` (`en_CA`), `twitter:site` (if
there is an X handle), `theme-color` (the template's head conventions,
`webflow-build/conventions.md` §9). Added to the head snippet in `loader.html` and
re-installed with `set_site_freeform_code` (snippets are not versioned:
re-paste and publish, say so in the commit).
`og:url` is optional (platforms fall back to the page URL); if wanted, it goes
in the per-page code with the schema, after the canonical domain is known.

### 6. Schema (JSON-LD, custom code)
Webflow has no schema feature. Each block lives in page settings › Custom code
› Inside `<head>`; on CMS templates the same box accepts CMS fields
("+ Add field"), so items stay in sync with no script. Source of truth:
`docs/seo/schema/<page>.jsonld` in this repo; pasted into Webflow through
Claude in Chrome (the Data API only registers JavaScript, not
`application/ld+json`; check the MCP's scripts tool first in case that has
changed).

| Page(s) | Types | Key data |
| --- | --- | --- |
| Home | `Organization` (+ `ProfessionalService` with address), `WebSite` | name, logo, url, address 60 Bloor St W Suite 401 Toronto ON M4W 3B8, phone +1 416 360 3434, email, opening hours Mon–Fri 9–6, areaServed Toronto/Canada, sameAs (socials) |
| About | `AboutPage`, reference to the Organization `@id` | |
| Contact | `ContactPage` + `ContactPoint` | phone, email, hours |
| Services Template (22) | `Service` (provider = Organization `@id`, areaServed, name and description from fields), `BreadcrumbList` from Breadcrumb Parent / Link fields | |
| Industries page, /research, /case-studies | `CollectionPage`, `BreadcrumbList` | |
| Research Template | `BlogPosting` (headline, description, image, datePublished, dateModified, author `Person` → /authors/slug, publisher → Organization), `BreadcrumbList` | |
| Authors Template | `ProfilePage` with `Person` (name, jobTitle, worksFor, image, sameAs LinkedIn) | |
| Case Studies Template | `Article`, `BreadcrumbList` | anonymised client, no reviews/ratings |
| Careers | `WebPage` only; `JobPosting` only when real roles with salary/location exist | |
| Legal, Sitemap, 404 | none | |

Not used: `FAQPage` (Google shows FAQ rich results only for government and
health sites now; the markup can be added to Home later if wanted, it does
no harm), `Review`/`AggregateRating` for the agency itself (self-serving
reviews aren't eligible).

Risk (skill lesson `webflow-build/lessons/designer.md`, 2026-10-09):
Webflow inserts CMS values into custom code raw. A line break or `"` in a
bound field makes the JSON invalid, and apostrophes come out as `&#39;`
(valid, wrong text). Bind single-line fields only (name, slug, dates,
image, Meta Title/Description after checking them for quotes and line
breaks), and validate every CMS page after a schema change, not a sample.

### 7. Verification (repo)
A `wf:seo` check (Playwright, every published URL): one `<title>` ≤ 60,
description 50–160, OG title/description/image present, canonical present
(after launch), exactly one `<h1>`, every JSON-LD block parses and has
`@context`/`@type`, no `noindex` except the intended pages. Then Google's
Rich Results Test on one page of each type.

## Needed from the client / Kajal
- Confirm the NAP shown on About (60 Bloor St W, Suite 401; (416) 360-3434;
  info@seoteamtoronto.ca; Mon–Fri 9–6) is the official one for schema.
- Social profile URLs and the X handle (footer socials are still `#`).
- Production domain (www or apex) for canonicals.
- Approve the default OG image and the drafted meta copy.
- ~~Contact page: stays `noindex`?~~ Decided 2026-10-15 (Kajal): remove the
  `noindex` from /contact (step 1: find whether it sits in the page head
  code or the page's SEO setting, remove it, publish, check the tag is gone).

## Order
1 → 2 (approval) → 3 → 5 → 6 (approval of the JSON-LD files) → publish →
7. Step 4 and subdomain indexing at launch with the redirects in
BUILD-NOTES.
