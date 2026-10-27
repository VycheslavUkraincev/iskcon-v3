# ІСККОН Чернівці — сайт храму

Статичний сайт Центру ведичної культури ІСККОН у Чернівцях (українською).
HTML + CSS + JS, без фреймворків і збірки.

## Структура

Страницы (каждая внутренняя есть и как `x.html`, и как `x/index.html`):

- `index.html` — главная: hero, расписание программ, «для кого», философия,
  направления служения, фотогалерея, карта, отзывы, контакты
- `courses.html` (`courses/index.html`) — курсы (ведическая философия, кулинария, киртан)
- `food.html` (`food/index.html`) — благотворительность «Їжа життя»
- `donation.html` (`donation/index.html`) — пожертвования: кнопки WayForPay, QR-коды, банковские реквизиты
- `404.html` — страница ошибки

Остальное:

- `assets/` — стили (`style.css`), скрипты (`site.js`, `i18n.js`, `i18n-dict.js` со словарём UK/EN/RO, `courses.js`, `food.js`, `donation.js`, `next-sunday.js`, `altar-breath.js`, `avatar.js`, `guide.js` — виджет помощника), видео аватара `.webm` с постерами, логотипы, QR-коды, фавиконки, `motifs.svg`
- `assets/fonts/`, `assets/icons/`, `assets/vendor/` — шрифты, иконки, библиотека GSAP
- `assets/festival/`, `assets/temple/`, `assets/food/`, `assets/prabhupada/`, `assets/og/` — фотографии и картинки для соцсетей
- `tools/` — скрипты сборки версии для домена и деплоя (`build-domain.sh`, `deploy.sh`)
- `robots.txt`, `sitemap.xml`, `favicon.ico`
- `CLAUDE.md`, `DESIGN.md`, `MEDIA.md` — правила проекта, дизайн-токены, инвентарь медиа
- `.claude/skills/`, `.agents/skills/`, `skills-lock.json` — проектные скилы Claude Code

Отчёты, аудиты, `docs/` и скриншоты в этот репозиторий не входят: они остались в `iskcon-cv-ua` (ветки `mockup-v2`, `mockup-v2-docs`).

## Деплой

Статика — достатньо скопіювати файли в корінь веб-сервера
(поточний продакшн: https://iskcon.cv.ua/).
Шляхи до ассетів абсолютні (`/assets/...`), навігація — `/`, `/courses`, `/food`, `/donation`
(на сервері — папки з `index.html` всередині).

## Контакти храму

вул. Скальда (Комарова), 40А, Чернівці · 063-311-7500 · 095-144-0568

## Деплой на iskcon.cv.ua

GitHub Pages в репозитории `iskcon-v3` не включён. Если превью включат, оно должно быть только с `noindex`.
Деплой на живой домен iskcon.cv.ua — отдельное решение владельца, из `iskcon-v3` он не выполняется.

Скрипты в `tools/` оставлены как справка о прежнем процессе; без слова владельца их не запускать.
Страницы сейчас содержат `<base href="/iskcon-cv-ua/">` (путь Pages старого репозитория); для домена нужен `<base href="/">`:

    tools/build-domain.sh dist-domain          # собрать версию для домена
    tools/deploy.sh dist-domain --dry-run      # что изменится на сервере
    tools/deploy.sh dist-domain                # бэкап на сервере + rsync + права 755/644

Нужен SSH-алиас `iskcon` в `~/.ssh/config` (доступ по ключу). Секретов в репозитории нет.
