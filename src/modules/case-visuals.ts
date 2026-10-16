// Case study visuals that CMS numbers drive. A CMS number can be bound to an
// attribute but not to a style or to a number of elements, so:
//
// Bars: [data-bar-ratio="46"] on a bar fill sets its width to 46%. A missing
// or out-of-range value leaves the CSS width. Bars grow into place: a bar
// that is below the fold when the page loads starts empty and fills to its
// width the first time its track scrolls into view (the fill's width
// transition, a Designer style, does the easing; the bars of one group
// (CS Bars) fill one after the other). Bars already on screen, and
// everything with reduced motion, are set at once.
//
// Unit grid: [data-units-filled="22"][data-units-total="30"] on an empty CS
// Units element gets `total` squares (span.cs-unit), the first `filled` of
// them with Is Filled; data-units-tone="light" gives the empty ones
// Is On Light (the grid on a light panel). The grid is role="img" with
// "22 of 30" as its name unless the markup names it. A grid that already
// has children is left as it is.
const STAGGER_MS = 160;
const MAX_UNITS = 200;

function buildUnits() {
  document.querySelectorAll<HTMLElement>('[data-units-filled][data-units-total]').forEach((grid) => {
    if (grid.children.length) return;
    const total = Math.round(Number(grid.dataset.unitsTotal));
    const filled = Math.round(Number(grid.dataset.unitsFilled));
    if (!Number.isFinite(total) || !Number.isFinite(filled) || total <= 0 || total > MAX_UNITS || filled < 0) return;
    const light = grid.dataset.unitsTone === 'light';
    const cells = document.createDocumentFragment();
    for (let i = 0; i < total; i++) {
      const cell = document.createElement('span');
      cell.className = i < filled ? 'cs-unit is-filled' : light ? 'cs-unit is-on-light' : 'cs-unit';
      cells.appendChild(cell);
    }
    grid.appendChild(cells);
    if (!grid.hasAttribute('role')) grid.setAttribute('role', 'img');
    if (!grid.hasAttribute('aria-label')) grid.setAttribute('aria-label', `${Math.min(filled, total)} of ${total}`);
  });
}

function growBars() {
  const bars = [...document.querySelectorAll<HTMLElement>('[data-bar-ratio]')];
  if (!bars.length) return;
  const width = (bar: HTMLElement) => {
    const ratio = Number(bar.dataset.barRatio);
    return Number.isFinite(ratio) && ratio > 0 && ratio <= 100 ? `${ratio}%` : '';
  };
  const animate = !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window;

  const observer = animate
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer!.unobserve(entry.target);
          const bar = entry.target.querySelector<HTMLElement>('[data-bar-ratio]');
          if (!bar) return;
          const group = bar.closest('[data-bars], .cs-bars');
          const index = group ? [...group.querySelectorAll('[data-bar-ratio]')].indexOf(bar) : 0;
          setTimeout(() => (bar.style.width = width(bar)), Math.max(0, index) * STAGGER_MS);
        });
      }, { threshold: 0.4 })
    : null;

  bars.forEach((bar) => {
    const box = bar.getBoundingClientRect();
    const onScreen = box.top < innerHeight && box.bottom > 0;
    if (!observer || onScreen || !width(bar)) {
      if (width(bar)) bar.style.width = width(bar);
      return;
    }
    bar.style.transition = 'none';
    bar.style.width = '0%';
    void bar.offsetWidth; // apply the empty state before the transition comes back
    bar.style.transition = '';
    observer.observe(bar.parentElement ?? bar); // the track: an empty fill has no area to observe
  });
}

export function initCaseVisuals() {
  buildUnits();
  growBars();
}
