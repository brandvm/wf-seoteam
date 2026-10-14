// Hero background: a drifting warm gradient seen through diagonal ribbed
// glass, drawn on <canvas data-hero-shader> with one WebGL fragment shader
// (no library). Every 6 seconds a dark wave swells at the bottom-left and
// sweeps to the top-right, as in the Figma video, and a light follows the
// pointer inside the hero. data-shader-theme="dark" draws the same scene in a
// dark palette (the contact panel). data-shader-palette picks the colours of
// the light scene: a preset name (orange, ember, coral, plum, rose, umber:
// the service page colours from the Figma guide) or five hex colours, dark
// to light, separated by commas. The poster
// image stays underneath the canvas, so nothing is lost when WebGL is
// unavailable; with reduced motion one still frame is drawn; the loop
// pauses while the hero is off screen or the tab is hidden.

// Ramps for data-shader-palette, dark to light. "orange" is the home hero;
// the others follow the service template guide (Figma 793:880).
const PALETTES: Record<string, string[]> = {
  orange: ['#1c0d08', '#9e330f', '#ed6629', '#f7a366', '#f0d694'],
  ember: ['#1c0e09', '#a82b14', '#c2381f', '#e0602a', '#f2a65a'],
  coral: ['#200f09', '#c43c18', '#ff6a4a', '#ff9a78', '#ffd0b8'],
  plum: ['#1a0612', '#5a1440', '#7e2a5e', '#c98db4', '#f1d6e7'],
  rose: ['#1c0a0c', '#9c2340', '#c0395a', '#e06a6f', '#f6c7c9'],
  umber: ['#1c0e09', '#6b3518', '#8a4b2a', '#b97a4a', '#e8c9a0'],
};

export function paletteOf(value: string | undefined): number[] {
  const stops = (value && PALETTES[value.trim().toLowerCase()]) || (value?.includes(',') ? value.split(',') : PALETTES.orange);
  const rgb = stops.slice(0, 5).map((hex) => {
    const h = hex.trim().replace('#', '');
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  });
  return rgb.length === 5 && rgb.flat().every((n) => Number.isFinite(n)) ? rgb.flat() : paletteOf('orange');
}

const VERT = 'attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }';

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;   // 0..1, origin bottom left
uniform float u_hover;  // 0..1, eased pointer presence
uniform float u_grain;  // canvas pixels → CSS pixels, so the grain keeps its size
uniform float u_dark;   // 0 = hero palette, 1 = dark palette (data-shader-theme="dark")
uniform vec3 u_c[5];    // the light scene's ramp, dark to light (data-shader-palette)

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

// Soft drifting variation from three sines: far cheaper than layered noise
// and just as smooth at this scale.
float drift(vec2 p, float t) {
  return 0.5 + (sin(p.x * 1.7 + t * 1.3) + sin(p.y * 2.1 - t) + sin((p.x + p.y) * 1.2 + t * 0.7)) / 6.0;
}

// Brand ramp: espresso → deep orange → accent → peach → cream.
vec3 ramp(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 c0 = u_c[0];
  vec3 c1 = u_c[1];
  vec3 c2 = u_c[2];
  vec3 c3 = u_c[3];
  vec3 c4 = u_c[4];
  if (u_dark > 0.5) {
    // Dark theme: the same scene kept low, espresso to a dim ember.
    t *= 0.54;
    c0 = vec3(0.070, 0.034, 0.022);
    c1 = vec3(0.135, 0.060, 0.036);
    c2 = vec3(0.330, 0.118, 0.048);
    c3 = vec3(0.610, 0.215, 0.070);
    c4 = vec3(0.800, 0.360, 0.140);
  }
  if (t < 0.22) return mix(c0, c1, t / 0.22);
  if (t < 0.50) return mix(c1, c2, (t - 0.22) / 0.28);
  if (t < 0.76) return mix(c2, c3, (t - 0.50) / 0.26);
  return mix(c3, c4, (t - 0.76) / 0.24);
}

// One pass of the wave from the Figma video: a dark shape forms near the
// bottom-left, swells into a dome, then its edge sweeps out to the
// top-right as a curved front, thinning from deep brown to orange. s runs
// 0..1 over two loops; two passes half a cycle apart make it continuous.
float wave(vec2 p, vec2 origin, float s) {
  float form = smoothstep(0.0, 0.15, s);     // ~1.8s: the shape appears
  float travel = smoothstep(0.13, 0.46, s);  // ~4s: its edge crosses the hero
  float fade = 1.0 - smoothstep(0.36, 0.52, s);
  float d = length((p - origin) * vec2(0.9, 1.0));
  float radius = mix(0.35, 3.9, travel);
  float edge = mix(0.40, 0.75, travel);
  // A filled disc with a soft, readable edge: deep brown while small,
  // thinning to a darker orange as it spreads.
  float disc = smoothstep(radius + edge, radius - edge, d);
  float core = smoothstep(1.5, 0.0, d) * (1.0 - travel);
  // It spreads toward the right and top-right; the cream light in the
  // upper left is left alone, as in the video.
  float toward = smoothstep(0.10, 0.85, dot(normalize(p - origin + 0.0001), normalize(vec2(1.0, 0.15))));
  float reach = mix(1.0, toward, smoothstep(0.5, 1.5, d));
  return form * fade * disc * reach * (mix(0.513, 0.16, travel) + 0.19 * core);
}

