/* Рядки, яких немає в assets/i18n-dict.js: перемикач теми й смуга стилів макета.
   Словник сайту не змінюємо — доповнюємо глобальний I18N до запуску assets/i18n.js.
   Переклади EN/RO чорнові, потребують вичитки носієм (див. SHYAMA.md). */
(function(){
"use strict";
if (typeof I18N === "undefined") return;
var add = {
  en: { "Тема «Шьяма»": "Shyama theme", "Шьяма": "Shyama",
        "Стиль макета": "Mockup style", "Стиль макета:": "Mockup style:", "Світла": "Light", "Жива картина": "Living painting",
        /* підписи й alt нових фото (MEDIA_SELECTION.md) */
        "На святі Гаура-пурніми, 2024": "At the Gaura Purnima festival, 2024", "Гаура-пурніма, 2024": "Gaura Purnima, 2024",
        "Троє чоловіків на святі сидять поруч і усміхаються": "Three men sit together at the festival, smiling",
        "Кіртан: фісгармонія і каратали": "Kirtan: harmonium and karatalas",
        "Кухар готує прасад": "A cook preparing prasad", "Каструлі з прасадом": "Pots of prasad",
        "Двоє відданих розмовляють і сміються на святі": "Two devotees talking and laughing at the festival",
        "Приготування обіду у великій каструлі": "Cooking lunch in a large pot",
        "Роздача гарячого супу на вулиці": "Handing out hot soup outdoors", "Юна волонтерка подає суп": "A young volunteer serving soup",
        "«Їжа життя»: кухня і роздача.": "Food for Life: the kitchen and the distribution.",
        "Кадри: «Шпальта Медіа» — чернетка, до погодження з редакцією.": "Frames: Shpalta Media. Draft, pending the newsroom’s approval." },
  ro: { "Тема «Шьяма»": "Tema „Shyama”", "Шьяма": "Shyama",
        "Стиль макета": "Stilul machetei", "Стиль макета:": "Stilul machetei:", "Світла": "Luminoasă", "Жива картина": "Pictura vie",
        "На святі Гаура-пурніми, 2024": "La sărbătoarea Gaura Purnima, 2024", "Гаура-пурніма, 2024": "Gaura Purnima, 2024",
        "Троє чоловіків на святі сидять поруч і усміхаються": "Trei bărbați stau împreună la sărbătoare și zâmbesc",
        "Кіртан: фісгармонія і каратали": "Kirtan: armoniu și karatale",
        "Кухар готує прасад": "Un bucătar pregătește prasad", "Каструлі з прасадом": "Oale cu prasad",
        "Двоє відданих розмовляють і сміються на святі": "Doi devoți vorbesc și râd la sărbătoare",
        "Приготування обіду у великій каструлі": "Gătind prânzul într-o oală mare",
        "Роздача гарячого супу на вулиці": "Împărțirea supei calde în aer liber", "Юна волонтерка подає суп": "O tânără voluntară servește supă",
        "«Їжа життя»: кухня і роздача.": "„Hrana pentru Viață”: bucătăria și împărțirea.",
        "Кадри: «Шпальта Медіа» — чернетка, до погодження з редакцією.": "Cadre: Shpalta Media. Schiță, în așteptarea acordului redacției." }
};
Object.keys(add).forEach(function(l){
  if (!I18N[l]) return;
  Object.keys(add[l]).forEach(function(k){
    if (!Object.prototype.hasOwnProperty.call(I18N[l], k)) I18N[l][k] = add[l][k];
  });
});
})();
