"use strict";(()=>{function y(){var p,v,f,x;let e=window.WFC;if(!/\.webflow\.io$/.test(location.hostname)||!e||(v=(p=window.Webflow)==null?void 0:p.env)!=null&&v.call(p,"editor")||(x=(f=window.Webflow)==null?void 0:f.env)!=null&&x.call(f,"design")||document.getElementById("wfc-environment"))return;let n=e.source?e.source===e.devBase:!!e.dev,i=!!e.source&&e.source!==e.devBase&&e.source!==e.stag,a=!!e.dev&&!n||i,o=n?"Dev":"Staging",l=document.createElement("div");l.id="wfc-environment";let r=l.attachShadow({mode:"open"});r.innerHTML=`
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
  `;let g=r.querySelector(".control"),s=r.querySelector(".launcher"),h=r.querySelector(".choices"),b=r.querySelector(".status"),k=r.querySelectorAll("[data-mode]");r.querySelector(".label").textContent=o,r.querySelector(".dot").toggleAttribute("data-dev",n),s.setAttribute("aria-label",`Choose environment (${o})`),i&&(b.textContent="Staging unavailable \xB7 using release"),s.title=i?"Staging could not load. Using the pinned release.":a?"Local dev could not load. Using staging.":"Switch between staging and local dev";function u(t,d=!1){var c;s.hidden=t,h.hidden=!t,b.hidden=!t||!a,g.toggleAttribute("data-expanded",t),s.setAttribute("aria-expanded",String(t)),d&&(t?(c=r.querySelector('[aria-pressed="true"]'))==null||c.focus():s.focus())}k.forEach(t=>{let d=t.dataset.mode==="dev";t.setAttribute("aria-pressed",String(d===n)),t.addEventListener("click",()=>{if(d===!!e.dev&&!a)return;let c=new URL(location.href);c.searchParams.set("wfc-dev",d?"1":"0");try{localStorage.setItem("wfc-dev",d?"1":"0")}catch{}location.assign(c.href)})}),s.addEventListener("click",()=>u(!0,!0)),r.querySelector(".minimize").addEventListener("click",()=>u(!1,!0)),g.addEventListener("keydown",t=>{t.key!=="Escape"||h.hidden||(t.preventDefault(),t.stopPropagation(),u(!1,!0))}),document.addEventListener("pointerdown",t=>{t.composedPath().includes(l)||u(!1)}),document.body.appendChild(l)}function w(){document.querySelectorAll("[data-faq-trigger]").forEach(n=>{var a;let i=document.getElementById((a=n.getAttribute("aria-controls"))!=null?a:"");i&&n.addEventListener("click",()=>{let o=n.getAttribute("aria-expanded")!=="true";n.setAttribute("aria-expanded",String(o)),i.hidden=!o})})}function E(){document.querySelectorAll("[data-hero-video]").forEach(e=>{if(e.muted=!0,e.playsInline=!0,matchMedia("(prefers-reduced-motion: reduce)").matches){e.pause(),e.removeAttribute("autoplay");return}e.play().catch(()=>{})})}function L(){let e=document.querySelector("[data-nav-toggle]"),n=e==null?void 0:e.closest("nav"),i=document.querySelector("[data-nav-menu]");if(!e||!n||!i)return;let a=o=>{n.classList.toggle("is-open",o),e.setAttribute("aria-expanded",String(o))};e.addEventListener("click",()=>a(e.getAttribute("aria-expanded")!=="true")),i.addEventListener("click",o=>{o.target.closest("a")&&a(!1)}),document.addEventListener("keydown",o=>{o.key==="Escape"&&n.classList.contains("is-open")&&(a(!1),e.focus())}),matchMedia("(min-width: 992px)").addEventListener("change",o=>{o.matches&&a(!1)})}function m(e,n){try{n()}catch(i){console.error(`[wfc] ${e} failed to initialize`,i)}}function S(){document.documentElement.classList.remove("is-loading"),m("environment-switcher",y),m("nav",L),m("faq",w),m("hero-video",E)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",S,{once:!0}):S();})();