float field(vec2 p, vec2 m) {
  float aspect = u_res.x / u_res.y;
  float t = u_time * 0.07;
  float n = drift(p, t);
  // The cream light in the upper left barely moves.
  vec2 lp = vec2(-0.45 * aspect + 0.08 * sin(t * 1.1), 0.85 + 0.06 * cos(t * 0.8));
  float light = smoothstep(2.2, 0.0, length(p - lp));
  float ml = smoothstep(0.95, 0.0, length(p - m)) * u_hover;
  // The pointer nudges where the wave starts and thins it nearby.
  vec2 origin = vec2(-0.42 * aspect, -1.05) + (m - vec2(-0.42 * aspect, -1.05)) * 0.10 * u_hover;
  float cycle = u_time / 12.0;
  float w = wave(p, origin, fract(cycle)) + wave(p, origin, fract(cycle + 0.5));
  return 0.63 + 0.40 * light + 0.14 * (n - 0.5) - w * (1.0 - 0.6 * ml) + 0.20 * ml;
}

// Colour of one rib at point p. Each rib shows the scene shifted across
// its width (refraction) and a little along its length, which gives the
// stepped look of the video; f is the position across the rib (0..1).
vec3 rib(vec2 p, vec2 m, vec2 nrm, vec2 dir, float id, float f, float near) {
  vec2 q = p + nrm * (f - 0.5) * (0.34 + 0.10 * near) + dir * (hash(vec2(id, 3.0)) - 0.5) * 0.14;
  return ramp(field(q, m)) * (0.93 + 0.09 * clamp(f, 0.0, 1.0));
}

