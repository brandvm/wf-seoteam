// Slider: a native scroll-snap row. Inside [data-slider], the
// [data-slider-prev] / [data-slider-next] buttons scroll
// [data-slider-track] by one [data-slider-item], [data-slider-current] /
// [data-slider-total] show the position ("01 / 04": positions, not cards,
// so three cards in view give four stops), and [data-slider-progress] is
// scaled along x to the share of cards seen so far. With the track focused,
// ArrowLeft / ArrowRight step one card and Home / End jump to the ends.
// Touch, trackpad and plain keyboard scrolling work without this module; it
// only adds the buttons, keys, counter and progress. Reduced motion: no
// smooth scrolling.
export function initSlider() {
  document.querySelectorAll<HTMLElement>('[data-slider]').forEach((root) => {
    const track = root.querySelector<HTMLElement>('[data-slider-track]');
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-slider-item]'));
    if (!track || !items.length) return;
    const prev = root.querySelector<HTMLButtonElement>('[data-slider-prev]');
    const next = root.querySelector<HTMLButtonElement>('[data-slider-next]');
    const current = root.querySelector<HTMLElement>('[data-slider-current]');
    const total = root.querySelector<HTMLElement>('[data-slider-total]');
    const progress = root.querySelector<HTMLElement>('[data-slider-progress]');
    const pad = (n: number) => String(n).padStart(2, '0');

    const step = () => (items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : track.clientWidth) || 1;
    // Cards fully in view at once; the last stop shows the last `visible` cards.
    const visible = () => Math.min(items.length, Math.max(1, Math.round(track.clientWidth / step())));
    const stops = () => items.length - visible() + 1;
    const index = () => {
      const last = stops() - 1;
      // At the end of the track the last card can't reach the left edge.
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) return last;
      return Math.min(last, Math.max(0, Math.round(track.scrollLeft / step())));
    };
    const update = () => {
      const i = index();
      const n = stops();
      if (current) current.textContent = pad(i + 1);
      if (total) total.textContent = pad(n);
      if (progress) progress.style.transform = `scaleX(${(i + visible()) / items.length})`;
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === n - 1;
    };
    const behavior = (): ScrollBehavior => (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');
    const go = (direction: number) => track.scrollBy({ left: direction * step(), behavior: behavior() });

    prev?.addEventListener('click', () => go(-1));
    next?.addEventListener('click', () => go(1));
    track.addEventListener('keydown', (event) => {
      if (event.target !== track) return;
      const keys: Record<string, () => void> = {
        ArrowLeft: () => go(-1),
        ArrowRight: () => go(1),
        Home: () => track.scrollTo({ left: 0, behavior: behavior() }),
        End: () => track.scrollTo({ left: track.scrollWidth, behavior: behavior() }),
      };
      const action = keys[event.key];
      if (!action) return;
      event.preventDefault();
      action();
    });
    let queued = false;
    const schedule = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; update(); });
    };
    track.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    update();
  });
}
