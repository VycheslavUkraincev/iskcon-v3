/* Спільний скрипт макета (усі сторінки): меню, тема «Шьяма», лайтбокс, фірмовий рух «Неділя розгортається».
   GSAP і ScrollTrigger беруться з assets/vendor/gsap/ поруч із mockup/ і вантажаться лише після load,
   лише без prefers-reduced-motion: reduce і лише там, де є розклад (.day). Без JS сторінки повні й статичні. */
(function(){
"use strict";
/* шлях до assets/ рахуємо від адреси самого скрипта: mockup.js лежить у mockup/, сторінки — на різній глибині */
var SELF = document.currentScript && document.currentScript.src;
function asset(path){ return SELF ? new URL("../assets/" + path, SELF).href : "../assets/" + path; }

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

/* ── тема «Шьяма»: data-theme на <html>, вибір у localStorage. Без JS кнопки немає, сторінка світла.
   Сам атрибут ставить вбудований скрипт у <head> ще до першого кадру, тут — лише кнопка й перемикання. ── */
var root = document.documentElement;
var themeBtn = document.querySelector(".theme-btn");
var themeMeta = document.querySelector('meta[name="theme-color"]');
var THEME_COLOR = { light: "#F9F7F0", shyama: "#070F1E" };
function isShyama(){ return root.getAttribute("data-theme") === "shyama"; }
function syncTheme(){
  var on = isShyama();
  if (themeBtn) themeBtn.setAttribute("aria-pressed", on ? "true" : "false");
  if (themeMeta) themeMeta.setAttribute("content", on ? THEME_COLOR.shyama : THEME_COLOR.light);
  document.querySelectorAll(".styles [data-style]").forEach(function(a){
    if (a.getAttribute("data-style") === (on ? "shyama" : "light")) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}
function applyTheme(on){
  if (on) root.setAttribute("data-theme", "shyama"); else root.removeAttribute("data-theme");
  try { localStorage.setItem("mockup-theme", on ? "shyama" : "light"); } catch(e){}
  syncTheme();
}
syncTheme();
if (themeBtn){
  themeBtn.addEventListener("click", function(){
    var on = !isShyama();
    /* тиха зміна сцени: перехресне згасання, якщо браузер уміє і рух не вимкнено */
    if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
      document.startViewTransition(function(){ applyTheme(on); });
    } else applyTheme(on);
  });
}

/* ── пожертви: без JS посилання з data-donate веде просто на WayForPay; з JS — не переходимо,
   бо той самий клік відкриває вікно оплати з assets/donation.js ── */
if (document.getElementById("donateModal")){
  document.addEventListener("click", function(e){
    if (e.target.closest && e.target.closest("a[data-donate]")) e.preventDefault();
  }, true);
}

/* ── лайтбокс: повне фото з посилання, підпис = alt (його вже переклав i18n.js) ── */
var dlg = document.querySelector(".lb");
var links = Array.prototype.slice.call(document.querySelectorAll(".gal a, [data-lightbox] a"));
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
  load(asset("vendor/gsap/gsap.min.js"))
    .then(function(){ return load(asset("vendor/gsap/ScrollTrigger.min.js")); })
    .then(function(){
      var gsap = window.gsap;
      gsap.registerPlugin(window.ScrollTrigger);
      var mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", function(){
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
