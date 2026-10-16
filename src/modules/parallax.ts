// Parallax: an image with [data-parallax] inside a frame that clips it (the
// case study's large photo). The image is taller than its frame (Is Parallax
// combo: 120% high, starting 10% above) and moves up to ±8% of its height as
// the frame crosses the viewport, so it drifts slower than the page. Runs
// only while the frame is on screen; off with reduced motion.
const RANGE = 0.08;

export function initParallax() {
  const images = document.querySelectorAll<HTMLElement>('[data-parallax]');
  if (!images.length || matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  const visible = new Set<HTMLElement>();
  let frame = 0;
  const update = () => {
    frame = 0;
    visible.forEach((img) => {
      const box = (img.parentElement ?? img).getBoundingClientRect();
      // -1 when the frame enters at the bottom, 1 when it leaves at the top
      const progress = Math.max(-1, Math.min(1, (innerHeight / 2 - (box.top + box.height / 2)) / ((innerHeight + box.height) / 2)));
      img.style.transform = `translate3d(0, ${(progress * RANGE * 100).toFixed(2)}%, 0)`;
    });
  };
  const request = () => { if (!frame) frame = requestAnimationFrame(update); };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const img = entry.target as HTMLElement;
      if (entry.isIntersecting) visible.add(img); else visible.delete(img);
    });
    request();
  });
  images.forEach((img) => observer.observe(img));
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request);
}
