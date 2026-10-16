// HubSpot form: a [data-hubspot-form] element (the contact card) gets the
// client's HubSpot form through HubSpot's embed script, styled to look like
// the designed form. The form has CAPTCHA on, which HubSpot's submission API
// refuses, so the embed is the only way in (GOTCHAS 2026-10-16).
//
// Webflow attributes: data-portal-id, data-form-id, data-region (na1) and
// data-note (the line beside the button). HubSpot's script loads only when
// the card nears the viewport. The form renders in a same-origin iframe
// (HubSpot's themed forms do), so the styles below are written into that
// iframe: fields in the design's sizes, labels visually hidden with their
// text as placeholder (the message label stays visible), the orange button
// with its arrow chip, and the note beside it. Sizes are in rem, and the
// iframe's root size follows the card's font size, so the form scales with
// the page like everything else.
const SCRIPT = 'https://js.hsforms.net/forms/embed/v2.js';
const CARET = 'https://cdn.prod.website-files.com/6ac957e7969f378f0b1984fd/6acd89fa4b3d7d6833b589f1_caret-down-muted.svg';
const CHEVRON = '<svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"/></svg>';

type HubSpotForms = { create: (options: Record<string, unknown>) => void };
declare global { interface Window { hbspt?: { forms: HubSpotForms } } }

let loading: Promise<void> | null = null;
function loadScript() {
  loading ??= new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = SCRIPT;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('HubSpot embed script failed to load'));
    document.head.appendChild(s);
  });
  return loading;
}

