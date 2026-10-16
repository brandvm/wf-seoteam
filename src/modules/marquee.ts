// Marquee: a row with [data-marquee] (the About team list) scrolls sideways
// in an endless loop. The items are cloned once (hidden from screen readers
// and the tab order), the row moves left by the width of one full set, then
// jumps back, which looks seamless because the clones sit where the originals
// started. data-marquee-speed sets pixels per second (default 40). Pauses on
// hover, on keyboard focus and off screen; without the script, or with reduced
// motion, the row wraps into a static grid (repo CSS §05 Marquee).
const DEFAULT_SPEED = 40;

export function initMarquee() {
  const tracks = document.querySelectorAll<HTMLElement>('[data-marquee]');
  if (!tracks.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  tracks.forEach((track) => {
    const items = Array.from(track.children) as HTMLElement[];
    if (items.length < 2) return;

    items.forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement;
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('data-marquee-clone', '');
      clone.removeAttribute('id');
      clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
      clone.querySelectorAll<HTMLElement>('a, button, input, select, textarea, [tabindex]').forEach((el) => el.setAttribute('tabindex', '-1'));
      track.appendChild(clone);
    });

    const speed = Number(track.dataset.marqueeSpeed) || DEFAULT_SPEED;
    const firstClone = track.children[items.length] as HTMLElement;
    const measure = () => {
      // One set = from the first item to its clone, gap included.
      const distance = firstClone.offsetLeft - items[0].offsetLeft;
      if (distance <= 0) return;
      track.style.setProperty('--marquee-distance', `${-distance}px`);
      track.style.setProperty('--marquee-duration', `${(distance / speed).toFixed(2)}s`);
    };
    measure();
    new ResizeObserver(measure).observe(track);
    track.classList.add('is-marquee');

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        track.classList.toggle('is-marquee-paused', !entry.isIntersecting);
      }).observe(track);
    }
  });
}
