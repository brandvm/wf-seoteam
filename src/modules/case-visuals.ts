// Case study bars: a CMS number can be bound to an attribute but not to a
// style, so [data-bar-ratio="46"] on a bar fill sets its width to 46% (the
// "before" bar of a before/after pair; the "after" bar is a full-width
// class). A missing or out-of-range value leaves the CSS width.
export function initCaseVisuals() {
  document.querySelectorAll<HTMLElement>('[data-bar-ratio]').forEach((bar) => {
    const ratio = Number(bar.dataset.barRatio);
    if (Number.isFinite(ratio) && ratio > 0 && ratio <= 100) bar.style.width = `${ratio}%`;
  });
}
