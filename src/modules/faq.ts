// FAQ: each [data-faq-trigger] button opens the panel named in its
// aria-controls (hidden ↔ shown) and mirrors that in aria-expanded.
// Several items can be open at once.
export function initFaq() {
  const triggers = document.querySelectorAll<HTMLButtonElement>('[data-faq-trigger]');
  triggers.forEach((trigger) => {
    const panel = document.getElementById(trigger.getAttribute('aria-controls') ?? '');
    if (!panel) return;
    trigger.addEventListener('click', () => {
      const open = trigger.getAttribute('aria-expanded') !== 'true';
      trigger.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
    });
  });
}
