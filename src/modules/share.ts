// Share links: [data-share="linkedin|x|facebook"] get the network's share URL
// for this page; [data-share="copy"] copies the URL and shows "Copied" in its
// label for two seconds ([data-share-label] inside it, or its aria-label).
const NETWORKS: Record<string, (url: string, title: string) => string> = {
  linkedin: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  x: (url, title) => `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
  facebook: (url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
};

export function initShare() {
  const links = document.querySelectorAll<HTMLElement>('[data-share]');
  if (!links.length) return;
  const url = encodeURIComponent(location.origin + location.pathname);
  const title = encodeURIComponent(document.title);
  links.forEach((el) => {
    const kind = el.dataset.share || '';
    if (NETWORKS[kind] && el instanceof HTMLAnchorElement) {
      el.href = NETWORKS[kind](url, title);
      el.target = '_blank';
      el.rel = 'noopener';
      return;
    }
    if (kind !== 'copy') return;
    el.addEventListener('click', async (event) => {
      event.preventDefault();
      try {
        await navigator.clipboard.writeText(location.origin + location.pathname);
      } catch {
        return;
      }
      const label = el.getAttribute('aria-label') || '';
      el.setAttribute('aria-label', 'Link copied');
      el.classList.add('is-copied');
      setTimeout(() => {
        el.setAttribute('aria-label', label);
        el.classList.remove('is-copied');
      }, 2000);
    });
  });
}
