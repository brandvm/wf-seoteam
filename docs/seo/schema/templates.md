# Template schema (CMS pages)

Pasted into each template's page settings › Schema markup in the Designer;
every `{Field}` is inserted with "+ Add field" (the API can't write Webflow's
field tokens: they aren't valid JSON, GOTCHAS 2026-10-16). Only single-line
fields are bound (skill lesson: line breaks break the JSON; apostrophes come
out as `&#39;`, valid but visible to Google as entities). Domain:
`https://www.seoteamtoronto.ca` (confirmed by Kajal 2026-10-16; phone +1-416-360-3434).

## Services Template — `/services/{Slug}`

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.seoteamtoronto.ca/services/{Slug}#service",
      "name": "{Page Title}",
      "description": "{Meta Description}",
      "url": "https://www.seoteamtoronto.ca/services/{Slug}",
      "serviceType": "{Name}",
      "provider": { "@id": "https://www.seoteamtoronto.ca/#organization" },
      "areaServed": [ { "@type": "City", "name": "Toronto" }, { "@type": "Country", "name": "Canada" } ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.seoteamtoronto.ca/" },
        { "@type": "ListItem", "position": 2, "name": "{Name}", "item": "https://www.seoteamtoronto.ca/services/{Slug}" }
      ]
    }
  ]
}
```
The page's three-level breadcrumb (Breadcrumb Parent) isn't in the schema:
the middle level is empty on top-level services, and an empty list item is
invalid. Two levels are correct for every page.

## Research Template — `/research/{Slug}`

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://www.seoteamtoronto.ca/research/{Slug}#article",
  "mainEntityOfPage": "https://www.seoteamtoronto.ca/research/{Slug}",
  "headline": "{Name}",
  "description": "{Meta Description}",
  "image": "{Image}",
  "datePublished": "{Published}",
  "dateModified": "{Updated On}",
  "author": {
    "@type": "Person",
    "name": "{Author Profile › Name}",
    "url": "https://www.seoteamtoronto.ca/authors/{Author Profile › Slug}"
  },
  "publisher": { "@id": "https://www.seoteamtoronto.ca/#organization" }
}
```
Dates need ISO format: pick the ISO option in the field chip's format menu.
"SEO Team Research" is an author profile, not a person: Google accepts an
Organization author, so its profile could switch `@type` to Organization;
left as Person for both until real authors are confirmed.

## Case Studies Template — `/case-studies/{Slug}`

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://www.seoteamtoronto.ca/case-studies/{Slug}#article",
  "mainEntityOfPage": "https://www.seoteamtoronto.ca/case-studies/{Slug}",
  "headline": "{Name}",
  "description": "{Client}: {Stat Label}. A case study from SEO Team Toronto.",
  "image": "{Photo}",
  "dateModified": "{Updated On}",
  "author": { "@id": "https://www.seoteamtoronto.ca/#organization" },
  "publisher": { "@id": "https://www.seoteamtoronto.ca/#organization" }
}
```
No `Review` or rating: the clients are anonymous and self-published reviews
aren't eligible.

## Authors Template — `/authors/{Slug}`

```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "url": "https://www.seoteamtoronto.ca/authors/{Slug}",
  "mainEntity": {
    "@type": "Person",
    "name": "{Name}",
    "jobTitle": "{Role}",
    "image": "{Photo}",
    "worksFor": { "@type": "Organization", "name": "{Company}" },
    "sameAs": [ "{LinkedIn}" ]
  }
}
```