// Brand colours written out (AGENTS.md › CSS policy 4): ink #200f09,
// accent #f84c1c, accent dark #e03f12, field #f7f3f3.
const CSS = `
html{-webkit-text-size-adjust:100%}
body{margin:0;background:transparent;color:#200f09;font-family:Inter,sans-serif;font-size:1rem;line-height:1.56;letter-spacing:-.01em;-webkit-font-smoothing:antialiased}
.hs-form{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:.75rem;row-gap:1rem;max-width:none!important;margin:0}
.hs-form fieldset{grid-column:1/-1;display:grid;grid-template-columns:minmax(0,1fr);gap:.75rem;max-width:none!important;margin:0!important;padding:0;border:0;min-width:0}
.hs-form fieldset.form-columns-2{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
.hs-form fieldset:has(.hs_website),.hs-form fieldset:has(.hs_seo_budget){grid-column:auto}
.hs-form fieldset:has(.hs_lead_agency){display:none}
.hs-form .hs-form-field{width:auto!important;float:none!important;padding:0!important;margin:0!important;position:relative}
.hs-form .input{margin:0!important}
.hs-form .hs-form-field>label,.hs-form .hs-field-desc,.hs-form .hs-form-required,.hs_recaptcha{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.hs-form .hs_message>label{position:static!important;width:auto;height:auto;overflow:visible;clip:auto;white-space:normal;display:block;margin:0 0 .625rem;font-size:.8125rem;font-weight:500;line-height:1.3;letter-spacing:0;color:rgba(32,15,9,.8)}
.hs-input{box-sizing:border-box;display:block;width:100%!important;height:3.25rem;margin:0;padding:0 1rem 0 1.125rem;border:1px solid #f7f3f3;border-radius:.703rem;background-color:#f7f3f3;color:#200f09;font:inherit;font-size:.9375rem;line-height:1.56;letter-spacing:-.02em;outline:none;-webkit-appearance:none;appearance:none;transition:border-color .2s,background-color .2s}
.hs-input:hover{border-color:rgba(32,15,9,.08)}
.hs-input:focus{border-color:#f84c1c;background-color:#fff}
.hs-input::placeholder{color:rgba(32,15,9,.64);opacity:1}
select.hs-input{padding-right:2.625rem;background-image:url("${CARET}");background-repeat:no-repeat;background-position:right 1rem center;background-size:1rem auto;cursor:pointer}
select.hs-input.is-placeholder{color:rgba(32,15,9,.64)}
textarea.hs-input{height:6.875rem;min-height:6.875rem;padding-top:1rem;padding-bottom:1rem;resize:vertical}
.hs-input.invalid.error{border-color:#d93a0f}
.hs-error-msgs{list-style:none;margin:.375rem 0 0;padding:0}
.hs-error-msg,.hs-main-font-element{font-size:.8125rem;line-height:1.3;font-weight:400;color:#b8320c}
.hs_error_rollup{grid-column:1/-1}
.hs_submit{grid-column:1/-1}
.hs_submit .actions{display:flex;flex-wrap:wrap;align-items:center;gap:.75rem 1rem;margin:0;padding:.5rem 0 0}
.hs_submit input.hs-button{display:none}
.seo-submit{display:inline-flex;align-items:center;justify-content:center;gap:1rem;height:3rem;margin:0;padding:1px .5rem 1px 1.375rem;border:0;border-radius:.75rem;background-color:#f84c1c;color:#fff;font:inherit;font-size:1rem;font-weight:500;line-height:1;letter-spacing:-.03em;cursor:pointer;transition:background-color .2s,box-shadow .2s}
.seo-submit:hover{background-color:#e03f12}
.seo-submit:focus-visible{outline:2px solid #f84c1c;outline-offset:3px}
.seo-submit:disabled{opacity:.4;cursor:default}
.seo-submit-chip{box-sizing:border-box;display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border:1px solid rgba(255,255,255,.24);border-radius:.5625rem;background-color:rgba(255,255,255,.18)}
.seo-submit-chip svg{width:1rem;height:1rem;display:block}
.seo-note{font-size:.8125rem;line-height:1.3;color:rgba(32,15,9,.64)}
.seo-recaptcha{grid-column:1/-1;margin:0;font-size:.6875rem;line-height:1.4;color:rgba(32,15,9,.48)}
.seo-recaptcha a{color:inherit}
.grecaptcha-badge{visibility:hidden;box-shadow:none}
.submitted-message{font-size:1rem;line-height:1.5;padding:1.25rem 1.5rem;border-radius:.75rem;background-color:#f7f3f3;color:#200f09}
@media (max-width:400px){.hs-form,.hs-form fieldset.form-columns-2{grid-template-columns:minmax(0,1fr)}.hs-form fieldset:has(.hs_website),.hs-form fieldset:has(.hs_seo_budget){grid-column:1/-1}}
`;

// Webflow's Inter files (the same metrics as the rest of the page), copied
// from the page's own @font-face rules; HubSpot's Google Inter is the fallback.
function interFaces() {
  const rules: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    let list: CSSRuleList;
    try { list = sheet.cssRules; } catch { continue; }
    for (const rule of Array.from(list)) {
      if (rule instanceof CSSFontFaceRule && /inter/i.test(rule.style.getPropertyValue('font-family'))) rules.push(rule.cssText);
    }
  }
  return rules.join('\n');
}

function labelText(field: Element) {
  const label = field.querySelector('label');
  const span = label?.querySelector('span');
  return (span ?? label)?.textContent?.trim() ?? '';
}

// HubSpot's theme rules are more specific than plain class selectors, so
// every declaration of ours is marked !important.
const important = (css: string) => css.replace(/\{([^{}]*)\}/g, (_, body: string) =>
  `{${body.split(';').filter((d) => d.trim()).map((d) => (/!important/.test(d) || !d.includes(':') ? d : `${d}!important`)).join(';')}}`);

