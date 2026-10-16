#!/usr/bin/env node
// wf:seo — SEO tag check for every published page (SEO-PLAN step 7).
//
//   pnpm wf:seo                       # staging (webflow-build.config.json)
//   pnpm wf:seo https://www.example.com --canonical   # production: canonical required
//   pnpm wf:seo --json                # machine-readable result
//
// Finds pages from /sitemap.xml, or, while Webflow doesn't generate one
// (staging, no paid plan), by crawling internal links from / and /sitemap.
// Reads the published HTML only (no browser): every tag checked here is
// server-rendered by Webflow or the head code.
//
// Errors (exit 1): missing <title>, meta description, og:title,
// og:description, og:image, og:site_name or og:locale; not exactly one <h1>;
// JSON-LD that doesn't parse or has no @context/@type; an HTML entity
// inside JSON-LD text (Webflow's &#39; for apostrophes); noindex on a page
// outside the allow list; a page that doesn't return 200; with
// --canonical, a missing canonical.
// Warnings: title over 60 characters, description outside 50–160.
// Project script for now; a template candidate (it would sit next to the
// skill's wf:* checks).

import { readFileSync } from 'node:fs';

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const config = JSON.parse(readFileSync(new URL('../webflow-build.config.json', import.meta.url), 'utf8'));
const base = (args.find((a) => !a.startsWith('--')) || config.stagingUrl).replace(/\/$/, '');
const origin = new URL(base).origin;
const requireCanonical = flags.has('--canonical');
const asJson = flags.has('--json');

// Pages that are meant to be hidden from search engines.
const NOINDEX_OK = [/^\/design\//];
// Pages without a page-type schema by plan (SEO-PLAN step 6).
const NO_SCHEMA_OK = [/^\/(privacy-policy|terms|accessibility|sitemap|careers|404)$/];
const MAX_PAGES = 600;

async function get(url) {
  const res = await fetch(url, { redirect: 'follow', headers: { 'cache-control': 'no-cache' } });
  return { status: res.status, url: res.url, html: res.ok ? await res.text() : '' };
}

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i'));
  return m ? (m[2] ?? m[3]) : null;
};
const metas = (html) => [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
const meta = (html, key, value) => metas(html).find((t) => (attr(t, key) || '').toLowerCase() === value);
const content = (tag) => (tag ? attr(tag, 'content') : null);
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

function internalLinks(html, from) {
  const out = new Set();
  for (const m of html.matchAll(/<a\b[^>]*\bhref\s*=\s*"([^"#?]*)/gi)) {
    let href = m[1];
    if (!href || /^(mailto|tel|javascript):/i.test(href)) continue;
    try {
      const u = new URL(href, from);
      if (u.origin !== origin) continue;
      if (/\.(pdf|jpg|jpeg|png|webp|svg|zip|xml|txt)$/i.test(u.pathname)) continue;
      out.add(u.pathname.replace(/\/$/, '') || '/');
    } catch { /* ignore bad hrefs */ }
  }
  return out;
}

async function discover() {
  const sitemap = await get(`${base}/sitemap.xml`).catch(() => ({ status: 0, html: '' }));
  if (sitemap.status === 200 && sitemap.html.includes('<loc>')) {
    return { source: 'sitemap.xml', paths: [...sitemap.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/\/$/, '') || '/') };
  }
  const seen = new Set();
  const queue = ['/', '/sitemap'];
  const pages = new Map();
  while (queue.length && seen.size < MAX_PAGES) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    seen.add(path);
    const page = await get(base + path).catch(() => ({ status: 0, html: '' }));
    pages.set(path, page);
    for (const link of internalLinks(page.html, base + path)) if (!seen.has(link)) queue.push(link);
  }
  return { source: 'crawl', paths: [...seen], pages };
}

function check(path, page) {
  const errors = [];
  const warnings = [];
  const html = page.html;
  if (page.status !== 200) {
    errors.push(`HTTP ${page.status}`);
    return { path, errors, warnings };
  }
  const titles = [...html.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map((m) => decode(m[1].trim()));
  if (titles.length !== 1 || !titles[0]) errors.push(titles.length ? `${titles.length} <title> tags` : 'no <title>');
  else if (titles[0].length > 60) warnings.push(`title ${titles[0].length} chars`);

  const desc = content(meta(html, 'name', 'description'));
  if (!desc) errors.push('no meta description');
  else if (decode(desc).length < 50 || decode(desc).length > 160) warnings.push(`description ${decode(desc).length} chars`);

  for (const p of ['og:title', 'og:description', 'og:image', 'og:site_name', 'og:locale']) {
    if (!content(meta(html, 'property', p))) errors.push(`no ${p}`);
  }

  const canonical = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/gi)].map((m) => attr(m[0], 'href'));
  if (requireCanonical && canonical.length !== 1) errors.push(canonical.length ? `${canonical.length} canonicals` : 'no canonical');

  const h1 = (html.match(/<h1\b/gi) || []).length;
  if (h1 !== 1) errors.push(`${h1} <h1>`);

  const robots = content(meta(html, 'name', 'robots')) || '';
  if (/noindex/i.test(robots) && !NOINDEX_OK.some((re) => re.test(path))) errors.push('noindex');

  const blocks = [...html.matchAll(/<script\b[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  const types = [];
  for (const block of blocks) {
    let data;
    try { data = JSON.parse(block); } catch (e) { errors.push(`JSON-LD does not parse (${String(e.message).slice(0, 60)})`); continue; }
    const items = Array.isArray(data) ? data : data['@graph'] ? data['@graph'] : [data];
    if (!(Array.isArray(data) ? data[0]?.['@context'] : data['@context'])) errors.push('JSON-LD without @context');
    for (const item of items) {
      if (!item['@type']) errors.push('JSON-LD item without @type');
      else types.push(item['@type']);
    }
    if (/&(#\d+|#x[0-9a-f]+|amp|quot|lt|gt);/i.test(JSON.stringify(data))) errors.push('HTML entity inside JSON-LD');
  }
  const noindexOk = NOINDEX_OK.some((re) => re.test(path));
  if (!blocks.length && !noindexOk && !NO_SCHEMA_OK.some((re) => re.test(path))) warnings.push('no JSON-LD');

  return { path, errors, warnings, title: titles[0], types: types.flat() };
}

const found = await discover();
const results = [];
for (const path of found.paths.sort()) {
  const page = found.pages?.get(path) ?? (await get(base + path).catch(() => ({ status: 0, html: '' })));
  results.push(check(path, page));
}

const failed = results.filter((r) => r.errors.length);
const warned = results.filter((r) => r.warnings.length);
if (asJson) {
  console.log(JSON.stringify({ base, source: found.source, pages: results.length, failed: failed.length, results }, null, 2));
} else {
  console.log(`wf:seo ${base} — ${results.length} pages (${found.source})${requireCanonical ? ', canonical required' : ''}`);
  const counts = {};
  for (const r of results) for (const e of r.errors) { const k = e.replace(/\(.*\)|\d+/g, '#'); counts[k] = (counts[k] || 0) + 1; }
  for (const r of failed) console.log(`  ✗ ${r.path}: ${r.errors.join('; ')}`);
  for (const r of warned) console.log(`  ! ${r.path}: ${r.warnings.join('; ')}`);
  if (Object.keys(counts).length) console.log('errors by kind:', counts);
  console.log(failed.length ? `${failed.length} page(s) with errors, ${warned.length} with warnings` : `all pages pass (${warned.length} with warnings)`);
}
process.exit(failed.length ? 1 : 0);
