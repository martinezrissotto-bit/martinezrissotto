/* ===========================================================
   Sol Martínez — Portfolio · site behaviour
   - bilingual ES/EN toggle (persisted)
   - reveal-on-scroll
   =========================================================== */
(function () {
  "use strict";

  /* ---------- Language toggle ---------- */
  var STORE = "sm-lang";
  var nodes = document.querySelectorAll("[data-es]");
  var btns  = document.querySelectorAll(".lang button");

  function apply(lang) {
    document.documentElement.lang = lang;
    nodes.forEach(function (el) {
      var val = el.getAttribute("data-" + lang);
      if (val != null) el.innerHTML = val;
    });
    btns.forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-lang") === lang);
    });
    try { localStorage.setItem(STORE, lang); } catch (e) {}
  }

  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      apply(b.getAttribute("data-lang"));
    });
  });

  var saved = "es";
  try { saved = localStorage.getItem(STORE) || "es"; } catch (e) {}
  apply(saved);

  /* ---------- Reveal on scroll ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
})();
