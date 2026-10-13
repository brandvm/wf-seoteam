// Count-up: a [data-count="1200"] element is written as 0 in the page and
// counts to its number the first time it scrolls into view (1.6s, easing
// out). The markup starts at 0 so a number that is on screen when the page
// loads never shows its final value first; a visually hidden copy beside
// it carries the real value for screen readers and the animated one is
// aria-hidden.
//
// Nothing around it moves: before counting, the element is given the width
// of its final text (in em, so it follows the fluid type), and the width is
// released when the count ends. Thousands get a comma; decimals follow the
// attribute ("3.1" counts with one decimal). With reduced motion the final
// value is written at once.
const COUNT_MS = 1600;

export function initCountUp() {
  const items = document.querySelectorAll<HTMLElement>('[data-count]');
  if (!items.length) return;
  const format = (value: number, decimals: number) => value.toLocaleString('en-CA', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const read = (el: HTMLElement) => {
    const raw = el.dataset.count ?? '0';
    return { to: Number(raw) || 0, decimals: (raw.split('.')[1] ?? '').length };
  };

  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    items.forEach((el) => { const { to, decimals } = read(el); el.textContent = format(to, decimals); });
    return;
  }

  const run = (el: HTMLElement) => {
    const { to, decimals } = read(el);
    // Reserve the final width: measure it with the final text, then go back to 0.
    el.style.display = 'inline-block';
    el.style.whiteSpace = 'nowrap';
    el.textContent = format(to, decimals);
    const size = parseFloat(getComputedStyle(el).fontSize) || 16;
    el.style.width = `${el.getBoundingClientRect().width / size}em`;
    el.textContent = format(0, decimals);
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / COUNT_MS)); // a frame's timestamp can be just before `start`
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = format(to * eased, decimals);
      if (t < 1) { requestAnimationFrame(tick); return; }
      el.textContent = format(to, decimals);
      el.style.width = el.style.display = el.style.whiteSpace = '';
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      run(entry.target as HTMLElement);
    });
  }, { threshold: 0.6 });
  items.forEach((el) => observer.observe(el));
}
