// Panel backgrounds: small WebGL fragment shaders (no library) drawn on
// <canvas data-panel-shader="…"> over a still image that is already there.
//   "glow"  — columns of orange light rising from the bottom edge of a
//             dark panel, their heights travelling left to right in a
//             loop. data-glow-peak (0–1) is where the tallest column starts;
//             data-glow-column (em, default 4.2) and data-glow-span
//             (columns per wave, default 18.3) fit it to a smaller card.
//
// Built to cost nothing at page load: a canvas gets its WebGL context only
// when it comes near the viewport, and then during idle time; it draws at
// 30fps and only while on screen and the tab is visible. On small screens,
// with reduced motion or Save-Data the module does nothing and the still
// image stays. The same happens when WebGL is missing or the context is
// lost.

const VERT = 'attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }';

// Columns (4.2em wide by default) with clean edges. Their tops follow a triangle wave
// (as the staggered columns do in Figma) that travels left to right and
// repeats every 9 seconds, with a sharp 1px line between columns.
const GLOW = `
precision highp float;
uniform vec2 u_res;     // canvas pixels
uniform float u_time;
uniform float u_px;     // canvas pixels per CSS pixel
uniform float u_em;     // CSS pixels per em
uniform float u_peak;
uniform float u_column; // column width in em
uniform float u_span;   // columns in one wave
const vec3 INK = vec3(0.1255, 0.0588, 0.0353);
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 ramp(float t) {
  vec3 a = vec3(0.973, 0.298, 0.110);
  vec3 b = vec3(0.996, 0.573, 0.247);
  vec3 c = vec3(0.980, 0.831, 0.510);
  if (t < 0.28) return a;
  if (t < 0.50) return mix(a, b, (t - 0.28) / 0.22);
  return mix(b, c, clamp((t - 0.50) / 0.17, 0.0, 1.0));
}
void main() {
  vec2 css = gl_FragCoord.xy / u_px;
  vec2 size = u_res / u_px;
  // Column width snapped to whole canvas pixels, so every divider lands
  // exactly on a pixel column and stays one sharp pixel wide.
  float col = floor(u_column * u_em * u_px + 0.5) / u_px;
  float xi = css.x / col;
  float id = floor(xi);
  float f = fract(xi);

  float ph = (id + 0.5 - u_peak * size.x / col) / u_span - u_time / 9.0;
  float tri = 1.0 - abs(fract(ph + 0.5) * 2.0 - 1.0);
  float top = mix(-0.05, 1.0, tri) * size.y;
  // Each column is a little taller in its middle, like light through a rib.
  float d = top - css.y + (0.5 - abs(f - 0.5)) * 0.9 * u_em;
  float t = d / (36.5 * u_em);

  float alpha = 0.7 * smoothstep(0.02, 0.30, t);
  // Column dividers: a hard 1px line (one CSS pixel) at each column's left edge.
  alpha *= 1.0 - 0.6 * step(f * col, 1.0);
  vec3 color = mix(INK, ramp(t), clamp(alpha, 0.0, 1.0));
  // Half a level of dither so the dark gradient doesn't band; not visible.
  color += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  gl_FragColor = vec4(color, 1.0);
}`;

type Kind = { frag: string; budget: number; density: (dpr: number) => number };
const KINDS: Record<string, Kind> = {
  glow: { frag: GLOW, budget: 3_000_000, density: (dpr) => Math.min(dpr, 2) },
};

function mount(canvas: HTMLCanvasElement, kind: Kind) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return null;
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? 'shader');
    return shader;
  };
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, kind.frag));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'program');
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(program, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uniform = (name: string) => gl.getUniformLocation(program, name);
  const u = { res: uniform('u_res'), time: uniform('u_time'), px: uniform('u_px'), em: uniform('u_em'), peak: uniform('u_peak'), column: uniform('u_column'), span: uniform('u_span') };

  const peak = Number(canvas.dataset.glowPeak ?? 0.5);
  const column = Number(canvas.dataset.glowColumn ?? 4.2);
  const span = Number(canvas.dataset.glowSpan ?? 18.3);
  const start = performance.now();
  let frame = 0;
  let last = 0;
  let visible = false;
  let lost = false;

  const draw = (now: number) => {
    const cw = Math.max(1, canvas.clientWidth);
    const ch = Math.max(1, canvas.clientHeight);
    const scale = Math.min(kind.density(window.devicePixelRatio || 1), Math.sqrt(kind.budget / (cw * ch)));
    const w = Math.max(1, Math.round(cw * scale));
    const h = Math.max(1, Math.round(ch * scale));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    gl.uniform2f(u.res, w, h);
    gl.uniform1f(u.time, (now - start) / 1000);
    gl.uniform1f(u.px, scale);
    gl.uniform1f(u.em, parseFloat(getComputedStyle(canvas).fontSize) || 16);
    gl.uniform1f(u.peak, peak);
    gl.uniform1f(u.column, column);
    gl.uniform1f(u.span, span);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    canvas.dataset.ready = '';
  };
  const loop = (now: number) => {
    // 30fps is plenty for a slow background and halves the GPU work.
    if (now - last >= 30) { last = now; draw(now); }
    frame = visible && !lost && !document.hidden ? requestAnimationFrame(loop) : 0;
  };
  const wake = () => { if (!frame && visible && !lost && !document.hidden) frame = requestAnimationFrame(loop); };

  canvas.addEventListener('webglcontextlost', (event) => { event.preventDefault(); lost = true; delete canvas.dataset.ready; });
  document.addEventListener('visibilitychange', wake);
  return { show(on: boolean) { visible = on; wake(); } };
}

export function initPanelShader() {
  const canvases = document.querySelectorAll<HTMLCanvasElement>('canvas[data-panel-shader]');
  if (!canvases.length) return;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  if (saveData || matchMedia('(prefers-reduced-motion: reduce), (max-width: 767px)').matches) return;

  const idle: (run: () => void) => void = 'requestIdleCallback' in window ? (run) => requestIdleCallback(run, { timeout: 1000 }) : (run) => setTimeout(run, 200);
  const mounted = new Map<Element, { show(on: boolean): void } | null>();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const canvas = entry.target as HTMLCanvasElement;
      const instance = mounted.get(canvas);
      if (instance) { instance.show(entry.isIntersecting); return; }
      if (instance === null || !entry.isIntersecting) return;
      mounted.set(canvas, null);
      idle(() => {
        const kind = KINDS[canvas.dataset.panelShader ?? ''];
        if (!kind) return;
        try {
          const made = mount(canvas, kind);
          mounted.set(canvas, made);
          // It may have scrolled away while waiting for idle time.
          const rect = canvas.getBoundingClientRect();
          made?.show(rect.bottom > -200 && rect.top < window.innerHeight + 200);
        } catch (error) {
          console.error('[panel-shader]', error);
        }
      });
    });
  }, { rootMargin: '200px 0px' });
  canvases.forEach((canvas) => observer.observe(canvas));
}
