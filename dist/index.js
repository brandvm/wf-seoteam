"use strict";(()=>{function U(){let e=document.querySelectorAll("[data-chart]");if(!e.length||!("IntersectionObserver"in window)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let t=new Map,n=new IntersectionObserver(o=>{o.forEach(r=>{var a;r.isIntersecting&&(n.unobserve(r.target),(a=t.get(r.target))==null||a.forEach(i=>{i.dataset.chart==="columns"&&i.querySelectorAll("rect").forEach((c,s)=>{c.style.transitionDelay=`${s*90}ms`}),i.dataset.inView=""}))})},{threshold:.5});e.forEach(o=>{var a;let r=o.parentElement;r&&(o.dataset.chartArmed="",t.set(r,[...(a=t.get(r))!=null?a:[],o]),n.observe(r))})}function O(){let e=document.querySelectorAll("[data-count]");if(!e.length)return;let t=(a,i)=>a.toLocaleString("en-CA",{minimumFractionDigits:i,maximumFractionDigits:i}),n=a=>{var c,s;let i=(c=a.dataset.count)!=null?c:"0";return{to:Number(i)||0,decimals:((s=i.split(".")[1])!=null?s:"").length}};if(matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver"in window)){e.forEach(a=>{let{to:i,decimals:c}=n(a);a.textContent=t(i,c)});return}let o=a=>{let{to:i,decimals:c}=n(a);a.style.display="inline-block",a.style.whiteSpace="nowrap",a.textContent=t(i,c);let s=parseFloat(getComputedStyle(a).fontSize)||16;a.style.width=`${a.getBoundingClientRect().width/s}em`,a.textContent=t(0,c);let g=performance.now(),w=E=>{let p=Math.min(1,Math.max(0,(E-g)/1600)),h=1-Math.pow(1-p,3);if(a.textContent=t(i*h,c),p<1){requestAnimationFrame(w);return}a.textContent=t(i,c),a.style.width=a.style.display=a.style.whiteSpace=""};requestAnimationFrame(w)},r=new IntersectionObserver(a=>{a.forEach(i=>{i.isIntersecting&&(r.unobserve(i.target),o(i.target))})},{threshold:.6});e.forEach(a=>r.observe(a))}function $(){var h,m,l,u;let e=window.WFC;if(!/\.webflow\.io$/.test(location.hostname)||!e||location.hostname==="seo-teams.webflow.io"&&!new URLSearchParams(location.search).has("wfc-switcher")||(m=(h=window.Webflow)==null?void 0:h.env)!=null&&m.call(h,"editor")||(u=(l=window.Webflow)==null?void 0:l.env)!=null&&u.call(l,"design")||document.getElementById("wfc-environment"))return;let t=e.source?e.source===e.devBase:!!e.dev,n=!!e.source&&e.source!==e.devBase&&e.source!==e.stag,o=!!e.dev&&!t||n,r=t?"Dev":"Staging",a=document.createElement("div");a.id="wfc-environment";let i=a.attachShadow({mode:"open"});i.innerHTML=`
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
  `;let c=i.querySelector(".control"),s=i.querySelector(".launcher"),g=i.querySelector(".choices"),w=i.querySelector(".status"),E=i.querySelectorAll("[data-mode]");i.querySelector(".label").textContent=r,i.querySelector(".dot").toggleAttribute("data-dev",t),s.setAttribute("aria-label",`Choose environment (${r})`),n&&(w.textContent="Staging unavailable \xB7 using release"),s.title=n?"Staging could not load. Using the pinned release.":o?"Local dev could not load. Using staging.":"Switch between staging and local dev";function p(f,v=!1){var d;s.hidden=f,g.hidden=!f,w.hidden=!f||!o,c.toggleAttribute("data-expanded",f),s.setAttribute("aria-expanded",String(f)),v&&(f?(d=i.querySelector('[aria-pressed="true"]'))==null||d.focus():s.focus())}E.forEach(f=>{let v=f.dataset.mode==="dev";f.setAttribute("aria-pressed",String(v===t)),f.addEventListener("click",()=>{if(v===!!e.dev&&!o)return;let d=new URL(location.href);d.searchParams.set("wfc-dev",v?"1":"0");try{localStorage.setItem("wfc-dev",v?"1":"0")}catch{}location.assign(d.href)})}),s.addEventListener("click",()=>p(!0,!0)),i.querySelector(".minimize").addEventListener("click",()=>p(!1,!0)),c.addEventListener("keydown",f=>{f.key!=="Escape"||g.hidden||(f.preventDefault(),f.stopPropagation(),p(!1,!0))}),document.addEventListener("pointerdown",f=>{f.composedPath().includes(a)||p(!1)}),document.body.appendChild(a)}function z(){let e=matchMedia("(prefers-reduced-motion: reduce)").matches;document.querySelectorAll("[data-faq-trigger]").forEach((n,o)=>{var w,E,p,h,m;let r=document.getElementById((w=n.getAttribute("aria-controls"))!=null?w:"");if(!r){if(r=(p=(E=n.closest("[data-faq-item]"))==null?void 0:E.querySelector("[data-faq-panel]"))!=null?p:null,!r)return;r.id||(r.id=`faq-panel-${o+1}`),n.setAttribute("aria-controls",r.id),n.getAttribute("aria-expanded")!=="true"&&(n.setAttribute("aria-expanded","false"),r.hidden=!0)}let a,i=n.querySelector("[data-faq-label]"),c={closed:(h=i==null?void 0:i.textContent)!=null?h:"",open:(m=n.dataset.faqOpenLabel)!=null?m:""},s,g=l=>{if(!i||!c.open)return;let u=l?c.open:c.closed;if(s==null||s.cancel(),e||!i.animate){i.textContent=u;return}s=i.animate([{opacity:1},{opacity:0}],{duration:300/2,easing:"ease-in"}),s.onfinish=()=>{i.textContent=u,s=i.animate([{opacity:0},{opacity:1}],{duration:300/2,easing:"ease-out"})},s.oncancel=()=>{i.textContent=u}};n.addEventListener("click",()=>{let l=n.getAttribute("aria-expanded")!=="true";if(n.setAttribute("aria-expanded",String(l)),g(l),a==null||a.cancel(),e||!r.animate){r.hidden=!l;return}r.hidden=!1;let u=`${r.offsetHeight}px`,{paddingTop:f,paddingBottom:v,marginTop:d}=getComputedStyle(r),b=r.parentElement?getComputedStyle(r.parentElement):null,x=b&&/flex|grid/.test(b.display)&&parseFloat(b.rowGap)||0,y={height:"0px",paddingTop:"0px",paddingBottom:"0px",marginTop:`${parseFloat(d)-x}px`,opacity:0},T={height:u,paddingTop:f,paddingBottom:v,marginTop:d,opacity:1};r.style.overflow="hidden",a=r.animate(l?[y,T]:[T,y],{duration:300,easing:"cubic-bezier(0.4, 0, 0.2, 1)"});let H=()=>{r.style.overflow="",r.hidden=!l};a.onfinish=H,a.oncancel=()=>{r.style.overflow=""}})})}var ae='input[type="radio"]:checked, input[type="checkbox"]:checked';function W(){document.querySelectorAll("[data-filter-all]").forEach(e=>{let t=e.closest('[fs-list-element="filters"], form');if(!t)return;let n=e.dataset.filterAll||"is-active",o=()=>e.classList.toggle(n,!t.querySelector(ae));t.addEventListener("change",o),t.addEventListener("input",o),e.addEventListener("click",()=>{setTimeout(o,0),setTimeout(o,150)}),o()})}var ie=["list"],K,G=typeof document!="undefined"?(K=document.currentScript)==null?void 0:K.src:void 0;function se(e){let t=new URL(e);return t.pathname=t.pathname.replace(/index\.js$/,"fs-bundle.js"),t.href}function V(){if(!ie.some(t=>document.querySelector(`[fs-${t}-element]`))||document.querySelector('script[src*="@finsweet/attributes"]')||!G||document.querySelector("script[data-fs-bundle]"))return;let e=document.createElement("script");e.src=se(G),e.defer=!0,e.dataset.fsBundle="",document.head.appendChild(e)}var Y={orange:["#1c0d08","#9e330f","#ed6629","#f7a366","#f0d694"],ember:["#1c0e09","#a82b14","#c2381f","#e0602a","#f2a65a"],coral:["#200f09","#c43c18","#ff6a4a","#ff9a78","#ffd0b8"],plum:["#1a0612","#5a1440","#7e2a5e","#c98db4","#f1d6e7"],rose:["#1c0a0c","#9c2340","#c0395a","#e06a6f","#f6c7c9"],umber:["#1c0e09","#6b3518","#8a4b2a","#b97a4a","#e8c9a0"]};function j(e){let n=(e&&Y[e.trim().toLowerCase()]||(e!=null&&e.includes(",")?e.split(","):Y.orange)).slice(0,5).map(o=>{let r=o.trim().replace("#","");return[0,2,4].map(a=>parseInt(r.slice(a,a+2),16)/255)});return n.length===5&&n.flat().every(o=>Number.isFinite(o))?n.flat():j("orange")}var ce="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",le=`
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
}`;function X(){let e=Array.from(document.querySelectorAll("canvas[data-hero-shader]"));if(!e.length)return;let t=matchMedia("(max-width: 767px)").matches,n="requestIdleCallback"in window?o=>requestIdleCallback(o,{timeout:1e3}):o=>setTimeout(o,200);e.forEach(o=>{let r=()=>n(()=>{try{ue(o)}catch(c){console.error("[hero-shader]",c)}}),a=o.getBoundingClientRect();if(a.top<window.innerHeight&&a.bottom>0){let c=()=>requestAnimationFrame(()=>requestAnimationFrame(r));document.readyState==="complete"?c():window.addEventListener("load",c,{once:!0});return}if(t)return;let i=new IntersectionObserver(([c])=>{c.isIntersecting&&(i.disconnect(),r())},{rootMargin:"300px 0px"});i.observe(o)})}function de(e){let t=e.getExtension("WEBGL_debug_renderer_info"),n=String(t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER));return/swiftshader|llvmpipe|software|basic render/i.test(n)}function ue(e){var F,P;let t=e.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!t)return;if(de(t)){(F=t.getExtension("WEBGL_lose_context"))==null||F.loseContext();return}let n=(L,S)=>{var _;let M=t.createShader(L);if(t.shaderSource(M,S),t.compileShader(M),!t.getShaderParameter(M,t.COMPILE_STATUS))throw new Error((_=t.getShaderInfoLog(M))!=null?_:"shader");return M},o=t.createProgram();if(t.attachShader(o,n(t.VERTEX_SHADER,ce)),t.attachShader(o,n(t.FRAGMENT_SHADER,le)),t.linkProgram(o),!t.getProgramParameter(o,t.LINK_STATUS))throw new Error((P=t.getProgramInfoLog(o))!=null?P:"program");t.useProgram(o),t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW);let r=t.getAttribLocation(o,"p");t.enableVertexAttribArray(r),t.vertexAttribPointer(r,2,t.FLOAT,!1,0,0);let a=t.getUniformLocation(o,"u_res"),i=t.getUniformLocation(o,"u_time"),c=t.getUniformLocation(o,"u_mouse"),s=t.getUniformLocation(o,"u_hover"),g=t.getUniformLocation(o,"u_grain");t.uniform1f(t.getUniformLocation(o,"u_dark"),e.dataset.shaderTheme==="dark"?1:0),t.uniform3fv(t.getUniformLocation(o,"u_c"),new Float32Array(j(e.dataset.shaderPalette)));let w=matchMedia("(prefers-reduced-motion: reduce)").matches,E={x:.3,y:.4,hover:0},p={x:.3,y:.4,hover:0},h=!0,m=0,l=performance.now(),u=25e5,f=1,v=1,d=()=>{let L=Math.max(1,e.clientWidth),S=Math.max(1,e.clientHeight);v=Math.min(window.devicePixelRatio||1,2,Math.sqrt(u/(L*S)))*f;let M=Math.max(1,Math.round(L*v)),_=Math.max(1,Math.round(S*v));(e.width!==M||e.height!==_)&&(e.width=M,e.height=_,t.viewport(0,0,M,_))},b=L=>{d(),p.x+=(E.x-p.x)*.06,p.y+=(E.y-p.y)*.06,p.hover+=(E.hover-p.hover)*.05,t.uniform2f(a,e.width,e.height),t.uniform1f(i,w?12:(L-l)/1e3+12),t.uniform2f(c,p.x,p.y),t.uniform1f(s,p.hover),t.uniform1f(g,1/Math.max(v,.5)),t.drawArrays(t.TRIANGLES,0,3),e.dataset.heroShader="ready"},x=0,y=0,T=0,H=L=>{let S=x?L-x:16;x=L,S>25&&S<250?(y++,T=0):S<18&&(T++,y=Math.max(0,y-1)),y>20&&f>.5&&(f=Math.max(.5,f-.15),y=0),T>600&&f<1&&(f=Math.min(1,f+.15),T=0),b(L),m=h&&!document.hidden?requestAnimationFrame(H):0,m||(x=0)},R=()=>{!m&&!w&&h&&!document.hidden&&(m=requestAnimationFrame(H))};if(w){b(l),new ResizeObserver(()=>b(l)).observe(e);return}window.addEventListener("pointermove",L=>{let S=e.getBoundingClientRect(),M=(L.clientX-S.left)/S.width,_=1-(L.clientY-S.top)/S.height,B=M>=0&&M<=1&&_>=0&&_<=1;E.hover=B?1:0,B&&(E.x=M,E.y=_)},{passive:!0}),document.documentElement.addEventListener("pointerleave",()=>{E.hover=0}),new IntersectionObserver(([L])=>{h=L.isIntersecting,R()}).observe(e),document.addEventListener("visibilitychange",R),m=requestAnimationFrame(H)}function Q(){let e=location.pathname.replace(/\/$/,"");document.querySelectorAll("[data-nav-section]").forEach(o=>{(o.dataset.navSection||"").split(/\s+/).map(a=>a.replace(/\/$/,"")).filter(Boolean).some(a=>e===a||e.startsWith(`${a}/`))&&o.setAttribute("aria-current","true")}),Ee(),me();let t=document.querySelector("[data-nav-toggle]");if(!t)return;let n=document.querySelector("[data-mobile-menu]");n?fe(t,n):xe(t)}function me(){let e=document.querySelector("[data-nav-scroll-class]"),t=((e==null?void 0:e.dataset.navScrollClass)||"").split(/\s+/).filter(Boolean);if(!e||!t.length||t.every(r=>e.classList.contains(r)))return;let n=!1,o=()=>{let r=window.scrollY>8;r!==n&&(n=r,t.forEach(a=>e.classList.toggle(a,n)))};window.addEventListener("scroll",o,{passive:!0}),o()}function fe(e,t){let n=document.documentElement,o;t.id||(t.id="mobile-menu"),e.setAttribute("aria-controls",t.id),e.setAttribute("aria-expanded","false"),t.hidden=!0;let r=()=>[...t.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(s=>s.offsetParent!==null),a=()=>e.getAttribute("aria-expanded")==="true",i=()=>{var s,g;window.clearTimeout(o),t.hidden=!1,e.setAttribute("aria-expanded","true"),n.classList.add("is-menu-open"),requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add("is-open"))),(g=(s=t.querySelector("[data-nav-close]"))!=null?s:r()[0])==null||g.focus({preventScroll:!0})},c=(s=!0)=>{if(!a())return;e.setAttribute("aria-expanded","false"),t.classList.remove("is-open"),n.classList.remove("is-menu-open");let g=matchMedia("(prefers-reduced-motion: reduce)").matches;o=window.setTimeout(()=>t.hidden=!0,g?0:320),s&&e.focus({preventScroll:!0})};e.addEventListener("click",()=>a()?c():i()),t.querySelectorAll("[data-nav-close]").forEach(s=>s.addEventListener("click",()=>c())),t.addEventListener("click",s=>{s.target.closest("a[href]")&&c(!1)}),document.addEventListener("keydown",s=>{if(!a()||(s.key==="Escape"&&c(),s.key!=="Tab"))return;let g=r();if(!g.length)return;let w=g[0],E=g[g.length-1];s.shiftKey&&document.activeElement===w?(s.preventDefault(),E.focus()):!s.shiftKey&&document.activeElement===E&&(s.preventDefault(),w.focus())}),matchMedia("(min-width: 992px)").addEventListener("change",s=>{s.matches&&c(!1)})}var he=140,pe=40,ge=160,ve=380,be=".nav-panel-label, .nav-panel-list > *, .nav-panel-more, .nav-panel-card";function Ee(){var a;let t=[...document.querySelectorAll("[data-nav-dropdown][aria-controls]")].map(i=>({button:i,panel:document.getElementById(i.getAttribute("aria-controls")||"")})).filter(i=>!!i.panel);if(!t.length)return;let n=(a=t[0].button.closest("[data-nav]"))!=null?a:document.body,o=n.querySelector("[data-nav-flyout]"),r=o==null?void 0:o.querySelector("[data-nav-flyout-card]");o&&r&&we(n,t,o,r)}function we(e,t,n,o){let r=matchMedia("(min-width: 992px)"),a=matchMedia("(hover: hover) and (pointer: fine)"),i=matchMedia("(prefers-reduced-motion: reduce)"),c=e.querySelector("[data-nav-curtain]"),s=null,g,w;t.forEach(({panel:d})=>d.querySelectorAll(be).forEach((b,x)=>b.style.setProperty("--nav-i",String(Math.min(x,14)))));let E=()=>{if(!s)return;let d=o.offsetHeight-o.clientHeight;o.style.height=`${s.panel.offsetHeight+d}px`},p=new ResizeObserver(E),h=(d=!1)=>{if(window.clearTimeout(g),l=!1,!s)return;let{button:b,panel:x}=s;b.setAttribute("aria-expanded","false"),x.classList.remove("is-active"),p.unobserve(x),o.style.height="0px",c==null||c.classList.remove("is-visible"),d&&b.focus({preventScroll:!0}),s=null,w=window.setTimeout(()=>{s||(n.classList.remove("is-open"),c==null||c.classList.remove("is-open"))},i.matches?0:ve)},m=d=>{window.clearTimeout(g),l=!1,window.clearTimeout(w),s!==d&&(s?(s.button.setAttribute("aria-expanded","false"),s.panel.classList.remove("is-active"),p.unobserve(s.panel)):(n.classList.add("is-open"),c==null||c.classList.add("is-open"),o.offsetWidth,c==null||c.classList.add("is-visible")),s=d,d.button.setAttribute("aria-expanded","true"),d.panel.classList.add("is-active"),p.observe(d.panel),E())},l=!1,u=(d,b)=>{window.clearTimeout(g),l=!1,g=window.setTimeout(d,b)},f=()=>{!v()||!s||l||(u(()=>h(),ge),l=!0)},v=()=>a.matches&&r.matches;t.forEach(d=>{let{button:b,panel:x}=d;b.setAttribute("aria-expanded","false"),b.addEventListener("click",()=>s===d?h():m(d)),b.addEventListener("mouseenter",()=>{if(!v()||s===d){window.clearTimeout(g),l=!1;return}u(()=>m(d),s?pe:he)}),b.addEventListener("mouseleave",()=>{v()&&!s&&window.clearTimeout(g)}),x.addEventListener("click",y=>{y.target.closest("a[href]")&&h()})}),n.addEventListener("mouseenter",()=>{!v()||!s||(window.clearTimeout(g),l=!1)}),e.querySelectorAll("a[href], button").forEach(d=>{t.some(b=>b.button===d)||n.contains(d)||d.closest("[data-mobile-menu]")||d.addEventListener("mouseenter",f)}),c==null||c.addEventListener("mousemove",f),c==null||c.addEventListener("click",()=>h()),e.addEventListener("mouseleave",f),document.addEventListener("keydown",d=>{d.key==="Escape"&&s&&h(!0)}),document.addEventListener("click",d=>{s&&!e.contains(d.target)&&h()}),e.addEventListener("focusout",d=>{s&&!e.contains(d.relatedTarget)&&h()}),r.addEventListener("change",d=>{d.matches||h()})}function xe(e){let t=e.closest("nav"),n=document.querySelector("[data-nav-menu]");if(!t||!n)return;let o=r=>{t.classList.toggle("is-open",r),e.setAttribute("aria-expanded",String(r))};e.addEventListener("click",()=>o(e.getAttribute("aria-expanded")!=="true")),n.addEventListener("click",r=>{r.target.closest("a")&&o(!1)}),document.addEventListener("keydown",r=>{r.key==="Escape"&&t.classList.contains("is-open")&&(o(!1),e.focus())}),matchMedia("(min-width: 992px)").addEventListener("change",r=>{r.matches&&o(!1)})}var ye="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",Le=`
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
}`,Se=`
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
}`,Me={glow:{frag:Le,budget:3e6,density:e=>Math.min(e,2)},ember:{frag:Se,budget:5e5,density:()=>.5}};function Ae(e){let t=e.getExtension("WEBGL_debug_renderer_info"),n=String(t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER));return/swiftshader|llvmpipe|software|basic render/i.test(n)}function Te(e,t){var T,H,R,F,P,L,S,M,_,B;let n=e.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!n)return null;if(Ae(n))return(T=n.getExtension("WEBGL_lose_context"))==null||T.loseContext(),null;let o=(A,I)=>{var q;let C=n.createShader(A);if(n.shaderSource(C,I),n.compileShader(C),!n.getShaderParameter(C,n.COMPILE_STATUS))throw new Error((q=n.getShaderInfoLog(C))!=null?q:"shader");return C},r=n.createProgram();if(n.attachShader(r,o(n.VERTEX_SHADER,ye)),n.attachShader(r,o(n.FRAGMENT_SHADER,t.frag)),n.linkProgram(r),!n.getProgramParameter(r,n.LINK_STATUS))throw new Error((H=n.getProgramInfoLog(r))!=null?H:"program");n.useProgram(r),n.bindBuffer(n.ARRAY_BUFFER,n.createBuffer()),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),n.STATIC_DRAW);let a=n.getAttribLocation(r,"p");n.enableVertexAttribArray(a),n.vertexAttribPointer(a,2,n.FLOAT,!1,0,0);let i=A=>n.getUniformLocation(r,A),c={res:i("u_res"),time:i("u_time"),px:i("u_px"),em:i("u_em"),peak:i("u_peak"),column:i("u_column"),span:i("u_span"),base:i("u_base"),strength:i("u_strength")},s=Number((R=e.dataset.glowPeak)!=null?R:.5),g=Number((F=e.dataset.glowColumn)!=null?F:4.2),w=Number((P=e.dataset.glowSpan)!=null?P:18.3),E=Number((L=e.dataset.glowStrength)!=null?L:.7),p=(_=(M=/^#?([0-9a-f]{6})$/i.exec((S=e.dataset.glowBase)!=null?S:""))==null?void 0:M[1])!=null?_:"200f09",h=[0,2,4].map(A=>parseInt(p.slice(A,A+2),16)/255),m=Number((B=e.dataset.shaderSpeed)!=null?B:1)||1,l=performance.now(),u=0,f=0,v=!1,d=!1,b=A=>{let I=Math.max(1,e.clientWidth),C=Math.max(1,e.clientHeight),q=Math.min(t.density(window.devicePixelRatio||1),Math.sqrt(t.budget/(I*C))),D=Math.max(1,Math.round(I*q)),N=Math.max(1,Math.round(C*q));(e.width!==D||e.height!==N)&&(e.width=D,e.height=N,n.viewport(0,0,D,N)),n.uniform2f(c.res,D,N),n.uniform1f(c.time,(A-l)/1e3*m),n.uniform1f(c.px,q),n.uniform1f(c.em,parseFloat(getComputedStyle(e).fontSize)||16),n.uniform1f(c.peak,s),n.uniform1f(c.column,g),n.uniform1f(c.span,w),n.uniform3f(c.base,h[0],h[1],h[2]),n.uniform1f(c.strength,E),n.drawArrays(n.TRIANGLES,0,3),e.dataset.ready=""},x=A=>{A-f>=30&&(f=A,b(A)),u=v&&!d&&!document.hidden?requestAnimationFrame(x):0},y=()=>{!u&&v&&!d&&!document.hidden&&(u=requestAnimationFrame(x))};return e.addEventListener("webglcontextlost",A=>{A.preventDefault(),d=!0,delete e.dataset.ready}),document.addEventListener("visibilitychange",y),{show(A){v=A,y()}}}function J(){var a;let e=document.querySelectorAll("canvas[data-panel-shader]");if(!e.length||((a=navigator.connection)==null?void 0:a.saveData)||matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches)return;let n="requestIdleCallback"in window?i=>requestIdleCallback(i,{timeout:1e3}):i=>setTimeout(i,200),o=new Map,r=new IntersectionObserver(i=>{i.forEach(c=>{let s=c.target,g=o.get(s);if(g){g.show(c.isIntersecting);return}g===null||!c.isIntersecting||(o.set(s,null),n(()=>{var E;let w=Me[(E=s.dataset.panelShader)!=null?E:""];if(w)try{let p=Te(s,w);o.set(s,p);let h=s.getBoundingClientRect();p==null||p.show(h.bottom>-200&&h.top<window.innerHeight+200)}catch(p){console.error("[panel-shader]",p)}}))})},{rootMargin:"200px 0px"});e.forEach(i=>r.observe(i))}function Z(){document.querySelectorAll("[data-bar-ratio]").forEach(e=>{let t=Number(e.dataset.barRatio);Number.isFinite(t)&&t>0&&t<=100&&(e.style.width=`${t}%`)})}var ee={linkedin:e=>`https://www.linkedin.com/sharing/share-offsite/?url=${e}`,x:(e,t)=>`https://twitter.com/intent/tweet?url=${e}&text=${t}`,facebook:e=>`https://www.facebook.com/sharer/sharer.php?u=${e}`};function te(){let e=document.querySelectorAll("[data-share]");if(!e.length)return;let t=encodeURIComponent(location.origin+location.pathname),n=encodeURIComponent(document.title);e.forEach(o=>{let r=o.dataset.share||"";if(ee[r]&&o instanceof HTMLAnchorElement){o.href=ee[r](t,n),o.target="_blank",o.rel="noopener";return}r==="copy"&&o.addEventListener("click",async a=>{a.preventDefault();try{await navigator.clipboard.writeText(location.origin+location.pathname)}catch{return}let i=o.getAttribute("aria-label")||"";o.setAttribute("aria-label","Link copied"),o.classList.add("is-copied"),setTimeout(()=>{o.setAttribute("aria-label",i),o.classList.remove("is-copied")},2e3)})})}function ne(){document.querySelectorAll("[data-slider]").forEach(e=>{let t=e.querySelector("[data-slider-track]"),n=Array.from(e.querySelectorAll("[data-slider-item]"));if(!t||!n.length)return;let o=e.querySelector("[data-slider-prev]"),r=e.querySelector("[data-slider-next]"),a=e.querySelector("[data-slider-current]"),i=e.querySelector("[data-slider-total]"),c=h=>String(h).padStart(2,"0");i&&(i.textContent=c(n.length));let s=()=>n.length>1?n[1].offsetLeft-n[0].offsetLeft:t.clientWidth,g=()=>t.scrollLeft+t.clientWidth>=t.scrollWidth-2?n.length-1:Math.min(n.length-1,Math.round(t.scrollLeft/s())),w=()=>{let h=g();a&&(a.textContent=c(h+1)),o&&(o.disabled=h===0),r&&(r.disabled=h===n.length-1)},E=h=>{let m=matchMedia("(prefers-reduced-motion: reduce)").matches;t.scrollBy({left:h*s(),behavior:m?"auto":"smooth"})};o==null||o.addEventListener("click",()=>E(-1)),r==null||r.addEventListener("click",()=>E(1));let p=!1;t.addEventListener("scroll",()=>{p||(p=!0,requestAnimationFrame(()=>{p=!1,w()}))},{passive:!0}),w()})}function oe(){document.querySelectorAll("[data-tabs]").forEach(e=>{let t=Array.from(e.querySelectorAll("[data-tabs-tab]"));if(!t.length)return;let n=t[0].closest('[role="tablist"], [role="list"]');n&&e.contains(n)&&(n.setAttribute("role","tablist"),t.forEach(m=>{for(let l=m.parentElement;l&&l!==n;l=l.parentElement)l.getAttribute("role")==="listitem"&&l.setAttribute("role","presentation")}));let o=Array.from(e.querySelectorAll("[data-tabs-panel]")),r=e.id||`tabs-${Array.from(document.querySelectorAll("[data-tabs]")).indexOf(e)+1}`,a=t.map((m,l)=>{var f,v,d;let u=(d=(v=document.getElementById((f=m.getAttribute("aria-controls"))!=null?f:""))!=null?v:o[l])!=null?d:null;return u&&(m.id||(m.id=`${r}-tab-${l+1}`),u.id||(u.id=`${r}-panel-${l+1}`),m.setAttribute("aria-controls",u.id),u.setAttribute("role","tabpanel"),u.setAttribute("aria-labelledby",m.id)),m.setAttribute("role","tab"),m.querySelectorAll("[data-tabs-number]").forEach(b=>{b.textContent=String(l+1).padStart(2,"0")}),u==null||u.querySelectorAll("[data-tabs-step]").forEach(b=>{b.textContent=String(l+1)}),u}),i=Math.max(0,t.findIndex(m=>m.getAttribute("aria-selected")==="true"));t.forEach((m,l)=>{let u=l===i;m.classList.toggle("is-active",u),m.setAttribute("aria-selected",String(u)),m.tabIndex=u?0:-1,a[l]&&(a[l].hidden=!u)});let c=matchMedia("(prefers-reduced-motion: reduce)").matches,s=0,g=()=>{window.clearTimeout(s),s=0,a.forEach((m,l)=>{if(!m)return;m.classList.remove("is-entering","is-leaving"),m.hidden=l!==i;let u=m.querySelector("[data-tabs-box]");u&&(u.style.height=u.style.overflow=u.style.transition="")})},w=(m,l=!1)=>{var b;let u=a[i],f=a[m],v=!c&&m!==i&&!!u&&!!f;g();let d=v?(b=u.querySelector("[data-tabs-box]"))==null?void 0:b.offsetHeight:void 0;if(i=m,t.forEach((x,y)=>{let T=y===m;x.classList.toggle("is-active",T),x.setAttribute("aria-selected",String(T)),x.tabIndex=T?0:-1;let H=a[y];H&&(H.hidden=!T)}),v){u.hidden=!1,u.classList.add("is-leaving"),f.classList.add("is-entering");let x=f.querySelector("[data-tabs-box]");if(x&&d){let y=x.offsetHeight;x.style.overflow="hidden",x.style.height=`${d}px`,x.getBoundingClientRect(),x.style.transition=`height ${700*.7}ms cubic-bezier(0.4, 0, 0.2, 1)`,x.style.height=`${y}px`}s=window.setTimeout(g,700)}l&&t[m].focus()},E=Number(e.dataset.tabsAuto),p=E>0&&t.length>1&&!!e.querySelector("[data-tabs-progress]")&&!c,h=()=>{};if(p){let m=!1,l=!1,u=!1,f=()=>{l?e.dataset.tabsRunning="stopped":m&&!document.hidden?e.dataset.tabsRunning="true":delete e.dataset.tabsRunning};h=()=>{l=!0,f()},e.style.setProperty("--tabs-auto",`${E}s`),e.addEventListener("animationend",v=>{v.target.matches("[data-tabs-progress]")&&w((i+1)%t.length)}),new IntersectionObserver(v=>{m=v[v.length-1].isIntersecting,m||(l=!1),m&&!u&&(u=!0,a.forEach(d=>d==null?void 0:d.querySelectorAll('img[loading="lazy"]').forEach(b=>{new Image().src=b.currentSrc||b.src}))),f()},{threshold:.25}).observe(e),document.addEventListener("visibilitychange",f)}t.forEach((m,l)=>{m.addEventListener("click",()=>{h(),w(l)}),m.addEventListener("keydown",u=>{let f=t.length-1,v=u.key==="ArrowDown"||u.key==="ArrowRight"?l===f?0:l+1:u.key==="ArrowUp"||u.key==="ArrowLeft"?l===0?f:l-1:u.key==="Home"?0:u.key==="End"?f:-1;v<0||(u.preventDefault(),h(),w(v,!0))})})})}function k(e,t){try{t()}catch(n){console.error(`[wfc] ${e} failed to initialize`,n)}}function re(){document.documentElement.classList.remove("is-loading"),k("environment-switcher",$),k("nav",Q),k("faq",z),k("hero-shader",X),k("tabs",oe),k("slider",ne),k("panel-shader",J),k("charts",U),k("count-up",O),k("share",te),k("filter-all",W),k("case-visuals",Z),k("finsweet-loader",V)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",re,{once:!0}):re();})();
