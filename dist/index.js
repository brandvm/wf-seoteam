"use strict";(()=>{function U(){let t=document.querySelectorAll("[data-chart]");if(!t.length||!("IntersectionObserver"in window)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let e=new Map,n=new IntersectionObserver(a=>{a.forEach(i=>{var o;i.isIntersecting&&(n.unobserve(i.target),(o=e.get(i.target))==null||o.forEach(r=>{r.dataset.chart==="columns"&&r.querySelectorAll("rect").forEach((s,m)=>{s.style.transitionDelay=`${m*90}ms`}),r.dataset.inView=""}))})},{threshold:.5});t.forEach(a=>{var o;let i=a.parentElement;i&&(a.dataset.chartArmed="",e.set(i,[...(o=e.get(i))!=null?o:[],a]),n.observe(i))})}function $(){let t=document.querySelectorAll("[data-count]");if(!t.length)return;let e=(o,r)=>o.toLocaleString("en-CA",{minimumFractionDigits:r,maximumFractionDigits:r}),n=o=>{var s,m;let r=(s=o.dataset.count)!=null?s:"0";return{to:Number(r)||0,decimals:((m=r.split(".")[1])!=null?m:"").length}};if(matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver"in window)){t.forEach(o=>{let{to:r,decimals:s}=n(o);o.textContent=e(r,s)});return}let a=o=>{let{to:r,decimals:s}=n(o);o.style.display="inline-block",o.style.whiteSpace="nowrap",o.textContent=e(r,s);let m=parseFloat(getComputedStyle(o).fontSize)||16;o.style.width=`${o.getBoundingClientRect().width/m}em`,o.textContent=e(0,s);let w=performance.now(),v=g=>{let f=Math.min(1,Math.max(0,(g-w)/1600)),h=1-Math.pow(1-f,3);if(o.textContent=e(r*h,s),f<1){requestAnimationFrame(v);return}o.textContent=e(r,s),o.style.width=o.style.display=o.style.whiteSpace=""};requestAnimationFrame(v)},i=new IntersectionObserver(o=>{o.forEach(r=>{r.isIntersecting&&(i.unobserve(r.target),a(r.target))})},{threshold:.6});t.forEach(o=>i.observe(o))}function O(){var h,l,d,c;let t=window.WFC;if(!/\.webflow\.io$/.test(location.hostname)||!t||location.hostname==="seo-teams.webflow.io"&&!new URLSearchParams(location.search).has("wfc-switcher")||(l=(h=window.Webflow)==null?void 0:h.env)!=null&&l.call(h,"editor")||(c=(d=window.Webflow)==null?void 0:d.env)!=null&&c.call(d,"design")||document.getElementById("wfc-environment"))return;let e=t.source?t.source===t.devBase:!!t.dev,n=!!t.source&&t.source!==t.devBase&&t.source!==t.stag,a=!!t.dev&&!e||n,i=e?"Dev":"Staging",o=document.createElement("div");o.id="wfc-environment";let r=o.attachShadow({mode:"open"});r.innerHTML=`
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
  `;let s=r.querySelector(".control"),m=r.querySelector(".launcher"),w=r.querySelector(".choices"),v=r.querySelector(".status"),g=r.querySelectorAll("[data-mode]");r.querySelector(".label").textContent=i,r.querySelector(".dot").toggleAttribute("data-dev",e),m.setAttribute("aria-label",`Choose environment (${i})`),n&&(v.textContent="Staging unavailable \xB7 using release"),m.title=n?"Staging could not load. Using the pinned release.":a?"Local dev could not load. Using staging.":"Switch between staging and local dev";function f(u,p=!1){var b;m.hidden=u,w.hidden=!u,v.hidden=!u||!a,s.toggleAttribute("data-expanded",u),m.setAttribute("aria-expanded",String(u)),p&&(u?(b=r.querySelector('[aria-pressed="true"]'))==null||b.focus():m.focus())}g.forEach(u=>{let p=u.dataset.mode==="dev";u.setAttribute("aria-pressed",String(p===e)),u.addEventListener("click",()=>{if(p===!!t.dev&&!a)return;let b=new URL(location.href);b.searchParams.set("wfc-dev",p?"1":"0");try{localStorage.setItem("wfc-dev",p?"1":"0")}catch{}location.assign(b.href)})}),m.addEventListener("click",()=>f(!0,!0)),r.querySelector(".minimize").addEventListener("click",()=>f(!1,!0)),s.addEventListener("keydown",u=>{u.key!=="Escape"||w.hidden||(u.preventDefault(),u.stopPropagation(),f(!1,!0))}),document.addEventListener("pointerdown",u=>{u.composedPath().includes(o)||f(!1)}),document.body.appendChild(o)}function z(){let t=matchMedia("(prefers-reduced-motion: reduce)").matches;document.querySelectorAll("[data-faq-trigger]").forEach((n,a)=>{var v,g,f,h,l;let i=document.getElementById((v=n.getAttribute("aria-controls"))!=null?v:"");if(!i){if(i=(f=(g=n.closest("[data-faq-item]"))==null?void 0:g.querySelector("[data-faq-panel]"))!=null?f:null,!i)return;i.id||(i.id=`faq-panel-${a+1}`),n.setAttribute("aria-controls",i.id),n.getAttribute("aria-expanded")!=="true"&&(n.setAttribute("aria-expanded","false"),i.hidden=!0)}let o,r=n.querySelector("[data-faq-label]"),s={closed:(h=r==null?void 0:r.textContent)!=null?h:"",open:(l=n.dataset.faqOpenLabel)!=null?l:""},m,w=d=>{if(!r||!s.open)return;let c=d?s.open:s.closed;if(m==null||m.cancel(),t||!r.animate){r.textContent=c;return}m=r.animate([{opacity:1},{opacity:0}],{duration:300/2,easing:"ease-in"}),m.onfinish=()=>{r.textContent=c,m=r.animate([{opacity:0},{opacity:1}],{duration:300/2,easing:"ease-out"})},m.oncancel=()=>{r.textContent=c}};n.addEventListener("click",()=>{let d=n.getAttribute("aria-expanded")!=="true";if(n.setAttribute("aria-expanded",String(d)),w(d),o==null||o.cancel(),t||!i.animate){i.hidden=!d;return}i.hidden=!1;let c=`${i.offsetHeight}px`,{paddingTop:u,paddingBottom:p,marginTop:b}=getComputedStyle(i),E=i.parentElement?getComputedStyle(i.parentElement):null,x=E&&/flex|grid/.test(E.display)&&parseFloat(E.rowGap)||0,S={height:"0px",paddingTop:"0px",paddingBottom:"0px",marginTop:`${parseFloat(b)-x}px`,opacity:0},M={height:c,paddingTop:u,paddingBottom:p,marginTop:b,opacity:1};i.style.overflow="hidden",o=i.animate(d?[S,M]:[M,S],{duration:300,easing:"cubic-bezier(0.4, 0, 0.2, 1)"});let C=()=>{i.style.overflow="",i.hidden=!d};o.onfinish=C,o.oncancel=()=>{i.style.overflow=""}})})}var ne='input[type="radio"]:checked, input[type="checkbox"]:checked';function W(){document.querySelectorAll("[data-filter-all]").forEach(t=>{let e=t.closest('[fs-list-element="filters"], form');if(!e)return;let n=t.dataset.filterAll||"is-active",a=()=>t.classList.toggle(n,!e.querySelector(ne));e.addEventListener("change",a),e.addEventListener("input",a),t.addEventListener("click",()=>{setTimeout(a,0),setTimeout(a,150)}),a()})}var oe=["list"],K,G=typeof document!="undefined"?(K=document.currentScript)==null?void 0:K.src:void 0;function re(t){let e=new URL(t);return e.pathname=e.pathname.replace(/index\.js$/,"fs-bundle.js"),e.href}function V(){if(!oe.some(e=>document.querySelector(`[fs-${e}-element]`))||document.querySelector('script[src*="@finsweet/attributes"]')||!G||document.querySelector("script[data-fs-bundle]"))return;let t=document.createElement("script");t.src=re(G),t.defer=!0,t.dataset.fsBundle="",document.head.appendChild(t)}var ae="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",ie=`
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
}`;function j(){let t=Array.from(document.querySelectorAll("canvas[data-hero-shader]"));if(!t.length)return;let e=matchMedia("(max-width: 767px)").matches,n="requestIdleCallback"in window?a=>requestIdleCallback(a,{timeout:1e3}):a=>setTimeout(a,200);t.forEach(a=>{let i=()=>n(()=>{try{ce(a)}catch(s){console.error("[hero-shader]",s)}}),o=a.getBoundingClientRect();if(o.top<window.innerHeight&&o.bottom>0){let s=()=>requestAnimationFrame(()=>requestAnimationFrame(i));document.readyState==="complete"?s():window.addEventListener("load",s,{once:!0});return}if(e)return;let r=new IntersectionObserver(([s])=>{s.isIntersecting&&(r.disconnect(),i())},{rootMargin:"300px 0px"});r.observe(a)})}function se(t){let e=t.getExtension("WEBGL_debug_renderer_info"),n=String(e?t.getParameter(e.UNMASKED_RENDERER_WEBGL):t.getParameter(t.RENDERER));return/swiftshader|llvmpipe|software|basic render/i.test(n)}function ce(t){var F,I;let e=t.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!e)return;if(se(e)){(F=e.getExtension("WEBGL_lose_context"))==null||F.loseContext();return}let n=(y,L)=>{var T;let A=e.createShader(y);if(e.shaderSource(A,L),e.compileShader(A),!e.getShaderParameter(A,e.COMPILE_STATUS))throw new Error((T=e.getShaderInfoLog(A))!=null?T:"shader");return A},a=e.createProgram();if(e.attachShader(a,n(e.VERTEX_SHADER,ae)),e.attachShader(a,n(e.FRAGMENT_SHADER,ie)),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS))throw new Error((I=e.getProgramInfoLog(a))!=null?I:"program");e.useProgram(a),e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);let i=e.getAttribLocation(a,"p");e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.FLOAT,!1,0,0);let o=e.getUniformLocation(a,"u_res"),r=e.getUniformLocation(a,"u_time"),s=e.getUniformLocation(a,"u_mouse"),m=e.getUniformLocation(a,"u_hover"),w=e.getUniformLocation(a,"u_grain");e.uniform1f(e.getUniformLocation(a,"u_dark"),t.dataset.shaderTheme==="dark"?1:0);let v=matchMedia("(prefers-reduced-motion: reduce)").matches,g={x:.3,y:.4,hover:0},f={x:.3,y:.4,hover:0},h=!0,l=0,d=performance.now(),c=25e5,u=1,p=1,b=()=>{let y=Math.max(1,t.clientWidth),L=Math.max(1,t.clientHeight);p=Math.min(window.devicePixelRatio||1,2,Math.sqrt(c/(y*L)))*u;let A=Math.max(1,Math.round(y*p)),T=Math.max(1,Math.round(L*p));(t.width!==A||t.height!==T)&&(t.width=A,t.height=T,e.viewport(0,0,A,T))},E=y=>{b(),f.x+=(g.x-f.x)*.06,f.y+=(g.y-f.y)*.06,f.hover+=(g.hover-f.hover)*.05,e.uniform2f(o,t.width,t.height),e.uniform1f(r,v?12:(y-d)/1e3+12),e.uniform2f(s,f.x,f.y),e.uniform1f(m,f.hover),e.uniform1f(w,1/Math.max(p,.5)),e.drawArrays(e.TRIANGLES,0,3),t.dataset.heroShader="ready"},x=0,S=0,M=0,C=y=>{let L=x?y-x:16;x=y,L>25&&L<250?(S++,M=0):L<18&&(M++,S=Math.max(0,S-1)),S>20&&u>.5&&(u=Math.max(.5,u-.15),S=0),M>600&&u<1&&(u=Math.min(1,u+.15),M=0),E(y),l=h&&!document.hidden?requestAnimationFrame(C):0,l||(x=0)},R=()=>{!l&&!v&&h&&!document.hidden&&(l=requestAnimationFrame(C))};if(v){E(d),new ResizeObserver(()=>E(d)).observe(t);return}window.addEventListener("pointermove",y=>{let L=t.getBoundingClientRect(),A=(y.clientX-L.left)/L.width,T=1-(y.clientY-L.top)/L.height,B=A>=0&&A<=1&&T>=0&&T<=1;g.hover=B?1:0,B&&(g.x=A,g.y=T)},{passive:!0}),document.documentElement.addEventListener("pointerleave",()=>{g.hover=0}),new IntersectionObserver(([y])=>{h=y.isIntersecting,R()}).observe(t),document.addEventListener("visibilitychange",R),l=requestAnimationFrame(C)}function Y(){let t=location.pathname.replace(/\/$/,"");document.querySelectorAll("[data-nav-section]").forEach(o=>{(o.dataset.navSection||"").split(/\s+/).map(s=>s.replace(/\/$/,"")).filter(Boolean).some(s=>t===s||t.startsWith(`${s}/`))&&o.setAttribute("aria-current","true")});let e=document.querySelector("[data-nav-toggle]"),n=e==null?void 0:e.closest("nav"),a=document.querySelector("[data-nav-menu]");if(!e||!n||!a)return;let i=o=>{n.classList.toggle("is-open",o),e.setAttribute("aria-expanded",String(o))};e.addEventListener("click",()=>i(e.getAttribute("aria-expanded")!=="true")),a.addEventListener("click",o=>{o.target.closest("a")&&i(!1)}),document.addEventListener("keydown",o=>{o.key==="Escape"&&n.classList.contains("is-open")&&(i(!1),e.focus())}),matchMedia("(min-width: 992px)").addEventListener("change",o=>{o.matches&&i(!1)})}var le="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",de=`
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
}`,ue=`
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
}`,me={glow:{frag:de,budget:3e6,density:t=>Math.min(t,2)},ember:{frag:ue,budget:5e5,density:()=>.5}};function fe(t){let e=t.getExtension("WEBGL_debug_renderer_info"),n=String(e?t.getParameter(e.UNMASKED_RENDERER_WEBGL):t.getParameter(t.RENDERER));return/swiftshader|llvmpipe|software|basic render/i.test(n)}function he(t,e){var M,C,R,F,I,y,L,A,T,B;let n=t.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!n)return null;if(fe(n))return(M=n.getExtension("WEBGL_lose_context"))==null||M.loseContext(),null;let a=(_,P)=>{var H;let q=n.createShader(_);if(n.shaderSource(q,P),n.compileShader(q),!n.getShaderParameter(q,n.COMPILE_STATUS))throw new Error((H=n.getShaderInfoLog(q))!=null?H:"shader");return q},i=n.createProgram();if(n.attachShader(i,a(n.VERTEX_SHADER,le)),n.attachShader(i,a(n.FRAGMENT_SHADER,e.frag)),n.linkProgram(i),!n.getProgramParameter(i,n.LINK_STATUS))throw new Error((C=n.getProgramInfoLog(i))!=null?C:"program");n.useProgram(i),n.bindBuffer(n.ARRAY_BUFFER,n.createBuffer()),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),n.STATIC_DRAW);let o=n.getAttribLocation(i,"p");n.enableVertexAttribArray(o),n.vertexAttribPointer(o,2,n.FLOAT,!1,0,0);let r=_=>n.getUniformLocation(i,_),s={res:r("u_res"),time:r("u_time"),px:r("u_px"),em:r("u_em"),peak:r("u_peak"),column:r("u_column"),span:r("u_span"),base:r("u_base"),strength:r("u_strength")},m=Number((R=t.dataset.glowPeak)!=null?R:.5),w=Number((F=t.dataset.glowColumn)!=null?F:4.2),v=Number((I=t.dataset.glowSpan)!=null?I:18.3),g=Number((y=t.dataset.glowStrength)!=null?y:.7),f=(T=(A=/^#?([0-9a-f]{6})$/i.exec((L=t.dataset.glowBase)!=null?L:""))==null?void 0:A[1])!=null?T:"200f09",h=[0,2,4].map(_=>parseInt(f.slice(_,_+2),16)/255),l=Number((B=t.dataset.shaderSpeed)!=null?B:1)||1,d=performance.now(),c=0,u=0,p=!1,b=!1,E=_=>{let P=Math.max(1,t.clientWidth),q=Math.max(1,t.clientHeight),H=Math.min(e.density(window.devicePixelRatio||1),Math.sqrt(e.budget/(P*q))),D=Math.max(1,Math.round(P*H)),N=Math.max(1,Math.round(q*H));(t.width!==D||t.height!==N)&&(t.width=D,t.height=N,n.viewport(0,0,D,N)),n.uniform2f(s.res,D,N),n.uniform1f(s.time,(_-d)/1e3*l),n.uniform1f(s.px,H),n.uniform1f(s.em,parseFloat(getComputedStyle(t).fontSize)||16),n.uniform1f(s.peak,m),n.uniform1f(s.column,w),n.uniform1f(s.span,v),n.uniform3f(s.base,h[0],h[1],h[2]),n.uniform1f(s.strength,g),n.drawArrays(n.TRIANGLES,0,3),t.dataset.ready=""},x=_=>{_-u>=30&&(u=_,E(_)),c=p&&!b&&!document.hidden?requestAnimationFrame(x):0},S=()=>{!c&&p&&!b&&!document.hidden&&(c=requestAnimationFrame(x))};return t.addEventListener("webglcontextlost",_=>{_.preventDefault(),b=!0,delete t.dataset.ready}),document.addEventListener("visibilitychange",S),{show(_){p=_,S()}}}function X(){var o;let t=document.querySelectorAll("canvas[data-panel-shader]");if(!t.length||((o=navigator.connection)==null?void 0:o.saveData)||matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches)return;let n="requestIdleCallback"in window?r=>requestIdleCallback(r,{timeout:1e3}):r=>setTimeout(r,200),a=new Map,i=new IntersectionObserver(r=>{r.forEach(s=>{let m=s.target,w=a.get(m);if(w){w.show(s.isIntersecting);return}w===null||!s.isIntersecting||(a.set(m,null),n(()=>{var g;let v=me[(g=m.dataset.panelShader)!=null?g:""];if(v)try{let f=he(m,v);a.set(m,f);let h=m.getBoundingClientRect();f==null||f.show(h.bottom>-200&&h.top<window.innerHeight+200)}catch(f){console.error("[panel-shader]",f)}}))})},{rootMargin:"200px 0px"});t.forEach(r=>i.observe(r))}var J={linkedin:t=>`https://www.linkedin.com/sharing/share-offsite/?url=${t}`,x:(t,e)=>`https://twitter.com/intent/tweet?url=${t}&text=${e}`,facebook:t=>`https://www.facebook.com/sharer/sharer.php?u=${t}`};function Q(){let t=document.querySelectorAll("[data-share]");if(!t.length)return;let e=encodeURIComponent(location.origin+location.pathname),n=encodeURIComponent(document.title);t.forEach(a=>{let i=a.dataset.share||"";if(J[i]&&a instanceof HTMLAnchorElement){a.href=J[i](e,n),a.target="_blank",a.rel="noopener";return}i==="copy"&&a.addEventListener("click",async o=>{o.preventDefault();try{await navigator.clipboard.writeText(location.origin+location.pathname)}catch{return}let r=a.getAttribute("aria-label")||"";a.setAttribute("aria-label","Link copied"),a.classList.add("is-copied"),setTimeout(()=>{a.setAttribute("aria-label",r),a.classList.remove("is-copied")},2e3)})})}function Z(){document.querySelectorAll("[data-slider]").forEach(t=>{let e=t.querySelector("[data-slider-track]"),n=Array.from(t.querySelectorAll("[data-slider-item]"));if(!e||!n.length)return;let a=t.querySelector("[data-slider-prev]"),i=t.querySelector("[data-slider-next]"),o=t.querySelector("[data-slider-current]"),r=t.querySelector("[data-slider-total]"),s=h=>String(h).padStart(2,"0");r&&(r.textContent=s(n.length));let m=()=>n.length>1?n[1].offsetLeft-n[0].offsetLeft:e.clientWidth,w=()=>e.scrollLeft+e.clientWidth>=e.scrollWidth-2?n.length-1:Math.min(n.length-1,Math.round(e.scrollLeft/m())),v=()=>{let h=w();o&&(o.textContent=s(h+1)),a&&(a.disabled=h===0),i&&(i.disabled=h===n.length-1)},g=h=>{let l=matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollBy({left:h*m(),behavior:l?"auto":"smooth"})};a==null||a.addEventListener("click",()=>g(-1)),i==null||i.addEventListener("click",()=>g(1));let f=!1;e.addEventListener("scroll",()=>{f||(f=!0,requestAnimationFrame(()=>{f=!1,v()}))},{passive:!0}),v()})}function ee(){document.querySelectorAll("[data-tabs]").forEach(t=>{let e=Array.from(t.querySelectorAll("[data-tabs-tab]"));if(!e.length)return;let n=e[0].closest('[role="tablist"], [role="list"]');n&&t.contains(n)&&(n.setAttribute("role","tablist"),e.forEach(l=>{for(let d=l.parentElement;d&&d!==n;d=d.parentElement)d.getAttribute("role")==="listitem"&&d.setAttribute("role","presentation")}));let a=Array.from(t.querySelectorAll("[data-tabs-panel]")),i=t.id||`tabs-${Array.from(document.querySelectorAll("[data-tabs]")).indexOf(t)+1}`,o=e.map((l,d)=>{var u,p,b;let c=(b=(p=document.getElementById((u=l.getAttribute("aria-controls"))!=null?u:""))!=null?p:a[d])!=null?b:null;return c&&(l.id||(l.id=`${i}-tab-${d+1}`),c.id||(c.id=`${i}-panel-${d+1}`),l.setAttribute("aria-controls",c.id),c.setAttribute("role","tabpanel"),c.setAttribute("aria-labelledby",l.id)),l.setAttribute("role","tab"),l.querySelectorAll("[data-tabs-number]").forEach(E=>{E.textContent=String(d+1).padStart(2,"0")}),c==null||c.querySelectorAll("[data-tabs-step]").forEach(E=>{E.textContent=String(d+1)}),c}),r=Math.max(0,e.findIndex(l=>l.getAttribute("aria-selected")==="true"));e.forEach((l,d)=>{let c=d===r;l.classList.toggle("is-active",c),l.setAttribute("aria-selected",String(c)),l.tabIndex=c?0:-1,o[d]&&(o[d].hidden=!c)});let s=matchMedia("(prefers-reduced-motion: reduce)").matches,m=0,w=()=>{window.clearTimeout(m),m=0,o.forEach((l,d)=>{if(!l)return;l.classList.remove("is-entering","is-leaving"),l.hidden=d!==r;let c=l.querySelector("[data-tabs-box]");c&&(c.style.height=c.style.overflow=c.style.transition="")})},v=(l,d=!1)=>{var E;let c=o[r],u=o[l],p=!s&&l!==r&&!!c&&!!u;w();let b=p?(E=c.querySelector("[data-tabs-box]"))==null?void 0:E.offsetHeight:void 0;if(r=l,e.forEach((x,S)=>{let M=S===l;x.classList.toggle("is-active",M),x.setAttribute("aria-selected",String(M)),x.tabIndex=M?0:-1;let C=o[S];C&&(C.hidden=!M)}),p){c.hidden=!1,c.classList.add("is-leaving"),u.classList.add("is-entering");let x=u.querySelector("[data-tabs-box]");if(x&&b){let S=x.offsetHeight;x.style.overflow="hidden",x.style.height=`${b}px`,x.getBoundingClientRect(),x.style.transition=`height ${700*.7}ms cubic-bezier(0.4, 0, 0.2, 1)`,x.style.height=`${S}px`}m=window.setTimeout(w,700)}d&&e[l].focus()},g=Number(t.dataset.tabsAuto),f=g>0&&e.length>1&&!!t.querySelector("[data-tabs-progress]")&&!s,h=()=>{};if(f){let l=!1,d=!1,c=!1,u=()=>{d?t.dataset.tabsRunning="stopped":l&&!document.hidden?t.dataset.tabsRunning="true":delete t.dataset.tabsRunning};h=()=>{d=!0,u()},t.style.setProperty("--tabs-auto",`${g}s`),t.addEventListener("animationend",p=>{p.target.matches("[data-tabs-progress]")&&v((r+1)%e.length)}),new IntersectionObserver(p=>{l=p[p.length-1].isIntersecting,l||(d=!1),l&&!c&&(c=!0,o.forEach(b=>b==null?void 0:b.querySelectorAll('img[loading="lazy"]').forEach(E=>{new Image().src=E.currentSrc||E.src}))),u()},{threshold:.25}).observe(t),document.addEventListener("visibilitychange",u)}e.forEach((l,d)=>{l.addEventListener("click",()=>{h(),v(d)}),l.addEventListener("keydown",c=>{let u=e.length-1,p=c.key==="ArrowDown"||c.key==="ArrowRight"?d===u?0:d+1:c.key==="ArrowUp"||c.key==="ArrowLeft"?d===0?u:d-1:c.key==="Home"?0:c.key==="End"?u:-1;p<0||(c.preventDefault(),h(),v(p,!0))})})})}function k(t,e){try{e()}catch(n){console.error(`[wfc] ${t} failed to initialize`,n)}}function te(){document.documentElement.classList.remove("is-loading"),k("environment-switcher",O),k("nav",Y),k("faq",z),k("hero-shader",j),k("tabs",ee),k("slider",Z),k("panel-shader",X),k("charts",U),k("count-up",$),k("share",Q),k("filter-all",W),k("finsweet-loader",V)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",te,{once:!0}):te();})();
