/* Рядки, яких немає в assets/i18n-dict.js: перемикач теми, смуга стилів і пауза лотоса.
   Словник сайту не змінюємо — доповнюємо глобальний I18N до запуску assets/i18n.js.
   Переклади EN/RO чорнові, потребують вичитки носієм (див. SHYAMA.md). */
(function(){
"use strict";
if (typeof I18N === "undefined") return;
var add = {
  en: { "Тема «Шьяма»": "Shyama theme", "Шьяма": "Shyama",
        "Стиль макета": "Mockup style", "Стиль макета:": "Mockup style:", "Світла": "Light", "Жива картина": "Living painting", "Пауза": "Pause" },
  ro: { "Тема «Шьяма»": "Tema „Shyama”", "Шьяма": "Shyama",
        "Стиль макета": "Stilul machetei", "Стиль макета:": "Stilul machetei:", "Світла": "Luminoasă", "Жива картина": "Pictura vie", "Пауза": "Pauză" }
};
Object.keys(add).forEach(function(l){
  if (!I18N[l]) return;
  Object.keys(add[l]).forEach(function(k){
    if (!Object.prototype.hasOwnProperty.call(I18N[l], k)) I18N[l][k] = add[l][k];
  });
});
})();
