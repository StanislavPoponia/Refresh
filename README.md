# RefChe — сайт компанії з ремонту рефрижераторів (Чернівці)

React 18 + TypeScript + Vite (Node.js), react-router-dom, CSS Modules, framer-motion, lucide-react.

## Запуск

```bash
npm install
npm run dev        # режим розробки: http://localhost:5173
npm run build      # продакшн-збірка в dist/
npm run preview    # перегляд збірки
npm run typecheck  # перевірка типів
npm run lint       # ESLint
npm run format     # Prettier
```

## Структура

```
index.html               HTML-шаблон
public/                  статичні файли (favicon)
src/
  main.tsx, App.tsx      вхід і маршрути (/, /shop, 404)
  styles/                глобальні стилі: змінні (кольори), reset, global
  data/                  ВСІ тексти й дані: contacts.ts, services.ts, about.ts
  context/               ContactsModalContext (відкриття вікна контактів)
  hooks/                 useSectionNavigation (скрол до секцій), useLockBodyScroll
  layouts/MainLayout/    Header + сторінка + Footer + модалка контактів
  components/            Logo, Header, Footer, ContactList, ContactsModal, Reveal, ReeferIllustration
  pages/                 HomePage (sections/Hero, Services, About), ShopPage, NotFoundPage
  assets/                logo.svg, images/ (сюди класти фото)
```

Кожен компонент і сторінка лежать у своїй папці зі своїм `*.module.css`.

## Що де міняти

- **Контакти** (телефони, пошта, місто, графік) — `src/data/contacts.ts`. Оновлюються в хедері, модальному вікні та футері одночасно.
- **Послуги** — `src/data/services.ts`. **Тексти «Про нас»** — `src/data/about.ts`.
- **Кольори** — `src/styles/variables.css`.
- **Фото рефрижераторів** — покласти у `src/assets/images/` і замінити `<ReeferIllustration />` на `<img>` у `src/pages/HomePage/sections/ServicesSection/ServicesSection.tsx` (і в Hero).
- **Магазин** — `src/pages/ShopPage/` (зараз заглушка «у розробці»).

## Адаптивність

Mobile-first: телефон < 768px (бургер-меню, 1 колонка), планшет ≥ 768px (повне меню, 2 колонки), ПК ≥ 1024px (контейнер 1200px, 3–4 колонки).

> `src/assets/logo.svg` і `public/favicon.svg` — копії `D:\Refresh\Logo\1111.SVG`, обрізані по видимій частині знака.
