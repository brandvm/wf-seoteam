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
