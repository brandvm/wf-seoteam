"use strict";(()=>{function G(){let e=document.querySelectorAll("[data-chart]");if(!e.length||!("IntersectionObserver"in window)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let t=new Map,n=new IntersectionObserver(r=>{r.forEach(o=>{var i;o.isIntersecting&&(n.unobserve(o.target),(i=t.get(o.target))==null||i.forEach(a=>{a.dataset.chart==="columns"&&a.querySelectorAll("rect").forEach((s,c)=>{s.style.transitionDelay=`${c*90}ms`}),a.dataset.inView=""}))})},{threshold:.5});e.forEach(r=>{var i;let o=r.parentElement;o&&(r.dataset.chartArmed="",t.set(o,[...(i=t.get(o))!=null?i:[],r]),n.observe(o))})}function Ee(){document.querySelectorAll("[data-count-text]").forEach(e=>{var c;let t=(c=e.textContent)!=null?c:"",n=t.match(/\d[\d,]*(?:\.\d+)?/);if(!n||n.index===void 0||/\d\s*[–-]\s*\d/.test(t))return;let r=e.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)return;let o=n[0].replace(/,/g,""),i=document.createElement("span");i.className="sr-only",i.textContent=t;let a=document.createElement("span");a.setAttribute("aria-hidden","true");let s=document.createElement("span");s.dataset.count=o,s.textContent="0",a.append(t.slice(0,n.index),s,t.slice(n.index+n[0].length)),e.replaceChildren(i,a)})}function W(){Ee();let e=document.querySelectorAll("[data-count]");if(!e.length)return;let t=(i,a)=>i.toLocaleString("en-CA",{minimumFractionDigits:a,maximumFractionDigits:a}),n=i=>{var s,c;let a=(s=i.dataset.count)!=null?s:"0";return{to:Number(a)||0,decimals:((c=a.split(".")[1])!=null?c:"").length}};if(matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver"in window)){e.forEach(i=>{let{to:a,decimals:s}=n(i);i.textContent=t(a,s)});return}let r=i=>{let{to:a,decimals:s}=n(i);i.style.display="inline-block",i.style.whiteSpace="nowrap",i.textContent=t(a,s);let c=parseFloat(getComputedStyle(i).fontSize)||16;i.style.width=`${i.getBoundingClientRect().width/c}em`,i.textContent=t(0,s);let p=performance.now(),v=w=>{let E=Math.min(1,Math.max(0,(w-p)/1600)),b=1-Math.pow(1-E,3);if(i.textContent=t(a*b,s),E<1){requestAnimationFrame(v);return}i.textContent=t(a,s),i.style.width=i.style.display=i.style.whiteSpace=""};requestAnimationFrame(v)},o=new IntersectionObserver(i=>{i.forEach(a=>{a.isIntersecting&&(o.unobserve(a.target),r(a.target))})},{threshold:.6});e.forEach(i=>o.observe(i))}function j(){var b,m,l,d;let e=window.WFC;if(!/\.webflow\.io$/.test(location.hostname)||!e||location.hostname==="seo-teams.webflow.io"&&!new URLSearchParams(location.search).has("wfc-switcher")||(m=(b=window.Webflow)==null?void 0:b.env)!=null&&m.call(b,"editor")||(d=(l=window.Webflow)==null?void 0:l.env)!=null&&d.call(l,"design")||document.getElementById("wfc-environment"))return;let t=e.source?e.source===e.devBase:!!e.dev,n=!!e.source&&e.source!==e.devBase&&e.source!==e.stag,r=!!e.dev&&!t||n,o=t?"Dev":"Staging",i=document.createElement("div");i.id="wfc-environment";let a=i.attachShadow({mode:"open"});a.innerHTML=`
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
  `;let s=a.querySelector(".control"),c=a.querySelector(".launcher"),p=a.querySelector(".choices"),v=a.querySelector(".status"),w=a.querySelectorAll("[data-mode]");a.querySelector(".label").textContent=o,a.querySelector(".dot").toggleAttribute("data-dev",t),c.setAttribute("aria-label",`Choose environment (${o})`),n&&(v.textContent="Staging unavailable \xB7 using release"),c.title=n?"Staging could not load. Using the pinned release.":r?"Local dev could not load. Using staging.":"Switch between staging and local dev";function E(f,h=!1){var u;c.hidden=f,p.hidden=!f,v.hidden=!f||!r,s.toggleAttribute("data-expanded",f),c.setAttribute("aria-expanded",String(f)),h&&(f?(u=a.querySelector('[aria-pressed="true"]'))==null||u.focus():c.focus())}w.forEach(f=>{let h=f.dataset.mode==="dev";f.setAttribute("aria-pressed",String(h===t)),f.addEventListener("click",()=>{if(h===!!e.dev&&!r)return;let u=new URL(location.href);u.searchParams.set("wfc-dev",h?"1":"0");try{localStorage.setItem("wfc-dev",h?"1":"0")}catch{}location.assign(u.href)})}),c.addEventListener("click",()=>E(!0,!0)),a.querySelector(".minimize").addEventListener("click",()=>E(!1,!0)),s.addEventListener("keydown",f=>{f.key!=="Escape"||p.hidden||(f.preventDefault(),f.stopPropagation(),E(!1,!0))}),document.addEventListener("pointerdown",f=>{f.composedPath().includes(i)||E(!1)}),document.body.appendChild(i)}function V(){let e=matchMedia("(prefers-reduced-motion: reduce)").matches;document.querySelectorAll("[data-faq-trigger]").forEach((n,r)=>{var v,w,E,b,m;let o=document.getElementById((v=n.getAttribute("aria-controls"))!=null?v:"");if(!o){if(o=(E=(w=n.closest("[data-faq-item]"))==null?void 0:w.querySelector("[data-faq-panel]"))!=null?E:null,!o)return;o.id||(o.id=`faq-panel-${r+1}`),n.setAttribute("aria-controls",o.id),n.getAttribute("aria-expanded")!=="true"&&(n.setAttribute("aria-expanded","false"),o.hidden=!0)}let i,a=n.querySelector("[data-faq-label]"),s={closed:(b=a==null?void 0:a.textContent)!=null?b:"",open:(m=n.dataset.faqOpenLabel)!=null?m:""},c,p=l=>{if(!a||!s.open)return;let d=l?s.open:s.closed;if(c==null||c.cancel(),e||!a.animate){a.textContent=d;return}c=a.animate([{opacity:1},{opacity:0}],{duration:300/2,easing:"ease-in"}),c.onfinish=()=>{a.textContent=d,c=a.animate([{opacity:0},{opacity:1}],{duration:300/2,easing:"ease-out"})},c.oncancel=()=>{a.textContent=d}};n.addEventListener("click",()=>{let l=n.getAttribute("aria-expanded")!=="true";if(n.setAttribute("aria-expanded",String(l)),p(l),i==null||i.cancel(),e||!o.animate){o.hidden=!l;return}o.hidden=!1;let d=`${o.offsetHeight}px`,{paddingTop:f,paddingBottom:h,marginTop:u}=getComputedStyle(o),g=o.parentElement?getComputedStyle(o.parentElement):null,x=g&&/flex|grid/.test(g.display)&&parseFloat(g.rowGap)||0,M={height:"0px",paddingTop:"0px",paddingBottom:"0px",marginTop:`${parseFloat(u)-x}px`,opacity:0},k={height:d,paddingTop:f,paddingBottom:h,marginTop:u,opacity:1};o.style.overflow="hidden",i=o.animate(l?[M,k]:[k,M],{duration:300,easing:"cubic-bezier(0.4, 0, 0.2, 1)"});let q=()=>{o.style.overflow="",o.hidden=!l};i.onfinish=q,i.oncancel=()=>{o.style.overflow=""}})})}var we='input[type="radio"]:checked, input[type="checkbox"]:checked';function Y(){document.querySelectorAll("[data-filter-all]").forEach(e=>{let t=e.closest('[fs-list-element="filters"], form');if(!t)return;let n=e.dataset.filterAll||"is-active",r=()=>e.classList.toggle(n,!t.querySelector(we));t.addEventListener("change",r),t.addEventListener("input",r),e.addEventListener("click",()=>{setTimeout(r,0),setTimeout(r,150)}),r()})}var xe=["list"],X,K=typeof document!="undefined"?(X=document.currentScript)==null?void 0:X.src:void 0;function ye(e){let t=new URL(e);return t.pathname=t.pathname.replace(/index\.js$/,"fs-bundle.js"),t.href}function Z(){if(!xe.some(t=>document.querySelector(`[fs-${t}-element]`))||document.querySelector('script[src*="@finsweet/attributes"]')||!K||document.querySelector("script[data-fs-bundle]"))return;let e=document.createElement("script");e.src=ye(K),e.defer=!0,e.dataset.fsBundle="",document.head.appendChild(e)}var Q={orange:["#1c0d08","#9e330f","#ed6629","#f7a366","#f0d694"],ember:["#1c0e09","#a82b14","#c2381f","#e0602a","#f2a65a"],coral:["#200f09","#c43c18","#ff6a4a","#ff9a78","#ffd0b8"],plum:["#1a0612","#5a1440","#7e2a5e","#c98db4","#f1d6e7"],rose:["#1c0a0c","#9c2340","#c0395a","#e06a6f","#f6c7c9"],umber:["#1c0e09","#6b3518","#8a4b2a","#b97a4a","#e8c9a0"]};function J(e){let n=(e&&Q[e.trim().toLowerCase()]||(e!=null&&e.includes(",")?e.split(","):Q.orange)).slice(0,5).map(r=>{let o=r.trim().replace("#","");return[0,2,4].map(i=>parseInt(o.slice(i,i+2),16)/255)});return n.length===5&&n.flat().every(r=>Number.isFinite(r))?n.flat():J("orange")}var Le="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",Se=`
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
}`;function ee(){let e=Array.from(document.querySelectorAll("canvas[data-hero-shader]"));if(!e.length)return;let t=matchMedia("(max-width: 767px)").matches,n="requestIdleCallback"in window?r=>requestIdleCallback(r,{timeout:1e3}):r=>setTimeout(r,200);e.forEach(r=>{let o=()=>n(()=>{try{Te(r)}catch(s){console.error("[hero-shader]",s)}}),i=r.getBoundingClientRect();if(i.top<window.innerHeight&&i.bottom>0){let s=()=>requestAnimationFrame(()=>requestAnimationFrame(o));document.readyState==="complete"?s():window.addEventListener("load",s,{once:!0});return}if(t)return;let a=new IntersectionObserver(([s])=>{s.isIntersecting&&(a.disconnect(),o())},{rootMargin:"300px 0px"});a.observe(r)})}function Me(e){let t=e.getExtension("WEBGL_debug_renderer_info"),n=String(t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER));return/swiftshader|llvmpipe|software|basic render/i.test(n)}function Te(e){var L,_;let t=e.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!t)return;if(Me(t)){(L=t.getExtension("WEBGL_lose_context"))==null||L.loseContext();return}let n=(y,A)=>{var T;let S=t.createShader(y);if(t.shaderSource(S,A),t.compileShader(S),!t.getShaderParameter(S,t.COMPILE_STATUS))throw new Error((T=t.getShaderInfoLog(S))!=null?T:"shader");return S},r=t.createProgram();if(t.attachShader(r,n(t.VERTEX_SHADER,Le)),t.attachShader(r,n(t.FRAGMENT_SHADER,Se)),t.linkProgram(r),!t.getProgramParameter(r,t.LINK_STATUS))throw new Error((_=t.getProgramInfoLog(r))!=null?_:"program");t.useProgram(r),t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW);let o=t.getAttribLocation(r,"p");t.enableVertexAttribArray(o),t.vertexAttribPointer(o,2,t.FLOAT,!1,0,0);let i=t.getUniformLocation(r,"u_res"),a=t.getUniformLocation(r,"u_time"),s=t.getUniformLocation(r,"u_mouse"),c=t.getUniformLocation(r,"u_hover"),p=t.getUniformLocation(r,"u_grain");t.uniform1f(t.getUniformLocation(r,"u_dark"),e.dataset.shaderTheme==="dark"?1:0),t.uniform3fv(t.getUniformLocation(r,"u_c"),new Float32Array(J(e.dataset.shaderPalette)));let v=matchMedia("(prefers-reduced-motion: reduce)").matches,w={x:.3,y:.4,hover:0},E={x:.3,y:.4,hover:0},b=!0,m=0,l=performance.now(),d=25e5,f=1,h=1,u=()=>{let y=Math.max(1,e.clientWidth),A=Math.max(1,e.clientHeight);h=Math.min(window.devicePixelRatio||1,2,Math.sqrt(d/(y*A)))*f;let S=Math.max(1,Math.round(y*h)),T=Math.max(1,Math.round(A*h));(e.width!==S||e.height!==T)&&(e.width=S,e.height=T,t.viewport(0,0,S,T))},g=y=>{u(),E.x+=(w.x-E.x)*.06,E.y+=(w.y-E.y)*.06,E.hover+=(w.hover-E.hover)*.05,t.uniform2f(i,e.width,e.height),t.uniform1f(a,v?12:(y-l)/1e3+12),t.uniform2f(s,E.x,E.y),t.uniform1f(c,E.hover),t.uniform1f(p,1/Math.max(h,.5)),t.drawArrays(t.TRIANGLES,0,3),e.dataset.heroShader="ready"},x=0,M=0,k=0,q=y=>{let A=x?y-x:16;x=y,A>25&&A<250?(M++,k=0):A<18&&(k++,M=Math.max(0,M-1)),M>20&&f>.5&&(f=Math.max(.5,f-.15),M=0),k>600&&f<1&&(f=Math.min(1,f+.15),k=0),g(y),m=b&&!document.hidden?requestAnimationFrame(q):0,m||(x=0)},R=()=>{!m&&!v&&b&&!document.hidden&&(m=requestAnimationFrame(q))};if(v){g(l),new ResizeObserver(()=>g(l)).observe(e);return}window.addEventListener("pointermove",y=>{let A=e.getBoundingClientRect(),S=(y.clientX-A.left)/A.width,T=1-(y.clientY-A.top)/A.height,F=S>=0&&S<=1&&T>=0&&T<=1;w.hover=F?1:0,F&&(w.x=S,w.y=T)},{passive:!0}),document.documentElement.addEventListener("pointerleave",()=>{w.hover=0}),new IntersectionObserver(([y])=>{b=y.isIntersecting,R()}).observe(e),document.addEventListener("visibilitychange",R),m=requestAnimationFrame(q)}function te(){let e=location.pathname.replace(/\/$/,"");document.querySelectorAll("[data-nav-section]").forEach(r=>{(r.dataset.navSection||"").split(/\s+/).map(i=>i.replace(/\/$/,"")).filter(Boolean).some(i=>e===i||e.startsWith(`${i}/`))&&r.setAttribute("aria-current","true")}),Ie(),_e(),Ae();let t=document.querySelector("[data-nav-toggle]");if(!t)return;let n=document.querySelector("[data-mobile-menu]");n?ke(t,n):Be(t)}function Ae(){let e=document.querySelector("[data-nav]");if(!e)return;let t=()=>document.documentElement.style.setProperty("--nav-h",`${Math.round(e.offsetHeight)}px`);new ResizeObserver(t).observe(e),t()}function _e(){let e=document.querySelector("[data-nav-scroll-class]"),t=((e==null?void 0:e.dataset.navScrollClass)||"").split(/\s+/).filter(Boolean);if(!e||!t.length||t.every(a=>e.classList.contains(a)))return;let n=e.hasAttribute("data-nav-scroll-deep")?e.querySelector("nav"):null,r=[e,...n?[n,...n.querySelectorAll("*")]:[]],o=!1,i=()=>{let a=window.scrollY>8;a!==o&&(o=a,r.forEach(s=>t.forEach(c=>s.classList.toggle(c,o))))};window.addEventListener("scroll",i,{passive:!0}),i()}function ke(e,t){let n=document.documentElement,r;t.id||(t.id="mobile-menu"),e.setAttribute("aria-controls",t.id),e.setAttribute("aria-expanded","false"),t.hidden=!0;let o=()=>[...t.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(c=>c.offsetParent!==null),i=()=>e.getAttribute("aria-expanded")==="true",a=()=>{var c,p;window.clearTimeout(r),t.hidden=!1,e.setAttribute("aria-expanded","true"),n.classList.add("is-menu-open"),requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add("is-open"))),(p=(c=t.querySelector("[data-nav-close]"))!=null?c:o()[0])==null||p.focus({preventScroll:!0})},s=(c=!0)=>{if(!i())return;e.setAttribute("aria-expanded","false"),t.classList.remove("is-open"),n.classList.remove("is-menu-open");let p=matchMedia("(prefers-reduced-motion: reduce)").matches;r=window.setTimeout(()=>t.hidden=!0,p?0:320),c&&e.focus({preventScroll:!0})};e.addEventListener("click",()=>i()?s():a()),t.querySelectorAll("[data-nav-close]").forEach(c=>c.addEventListener("click",()=>s())),t.addEventListener("click",c=>{c.target.closest("a[href]")&&s(!1)}),document.addEventListener("keydown",c=>{if(!i()||(c.key==="Escape"&&s(),c.key!=="Tab"))return;let p=o();if(!p.length)return;let v=p[0],w=p[p.length-1];c.shiftKey&&document.activeElement===v?(c.preventDefault(),w.focus()):!c.shiftKey&&document.activeElement===w&&(c.preventDefault(),v.focus())}),matchMedia("(min-width: 992px)").addEventListener("change",c=>{c.matches&&s(!1)})}var He=140,Ce=40,qe=160,Fe=380,Re=".nav-panel-label, .nav-panel-list > *, .nav-panel-more, .nav-panel-card";function Ie(){var i;let t=[...document.querySelectorAll("[data-nav-dropdown][aria-controls]")].map(a=>({button:a,panel:document.getElementById(a.getAttribute("aria-controls")||"")})).filter(a=>!!a.panel);if(!t.length)return;let n=(i=t[0].button.closest("[data-nav]"))!=null?i:document.body,r=n.querySelector("[data-nav-flyout]"),o=r==null?void 0:r.querySelector("[data-nav-flyout-card]");r&&o&&Pe(n,t,r,o)}function Pe(e,t,n,r){let o=matchMedia("(min-width: 992px)"),i=matchMedia("(hover: hover) and (pointer: fine)"),a=matchMedia("(prefers-reduced-motion: reduce)"),s=e.querySelector("[data-nav-curtain]"),c=null,p,v;t.forEach(({panel:u})=>u.querySelectorAll(Re).forEach((g,x)=>g.style.setProperty("--nav-i",String(Math.min(x,14)))));let w=()=>{if(!c)return;let u=r.offsetHeight-r.clientHeight,g=[...c.panel.children].reduce((x,M)=>x+M.scrollHeight,0);r.style.height=`${g+u}px`},E=new ResizeObserver(w),b=(u=!1)=>{if(window.clearTimeout(p),l=!1,!c)return;let{button:g,panel:x}=c;g.setAttribute("aria-expanded","false"),x.classList.remove("is-active"),E.disconnect(),r.style.height="0px",s==null||s.classList.remove("is-visible"),u&&g.focus({preventScroll:!0}),c=null,v=window.setTimeout(()=>{c||(n.classList.remove("is-open"),s==null||s.classList.remove("is-open"))},a.matches?0:Fe)},m=u=>{window.clearTimeout(p),l=!1,window.clearTimeout(v),c!==u&&(c?(c.button.setAttribute("aria-expanded","false"),c.panel.classList.remove("is-active"),E.disconnect()):(n.classList.add("is-open"),s==null||s.classList.add("is-open"),r.offsetWidth,s==null||s.classList.add("is-visible")),c=u,u.button.setAttribute("aria-expanded","true"),u.panel.classList.add("is-active"),[...u.panel.children].forEach(g=>E.observe(g)),w())},l=!1,d=(u,g)=>{window.clearTimeout(p),l=!1,p=window.setTimeout(u,g)},f=()=>{!h()||!c||l||(d(()=>b(),qe),l=!0)},h=()=>i.matches&&o.matches;t.forEach(u=>{let{button:g,panel:x}=u;g.setAttribute("aria-expanded","false"),g.addEventListener("click",()=>c===u?b():m(u)),g.addEventListener("mouseenter",()=>{if(!h()||c===u){window.clearTimeout(p),l=!1;return}d(()=>m(u),c?Ce:He)}),g.addEventListener("mouseleave",()=>{h()&&!c&&window.clearTimeout(p)}),x.addEventListener("click",M=>{M.target.closest("a[href]")&&b()})}),n.addEventListener("mouseenter",()=>{!h()||!c||(window.clearTimeout(p),l=!1)}),e.querySelectorAll("a[href], button").forEach(u=>{t.some(g=>g.button===u)||n.contains(u)||u.closest("[data-mobile-menu]")||u.addEventListener("mouseenter",f)}),s==null||s.addEventListener("mousemove",f),s==null||s.addEventListener("click",()=>b()),e.addEventListener("mouseleave",f),document.addEventListener("keydown",u=>{u.key==="Escape"&&c&&b(!0)}),document.addEventListener("click",u=>{c&&!e.contains(u.target)&&b()}),e.addEventListener("focusout",u=>{c&&!e.contains(u.relatedTarget)&&b()}),o.addEventListener("change",u=>{u.matches||b()})}function Be(e){let t=e.closest("nav"),n=document.querySelector("[data-nav-menu]");if(!t||!n)return;let r=o=>{t.classList.toggle("is-open",o),e.setAttribute("aria-expanded",String(o))};e.addEventListener("click",()=>r(e.getAttribute("aria-expanded")!=="true")),n.addEventListener("click",o=>{o.target.closest("a")&&r(!1)}),document.addEventListener("keydown",o=>{o.key==="Escape"&&t.classList.contains("is-open")&&(r(!1),e.focus())}),matchMedia("(min-width: 992px)").addEventListener("change",o=>{o.matches&&r(!1)})}var Oe="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",Ne=`
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
}`,$e=`
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
}`,De={glow:{frag:Ne,budget:3e6,density:e=>Math.min(e,2)},ember:{frag:$e,budget:5e5,density:()=>.5}};function ze(e){let t=e.getExtension("WEBGL_debug_renderer_info"),n=String(t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER));return/swiftshader|llvmpipe|software|basic render/i.test(n)}function Ue(e,t){var k,q,R,L,_,y,A,S,T,F;let n=e.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!n)return null;if(ze(n))return(k=n.getExtension("WEBGL_lose_context"))==null||k.loseContext(),null;let r=(H,N)=>{var P;let I=n.createShader(H);if(n.shaderSource(I,N),n.compileShader(I),!n.getShaderParameter(I,n.COMPILE_STATUS))throw new Error((P=n.getShaderInfoLog(I))!=null?P:"shader");return I},o=n.createProgram();if(n.attachShader(o,r(n.VERTEX_SHADER,Oe)),n.attachShader(o,r(n.FRAGMENT_SHADER,t.frag)),n.linkProgram(o),!n.getProgramParameter(o,n.LINK_STATUS))throw new Error((q=n.getProgramInfoLog(o))!=null?q:"program");n.useProgram(o),n.bindBuffer(n.ARRAY_BUFFER,n.createBuffer()),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),n.STATIC_DRAW);let i=n.getAttribLocation(o,"p");n.enableVertexAttribArray(i),n.vertexAttribPointer(i,2,n.FLOAT,!1,0,0);let a=H=>n.getUniformLocation(o,H),s={res:a("u_res"),time:a("u_time"),px:a("u_px"),em:a("u_em"),peak:a("u_peak"),column:a("u_column"),span:a("u_span"),base:a("u_base"),strength:a("u_strength")},c=Number((R=e.dataset.glowPeak)!=null?R:.5),p=Number((L=e.dataset.glowColumn)!=null?L:4.2),v=Number((_=e.dataset.glowSpan)!=null?_:18.3),w=Number((y=e.dataset.glowStrength)!=null?y:.7),E=(T=(S=/^#?([0-9a-f]{6})$/i.exec((A=e.dataset.glowBase)!=null?A:""))==null?void 0:S[1])!=null?T:"200f09",b=[0,2,4].map(H=>parseInt(E.slice(H,H+2),16)/255),m=Number((F=e.dataset.shaderSpeed)!=null?F:1)||1,l=performance.now(),d=0,f=0,h=!1,u=!1,g=H=>{let N=Math.max(1,e.clientWidth),I=Math.max(1,e.clientHeight),P=Math.min(t.density(window.devicePixelRatio||1),Math.sqrt(t.budget/(N*I))),$=Math.max(1,Math.round(N*P)),D=Math.max(1,Math.round(I*P));(e.width!==$||e.height!==D)&&(e.width=$,e.height=D,n.viewport(0,0,$,D)),n.uniform2f(s.res,$,D),n.uniform1f(s.time,(H-l)/1e3*m),n.uniform1f(s.px,P),n.uniform1f(s.em,parseFloat(getComputedStyle(e).fontSize)||16),n.uniform1f(s.peak,c),n.uniform1f(s.column,p),n.uniform1f(s.span,v),n.uniform3f(s.base,b[0],b[1],b[2]),n.uniform1f(s.strength,w),n.drawArrays(n.TRIANGLES,0,3),e.dataset.ready=""},x=H=>{H-f>=30&&(f=H,g(H)),d=h&&!u&&!document.hidden?requestAnimationFrame(x):0},M=()=>{!d&&h&&!u&&!document.hidden&&(d=requestAnimationFrame(x))};return e.addEventListener("webglcontextlost",H=>{H.preventDefault(),u=!0,delete e.dataset.ready}),document.addEventListener("visibilitychange",M),{show(H){h=H,M()}}}function ne(){var i;let e=document.querySelectorAll("canvas[data-panel-shader]");if(!e.length||((i=navigator.connection)==null?void 0:i.saveData)||matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches)return;let n="requestIdleCallback"in window?a=>requestIdleCallback(a,{timeout:1e3}):a=>setTimeout(a,200),r=new Map,o=new IntersectionObserver(a=>{a.forEach(s=>{let c=s.target,p=r.get(c);if(p){p.show(s.isIntersecting);return}p===null||!s.isIntersecting||(r.set(c,null),n(()=>{var w;let v=De[(w=c.dataset.panelShader)!=null?w:""];if(v)try{let E=Ue(c,v);r.set(c,E);let b=c.getBoundingClientRect();E==null||E.show(b.bottom>-200&&b.top<window.innerHeight+200)}catch(E){console.error("[panel-shader]",E)}}))})},{rootMargin:"200px 0px"});e.forEach(a=>o.observe(a))}function Ge(){document.querySelectorAll("[data-units-filled][data-units-total]").forEach(e=>{if(e.children.length)return;let t=Math.round(Number(e.dataset.unitsTotal)),n=Math.round(Number(e.dataset.unitsFilled));if(!Number.isFinite(t)||!Number.isFinite(n)||t<=0||t>200||n<0)return;let r=e.dataset.unitsTone==="light",o=document.createDocumentFragment();for(let i=0;i<t;i++){let a=document.createElement("span");a.className=i<n?"cs-unit is-filled":r?"cs-unit is-on-light":"cs-unit",o.appendChild(a)}e.appendChild(o),e.hasAttribute("role")||e.setAttribute("role","img"),e.hasAttribute("aria-label")||e.setAttribute("aria-label",`${Math.min(n,t)} of ${t}`)})}function We(){let e=[...document.querySelectorAll("[data-bar-ratio]")];if(!e.length)return;let t=o=>{let i=Number(o.dataset.barRatio);return Number.isFinite(i)&&i>0&&i<=100?`${i}%`:""},r=!matchMedia("(prefers-reduced-motion: reduce)").matches&&"IntersectionObserver"in window?new IntersectionObserver(o=>{o.forEach(i=>{if(!i.isIntersecting)return;r.unobserve(i.target);let a=i.target.querySelector("[data-bar-ratio]");if(!a)return;let s=a.closest("[data-bars], .cs-bars"),c=s?[...s.querySelectorAll("[data-bar-ratio]")].indexOf(a):0;setTimeout(()=>a.style.width=t(a),Math.max(0,c)*160)})},{threshold:.4}):null;e.forEach(o=>{var s;let i=o.getBoundingClientRect(),a=i.top<innerHeight&&i.bottom>0;if(!r||a||!t(o)){t(o)&&(o.style.width=t(o));return}o.style.transition="none",o.style.width="0%",o.offsetWidth,o.style.transition="",r.observe((s=o.parentElement)!=null?s:o)})}function re(){Ge(),We()}function oe(){let e=document.querySelectorAll("[data-card-cursor]");if(!e.length||!matchMedia("(hover: hover) and (pointer: fine)").matches)return;let t=matchMedia("(prefers-reduced-motion: reduce)");e.forEach(n=>{let r=n.parentElement;if(!r)return;let o=0,i=0,a=0,s=0,c=1,p=1,v=0,w=!1,E=l=>{let d=r.getBoundingClientRect(),f=n.offsetWidth,h=n.offsetHeight,u=l.clientX-d.left,g=l.clientY-d.top;c===1&&u+14+f>d.width-8?c=-1:c===-1&&u-14-f<8&&(c=1),p===1&&g+14+h>d.height-8?p=-1:p===-1&&g-14-h<8&&(p=1),o=c===1?u+14:u-14-f,i=p===1?g+14:g-14-h,o=Math.max(8,Math.min(o,d.width-f-8)),i=Math.max(8,Math.min(i,d.height-h-8))},b=()=>{let l=t.matches?1:.2;a+=(o-a)*l,s+=(i-s)*l,n.style.transform=`translate3d(${a.toFixed(1)}px, ${s.toFixed(1)}px, 0)`,w||Math.abs(o-a)>.3||Math.abs(i-s)>.3?v=requestAnimationFrame(b):v=0},m=()=>{v||(v=requestAnimationFrame(b))};r.addEventListener("pointerenter",l=>{c=1,p=1,E(l),a=o,s=i,w=!0,n.classList.add("is-visible"),m()}),r.addEventListener("pointermove",l=>{E(l),m()}),r.addEventListener("pointerleave",()=>{w=!1,n.classList.remove("is-visible")})})}var je="https://js.hsforms.net/forms/embed/v2.js",Ve="https://cdn.prod.website-files.com/6ac957e7969f378f0b1984fd/6acd89fa4b3d7d6833b589f1_caret-down-muted.svg",Ye='<svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"/></svg>',B=null;function Ke(){return B!=null||(B=new Promise((e,t)=>{let n=document.createElement("script");n.src=je,n.async=!0,n.onload=()=>e(),n.onerror=()=>t(new Error("HubSpot embed script failed to load")),document.head.appendChild(n)})),B}var Xe=`
html{-webkit-text-size-adjust:100%}
body{margin:0;background:transparent;color:#200f09;font-family:Inter,sans-serif;font-size:1rem;line-height:1.56;letter-spacing:-.01em;-webkit-font-smoothing:antialiased}
.hs-form{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:.75rem;row-gap:1rem;max-width:none!important;margin:0}
.hs-form fieldset{grid-column:1/-1;display:grid;grid-template-columns:minmax(0,1fr);gap:.75rem;max-width:none!important;margin:0!important;padding:0;border:0;min-width:0}
.hs-form fieldset.form-columns-2{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
.hs-form fieldset:has(.hs_website),.hs-form fieldset:has(.hs_seo_budget){grid-column:auto}
.hs-form fieldset:has(.hs_lead_agency){display:none}
.hs-form .hs-form-field{width:auto!important;float:none!important;padding:0!important;margin:0!important;position:relative}
.hs-form .input{margin:0!important}
.hs-form .hs-form-field>label,.hs-form .hs-field-desc,.hs-form .hs-form-required,.hs_recaptcha{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.hs-form .hs_message>label{position:static!important;width:auto;height:auto;overflow:visible;clip:auto;white-space:normal;display:block;margin:0 0 .625rem;font-size:.8125rem;font-weight:500;line-height:1.3;letter-spacing:0;color:rgba(32,15,9,.8)}
.hs-input{box-sizing:border-box;display:block;width:100%!important;height:3.25rem;margin:0;padding:0 1rem 0 1.125rem;border:1px solid #f7f3f3;border-radius:.703rem;background-color:#f7f3f3;color:#200f09;font:inherit;font-size:.9375rem;line-height:1.56;letter-spacing:-.02em;outline:none;-webkit-appearance:none;appearance:none;transition:border-color .2s,background-color .2s}
.hs-input:hover{border-color:rgba(32,15,9,.08)}
.hs-input:focus{border-color:#f84c1c;background-color:#fff}
.hs-input::placeholder{color:rgba(32,15,9,.64);opacity:1}
select.hs-input{padding-right:2.625rem;background-image:url("${Ve}");background-repeat:no-repeat;background-position:right 1rem center;background-size:1rem auto;cursor:pointer}
select.hs-input.is-placeholder{color:rgba(32,15,9,.64)}
textarea.hs-input{height:6.875rem;min-height:6.875rem;padding-top:1rem;padding-bottom:1rem;resize:vertical}
.hs-input.invalid.error{border-color:#d93a0f}
.hs-error-msgs{list-style:none;margin:.375rem 0 0;padding:0}
.hs-error-msg,.hs-main-font-element{font-size:.8125rem;line-height:1.3;font-weight:400;color:#b8320c}
.hs_error_rollup{grid-column:1/-1}
.hs_submit{grid-column:1/-1}
.hs_submit .actions{display:flex;flex-wrap:wrap;align-items:center;gap:.75rem 1rem;margin:0;padding:.5rem 0 0}
.hs_submit input.hs-button{display:none}
.seo-submit{display:inline-flex;align-items:center;justify-content:center;gap:1rem;height:3rem;margin:0;padding:1px .5rem 1px 1.375rem;border:0;border-radius:.75rem;background-color:#f84c1c;color:#fff;font:inherit;font-size:1rem;font-weight:500;line-height:1;letter-spacing:-.03em;cursor:pointer;transition:background-color .2s,box-shadow .2s}
.seo-submit:hover{background-color:#e03f12}
.seo-submit:focus-visible{outline:2px solid #f84c1c;outline-offset:3px}
.seo-submit:disabled{opacity:.4;cursor:default}
.seo-submit-chip{box-sizing:border-box;display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border:1px solid rgba(255,255,255,.24);border-radius:.5625rem;background-color:rgba(255,255,255,.18)}
.seo-submit-chip svg{width:1rem;height:1rem;display:block}
.seo-note{font-size:.8125rem;line-height:1.3;color:rgba(32,15,9,.64)}
.seo-recaptcha{grid-column:1/-1;margin:0;font-size:.6875rem;line-height:1.4;color:rgba(32,15,9,.48)}
.seo-recaptcha a{color:inherit}
.grecaptcha-badge{visibility:hidden;box-shadow:none}
.submitted-message{font-size:1rem;line-height:1.5;padding:1.25rem 1.5rem;border-radius:.75rem;background-color:#f7f3f3;color:#200f09}
@media (max-width:400px){.hs-form,.hs-form fieldset.form-columns-2{grid-template-columns:minmax(0,1fr)}.hs-form fieldset:has(.hs_website),.hs-form fieldset:has(.hs_seo_budget){grid-column:1/-1}}
`;function Ze(){let e=[];for(let t of Array.from(document.styleSheets)){let n;try{n=t.cssRules}catch{continue}for(let r of Array.from(n))r instanceof CSSFontFaceRule&&/inter/i.test(r.style.getPropertyValue("font-family"))&&e.push(r.cssText)}return e.join(`
`)}function Qe(e){var r,o,i;let t=e.querySelector("label"),n=t==null?void 0:t.querySelector("span");return(i=(o=(r=n!=null?n:t)==null?void 0:r.textContent)==null?void 0:o.trim())!=null?i:""}var Je=e=>e.replace(/\{([^{}]*)\}/g,(t,n)=>`{${n.split(";").filter(r=>r.trim()).map(r=>/!important/.test(r)||!r.includes(":")?r:`${r}!important`).join(";")}}`);function ie(e,t){var a;let n=e.ownerDocument,r=(a=n.querySelector("form.hs-form"))!=null?a:e;r.querySelectorAll(".hs-form-field").forEach(s=>{let c=Qe(s);if(!c)return;let p=s.querySelector('input.hs-input:not([type="hidden"]), textarea.hs-input');p&&!s.classList.contains("hs_message")&&p.placeholder!==c&&(p.placeholder=c);let v=s.querySelector('select.hs-input option[value=""]');v&&v.textContent!==c&&(v.textContent=c)});let o=r.querySelector(".hs_submit .actions"),i=o==null?void 0:o.querySelector('input[type="submit"]');if(o&&i&&!o.querySelector(".seo-submit")){let s=n.createElement("button");s.type="button",s.className="seo-submit",s.innerHTML=`<span></span><span class="seo-submit-chip">${Ye}</span>`,s.firstElementChild.textContent=i.value,s.addEventListener("click",()=>i.click()),o.insertBefore(s,i)}if(o&&t.dataset.note&&!o.querySelector(".seo-note")){let s=n.createElement("span");s.className="seo-note",s.textContent=t.dataset.note,o.appendChild(s)}if(r.querySelector(".hs_recaptcha")&&!r.querySelector(".seo-recaptcha")){let s=n.createElement("p");s.className="seo-recaptcha",s.innerHTML='Protected by reCAPTCHA. The Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener">Terms of Service</a> apply.',r.appendChild(s)}}function et(e,t){var s;let n=e.ownerDocument,r=(s=n.defaultView)==null?void 0:s.frameElement,o=n.createElement("style");o.textContent=Ze()+Je(Xe),n.body.appendChild(o);let i=()=>{n.documentElement.style.fontSize=getComputedStyle(t).fontSize};i(),addEventListener("resize",i),ie(e,t);let a=0;if(new MutationObserver(()=>{a||(a=requestAnimationFrame(()=>{a=0,ie(e,t)}))}).observe(n.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["placeholder"]}),r&&"ResizeObserver"in window){let c=()=>{r.style.height=`${Math.ceil(n.documentElement.scrollHeight)}px`};new ResizeObserver(c).observe(n.body),c()}t.classList.add("is-ready")}function ae(e,t){let{portalId:n,formId:r,region:o="na1"}=e.dataset;!n||!r||(e.id||(e.id=`hubspot-form-${t}`),Ke().then(()=>{var i;(i=window.hbspt)==null||i.forms.create({portalId:n,formId:r,region:o,target:`#${e.id}`,onFormReady:a=>{let s=a instanceof HTMLElement?a:a[0];s&&et(s,e)}})}).catch(i=>console.error("[hubspot-form]",i)))}function se(){let e=Array.from(document.querySelectorAll("[data-hubspot-form]"));if(!e.length)return;if(!("IntersectionObserver"in window)){e.forEach(ae);return}let t=new IntersectionObserver(n=>{n.forEach(r=>{r.isIntersecting&&(t.unobserve(r.target),ae(r.target,e.indexOf(r.target)))})},{rootMargin:"800px 0px"});e.forEach(n=>t.observe(n))}function ce(){let e=document.querySelectorAll("[data-marquee]");!e.length||matchMedia("(prefers-reduced-motion: reduce)").matches||e.forEach(t=>{let n=Array.from(t.children);if(n.length<2)return;n.forEach(a=>{let s=a.cloneNode(!0);s.setAttribute("aria-hidden","true"),s.setAttribute("data-marquee-clone",""),s.removeAttribute("id"),s.querySelectorAll("[id]").forEach(c=>c.removeAttribute("id")),s.querySelectorAll("a, button, input, select, textarea, [tabindex]").forEach(c=>c.setAttribute("tabindex","-1")),t.appendChild(s)});let r=Number(t.dataset.marqueeSpeed)||40,o=t.children[n.length],i=()=>{let a=o.offsetLeft-n[0].offsetLeft;a<=0||(t.style.setProperty("--marquee-distance",`${-a}px`),t.style.setProperty("--marquee-duration",`${(a/r).toFixed(2)}s`))};i(),new ResizeObserver(i).observe(t),t.classList.add("is-marquee"),"IntersectionObserver"in window&&new IntersectionObserver(([a])=>{t.classList.toggle("is-marquee-paused",!a.isIntersecting)}).observe(t)})}function le(){let e=document.querySelectorAll("[data-parallax]");if(!e.length||matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver"in window))return;let t=new Set,n=0,r=()=>{n=0,t.forEach(a=>{var p;let s=((p=a.parentElement)!=null?p:a).getBoundingClientRect(),c=Math.max(-1,Math.min(1,(innerHeight/2-(s.top+s.height/2))/((innerHeight+s.height)/2)));a.style.transform=`translate3d(0, ${(c*.08*100).toFixed(2)}%, 0)`})},o=()=>{n||(n=requestAnimationFrame(r))},i=new IntersectionObserver(a=>{a.forEach(s=>{let c=s.target;s.isIntersecting?t.add(c):t.delete(c)}),o()});e.forEach(a=>i.observe(a)),addEventListener("scroll",o,{passive:!0}),addEventListener("resize",o)}var me,O=typeof document!="undefined"?(me=document.currentScript)==null?void 0:me.src:void 0;function U(e,t){let n=new URL(e);return n.pathname=n.pathname.replace(/index\.js$/,t),n.href}var z;function tt(){return z||(z=new Promise((e,t)=>{if(window.wfcMapLibre){e(window.wfcMapLibre);return}if(!O||!/index\.js(\?|$)/.test(O)){t(new Error("rank-map: index.js URL unknown, MapLibre not loaded"));return}let n=document.createElement("link");n.rel="stylesheet",n.href=U(O,"maplibre.css");let r=new Promise(i=>{n.onload=n.onerror=()=>i()});document.head.appendChild(n);let o=document.createElement("script");o.src=U(O,"maplibre.js"),o.dataset.wfcMaplibre="",o.onload=()=>{let i=window.wfcMapLibre;if(!i){t(new Error("rank-map: maplibre.js loaded without MapLibre"));return}i.setWorkerUrl(U(O,"maplibre-worker.js")),r.then(()=>e(i))},o.onerror=()=>t(new Error(`rank-map: could not load ${o.src}`)),document.head.appendChild(o)}),z)}var de=5,nt=90,rt="https://tiles.openfreemap.org/styles/positron",ot=e=>e<=3?"is-top":e<=10?"is-mid":"is-low";function ue(e){it(e).catch(t=>console.error("[wfc] rank-map failed",t))}function fe(){let e=document.querySelectorAll("[data-rank-map]");if(!e.length)return;if(!("IntersectionObserver"in window)){e.forEach(ue);return}let t=new IntersectionObserver(n=>{n.forEach(r=>{r.isIntersecting&&(t.unobserve(r.target),ue(r.target))})},{rootMargin:"600px 0px"});e.forEach(n=>t.observe(n))}async function it(e){var R;let t=L=>(L!=null?L:"").split(",").map(_=>Number(_.trim())).filter(_=>_>0),n={before:t(e.dataset.ranksBefore),after:t(e.dataset.ranksAfter)},r=Number(e.dataset.lat),o=Number(e.dataset.lng),i=Number(e.dataset.spacing)||600,a=e.querySelector("[data-rank-canvas]");if(!a||!r||!o||n.before.length!==25||n.after.length!==25)return;let s=await tt(),c=matchMedia("(prefers-reduced-motion: reduce)").matches,p=i/111320,v=i/(111320*Math.cos(r*Math.PI/180)),w=2.6,E=[[o-w*v,r-w*p],[o+w*v,r+w*p]],b=new s.Map({container:a,style:rt,bounds:E,fitBoundsOptions:{padding:24},cooperativeGestures:!0,attributionControl:{compact:!0},dragRotate:!1,pitchWithRotate:!1,touchPitch:!1});b.touchZoomRotate.disableRotation(),b.addControl(new s.NavigationControl({showCompass:!1}),"top-right");let m=document.createElement("div");m.className="maplibregl-ctrl maplibregl-ctrl-group",m.innerHTML='<button class="cs-map-recentre" type="button" aria-label="Back to the scan centre" title="Back to the scan centre"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="2.25" fill="currentColor" stroke="none"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3"/></svg></button>',m.firstElementChild.addEventListener("click",()=>b.fitBounds(E,{padding:24,duration:c?0:900})),b.addControl({onAdd:()=>m,onRemove:()=>m.remove()},"top-right");let l=()=>{let L=b.getCenter(),_=Math.abs(L.lat-r)>p*.5||Math.abs(L.lng-o)>v*.5||b.getZoom()>d+.3;m.classList.toggle("is-away",_)},d=0;b.once("load",()=>{d=b.getZoom()}),b.on("moveend",l);let f=document.createElement("div");f.className="cs-rank-centre",f.setAttribute("aria-hidden","true"),f.innerHTML='<svg viewBox="0 0 24 32" width="24" height="32"><path d="M12 31C12 31 2 19.5 2 12a10 10 0 0 1 20 0c0 7.5-10 19-10 19Z" fill="#200f09" stroke="#fff" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="#f84c1c"/></svg><span class="cs-rank-centre-label">Scan centre</span>',new s.Marker({element:f,anchor:"bottom",offset:[0,-18]}).setLngLat([o,r]).addTo(b);let h=n.before.map((L,_)=>{let y=Math.floor(_/de),A=_%de,S=n.after[_],T=document.createElement("button");T.type="button",T.className="cs-rank-pin";let F=L===S?"no change":L>S?`up ${L-S}`:`down ${S-L}`;return T.setAttribute("aria-label",`Location ${"ABCDE"[y]}${A+1}: position ${L} before, ${S} after (${F})`),T.innerHTML=`<span class="cs-rank-num" aria-hidden="true"></span><span class="cs-rank-tip" aria-hidden="true">#${L} \u2192 #${S}<small>${L>S?`\u25B2 ${L-S} places`:L===S?"No change":`\u25BC ${S-L} places`}</small></span>`,new s.Marker({element:T}).setLngLat([o+(A-2)*v,r-(y-2)*p]).addTo(b),{el:T,num:T.firstElementChild,delay:Math.hypot(y-2,A-2)*nt}}),u=(R=e.closest("section"))!=null?R:document,g=[...e.querySelectorAll("[data-rank-show]")],x=[...u.querySelectorAll("[data-rank-count]")],M="before",k=(L,_)=>{M=L,g.forEach(y=>y.setAttribute("aria-pressed",String(y.dataset.rankShow===L))),x.forEach(y=>y.classList.toggle("is-active",y.dataset.rankCount===L)),h.forEach(({el:y,num:A,delay:S},T)=>{let F=()=>{let H=n[L][T];A.textContent=String(H),y.classList.remove("is-top","is-mid","is-low"),y.classList.add(ot(H)),_&&(y.classList.remove("is-flip"),y.offsetWidth,y.classList.add("is-flip"))};_&&!c?setTimeout(F,S):F()})};if(k("before",!1),g.forEach(L=>L.addEventListener("click",()=>{let _=L.dataset.rankShow;_!==M&&k(_,!0)})),e.classList.add("is-ready"),c)return;let q=new IntersectionObserver(([L])=>{L.isIntersecting&&(q.disconnect(),setTimeout(()=>{M==="before"&&k("after",!0)},700))},{threshold:.55});q.observe(e)}var he={linkedin:e=>`https://www.linkedin.com/sharing/share-offsite/?url=${e}`,x:(e,t)=>`https://twitter.com/intent/tweet?url=${e}&text=${t}`,facebook:e=>`https://www.facebook.com/sharer/sharer.php?u=${e}`};function pe(){let e=document.querySelectorAll("[data-share]");if(!e.length)return;let t=encodeURIComponent(location.origin+location.pathname),n=encodeURIComponent(document.title);e.forEach(r=>{let o=r.dataset.share||"";if(he[o]&&r instanceof HTMLAnchorElement){r.href=he[o](t,n),r.target="_blank",r.rel="noopener";return}o==="copy"&&r.addEventListener("click",async i=>{i.preventDefault();try{await navigator.clipboard.writeText(location.origin+location.pathname)}catch{return}let a=r.getAttribute("aria-label")||"";r.setAttribute("aria-label","Link copied"),r.classList.add("is-copied"),setTimeout(()=>{r.setAttribute("aria-label",a),r.classList.remove("is-copied")},2e3)})})}function ge(){document.querySelectorAll("[data-slider]").forEach(e=>{let t=e.querySelector("[data-slider-track]"),n=Array.from(e.querySelectorAll("[data-slider-item]"));if(!t||!n.length)return;let r=e.querySelector("[data-slider-prev]"),o=e.querySelector("[data-slider-next]"),i=e.querySelector("[data-slider-current]"),a=e.querySelector("[data-slider-total]"),s=e.querySelector("[data-slider-progress]"),c=h=>String(h).padStart(2,"0"),p=()=>(n.length>1?n[1].offsetLeft-n[0].offsetLeft:t.clientWidth)||1,v=()=>Math.min(n.length,Math.max(1,Math.round(t.clientWidth/p()))),w=()=>n.length-v()+1,E=()=>{let h=w()-1;return t.scrollLeft+t.clientWidth>=t.scrollWidth-2?h:Math.min(h,Math.max(0,Math.round(t.scrollLeft/p())))},b=()=>{let h=E(),u=w();i&&(i.textContent=c(h+1)),a&&(a.textContent=c(u)),s&&(s.style.transform=`scaleX(${(h+v())/n.length})`),r&&(r.disabled=h===0),o&&(o.disabled=h===u-1)},m=()=>matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",l=h=>t.scrollBy({left:h*p(),behavior:m()});r==null||r.addEventListener("click",()=>l(-1)),o==null||o.addEventListener("click",()=>l(1)),t.addEventListener("keydown",h=>{if(h.target!==t)return;let g={ArrowLeft:()=>l(-1),ArrowRight:()=>l(1),Home:()=>t.scrollTo({left:0,behavior:m()}),End:()=>t.scrollTo({left:t.scrollWidth,behavior:m()})}[h.key];g&&(h.preventDefault(),g())});let d=!1,f=()=>{d||(d=!0,requestAnimationFrame(()=>{d=!1,b()}))};t.addEventListener("scroll",f,{passive:!0}),window.addEventListener("resize",f,{passive:!0}),b()})}function be(){document.querySelectorAll("[data-tabs]").forEach(e=>{let t=Array.from(e.querySelectorAll("[data-tabs-tab]"));if(!t.length)return;let n=t[0].closest('[role="tablist"], [role="list"]');n&&e.contains(n)&&(n.setAttribute("role","tablist"),t.forEach(m=>{for(let l=m.parentElement;l&&l!==n;l=l.parentElement)l.getAttribute("role")==="listitem"&&l.setAttribute("role","presentation")}));let r=Array.from(e.querySelectorAll("[data-tabs-panel]")),o=e.id||`tabs-${Array.from(document.querySelectorAll("[data-tabs]")).indexOf(e)+1}`,i=t.map((m,l)=>{var f,h,u;let d=(u=(h=document.getElementById((f=m.getAttribute("aria-controls"))!=null?f:""))!=null?h:r[l])!=null?u:null;if(d){m.id||(m.id=`${o}-tab-${l+1}`),d.id||(d.id=`${o}-panel-${l+1}`),m.setAttribute("aria-controls",d.id),d.setAttribute("role","tabpanel"),d.setAttribute("aria-labelledby",m.id);for(let g=d.parentElement;g&&g!==e;g=g.parentElement){let x=g.getAttribute("role");(x==="list"||x==="listitem")&&g.setAttribute("role","presentation")}}return m.setAttribute("role","tab"),m.querySelectorAll("[data-tabs-number]").forEach(g=>{g.textContent=String(l+1).padStart(2,"0")}),d==null||d.querySelectorAll("[data-tabs-step]").forEach(g=>{g.textContent=String(l+1)}),d}),a=Math.max(0,t.findIndex(m=>m.getAttribute("aria-selected")==="true"));t.forEach((m,l)=>{let d=l===a;m.classList.toggle("is-active",d),m.setAttribute("aria-selected",String(d)),m.tabIndex=d?0:-1,i[l]&&(i[l].hidden=!d)});let s=matchMedia("(prefers-reduced-motion: reduce)").matches,c=0,p=()=>{window.clearTimeout(c),c=0,i.forEach((m,l)=>{if(!m)return;m.classList.remove("is-entering","is-leaving"),m.hidden=l!==a;let d=m.querySelector("[data-tabs-box]");d&&(d.style.height=d.style.overflow=d.style.transition="")})},v=(m,l=!1)=>{var g;let d=i[a],f=i[m],h=!s&&m!==a&&!!d&&!!f;p();let u=h?(g=d.querySelector("[data-tabs-box]"))==null?void 0:g.offsetHeight:void 0;if(a=m,t.forEach((x,M)=>{let k=M===m;x.classList.toggle("is-active",k),x.setAttribute("aria-selected",String(k)),x.tabIndex=k?0:-1;let q=i[M];q&&(q.hidden=!k)}),h){d.hidden=!1,d.classList.add("is-leaving"),f.classList.add("is-entering");let x=f.querySelector("[data-tabs-box]");if(x&&u){let M=x.offsetHeight;x.style.overflow="hidden",x.style.height=`${u}px`,x.getBoundingClientRect(),x.style.transition=`height ${700*.7}ms cubic-bezier(0.4, 0, 0.2, 1)`,x.style.height=`${M}px`}c=window.setTimeout(p,700)}l&&t[m].focus()},w=Number(e.dataset.tabsAuto),E=w>0&&t.length>1&&!!e.querySelector("[data-tabs-progress]")&&!s,b=()=>{};if(E){let m=!1,l=!1,d=!1,f=()=>{l?e.dataset.tabsRunning="stopped":m&&!document.hidden?e.dataset.tabsRunning="true":delete e.dataset.tabsRunning};b=()=>{l=!0,f()},e.style.setProperty("--tabs-auto",`${w}s`),e.addEventListener("animationend",h=>{h.target.matches("[data-tabs-progress]")&&v((a+1)%t.length)}),new IntersectionObserver(h=>{m=h[h.length-1].isIntersecting,m||(l=!1),m&&!d&&(d=!0,i.forEach(u=>u==null?void 0:u.querySelectorAll('img[loading="lazy"]').forEach(g=>{new Image().src=g.currentSrc||g.src}))),f()},{threshold:.25}).observe(e),document.addEventListener("visibilitychange",f)}t.forEach((m,l)=>{m.addEventListener("click",()=>{b(),v(l)}),m.addEventListener("keydown",d=>{let f=t.length-1,h=d.key==="ArrowDown"||d.key==="ArrowRight"?l===f?0:l+1:d.key==="ArrowUp"||d.key==="ArrowLeft"?l===0?f:l-1:d.key==="Home"?0:d.key==="End"?f:-1;h<0||(d.preventDefault(),b(),v(h,!0))})})})}function C(e,t){try{t()}catch(n){console.error(`[wfc] ${e} failed to initialize`,n)}}function ve(){document.documentElement.classList.remove("is-loading"),C("environment-switcher",j),C("nav",te),C("faq",V),C("hero-shader",ee),C("tabs",be),C("slider",ge),C("panel-shader",ne),C("charts",G),C("count-up",W),C("share",pe),C("filter-all",Y),C("case-visuals",re),C("card-cursor",oe),C("parallax",le),C("rank-map",fe),C("marquee",ce),C("hubspot-form",se),C("finsweet-loader",Z)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ve,{once:!0}):ve();})();
