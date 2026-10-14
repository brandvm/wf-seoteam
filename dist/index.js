"use strict";(()=>{function U(){let e=document.querySelectorAll("[data-chart]");if(!e.length||!("IntersectionObserver"in window)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let t=new Map,o=new IntersectionObserver(i=>{i.forEach(r=>{var a;r.isIntersecting&&(o.unobserve(r.target),(a=t.get(r.target))==null||a.forEach(n=>{n.dataset.chart==="columns"&&n.querySelectorAll("rect").forEach((d,m)=>{d.style.transitionDelay=`${m*90}ms`}),n.dataset.inView=""}))})},{threshold:.5});e.forEach(i=>{var a;let r=i.parentElement;r&&(i.dataset.chartArmed="",t.set(r,[...(a=t.get(r))!=null?a:[],i]),o.observe(r))})}function O(){let e=document.querySelectorAll("[data-count]");if(!e.length)return;let t=(a,n)=>a.toLocaleString("en-CA",{minimumFractionDigits:n,maximumFractionDigits:n}),o=a=>{var d,m;let n=(d=a.dataset.count)!=null?d:"0";return{to:Number(n)||0,decimals:((m=n.split(".")[1])!=null?m:"").length}};if(matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver"in window)){e.forEach(a=>{let{to:n,decimals:d}=o(a);a.textContent=t(n,d)});return}let i=a=>{let{to:n,decimals:d}=o(a);a.style.display="inline-block",a.style.whiteSpace="nowrap",a.textContent=t(n,d);let m=parseFloat(getComputedStyle(a).fontSize)||16;a.style.width=`${a.getBoundingClientRect().width/m}em`,a.textContent=t(0,d);let w=performance.now(),v=g=>{let f=Math.min(1,Math.max(0,(g-w)/1600)),h=1-Math.pow(1-f,3);if(a.textContent=t(n*h,d),f<1){requestAnimationFrame(v);return}a.textContent=t(n,d),a.style.width=a.style.display=a.style.whiteSpace=""};requestAnimationFrame(v)},r=new IntersectionObserver(a=>{a.forEach(n=>{n.isIntersecting&&(r.unobserve(n.target),i(n.target))})},{threshold:.6});e.forEach(a=>r.observe(a))}function z(){var h,c,l,s;let e=window.WFC;if(!/\.webflow\.io$/.test(location.hostname)||!e||location.hostname==="seo-teams.webflow.io"&&!new URLSearchParams(location.search).has("wfc-switcher")||(c=(h=window.Webflow)==null?void 0:h.env)!=null&&c.call(h,"editor")||(s=(l=window.Webflow)==null?void 0:l.env)!=null&&s.call(l,"design")||document.getElementById("wfc-environment"))return;let t=e.source?e.source===e.devBase:!!e.dev,o=!!e.source&&e.source!==e.devBase&&e.source!==e.stag,i=!!e.dev&&!t||o,r=t?"Dev":"Staging",a=document.createElement("div");a.id="wfc-environment";let n=a.attachShadow({mode:"open"});n.innerHTML=`
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
  `;let d=n.querySelector(".control"),m=n.querySelector(".launcher"),w=n.querySelector(".choices"),v=n.querySelector(".status"),g=n.querySelectorAll("[data-mode]");n.querySelector(".label").textContent=r,n.querySelector(".dot").toggleAttribute("data-dev",t),m.setAttribute("aria-label",`Choose environment (${r})`),o&&(v.textContent="Staging unavailable \xB7 using release"),m.title=o?"Staging could not load. Using the pinned release.":i?"Local dev could not load. Using staging.":"Switch between staging and local dev";function f(u,p=!1){var b;m.hidden=u,w.hidden=!u,v.hidden=!u||!i,d.toggleAttribute("data-expanded",u),m.setAttribute("aria-expanded",String(u)),p&&(u?(b=n.querySelector('[aria-pressed="true"]'))==null||b.focus():m.focus())}g.forEach(u=>{let p=u.dataset.mode==="dev";u.setAttribute("aria-pressed",String(p===t)),u.addEventListener("click",()=>{if(p===!!e.dev&&!i)return;let b=new URL(location.href);b.searchParams.set("wfc-dev",p?"1":"0");try{localStorage.setItem("wfc-dev",p?"1":"0")}catch{}location.assign(b.href)})}),m.addEventListener("click",()=>f(!0,!0)),n.querySelector(".minimize").addEventListener("click",()=>f(!1,!0)),d.addEventListener("keydown",u=>{u.key!=="Escape"||w.hidden||(u.preventDefault(),u.stopPropagation(),f(!1,!0))}),document.addEventListener("pointerdown",u=>{u.composedPath().includes(a)||f(!1)}),document.body.appendChild(a)}function G(){let e=matchMedia("(prefers-reduced-motion: reduce)").matches;document.querySelectorAll("[data-faq-trigger]").forEach((o,i)=>{var v,g,f,h,c;let r=document.getElementById((v=o.getAttribute("aria-controls"))!=null?v:"");if(!r){if(r=(f=(g=o.closest("[data-faq-item]"))==null?void 0:g.querySelector("[data-faq-panel]"))!=null?f:null,!r)return;r.id||(r.id=`faq-panel-${i+1}`),o.setAttribute("aria-controls",r.id),o.getAttribute("aria-expanded")!=="true"&&(o.setAttribute("aria-expanded","false"),r.hidden=!0)}let a,n=o.querySelector("[data-faq-label]"),d={closed:(h=n==null?void 0:n.textContent)!=null?h:"",open:(c=o.dataset.faqOpenLabel)!=null?c:""},m,w=l=>{if(!n||!d.open)return;let s=l?d.open:d.closed;if(m==null||m.cancel(),e||!n.animate){n.textContent=s;return}m=n.animate([{opacity:1},{opacity:0}],{duration:300/2,easing:"ease-in"}),m.onfinish=()=>{n.textContent=s,m=n.animate([{opacity:0},{opacity:1}],{duration:300/2,easing:"ease-out"})},m.oncancel=()=>{n.textContent=s}};o.addEventListener("click",()=>{let l=o.getAttribute("aria-expanded")!=="true";if(o.setAttribute("aria-expanded",String(l)),w(l),a==null||a.cancel(),e||!r.animate){r.hidden=!l;return}r.hidden=!1;let s=`${r.offsetHeight}px`,{paddingTop:u,paddingBottom:p,marginTop:b}=getComputedStyle(r),y=r.parentElement?getComputedStyle(r.parentElement):null,x=y&&/flex|grid/.test(y.display)&&parseFloat(y.rowGap)||0,S={height:"0px",paddingTop:"0px",paddingBottom:"0px",marginTop:`${parseFloat(b)-x}px`,opacity:0},M={height:s,paddingTop:u,paddingBottom:p,marginTop:b,opacity:1};r.style.overflow="hidden",a=r.animate(l?[S,M]:[M,S],{duration:300,easing:"cubic-bezier(0.4, 0, 0.2, 1)"});let C=()=>{r.style.overflow="",r.hidden=!l};a.onfinish=C,a.oncancel=()=>{r.style.overflow=""}})})}var X="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",J=`
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
}`;function W(){let e=Array.from(document.querySelectorAll("canvas[data-hero-shader]"));if(!e.length)return;let t=matchMedia("(max-width: 767px)").matches,o="requestIdleCallback"in window?i=>requestIdleCallback(i,{timeout:1e3}):i=>setTimeout(i,200);e.forEach(i=>{let r=()=>o(()=>{try{Z(i)}catch(d){console.error("[hero-shader]",d)}}),a=i.getBoundingClientRect();if(a.top<window.innerHeight&&a.bottom>0){let d=()=>requestAnimationFrame(()=>requestAnimationFrame(r));document.readyState==="complete"?d():window.addEventListener("load",d,{once:!0});return}if(t)return;let n=new IntersectionObserver(([d])=>{d.isIntersecting&&(n.disconnect(),r())},{rootMargin:"300px 0px"});n.observe(i)})}function Q(e){let t=e.getExtension("WEBGL_debug_renderer_info"),o=String(t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER));return/swiftshader|llvmpipe|software|basic render/i.test(o)}function Z(e){var F,I;let t=e.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!t)return;if(Q(t)){(F=t.getExtension("WEBGL_lose_context"))==null||F.loseContext();return}let o=(E,L)=>{var T;let _=t.createShader(E);if(t.shaderSource(_,L),t.compileShader(_),!t.getShaderParameter(_,t.COMPILE_STATUS))throw new Error((T=t.getShaderInfoLog(_))!=null?T:"shader");return _},i=t.createProgram();if(t.attachShader(i,o(t.VERTEX_SHADER,X)),t.attachShader(i,o(t.FRAGMENT_SHADER,J)),t.linkProgram(i),!t.getProgramParameter(i,t.LINK_STATUS))throw new Error((I=t.getProgramInfoLog(i))!=null?I:"program");t.useProgram(i),t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW);let r=t.getAttribLocation(i,"p");t.enableVertexAttribArray(r),t.vertexAttribPointer(r,2,t.FLOAT,!1,0,0);let a=t.getUniformLocation(i,"u_res"),n=t.getUniformLocation(i,"u_time"),d=t.getUniformLocation(i,"u_mouse"),m=t.getUniformLocation(i,"u_hover"),w=t.getUniformLocation(i,"u_grain");t.uniform1f(t.getUniformLocation(i,"u_dark"),e.dataset.shaderTheme==="dark"?1:0);let v=matchMedia("(prefers-reduced-motion: reduce)").matches,g={x:.3,y:.4,hover:0},f={x:.3,y:.4,hover:0},h=!0,c=0,l=performance.now(),s=25e5,u=1,p=1,b=()=>{let E=Math.max(1,e.clientWidth),L=Math.max(1,e.clientHeight);p=Math.min(window.devicePixelRatio||1,2,Math.sqrt(s/(E*L)))*u;let _=Math.max(1,Math.round(E*p)),T=Math.max(1,Math.round(L*p));(e.width!==_||e.height!==T)&&(e.width=_,e.height=T,t.viewport(0,0,_,T))},y=E=>{b(),f.x+=(g.x-f.x)*.06,f.y+=(g.y-f.y)*.06,f.hover+=(g.hover-f.hover)*.05,t.uniform2f(a,e.width,e.height),t.uniform1f(n,v?12:(E-l)/1e3+12),t.uniform2f(d,f.x,f.y),t.uniform1f(m,f.hover),t.uniform1f(w,1/Math.max(p,.5)),t.drawArrays(t.TRIANGLES,0,3),e.dataset.heroShader="ready"},x=0,S=0,M=0,C=E=>{let L=x?E-x:16;x=E,L>25&&L<250?(S++,M=0):L<18&&(M++,S=Math.max(0,S-1)),S>20&&u>.5&&(u=Math.max(.5,u-.15),S=0),M>600&&u<1&&(u=Math.min(1,u+.15),M=0),y(E),c=h&&!document.hidden?requestAnimationFrame(C):0,c||(x=0)},R=()=>{!c&&!v&&h&&!document.hidden&&(c=requestAnimationFrame(C))};if(v){y(l),new ResizeObserver(()=>y(l)).observe(e);return}window.addEventListener("pointermove",E=>{let L=e.getBoundingClientRect(),_=(E.clientX-L.left)/L.width,T=1-(E.clientY-L.top)/L.height,B=_>=0&&_<=1&&T>=0&&T<=1;g.hover=B?1:0,B&&(g.x=_,g.y=T)},{passive:!0}),document.documentElement.addEventListener("pointerleave",()=>{g.hover=0}),new IntersectionObserver(([E])=>{h=E.isIntersecting,R()}).observe(e),document.addEventListener("visibilitychange",R),c=requestAnimationFrame(C)}function $(){let e=document.querySelector("[data-nav-toggle]"),t=e==null?void 0:e.closest("nav"),o=document.querySelector("[data-nav-menu]");if(!e||!t||!o)return;let i=r=>{t.classList.toggle("is-open",r),e.setAttribute("aria-expanded",String(r))};e.addEventListener("click",()=>i(e.getAttribute("aria-expanded")!=="true")),o.addEventListener("click",r=>{r.target.closest("a")&&i(!1)}),document.addEventListener("keydown",r=>{r.key==="Escape"&&t.classList.contains("is-open")&&(i(!1),e.focus())}),matchMedia("(min-width: 992px)").addEventListener("change",r=>{r.matches&&i(!1)})}var ee="attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }",te=`
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
}`,ne={glow:{frag:te,budget:3e6,density:e=>Math.min(e,2)},ember:{frag:oe,budget:5e5,density:()=>.5}};function re(e){let t=e.getExtension("WEBGL_debug_renderer_info"),o=String(t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER));return/swiftshader|llvmpipe|software|basic render/i.test(o)}function ae(e,t){var M,C,R,F,I,E,L,_,T,B;let o=e.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!o)return null;if(re(o))return(M=o.getExtension("WEBGL_lose_context"))==null||M.loseContext(),null;let i=(A,P)=>{var H;let q=o.createShader(A);if(o.shaderSource(q,P),o.compileShader(q),!o.getShaderParameter(q,o.COMPILE_STATUS))throw new Error((H=o.getShaderInfoLog(q))!=null?H:"shader");return q},r=o.createProgram();if(o.attachShader(r,i(o.VERTEX_SHADER,ee)),o.attachShader(r,i(o.FRAGMENT_SHADER,t.frag)),o.linkProgram(r),!o.getProgramParameter(r,o.LINK_STATUS))throw new Error((C=o.getProgramInfoLog(r))!=null?C:"program");o.useProgram(r),o.bindBuffer(o.ARRAY_BUFFER,o.createBuffer()),o.bufferData(o.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),o.STATIC_DRAW);let a=o.getAttribLocation(r,"p");o.enableVertexAttribArray(a),o.vertexAttribPointer(a,2,o.FLOAT,!1,0,0);let n=A=>o.getUniformLocation(r,A),d={res:n("u_res"),time:n("u_time"),px:n("u_px"),em:n("u_em"),peak:n("u_peak"),column:n("u_column"),span:n("u_span"),base:n("u_base"),strength:n("u_strength")},m=Number((R=e.dataset.glowPeak)!=null?R:.5),w=Number((F=e.dataset.glowColumn)!=null?F:4.2),v=Number((I=e.dataset.glowSpan)!=null?I:18.3),g=Number((E=e.dataset.glowStrength)!=null?E:.7),f=(T=(_=/^#?([0-9a-f]{6})$/i.exec((L=e.dataset.glowBase)!=null?L:""))==null?void 0:_[1])!=null?T:"200f09",h=[0,2,4].map(A=>parseInt(f.slice(A,A+2),16)/255),c=Number((B=e.dataset.shaderSpeed)!=null?B:1)||1,l=performance.now(),s=0,u=0,p=!1,b=!1,y=A=>{let P=Math.max(1,e.clientWidth),q=Math.max(1,e.clientHeight),H=Math.min(t.density(window.devicePixelRatio||1),Math.sqrt(t.budget/(P*q))),D=Math.max(1,Math.round(P*H)),N=Math.max(1,Math.round(q*H));(e.width!==D||e.height!==N)&&(e.width=D,e.height=N,o.viewport(0,0,D,N)),o.uniform2f(d.res,D,N),o.uniform1f(d.time,(A-l)/1e3*c),o.uniform1f(d.px,H),o.uniform1f(d.em,parseFloat(getComputedStyle(e).fontSize)||16),o.uniform1f(d.peak,m),o.uniform1f(d.column,w),o.uniform1f(d.span,v),o.uniform3f(d.base,h[0],h[1],h[2]),o.uniform1f(d.strength,g),o.drawArrays(o.TRIANGLES,0,3),e.dataset.ready=""},x=A=>{A-u>=30&&(u=A,y(A)),s=p&&!b&&!document.hidden?requestAnimationFrame(x):0},S=()=>{!s&&p&&!b&&!document.hidden&&(s=requestAnimationFrame(x))};return e.addEventListener("webglcontextlost",A=>{A.preventDefault(),b=!0,delete e.dataset.ready}),document.addEventListener("visibilitychange",S),{show(A){p=A,S()}}}function V(){var a;let e=document.querySelectorAll("canvas[data-panel-shader]");if(!e.length||((a=navigator.connection)==null?void 0:a.saveData)||matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches)return;let o="requestIdleCallback"in window?n=>requestIdleCallback(n,{timeout:1e3}):n=>setTimeout(n,200),i=new Map,r=new IntersectionObserver(n=>{n.forEach(d=>{let m=d.target,w=i.get(m);if(w){w.show(d.isIntersecting);return}w===null||!d.isIntersecting||(i.set(m,null),o(()=>{var g;let v=ne[(g=m.dataset.panelShader)!=null?g:""];if(v)try{let f=ae(m,v);i.set(m,f);let h=m.getBoundingClientRect();f==null||f.show(h.bottom>-200&&h.top<window.innerHeight+200)}catch(f){console.error("[panel-shader]",f)}}))})},{rootMargin:"200px 0px"});e.forEach(n=>r.observe(n))}function K(){document.querySelectorAll("[data-slider]").forEach(e=>{let t=e.querySelector("[data-slider-track]"),o=Array.from(e.querySelectorAll("[data-slider-item]"));if(!t||!o.length)return;let i=e.querySelector("[data-slider-prev]"),r=e.querySelector("[data-slider-next]"),a=e.querySelector("[data-slider-current]"),n=e.querySelector("[data-slider-total]"),d=h=>String(h).padStart(2,"0");n&&(n.textContent=d(o.length));let m=()=>o.length>1?o[1].offsetLeft-o[0].offsetLeft:t.clientWidth,w=()=>t.scrollLeft+t.clientWidth>=t.scrollWidth-2?o.length-1:Math.min(o.length-1,Math.round(t.scrollLeft/m())),v=()=>{let h=w();a&&(a.textContent=d(h+1)),i&&(i.disabled=h===0),r&&(r.disabled=h===o.length-1)},g=h=>{let c=matchMedia("(prefers-reduced-motion: reduce)").matches;t.scrollBy({left:h*m(),behavior:c?"auto":"smooth"})};i==null||i.addEventListener("click",()=>g(-1)),r==null||r.addEventListener("click",()=>g(1));let f=!1;t.addEventListener("scroll",()=>{f||(f=!0,requestAnimationFrame(()=>{f=!1,v()}))},{passive:!0}),v()})}function Y(){document.querySelectorAll("[data-tabs]").forEach(e=>{let t=Array.from(e.querySelectorAll("[data-tabs-tab]"));if(!t.length)return;let o=t[0].closest('[role="tablist"], [role="list"]');o&&e.contains(o)&&(o.setAttribute("role","tablist"),t.forEach(c=>{for(let l=c.parentElement;l&&l!==o;l=l.parentElement)l.getAttribute("role")==="listitem"&&l.setAttribute("role","presentation")}));let i=Array.from(e.querySelectorAll("[data-tabs-panel]")),r=e.id||`tabs-${Array.from(document.querySelectorAll("[data-tabs]")).indexOf(e)+1}`,a=t.map((c,l)=>{var u,p,b;let s=(b=(p=document.getElementById((u=c.getAttribute("aria-controls"))!=null?u:""))!=null?p:i[l])!=null?b:null;return s&&(c.id||(c.id=`${r}-tab-${l+1}`),s.id||(s.id=`${r}-panel-${l+1}`),c.setAttribute("aria-controls",s.id),s.setAttribute("role","tabpanel"),s.setAttribute("aria-labelledby",c.id)),c.setAttribute("role","tab"),c.querySelectorAll("[data-tabs-number]").forEach(y=>{y.textContent=String(l+1).padStart(2,"0")}),s==null||s.querySelectorAll("[data-tabs-step]").forEach(y=>{y.textContent=String(l+1)}),s}),n=Math.max(0,t.findIndex(c=>c.getAttribute("aria-selected")==="true"));t.forEach((c,l)=>{let s=l===n;c.classList.toggle("is-active",s),c.setAttribute("aria-selected",String(s)),c.tabIndex=s?0:-1,a[l]&&(a[l].hidden=!s)});let d=matchMedia("(prefers-reduced-motion: reduce)").matches,m=0,w=()=>{window.clearTimeout(m),m=0,a.forEach((c,l)=>{if(!c)return;c.classList.remove("is-entering","is-leaving"),c.hidden=l!==n;let s=c.querySelector("[data-tabs-box]");s&&(s.style.height=s.style.overflow=s.style.transition="")})},v=(c,l=!1)=>{var y;let s=a[n],u=a[c],p=!d&&c!==n&&!!s&&!!u;w();let b=p?(y=s.querySelector("[data-tabs-box]"))==null?void 0:y.offsetHeight:void 0;if(n=c,t.forEach((x,S)=>{let M=S===c;x.classList.toggle("is-active",M),x.setAttribute("aria-selected",String(M)),x.tabIndex=M?0:-1;let C=a[S];C&&(C.hidden=!M)}),p){s.hidden=!1,s.classList.add("is-leaving"),u.classList.add("is-entering");let x=u.querySelector("[data-tabs-box]");if(x&&b){let S=x.offsetHeight;x.style.overflow="hidden",x.style.height=`${b}px`,x.getBoundingClientRect(),x.style.transition=`height ${700*.7}ms cubic-bezier(0.4, 0, 0.2, 1)`,x.style.height=`${S}px`}m=window.setTimeout(w,700)}l&&t[c].focus()},g=Number(e.dataset.tabsAuto),f=g>0&&t.length>1&&!!e.querySelector("[data-tabs-progress]")&&!d,h=()=>{};if(f){let c=!1,l=!1,s=!1,u=()=>{l?e.dataset.tabsRunning="stopped":c&&!document.hidden?e.dataset.tabsRunning="true":delete e.dataset.tabsRunning};h=()=>{l=!0,u()},e.style.setProperty("--tabs-auto",`${g}s`),e.addEventListener("animationend",p=>{p.target.matches("[data-tabs-progress]")&&v((n+1)%t.length)}),new IntersectionObserver(p=>{c=p[p.length-1].isIntersecting,c||(l=!1),c&&!s&&(s=!0,a.forEach(b=>b==null?void 0:b.querySelectorAll('img[loading="lazy"]').forEach(y=>{new Image().src=y.currentSrc||y.src}))),u()},{threshold:.25}).observe(e),document.addEventListener("visibilitychange",u)}t.forEach((c,l)=>{c.addEventListener("click",()=>{h(),v(l)}),c.addEventListener("keydown",s=>{let u=t.length-1,p=s.key==="ArrowDown"||s.key==="ArrowRight"?l===u?0:l+1:s.key==="ArrowUp"||s.key==="ArrowLeft"?l===0?u:l-1:s.key==="Home"?0:s.key==="End"?u:-1;p<0||(s.preventDefault(),h(),v(p,!0))})})})}function k(e,t){try{t()}catch(o){console.error(`[wfc] ${e} failed to initialize`,o)}}function j(){document.documentElement.classList.remove("is-loading"),k("environment-switcher",z),k("nav",$),k("faq",G),k("hero-shader",W),k("tabs",Y),k("slider",K),k("panel-shader",V),k("charts",U),k("count-up",O)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",j,{once:!0}):j();})();
