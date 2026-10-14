"use strict";(()=>{function U(){let e=document.querySelectorAll("[data-chart]");if(!e.length||!("IntersectionObserver"in window)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let t=new Map,n=new IntersectionObserver(r=>{r.forEach(i=>{var o;i.isIntersecting&&(n.unobserve(i.target),(o=t.get(i.target))==null||o.forEach(a=>{a.dataset.chart==="columns"&&a.querySelectorAll("rect").forEach((s,c)=>{s.style.transitionDelay=`${c*90}ms`}),a.dataset.inView=""}))})},{threshold:.5});e.forEach(r=>{var o;let i=r.parentElement;i&&(r.dataset.chartArmed="",t.set(i,[...(o=t.get(i))!=null?o:[],r]),n.observe(i))})}function O(){let e=document.querySelectorAll("[data-count]");if(!e.length)return;let t=(o,a)=>o.toLocaleString("en-CA",{minimumFractionDigits:a,maximumFractionDigits:a}),n=o=>{var s,c;let a=(s=o.dataset.count)!=null?s:"0";return{to:Number(a)||0,decimals:((c=a.split(".")[1])!=null?c:"").length}};if(matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver"in window)){e.forEach(o=>{let{to:a,decimals:s}=n(o);o.textContent=t(a,s)});return}let r=o=>{let{to:a,decimals:s}=n(o);o.style.display="inline-block",o.style.whiteSpace="nowrap",o.textContent=t(a,s);let c=parseFloat(getComputedStyle(o).fontSize)||16;o.style.width=`${o.getBoundingClientRect().width/c}em`,o.textContent=t(0,s);let b=performance.now(),l=p=>{let h=Math.min(1,Math.max(0,(p-b)/1600)),g=1-Math.pow(1-h,3);if(o.textContent=t(a*g,s),h<1){requestAnimationFrame(l);return}o.textContent=t(a,s),o.style.width=o.style.display=o.style.whiteSpace=""};requestAnimationFrame(l)},i=new IntersectionObserver(o=>{o.forEach(a=>{a.isIntersecting&&(i.unobserve(a.target),r(a.target))})},{threshold:.6});e.forEach(o=>i.observe(o))}function $(){var g,u,d,f;let e=window.WFC;if(!/\.webflow\.io$/.test(location.hostname)||!e||location.hostname==="seo-teams.webflow.io"&&!new URLSearchParams(location.search).has("wfc-switcher")||(u=(g=window.Webflow)==null?void 0:g.env)!=null&&u.call(g,"editor")||(f=(d=window.Webflow)==null?void 0:d.env)!=null&&f.call(d,"design")||document.getElementById("wfc-environment"))return;let t=e.source?e.source===e.devBase:!!e.dev,n=!!e.source&&e.source!==e.devBase&&e.source!==e.stag,r=!!e.dev&&!t||n,i=t?"Dev":"Staging",o=document.createElement("div");o.id="wfc-environment";let a=o.attachShadow({mode:"open"});a.innerHTML=`
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
  `;let s=a.querySelector(".control"),c=a.querySelector(".launcher"),b=a.querySelector(".choices"),l=a.querySelector(".status"),p=a.querySelectorAll("[data-mode]");a.querySelector(".label").textContent=i,a.querySelector(".dot").toggleAttribute("data-dev",t),c.setAttribute("aria-label",`Choose environment (${i})`),n&&(l.textContent="Staging unavailable \xB7 using release"),c.title=n?"Staging could not load. Using the pinned release.":r?"Local dev could not load. Using staging.":"Switch between staging and local dev";function h(m,v=!1){var x;c.hidden=m,b.hidden=!m,l.hidden=!m||!r,s.toggleAttribute("data-expanded",m),c.setAttribute("aria-expanded",String(m)),v&&(m?(x=a.querySelector('[aria-pressed="true"]'))==null||x.focus():c.focus())}p.forEach(m=>{let v=m.dataset.mode==="dev";m.setAttribute("aria-pressed",String(v===t)),m.addEventListener("click",()=>{if(v===!!e.dev&&!r)return;let x=new URL(location.href);x.searchParams.set("wfc-dev",v?"1":"0");try{localStorage.setItem("wfc-dev",v?"1":"0")}catch{}location.assign(x.href)})}),c.addEventListener("click",()=>h(!0,!0)),a.querySelector(".minimize").addEventListener("click",()=>h(!1,!0)),s.addEventListener("keydown",m=>{m.key!=="Escape"||b.hidden||(m.preventDefault(),m.stopPropagation(),h(!1,!0))}),document.addEventListener("pointerdown",m=>{m.composedPath().includes(o)||h(!1)}),document.body.appendChild(o)}function W(){let e=matchMedia("(prefers-reduced-motion: reduce)").matches;document.querySelectorAll("[data-faq-trigger]").forEach((n,r)=>{var l,p,h,g,u;let i=document.getElementById((l=n.getAttribute("aria-controls"))!=null?l:"");if(!i){if(i=(h=(p=n.closest("[data-faq-item]"))==null?void 0:p.querySelector("[data-faq-panel]"))!=null?h:null,!i)return;i.id||(i.id=`faq-panel-${r+1}`),n.setAttribute("aria-controls",i.id),n.getAttribute("aria-expanded")!=="true"&&(n.setAttribute("aria-expanded","false"),i.hidden=!0)}let o,a=n.querySelector("[data-faq-label]"),s={closed:(g=a==null?void 0:a.textContent)!=null?g:"",open:(u=n.dataset.faqOpenLabel)!=null?u:""},c,b=d=>{if(!a||!s.open)return;let f=d?s.open:s.closed;if(c==null||c.cancel(),e||!a.animate){a.textContent=f;return}c=a.animate([{opacity:1},{opacity:0}],{duration:300/2,easing:"ease-in"}),c.onfinish=()=>{a.textContent=f,c=a.animate([{opacity:0},{opacity:1}],{duration:300/2,easing:"ease-out"})},c.oncancel=()=>{a.textContent=f}};n.addEventListener("click",()=>{let d=n.getAttribute("aria-expanded")!=="true";if(n.setAttribute("aria-expanded",String(d)),b(d),o==null||o.cancel(),e||!i.animate){i.hidden=!d;return}i.hidden=!1;let f=`${i.offsetHeight}px`,{paddingTop:m,paddingBottom:v,marginTop:x}=getComputedStyle(i),E=i.parentElement?getComputedStyle(i.parentElement):null,w=E&&/flex|grid/.test(E.display)&&parseFloat(E.rowGap)||0,L={height:"0px",paddingTop:"0px",paddingBottom:"0px",marginTop:`${parseFloat(x)-w}px`,opacity:0},_={height:f,paddingTop:m,paddingBottom:v,marginTop:x,opacity:1};i.style.overflow="hidden",o=i.animate(d?[L,_]:[_,L],{duration:300,easing:"cubic-bezier(0.4, 0, 0.2, 1)"});let C=()=>{i.style.overflow="",i.hidden=!d};o.onfinish=C,o.oncancel=()=>{i.style.overflow=""}})})}var re='input[type="radio"]:checked, input[type="checkbox"]:checked';function z(){document.querySelectorAll("[data-filter-all]").forEach(e=>{let t=e.closest('[fs-list-element="filters"], form');if(!t)return;let n=e.dataset.filterAll||"is-active",r=()=>e.classList.toggle(n,!t.querySelector(re));t.addEventListener("change",r),t.addEventListener("input",r),e.addEventListener("click",()=>{setTimeout(r,0),setTimeout(r,150)}),r()})}var ae=["list"],K,G=typeof document!="undefined"?(K=document.currentScript)==null?void 0:K.src:void 0;function ie(e){let t=new URL(e);return t.pathname=t.pathname.replace(/index\.js$/,"fs-bundle.js"),t.href}function V(){if(!ae.some(t=>document.querySelector(`[fs-${t}-element]`))||document.querySelector('script[src*="@finsweet/attributes"]')||!G||document.querySelector("script[data-fs-bundle]"))return;let e=document.createElement("script");e.src=ie(G),e.defer=!0,e.dataset.fsBundle="",document.head.appendChild(e)}var j={orange:["#1c0d08","#9e330f","#ed6629","#f7a366","#f0d694"],ember:["#1c0e09","#a82b14","#c2381f","#e0602a","#f2a65a"],coral:["#200f09","#c43c18","#ff6a4a","#ff9a78","#ffd0b8"],plum:["#1a0612","#5a1440","#7e2a5e","#c98db4","#f1d6e7"],rose:["#1c0a0c","#9c2340","#c0395a","#e06a6f","#f6c7c9"],umber:["#1c0e09","#6b3518","#8a4b2a","#b97a4a","#e8c9a0"]};function Y(e){let n=(e&&j[e.trim().toLowerCase()]||(e!=null&&e.includes(",")?e.split(","):j.orange)).slice(0,5).map(r=>{let i=r.trim().replace("#","");return[0,2,4].map(o=>parseInt(i.slice(o,o+2),16)/255)});return n.length===5&&n.flat().every(r=>Number.isFinite(r))?n.flat():Y("orange")}var se="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",ce=`
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
}`;function X(){let e=Array.from(document.querySelectorAll("canvas[data-hero-shader]"));if(!e.length)return;let t=matchMedia("(max-width: 767px)").matches,n="requestIdleCallback"in window?r=>requestIdleCallback(r,{timeout:1e3}):r=>setTimeout(r,200);e.forEach(r=>{let i=()=>n(()=>{try{de(r)}catch(s){console.error("[hero-shader]",s)}}),o=r.getBoundingClientRect();if(o.top<window.innerHeight&&o.bottom>0){let s=()=>requestAnimationFrame(()=>requestAnimationFrame(i));document.readyState==="complete"?s():window.addEventListener("load",s,{once:!0});return}if(t)return;let a=new IntersectionObserver(([s])=>{s.isIntersecting&&(a.disconnect(),i())},{rootMargin:"300px 0px"});a.observe(r)})}function le(e){let t=e.getExtension("WEBGL_debug_renderer_info"),n=String(t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER));return/swiftshader|llvmpipe|software|basic render/i.test(n)}function de(e){var F,B;let t=e.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!t)return;if(le(t)){(F=t.getExtension("WEBGL_lose_context"))==null||F.loseContext();return}let n=(y,S)=>{var T;let A=t.createShader(y);if(t.shaderSource(A,S),t.compileShader(A),!t.getShaderParameter(A,t.COMPILE_STATUS))throw new Error((T=t.getShaderInfoLog(A))!=null?T:"shader");return A},r=t.createProgram();if(t.attachShader(r,n(t.VERTEX_SHADER,se)),t.attachShader(r,n(t.FRAGMENT_SHADER,ce)),t.linkProgram(r),!t.getProgramParameter(r,t.LINK_STATUS))throw new Error((B=t.getProgramInfoLog(r))!=null?B:"program");t.useProgram(r),t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW);let i=t.getAttribLocation(r,"p");t.enableVertexAttribArray(i),t.vertexAttribPointer(i,2,t.FLOAT,!1,0,0);let o=t.getUniformLocation(r,"u_res"),a=t.getUniformLocation(r,"u_time"),s=t.getUniformLocation(r,"u_mouse"),c=t.getUniformLocation(r,"u_hover"),b=t.getUniformLocation(r,"u_grain");t.uniform1f(t.getUniformLocation(r,"u_dark"),e.dataset.shaderTheme==="dark"?1:0),t.uniform3fv(t.getUniformLocation(r,"u_c"),new Float32Array(Y(e.dataset.shaderPalette)));let l=matchMedia("(prefers-reduced-motion: reduce)").matches,p={x:.3,y:.4,hover:0},h={x:.3,y:.4,hover:0},g=!0,u=0,d=performance.now(),f=25e5,m=1,v=1,x=()=>{let y=Math.max(1,e.clientWidth),S=Math.max(1,e.clientHeight);v=Math.min(window.devicePixelRatio||1,2,Math.sqrt(f/(y*S)))*m;let A=Math.max(1,Math.round(y*v)),T=Math.max(1,Math.round(S*v));(e.width!==A||e.height!==T)&&(e.width=A,e.height=T,t.viewport(0,0,A,T))},E=y=>{x(),h.x+=(p.x-h.x)*.06,h.y+=(p.y-h.y)*.06,h.hover+=(p.hover-h.hover)*.05,t.uniform2f(o,e.width,e.height),t.uniform1f(a,l?12:(y-d)/1e3+12),t.uniform2f(s,h.x,h.y),t.uniform1f(c,h.hover),t.uniform1f(b,1/Math.max(v,.5)),t.drawArrays(t.TRIANGLES,0,3),e.dataset.heroShader="ready"},w=0,L=0,_=0,C=y=>{let S=w?y-w:16;w=y,S>25&&S<250?(L++,_=0):S<18&&(_++,L=Math.max(0,L-1)),L>20&&m>.5&&(m=Math.max(.5,m-.15),L=0),_>600&&m<1&&(m=Math.min(1,m+.15),_=0),E(y),u=g&&!document.hidden?requestAnimationFrame(C):0,u||(w=0)},R=()=>{!u&&!l&&g&&!document.hidden&&(u=requestAnimationFrame(C))};if(l){E(d),new ResizeObserver(()=>E(d)).observe(e);return}window.addEventListener("pointermove",y=>{let S=e.getBoundingClientRect(),A=(y.clientX-S.left)/S.width,T=1-(y.clientY-S.top)/S.height,I=A>=0&&A<=1&&T>=0&&T<=1;p.hover=I?1:0,I&&(p.x=A,p.y=T)},{passive:!0}),document.documentElement.addEventListener("pointerleave",()=>{p.hover=0}),new IntersectionObserver(([y])=>{g=y.isIntersecting,R()}).observe(e),document.addEventListener("visibilitychange",R),u=requestAnimationFrame(C)}function J(){let e=location.pathname.replace(/\/$/,"");document.querySelectorAll("[data-nav-section]").forEach(r=>{(r.dataset.navSection||"").split(/\s+/).map(o=>o.replace(/\/$/,"")).filter(Boolean).some(o=>e===o||e.startsWith(`${o}/`))&&r.setAttribute("aria-current","true")}),he();let t=document.querySelector("[data-nav-toggle]");if(!t)return;let n=document.querySelector("[data-mobile-menu]");n?ue(t,n):pe(t)}function ue(e,t){let n=document.documentElement,r;t.id||(t.id="mobile-menu"),e.setAttribute("aria-controls",t.id),e.setAttribute("aria-expanded","false"),t.hidden=!0;let i=()=>[...t.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(c=>c.offsetParent!==null),o=()=>e.getAttribute("aria-expanded")==="true",a=()=>{var c,b;window.clearTimeout(r),t.hidden=!1,e.setAttribute("aria-expanded","true"),n.classList.add("is-menu-open"),requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add("is-open"))),(b=(c=t.querySelector("[data-nav-close]"))!=null?c:i()[0])==null||b.focus({preventScroll:!0})},s=(c=!0)=>{if(!o())return;e.setAttribute("aria-expanded","false"),t.classList.remove("is-open"),n.classList.remove("is-menu-open");let b=matchMedia("(prefers-reduced-motion: reduce)").matches;r=window.setTimeout(()=>t.hidden=!0,b?0:320),c&&e.focus({preventScroll:!0})};e.addEventListener("click",()=>o()?s():a()),t.querySelectorAll("[data-nav-close]").forEach(c=>c.addEventListener("click",()=>s())),t.addEventListener("click",c=>{c.target.closest("a[href]")&&s(!1)}),document.addEventListener("keydown",c=>{if(!o()||(c.key==="Escape"&&s(),c.key!=="Tab"))return;let b=i();if(!b.length)return;let l=b[0],p=b[b.length-1];c.shiftKey&&document.activeElement===l?(c.preventDefault(),p.focus()):!c.shiftKey&&document.activeElement===p&&(c.preventDefault(),l.focus())}),matchMedia("(min-width: 992px)").addEventListener("change",c=>{c.matches&&s(!1)})}var fe=80,me=220;function he(){var b;let t=[...document.querySelectorAll("[data-nav-dropdown][aria-controls]")].map(l=>({button:l,panel:document.getElementById(l.getAttribute("aria-controls")||"")})).filter(l=>!!l.panel);if(!t.length)return;let n=(b=t[0].button.closest("[data-nav]"))!=null?b:document.body,r=matchMedia("(min-width: 992px)"),i=matchMedia("(hover: hover) and (pointer: fine)"),o=null,a,s=(l=!1)=>{if(window.clearTimeout(a),!o)return;let{button:p,panel:h}=o;p.setAttribute("aria-expanded","false"),h.classList.remove("is-visible","is-open"),l&&p.focus({preventScroll:!0}),o=null},c=l=>{window.clearTimeout(a),o!==l&&(s(),o=l,l.button.setAttribute("aria-expanded","true"),l.panel.classList.add("is-open"),l.panel.offsetWidth,l.panel.classList.add("is-visible"))};t.forEach(l=>{let{button:p,panel:h}=l;p.setAttribute("aria-expanded","false"),p.addEventListener("click",()=>o===l?s():c(l));let g=()=>{!i.matches||!r.matches||(window.clearTimeout(a),o!==l&&(a=window.setTimeout(()=>c(l),o?0:fe)))},u=()=>{i.matches&&(window.clearTimeout(a),a=window.setTimeout(()=>o===l&&s(),me))};[p,h].forEach(d=>{d.addEventListener("mouseenter",g),d.addEventListener("mouseleave",u)}),h.addEventListener("click",d=>{d.target.closest("a[href]")&&s()})}),document.addEventListener("keydown",l=>{l.key==="Escape"&&o&&s(!0)}),document.addEventListener("click",l=>{o&&!n.contains(l.target)&&s()}),n.addEventListener("focusout",l=>{o&&!n.contains(l.relatedTarget)&&s()}),r.addEventListener("change",l=>{l.matches||s()})}function pe(e){let t=e.closest("nav"),n=document.querySelector("[data-nav-menu]");if(!t||!n)return;let r=i=>{t.classList.toggle("is-open",i),e.setAttribute("aria-expanded",String(i))};e.addEventListener("click",()=>r(e.getAttribute("aria-expanded")!=="true")),n.addEventListener("click",i=>{i.target.closest("a")&&r(!1)}),document.addEventListener("keydown",i=>{i.key==="Escape"&&t.classList.contains("is-open")&&(r(!1),e.focus())}),matchMedia("(min-width: 992px)").addEventListener("change",i=>{i.matches&&r(!1)})}var ge="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",be=`
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
}`,ve=`
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
}`,xe={glow:{frag:be,budget:3e6,density:e=>Math.min(e,2)},ember:{frag:ve,budget:5e5,density:()=>.5}};function we(e){let t=e.getExtension("WEBGL_debug_renderer_info"),n=String(t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER));return/swiftshader|llvmpipe|software|basic render/i.test(n)}function Ee(e,t){var _,C,R,F,B,y,S,A,T,I;let n=e.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!n)return null;if(we(n))return(_=n.getExtension("WEBGL_lose_context"))==null||_.loseContext(),null;let r=(M,P)=>{var q;let H=n.createShader(M);if(n.shaderSource(H,P),n.compileShader(H),!n.getShaderParameter(H,n.COMPILE_STATUS))throw new Error((q=n.getShaderInfoLog(H))!=null?q:"shader");return H},i=n.createProgram();if(n.attachShader(i,r(n.VERTEX_SHADER,ge)),n.attachShader(i,r(n.FRAGMENT_SHADER,t.frag)),n.linkProgram(i),!n.getProgramParameter(i,n.LINK_STATUS))throw new Error((C=n.getProgramInfoLog(i))!=null?C:"program");n.useProgram(i),n.bindBuffer(n.ARRAY_BUFFER,n.createBuffer()),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),n.STATIC_DRAW);let o=n.getAttribLocation(i,"p");n.enableVertexAttribArray(o),n.vertexAttribPointer(o,2,n.FLOAT,!1,0,0);let a=M=>n.getUniformLocation(i,M),s={res:a("u_res"),time:a("u_time"),px:a("u_px"),em:a("u_em"),peak:a("u_peak"),column:a("u_column"),span:a("u_span"),base:a("u_base"),strength:a("u_strength")},c=Number((R=e.dataset.glowPeak)!=null?R:.5),b=Number((F=e.dataset.glowColumn)!=null?F:4.2),l=Number((B=e.dataset.glowSpan)!=null?B:18.3),p=Number((y=e.dataset.glowStrength)!=null?y:.7),h=(T=(A=/^#?([0-9a-f]{6})$/i.exec((S=e.dataset.glowBase)!=null?S:""))==null?void 0:A[1])!=null?T:"200f09",g=[0,2,4].map(M=>parseInt(h.slice(M,M+2),16)/255),u=Number((I=e.dataset.shaderSpeed)!=null?I:1)||1,d=performance.now(),f=0,m=0,v=!1,x=!1,E=M=>{let P=Math.max(1,e.clientWidth),H=Math.max(1,e.clientHeight),q=Math.min(t.density(window.devicePixelRatio||1),Math.sqrt(t.budget/(P*H))),D=Math.max(1,Math.round(P*q)),N=Math.max(1,Math.round(H*q));(e.width!==D||e.height!==N)&&(e.width=D,e.height=N,n.viewport(0,0,D,N)),n.uniform2f(s.res,D,N),n.uniform1f(s.time,(M-d)/1e3*u),n.uniform1f(s.px,q),n.uniform1f(s.em,parseFloat(getComputedStyle(e).fontSize)||16),n.uniform1f(s.peak,c),n.uniform1f(s.column,b),n.uniform1f(s.span,l),n.uniform3f(s.base,g[0],g[1],g[2]),n.uniform1f(s.strength,p),n.drawArrays(n.TRIANGLES,0,3),e.dataset.ready=""},w=M=>{M-m>=30&&(m=M,E(M)),f=v&&!x&&!document.hidden?requestAnimationFrame(w):0},L=()=>{!f&&v&&!x&&!document.hidden&&(f=requestAnimationFrame(w))};return e.addEventListener("webglcontextlost",M=>{M.preventDefault(),x=!0,delete e.dataset.ready}),document.addEventListener("visibilitychange",L),{show(M){v=M,L()}}}function Q(){var o;let e=document.querySelectorAll("canvas[data-panel-shader]");if(!e.length||((o=navigator.connection)==null?void 0:o.saveData)||matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches)return;let n="requestIdleCallback"in window?a=>requestIdleCallback(a,{timeout:1e3}):a=>setTimeout(a,200),r=new Map,i=new IntersectionObserver(a=>{a.forEach(s=>{let c=s.target,b=r.get(c);if(b){b.show(s.isIntersecting);return}b===null||!s.isIntersecting||(r.set(c,null),n(()=>{var p;let l=xe[(p=c.dataset.panelShader)!=null?p:""];if(l)try{let h=Ee(c,l);r.set(c,h);let g=c.getBoundingClientRect();h==null||h.show(g.bottom>-200&&g.top<window.innerHeight+200)}catch(h){console.error("[panel-shader]",h)}}))})},{rootMargin:"200px 0px"});e.forEach(a=>i.observe(a))}var Z={linkedin:e=>`https://www.linkedin.com/sharing/share-offsite/?url=${e}`,x:(e,t)=>`https://twitter.com/intent/tweet?url=${e}&text=${t}`,facebook:e=>`https://www.facebook.com/sharer/sharer.php?u=${e}`};function ee(){let e=document.querySelectorAll("[data-share]");if(!e.length)return;let t=encodeURIComponent(location.origin+location.pathname),n=encodeURIComponent(document.title);e.forEach(r=>{let i=r.dataset.share||"";if(Z[i]&&r instanceof HTMLAnchorElement){r.href=Z[i](t,n),r.target="_blank",r.rel="noopener";return}i==="copy"&&r.addEventListener("click",async o=>{o.preventDefault();try{await navigator.clipboard.writeText(location.origin+location.pathname)}catch{return}let a=r.getAttribute("aria-label")||"";r.setAttribute("aria-label","Link copied"),r.classList.add("is-copied"),setTimeout(()=>{r.setAttribute("aria-label",a),r.classList.remove("is-copied")},2e3)})})}function te(){document.querySelectorAll("[data-slider]").forEach(e=>{let t=e.querySelector("[data-slider-track]"),n=Array.from(e.querySelectorAll("[data-slider-item]"));if(!t||!n.length)return;let r=e.querySelector("[data-slider-prev]"),i=e.querySelector("[data-slider-next]"),o=e.querySelector("[data-slider-current]"),a=e.querySelector("[data-slider-total]"),s=g=>String(g).padStart(2,"0");a&&(a.textContent=s(n.length));let c=()=>n.length>1?n[1].offsetLeft-n[0].offsetLeft:t.clientWidth,b=()=>t.scrollLeft+t.clientWidth>=t.scrollWidth-2?n.length-1:Math.min(n.length-1,Math.round(t.scrollLeft/c())),l=()=>{let g=b();o&&(o.textContent=s(g+1)),r&&(r.disabled=g===0),i&&(i.disabled=g===n.length-1)},p=g=>{let u=matchMedia("(prefers-reduced-motion: reduce)").matches;t.scrollBy({left:g*c(),behavior:u?"auto":"smooth"})};r==null||r.addEventListener("click",()=>p(-1)),i==null||i.addEventListener("click",()=>p(1));let h=!1;t.addEventListener("scroll",()=>{h||(h=!0,requestAnimationFrame(()=>{h=!1,l()}))},{passive:!0}),l()})}function ne(){document.querySelectorAll("[data-tabs]").forEach(e=>{let t=Array.from(e.querySelectorAll("[data-tabs-tab]"));if(!t.length)return;let n=t[0].closest('[role="tablist"], [role="list"]');n&&e.contains(n)&&(n.setAttribute("role","tablist"),t.forEach(u=>{for(let d=u.parentElement;d&&d!==n;d=d.parentElement)d.getAttribute("role")==="listitem"&&d.setAttribute("role","presentation")}));let r=Array.from(e.querySelectorAll("[data-tabs-panel]")),i=e.id||`tabs-${Array.from(document.querySelectorAll("[data-tabs]")).indexOf(e)+1}`,o=t.map((u,d)=>{var m,v,x;let f=(x=(v=document.getElementById((m=u.getAttribute("aria-controls"))!=null?m:""))!=null?v:r[d])!=null?x:null;return f&&(u.id||(u.id=`${i}-tab-${d+1}`),f.id||(f.id=`${i}-panel-${d+1}`),u.setAttribute("aria-controls",f.id),f.setAttribute("role","tabpanel"),f.setAttribute("aria-labelledby",u.id)),u.setAttribute("role","tab"),u.querySelectorAll("[data-tabs-number]").forEach(E=>{E.textContent=String(d+1).padStart(2,"0")}),f==null||f.querySelectorAll("[data-tabs-step]").forEach(E=>{E.textContent=String(d+1)}),f}),a=Math.max(0,t.findIndex(u=>u.getAttribute("aria-selected")==="true"));t.forEach((u,d)=>{let f=d===a;u.classList.toggle("is-active",f),u.setAttribute("aria-selected",String(f)),u.tabIndex=f?0:-1,o[d]&&(o[d].hidden=!f)});let s=matchMedia("(prefers-reduced-motion: reduce)").matches,c=0,b=()=>{window.clearTimeout(c),c=0,o.forEach((u,d)=>{if(!u)return;u.classList.remove("is-entering","is-leaving"),u.hidden=d!==a;let f=u.querySelector("[data-tabs-box]");f&&(f.style.height=f.style.overflow=f.style.transition="")})},l=(u,d=!1)=>{var E;let f=o[a],m=o[u],v=!s&&u!==a&&!!f&&!!m;b();let x=v?(E=f.querySelector("[data-tabs-box]"))==null?void 0:E.offsetHeight:void 0;if(a=u,t.forEach((w,L)=>{let _=L===u;w.classList.toggle("is-active",_),w.setAttribute("aria-selected",String(_)),w.tabIndex=_?0:-1;let C=o[L];C&&(C.hidden=!_)}),v){f.hidden=!1,f.classList.add("is-leaving"),m.classList.add("is-entering");let w=m.querySelector("[data-tabs-box]");if(w&&x){let L=w.offsetHeight;w.style.overflow="hidden",w.style.height=`${x}px`,w.getBoundingClientRect(),w.style.transition=`height ${700*.7}ms cubic-bezier(0.4, 0, 0.2, 1)`,w.style.height=`${L}px`}c=window.setTimeout(b,700)}d&&t[u].focus()},p=Number(e.dataset.tabsAuto),h=p>0&&t.length>1&&!!e.querySelector("[data-tabs-progress]")&&!s,g=()=>{};if(h){let u=!1,d=!1,f=!1,m=()=>{d?e.dataset.tabsRunning="stopped":u&&!document.hidden?e.dataset.tabsRunning="true":delete e.dataset.tabsRunning};g=()=>{d=!0,m()},e.style.setProperty("--tabs-auto",`${p}s`),e.addEventListener("animationend",v=>{v.target.matches("[data-tabs-progress]")&&l((a+1)%t.length)}),new IntersectionObserver(v=>{u=v[v.length-1].isIntersecting,u||(d=!1),u&&!f&&(f=!0,o.forEach(x=>x==null?void 0:x.querySelectorAll('img[loading="lazy"]').forEach(E=>{new Image().src=E.currentSrc||E.src}))),m()},{threshold:.25}).observe(e),document.addEventListener("visibilitychange",m)}t.forEach((u,d)=>{u.addEventListener("click",()=>{g(),l(d)}),u.addEventListener("keydown",f=>{let m=t.length-1,v=f.key==="ArrowDown"||f.key==="ArrowRight"?d===m?0:d+1:f.key==="ArrowUp"||f.key==="ArrowLeft"?d===0?m:d-1:f.key==="Home"?0:f.key==="End"?m:-1;v<0||(f.preventDefault(),g(),l(v,!0))})})})}function k(e,t){try{t()}catch(n){console.error(`[wfc] ${e} failed to initialize`,n)}}function oe(){document.documentElement.classList.remove("is-loading"),k("environment-switcher",$),k("nav",J),k("faq",W),k("hero-shader",X),k("tabs",ne),k("slider",te),k("panel-shader",Q),k("charts",U),k("count-up",O),k("share",ee),k("filter-all",z),k("finsweet-loader",V)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",oe,{once:!0}):oe();})();
