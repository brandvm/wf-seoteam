"use strict";(()=>{function R(){var u,b,y,q;let t=window.WFC;if(!/\.webflow\.io$/.test(location.hostname)||!t||(b=(u=window.Webflow)==null?void 0:u.env)!=null&&b.call(u,"editor")||(q=(y=window.Webflow)==null?void 0:y.env)!=null&&q.call(y,"design")||document.getElementById("wfc-environment"))return;let e=t.source?t.source===t.devBase:!!t.dev,o=!!t.source&&t.source!==t.devBase&&t.source!==t.stag,r=!!t.dev&&!e||o,a=e?"Dev":"Staging",s=document.createElement("div");s.id="wfc-environment";let n=s.attachShadow({mode:"open"});n.innerHTML=`
    <style>
      :host {
        all: initial;
        position: fixed !important;
        left: max(10px, env(safe-area-inset-left)) !important;
        bottom: max(10px, env(safe-area-inset-bottom)) !important;
        z-index: 2147483000 !important;
        display: block !important;
        pointer-events: none !important;
        color-scheme: dark;
      }
      *, *::before, *::after { box-sizing: border-box; }
      [hidden] { display: none !important; }
      .control {
        width: max-content;
        padding: 3px;
        border: 1px solid #ffffff26;
        border-radius: 11px;
        background: #1b1b1bf2;
        box-shadow: 0 2px 10px #0002;
        opacity: .65;
        pointer-events: auto;
        transition: opacity 150ms ease;
      }
      .control:hover, .control:focus-within, .control[data-expanded] { opacity: 1; }
      button {
        appearance: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        margin: 0;
        border: 0;
        border-radius: 7px;
        padding: 0 10px;
        height: 28px;
        background: transparent;
        color: #c5c5c5;
        font: 500 11px/1 system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        letter-spacing: 0;
        cursor: pointer;
        touch-action: manipulation;
      }
      button:hover { background: #ffffff12; color: #fff; }
      button:focus-visible { outline: 2px solid #d9ff54; outline-offset: 1px; }
      button[aria-pressed='true'] { background: #ffffff20; color: #fff; }
      .choices { display: flex; gap: 3px; }
      .segment { min-width: 44px; height: 32px; }
      .minimize { width: 28px; height: 32px; padding: 0; }
      .dot { width: 5px; height: 5px; border-radius: 50%; background: #b5b5b5; }
      .dot[data-dev] { background: #d9ff54; }
      svg { width: 10px; height: 10px; fill: none; stroke: currentColor; stroke-width: 1.5; }
      .status {
        margin: 5px 0 0;
        padding: 7px 9px;
        border-radius: 7px;
        background: #1b1b1bf2;
        color: #ddd;
        font: 11px/1.4 system-ui, sans-serif;
        pointer-events: auto;
      }
      @media (prefers-reduced-motion: reduce) { .control { transition: none; } }
      @media print { :host { display: none !important; } }
    </style>
    <div class="control">
      <button class="launcher" type="button" aria-expanded="false" aria-controls="choices">
        <span class="dot" aria-hidden="true"></span>
        <span class="label"></span>
        <svg viewBox="0 0 12 12" aria-hidden="true"><path d="m4 2 4 4-4 4"/></svg>
      </button>
      <div class="choices" id="choices" role="group" aria-label="Code environment" hidden>
        <button class="segment" type="button" data-mode="staging" title="Use the deployed staging code">Staging</button>
        <button class="segment" type="button" data-mode="dev" title="Use your local code \u2014 run pnpm dev first">Dev</button>
        <button class="minimize" type="button" aria-label="Minimize environment switcher" title="Minimize">
          <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 6h8"/></svg>
        </button>
      </div>
    </div>
    <p class="status" role="status" hidden>Dev unavailable \xB7 using staging</p>
  `;let i=n.querySelector(".control"),l=n.querySelector(".launcher"),g=n.querySelector(".choices"),v=n.querySelector(".status"),p=n.querySelectorAll("[data-mode]");n.querySelector(".label").textContent=a,n.querySelector(".dot").toggleAttribute("data-dev",e),l.setAttribute("aria-label",`Choose environment (${a})`),o&&(v.textContent="Staging unavailable \xB7 using release"),l.title=o?"Staging could not load. Using the pinned release.":r?"Local dev could not load. Using staging.":"Switch between staging and local dev";function c(d,x=!1){var S;l.hidden=d,g.hidden=!d,v.hidden=!d||!r,i.toggleAttribute("data-expanded",d),l.setAttribute("aria-expanded",String(d)),x&&(d?(S=n.querySelector('[aria-pressed="true"]'))==null||S.focus():l.focus())}p.forEach(d=>{let x=d.dataset.mode==="dev";d.setAttribute("aria-pressed",String(x===e)),d.addEventListener("click",()=>{if(x===!!t.dev&&!r)return;let S=new URL(location.href);S.searchParams.set("wfc-dev",x?"1":"0");try{localStorage.setItem("wfc-dev",x?"1":"0")}catch{}location.assign(S.href)})}),l.addEventListener("click",()=>c(!0,!0)),n.querySelector(".minimize").addEventListener("click",()=>c(!1,!0)),i.addEventListener("keydown",d=>{d.key!=="Escape"||g.hidden||(d.preventDefault(),d.stopPropagation(),c(!1,!0))}),document.addEventListener("pointerdown",d=>{d.composedPath().includes(s)||c(!1)}),document.body.appendChild(s)}function F(){document.querySelectorAll("[data-faq-trigger]").forEach(e=>{var r;let o=document.getElementById((r=e.getAttribute("aria-controls"))!=null?r:"");o&&e.addEventListener("click",()=>{let a=e.getAttribute("aria-expanded")!=="true";e.setAttribute("aria-expanded",String(a)),o.hidden=!a})})}var N="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",W=`
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;   // 0..1, origin bottom left
uniform float u_hover;  // 0..1, eased pointer presence
uniform float u_grain;  // canvas pixels \u2192 CSS pixels, so the grain keeps its size
uniform float u_dark;   // 0 = hero palette, 1 = dark palette (data-shader-theme="dark")

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

// Soft drifting variation from three sines: far cheaper than layered noise
// and just as smooth at this scale.
float drift(vec2 p, float t) {
  return 0.5 + (sin(p.x * 1.7 + t * 1.3) + sin(p.y * 2.1 - t) + sin((p.x + p.y) * 1.2 + t * 0.7)) / 6.0;
}

// Brand ramp: espresso \u2192 deep orange \u2192 accent \u2192 peach \u2192 cream.
vec3 ramp(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 c0 = vec3(0.11, 0.05, 0.03);
  vec3 c1 = vec3(0.62, 0.20, 0.06);
  vec3 c2 = vec3(0.93, 0.40, 0.16);
  vec3 c3 = vec3(0.97, 0.64, 0.40);
  vec3 c4 = vec3(0.94, 0.84, 0.58);
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
}`;function I(){let t=Array.from(document.querySelectorAll("canvas[data-hero-shader]"));if(!t.length)return;let e=matchMedia("(max-width: 767px)").matches,o="requestIdleCallback"in window?r=>requestIdleCallback(r,{timeout:1e3}):r=>setTimeout(r,200);t.forEach(r=>{let a=()=>o(()=>{try{O(r)}catch(i){console.error("[hero-shader]",i)}}),s=r.getBoundingClientRect();if(s.top<window.innerHeight&&s.bottom>0){let i=()=>requestAnimationFrame(()=>requestAnimationFrame(a));document.readyState==="complete"?i():window.addEventListener("load",i,{once:!0});return}if(e)return;let n=new IntersectionObserver(([i])=>{i.isIntersecting&&(n.disconnect(),a())},{rootMargin:"300px 0px"});n.observe(r)})}function O(t){var _;let e=t.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!e)return;let o=(m,h)=>{var L;let w=e.createShader(m);if(e.shaderSource(w,h),e.compileShader(w),!e.getShaderParameter(w,e.COMPILE_STATUS))throw new Error((L=e.getShaderInfoLog(w))!=null?L:"shader");return w},r=e.createProgram();if(e.attachShader(r,o(e.VERTEX_SHADER,N)),e.attachShader(r,o(e.FRAGMENT_SHADER,W)),e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS))throw new Error((_=e.getProgramInfoLog(r))!=null?_:"program");e.useProgram(r),e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);let a=e.getAttribLocation(r,"p");e.enableVertexAttribArray(a),e.vertexAttribPointer(a,2,e.FLOAT,!1,0,0);let s=e.getUniformLocation(r,"u_res"),n=e.getUniformLocation(r,"u_time"),i=e.getUniformLocation(r,"u_mouse"),l=e.getUniformLocation(r,"u_hover"),g=e.getUniformLocation(r,"u_grain");e.uniform1f(e.getUniformLocation(r,"u_dark"),t.dataset.shaderTheme==="dark"?1:0);let v=matchMedia("(prefers-reduced-motion: reduce)").matches,p={x:.3,y:.4,hover:0},c={x:.3,y:.4,hover:0},u=!0,b=0,y=performance.now(),q=25e5,d=1,x=1,S=()=>{let m=Math.max(1,t.clientWidth),h=Math.max(1,t.clientHeight);x=Math.min(window.devicePixelRatio||1,2,Math.sqrt(q/(m*h)))*d;let w=Math.max(1,Math.round(m*x)),L=Math.max(1,Math.round(h*x));(t.width!==w||t.height!==L)&&(t.width=w,t.height=L,e.viewport(0,0,w,L))},C=m=>{S(),c.x+=(p.x-c.x)*.06,c.y+=(p.y-c.y)*.06,c.hover+=(p.hover-c.hover)*.05,e.uniform2f(s,t.width,t.height),e.uniform1f(n,v?12:(m-y)/1e3+12),e.uniform2f(i,c.x,c.y),e.uniform1f(l,c.hover),e.uniform1f(g,1/Math.max(x,.5)),e.drawArrays(e.TRIANGLES,0,3),t.dataset.heroShader="ready"},M=0,A=0,f=0,k=m=>{let h=M?m-M:16;M=m,h>25&&h<250?(A++,f=0):h<18&&(f++,A=Math.max(0,A-1)),A>20&&d>.5&&(d=Math.max(.5,d-.15),A=0),f>600&&d<1&&(d=Math.min(1,d+.15),f=0),C(m),b=u&&!document.hidden?requestAnimationFrame(k):0,b||(M=0)},E=()=>{!b&&!v&&u&&!document.hidden&&(b=requestAnimationFrame(k))};if(v){C(y),new ResizeObserver(()=>C(y)).observe(t);return}window.addEventListener("pointermove",m=>{let h=t.getBoundingClientRect(),w=(m.clientX-h.left)/h.width,L=1-(m.clientY-h.top)/h.height,H=w>=0&&w<=1&&L>=0&&L<=1;p.hover=H?1:0,H&&(p.x=w,p.y=L)},{passive:!0}),document.documentElement.addEventListener("pointerleave",()=>{p.hover=0}),new IntersectionObserver(([m])=>{u=m.isIntersecting,E()}).observe(t),document.addEventListener("visibilitychange",E),b=requestAnimationFrame(k)}function P(){let t=document.querySelector("[data-nav-toggle]"),e=t==null?void 0:t.closest("nav"),o=document.querySelector("[data-nav-menu]");if(!t||!e||!o)return;let r=a=>{e.classList.toggle("is-open",a),t.setAttribute("aria-expanded",String(a))};t.addEventListener("click",()=>r(t.getAttribute("aria-expanded")!=="true")),o.addEventListener("click",a=>{a.target.closest("a")&&r(!1)}),document.addEventListener("keydown",a=>{a.key==="Escape"&&e.classList.contains("is-open")&&(r(!1),t.focus())}),matchMedia("(min-width: 992px)").addEventListener("change",a=>{a.matches&&r(!1)})}var G="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",K=`
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
}`,V={glow:{frag:K,budget:3e6,density:t=>Math.min(t,2)}};function Y(t,e){var S,C,M,A;let o=t.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!o)return null;let r=(f,k)=>{var _;let E=o.createShader(f);if(o.shaderSource(E,k),o.compileShader(E),!o.getShaderParameter(E,o.COMPILE_STATUS))throw new Error((_=o.getShaderInfoLog(E))!=null?_:"shader");return E},a=o.createProgram();if(o.attachShader(a,r(o.VERTEX_SHADER,G)),o.attachShader(a,r(o.FRAGMENT_SHADER,e.frag)),o.linkProgram(a),!o.getProgramParameter(a,o.LINK_STATUS))throw new Error((S=o.getProgramInfoLog(a))!=null?S:"program");o.useProgram(a),o.bindBuffer(o.ARRAY_BUFFER,o.createBuffer()),o.bufferData(o.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),o.STATIC_DRAW);let s=o.getAttribLocation(a,"p");o.enableVertexAttribArray(s),o.vertexAttribPointer(s,2,o.FLOAT,!1,0,0);let n=f=>o.getUniformLocation(a,f),i={res:n("u_res"),time:n("u_time"),px:n("u_px"),em:n("u_em"),peak:n("u_peak"),column:n("u_column"),span:n("u_span")},l=Number((C=t.dataset.glowPeak)!=null?C:.5),g=Number((M=t.dataset.glowColumn)!=null?M:4.2),v=Number((A=t.dataset.glowSpan)!=null?A:18.3),p=performance.now(),c=0,u=0,b=!1,y=!1,q=f=>{let k=Math.max(1,t.clientWidth),E=Math.max(1,t.clientHeight),_=Math.min(e.density(window.devicePixelRatio||1),Math.sqrt(e.budget/(k*E))),m=Math.max(1,Math.round(k*_)),h=Math.max(1,Math.round(E*_));(t.width!==m||t.height!==h)&&(t.width=m,t.height=h,o.viewport(0,0,m,h)),o.uniform2f(i.res,m,h),o.uniform1f(i.time,(f-p)/1e3),o.uniform1f(i.px,_),o.uniform1f(i.em,parseFloat(getComputedStyle(t).fontSize)||16),o.uniform1f(i.peak,l),o.uniform1f(i.column,g),o.uniform1f(i.span,v),o.drawArrays(o.TRIANGLES,0,3),t.dataset.ready=""},d=f=>{f-u>=30&&(u=f,q(f)),c=b&&!y&&!document.hidden?requestAnimationFrame(d):0},x=()=>{!c&&b&&!y&&!document.hidden&&(c=requestAnimationFrame(d))};return t.addEventListener("webglcontextlost",f=>{f.preventDefault(),y=!0,delete t.dataset.ready}),document.addEventListener("visibilitychange",x),{show(f){b=f,x()}}}function B(){var s;let t=document.querySelectorAll("canvas[data-panel-shader]");if(!t.length||((s=navigator.connection)==null?void 0:s.saveData)||matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches)return;let o="requestIdleCallback"in window?n=>requestIdleCallback(n,{timeout:1e3}):n=>setTimeout(n,200),r=new Map,a=new IntersectionObserver(n=>{n.forEach(i=>{let l=i.target,g=r.get(l);if(g){g.show(i.isIntersecting);return}g===null||!i.isIntersecting||(r.set(l,null),o(()=>{var p;let v=V[(p=l.dataset.panelShader)!=null?p:""];if(v)try{let c=Y(l,v);r.set(l,c);let u=l.getBoundingClientRect();c==null||c.show(u.bottom>-200&&u.top<window.innerHeight+200)}catch(c){console.error("[panel-shader]",c)}}))})},{rootMargin:"200px 0px"});t.forEach(n=>a.observe(n))}function D(){document.querySelectorAll("[data-slider]").forEach(t=>{let e=t.querySelector("[data-slider-track]"),o=Array.from(t.querySelectorAll("[data-slider-item]"));if(!e||!o.length)return;let r=t.querySelector("[data-slider-prev]"),a=t.querySelector("[data-slider-next]"),s=t.querySelector("[data-slider-current]"),n=t.querySelector("[data-slider-total]"),i=u=>String(u).padStart(2,"0");n&&(n.textContent=i(o.length));let l=()=>o.length>1?o[1].offsetLeft-o[0].offsetLeft:e.clientWidth,g=()=>e.scrollLeft+e.clientWidth>=e.scrollWidth-2?o.length-1:Math.min(o.length-1,Math.round(e.scrollLeft/l())),v=()=>{let u=g();s&&(s.textContent=i(u+1)),r&&(r.disabled=u===0),a&&(a.disabled=u===o.length-1)},p=u=>{let b=matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollBy({left:u*l(),behavior:b?"auto":"smooth"})};r==null||r.addEventListener("click",()=>p(-1)),a==null||a.addEventListener("click",()=>p(1));let c=!1;e.addEventListener("scroll",()=>{c||(c=!0,requestAnimationFrame(()=>{c=!1,v()}))},{passive:!0}),v()})}function U(){document.querySelectorAll("[data-tabs]").forEach(t=>{let e=Array.from(t.querySelectorAll("[data-tabs-tab]")),o=e.map(a=>{var s;return document.getElementById((s=a.getAttribute("aria-controls"))!=null?s:"")});if(!e.length)return;let r=(a,s=!1)=>{e.forEach((n,i)=>{let l=i===a;n.classList.toggle("is-active",l),n.setAttribute("aria-selected",String(l)),n.tabIndex=l?0:-1;let g=o[i];g&&(g.hidden=!l)}),s&&e[a].focus()};e.forEach((a,s)=>{a.addEventListener("click",()=>r(s)),a.addEventListener("keydown",n=>{let i=e.length-1,l=n.key==="ArrowDown"||n.key==="ArrowRight"?s===i?0:s+1:n.key==="ArrowUp"||n.key==="ArrowLeft"?s===0?i:s-1:n.key==="Home"?0:n.key==="End"?i:-1;l<0||(n.preventDefault(),r(l,!0))})})})}function T(t,e){try{e()}catch(o){console.error(`[wfc] ${t} failed to initialize`,o)}}function z(){document.documentElement.classList.remove("is-loading"),T("environment-switcher",R),T("nav",P),T("faq",F),T("hero-shader",I),T("tabs",U),T("slider",D),T("panel-shader",B)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",z,{once:!0}):z();})();