void main() {
  float aspect = u_res.x / u_res.y;
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 2.0;
  vec2 m = (u_mouse - 0.5) * vec2(aspect, 1.0) * 2.0;

  // Ribs run bottom-left to top-right; nrm is across them.
  float a = radians(54.0);
  vec2 dir = vec2(cos(a), sin(a));
  vec2 nrm = vec2(dir.y, -dir.x);
  float r = dot(p, nrm) * 3.6;
  float id = floor(r), f = fract(r);
  float near = smoothstep(0.9, 0.0, length(p - m)) * u_hover;

  // Anti-aliased rib edges. e is the signed distance to the nearest edge
  // and px is one pixel, both in rib units. Within a pixel of an edge the
  // two neighbouring ribs are blended, so the step between them is one
  // smooth pixel wide instead of a stair-stepped cut.
  float px = 3.6 * 2.0 / u_res.y;
  float e = f < 0.5 ? f : f - 1.0;
  vec3 col;
  if (abs(e) < px) {
    float b = f < 0.5 ? id : id + 1.0;
    vec3 lo = rib(p, m, nrm, dir, b - 1.0, 1.0 + e, near);
    vec3 hi = rib(p, m, nrm, dir, b, e, near);
    col = mix(lo, hi, smoothstep(-px, px, e));
  } else {
    col = rib(p, m, nrm, dir, id, f, near);
  }

  // The edge itself: a thin dark line with a soft highlight beside it,
  // both with a smooth falloff measured in pixels (sharp, not jagged).
  float d = e / px;
  col *= 1.0 - 0.16 * exp(-d * d * 0.8);
  col += 0.05 * exp(-(d - 2.2) * (d - 2.2) * 0.5);

  // Fine grain, a touch stronger in the dark areas.
  float g = hash(floor(gl_FragCoord.xy * u_grain));
  float lum = dot(col, vec3(0.333));
  col *= 0.98 + 0.04 * g;
  col += (g - 0.5) * 0.03 * (1.0 - lum);

  gl_FragColor = vec4(col, 1.0);
}`;

export function initHeroShader() {
  const canvases = Array.from(document.querySelectorAll<HTMLCanvasElement>('canvas[data-hero-shader]'));
  if (!canvases.length) return;
  const small = matchMedia('(max-width: 767px)').matches;
  const idle: (run: () => void) => void = 'requestIdleCallback' in window ? (run) => requestIdleCallback(run, { timeout: 1000 }) : (run) => setTimeout(run, 200);
  canvases.forEach((canvas) => {
    // A canvas on screen at load (the hero) waits for the page to load
    // and paint its still image first, then starts in idle time: creating
    // a WebGL context before the first paint holds that paint back (by
    // seconds where the GPU is emulated, as in lab tests). One further
    // down the page (the dark CTA) costs nothing until it comes near the
    // viewport, and is skipped on small screens, where its still image
    // stays.
    const start = () => idle(() => {
      try { mount(canvas); } catch (error) { console.error('[hero-shader]', error); }
    });
    const rect = canvas.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const painted = () => requestAnimationFrame(() => requestAnimationFrame(start));
      if (document.readyState === 'complete') painted();
      else window.addEventListener('load', painted, { once: true });
      return;
    }
    if (small) return;
    const near = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      near.disconnect();
      start();
    }, { rootMargin: '300px 0px' });
    near.observe(canvas);
  });
}

// True when WebGL is drawn by the CPU (no graphics card: lab machines such
// as PageSpeed's, virtual desktops, some old devices). There every frame is
// main-thread work, so the shader is not started and the still image stays.
function softwareRendered(gl: WebGLRenderingContext) {
  const info = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = String(info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
  return /swiftshader|llvmpipe|software|basic render/i.test(renderer);
}

function mount(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return;
  if (softwareRendered(gl)) { gl.getExtension('WEBGL_lose_context')?.loseContext(); return; }

  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? 'shader');
    return shader;
  };
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'program');
  gl.useProgram(program);

  // One triangle that covers the viewport.
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(program, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(program, 'u_res');
  const uTime = gl.getUniformLocation(program, 'u_time');
  const uMouse = gl.getUniformLocation(program, 'u_mouse');
  const uHover = gl.getUniformLocation(program, 'u_hover');
  const uGrain = gl.getUniformLocation(program, 'u_grain');
  gl.uniform1f(gl.getUniformLocation(program, 'u_dark'), canvas.dataset.shaderTheme === 'dark' ? 1 : 0);
  gl.uniform3fv(gl.getUniformLocation(program, 'u_c'), new Float32Array(paletteOf(canvas.dataset.shaderPalette)));

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const target = { x: 0.3, y: 0.4, hover: 0 };
  const mouse = { x: 0.3, y: 0.4, hover: 0 };
  let visible = true;
  let frame = 0;
  const start = performance.now();

  // Resolution: up to 2× density, capped at a pixel budget, then scaled by
  // `quality`, which the loop lowers when frames run long and raises again
  // when there is headroom. Rib edges are sized in pixels, so they stay
  // one crisp line at any of these resolutions.
  const BUDGET = 2_500_000;
  let quality = 1;
  let scale = 1;
  const resize = () => {
    const cw = Math.max(1, canvas.clientWidth);
    const ch = Math.max(1, canvas.clientHeight);
    scale = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(BUDGET / (cw * ch))) * quality;
    const w = Math.max(1, Math.round(cw * scale));
    const h = Math.max(1, Math.round(ch * scale));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  };
  const draw = (now: number) => {
    resize();
    mouse.x += (target.x - mouse.x) * 0.06;
    mouse.y += (target.y - mouse.y) * 0.06;
    mouse.hover += (target.hover - mouse.hover) * 0.05;
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, reduced ? 12 : (now - start) / 1000 + 12);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.uniform1f(uHover, mouse.hover);
    gl.uniform1f(uGrain, 1 / Math.max(scale, 0.5));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    canvas.dataset.heroShader = 'ready';
  };
  let last = 0;
  let slow = 0;
  let fast = 0;
  const loop = (now: number) => {
    // Adaptive quality: a run of long frames (under ~40fps) drops the
    // resolution a step; a long run of short ones restores it.
    const dt = last ? now - last : 16;
    last = now;
    if (dt > 25 && dt < 250) { slow++; fast = 0; } else if (dt < 18) { fast++; slow = Math.max(0, slow - 1); }
    if (slow > 20 && quality > 0.5) { quality = Math.max(0.5, quality - 0.15); slow = 0; }
    if (fast > 600 && quality < 1) { quality = Math.min(1, quality + 0.15); fast = 0; }
    draw(now);
    frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    if (!frame) last = 0;
  };
  const wake = () => {
    if (!frame && !reduced && visible && !document.hidden) frame = requestAnimationFrame(loop);
  };

  if (reduced) {
    draw(start);
    new ResizeObserver(() => draw(start)).observe(canvas);
    return;
  }

  // The pointer is tracked on the window (the canvas sits under the hero's
  // content and never receives events itself).
  window.addEventListener('pointermove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = 1 - (event.clientY - rect.top) / rect.height;
    const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
    target.hover = inside ? 1 : 0;
    if (inside) { target.x = x; target.y = y; }
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { target.hover = 0; });

  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; wake(); }).observe(canvas);
  document.addEventListener('visibilitychange', wake);
  frame = requestAnimationFrame(loop);
}
