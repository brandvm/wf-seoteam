import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

// The project modules, run from the built bundle against the markup the
// Webflow build publishes (data-* hooks only; class names don't matter).
const js = readFileSync(new URL('../dist/index.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../dist/styles.css', import.meta.url), 'utf8');

const html = `
  <nav class="g-nav"><div class="nav-menu" id="nav-menu" data-nav-menu><a href="#faq">FAQ</a></div>
    <button type="button" aria-expanded="false" aria-controls="nav-menu" data-nav-toggle>Menu</button></nav>
  <div id="faq"><h3><button class="faq-trigger" type="button" aria-expanded="false" aria-controls="faq-1" data-faq-trigger>Question</button></h3>
    <div class="faq-panel" id="faq-1" hidden><p>Answer</p></div></div>`;

async function open(page) {
  await page.setContent(`<style>${css}</style>${html}`);
  await page.addScriptTag({ content: js });
}

test('faq trigger opens and closes its panel', async ({ page }) => {
  await open(page);
  const trigger = page.locator('[data-faq-trigger]');
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#faq-1')).toBeVisible();
  await trigger.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#faq-1')).toBeHidden();
});

test('nav toggle opens the menu; Escape and a link click close it', async ({ page }) => {
  await open(page);
  const toggle = page.locator('[data-nav-toggle]');
  const nav = page.locator('nav');
  await toggle.click();
  await expect(nav).toHaveClass(/is-open/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(nav).not.toHaveClass(/is-open/);
  await toggle.click();
  await page.locator('[data-nav-menu] a').click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('hero shader draws on its canvas, or leaves the poster when WebGL is missing or software-rendered', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.setContent(`<style>${css}</style><div style="position:relative;width:800px;height:500px">
    <img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" alt=""><canvas data-hero-shader style="position:absolute;inset:0;width:100%;height:100%"></canvas></div>`);
  await page.addScriptTag({ content: js });
  // The shader starts after load, two frames and idle time (first paint first).
  await page.waitForTimeout(1800);
  const state = await page.evaluate(() => {
    const canvas = document.querySelector('[data-hero-shader]');
    const gl = document.createElement('canvas').getContext('webgl');
    // The module also stays off where WebGL is drawn by the CPU (CI, lab machines).
    const info = gl && gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = gl ? String(info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)) : '';
    const hardware = !!gl && !/swiftshader|llvmpipe|software|basic render/i.test(renderer);
    return { webgl: hardware, ready: canvas.dataset.heroShader, width: canvas.width };
  });
  expect(errors).toEqual([]);
  // With hardware WebGL the module marks the canvas ready and sizes its
  // buffer; otherwise it leaves the canvas alone and the image shows.
  if (state.webgl) {
    expect(state.ready).toBe('ready');
    expect(state.width).toBeGreaterThan(300);
  } else {
    expect(state.ready).toBe('');
  }
});

test('tabs switch panels, mark the active tab and follow the arrow keys', async ({ page }) => {
  await page.setContent(`<div data-tabs><div role="tablist">
    <button type="button" role="tab" id="t1" aria-controls="p1" aria-selected="true" class="is-active" data-tabs-tab>One</button>
    <button type="button" role="tab" id="t2" aria-controls="p2" aria-selected="false" tabindex="-1" data-tabs-tab>Two</button></div>
    <div id="p1" role="tabpanel" data-tabs-panel>First</div><div id="p2" role="tabpanel" hidden data-tabs-panel>Second</div></div>`);
  await page.addScriptTag({ content: js });
  await page.locator('#t2').click();
  await expect(page.locator('#t2')).toHaveClass(/is-active/);
  await expect(page.locator('#t2')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#p2')).toBeVisible();
  await expect(page.locator('#p1')).toBeHidden();
  await page.keyboard.press('ArrowUp');
  await expect(page.locator('#t1')).toBeFocused();
  await expect(page.locator('#p1')).toBeVisible();
});

test('tabs and panels from CMS lists pair by position, get ids and numbers', async ({ page }) => {
  // Two Collection Lists: no ids, no aria-controls, every panel visible.
  await page.setContent(`<div data-tabs>
    <div class="w-dyn-items" role="list">${[1, 2, 3].map((n) => `<div class="w-dyn-item" role="listitem"><button type="button" data-tabs-tab><span data-tabs-number></span>Tab ${n}</button></div>`).join('')}</div>
    <div class="w-dyn-items" role="list">${[1, 2, 3].map((n) => `<div class="w-dyn-item" role="listitem"><div data-tabs-panel><span data-tabs-step></span>Panel ${n}</div></div>`).join('')}</div></div>`);
  await page.addScriptTag({ content: js });
  const tabs = page.locator('[data-tabs-tab]');
  const panels = page.locator('[data-tabs-panel]');
  await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
  await expect(tabs.nth(1)).toContainText('02');
  await expect(panels.nth(2)).toContainText('3Panel 3');
  await expect(panels.nth(0)).toBeVisible();
  await expect(panels.nth(1)).toBeHidden();
  const controls = await tabs.nth(1).getAttribute('aria-controls');
  expect(controls).toBe(await panels.nth(1).getAttribute('id'));
  await expect(page.locator('[role="tablist"] [role="presentation"] [role="tab"]')).toHaveCount(3);
  // No list role left around the panels (ARIA: a list must hold list items).
  await expect(page.locator('[data-tabs] [role="list"], [data-tabs] [role="listitem"]')).toHaveCount(0);
  await expect(page.locator('[role="tabpanel"]')).toHaveCount(3);
  await tabs.nth(2).click();
  await expect(panels.nth(2)).toBeVisible();
  await expect(panels.nth(0)).toBeHidden();
});

test('faq items from a CMS list open their own answer without ids', async ({ page }) => {
  await page.setContent(`${[1, 2].map((n) => `<div data-faq-item><h3><button type="button" data-faq-trigger>Q${n}</button></h3><div data-faq-panel><p>A${n}</p></div></div>`).join('')}`);
  await page.addScriptTag({ content: js });
  const triggers = page.locator('[data-faq-trigger]');
  const answers = page.locator('[data-faq-panel]');
  await expect(answers.nth(0)).toBeHidden();
  await triggers.nth(1).click();
  await expect(triggers.nth(1)).toHaveAttribute('aria-expanded', 'true');
  await expect(answers.nth(1)).toBeVisible();
  await expect(answers.nth(0)).toBeHidden();
  expect(await triggers.nth(1).getAttribute('aria-controls')).toBe(await answers.nth(1).getAttribute('id'));
});

test('slider arrows scroll the track and the counter follows', async ({ page }) => {
  await page.setContent(`<div data-slider style="width:300px"><button type="button" data-slider-prev>Prev</button><button type="button" data-slider-next>Next</button>
    <span data-slider-current>01</span>/<span data-slider-total>00</span>
    <div data-slider-track style="display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory">
      ${[1, 2, 3, 4].map((n) => `<div data-slider-item style="flex:none;width:300px;height:50px;scroll-snap-align:start">${n}</div>`).join('')}</div></div>`);
  await page.addScriptTag({ content: js });
  await expect(page.locator('[data-slider-total]')).toHaveText('04');
  await expect(page.locator('[data-slider-prev]')).toBeDisabled();
  await page.locator('[data-slider-next]').click();
  await expect(page.locator('[data-slider-current]')).toHaveText('02');
  await expect(page.locator('[data-slider-prev]')).toBeEnabled();
});

test('modules do nothing on a page without their markup', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => message.type() === 'error' && errors.push(message.text()));
  await page.setContent('<main><p>Plain page</p></main>');
  await page.addScriptTag({ content: js });
  expect(errors).toEqual([]);
});

