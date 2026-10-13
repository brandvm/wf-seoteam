"use strict";(()=>{function U(){let e=document.querySelectorAll("[data-chart]");if(!e.length||!("IntersectionObserver"in window)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let t=new Map,o=new IntersectionObserver(n=>{n.forEach(i=>{var r;i.isIntersecting&&(o.unobserve(i.target),(r=t.get(i.target))==null||r.forEach(a=>{a.dataset.chart==="columns"&&a.querySelectorAll("rect").forEach((c,m)=>{c.style.transitionDelay=`${m*90}ms`}),a.dataset.inView=""}))})},{threshold:.5});e.forEach(n=>{var r;let i=n.parentElement;i&&(n.dataset.chartArmed="",t.set(i,[...(r=t.get(i))!=null?r:[],n]),o.observe(i))})}function N(){let e=document.querySelectorAll("[data-count]");if(!e.length)return;let t=(r,a)=>r.toLocaleString("en-CA",{minimumFractionDigits:a,maximumFractionDigits:a}),o=r=>{var c,m;let a=(c=r.dataset.count)!=null?c:"0";return{to:Number(a)||0,decimals:((m=a.split(".")[1])!=null?m:"").length}};if(matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver"in window)){e.forEach(r=>{let{to:a,decimals:c}=o(r);r.textContent=t(a,c)});return}let n=r=>{let{to:a,decimals:c}=o(r);r.style.display="inline-block",r.style.whiteSpace="nowrap",r.textContent=t(a,c);let m=parseFloat(getComputedStyle(r).fontSize)||16;r.style.width=`${r.getBoundingClientRect().width/m}em`,r.textContent=t(0,c);let v=performance.now(),p=d=>{let s=Math.min(1,Math.max(0,(d-v)/1600)),l=1-Math.pow(1-s,3);if(r.textContent=t(a*l,c),s<1){requestAnimationFrame(p);return}r.textContent=t(a,c),r.style.width=r.style.display=r.style.whiteSpace=""};requestAnimationFrame(p)},i=new IntersectionObserver(r=>{r.forEach(a=>{a.isIntersecting&&(i.unobserve(a.target),n(a.target))})},{threshold:.6});e.forEach(r=>i.observe(r))}function O(){var l,h,g,x;let e=window.WFC;if(!/\.webflow\.io$/.test(location.hostname)||!e||location.hostname==="seo-teams.webflow.io"&&!new URLSearchParams(location.search).has("wfc-switcher")||(h=(l=window.Webflow)==null?void 0:l.env)!=null&&h.call(l,"editor")||(x=(g=window.Webflow)==null?void 0:g.env)!=null&&x.call(g,"design")||document.getElementById("wfc-environment"))return;let t=e.source?e.source===e.devBase:!!e.dev,o=!!e.source&&e.source!==e.devBase&&e.source!==e.stag,n=!!e.dev&&!t||o,i=t?"Dev":"Staging",r=document.createElement("div");r.id="wfc-environment";let a=r.attachShadow({mode:"open"});a.innerHTML=`
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
  `;let c=a.querySelector(".control"),m=a.querySelector(".launcher"),v=a.querySelector(".choices"),p=a.querySelector(".status"),d=a.querySelectorAll("[data-mode]");a.querySelector(".label").textContent=i,a.querySelector(".dot").toggleAttribute("data-dev",t),m.setAttribute("aria-label",`Choose environment (${i})`),o&&(p.textContent="Staging unavailable \xB7 using release"),m.title=o?"Staging could not load. Using the pinned release.":n?"Local dev could not load. Using staging.":"Switch between staging and local dev";function s(u,f=!1){var b;m.hidden=u,v.hidden=!u,p.hidden=!u||!n,c.toggleAttribute("data-expanded",u),m.setAttribute("aria-expanded",String(u)),f&&(u?(b=a.querySelector('[aria-pressed="true"]'))==null||b.focus():m.focus())}d.forEach(u=>{let f=u.dataset.mode==="dev";u.setAttribute("aria-pressed",String(f===t)),u.addEventListener("click",()=>{if(f===!!e.dev&&!n)return;let b=new URL(location.href);b.searchParams.set("wfc-dev",f?"1":"0");try{localStorage.setItem("wfc-dev",f?"1":"0")}catch{}location.assign(b.href)})}),m.addEventListener("click",()=>s(!0,!0)),a.querySelector(".minimize").addEventListener("click",()=>s(!1,!0)),c.addEventListener("keydown",u=>{u.key!=="Escape"||v.hidden||(u.preventDefault(),u.stopPropagation(),s(!1,!0))}),document.addEventListener("pointerdown",u=>{u.composedPath().includes(r)||s(!1)}),document.body.appendChild(r)}function z(){let e=matchMedia("(prefers-reduced-motion: reduce)").matches;document.querySelectorAll("[data-faq-trigger]").forEach(o=>{var v,p,d;let n=document.getElementById((v=o.getAttribute("aria-controls"))!=null?v:"");if(!n)return;let i,r=o.querySelector("[data-faq-label]"),a={closed:(p=r==null?void 0:r.textContent)!=null?p:"",open:(d=o.dataset.faqOpenLabel)!=null?d:""},c,m=s=>{if(!r||!a.open)return;let l=s?a.open:a.closed;if(c==null||c.cancel(),e||!r.animate){r.textContent=l;return}c=r.animate([{opacity:1},{opacity:0}],{duration:300/2,easing:"ease-in"}),c.onfinish=()=>{r.textContent=l,c=r.animate([{opacity:0},{opacity:1}],{duration:300/2,easing:"ease-out"})},c.oncancel=()=>{r.textContent=l}};o.addEventListener("click",()=>{let s=o.getAttribute("aria-expanded")!=="true";if(o.setAttribute("aria-expanded",String(s)),m(s),i==null||i.cancel(),e||!n.animate){n.hidden=!s;return}n.hidden=!1;let l=`${n.offsetHeight}px`,{paddingTop:h,paddingBottom:g,marginTop:x}=getComputedStyle(n),u=n.parentElement?getComputedStyle(n.parentElement):null,f=u&&/flex|grid/.test(u.display)&&parseFloat(u.rowGap)||0,b={height:"0px",paddingTop:"0px",paddingBottom:"0px",marginTop:`${parseFloat(x)-f}px`,opacity:0},L={height:l,paddingTop:h,paddingBottom:g,marginTop:x,opacity:1};n.style.overflow="hidden",i=n.animate(s?[b,L]:[L,b],{duration:300,easing:"cubic-bezier(0.4, 0, 0.2, 1)"});let M=()=>{n.style.overflow="",n.hidden=!s};i.onfinish=M,i.oncancel=()=>{n.style.overflow=""}})})}var j="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",X=`
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
}`;function G(){let e=Array.from(document.querySelectorAll("canvas[data-hero-shader]"));if(!e.length)return;let t=matchMedia("(max-width: 767px)").matches,o="requestIdleCallback"in window?n=>requestIdleCallback(n,{timeout:1e3}):n=>setTimeout(n,200);e.forEach(n=>{let i=()=>o(()=>{try{J(n)}catch(c){console.error("[hero-shader]",c)}}),r=n.getBoundingClientRect();if(r.top<window.innerHeight&&r.bottom>0){let c=()=>requestAnimationFrame(()=>requestAnimationFrame(i));document.readyState==="complete"?c():window.addEventListener("load",c,{once:!0});return}if(t)return;let a=new IntersectionObserver(([c])=>{c.isIntersecting&&(a.disconnect(),i())},{rootMargin:"300px 0px"});a.observe(n)})}function J(e){var R;let t=e.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!t)return;let o=(w,y)=>{var _;let E=t.createShader(w);if(t.shaderSource(E,y),t.compileShader(E),!t.getShaderParameter(E,t.COMPILE_STATUS))throw new Error((_=t.getShaderInfoLog(E))!=null?_:"shader");return E},n=t.createProgram();if(t.attachShader(n,o(t.VERTEX_SHADER,j)),t.attachShader(n,o(t.FRAGMENT_SHADER,X)),t.linkProgram(n),!t.getProgramParameter(n,t.LINK_STATUS))throw new Error((R=t.getProgramInfoLog(n))!=null?R:"program");t.useProgram(n),t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW);let i=t.getAttribLocation(n,"p");t.enableVertexAttribArray(i),t.vertexAttribPointer(i,2,t.FLOAT,!1,0,0);let r=t.getUniformLocation(n,"u_res"),a=t.getUniformLocation(n,"u_time"),c=t.getUniformLocation(n,"u_mouse"),m=t.getUniformLocation(n,"u_hover"),v=t.getUniformLocation(n,"u_grain");t.uniform1f(t.getUniformLocation(n,"u_dark"),e.dataset.shaderTheme==="dark"?1:0);let p=matchMedia("(prefers-reduced-motion: reduce)").matches,d={x:.3,y:.4,hover:0},s={x:.3,y:.4,hover:0},l=!0,h=0,g=performance.now(),x=25e5,u=1,f=1,b=()=>{let w=Math.max(1,e.clientWidth),y=Math.max(1,e.clientHeight);f=Math.min(window.devicePixelRatio||1,2,Math.sqrt(x/(w*y)))*u;let E=Math.max(1,Math.round(w*f)),_=Math.max(1,Math.round(y*f));(e.width!==E||e.height!==_)&&(e.width=E,e.height=_,t.viewport(0,0,E,_))},L=w=>{b(),s.x+=(d.x-s.x)*.06,s.y+=(d.y-s.y)*.06,s.hover+=(d.hover-s.hover)*.05,t.uniform2f(r,e.width,e.height),t.uniform1f(a,p?12:(w-g)/1e3+12),t.uniform2f(c,s.x,s.y),t.uniform1f(m,s.hover),t.uniform1f(v,1/Math.max(f,.5)),t.drawArrays(t.TRIANGLES,0,3),e.dataset.heroShader="ready"},M=0,T=0,C=0,H=w=>{let y=M?w-M:16;M=w,y>25&&y<250?(T++,C=0):y<18&&(C++,T=Math.max(0,T-1)),T>20&&u>.5&&(u=Math.max(.5,u-.15),T=0),C>600&&u<1&&(u=Math.min(1,u+.15),C=0),L(w),h=l&&!document.hidden?requestAnimationFrame(H):0,h||(M=0)},F=()=>{!h&&!p&&l&&!document.hidden&&(h=requestAnimationFrame(H))};if(p){L(g),new ResizeObserver(()=>L(g)).observe(e);return}window.addEventListener("pointermove",w=>{let y=e.getBoundingClientRect(),E=(w.clientX-y.left)/y.width,_=1-(w.clientY-y.top)/y.height,I=E>=0&&E<=1&&_>=0&&_<=1;d.hover=I?1:0,I&&(d.x=E,d.y=_)},{passive:!0}),document.documentElement.addEventListener("pointerleave",()=>{d.hover=0}),new IntersectionObserver(([w])=>{l=w.isIntersecting,F()}).observe(e),document.addEventListener("visibilitychange",F),h=requestAnimationFrame(H)}function W(){let e=document.querySelector("[data-nav-toggle]"),t=e==null?void 0:e.closest("nav"),o=document.querySelector("[data-nav-menu]");if(!e||!t||!o)return;let n=i=>{t.classList.toggle("is-open",i),e.setAttribute("aria-expanded",String(i))};e.addEventListener("click",()=>n(e.getAttribute("aria-expanded")!=="true")),o.addEventListener("click",i=>{i.target.closest("a")&&n(!1)}),document.addEventListener("keydown",i=>{i.key==="Escape"&&t.classList.contains("is-open")&&(n(!1),e.focus())}),matchMedia("(min-width: 992px)").addEventListener("change",i=>{i.matches&&n(!1)})}var Q="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",Z=`
precision highp float;
uniform vec2 u_res;     // canvas pixels
uniform float u_time;
uniform float u_px;     // canvas pixels per CSS pixel
uniform float u_em;     // CSS pixels per em
uniform float u_peak;
uniform float u_column; // column width in em
uniform float u_span;   // columns in one wave
uniform vec3 u_base;    // the panel's background colour
uniform float u_strength;
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

  float alpha = u_strength * smoothstep(0.02, 0.30, t);
  // Column dividers: a hard 1px line (one CSS pixel) at each column's left edge.
  alpha *= 1.0 - 0.6 * step(f * col, 1.0);
  vec3 color = mix(u_base, ramp(t), clamp(alpha, 0.0, 1.0));
  // Half a level of dither so the dark gradient doesn't band; not visible.
  color += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  gl_FragColor = vec4(color, 1.0);
}`,ee=`
precision highp float;
uniform vec2 u_res;
uniform float u_time;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float light(vec2 p, vec2 c, vec2 r, float a) {
  vec2 d = p - c;
  float cs = cos(a), sn = sin(a);
  d = vec2(cs * d.x + sn * d.y, -sn * d.x + cs * d.y) / r;
  return exp(-dot(d, d));
}
void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  uv.y = 1.0 - uv.y;
  float t = u_time * 0.3;
  vec3 color = vec3(0.070, 0.050, 0.046);
  // The main glow and its brighter upper edge.
  color += vec3(0.400, 0.105, 0.045) * light(uv, vec2(0.68 + 0.06 * sin(t * 1.3), 0.56 + 0.08 * cos(t)), vec2(0.29, 0.37), 0.0);
  color += vec3(0.170, 0.095, 0.020) * light(uv, vec2(0.70 + 0.07 * cos(t * 0.9 + 1.0), 0.36 + 0.06 * sin(t * 1.1)), vec2(0.24, 0.11), -0.12);
  // The amber streak coming in from the left.
  color += vec3(0.150, 0.085, 0.030) * light(uv, vec2(0.30 + 0.06 * sin(t * 0.7 + 2.0), 0.47 + 0.06 * cos(t * 0.8)), vec2(0.42, 0.065), -0.33 + 0.10 * sin(t * 0.6));
  // Corners.
  color += vec3(0.150, 0.030, 0.025) * light(uv, vec2(0.93, 0.10 + 0.05 * sin(t * 0.8)), vec2(0.30, 0.22), 0.0);
  color += vec3(0.080, 0.045, 0.020) * light(uv, vec2(0.03, 0.97), vec2(0.26, 0.20), 0.0);
  color += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  gl_FragColor = vec4(color, 1.0);
}`,te={glow:{frag:Z,budget:3e6,density:e=>Math.min(e,2)},ember:{frag:ee,budget:5e5,density:()=>.5}};function oe(e,t){var C,H,F,R,w,y,E,_,I;let o=e.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!o)return null;let n=(S,P)=>{var q;let k=o.createShader(S);if(o.shaderSource(k,P),o.compileShader(k),!o.getShaderParameter(k,o.COMPILE_STATUS))throw new Error((q=o.getShaderInfoLog(k))!=null?q:"shader");return k},i=o.createProgram();if(o.attachShader(i,n(o.VERTEX_SHADER,Q)),o.attachShader(i,n(o.FRAGMENT_SHADER,t.frag)),o.linkProgram(i),!o.getProgramParameter(i,o.LINK_STATUS))throw new Error((C=o.getProgramInfoLog(i))!=null?C:"program");o.useProgram(i),o.bindBuffer(o.ARRAY_BUFFER,o.createBuffer()),o.bufferData(o.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),o.STATIC_DRAW);let r=o.getAttribLocation(i,"p");o.enableVertexAttribArray(r),o.vertexAttribPointer(r,2,o.FLOAT,!1,0,0);let a=S=>o.getUniformLocation(i,S),c={res:a("u_res"),time:a("u_time"),px:a("u_px"),em:a("u_em"),peak:a("u_peak"),column:a("u_column"),span:a("u_span"),base:a("u_base"),strength:a("u_strength")},m=Number((H=e.dataset.glowPeak)!=null?H:.5),v=Number((F=e.dataset.glowColumn)!=null?F:4.2),p=Number((R=e.dataset.glowSpan)!=null?R:18.3),d=Number((w=e.dataset.glowStrength)!=null?w:.7),s=(_=(E=/^#?([0-9a-f]{6})$/i.exec((y=e.dataset.glowBase)!=null?y:""))==null?void 0:E[1])!=null?_:"200f09",l=[0,2,4].map(S=>parseInt(s.slice(S,S+2),16)/255),h=Number((I=e.dataset.shaderSpeed)!=null?I:1)||1,g=performance.now(),x=0,u=0,f=!1,b=!1,L=S=>{let P=Math.max(1,e.clientWidth),k=Math.max(1,e.clientHeight),q=Math.min(t.density(window.devicePixelRatio||1),Math.sqrt(t.budget/(P*k))),B=Math.max(1,Math.round(P*q)),D=Math.max(1,Math.round(k*q));(e.width!==B||e.height!==D)&&(e.width=B,e.height=D,o.viewport(0,0,B,D)),o.uniform2f(c.res,B,D),o.uniform1f(c.time,(S-g)/1e3*h),o.uniform1f(c.px,q),o.uniform1f(c.em,parseFloat(getComputedStyle(e).fontSize)||16),o.uniform1f(c.peak,m),o.uniform1f(c.column,v),o.uniform1f(c.span,p),o.uniform3f(c.base,l[0],l[1],l[2]),o.uniform1f(c.strength,d),o.drawArrays(o.TRIANGLES,0,3),e.dataset.ready=""},M=S=>{S-u>=30&&(u=S,L(S)),x=f&&!b&&!document.hidden?requestAnimationFrame(M):0},T=()=>{!x&&f&&!b&&!document.hidden&&(x=requestAnimationFrame(M))};return e.addEventListener("webglcontextlost",S=>{S.preventDefault(),b=!0,delete e.dataset.ready}),document.addEventListener("visibilitychange",T),{show(S){f=S,T()}}}function $(){var r;let e=document.querySelectorAll("canvas[data-panel-shader]");if(!e.length||((r=navigator.connection)==null?void 0:r.saveData)||matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches)return;let o="requestIdleCallback"in window?a=>requestIdleCallback(a,{timeout:1e3}):a=>setTimeout(a,200),n=new Map,i=new IntersectionObserver(a=>{a.forEach(c=>{let m=c.target,v=n.get(m);if(v){v.show(c.isIntersecting);return}v===null||!c.isIntersecting||(n.set(m,null),o(()=>{var d;let p=te[(d=m.dataset.panelShader)!=null?d:""];if(p)try{let s=oe(m,p);n.set(m,s);let l=m.getBoundingClientRect();s==null||s.show(l.bottom>-200&&l.top<window.innerHeight+200)}catch(s){console.error("[panel-shader]",s)}}))})},{rootMargin:"200px 0px"});e.forEach(a=>i.observe(a))}function V(){document.querySelectorAll("[data-slider]").forEach(e=>{let t=e.querySelector("[data-slider-track]"),o=Array.from(e.querySelectorAll("[data-slider-item]"));if(!t||!o.length)return;let n=e.querySelector("[data-slider-prev]"),i=e.querySelector("[data-slider-next]"),r=e.querySelector("[data-slider-current]"),a=e.querySelector("[data-slider-total]"),c=l=>String(l).padStart(2,"0");a&&(a.textContent=c(o.length));let m=()=>o.length>1?o[1].offsetLeft-o[0].offsetLeft:t.clientWidth,v=()=>t.scrollLeft+t.clientWidth>=t.scrollWidth-2?o.length-1:Math.min(o.length-1,Math.round(t.scrollLeft/m())),p=()=>{let l=v();r&&(r.textContent=c(l+1)),n&&(n.disabled=l===0),i&&(i.disabled=l===o.length-1)},d=l=>{let h=matchMedia("(prefers-reduced-motion: reduce)").matches;t.scrollBy({left:l*m(),behavior:h?"auto":"smooth"})};n==null||n.addEventListener("click",()=>d(-1)),i==null||i.addEventListener("click",()=>d(1));let s=!1;t.addEventListener("scroll",()=>{s||(s=!0,requestAnimationFrame(()=>{s=!1,p()}))},{passive:!0}),p()})}function K(){document.querySelectorAll("[data-tabs]").forEach(e=>{let t=Array.from(e.querySelectorAll("[data-tabs-tab]")),o=t.map(d=>{var s;return document.getElementById((s=d.getAttribute("aria-controls"))!=null?s:"")});if(!t.length)return;let n=Math.max(0,t.findIndex(d=>d.getAttribute("aria-selected")==="true")),i=matchMedia("(prefers-reduced-motion: reduce)").matches,r=0,a=()=>{window.clearTimeout(r),r=0,o.forEach((d,s)=>{if(!d)return;d.classList.remove("is-entering","is-leaving"),d.hidden=s!==n;let l=d.querySelector("[data-tabs-box]");l&&(l.style.height=l.style.overflow=l.style.transition="")})},c=(d,s=!1)=>{var u;let l=o[n],h=o[d],g=!i&&d!==n&&!!l&&!!h;a();let x=g?(u=l.querySelector("[data-tabs-box]"))==null?void 0:u.offsetHeight:void 0;if(n=d,t.forEach((f,b)=>{let L=b===d;f.classList.toggle("is-active",L),f.setAttribute("aria-selected",String(L)),f.tabIndex=L?0:-1;let M=o[b];M&&(M.hidden=!L)}),g){l.hidden=!1,l.classList.add("is-leaving"),h.classList.add("is-entering");let f=h.querySelector("[data-tabs-box]");if(f&&x){let b=f.offsetHeight;f.style.overflow="hidden",f.style.height=`${x}px`,f.getBoundingClientRect(),f.style.transition=`height ${700*.7}ms cubic-bezier(0.4, 0, 0.2, 1)`,f.style.height=`${b}px`}r=window.setTimeout(a,700)}s&&t[d].focus()},m=Number(e.dataset.tabsAuto),v=m>0&&t.length>1&&!!e.querySelector("[data-tabs-progress]")&&!i,p=()=>{};if(v){let d=!1,s=!1,l=!1,h=()=>{s?e.dataset.tabsRunning="stopped":d&&!document.hidden?e.dataset.tabsRunning="true":delete e.dataset.tabsRunning};p=()=>{s=!0,h()},e.style.setProperty("--tabs-auto",`${m}s`),e.addEventListener("animationend",g=>{g.target.matches("[data-tabs-progress]")&&c((n+1)%t.length)}),new IntersectionObserver(g=>{d=g[g.length-1].isIntersecting,d||(s=!1),d&&!l&&(l=!0,o.forEach(x=>x==null?void 0:x.querySelectorAll('img[loading="lazy"]').forEach(u=>{new Image().src=u.currentSrc||u.src}))),h()},{threshold:.25}).observe(e),document.addEventListener("visibilitychange",h)}t.forEach((d,s)=>{d.addEventListener("click",()=>{p(),c(s)}),d.addEventListener("keydown",l=>{let h=t.length-1,g=l.key==="ArrowDown"||l.key==="ArrowRight"?s===h?0:s+1:l.key==="ArrowUp"||l.key==="ArrowLeft"?s===0?h:s-1:l.key==="Home"?0:l.key==="End"?h:-1;g<0||(l.preventDefault(),p(),c(g,!0))})})})}function A(e,t){try{t()}catch(o){console.error(`[wfc] ${e} failed to initialize`,o)}}function Y(){document.documentElement.classList.remove("is-loading"),A("environment-switcher",O),A("nav",W),A("faq",z),A("hero-shader",G),A("tabs",K),A("slider",V),A("panel-shader",$),A("charts",U),A("count-up",N)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Y,{once:!0}):Y();})();
