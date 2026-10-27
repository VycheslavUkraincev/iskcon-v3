/* Макет головної: меню, лайтбокс галереї, фірмовий рух «Неділя розгортається».
   GSAP і ScrollTrigger беруться з ../assets/vendor/gsap/ і вантажаться лише після load
   і лише без prefers-reduced-motion: reduce. Без JS сторінка повна й статична. */
(function(){
"use strict";

/* ── меню на вузьких екранах ── */
var btn = document.querySelector(".menu-btn");
var nav = document.getElementById("nav");
function setMenu(open){
  btn.setAttribute("aria-expanded", open ? "true" : "false");
  nav.classList.toggle("is-open", open);
}
if (btn && nav){
  btn.addEventListener("click", function(){ setMenu(btn.getAttribute("aria-expanded") !== "true"); });
  nav.addEventListener("click", function(e){ if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function(e){
    if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true"){ setMenu(false); btn.focus(); }
  });
}

/* ── лайтбокс: повне фото з посилання, підпис = alt (його вже переклав i18n.js) ── */
var dlg = document.querySelector(".lb");
var links = Array.prototype.slice.call(document.querySelectorAll(".gal a"));
if (dlg && typeof dlg.showModal === "function" && links.length){
  var img = dlg.insertBefore(document.createElement("img"), dlg.firstChild), cap = dlg.querySelector(".lb__cap"), cur = 0, opener = null;
  var show = function(i){
    cur = (i + links.length) % links.length;
    var thumb = links[cur].querySelector("img");
    img.src = links[cur].getAttribute("href");
    img.alt = thumb ? thumb.alt : "";
    cap.textContent = (cur + 1) + " / " + links.length;
  };
  links.forEach(function(a, i){
    a.addEventListener("click", function(e){
      e.preventDefault(); opener = a; show(i); dlg.showModal();
    });
  });
  dlg.addEventListener("click", function(e){
    var act = e.target.closest("[data-lb]");
    if (act){ var k = act.getAttribute("data-lb"); if (k === "close") dlg.close(); else show(cur + (k === "next" ? 1 : -1)); }
    else if (e.target === dlg) dlg.close();
  });
  dlg.addEventListener("keydown", function(e){
    if (e.key === "ArrowRight") show(cur + 1);
    if (e.key === "ArrowLeft") show(cur - 1);
  });
  dlg.addEventListener("close", function(){ if (opener) opener.focus(); });
}

/* ── фірмовий рух: лінія розкладу наповнюється з прокруткою, кожна подія «запалюється» ── */
var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
if (reduce.matches || !document.querySelector(".day")) return;

function load(src){
  return new Promise(function(ok, fail){
    var s = document.createElement("script");
    s.src = src; s.onload = ok; s.onerror = fail;
    document.head.appendChild(s);
  });
}
function start(){
  load("../assets/vendor/gsap/gsap.min.js")
    .then(function(){ return load("../assets/vendor/gsap/ScrollTrigger.min.js"); })
    .then(function(){
      var gsap = window.gsap;
      gsap.registerPlugin(window.ScrollTrigger);
      var mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", function(){
        var root = document.documentElement;
        root.classList.add("js-motion");
        gsap.fromTo(".day__fill", { scaleY: 0 }, {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: ".day", start: "top 70%", end: "bottom 55%", scrub: 0.6 }
        });
        gsap.utils.toArray(".ev").forEach(function(ev){
          window.ScrollTrigger.create({
            trigger: ev, start: "top 62%",
            onEnter: function(){ ev.classList.add("is-lit"); },
            onLeaveBack: function(){ ev.classList.remove("is-lit"); }
          });
        });
        return function(){
          root.classList.remove("js-motion");
          document.querySelectorAll(".ev").forEach(function(ev){ ev.classList.remove("is-lit"); });
        };
      });
    })
    .catch(function(){ /* без GSAP лінія просто повна — нічого не ламається */ });
}
if (document.readyState === "complete") start();
else window.addEventListener("load", start);
})();
