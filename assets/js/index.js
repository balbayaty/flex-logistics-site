/* ==========================================================================
   Flex Logistics — Homepage (index.html) bootstrap
   --------------------------------------------------------------------------
   Self-hosted, CSP-friendly. No `eval`. No inline `<script>` blocks.
   Replaces the old inline tracking handler so we can drop unsafe-inline
   from script-src in our Content-Security-Policy headers.
   ========================================================================== */
(function () {
  "use strict";

  // ----- Year stamp in footer ------------------------------------------------
  function setYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  // ----- Lucide icons --------------------------------------------------------
  function renderIcons() {
    if (typeof window.lucide !== "undefined" && typeof window.lucide.createIcons === "function") {
      try { window.lucide.createIcons(); } catch (_) { /* no-op */ }
    }
  }

  // ----- Tracking widget (replaces alert() with inline status messaging) -----
  // Why: alert() is a hard interrupt that fails accessibility heuristics and
  // signals low product polish. We use an inline live-region instead, which
  // is both more empathetic and screen-reader friendly.
  function attachTrackHandler() {
    var btn = document.querySelector('[data-track-submit]');
    if (!btn) return;
    btn.addEventListener("click", showTrackResult);
  }

  function showTrackResult() {
    var input = document.getElementById("trackInput");
    var status = document.getElementById("trackStatus");
    var panel = document.getElementById("resultPanel");
    if (!input || !panel) return;
    var value = (input.value || "").trim();

    if (value.length > 2) {
      if (status) {
        status.textContent = "";
        status.className = "sr-only";
      }
      panel.classList.remove("hidden");
      input.setAttribute("aria-invalid", "false");
      // Move keyboard focus to the dialog so screen readers and keyboard
      // users can interact with the result without a mouse.
      var closeBtn = panel.querySelector("[data-close-track]");
      if (closeBtn) closeBtn.focus();
    } else {
      if (status) {
        status.textContent =
          "Please enter a Waybill or Tracking ID (3+ characters). Try the demo with FXL-12345.";
        status.className =
          "mt-3 text-xs font-bold text-flex-orange flex items-start gap-2";
        status.setAttribute("role", "alert");
      }
      input.setAttribute("aria-invalid", "true");
      input.focus();
    }
  }

  function attachClose() {
    var panel = document.getElementById("resultPanel");
    if (!panel) return;
    var closeBtn = panel.querySelector("[data-close-track]");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        panel.classList.add("hidden");
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") panel.classList.add("hidden");
    });
  }

  // ----- Service worker (offline shell) --------------------------------------
  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js").catch(function () { /* offline support is optional */ });
    });
  }

  // ----- Init order ----------------------------------------------------------
  function init() {
    setYear();
    renderIcons();
    attachTrackHandler();
    attachClose();
    registerServiceWorker();
  }

  // Re-render Lucide icons after Alpine has hydrated x-show / x-if blocks.
  document.addEventListener("alpine:init", renderIcons);
  document.addEventListener("alpine:initialized", renderIcons);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
