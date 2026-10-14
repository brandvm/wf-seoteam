// FAQ and Read more: each [data-faq-trigger] button opens the panel named
// in its aria-controls (hidden ↔ shown) and mirrors that in aria-expanded.
// Several items can be open at once. The panel eases open and closed (its
// height and opacity, 300ms) unless reduced motion is on.
//
// A trigger with data-faq-open-label="Read less" and a [data-faq-label]
// element inside it shows that text while its panel is open; the label
// fades out, changes and fades back in.
const OPEN_MS = 300;

export function initFaq() {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const triggers = document.querySelectorAll<HTMLButtonElement>('[data-faq-trigger]');
  triggers.forEach((trigger, index) => {
    // The panel is the element named in aria-controls; where that is missing
    // (an item from a CMS list, which can't carry a unique id) it is the
    // [data-faq-panel] inside the trigger's [data-faq-item], and the module
    // writes the id and the ARIA link itself.
    let panel = document.getElementById(trigger.getAttribute('aria-controls') ?? '');
    if (!panel) {
      panel = trigger.closest('[data-faq-item]')?.querySelector<HTMLElement>('[data-faq-panel]') ?? null;
      if (!panel) return;
      if (!panel.id) panel.id = `faq-panel-${index + 1}`;
      trigger.setAttribute('aria-controls', panel.id);
      if (trigger.getAttribute('aria-expanded') !== 'true') { trigger.setAttribute('aria-expanded', 'false'); panel.hidden = true; }
    }
    let running: Animation | undefined;
    const label = trigger.querySelector<HTMLElement>('[data-faq-label]');
    const labels = { closed: label?.textContent ?? '', open: trigger.dataset.faqOpenLabel ?? '' };
    let swapping: Animation | undefined;
    const relabel = (open: boolean) => {
      if (!label || !labels.open) return;
      const text = open ? labels.open : labels.closed;
      swapping?.cancel();
      if (still || !label.animate) { label.textContent = text; return; }
      swapping = label.animate([{ opacity: 1 }, { opacity: 0 }], { duration: OPEN_MS / 2, easing: 'ease-in' });
      swapping.onfinish = () => {
        label.textContent = text;
        swapping = label.animate([{ opacity: 0 }, { opacity: 1 }], { duration: OPEN_MS / 2, easing: 'ease-out' });
      };
      swapping.oncancel = () => { label.textContent = text; };
    };
    trigger.addEventListener('click', () => {
      const open = trigger.getAttribute('aria-expanded') !== 'true';
      trigger.setAttribute('aria-expanded', String(open));
      relabel(open);
      running?.cancel();
      if (still || !panel.animate) { panel.hidden = !open; return; }
      panel.hidden = false;
      const height = `${panel.offsetHeight}px`;
      // The panel's own padding is animated too, or it couldn't get shorter
      // than it. In a flex or grid parent with a row gap, showing the panel
      // adds one more gap at once: a negative top margin takes that gap back
      // at the closed end, so the animation starts and ends without a jump.
      const { paddingTop, paddingBottom, marginTop } = getComputedStyle(panel);
      const parent = panel.parentElement ? getComputedStyle(panel.parentElement) : null;
      const gap = parent && /flex|grid/.test(parent.display) ? parseFloat(parent.rowGap) || 0 : 0;
      const closed = { height: '0px', paddingTop: '0px', paddingBottom: '0px', marginTop: `${parseFloat(marginTop) - gap}px`, opacity: 0 };
      const opened = { height, paddingTop, paddingBottom, marginTop, opacity: 1 };
      panel.style.overflow = 'hidden';
      running = panel.animate(open ? [closed, opened] : [opened, closed], { duration: OPEN_MS, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' });
      const done = () => { panel.style.overflow = ''; panel.hidden = !open; };
      running.onfinish = done;
      running.oncancel = () => { panel.style.overflow = ''; };
    });
  });
}
