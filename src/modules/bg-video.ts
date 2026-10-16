// Background video: a <video data-bg-video> (the About hero) autoplays muted
// in a loop. With reduced motion it is paused on its first frame (the poster
// image under it is the same frame), and it pauses while off screen.
export function initBgVideo() {
  const videos = document.querySelectorAll<HTMLVideoElement>('video[data-bg-video]');
  if (!videos.length) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  videos.forEach((video) => {
    video.muted = true;
    const play = () => { if (!reduce.matches) video.play().catch(() => {}); };
    const stop = () => { video.pause(); };

    if (reduce.matches) { video.removeAttribute('autoplay'); stop(); video.currentTime = 0; }
    reduce.addEventListener('change', () => (reduce.matches ? stop() : play()));

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : stop())).observe(video);
    }
  });
}
