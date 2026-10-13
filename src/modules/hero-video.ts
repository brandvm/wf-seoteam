// Hero video: with reduced motion the video is paused and shows its poster
// (conventions.md §9). Attributes carry values (muted="true") so Webflow
// keeps them on publish; set the matching properties too, for autoplay.
export function initHeroVideo() {
  document.querySelectorAll<HTMLVideoElement>('[data-hero-video]').forEach((video) => {
    video.muted = true;
    video.playsInline = true;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      video.removeAttribute('autoplay');
      return;
    }
    video.play().catch(() => {});
  });
}
