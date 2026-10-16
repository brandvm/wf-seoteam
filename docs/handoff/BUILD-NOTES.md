# Build notes

What the build handoff needs (see the skill's `checklists.md` › Build
handoff). Kept current during the build, not written at the end. No
credentials here: name the vault entry instead.

## CMS notes

How to edit what: each collection and its fields, which sections are
conditional on which field, and each component's props.

| Collection / component | How to edit | Notes |
| --- | --- | --- |
| | | |

## Integrations

| Service | What it does | Where it's configured | Vault entry |
| --- | --- | --- | --- |
| | | | |

## Changes log

Changes made during the build that differ from the approved design, and
who approved them.

- <Date> · <change> · <approved by>

## Redirect map

Every old URL → its closest new page. Source: the live seoteamtoronto.ca
sitemap (2026-10-15: `/`, `/about-us`, `/contact`, 11 services, 12 case
studies, 36 blog posts) and the CMS exports in `../Assets/reference/`.
Unchanged paths need no rule: `/`, `/contact` and the nine service slugs that
exist on the new site. Set these in Site settings › Publishing › 301
redirects before the domain moves (the regex row is one rule).

| Old URL | New URL | Status |
| --- | --- | --- |
| `/about-us` | `/about` | 301 |
| `/services/ai-readiness` | `/services/generative-engine-optimization` | 301 |
| `/services/ppc-management` | `/services/ppc-agency` | 301 |
| `/case-studies/personal-injury-law-local-seo-toronto` | `/case-studies/toronto-personal-injury-law-firm` | 301 |
| `/case-studies/pr-agency-content-seo-toronto` | `/case-studies/pr-and-communications-agency` | 301 |
| `/case-studies/enterprise-retail-tech-technical-seo` | `/case-studies/retail-technology-company` | 301 |
| `/case-studies/custom-home-builder-seo-ppc-toronto` | `/case-studies/custom-home-builder` | 301 |
| `/case-studies/nonprofit-seo-toronto` | `/case-studies/career-support-nonprofit` | 301 |
| `/case-studies/financial-services-content-seo` | `/case-studies/financial-services-provider` | 301 |
| `/case-studies/environmental-consulting-technical-seo` | `/case-studies/environmental-consulting-firm` | 301 |
| `/case-studies/construction-engineering-technical-seo` | `/case-studies` (no new page) | 301 |
| `/case-studies/commercial-liquidation-local-seo-toronto` | `/case-studies` (no new page) | 301 |
| `/case-studies/home-renovation-contractor-seo-ppc-toronto` | `/case-studies` (no new page) | 301 |
| `/case-studies/creative-agency-content-seo-toronto` | `/case-studies` (no new page) | 301 |
| `/blog/seo-for-real-estate-agents` | `/services/real-estate-seo-agency` (article removed, client 2026-10-16) | 301 |
| `/blog/seo-for-dentists` | `/services/dental-seo-agency` (article removed, client 2026-10-16) | 301 |
| `/blog/seo-for-lawyers` | `/services/law-firm-seo-agency` (article removed, client 2026-10-16) | 301 |
| `/blog` | `/research` | 301 |
| `/blog/(.*)` | `/research/%1` (all 39 posts kept their slugs) | 301 |

## Known issues

### Fix before launch

- <issue> · <owner>

### Fix after launch

- <issue> · <owner>
