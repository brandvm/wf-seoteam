// Slider: a native scroll-snap row. Inside [data-slider], the
// [data-slider-prev] / [data-slider-next] buttons scroll
// [data-slider-track] by one [data-slider-item], and [data-slider-current]
// / [data-slider-total] show the position ("01 / 06"). Touch, trackpad and
// keyboard scrolling work without this module; it only adds the buttons
// and the counter.
export function initSlider() {
  document.querySelectorAll<HTMLElement>('[data-slider]').forEach((root) => {
    const track = root.querySelector<HTMLElement>('[data-slider-track]');
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-slider-item]'));
    if (!track || !items.length) return;
    const prev = root.querySelector<HTMLButtonElement>('[data-slider-prev]');
    const next = root.querySelector<HTMLButtonElement>('[data-slider-next]');
    const current = root.querySelector<HTMLElement>('[data-slider-current]');
    const total = root.querySelector<HTMLElement>('[data-slider-total]');
    const pad = (n: number) => String(n).padStart(2, '0');
    if (total) total.textContent = pad(items.length);

    const step = () => (items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : track.clientWidth);
    const index = () => {
      // At the end of the track the last card can't reach the left edge.
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) return items.length - 1;
      return Math.min(items.length - 1, Math.round(track.scrollLeft / step()));
    };
    const update = () => {
      const i = index();
      if (current) current.textContent = pad(i + 1);
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === items.length - 1;
    };
    const go = (direction: number) => {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      track.scrollBy({ left: direction * step(), behavior: reduced ? 'auto' : 'smooth' });
    };

    prev?.addEventListener('click', () => go(-1));
    next?.addEventListener('click', () => go(1));
    let queued = false;
    track.addEventListener('scroll', () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; update(); });
    }, { passive: true });
    update();
  });
}