test('share links get the network URL for this page; copy writes it to the clipboard', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'https://example.test' });
  await page.route('https://example.test/research/a-study', (route) => route.fulfill({ contentType: 'text/html', body: `<title>A study</title>
    <a href="#" data-share="linkedin">in</a><a href="#" data-share="x">x</a><a href="#" data-share="facebook">f</a>
    <button type="button" data-share="copy" aria-label="Copy link">copy</button>` }));
  await page.goto('https://example.test/research/a-study');
  await page.addScriptTag({ content: js });
  const url = encodeURIComponent(await page.evaluate(() => location.origin + location.pathname));
  await expect(page.locator('[data-share="linkedin"]')).toHaveAttribute('href', `https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
  await expect(page.locator('[data-share="x"]')).toHaveAttribute('href', new RegExp('^https://twitter.com/intent/tweet\\?url='));
  await expect(page.locator('[data-share="facebook"]')).toHaveAttribute('target', '_blank');
  await page.locator('[data-share="copy"]').click();
  await expect(page.locator('[data-share="copy"]')).toHaveAttribute('aria-label', 'Link copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('https://example.test/research/a-study');
});

test('nav marks the section of the current path', async ({ page }) => {
  await page.route('https://example.test/research/a-study', (route) => route.fulfill({ contentType: 'text/html', body:
    `<nav><div data-nav-menu><button data-nav-section="/research /authors">Research</button><a data-nav-section="/case-studies" href="#">Cases</a></div><button data-nav-toggle aria-expanded="false">Menu</button></nav>` }));
  await page.goto('https://example.test/research/a-study');
  await page.addScriptTag({ content: js });
  await expect(page.locator('[data-nav-section="/research /authors"]')).toHaveAttribute('aria-current', 'true');
  await expect(page.locator('[data-nav-section="/case-studies"]')).not.toHaveAttribute('aria-current', 'true');
});

test('the Finsweet loader lists every bundled attribute and adds fs-bundle.js only where they are used', async ({ page }) => {
  const registry = readFileSync(new URL('../src/modules/finsweet-registry.ts', import.meta.url), 'utf8');
  const loader = readFileSync(new URL('../src/modules/finsweet-loader.ts', import.meta.url), 'utf8');
  const bundled = [...registry.matchAll(/^\s+(\w+): \(\) => import/gm)].map((m) => m[1]).sort();
  const listed = JSON.parse(loader.match(/NAMES = (\[[^\]]*\])/)[1].replace(/'/g, '"')).sort();
  expect(listed).toEqual(bundled);
  await page.route('https://example.test/**', (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path.endsWith('index.js')) return route.fulfill({ contentType: 'text/javascript', body: js });
    if (path.endsWith('fs-bundle.js')) return route.fulfill({ contentType: 'text/javascript', body: '' });
    return route.fulfill({ contentType: 'text/html', body: path === '/list' ? '<div fs-list-element="list"></div>' : '<p>Plain</p>' });
  });
  for (const [path, expected] of [['/plain', 0], ['/list', 1]]) {
    await page.goto(`https://example.test${path}`);
    await page.addScriptTag({ url: 'https://example.test/dist/index.js?v=7' });
    await expect(page.locator('script[data-fs-bundle]')).toHaveCount(expected);
    if (expected) await expect(page.locator('script[data-fs-bundle]')).toHaveAttribute('src', 'https://example.test/dist/fs-bundle.js?v=7');
  }
});

