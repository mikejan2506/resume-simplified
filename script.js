/* =========================================================
   Michael January — Portfolio interactions
   Vanilla JS: no dependencies, no build step.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (!header) return;
    if (window.scrollY > 12) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el, i) {
      // Small stagger for a polished feel without JS timers
      el.style.transitionDelay = Math.min(i * 40, 240) + "ms";
      io.observe(el);
    });
  } else {
    // Fallback: reveal immediately if IO isn't available
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Smooth anchor focus for a11y ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      // Native smooth scroll is handled via CSS; move focus for screen readers
      setTimeout(function () {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }, 400);
    });
  });

  /* ---------- Subtle portrait parallax ---------- */
  var portrait = document.querySelector(".portrait-wrap img");
  var halo = document.querySelector(".portrait-halo");
  if (portrait && window.matchMedia("(hover: hover)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var hero = document.querySelector(".hero");
    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width - 0.5) * 2;   // -1..1
      var y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      portrait.style.transform = "translate(" + (x * 8) + "px," + (y * 8) + "px)";
      if (halo) halo.style.transform = "translate(" + (x * -14) + "px," + (y * -14) + "px)";
    });
    hero.addEventListener("mouseleave", function () {
      portrait.style.transform = "";
      if (halo) halo.style.transform = "";
    });
  }
})();
