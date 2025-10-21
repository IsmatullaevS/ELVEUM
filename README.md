ELVEUM CRM (FSD)

Короткое описание
- CRM‑прототип на React + Vite + TypeScript с FSD‑структурой (app/pages/entities/features/widgets/shared).
- Tailwind CSS для стилей, Zustand для состояния.

Требования
- Node.js 18+ (рекомендуется 20+)
- npm (или pnpm/yarn)

Установка и запуск
- Установить зависимости: `npm i`
- Дев‑сервер: `npm run dev`
- Типизация: `npm run typecheck`
- Сборка: `npm run build`
- Предпросмотр сборки: `npm run preview`

Стек
- React 18, Vite 5, TypeScript 5
- Tailwind CSS 3, PostCSS, Autoprefixer
- Zustand (zustand + immer)

Пути/алиасы
- `@/*` → `src/*` (см. `tsconfig.json`)

Полезное для разработки
- Рекомендуемые расширения VS Code: Tailwind CSS IntelliSense.
- В проекте настроены переменные темы и утилиты в `src/index.css` и `src/shared/theme/apple.css`.
- Мини‑календарь использует локальное форматирование дат (без UTC‑сдвига).

Скрипты
- `dev` — запуск Vite
- `build` — `tsc -b` + `vite build`
- `preview` — предпросмотр прод‑сборки
- `typecheck` — проверка типов TypeScript

Структура папок (основное)
- `src/app` — оболочка приложения, роутинг, layout
- `src/pages` — страницы (например, `calendar-day`, `home`, `SimpleModePage`)
- `src/entities` — сущности домена (расписание, и т. п.)
- `src/features` — пользовательские фичи (переключатель UI‑режима и др.)
- `src/widgets` — составные блоки интерфейса
- `src/shared` — переиспользуемое: ui‑кит, store, utils, theme

Состояние
- Глобальный стор: `src/shared/store/useAppStore.ts` (тип `AppStore`).
- Режимы UI: `simple` и `full`; переключатель — `features/ui-mode-switch`.

Примечания
- Если VS Code подсвечивает Tailwind директивы, убедитесь, что установлено расширение Tailwind или отключена проверка unknownAtRules.
- На Windows возможны предупреждения CRLF/LF — они безопасны.