test('the All chip is active only while no topic is chosen', async ({ page }) => {
  await page.setContent(`<style>${css}</style><form fs-list-element="filters">
    <label class="chip is-active" data-filter-all="is-active">All</label>
    <label class="chip"><input type="radio" name="topic" value="a">A</label>
    <label class="chip"><input type="radio" name="topic" value="b">B</label></form>`);
  await page.addScriptTag({ content: js });
  const all = page.locator('[data-filter-all]');
  await expect(all).toHaveClass(/is-active/);
  await page.locator('input[value="a"]').check();
  await expect(all).not.toHaveClass(/is-active/);
  await page.evaluate(() => { document.querySelector('input[value="a"]').checked = false; });
  await all.click();
  await expect(all).toHaveClass(/is-active/);
});

test('mobile menu opens as a dialog, locks scroll, keeps focus inside and closes on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.setContent(`<style>${css}</style><div class="g-nav-w"><nav><button type="button" aria-expanded="false" data-nav-toggle>Menu</button></nav>
    <div class="mobile-menu" role="dialog" aria-modal="true" data-mobile-menu hidden>
      <button type="button" data-nav-close>Close</button><a href="#a">A</a><a href="#b">B</a></div></div>`);
  await page.addScriptTag({ content: js });
  const toggle = page.locator('[data-nav-toggle]');
  const menu = page.locator('[data-mobile-menu]');
  await toggle.click();
  await expect(menu).toBeVisible();
  await expect(menu).toHaveClass(/is-open/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('html')).toHaveClass(/is-menu-open/);
  await expect(page.locator('[data-nav-close]')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('a[href="#b"]')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(page.locator('html')).not.toHaveClass(/is-menu-open/);
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.locator('a[href="#a"]').click();
  await expect(menu).toBeHidden();
});

test('desktop dropdowns share one flyout card: switch without closing, height follows the panel, close on Escape, curtain and outside clicks', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.setContent(`<style>${css}.nav-curtain,.nav-flyout{display:none}.nav-curtain{position:fixed;inset:0}.nav-flyout{position:absolute;left:0;right:0;top:100%}.nav-flyout-card{position:relative;overflow:hidden}.nav-panel{position:absolute;left:0;right:0;top:0;visibility:hidden}</style>
    <div class="g-nav-w" data-nav style="position:fixed;top:0;left:0;right:0;height:60px"><div class="nav-curtain" data-nav-curtain></div><nav style="position:relative">
      <button class="nav-link" type="button" aria-expanded="false" aria-controls="p-services" data-nav-dropdown>Services</button>
      <button class="nav-link" type="button" aria-expanded="false" aria-controls="p-industries" data-nav-dropdown>Industries</button></nav>
    <div class="nav-flyout" data-nav-flyout><div class="nav-flyout-card" data-nav-flyout-card>
      <div class="nav-panel" id="p-services" data-nav-panel><div class="nav-panel-inner" style="height:300px"><div class="nav-panel-list"><a href="#a">A</a></div></div></div>
      <div class="nav-panel" id="p-industries" data-nav-panel><div class="nav-panel-inner" style="height:200px"><div class="nav-panel-list"><a href="#b">B</a></div></div></div>
    </div></div></div>
    <main style="height:1200px;padding-top:60px"><p>Page</p></main>`);
  await page.addScriptTag({ content: js });
  const services = page.locator('[aria-controls="p-services"]');
  const industries = page.locator('[aria-controls="p-industries"]');
  const card = page.locator('[data-nav-flyout-card]');
  const height = () => card.evaluate((el) => el.style.height);
  await services.click();
  await expect(services).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#p-services')).toBeVisible();
  await expect(page.locator('[data-nav-curtain]')).toHaveClass(/is-visible/);
  expect(await height()).toBe('300px');
  await industries.click();
  await expect(services).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#p-services')).toBeHidden();
  await expect(page.locator('#p-industries')).toBeVisible();
  await expect(page.locator('[data-nav-flyout]')).toHaveClass(/is-open/); // same card, never closed
  expect(await height()).toBe('200px');
  await page.keyboard.press('Escape');
  await expect(industries).toHaveAttribute('aria-expanded', 'false');
  await expect(industries).toBeFocused();
  expect(await height()).toBe('0px');
  // opened from the keyboard with the pointer resting on the page: stays open
  await page.mouse.move(600, 600);
  await services.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(400);
  await expect(page.locator('#p-services')).toBeVisible();
  // a short pause before a hover opens, then moving over the page closes it
  await page.keyboard.press('Escape');
  await services.hover();
  await expect(page.locator('#p-services')).toBeVisible();
  await page.mouse.move(600, 650, { steps: 4 });
  await expect(page.locator('#p-services')).toBeHidden();
  await services.click();
  await page.mouse.click(5, 790);
  await expect(page.locator('#p-services')).toBeHidden();
});

test('the nav takes its light class while the page is scrolled', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 600 });
  await page.setContent(`<div class="g-nav-w" data-nav data-nav-scroll-class="w-variant-x" style="position:fixed;top:0"></div><main style="height:3000px"></main>`);
  await page.addScriptTag({ content: js });
  const nav = page.locator('.g-nav-w');
  await expect(nav).not.toHaveClass(/w-variant-x/);
  await page.mouse.wheel(0, 400);
  await expect(nav).toHaveClass(/w-variant-x/);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(nav).not.toHaveClass(/w-variant-x/);
});

test('with data-nav-scroll-deep the light class also goes on everything in the bar', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 600 });
  await page.setContent(`<div class="g-nav-w" data-nav data-nav-scroll-class="w-variant-x" data-nav-scroll-deep style="position:fixed;top:0"><nav><a class="nav-link" href="#">A</a></nav><div class="nav-flyout"><a class="nav-panel-link" href="#">B</a></div></div><main style="height:3000px"></main>`);
  await page.addScriptTag({ content: js });
  await page.mouse.wheel(0, 400);
  await expect(page.locator('.nav-link')).toHaveClass(/w-variant-x/);
  await expect(page.locator('.nav-panel-link')).not.toHaveClass(/w-variant-x/);
});

test('case study bars take their width from data-bar-ratio', async ({ page }) => {
  await page.setContent(`<style>${css}.f{width:50%;height:4px}</style><div style="width:200px"><div class="f" data-bar-ratio="46"></div><div class="f" data-bar-ratio="abc"></div><div class="f" data-bar-ratio="140"></div></div>`);
  await page.addScriptTag({ content: js });
  const widths = await page.$$eval('.f', (els) => els.map((e) => Math.round(e.getBoundingClientRect().width)));
  expect(widths).toEqual([92, 100, 100]);
});