// HubSpot's form is a React app that re-renders after it is ready, which
// resets placeholders and drops added nodes, so the changes are idempotent
// and re-applied whenever the form changes.
function enhance(initial: HTMLFormElement, host: HTMLElement) {
  const doc = initial.ownerDocument;
  // React may swap the form element after onFormReady: always use the live one.
  const form = doc.querySelector<HTMLFormElement>('form.hs-form') ?? initial;
  form.querySelectorAll('.hs-form-field').forEach((field) => {
    const text = labelText(field);
    if (!text) return;
    const input = field.querySelector<HTMLInputElement | HTMLTextAreaElement>('input.hs-input:not([type="hidden"]), textarea.hs-input');
    if (input && !field.classList.contains('hs_message') && input.placeholder !== text) input.placeholder = text;
    const first = field.querySelector('select.hs-input option[value=""]');
    if (first && first.textContent !== text) first.textContent = text;
  });

  const actions = form.querySelector('.hs_submit .actions');
  const submit = actions?.querySelector<HTMLInputElement>('input[type="submit"]');
  if (actions && submit && !actions.querySelector('.seo-submit')) {
    const button = doc.createElement('button');
    button.type = 'button';
    button.className = 'seo-submit';
    button.innerHTML = `<span></span><span class="seo-submit-chip">${CHEVRON}</span>`;
    button.firstElementChild!.textContent = submit.value;
    button.addEventListener('click', () => submit.click());
    actions.insertBefore(button, submit);
  }
  if (actions && host.dataset.note && !actions.querySelector('.seo-note')) {
    const note = doc.createElement('span');
    note.className = 'seo-note';
    note.textContent = host.dataset.note;
    actions.appendChild(note);
  }
  // The reCAPTCHA badge is hidden, so Google's disclosure is shown instead.
  if (form.querySelector('.hs_recaptcha') && !form.querySelector('.seo-recaptcha')) {
    const p = doc.createElement('p');
    p.className = 'seo-recaptcha';
    p.innerHTML = 'Protected by reCAPTCHA. The Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener">Terms of Service</a> apply.';
    form.appendChild(p);
  }
}

function styleForm(form: HTMLFormElement, host: HTMLElement) {
  const doc = form.ownerDocument;
  const frame = doc.defaultView?.frameElement as HTMLIFrameElement | null;

  const style = doc.createElement('style');
  style.textContent = interFaces() + important(CSS);
  doc.body.appendChild(style);

  const syncSize = () => { doc.documentElement.style.fontSize = getComputedStyle(host).fontSize; };
  syncSize();
  addEventListener('resize', syncSize);

  enhance(form, host);
  let queued = 0;
  new MutationObserver(() => {
    if (queued) return;
    queued = requestAnimationFrame(() => { queued = 0; enhance(form, host); });
  }).observe(doc.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['placeholder'] });

  // Keep the iframe as tall as its content (fonts, errors, thank-you note).
  if (frame && 'ResizeObserver' in window) {
    const fit = () => { frame.style.height = `${Math.ceil(doc.documentElement.scrollHeight)}px`; };
    new ResizeObserver(fit).observe(doc.body);
    fit();
  }
  host.classList.add('is-ready');
}

function mount(host: HTMLElement, index: number) {
  const { portalId, formId, region = 'na1' } = host.dataset;
  if (!portalId || !formId) return;
  host.id ||= `hubspot-form-${index}`;
  loadScript().then(() => {
    window.hbspt?.forms.create({
      portalId, formId, region,
      target: `#${host.id}`,
      onFormReady: (form: unknown) => {
        const el = (form instanceof HTMLElement ? form : (form as ArrayLike<HTMLElement>)[0]) as HTMLFormElement | undefined;
        if (el) styleForm(el, host);
      },
    });
  }).catch((error) => console.error('[hubspot-form]', error));
}

export function initHubspotForm() {
  const hosts = Array.from(document.querySelectorAll<HTMLElement>('[data-hubspot-form]'));
  if (!hosts.length) return;
  if (!('IntersectionObserver' in window)) { hosts.forEach(mount); return; }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      mount(entry.target as HTMLElement, hosts.indexOf(entry.target as HTMLElement));
    });
  }, { rootMargin: '800px 0px' });
  hosts.forEach((host) => observer.observe(host));
}
