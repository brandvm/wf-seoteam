// Charts: a [data-chart] element draws itself in the first time it scrolls
// into view. The module only marks state; repo CSS does the drawing:
//   data-chart="right"  a line chart, uncovered from left to right
//   data-chart="up"     a column chart, uncovered from the bottom
//   data-chart="columns" an inline SVG whose rects rise one after another
//                        (the module gives each rect its delay, 90ms apart)
//   data-chart="grow"   a bar, growing from its left end
// At boot each one gets data-chart-armed (its hidden starting state), then
// data-in-view when its parent is on screen. With reduced motion, or without
// IntersectionObserver, nothing is armed and the charts simply show.
export function initCharts() {
  const charts = document.querySelectorAll<HTMLElement>('[data-chart]');
  if (!charts.length || !('IntersectionObserver' in window)) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // A chart that is fully clipped has no visible area for the observer to
  // find, so its parent is watched instead.
  const byParent = new Map<Element, HTMLElement[]>();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      byParent.get(entry.target)?.forEach((chart) => {
        // The delays are set only now: a delay on its own would also hold
        // back the instant hide when the chart is armed.
        if (chart.dataset.chart === 'columns') chart.querySelectorAll<SVGElement>('rect').forEach((rect, i) => { rect.style.transitionDelay = `${i * 90}ms`; });
        chart.dataset.inView = '';
      });
    });
  }, { threshold: 0.5 });
  charts.forEach((chart) => {
    const parent = chart.parentElement;
    if (!parent) return;
    chart.dataset.chartArmed = '';
    byParent.set(parent, [...(byParent.get(parent) ?? []), chart]);
    observer.observe(parent);
  });
}
