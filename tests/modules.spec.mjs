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

test('hero shader draws on its canvas, or leaves the poster when WebGL is missing', async ({ page }) => {
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
    return { webgl: !!gl, ready: canvas.dataset.heroShader, width: canvas.width };
  });
  expect(errors).toEqual([]);
  // With WebGL the module marks the canvas ready and sizes its buffer;
  // without it the module leaves the canvas alone and the image shows.
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
