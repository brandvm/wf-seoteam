"use strict";(()=>{function U(){let e=document.querySelectorAll("[data-chart]");if(!e.length||!("IntersectionObserver"in window)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let t=new Map,o=new IntersectionObserver(s=>{s.forEach(n=>{var a;n.isIntersecting&&(o.unobserve(n.target),(a=t.get(n.target))==null||a.forEach(r=>{r.dataset.chart==="columns"&&r.querySelectorAll("rect").forEach((l,m)=>{l.style.transitionDelay=`${m*90}ms`}),r.dataset.inView=""}))})},{threshold:.5});e.forEach(s=>{var a;let n=s.parentElement;n&&(s.dataset.chartArmed="",t.set(n,[...(a=t.get(n))!=null?a:[],s]),o.observe(n))})}function O(){let e=document.querySelectorAll("[data-count]");if(!e.length)return;let t=(a,r)=>a.toLocaleString("en-CA",{minimumFractionDigits:r,maximumFractionDigits:r}),o=a=>{var l,m;let r=(l=a.dataset.count)!=null?l:"0";return{to:Number(r)||0,decimals:((m=r.split(".")[1])!=null?m:"").length}};if(matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver"in window)){e.forEach(a=>{let{to:r,decimals:l}=o(a);a.textContent=t(r,l)});return}let s=a=>{let{to:r,decimals:l}=o(a);a.style.display="inline-block",a.style.whiteSpace="nowrap",a.textContent=t(r,l);let m=parseFloat(getComputedStyle(a).fontSize)||16;a.style.width=`${a.getBoundingClientRect().width/m}em`,a.textContent=t(0,l);let w=performance.now(),b=g=>{let f=Math.min(1,Math.max(0,(g-w)/1600)),i=1-Math.pow(1-f,3);if(a.textContent=t(r*i,l),f<1){requestAnimationFrame(b);return}a.textContent=t(r,l),a.style.width=a.style.display=a.style.whiteSpace=""};requestAnimationFrame(b)},n=new IntersectionObserver(a=>{a.forEach(r=>{r.isIntersecting&&(n.unobserve(r.target),s(r.target))})},{threshold:.6});e.forEach(a=>n.observe(a))}function z(){var i,u,c,h;let e=window.WFC;if(!/\.webflow\.io$/.test(location.hostname)||!e||location.hostname==="seo-teams.webflow.io"&&!new URLSearchParams(location.search).has("wfc-switcher")||(u=(i=window.Webflow)==null?void 0:i.env)!=null&&u.call(i,"editor")||(h=(c=window.Webflow)==null?void 0:c.env)!=null&&h.call(c,"design")||document.getElementById("wfc-environment"))return;let t=e.source?e.source===e.devBase:!!e.dev,o=!!e.source&&e.source!==e.devBase&&e.source!==e.stag,s=!!e.dev&&!t||o,n=t?"Dev":"Staging",a=document.createElement("div");a.id="wfc-environment";let r=a.attachShadow({mode:"open"});r.innerHTML=`
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
  `;let l=r.querySelector(".control"),m=r.querySelector(".launcher"),w=r.querySelector(".choices"),b=r.querySelector(".status"),g=r.querySelectorAll("[data-mode]");r.querySelector(".label").textContent=n,r.querySelector(".dot").toggleAttribute("data-dev",t),m.setAttribute("aria-label",`Choose environment (${n})`),o&&(b.textContent="Staging unavailable \xB7 using release"),m.title=o?"Staging could not load. Using the pinned release.":s?"Local dev could not load. Using staging.":"Switch between staging and local dev";function f(d,p=!1){var v;m.hidden=d,w.hidden=!d,b.hidden=!d||!s,l.toggleAttribute("data-expanded",d),m.setAttribute("aria-expanded",String(d)),p&&(d?(v=r.querySelector('[aria-pressed="true"]'))==null||v.focus():m.focus())}g.forEach(d=>{let p=d.dataset.mode==="dev";d.setAttribute("aria-pressed",String(p===t)),d.addEventListener("click",()=>{if(p===!!e.dev&&!s)return;let v=new URL(location.href);v.searchParams.set("wfc-dev",p?"1":"0");try{localStorage.setItem("wfc-dev",p?"1":"0")}catch{}location.assign(v.href)})}),m.addEventListener("click",()=>f(!0,!0)),r.querySelector(".minimize").addEventListener("click",()=>f(!1,!0)),l.addEventListener("keydown",d=>{d.key!=="Escape"||w.hidden||(d.preventDefault(),d.stopPropagation(),f(!1,!0))}),document.addEventListener("pointerdown",d=>{d.composedPath().includes(a)||f(!1)}),document.body.appendChild(a)}function G(){let e=matchMedia("(prefers-reduced-motion: reduce)").matches;document.querySelectorAll("[data-faq-trigger]").forEach((o,s)=>{var b,g,f,i,u;let n=document.getElementById((b=o.getAttribute("aria-controls"))!=null?b:"");if(!n){if(n=(f=(g=o.closest("[data-faq-item]"))==null?void 0:g.querySelector("[data-faq-panel]"))!=null?f:null,!n)return;n.id||(n.id=`faq-panel-${s+1}`),o.setAttribute("aria-controls",n.id),o.getAttribute("aria-expanded")!=="true"&&(o.setAttribute("aria-expanded","false"),n.hidden=!0)}let a,r=o.querySelector("[data-faq-label]"),l={closed:(i=r==null?void 0:r.textContent)!=null?i:"",open:(u=o.dataset.faqOpenLabel)!=null?u:""},m,w=c=>{if(!r||!l.open)return;let h=c?l.open:l.closed;if(m==null||m.cancel(),e||!r.animate){r.textContent=h;return}m=r.animate([{opacity:1},{opacity:0}],{duration:300/2,easing:"ease-in"}),m.onfinish=()=>{r.textContent=h,m=r.animate([{opacity:0},{opacity:1}],{duration:300/2,easing:"ease-out"})},m.oncancel=()=>{r.textContent=h}};o.addEventListener("click",()=>{let c=o.getAttribute("aria-expanded")!=="true";if(o.setAttribute("aria-expanded",String(c)),w(c),a==null||a.cancel(),e||!n.animate){n.hidden=!c;return}n.hidden=!1;let h=`${n.offsetHeight}px`,{paddingTop:d,paddingBottom:p,marginTop:v}=getComputedStyle(n),x=n.parentElement?getComputedStyle(n.parentElement):null,A=x&&/flex|grid/.test(x.display)&&parseFloat(x.rowGap)||0,E={height:"0px",paddingTop:"0px",paddingBottom:"0px",marginTop:`${parseFloat(v)-A}px`,opacity:0},M={height:h,paddingTop:d,paddingBottom:p,marginTop:v,opacity:1};n.style.overflow="hidden",a=n.animate(c?[E,M]:[M,E],{duration:300,easing:"cubic-bezier(0.4, 0, 0.2, 1)"});let k=()=>{n.style.overflow="",n.hidden=!c};a.onfinish=k,a.oncancel=()=>{n.style.overflow=""}})})}var X="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",J=`
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
}`;function W(){let e=Array.from(document.querySelectorAll("canvas[data-hero-shader]"));if(!e.length)return;let t=matchMedia("(max-width: 767px)").matches,o="requestIdleCallback"in window?s=>requestIdleCallback(s,{timeout:1e3}):s=>setTimeout(s,200);e.forEach(s=>{let n=()=>o(()=>{try{Z(s)}catch(l){console.error("[hero-shader]",l)}}),a=s.getBoundingClientRect();if(a.top<window.innerHeight&&a.bottom>0){let l=()=>requestAnimationFrame(()=>requestAnimationFrame(n));document.readyState==="complete"?l():window.addEventListener("load",l,{once:!0});return}if(t)return;let r=new IntersectionObserver(([l])=>{l.isIntersecting&&(r.disconnect(),n())},{rootMargin:"300px 0px"});r.observe(s)})}function Q(e){let t=e.getExtension("WEBGL_debug_renderer_info"),o=String(t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER));return/swiftshader|llvmpipe|software|basic render/i.test(o)}function Z(e){var F,I;let t=e.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!t)return;if(Q(t)){(F=t.getExtension("WEBGL_lose_context"))==null||F.loseContext();return}let o=(y,S)=>{var T;let _=t.createShader(y);if(t.shaderSource(_,S),t.compileShader(_),!t.getShaderParameter(_,t.COMPILE_STATUS))throw new Error((T=t.getShaderInfoLog(_))!=null?T:"shader");return _},s=t.createProgram();if(t.attachShader(s,o(t.VERTEX_SHADER,X)),t.attachShader(s,o(t.FRAGMENT_SHADER,J)),t.linkProgram(s),!t.getProgramParameter(s,t.LINK_STATUS))throw new Error((I=t.getProgramInfoLog(s))!=null?I:"program");t.useProgram(s),t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW);let n=t.getAttribLocation(s,"p");t.enableVertexAttribArray(n),t.vertexAttribPointer(n,2,t.FLOAT,!1,0,0);let a=t.getUniformLocation(s,"u_res"),r=t.getUniformLocation(s,"u_time"),l=t.getUniformLocation(s,"u_mouse"),m=t.getUniformLocation(s,"u_hover"),w=t.getUniformLocation(s,"u_grain");t.uniform1f(t.getUniformLocation(s,"u_dark"),e.dataset.shaderTheme==="dark"?1:0);let b=matchMedia("(prefers-reduced-motion: reduce)").matches,g={x:.3,y:.4,hover:0},f={x:.3,y:.4,hover:0},i=!0,u=0,c=performance.now(),h=25e5,d=1,p=1,v=()=>{let y=Math.max(1,e.clientWidth),S=Math.max(1,e.clientHeight);p=Math.min(window.devicePixelRatio||1,2,Math.sqrt(h/(y*S)))*d;let _=Math.max(1,Math.round(y*p)),T=Math.max(1,Math.round(S*p));(e.width!==_||e.height!==T)&&(e.width=_,e.height=T,t.viewport(0,0,_,T))},x=y=>{v(),f.x+=(g.x-f.x)*.06,f.y+=(g.y-f.y)*.06,f.hover+=(g.hover-f.hover)*.05,t.uniform2f(a,e.width,e.height),t.uniform1f(r,b?12:(y-c)/1e3+12),t.uniform2f(l,f.x,f.y),t.uniform1f(m,f.hover),t.uniform1f(w,1/Math.max(p,.5)),t.drawArrays(t.TRIANGLES,0,3),e.dataset.heroShader="ready"},A=0,E=0,M=0,k=y=>{let S=A?y-A:16;A=y,S>25&&S<250?(E++,M=0):S<18&&(M++,E=Math.max(0,E-1)),E>20&&d>.5&&(d=Math.max(.5,d-.15),E=0),M>600&&d<1&&(d=Math.min(1,d+.15),M=0),x(y),u=i&&!document.hidden?requestAnimationFrame(k):0,u||(A=0)},R=()=>{!u&&!b&&i&&!document.hidden&&(u=requestAnimationFrame(k))};if(b){x(c),new ResizeObserver(()=>x(c)).observe(e);return}window.addEventListener("pointermove",y=>{let S=e.getBoundingClientRect(),_=(y.clientX-S.left)/S.width,T=1-(y.clientY-S.top)/S.height,B=_>=0&&_<=1&&T>=0&&T<=1;g.hover=B?1:0,B&&(g.x=_,g.y=T)},{passive:!0}),document.documentElement.addEventListener("pointerleave",()=>{g.hover=0}),new IntersectionObserver(([y])=>{i=y.isIntersecting,R()}).observe(e),document.addEventListener("visibilitychange",R),u=requestAnimationFrame(k)}function $(){let e=document.querySelector("[data-nav-toggle]"),t=e==null?void 0:e.closest("nav"),o=document.querySelector("[data-nav-menu]");if(!e||!t||!o)return;let s=n=>{t.classList.toggle("is-open",n),e.setAttribute("aria-expanded",String(n))};e.addEventListener("click",()=>s(e.getAttribute("aria-expanded")!=="true")),o.addEventListener("click",n=>{n.target.closest("a")&&s(!1)}),document.addEventListener("keydown",n=>{n.key==="Escape"&&t.classList.contains("is-open")&&(s(!1),e.focus())}),matchMedia("(min-width: 992px)").addEventListener("change",n=>{n.matches&&s(!1)})}var ee="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",te=`
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
}`,oe=`
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
}`,ne={glow:{frag:te,budget:3e6,density:e=>Math.min(e,2)},ember:{frag:oe,budget:5e5,density:()=>.5}};function re(e){let t=e.getExtension("WEBGL_debug_renderer_info"),o=String(t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER));return/swiftshader|llvmpipe|software|basic render/i.test(o)}function ae(e,t){var M,k,R,F,I,y,S,_,T,B;let o=e.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!o)return null;if(re(o))return(M=o.getExtension("WEBGL_lose_context"))==null||M.loseContext(),null;let s=(L,P)=>{var H;let q=o.createShader(L);if(o.shaderSource(q,P),o.compileShader(q),!o.getShaderParameter(q,o.COMPILE_STATUS))throw new Error((H=o.getShaderInfoLog(q))!=null?H:"shader");return q},n=o.createProgram();if(o.attachShader(n,s(o.VERTEX_SHADER,ee)),o.attachShader(n,s(o.FRAGMENT_SHADER,t.frag)),o.linkProgram(n),!o.getProgramParameter(n,o.LINK_STATUS))throw new Error((k=o.getProgramInfoLog(n))!=null?k:"program");o.useProgram(n),o.bindBuffer(o.ARRAY_BUFFER,o.createBuffer()),o.bufferData(o.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),o.STATIC_DRAW);let a=o.getAttribLocation(n,"p");o.enableVertexAttribArray(a),o.vertexAttribPointer(a,2,o.FLOAT,!1,0,0);let r=L=>o.getUniformLocation(n,L),l={res:r("u_res"),time:r("u_time"),px:r("u_px"),em:r("u_em"),peak:r("u_peak"),column:r("u_column"),span:r("u_span"),base:r("u_base"),strength:r("u_strength")},m=Number((R=e.dataset.glowPeak)!=null?R:.5),w=Number((F=e.dataset.glowColumn)!=null?F:4.2),b=Number((I=e.dataset.glowSpan)!=null?I:18.3),g=Number((y=e.dataset.glowStrength)!=null?y:.7),f=(T=(_=/^#?([0-9a-f]{6})$/i.exec((S=e.dataset.glowBase)!=null?S:""))==null?void 0:_[1])!=null?T:"200f09",i=[0,2,4].map(L=>parseInt(f.slice(L,L+2),16)/255),u=Number((B=e.dataset.shaderSpeed)!=null?B:1)||1,c=performance.now(),h=0,d=0,p=!1,v=!1,x=L=>{let P=Math.max(1,e.clientWidth),q=Math.max(1,e.clientHeight),H=Math.min(t.density(window.devicePixelRatio||1),Math.sqrt(t.budget/(P*q))),D=Math.max(1,Math.round(P*H)),N=Math.max(1,Math.round(q*H));(e.width!==D||e.height!==N)&&(e.width=D,e.height=N,o.viewport(0,0,D,N)),o.uniform2f(l.res,D,N),o.uniform1f(l.time,(L-c)/1e3*u),o.uniform1f(l.px,H),o.uniform1f(l.em,parseFloat(getComputedStyle(e).fontSize)||16),o.uniform1f(l.peak,m),o.uniform1f(l.column,w),o.uniform1f(l.span,b),o.uniform3f(l.base,i[0],i[1],i[2]),o.uniform1f(l.strength,g),o.drawArrays(o.TRIANGLES,0,3),e.dataset.ready=""},A=L=>{L-d>=30&&(d=L,x(L)),h=p&&!v&&!document.hidden?requestAnimationFrame(A):0},E=()=>{!h&&p&&!v&&!document.hidden&&(h=requestAnimationFrame(A))};return e.addEventListener("webglcontextlost",L=>{L.preventDefault(),v=!0,delete e.dataset.ready}),document.addEventListener("visibilitychange",E),{show(L){p=L,E()}}}function V(){var a;let e=document.querySelectorAll("canvas[data-panel-shader]");if(!e.length||((a=navigator.connection)==null?void 0:a.saveData)||matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches)return;let o="requestIdleCallback"in window?r=>requestIdleCallback(r,{timeout:1e3}):r=>setTimeout(r,200),s=new Map,n=new IntersectionObserver(r=>{r.forEach(l=>{let m=l.target,w=s.get(m);if(w){w.show(l.isIntersecting);return}w===null||!l.isIntersecting||(s.set(m,null),o(()=>{var g;let b=ne[(g=m.dataset.panelShader)!=null?g:""];if(b)try{let f=ae(m,b);s.set(m,f);let i=m.getBoundingClientRect();f==null||f.show(i.bottom>-200&&i.top<window.innerHeight+200)}catch(f){console.error("[panel-shader]",f)}}))})},{rootMargin:"200px 0px"});e.forEach(r=>n.observe(r))}function K(){document.querySelectorAll("[data-slider]").forEach(e=>{let t=e.querySelector("[data-slider-track]"),o=Array.from(e.querySelectorAll("[data-slider-item]"));if(!t||!o.length)return;let s=e.querySelector("[data-slider-prev]"),n=e.querySelector("[data-slider-next]"),a=e.querySelector("[data-slider-current]"),r=e.querySelector("[data-slider-total]"),l=i=>String(i).padStart(2,"0");r&&(r.textContent=l(o.length));let m=()=>o.length>1?o[1].offsetLeft-o[0].offsetLeft:t.clientWidth,w=()=>t.scrollLeft+t.clientWidth>=t.scrollWidth-2?o.length-1:Math.min(o.length-1,Math.round(t.scrollLeft/m())),b=()=>{let i=w();a&&(a.textContent=l(i+1)),s&&(s.disabled=i===0),n&&(n.disabled=i===o.length-1)},g=i=>{let u=matchMedia("(prefers-reduced-motion: reduce)").matches;t.scrollBy({left:i*m(),behavior:u?"auto":"smooth"})};s==null||s.addEventListener("click",()=>g(-1)),n==null||n.addEventListener("click",()=>g(1));let f=!1;t.addEventListener("scroll",()=>{f||(f=!0,requestAnimationFrame(()=>{f=!1,b()}))},{passive:!0}),b()})}function Y(){document.querySelectorAll("[data-tabs]").forEach(e=>{let t=Array.from(e.querySelectorAll("[data-tabs-tab]"));if(!t.length)return;let o=Array.from(e.querySelectorAll("[data-tabs-panel]")),s=e.id||`tabs-${Array.from(document.querySelectorAll("[data-tabs]")).indexOf(e)+1}`,n=t.map((i,u)=>{var h,d,p;let c=(p=(d=document.getElementById((h=i.getAttribute("aria-controls"))!=null?h:""))!=null?d:o[u])!=null?p:null;return c&&(i.id||(i.id=`${s}-tab-${u+1}`),c.id||(c.id=`${s}-panel-${u+1}`),i.setAttribute("aria-controls",c.id),c.setAttribute("role","tabpanel"),c.setAttribute("aria-labelledby",i.id)),i.setAttribute("role","tab"),i.querySelectorAll("[data-tabs-number]").forEach(v=>{v.textContent=String(u+1).padStart(2,"0")}),c==null||c.querySelectorAll("[data-tabs-step]").forEach(v=>{v.textContent=String(u+1)}),c}),a=Math.max(0,t.findIndex(i=>i.getAttribute("aria-selected")==="true"));t.forEach((i,u)=>{let c=u===a;i.classList.toggle("is-active",c),i.setAttribute("aria-selected",String(c)),i.tabIndex=c?0:-1,n[u]&&(n[u].hidden=!c)});let r=matchMedia("(prefers-reduced-motion: reduce)").matches,l=0,m=()=>{window.clearTimeout(l),l=0,n.forEach((i,u)=>{if(!i)return;i.classList.remove("is-entering","is-leaving"),i.hidden=u!==a;let c=i.querySelector("[data-tabs-box]");c&&(c.style.height=c.style.overflow=c.style.transition="")})},w=(i,u=!1)=>{var v;let c=n[a],h=n[i],d=!r&&i!==a&&!!c&&!!h;m();let p=d?(v=c.querySelector("[data-tabs-box]"))==null?void 0:v.offsetHeight:void 0;if(a=i,t.forEach((x,A)=>{let E=A===i;x.classList.toggle("is-active",E),x.setAttribute("aria-selected",String(E)),x.tabIndex=E?0:-1;let M=n[A];M&&(M.hidden=!E)}),d){c.hidden=!1,c.classList.add("is-leaving"),h.classList.add("is-entering");let x=h.querySelector("[data-tabs-box]");if(x&&p){let A=x.offsetHeight;x.style.overflow="hidden",x.style.height=`${p}px`,x.getBoundingClientRect(),x.style.transition=`height ${700*.7}ms cubic-bezier(0.4, 0, 0.2, 1)`,x.style.height=`${A}px`}l=window.setTimeout(m,700)}u&&t[i].focus()},b=Number(e.dataset.tabsAuto),g=b>0&&t.length>1&&!!e.querySelector("[data-tabs-progress]")&&!r,f=()=>{};if(g){let i=!1,u=!1,c=!1,h=()=>{u?e.dataset.tabsRunning="stopped":i&&!document.hidden?e.dataset.tabsRunning="true":delete e.dataset.tabsRunning};f=()=>{u=!0,h()},e.style.setProperty("--tabs-auto",`${b}s`),e.addEventListener("animationend",d=>{d.target.matches("[data-tabs-progress]")&&w((a+1)%t.length)}),new IntersectionObserver(d=>{i=d[d.length-1].isIntersecting,i||(u=!1),i&&!c&&(c=!0,n.forEach(p=>p==null?void 0:p.querySelectorAll('img[loading="lazy"]').forEach(v=>{new Image().src=v.currentSrc||v.src}))),h()},{threshold:.25}).observe(e),document.addEventListener("visibilitychange",h)}t.forEach((i,u)=>{i.addEventListener("click",()=>{f(),w(u)}),i.addEventListener("keydown",c=>{let h=t.length-1,d=c.key==="ArrowDown"||c.key==="ArrowRight"?u===h?0:u+1:c.key==="ArrowUp"||c.key==="ArrowLeft"?u===0?h:u-1:c.key==="Home"?0:c.key==="End"?h:-1;d<0||(c.preventDefault(),f(),w(d,!0))})})})}function C(e,t){try{t()}catch(o){console.error(`[wfc] ${e} failed to initialize`,o)}}function j(){document.documentElement.classList.remove("is-loading"),C("environment-switcher",z),C("nav",$),C("faq",G),C("hero-shader",W),C("tabs",Y),C("slider",K),C("panel-shader",V),C("charts",U),C("count-up",O)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",j,{once:!0}):j();})();
