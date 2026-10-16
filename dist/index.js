"use strict";(()=>{function G(){let e=document.querySelectorAll("[data-chart]");if(!e.length||!("IntersectionObserver"in window)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let t=new Map,n=new IntersectionObserver(o=>{o.forEach(r=>{var i;r.isIntersecting&&(n.unobserve(r.target),(i=t.get(r.target))==null||i.forEach(a=>{a.dataset.chart==="columns"&&a.querySelectorAll("rect").forEach((s,c)=>{s.style.transitionDelay=`${c*90}ms`}),a.dataset.inView=""}))})},{threshold:.5});e.forEach(o=>{var i;let r=o.parentElement;r&&(o.dataset.chartArmed="",t.set(r,[...(i=t.get(r))!=null?i:[],o]),n.observe(r))})}function pe(){document.querySelectorAll("[data-count-text]").forEach(e=>{var c;let t=(c=e.textContent)!=null?c:"",n=t.match(/\d[\d,]*(?:\.\d+)?/);if(!n||n.index===void 0||/\d\s*[–-]\s*\d/.test(t))return;let o=e.getBoundingClientRect();if(o.top<innerHeight&&o.bottom>0)return;let r=n[0].replace(/,/g,""),i=document.createElement("span");i.className="sr-only",i.textContent=t;let a=document.createElement("span");a.setAttribute("aria-hidden","true");let s=document.createElement("span");s.dataset.count=r,s.textContent="0",a.append(t.slice(0,n.index),s,t.slice(n.index+n[0].length)),e.replaceChildren(i,a)})}function W(){pe();let e=document.querySelectorAll("[data-count]");if(!e.length)return;let t=(i,a)=>i.toLocaleString("en-CA",{minimumFractionDigits:a,maximumFractionDigits:a}),n=i=>{var s,c;let a=(s=i.dataset.count)!=null?s:"0";return{to:Number(a)||0,decimals:((c=a.split(".")[1])!=null?c:"").length}};if(matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver"in window)){e.forEach(i=>{let{to:a,decimals:s}=n(i);i.textContent=t(a,s)});return}let o=i=>{let{to:a,decimals:s}=n(i);i.style.display="inline-block",i.style.whiteSpace="nowrap",i.textContent=t(a,s);let c=parseFloat(getComputedStyle(i).fontSize)||16;i.style.width=`${i.getBoundingClientRect().width/c}em`,i.textContent=t(0,s);let g=performance.now(),E=w=>{let v=Math.min(1,Math.max(0,(w-g)/1600)),b=1-Math.pow(1-v,3);if(i.textContent=t(a*b,s),v<1){requestAnimationFrame(E);return}i.textContent=t(a,s),i.style.width=i.style.display=i.style.whiteSpace=""};requestAnimationFrame(E)},r=new IntersectionObserver(i=>{i.forEach(a=>{a.isIntersecting&&(r.unobserve(a.target),o(a.target))})},{threshold:.6});e.forEach(i=>r.observe(i))}function z(){var b,m,l,d;let e=window.WFC;if(!/\.webflow\.io$/.test(location.hostname)||!e||location.hostname==="seo-teams.webflow.io"&&!new URLSearchParams(location.search).has("wfc-switcher")||(m=(b=window.Webflow)==null?void 0:b.env)!=null&&m.call(b,"editor")||(d=(l=window.Webflow)==null?void 0:l.env)!=null&&d.call(l,"design")||document.getElementById("wfc-environment"))return;let t=e.source?e.source===e.devBase:!!e.dev,n=!!e.source&&e.source!==e.devBase&&e.source!==e.stag,o=!!e.dev&&!t||n,r=t?"Dev":"Staging",i=document.createElement("div");i.id="wfc-environment";let a=i.attachShadow({mode:"open"});a.innerHTML=`
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
  `;let s=a.querySelector(".control"),c=a.querySelector(".launcher"),g=a.querySelector(".choices"),E=a.querySelector(".status"),w=a.querySelectorAll("[data-mode]");a.querySelector(".label").textContent=r,a.querySelector(".dot").toggleAttribute("data-dev",t),c.setAttribute("aria-label",`Choose environment (${r})`),n&&(E.textContent="Staging unavailable \xB7 using release"),c.title=n?"Staging could not load. Using the pinned release.":o?"Local dev could not load. Using staging.":"Switch between staging and local dev";function v(f,h=!1){var u;c.hidden=f,g.hidden=!f,E.hidden=!f||!o,s.toggleAttribute("data-expanded",f),c.setAttribute("aria-expanded",String(f)),h&&(f?(u=a.querySelector('[aria-pressed="true"]'))==null||u.focus():c.focus())}w.forEach(f=>{let h=f.dataset.mode==="dev";f.setAttribute("aria-pressed",String(h===t)),f.addEventListener("click",()=>{if(h===!!e.dev&&!o)return;let u=new URL(location.href);u.searchParams.set("wfc-dev",h?"1":"0");try{localStorage.setItem("wfc-dev",h?"1":"0")}catch{}location.assign(u.href)})}),c.addEventListener("click",()=>v(!0,!0)),a.querySelector(".minimize").addEventListener("click",()=>v(!1,!0)),s.addEventListener("keydown",f=>{f.key!=="Escape"||g.hidden||(f.preventDefault(),f.stopPropagation(),v(!1,!0))}),document.addEventListener("pointerdown",f=>{f.composedPath().includes(i)||v(!1)}),document.body.appendChild(i)}function Y(){let e=matchMedia("(prefers-reduced-motion: reduce)").matches;document.querySelectorAll("[data-faq-trigger]").forEach((n,o)=>{var E,w,v,b,m;let r=document.getElementById((E=n.getAttribute("aria-controls"))!=null?E:"");if(!r){if(r=(v=(w=n.closest("[data-faq-item]"))==null?void 0:w.querySelector("[data-faq-panel]"))!=null?v:null,!r)return;r.id||(r.id=`faq-panel-${o+1}`),n.setAttribute("aria-controls",r.id),n.getAttribute("aria-expanded")!=="true"&&(n.setAttribute("aria-expanded","false"),r.hidden=!0)}let i,a=n.querySelector("[data-faq-label]"),s={closed:(b=a==null?void 0:a.textContent)!=null?b:"",open:(m=n.dataset.faqOpenLabel)!=null?m:""},c,g=l=>{if(!a||!s.open)return;let d=l?s.open:s.closed;if(c==null||c.cancel(),e||!a.animate){a.textContent=d;return}c=a.animate([{opacity:1},{opacity:0}],{duration:300/2,easing:"ease-in"}),c.onfinish=()=>{a.textContent=d,c=a.animate([{opacity:0},{opacity:1}],{duration:300/2,easing:"ease-out"})},c.oncancel=()=>{a.textContent=d}};n.addEventListener("click",()=>{let l=n.getAttribute("aria-expanded")!=="true";if(n.setAttribute("aria-expanded",String(l)),g(l),i==null||i.cancel(),e||!r.animate){r.hidden=!l;return}r.hidden=!1;let d=`${r.offsetHeight}px`,{paddingTop:f,paddingBottom:h,marginTop:u}=getComputedStyle(r),p=r.parentElement?getComputedStyle(r.parentElement):null,x=p&&/flex|grid/.test(p.display)&&parseFloat(p.rowGap)||0,M={height:"0px",paddingTop:"0px",paddingBottom:"0px",marginTop:`${parseFloat(u)-x}px`,opacity:0},k={height:d,paddingTop:f,paddingBottom:h,marginTop:u,opacity:1};r.style.overflow="hidden",i=r.animate(l?[M,k]:[k,M],{duration:300,easing:"cubic-bezier(0.4, 0, 0.2, 1)"});let q=()=>{r.style.overflow="",r.hidden=!l};i.onfinish=q,i.oncancel=()=>{r.style.overflow=""}})})}var ge='input[type="radio"]:checked, input[type="checkbox"]:checked';function K(){document.querySelectorAll("[data-filter-all]").forEach(e=>{let t=e.closest('[fs-list-element="filters"], form');if(!t)return;let n=e.dataset.filterAll||"is-active",o=()=>e.classList.toggle(n,!t.querySelector(ge));t.addEventListener("change",o),t.addEventListener("input",o),e.addEventListener("click",()=>{setTimeout(o,0),setTimeout(o,150)}),o()})}var be=["list"],j,V=typeof document!="undefined"?(j=document.currentScript)==null?void 0:j.src:void 0;function ve(e){let t=new URL(e);return t.pathname=t.pathname.replace(/index\.js$/,"fs-bundle.js"),t.href}function X(){if(!be.some(t=>document.querySelector(`[fs-${t}-element]`))||document.querySelector('script[src*="@finsweet/attributes"]')||!V||document.querySelector("script[data-fs-bundle]"))return;let e=document.createElement("script");e.src=ve(V),e.defer=!0,e.dataset.fsBundle="",document.head.appendChild(e)}var Z={orange:["#1c0d08","#9e330f","#ed6629","#f7a366","#f0d694"],ember:["#1c0e09","#a82b14","#c2381f","#e0602a","#f2a65a"],coral:["#200f09","#c43c18","#ff6a4a","#ff9a78","#ffd0b8"],plum:["#1a0612","#5a1440","#7e2a5e","#c98db4","#f1d6e7"],rose:["#1c0a0c","#9c2340","#c0395a","#e06a6f","#f6c7c9"],umber:["#1c0e09","#6b3518","#8a4b2a","#b97a4a","#e8c9a0"]};function Q(e){let n=(e&&Z[e.trim().toLowerCase()]||(e!=null&&e.includes(",")?e.split(","):Z.orange)).slice(0,5).map(o=>{let r=o.trim().replace("#","");return[0,2,4].map(i=>parseInt(r.slice(i,i+2),16)/255)});return n.length===5&&n.flat().every(o=>Number.isFinite(o))?n.flat():Q("orange")}var Ee="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",we=`
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
}`;function J(){let e=Array.from(document.querySelectorAll("canvas[data-hero-shader]"));if(!e.length)return;let t=matchMedia("(max-width: 767px)").matches,n="requestIdleCallback"in window?o=>requestIdleCallback(o,{timeout:1e3}):o=>setTimeout(o,200);e.forEach(o=>{let r=()=>n(()=>{try{Le(o)}catch(s){console.error("[hero-shader]",s)}}),i=o.getBoundingClientRect();if(i.top<window.innerHeight&&i.bottom>0){let s=()=>requestAnimationFrame(()=>requestAnimationFrame(r));document.readyState==="complete"?s():window.addEventListener("load",s,{once:!0});return}if(t)return;let a=new IntersectionObserver(([s])=>{s.isIntersecting&&(a.disconnect(),r())},{rootMargin:"300px 0px"});a.observe(o)})}function xe(e){let t=e.getExtension("WEBGL_debug_renderer_info"),n=String(t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER));return/swiftshader|llvmpipe|software|basic render/i.test(n)}function Le(e){var y,_;let t=e.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!t)return;if(xe(t)){(y=t.getExtension("WEBGL_lose_context"))==null||y.loseContext();return}let n=(L,A)=>{var T;let S=t.createShader(L);if(t.shaderSource(S,A),t.compileShader(S),!t.getShaderParameter(S,t.COMPILE_STATUS))throw new Error((T=t.getShaderInfoLog(S))!=null?T:"shader");return S},o=t.createProgram();if(t.attachShader(o,n(t.VERTEX_SHADER,Ee)),t.attachShader(o,n(t.FRAGMENT_SHADER,we)),t.linkProgram(o),!t.getProgramParameter(o,t.LINK_STATUS))throw new Error((_=t.getProgramInfoLog(o))!=null?_:"program");t.useProgram(o),t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW);let r=t.getAttribLocation(o,"p");t.enableVertexAttribArray(r),t.vertexAttribPointer(r,2,t.FLOAT,!1,0,0);let i=t.getUniformLocation(o,"u_res"),a=t.getUniformLocation(o,"u_time"),s=t.getUniformLocation(o,"u_mouse"),c=t.getUniformLocation(o,"u_hover"),g=t.getUniformLocation(o,"u_grain");t.uniform1f(t.getUniformLocation(o,"u_dark"),e.dataset.shaderTheme==="dark"?1:0),t.uniform3fv(t.getUniformLocation(o,"u_c"),new Float32Array(Q(e.dataset.shaderPalette)));let E=matchMedia("(prefers-reduced-motion: reduce)").matches,w={x:.3,y:.4,hover:0},v={x:.3,y:.4,hover:0},b=!0,m=0,l=performance.now(),d=25e5,f=1,h=1,u=()=>{let L=Math.max(1,e.clientWidth),A=Math.max(1,e.clientHeight);h=Math.min(window.devicePixelRatio||1,2,Math.sqrt(d/(L*A)))*f;let S=Math.max(1,Math.round(L*h)),T=Math.max(1,Math.round(A*h));(e.width!==S||e.height!==T)&&(e.width=S,e.height=T,t.viewport(0,0,S,T))},p=L=>{u(),v.x+=(w.x-v.x)*.06,v.y+=(w.y-v.y)*.06,v.hover+=(w.hover-v.hover)*.05,t.uniform2f(i,e.width,e.height),t.uniform1f(a,E?12:(L-l)/1e3+12),t.uniform2f(s,v.x,v.y),t.uniform1f(c,v.hover),t.uniform1f(g,1/Math.max(h,.5)),t.drawArrays(t.TRIANGLES,0,3),e.dataset.heroShader="ready"},x=0,M=0,k=0,q=L=>{let A=x?L-x:16;x=L,A>25&&A<250?(M++,k=0):A<18&&(k++,M=Math.max(0,M-1)),M>20&&f>.5&&(f=Math.max(.5,f-.15),M=0),k>600&&f<1&&(f=Math.min(1,f+.15),k=0),p(L),m=b&&!document.hidden?requestAnimationFrame(q):0,m||(x=0)},F=()=>{!m&&!E&&b&&!document.hidden&&(m=requestAnimationFrame(q))};if(E){p(l),new ResizeObserver(()=>p(l)).observe(e);return}window.addEventListener("pointermove",L=>{let A=e.getBoundingClientRect(),S=(L.clientX-A.left)/A.width,T=1-(L.clientY-A.top)/A.height,R=S>=0&&S<=1&&T>=0&&T<=1;w.hover=R?1:0,R&&(w.x=S,w.y=T)},{passive:!0}),document.documentElement.addEventListener("pointerleave",()=>{w.hover=0}),new IntersectionObserver(([L])=>{b=L.isIntersecting,F()}).observe(e),document.addEventListener("visibilitychange",F),m=requestAnimationFrame(q)}function ee(){let e=location.pathname.replace(/\/$/,"");document.querySelectorAll("[data-nav-section]").forEach(o=>{(o.dataset.navSection||"").split(/\s+/).map(i=>i.replace(/\/$/,"")).filter(Boolean).some(i=>e===i||e.startsWith(`${i}/`))&&o.setAttribute("aria-current","true")}),Ce(),Se(),ye();let t=document.querySelector("[data-nav-toggle]");if(!t)return;let n=document.querySelector("[data-mobile-menu]");n?Me(t,n):Re(t)}function ye(){let e=document.querySelector("[data-nav]");if(!e)return;let t=()=>document.documentElement.style.setProperty("--nav-h",`${Math.round(e.offsetHeight)}px`);new ResizeObserver(t).observe(e),t()}function Se(){let e=document.querySelector("[data-nav-scroll-class]"),t=((e==null?void 0:e.dataset.navScrollClass)||"").split(/\s+/).filter(Boolean);if(!e||!t.length||t.every(a=>e.classList.contains(a)))return;let n=e.hasAttribute("data-nav-scroll-deep")?e.querySelector("nav"):null,o=[e,...n?[n,...n.querySelectorAll("*")]:[]],r=!1,i=()=>{let a=window.scrollY>8;a!==r&&(r=a,o.forEach(s=>t.forEach(c=>s.classList.toggle(c,r))))};window.addEventListener("scroll",i,{passive:!0}),i()}function Me(e,t){let n=document.documentElement,o;t.id||(t.id="mobile-menu"),e.setAttribute("aria-controls",t.id),e.setAttribute("aria-expanded","false"),t.hidden=!0;let r=()=>[...t.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(c=>c.offsetParent!==null),i=()=>e.getAttribute("aria-expanded")==="true",a=()=>{var c,g;window.clearTimeout(o),t.hidden=!1,e.setAttribute("aria-expanded","true"),n.classList.add("is-menu-open"),requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add("is-open"))),(g=(c=t.querySelector("[data-nav-close]"))!=null?c:r()[0])==null||g.focus({preventScroll:!0})},s=(c=!0)=>{if(!i())return;e.setAttribute("aria-expanded","false"),t.classList.remove("is-open"),n.classList.remove("is-menu-open");let g=matchMedia("(prefers-reduced-motion: reduce)").matches;o=window.setTimeout(()=>t.hidden=!0,g?0:320),c&&e.focus({preventScroll:!0})};e.addEventListener("click",()=>i()?s():a()),t.querySelectorAll("[data-nav-close]").forEach(c=>c.addEventListener("click",()=>s())),t.addEventListener("click",c=>{c.target.closest("a[href]")&&s(!1)}),document.addEventListener("keydown",c=>{if(!i()||(c.key==="Escape"&&s(),c.key!=="Tab"))return;let g=r();if(!g.length)return;let E=g[0],w=g[g.length-1];c.shiftKey&&document.activeElement===E?(c.preventDefault(),w.focus()):!c.shiftKey&&document.activeElement===w&&(c.preventDefault(),E.focus())}),matchMedia("(min-width: 992px)").addEventListener("change",c=>{c.matches&&s(!1)})}var Te=140,Ae=40,_e=160,ke=380,He=".nav-panel-label, .nav-panel-list > *, .nav-panel-more, .nav-panel-card";function Ce(){var i;let t=[...document.querySelectorAll("[data-nav-dropdown][aria-controls]")].map(a=>({button:a,panel:document.getElementById(a.getAttribute("aria-controls")||"")})).filter(a=>!!a.panel);if(!t.length)return;let n=(i=t[0].button.closest("[data-nav]"))!=null?i:document.body,o=n.querySelector("[data-nav-flyout]"),r=o==null?void 0:o.querySelector("[data-nav-flyout-card]");o&&r&&qe(n,t,o,r)}function qe(e,t,n,o){let r=matchMedia("(min-width: 992px)"),i=matchMedia("(hover: hover) and (pointer: fine)"),a=matchMedia("(prefers-reduced-motion: reduce)"),s=e.querySelector("[data-nav-curtain]"),c=null,g,E;t.forEach(({panel:u})=>u.querySelectorAll(He).forEach((p,x)=>p.style.setProperty("--nav-i",String(Math.min(x,14)))));let w=()=>{if(!c)return;let u=o.offsetHeight-o.clientHeight,p=[...c.panel.children].reduce((x,M)=>x+M.scrollHeight,0);o.style.height=`${p+u}px`},v=new ResizeObserver(w),b=(u=!1)=>{if(window.clearTimeout(g),l=!1,!c)return;let{button:p,panel:x}=c;p.setAttribute("aria-expanded","false"),x.classList.remove("is-active"),v.disconnect(),o.style.height="0px",s==null||s.classList.remove("is-visible"),u&&p.focus({preventScroll:!0}),c=null,E=window.setTimeout(()=>{c||(n.classList.remove("is-open"),s==null||s.classList.remove("is-open"))},a.matches?0:ke)},m=u=>{window.clearTimeout(g),l=!1,window.clearTimeout(E),c!==u&&(c?(c.button.setAttribute("aria-expanded","false"),c.panel.classList.remove("is-active"),v.disconnect()):(n.classList.add("is-open"),s==null||s.classList.add("is-open"),o.offsetWidth,s==null||s.classList.add("is-visible")),c=u,u.button.setAttribute("aria-expanded","true"),u.panel.classList.add("is-active"),[...u.panel.children].forEach(p=>v.observe(p)),w())},l=!1,d=(u,p)=>{window.clearTimeout(g),l=!1,g=window.setTimeout(u,p)},f=()=>{!h()||!c||l||(d(()=>b(),_e),l=!0)},h=()=>i.matches&&r.matches;t.forEach(u=>{let{button:p,panel:x}=u;p.setAttribute("aria-expanded","false"),p.addEventListener("click",()=>c===u?b():m(u)),p.addEventListener("mouseenter",()=>{if(!h()||c===u){window.clearTimeout(g),l=!1;return}d(()=>m(u),c?Ae:Te)}),p.addEventListener("mouseleave",()=>{h()&&!c&&window.clearTimeout(g)}),x.addEventListener("click",M=>{M.target.closest("a[href]")&&b()})}),n.addEventListener("mouseenter",()=>{!h()||!c||(window.clearTimeout(g),l=!1)}),e.querySelectorAll("a[href], button").forEach(u=>{t.some(p=>p.button===u)||n.contains(u)||u.closest("[data-mobile-menu]")||u.addEventListener("mouseenter",f)}),s==null||s.addEventListener("mousemove",f),s==null||s.addEventListener("click",()=>b()),e.addEventListener("mouseleave",f),document.addEventListener("keydown",u=>{u.key==="Escape"&&c&&b(!0)}),document.addEventListener("click",u=>{c&&!e.contains(u.target)&&b()}),e.addEventListener("focusout",u=>{c&&!e.contains(u.relatedTarget)&&b()}),r.addEventListener("change",u=>{u.matches||b()})}function Re(e){let t=e.closest("nav"),n=document.querySelector("[data-nav-menu]");if(!t||!n)return;let o=r=>{t.classList.toggle("is-open",r),e.setAttribute("aria-expanded",String(r))};e.addEventListener("click",()=>o(e.getAttribute("aria-expanded")!=="true")),n.addEventListener("click",r=>{r.target.closest("a")&&o(!1)}),document.addEventListener("keydown",r=>{r.key==="Escape"&&t.classList.contains("is-open")&&(o(!1),e.focus())}),matchMedia("(min-width: 992px)").addEventListener("change",r=>{r.matches&&o(!1)})}var Fe="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",Pe=`
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
}`,Ie=`
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
}`,Be={glow:{frag:Pe,budget:3e6,density:e=>Math.min(e,2)},ember:{frag:Ie,budget:5e5,density:()=>.5}};function Ne(e){let t=e.getExtension("WEBGL_debug_renderer_info"),n=String(t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER));return/swiftshader|llvmpipe|software|basic render/i.test(n)}function Oe(e,t){var k,q,F,y,_,L,A,S,T,R;let n=e.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!n)return null;if(Ne(n))return(k=n.getExtension("WEBGL_lose_context"))==null||k.loseContext(),null;let o=(H,N)=>{var I;let P=n.createShader(H);if(n.shaderSource(P,N),n.compileShader(P),!n.getShaderParameter(P,n.COMPILE_STATUS))throw new Error((I=n.getShaderInfoLog(P))!=null?I:"shader");return P},r=n.createProgram();if(n.attachShader(r,o(n.VERTEX_SHADER,Fe)),n.attachShader(r,o(n.FRAGMENT_SHADER,t.frag)),n.linkProgram(r),!n.getProgramParameter(r,n.LINK_STATUS))throw new Error((q=n.getProgramInfoLog(r))!=null?q:"program");n.useProgram(r),n.bindBuffer(n.ARRAY_BUFFER,n.createBuffer()),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),n.STATIC_DRAW);let i=n.getAttribLocation(r,"p");n.enableVertexAttribArray(i),n.vertexAttribPointer(i,2,n.FLOAT,!1,0,0);let a=H=>n.getUniformLocation(r,H),s={res:a("u_res"),time:a("u_time"),px:a("u_px"),em:a("u_em"),peak:a("u_peak"),column:a("u_column"),span:a("u_span"),base:a("u_base"),strength:a("u_strength")},c=Number((F=e.dataset.glowPeak)!=null?F:.5),g=Number((y=e.dataset.glowColumn)!=null?y:4.2),E=Number((_=e.dataset.glowSpan)!=null?_:18.3),w=Number((L=e.dataset.glowStrength)!=null?L:.7),v=(T=(S=/^#?([0-9a-f]{6})$/i.exec((A=e.dataset.glowBase)!=null?A:""))==null?void 0:S[1])!=null?T:"200f09",b=[0,2,4].map(H=>parseInt(v.slice(H,H+2),16)/255),m=Number((R=e.dataset.shaderSpeed)!=null?R:1)||1,l=performance.now(),d=0,f=0,h=!1,u=!1,p=H=>{let N=Math.max(1,e.clientWidth),P=Math.max(1,e.clientHeight),I=Math.min(t.density(window.devicePixelRatio||1),Math.sqrt(t.budget/(N*P))),O=Math.max(1,Math.round(N*I)),D=Math.max(1,Math.round(P*I));(e.width!==O||e.height!==D)&&(e.width=O,e.height=D,n.viewport(0,0,O,D)),n.uniform2f(s.res,O,D),n.uniform1f(s.time,(H-l)/1e3*m),n.uniform1f(s.px,I),n.uniform1f(s.em,parseFloat(getComputedStyle(e).fontSize)||16),n.uniform1f(s.peak,c),n.uniform1f(s.column,g),n.uniform1f(s.span,E),n.uniform3f(s.base,b[0],b[1],b[2]),n.uniform1f(s.strength,w),n.drawArrays(n.TRIANGLES,0,3),e.dataset.ready=""},x=H=>{H-f>=30&&(f=H,p(H)),d=h&&!u&&!document.hidden?requestAnimationFrame(x):0},M=()=>{!d&&h&&!u&&!document.hidden&&(d=requestAnimationFrame(x))};return e.addEventListener("webglcontextlost",H=>{H.preventDefault(),u=!0,delete e.dataset.ready}),document.addEventListener("visibilitychange",M),{show(H){h=H,M()}}}function te(){var i;let e=document.querySelectorAll("canvas[data-panel-shader]");if(!e.length||((i=navigator.connection)==null?void 0:i.saveData)||matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches)return;let n="requestIdleCallback"in window?a=>requestIdleCallback(a,{timeout:1e3}):a=>setTimeout(a,200),o=new Map,r=new IntersectionObserver(a=>{a.forEach(s=>{let c=s.target,g=o.get(c);if(g){g.show(s.isIntersecting);return}g===null||!s.isIntersecting||(o.set(c,null),n(()=>{var w;let E=Be[(w=c.dataset.panelShader)!=null?w:""];if(E)try{let v=Oe(c,E);o.set(c,v);let b=c.getBoundingClientRect();v==null||v.show(b.bottom>-200&&b.top<window.innerHeight+200)}catch(v){console.error("[panel-shader]",v)}}))})},{rootMargin:"200px 0px"});e.forEach(a=>r.observe(a))}function De(){document.querySelectorAll("[data-units-filled][data-units-total]").forEach(e=>{if(e.children.length)return;let t=Math.round(Number(e.dataset.unitsTotal)),n=Math.round(Number(e.dataset.unitsFilled));if(!Number.isFinite(t)||!Number.isFinite(n)||t<=0||t>200||n<0)return;let o=e.dataset.unitsTone==="light",r=document.createDocumentFragment();for(let i=0;i<t;i++){let a=document.createElement("span");a.className=i<n?"cs-unit is-filled":o?"cs-unit is-on-light":"cs-unit",r.appendChild(a)}e.appendChild(r),e.hasAttribute("role")||e.setAttribute("role","img"),e.hasAttribute("aria-label")||e.setAttribute("aria-label",`${Math.min(n,t)} of ${t}`)})}function $e(){let e=[...document.querySelectorAll("[data-bar-ratio]")];if(!e.length)return;let t=r=>{let i=Number(r.dataset.barRatio);return Number.isFinite(i)&&i>0&&i<=100?`${i}%`:""},o=!matchMedia("(prefers-reduced-motion: reduce)").matches&&"IntersectionObserver"in window?new IntersectionObserver(r=>{r.forEach(i=>{if(!i.isIntersecting)return;o.unobserve(i.target);let a=i.target.querySelector("[data-bar-ratio]");if(!a)return;let s=a.closest("[data-bars], .cs-bars"),c=s?[...s.querySelectorAll("[data-bar-ratio]")].indexOf(a):0;setTimeout(()=>a.style.width=t(a),Math.max(0,c)*160)})},{threshold:.4}):null;e.forEach(r=>{var s;let i=r.getBoundingClientRect(),a=i.top<innerHeight&&i.bottom>0;if(!o||a||!t(r)){t(r)&&(r.style.width=t(r));return}r.style.transition="none",r.style.width="0%",r.offsetWidth,r.style.transition="",o.observe((s=r.parentElement)!=null?s:r)})}function ne(){De(),$e()}function re(){let e=document.querySelectorAll("[data-card-cursor]");if(!e.length||!matchMedia("(hover: hover) and (pointer: fine)").matches)return;let t=matchMedia("(prefers-reduced-motion: reduce)");e.forEach(n=>{let o=n.parentElement;if(!o)return;let r=0,i=0,a=0,s=0,c=1,g=1,E=0,w=!1,v=l=>{let d=o.getBoundingClientRect(),f=n.offsetWidth,h=n.offsetHeight,u=l.clientX-d.left,p=l.clientY-d.top;c===1&&u+14+f>d.width-8?c=-1:c===-1&&u-14-f<8&&(c=1),g===1&&p+14+h>d.height-8?g=-1:g===-1&&p-14-h<8&&(g=1),r=c===1?u+14:u-14-f,i=g===1?p+14:p-14-h,r=Math.max(8,Math.min(r,d.width-f-8)),i=Math.max(8,Math.min(i,d.height-h-8))},b=()=>{let l=t.matches?1:.2;a+=(r-a)*l,s+=(i-s)*l,n.style.transform=`translate3d(${a.toFixed(1)}px, ${s.toFixed(1)}px, 0)`,w||Math.abs(r-a)>.3||Math.abs(i-s)>.3?E=requestAnimationFrame(b):E=0},m=()=>{E||(E=requestAnimationFrame(b))};o.addEventListener("pointerenter",l=>{c=1,g=1,v(l),a=r,s=i,w=!0,n.classList.add("is-visible"),m()}),o.addEventListener("pointermove",l=>{v(l),m()}),o.addEventListener("pointerleave",()=>{w=!1,n.classList.remove("is-visible")})})}function oe(){let e=document.querySelectorAll("[data-marquee]");!e.length||matchMedia("(prefers-reduced-motion: reduce)").matches||e.forEach(t=>{let n=Array.from(t.children);if(n.length<2)return;n.forEach(a=>{let s=a.cloneNode(!0);s.setAttribute("aria-hidden","true"),s.setAttribute("data-marquee-clone",""),s.removeAttribute("id"),s.querySelectorAll("[id]").forEach(c=>c.removeAttribute("id")),s.querySelectorAll("a, button, input, select, textarea, [tabindex]").forEach(c=>c.setAttribute("tabindex","-1")),t.appendChild(s)});let o=Number(t.dataset.marqueeSpeed)||40,r=t.children[n.length],i=()=>{let a=r.offsetLeft-n[0].offsetLeft;a<=0||(t.style.setProperty("--marquee-distance",`${-a}px`),t.style.setProperty("--marquee-duration",`${(a/o).toFixed(2)}s`))};i(),new ResizeObserver(i).observe(t),t.classList.add("is-marquee"),"IntersectionObserver"in window&&new IntersectionObserver(([a])=>{t.classList.toggle("is-marquee-paused",!a.isIntersecting)}).observe(t)})}function ae(){let e=document.querySelectorAll("[data-parallax]");if(!e.length||matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver"in window))return;let t=new Set,n=0,o=()=>{n=0,t.forEach(a=>{var g;let s=((g=a.parentElement)!=null?g:a).getBoundingClientRect(),c=Math.max(-1,Math.min(1,(innerHeight/2-(s.top+s.height/2))/((innerHeight+s.height)/2)));a.style.transform=`translate3d(0, ${(c*.08*100).toFixed(2)}%, 0)`})},r=()=>{n||(n=requestAnimationFrame(o))},i=new IntersectionObserver(a=>{a.forEach(s=>{let c=s.target;s.isIntersecting?t.add(c):t.delete(c)}),r()});e.forEach(a=>i.observe(a)),addEventListener("scroll",r,{passive:!0}),addEventListener("resize",r)}var ce,B=typeof document!="undefined"?(ce=document.currentScript)==null?void 0:ce.src:void 0;function U(e,t){let n=new URL(e);return n.pathname=n.pathname.replace(/index\.js$/,t),n.href}var $;function Ue(){return $||($=new Promise((e,t)=>{if(window.wfcMapLibre){e(window.wfcMapLibre);return}if(!B||!/index\.js(\?|$)/.test(B)){t(new Error("rank-map: index.js URL unknown, MapLibre not loaded"));return}let n=document.createElement("link");n.rel="stylesheet",n.href=U(B,"maplibre.css");let o=new Promise(i=>{n.onload=n.onerror=()=>i()});document.head.appendChild(n);let r=document.createElement("script");r.src=U(B,"maplibre.js"),r.dataset.wfcMaplibre="",r.onload=()=>{let i=window.wfcMapLibre;if(!i){t(new Error("rank-map: maplibre.js loaded without MapLibre"));return}i.setWorkerUrl(U(B,"maplibre-worker.js")),o.then(()=>e(i))},r.onerror=()=>t(new Error(`rank-map: could not load ${r.src}`)),document.head.appendChild(r)}),$)}var ie=5,Ge=90,We="https://tiles.openfreemap.org/styles/positron",ze=e=>e<=3?"is-top":e<=10?"is-mid":"is-low";function se(e){Ye(e).catch(t=>console.error("[wfc] rank-map failed",t))}function le(){let e=document.querySelectorAll("[data-rank-map]");if(!e.length)return;if(!("IntersectionObserver"in window)){e.forEach(se);return}let t=new IntersectionObserver(n=>{n.forEach(o=>{o.isIntersecting&&(t.unobserve(o.target),se(o.target))})},{rootMargin:"600px 0px"});e.forEach(n=>t.observe(n))}async function Ye(e){var F;let t=y=>(y!=null?y:"").split(",").map(_=>Number(_.trim())).filter(_=>_>0),n={before:t(e.dataset.ranksBefore),after:t(e.dataset.ranksAfter)},o=Number(e.dataset.lat),r=Number(e.dataset.lng),i=Number(e.dataset.spacing)||600,a=e.querySelector("[data-rank-canvas]");if(!a||!o||!r||n.before.length!==25||n.after.length!==25)return;let s=await Ue(),c=matchMedia("(prefers-reduced-motion: reduce)").matches,g=i/111320,E=i/(111320*Math.cos(o*Math.PI/180)),w=2.6,v=[[r-w*E,o-w*g],[r+w*E,o+w*g]],b=new s.Map({container:a,style:We,bounds:v,fitBoundsOptions:{padding:24},cooperativeGestures:!0,attributionControl:{compact:!0},dragRotate:!1,pitchWithRotate:!1,touchPitch:!1});b.touchZoomRotate.disableRotation(),b.addControl(new s.NavigationControl({showCompass:!1}),"top-right");let m=document.createElement("div");m.className="maplibregl-ctrl maplibregl-ctrl-group",m.innerHTML='<button class="cs-map-recentre" type="button" aria-label="Back to the scan centre" title="Back to the scan centre"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="2.25" fill="currentColor" stroke="none"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3"/></svg></button>',m.firstElementChild.addEventListener("click",()=>b.fitBounds(v,{padding:24,duration:c?0:900})),b.addControl({onAdd:()=>m,onRemove:()=>m.remove()},"top-right");let l=()=>{let y=b.getCenter(),_=Math.abs(y.lat-o)>g*.5||Math.abs(y.lng-r)>E*.5||b.getZoom()>d+.3;m.classList.toggle("is-away",_)},d=0;b.once("load",()=>{d=b.getZoom()}),b.on("moveend",l);let f=document.createElement("div");f.className="cs-rank-centre",f.setAttribute("aria-hidden","true"),f.innerHTML='<svg viewBox="0 0 24 32" width="24" height="32"><path d="M12 31C12 31 2 19.5 2 12a10 10 0 0 1 20 0c0 7.5-10 19-10 19Z" fill="#200f09" stroke="#fff" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="#f84c1c"/></svg><span class="cs-rank-centre-label">Scan centre</span>',new s.Marker({element:f,anchor:"bottom",offset:[0,-18]}).setLngLat([r,o]).addTo(b);let h=n.before.map((y,_)=>{let L=Math.floor(_/ie),A=_%ie,S=n.after[_],T=document.createElement("button");T.type="button",T.className="cs-rank-pin";let R=y===S?"no change":y>S?`up ${y-S}`:`down ${S-y}`;return T.setAttribute("aria-label",`Location ${"ABCDE"[L]}${A+1}: position ${y} before, ${S} after (${R})`),T.innerHTML=`<span class="cs-rank-num" aria-hidden="true"></span><span class="cs-rank-tip" aria-hidden="true">#${y} \u2192 #${S}<small>${y>S?`\u25B2 ${y-S} places`:y===S?"No change":`\u25BC ${S-y} places`}</small></span>`,new s.Marker({element:T}).setLngLat([r+(A-2)*E,o-(L-2)*g]).addTo(b),{el:T,num:T.firstElementChild,delay:Math.hypot(L-2,A-2)*Ge}}),u=(F=e.closest("section"))!=null?F:document,p=[...e.querySelectorAll("[data-rank-show]")],x=[...u.querySelectorAll("[data-rank-count]")],M="before",k=(y,_)=>{M=y,p.forEach(L=>L.setAttribute("aria-pressed",String(L.dataset.rankShow===y))),x.forEach(L=>L.classList.toggle("is-active",L.dataset.rankCount===y)),h.forEach(({el:L,num:A,delay:S},T)=>{let R=()=>{let H=n[y][T];A.textContent=String(H),L.classList.remove("is-top","is-mid","is-low"),L.classList.add(ze(H)),_&&(L.classList.remove("is-flip"),L.offsetWidth,L.classList.add("is-flip"))};_&&!c?setTimeout(R,S):R()})};if(k("before",!1),p.forEach(y=>y.addEventListener("click",()=>{let _=y.dataset.rankShow;_!==M&&k(_,!0)})),e.classList.add("is-ready"),c)return;let q=new IntersectionObserver(([y])=>{y.isIntersecting&&(q.disconnect(),setTimeout(()=>{M==="before"&&k("after",!0)},700))},{threshold:.55});q.observe(e)}var de={linkedin:e=>`https://www.linkedin.com/sharing/share-offsite/?url=${e}`,x:(e,t)=>`https://twitter.com/intent/tweet?url=${e}&text=${t}`,facebook:e=>`https://www.facebook.com/sharer/sharer.php?u=${e}`};function ue(){let e=document.querySelectorAll("[data-share]");if(!e.length)return;let t=encodeURIComponent(location.origin+location.pathname),n=encodeURIComponent(document.title);e.forEach(o=>{let r=o.dataset.share||"";if(de[r]&&o instanceof HTMLAnchorElement){o.href=de[r](t,n),o.target="_blank",o.rel="noopener";return}r==="copy"&&o.addEventListener("click",async i=>{i.preventDefault();try{await navigator.clipboard.writeText(location.origin+location.pathname)}catch{return}let a=o.getAttribute("aria-label")||"";o.setAttribute("aria-label","Link copied"),o.classList.add("is-copied"),setTimeout(()=>{o.setAttribute("aria-label",a),o.classList.remove("is-copied")},2e3)})})}function me(){document.querySelectorAll("[data-slider]").forEach(e=>{let t=e.querySelector("[data-slider-track]"),n=Array.from(e.querySelectorAll("[data-slider-item]"));if(!t||!n.length)return;let o=e.querySelector("[data-slider-prev]"),r=e.querySelector("[data-slider-next]"),i=e.querySelector("[data-slider-current]"),a=e.querySelector("[data-slider-total]"),s=e.querySelector("[data-slider-progress]"),c=h=>String(h).padStart(2,"0"),g=()=>(n.length>1?n[1].offsetLeft-n[0].offsetLeft:t.clientWidth)||1,E=()=>Math.min(n.length,Math.max(1,Math.round(t.clientWidth/g()))),w=()=>n.length-E()+1,v=()=>{let h=w()-1;return t.scrollLeft+t.clientWidth>=t.scrollWidth-2?h:Math.min(h,Math.max(0,Math.round(t.scrollLeft/g())))},b=()=>{let h=v(),u=w();i&&(i.textContent=c(h+1)),a&&(a.textContent=c(u)),s&&(s.style.transform=`scaleX(${(h+E())/n.length})`),o&&(o.disabled=h===0),r&&(r.disabled=h===u-1)},m=()=>matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",l=h=>t.scrollBy({left:h*g(),behavior:m()});o==null||o.addEventListener("click",()=>l(-1)),r==null||r.addEventListener("click",()=>l(1)),t.addEventListener("keydown",h=>{if(h.target!==t)return;let p={ArrowLeft:()=>l(-1),ArrowRight:()=>l(1),Home:()=>t.scrollTo({left:0,behavior:m()}),End:()=>t.scrollTo({left:t.scrollWidth,behavior:m()})}[h.key];p&&(h.preventDefault(),p())});let d=!1,f=()=>{d||(d=!0,requestAnimationFrame(()=>{d=!1,b()}))};t.addEventListener("scroll",f,{passive:!0}),window.addEventListener("resize",f,{passive:!0}),b()})}function fe(){document.querySelectorAll("[data-tabs]").forEach(e=>{let t=Array.from(e.querySelectorAll("[data-tabs-tab]"));if(!t.length)return;let n=t[0].closest('[role="tablist"], [role="list"]');n&&e.contains(n)&&(n.setAttribute("role","tablist"),t.forEach(m=>{for(let l=m.parentElement;l&&l!==n;l=l.parentElement)l.getAttribute("role")==="listitem"&&l.setAttribute("role","presentation")}));let o=Array.from(e.querySelectorAll("[data-tabs-panel]")),r=e.id||`tabs-${Array.from(document.querySelectorAll("[data-tabs]")).indexOf(e)+1}`,i=t.map((m,l)=>{var f,h,u;let d=(u=(h=document.getElementById((f=m.getAttribute("aria-controls"))!=null?f:""))!=null?h:o[l])!=null?u:null;if(d){m.id||(m.id=`${r}-tab-${l+1}`),d.id||(d.id=`${r}-panel-${l+1}`),m.setAttribute("aria-controls",d.id),d.setAttribute("role","tabpanel"),d.setAttribute("aria-labelledby",m.id);for(let p=d.parentElement;p&&p!==e;p=p.parentElement){let x=p.getAttribute("role");(x==="list"||x==="listitem")&&p.setAttribute("role","presentation")}}return m.setAttribute("role","tab"),m.querySelectorAll("[data-tabs-number]").forEach(p=>{p.textContent=String(l+1).padStart(2,"0")}),d==null||d.querySelectorAll("[data-tabs-step]").forEach(p=>{p.textContent=String(l+1)}),d}),a=Math.max(0,t.findIndex(m=>m.getAttribute("aria-selected")==="true"));t.forEach((m,l)=>{let d=l===a;m.classList.toggle("is-active",d),m.setAttribute("aria-selected",String(d)),m.tabIndex=d?0:-1,i[l]&&(i[l].hidden=!d)});let s=matchMedia("(prefers-reduced-motion: reduce)").matches,c=0,g=()=>{window.clearTimeout(c),c=0,i.forEach((m,l)=>{if(!m)return;m.classList.remove("is-entering","is-leaving"),m.hidden=l!==a;let d=m.querySelector("[data-tabs-box]");d&&(d.style.height=d.style.overflow=d.style.transition="")})},E=(m,l=!1)=>{var p;let d=i[a],f=i[m],h=!s&&m!==a&&!!d&&!!f;g();let u=h?(p=d.querySelector("[data-tabs-box]"))==null?void 0:p.offsetHeight:void 0;if(a=m,t.forEach((x,M)=>{let k=M===m;x.classList.toggle("is-active",k),x.setAttribute("aria-selected",String(k)),x.tabIndex=k?0:-1;let q=i[M];q&&(q.hidden=!k)}),h){d.hidden=!1,d.classList.add("is-leaving"),f.classList.add("is-entering");let x=f.querySelector("[data-tabs-box]");if(x&&u){let M=x.offsetHeight;x.style.overflow="hidden",x.style.height=`${u}px`,x.getBoundingClientRect(),x.style.transition=`height ${700*.7}ms cubic-bezier(0.4, 0, 0.2, 1)`,x.style.height=`${M}px`}c=window.setTimeout(g,700)}l&&t[m].focus()},w=Number(e.dataset.tabsAuto),v=w>0&&t.length>1&&!!e.querySelector("[data-tabs-progress]")&&!s,b=()=>{};if(v){let m=!1,l=!1,d=!1,f=()=>{l?e.dataset.tabsRunning="stopped":m&&!document.hidden?e.dataset.tabsRunning="true":delete e.dataset.tabsRunning};b=()=>{l=!0,f()},e.style.setProperty("--tabs-auto",`${w}s`),e.addEventListener("animationend",h=>{h.target.matches("[data-tabs-progress]")&&E((a+1)%t.length)}),new IntersectionObserver(h=>{m=h[h.length-1].isIntersecting,m||(l=!1),m&&!d&&(d=!0,i.forEach(u=>u==null?void 0:u.querySelectorAll('img[loading="lazy"]').forEach(p=>{new Image().src=p.currentSrc||p.src}))),f()},{threshold:.25}).observe(e),document.addEventListener("visibilitychange",f)}t.forEach((m,l)=>{m.addEventListener("click",()=>{b(),E(l)}),m.addEventListener("keydown",d=>{let f=t.length-1,h=d.key==="ArrowDown"||d.key==="ArrowRight"?l===f?0:l+1:d.key==="ArrowUp"||d.key==="ArrowLeft"?l===0?f:l-1:d.key==="Home"?0:d.key==="End"?f:-1;h<0||(d.preventDefault(),b(),E(h,!0))})})})}function C(e,t){try{t()}catch(n){console.error(`[wfc] ${e} failed to initialize`,n)}}function he(){document.documentElement.classList.remove("is-loading"),C("environment-switcher",z),C("nav",ee),C("faq",Y),C("hero-shader",J),C("tabs",fe),C("slider",me),C("panel-shader",te),C("charts",G),C("count-up",W),C("share",ue),C("filter-all",K),C("case-visuals",ne),C("card-cursor",re),C("parallax",ae),C("rank-map",le),C("marquee",oe),C("finsweet-loader",X)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",he,{once:!0}):he();})();
