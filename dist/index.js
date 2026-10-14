"use strict";(()=>{function U(){let e=document.querySelectorAll("[data-chart]");if(!e.length||!("IntersectionObserver"in window)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let t=new Map,n=new IntersectionObserver(r=>{r.forEach(o=>{var a;o.isIntersecting&&(n.unobserve(o.target),(a=t.get(o.target))==null||a.forEach(i=>{i.dataset.chart==="columns"&&i.querySelectorAll("rect").forEach((c,s)=>{c.style.transitionDelay=`${s*90}ms`}),i.dataset.inView=""}))})},{threshold:.5});e.forEach(r=>{var a;let o=r.parentElement;o&&(r.dataset.chartArmed="",t.set(o,[...(a=t.get(o))!=null?a:[],r]),n.observe(o))})}function O(){let e=document.querySelectorAll("[data-count]");if(!e.length)return;let t=(a,i)=>a.toLocaleString("en-CA",{minimumFractionDigits:i,maximumFractionDigits:i}),n=a=>{var c,s;let i=(c=a.dataset.count)!=null?c:"0";return{to:Number(i)||0,decimals:((s=i.split(".")[1])!=null?s:"").length}};if(matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver"in window)){e.forEach(a=>{let{to:i,decimals:c}=n(a);a.textContent=t(i,c)});return}let r=a=>{let{to:i,decimals:c}=n(a);a.style.display="inline-block",a.style.whiteSpace="nowrap",a.textContent=t(i,c);let s=parseFloat(getComputedStyle(a).fontSize)||16;a.style.width=`${a.getBoundingClientRect().width/s}em`,a.textContent=t(0,c);let g=performance.now(),v=b=>{let m=Math.min(1,Math.max(0,(b-g)/1600)),h=1-Math.pow(1-m,3);if(a.textContent=t(i*h,c),m<1){requestAnimationFrame(v);return}a.textContent=t(i,c),a.style.width=a.style.display=a.style.whiteSpace=""};requestAnimationFrame(v)},o=new IntersectionObserver(a=>{a.forEach(i=>{i.isIntersecting&&(o.unobserve(i.target),r(i.target))})},{threshold:.6});e.forEach(a=>o.observe(a))}function $(){var h,d,u,l;let e=window.WFC;if(!/\.webflow\.io$/.test(location.hostname)||!e||location.hostname==="seo-teams.webflow.io"&&!new URLSearchParams(location.search).has("wfc-switcher")||(d=(h=window.Webflow)==null?void 0:h.env)!=null&&d.call(h,"editor")||(l=(u=window.Webflow)==null?void 0:u.env)!=null&&l.call(u,"design")||document.getElementById("wfc-environment"))return;let t=e.source?e.source===e.devBase:!!e.dev,n=!!e.source&&e.source!==e.devBase&&e.source!==e.stag,r=!!e.dev&&!t||n,o=t?"Dev":"Staging",a=document.createElement("div");a.id="wfc-environment";let i=a.attachShadow({mode:"open"});i.innerHTML=`
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
  `;let c=i.querySelector(".control"),s=i.querySelector(".launcher"),g=i.querySelector(".choices"),v=i.querySelector(".status"),b=i.querySelectorAll("[data-mode]");i.querySelector(".label").textContent=o,i.querySelector(".dot").toggleAttribute("data-dev",t),s.setAttribute("aria-label",`Choose environment (${o})`),n&&(v.textContent="Staging unavailable \xB7 using release"),s.title=n?"Staging could not load. Using the pinned release.":r?"Local dev could not load. Using staging.":"Switch between staging and local dev";function m(f,p=!1){var x;s.hidden=f,g.hidden=!f,v.hidden=!f||!r,c.toggleAttribute("data-expanded",f),s.setAttribute("aria-expanded",String(f)),p&&(f?(x=i.querySelector('[aria-pressed="true"]'))==null||x.focus():s.focus())}b.forEach(f=>{let p=f.dataset.mode==="dev";f.setAttribute("aria-pressed",String(p===t)),f.addEventListener("click",()=>{if(p===!!e.dev&&!r)return;let x=new URL(location.href);x.searchParams.set("wfc-dev",p?"1":"0");try{localStorage.setItem("wfc-dev",p?"1":"0")}catch{}location.assign(x.href)})}),s.addEventListener("click",()=>m(!0,!0)),i.querySelector(".minimize").addEventListener("click",()=>m(!1,!0)),c.addEventListener("keydown",f=>{f.key!=="Escape"||g.hidden||(f.preventDefault(),f.stopPropagation(),m(!1,!0))}),document.addEventListener("pointerdown",f=>{f.composedPath().includes(a)||m(!1)}),document.body.appendChild(a)}function z(){let e=matchMedia("(prefers-reduced-motion: reduce)").matches;document.querySelectorAll("[data-faq-trigger]").forEach((n,r)=>{var v,b,m,h,d;let o=document.getElementById((v=n.getAttribute("aria-controls"))!=null?v:"");if(!o){if(o=(m=(b=n.closest("[data-faq-item]"))==null?void 0:b.querySelector("[data-faq-panel]"))!=null?m:null,!o)return;o.id||(o.id=`faq-panel-${r+1}`),n.setAttribute("aria-controls",o.id),n.getAttribute("aria-expanded")!=="true"&&(n.setAttribute("aria-expanded","false"),o.hidden=!0)}let a,i=n.querySelector("[data-faq-label]"),c={closed:(h=i==null?void 0:i.textContent)!=null?h:"",open:(d=n.dataset.faqOpenLabel)!=null?d:""},s,g=u=>{if(!i||!c.open)return;let l=u?c.open:c.closed;if(s==null||s.cancel(),e||!i.animate){i.textContent=l;return}s=i.animate([{opacity:1},{opacity:0}],{duration:300/2,easing:"ease-in"}),s.onfinish=()=>{i.textContent=l,s=i.animate([{opacity:0},{opacity:1}],{duration:300/2,easing:"ease-out"})},s.oncancel=()=>{i.textContent=l}};n.addEventListener("click",()=>{let u=n.getAttribute("aria-expanded")!=="true";if(n.setAttribute("aria-expanded",String(u)),g(u),a==null||a.cancel(),e||!o.animate){o.hidden=!u;return}o.hidden=!1;let l=`${o.offsetHeight}px`,{paddingTop:f,paddingBottom:p,marginTop:x}=getComputedStyle(o),E=o.parentElement?getComputedStyle(o.parentElement):null,w=E&&/flex|grid/.test(E.display)&&parseFloat(E.rowGap)||0,S={height:"0px",paddingTop:"0px",paddingBottom:"0px",marginTop:`${parseFloat(x)-w}px`,opacity:0},M={height:l,paddingTop:f,paddingBottom:p,marginTop:x,opacity:1};o.style.overflow="hidden",a=o.animate(u?[S,M]:[M,S],{duration:300,easing:"cubic-bezier(0.4, 0, 0.2, 1)"});let C=()=>{o.style.overflow="",o.hidden=!u};a.onfinish=C,a.oncancel=()=>{o.style.overflow=""}})})}var oe='input[type="radio"]:checked, input[type="checkbox"]:checked';function W(){document.querySelectorAll("[data-filter-all]").forEach(e=>{let t=e.closest('[fs-list-element="filters"], form');if(!t)return;let n=e.dataset.filterAll||"is-active",r=()=>e.classList.toggle(n,!t.querySelector(oe));t.addEventListener("change",r),t.addEventListener("input",r),e.addEventListener("click",()=>{setTimeout(r,0),setTimeout(r,150)}),r()})}var ae=["list"],K,G=typeof document!="undefined"?(K=document.currentScript)==null?void 0:K.src:void 0;function ie(e){let t=new URL(e);return t.pathname=t.pathname.replace(/index\.js$/,"fs-bundle.js"),t.href}function V(){if(!ae.some(t=>document.querySelector(`[fs-${t}-element]`))||document.querySelector('script[src*="@finsweet/attributes"]')||!G||document.querySelector("script[data-fs-bundle]"))return;let e=document.createElement("script");e.src=ie(G),e.defer=!0,e.dataset.fsBundle="",document.head.appendChild(e)}var j={orange:["#1c0d08","#9e330f","#ed6629","#f7a366","#f0d694"],ember:["#1c0e09","#a82b14","#c2381f","#e0602a","#f2a65a"],coral:["#200f09","#c43c18","#ff6a4a","#ff9a78","#ffd0b8"],plum:["#1a0612","#5a1440","#7e2a5e","#c98db4","#f1d6e7"],rose:["#1c0a0c","#9c2340","#c0395a","#e06a6f","#f6c7c9"],umber:["#1c0e09","#6b3518","#8a4b2a","#b97a4a","#e8c9a0"]};function Y(e){let n=(e&&j[e.trim().toLowerCase()]||(e!=null&&e.includes(",")?e.split(","):j.orange)).slice(0,5).map(r=>{let o=r.trim().replace("#","");return[0,2,4].map(a=>parseInt(o.slice(a,a+2),16)/255)});return n.length===5&&n.flat().every(r=>Number.isFinite(r))?n.flat():Y("orange")}var se="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",ce=`
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;   // 0..1, origin bottom left
uniform float u_hover;  // 0..1, eased pointer presence
uniform float u_grain;  // canvas pixels \u2192 CSS pixels, so the grain keeps its size
uniform float u_dark;   // 0 = hero palette, 1 = dark palette (data-shader-theme="dark")
uniform vec3 u_c[5];    // the light scene's ramp, dark to light (data-shader-palette)

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

// Soft drifting variation from three sines: far cheaper than layered noise
// and just as smooth at this scale.
float drift(vec2 p, float t) {
  return 0.5 + (sin(p.x * 1.7 + t * 1.3) + sin(p.y * 2.1 - t) + sin((p.x + p.y) * 1.2 + t * 0.7)) / 6.0;
}

// Brand ramp: espresso \u2192 deep orange \u2192 accent \u2192 peach \u2192 cream.
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
}`;function X(){let e=Array.from(document.querySelectorAll("canvas[data-hero-shader]"));if(!e.length)return;let t=matchMedia("(max-width: 767px)").matches,n="requestIdleCallback"in window?r=>requestIdleCallback(r,{timeout:1e3}):r=>setTimeout(r,200);e.forEach(r=>{let o=()=>n(()=>{try{de(r)}catch(c){console.error("[hero-shader]",c)}}),a=r.getBoundingClientRect();if(a.top<window.innerHeight&&a.bottom>0){let c=()=>requestAnimationFrame(()=>requestAnimationFrame(o));document.readyState==="complete"?c():window.addEventListener("load",c,{once:!0});return}if(t)return;let i=new IntersectionObserver(([c])=>{c.isIntersecting&&(i.disconnect(),o())},{rootMargin:"300px 0px"});i.observe(r)})}function le(e){let t=e.getExtension("WEBGL_debug_renderer_info"),n=String(t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER));return/swiftshader|llvmpipe|software|basic render/i.test(n)}function de(e){var F,I;let t=e.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!t)return;if(le(t)){(F=t.getExtension("WEBGL_lose_context"))==null||F.loseContext();return}let n=(y,L)=>{var T;let A=t.createShader(y);if(t.shaderSource(A,L),t.compileShader(A),!t.getShaderParameter(A,t.COMPILE_STATUS))throw new Error((T=t.getShaderInfoLog(A))!=null?T:"shader");return A},r=t.createProgram();if(t.attachShader(r,n(t.VERTEX_SHADER,se)),t.attachShader(r,n(t.FRAGMENT_SHADER,ce)),t.linkProgram(r),!t.getProgramParameter(r,t.LINK_STATUS))throw new Error((I=t.getProgramInfoLog(r))!=null?I:"program");t.useProgram(r),t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW);let o=t.getAttribLocation(r,"p");t.enableVertexAttribArray(o),t.vertexAttribPointer(o,2,t.FLOAT,!1,0,0);let a=t.getUniformLocation(r,"u_res"),i=t.getUniformLocation(r,"u_time"),c=t.getUniformLocation(r,"u_mouse"),s=t.getUniformLocation(r,"u_hover"),g=t.getUniformLocation(r,"u_grain");t.uniform1f(t.getUniformLocation(r,"u_dark"),e.dataset.shaderTheme==="dark"?1:0),t.uniform3fv(t.getUniformLocation(r,"u_c"),new Float32Array(Y(e.dataset.shaderPalette)));let v=matchMedia("(prefers-reduced-motion: reduce)").matches,b={x:.3,y:.4,hover:0},m={x:.3,y:.4,hover:0},h=!0,d=0,u=performance.now(),l=25e5,f=1,p=1,x=()=>{let y=Math.max(1,e.clientWidth),L=Math.max(1,e.clientHeight);p=Math.min(window.devicePixelRatio||1,2,Math.sqrt(l/(y*L)))*f;let A=Math.max(1,Math.round(y*p)),T=Math.max(1,Math.round(L*p));(e.width!==A||e.height!==T)&&(e.width=A,e.height=T,t.viewport(0,0,A,T))},E=y=>{x(),m.x+=(b.x-m.x)*.06,m.y+=(b.y-m.y)*.06,m.hover+=(b.hover-m.hover)*.05,t.uniform2f(a,e.width,e.height),t.uniform1f(i,v?12:(y-u)/1e3+12),t.uniform2f(c,m.x,m.y),t.uniform1f(s,m.hover),t.uniform1f(g,1/Math.max(p,.5)),t.drawArrays(t.TRIANGLES,0,3),e.dataset.heroShader="ready"},w=0,S=0,M=0,C=y=>{let L=w?y-w:16;w=y,L>25&&L<250?(S++,M=0):L<18&&(M++,S=Math.max(0,S-1)),S>20&&f>.5&&(f=Math.max(.5,f-.15),S=0),M>600&&f<1&&(f=Math.min(1,f+.15),M=0),E(y),d=h&&!document.hidden?requestAnimationFrame(C):0,d||(w=0)},R=()=>{!d&&!v&&h&&!document.hidden&&(d=requestAnimationFrame(C))};if(v){E(u),new ResizeObserver(()=>E(u)).observe(e);return}window.addEventListener("pointermove",y=>{let L=e.getBoundingClientRect(),A=(y.clientX-L.left)/L.width,T=1-(y.clientY-L.top)/L.height,B=A>=0&&A<=1&&T>=0&&T<=1;b.hover=B?1:0,B&&(b.x=A,b.y=T)},{passive:!0}),document.documentElement.addEventListener("pointerleave",()=>{b.hover=0}),new IntersectionObserver(([y])=>{h=y.isIntersecting,R()}).observe(e),document.addEventListener("visibilitychange",R),d=requestAnimationFrame(C)}function J(){let e=location.pathname.replace(/\/$/,"");document.querySelectorAll("[data-nav-section]").forEach(r=>{(r.dataset.navSection||"").split(/\s+/).map(a=>a.replace(/\/$/,"")).filter(Boolean).some(a=>e===a||e.startsWith(`${a}/`))&&r.setAttribute("aria-current","true")});let t=document.querySelector("[data-nav-toggle]");if(!t)return;let n=document.querySelector("[data-mobile-menu]");n?ue(t,n):fe(t)}function ue(e,t){let n=document.documentElement,r;t.id||(t.id="mobile-menu"),e.setAttribute("aria-controls",t.id),e.setAttribute("aria-expanded","false"),t.hidden=!0;let o=()=>[...t.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(s=>s.offsetParent!==null),a=()=>e.getAttribute("aria-expanded")==="true",i=()=>{var s,g;window.clearTimeout(r),t.hidden=!1,e.setAttribute("aria-expanded","true"),n.classList.add("is-menu-open"),requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add("is-open"))),(g=(s=t.querySelector("[data-nav-close]"))!=null?s:o()[0])==null||g.focus({preventScroll:!0})},c=(s=!0)=>{if(!a())return;e.setAttribute("aria-expanded","false"),t.classList.remove("is-open"),n.classList.remove("is-menu-open");let g=matchMedia("(prefers-reduced-motion: reduce)").matches;r=window.setTimeout(()=>t.hidden=!0,g?0:320),s&&e.focus({preventScroll:!0})};e.addEventListener("click",()=>a()?c():i()),t.querySelectorAll("[data-nav-close]").forEach(s=>s.addEventListener("click",()=>c())),t.addEventListener("click",s=>{s.target.closest("a[href]")&&c(!1)}),document.addEventListener("keydown",s=>{if(!a()||(s.key==="Escape"&&c(),s.key!=="Tab"))return;let g=o();if(!g.length)return;let v=g[0],b=g[g.length-1];s.shiftKey&&document.activeElement===v?(s.preventDefault(),b.focus()):!s.shiftKey&&document.activeElement===b&&(s.preventDefault(),v.focus())}),matchMedia("(min-width: 992px)").addEventListener("change",s=>{s.matches&&c(!1)})}function fe(e){let t=e.closest("nav"),n=document.querySelector("[data-nav-menu]");if(!t||!n)return;let r=o=>{t.classList.toggle("is-open",o),e.setAttribute("aria-expanded",String(o))};e.addEventListener("click",()=>r(e.getAttribute("aria-expanded")!=="true")),n.addEventListener("click",o=>{o.target.closest("a")&&r(!1)}),document.addEventListener("keydown",o=>{o.key==="Escape"&&t.classList.contains("is-open")&&(r(!1),e.focus())}),matchMedia("(min-width: 992px)").addEventListener("change",o=>{o.matches&&r(!1)})}var me="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",he=`
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
}`,pe=`
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
}`,ge={glow:{frag:he,budget:3e6,density:e=>Math.min(e,2)},ember:{frag:pe,budget:5e5,density:()=>.5}};function be(e){let t=e.getExtension("WEBGL_debug_renderer_info"),n=String(t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER));return/swiftshader|llvmpipe|software|basic render/i.test(n)}function ve(e,t){var M,C,R,F,I,y,L,A,T,B;let n=e.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!n)return null;if(be(n))return(M=n.getExtension("WEBGL_lose_context"))==null||M.loseContext(),null;let r=(_,P)=>{var H;let q=n.createShader(_);if(n.shaderSource(q,P),n.compileShader(q),!n.getShaderParameter(q,n.COMPILE_STATUS))throw new Error((H=n.getShaderInfoLog(q))!=null?H:"shader");return q},o=n.createProgram();if(n.attachShader(o,r(n.VERTEX_SHADER,me)),n.attachShader(o,r(n.FRAGMENT_SHADER,t.frag)),n.linkProgram(o),!n.getProgramParameter(o,n.LINK_STATUS))throw new Error((C=n.getProgramInfoLog(o))!=null?C:"program");n.useProgram(o),n.bindBuffer(n.ARRAY_BUFFER,n.createBuffer()),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),n.STATIC_DRAW);let a=n.getAttribLocation(o,"p");n.enableVertexAttribArray(a),n.vertexAttribPointer(a,2,n.FLOAT,!1,0,0);let i=_=>n.getUniformLocation(o,_),c={res:i("u_res"),time:i("u_time"),px:i("u_px"),em:i("u_em"),peak:i("u_peak"),column:i("u_column"),span:i("u_span"),base:i("u_base"),strength:i("u_strength")},s=Number((R=e.dataset.glowPeak)!=null?R:.5),g=Number((F=e.dataset.glowColumn)!=null?F:4.2),v=Number((I=e.dataset.glowSpan)!=null?I:18.3),b=Number((y=e.dataset.glowStrength)!=null?y:.7),m=(T=(A=/^#?([0-9a-f]{6})$/i.exec((L=e.dataset.glowBase)!=null?L:""))==null?void 0:A[1])!=null?T:"200f09",h=[0,2,4].map(_=>parseInt(m.slice(_,_+2),16)/255),d=Number((B=e.dataset.shaderSpeed)!=null?B:1)||1,u=performance.now(),l=0,f=0,p=!1,x=!1,E=_=>{let P=Math.max(1,e.clientWidth),q=Math.max(1,e.clientHeight),H=Math.min(t.density(window.devicePixelRatio||1),Math.sqrt(t.budget/(P*q))),D=Math.max(1,Math.round(P*H)),N=Math.max(1,Math.round(q*H));(e.width!==D||e.height!==N)&&(e.width=D,e.height=N,n.viewport(0,0,D,N)),n.uniform2f(c.res,D,N),n.uniform1f(c.time,(_-u)/1e3*d),n.uniform1f(c.px,H),n.uniform1f(c.em,parseFloat(getComputedStyle(e).fontSize)||16),n.uniform1f(c.peak,s),n.uniform1f(c.column,g),n.uniform1f(c.span,v),n.uniform3f(c.base,h[0],h[1],h[2]),n.uniform1f(c.strength,b),n.drawArrays(n.TRIANGLES,0,3),e.dataset.ready=""},w=_=>{_-f>=30&&(f=_,E(_)),l=p&&!x&&!document.hidden?requestAnimationFrame(w):0},S=()=>{!l&&p&&!x&&!document.hidden&&(l=requestAnimationFrame(w))};return e.addEventListener("webglcontextlost",_=>{_.preventDefault(),x=!0,delete e.dataset.ready}),document.addEventListener("visibilitychange",S),{show(_){p=_,S()}}}function Q(){var a;let e=document.querySelectorAll("canvas[data-panel-shader]");if(!e.length||((a=navigator.connection)==null?void 0:a.saveData)||matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches)return;let n="requestIdleCallback"in window?i=>requestIdleCallback(i,{timeout:1e3}):i=>setTimeout(i,200),r=new Map,o=new IntersectionObserver(i=>{i.forEach(c=>{let s=c.target,g=r.get(s);if(g){g.show(c.isIntersecting);return}g===null||!c.isIntersecting||(r.set(s,null),n(()=>{var b;let v=ge[(b=s.dataset.panelShader)!=null?b:""];if(v)try{let m=ve(s,v);r.set(s,m);let h=s.getBoundingClientRect();m==null||m.show(h.bottom>-200&&h.top<window.innerHeight+200)}catch(m){console.error("[panel-shader]",m)}}))})},{rootMargin:"200px 0px"});e.forEach(i=>o.observe(i))}var Z={linkedin:e=>`https://www.linkedin.com/sharing/share-offsite/?url=${e}`,x:(e,t)=>`https://twitter.com/intent/tweet?url=${e}&text=${t}`,facebook:e=>`https://www.facebook.com/sharer/sharer.php?u=${e}`};function ee(){let e=document.querySelectorAll("[data-share]");if(!e.length)return;let t=encodeURIComponent(location.origin+location.pathname),n=encodeURIComponent(document.title);e.forEach(r=>{let o=r.dataset.share||"";if(Z[o]&&r instanceof HTMLAnchorElement){r.href=Z[o](t,n),r.target="_blank",r.rel="noopener";return}o==="copy"&&r.addEventListener("click",async a=>{a.preventDefault();try{await navigator.clipboard.writeText(location.origin+location.pathname)}catch{return}let i=r.getAttribute("aria-label")||"";r.setAttribute("aria-label","Link copied"),r.classList.add("is-copied"),setTimeout(()=>{r.setAttribute("aria-label",i),r.classList.remove("is-copied")},2e3)})})}function te(){document.querySelectorAll("[data-slider]").forEach(e=>{let t=e.querySelector("[data-slider-track]"),n=Array.from(e.querySelectorAll("[data-slider-item]"));if(!t||!n.length)return;let r=e.querySelector("[data-slider-prev]"),o=e.querySelector("[data-slider-next]"),a=e.querySelector("[data-slider-current]"),i=e.querySelector("[data-slider-total]"),c=h=>String(h).padStart(2,"0");i&&(i.textContent=c(n.length));let s=()=>n.length>1?n[1].offsetLeft-n[0].offsetLeft:t.clientWidth,g=()=>t.scrollLeft+t.clientWidth>=t.scrollWidth-2?n.length-1:Math.min(n.length-1,Math.round(t.scrollLeft/s())),v=()=>{let h=g();a&&(a.textContent=c(h+1)),r&&(r.disabled=h===0),o&&(o.disabled=h===n.length-1)},b=h=>{let d=matchMedia("(prefers-reduced-motion: reduce)").matches;t.scrollBy({left:h*s(),behavior:d?"auto":"smooth"})};r==null||r.addEventListener("click",()=>b(-1)),o==null||o.addEventListener("click",()=>b(1));let m=!1;t.addEventListener("scroll",()=>{m||(m=!0,requestAnimationFrame(()=>{m=!1,v()}))},{passive:!0}),v()})}function ne(){document.querySelectorAll("[data-tabs]").forEach(e=>{let t=Array.from(e.querySelectorAll("[data-tabs-tab]"));if(!t.length)return;let n=t[0].closest('[role="tablist"], [role="list"]');n&&e.contains(n)&&(n.setAttribute("role","tablist"),t.forEach(d=>{for(let u=d.parentElement;u&&u!==n;u=u.parentElement)u.getAttribute("role")==="listitem"&&u.setAttribute("role","presentation")}));let r=Array.from(e.querySelectorAll("[data-tabs-panel]")),o=e.id||`tabs-${Array.from(document.querySelectorAll("[data-tabs]")).indexOf(e)+1}`,a=t.map((d,u)=>{var f,p,x;let l=(x=(p=document.getElementById((f=d.getAttribute("aria-controls"))!=null?f:""))!=null?p:r[u])!=null?x:null;return l&&(d.id||(d.id=`${o}-tab-${u+1}`),l.id||(l.id=`${o}-panel-${u+1}`),d.setAttribute("aria-controls",l.id),l.setAttribute("role","tabpanel"),l.setAttribute("aria-labelledby",d.id)),d.setAttribute("role","tab"),d.querySelectorAll("[data-tabs-number]").forEach(E=>{E.textContent=String(u+1).padStart(2,"0")}),l==null||l.querySelectorAll("[data-tabs-step]").forEach(E=>{E.textContent=String(u+1)}),l}),i=Math.max(0,t.findIndex(d=>d.getAttribute("aria-selected")==="true"));t.forEach((d,u)=>{let l=u===i;d.classList.toggle("is-active",l),d.setAttribute("aria-selected",String(l)),d.tabIndex=l?0:-1,a[u]&&(a[u].hidden=!l)});let c=matchMedia("(prefers-reduced-motion: reduce)").matches,s=0,g=()=>{window.clearTimeout(s),s=0,a.forEach((d,u)=>{if(!d)return;d.classList.remove("is-entering","is-leaving"),d.hidden=u!==i;let l=d.querySelector("[data-tabs-box]");l&&(l.style.height=l.style.overflow=l.style.transition="")})},v=(d,u=!1)=>{var E;let l=a[i],f=a[d],p=!c&&d!==i&&!!l&&!!f;g();let x=p?(E=l.querySelector("[data-tabs-box]"))==null?void 0:E.offsetHeight:void 0;if(i=d,t.forEach((w,S)=>{let M=S===d;w.classList.toggle("is-active",M),w.setAttribute("aria-selected",String(M)),w.tabIndex=M?0:-1;let C=a[S];C&&(C.hidden=!M)}),p){l.hidden=!1,l.classList.add("is-leaving"),f.classList.add("is-entering");let w=f.querySelector("[data-tabs-box]");if(w&&x){let S=w.offsetHeight;w.style.overflow="hidden",w.style.height=`${x}px`,w.getBoundingClientRect(),w.style.transition=`height ${700*.7}ms cubic-bezier(0.4, 0, 0.2, 1)`,w.style.height=`${S}px`}s=window.setTimeout(g,700)}u&&t[d].focus()},b=Number(e.dataset.tabsAuto),m=b>0&&t.length>1&&!!e.querySelector("[data-tabs-progress]")&&!c,h=()=>{};if(m){let d=!1,u=!1,l=!1,f=()=>{u?e.dataset.tabsRunning="stopped":d&&!document.hidden?e.dataset.tabsRunning="true":delete e.dataset.tabsRunning};h=()=>{u=!0,f()},e.style.setProperty("--tabs-auto",`${b}s`),e.addEventListener("animationend",p=>{p.target.matches("[data-tabs-progress]")&&v((i+1)%t.length)}),new IntersectionObserver(p=>{d=p[p.length-1].isIntersecting,d||(u=!1),d&&!l&&(l=!0,a.forEach(x=>x==null?void 0:x.querySelectorAll('img[loading="lazy"]').forEach(E=>{new Image().src=E.currentSrc||E.src}))),f()},{threshold:.25}).observe(e),document.addEventListener("visibilitychange",f)}t.forEach((d,u)=>{d.addEventListener("click",()=>{h(),v(u)}),d.addEventListener("keydown",l=>{let f=t.length-1,p=l.key==="ArrowDown"||l.key==="ArrowRight"?u===f?0:u+1:l.key==="ArrowUp"||l.key==="ArrowLeft"?u===0?f:u-1:l.key==="Home"?0:l.key==="End"?f:-1;p<0||(l.preventDefault(),h(),v(p,!0))})})})}function k(e,t){try{t()}catch(n){console.error(`[wfc] ${e} failed to initialize`,n)}}function re(){document.documentElement.classList.remove("is-loading"),k("environment-switcher",$),k("nav",J),k("faq",z),k("hero-shader",X),k("tabs",ne),k("slider",te),k("panel-shader",Q),k("charts",U),k("count-up",O),k("share",ee),k("filter-all",W),k("finsweet-loader",V)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",re,{once:!0}):re();})();
