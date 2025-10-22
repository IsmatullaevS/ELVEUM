# 🚀 Quick Start — Design System Migration

**Claude Code, начни с этого файла!**

Это главная инструкция по миграции дизайн-системы проекта ELVEUM на Slate Minimal.

---

## 📋 Что нужно сделать

Заменить текущую дизайн-систему на новую:
- **Старые цвета:** Gray, Purple, Blue, Green, Red, Yellow
- **Новые цвета:** Slate, Teal, Rose, Orange
- **Старые шрифты:** Manrope (заголовки), JetBrains Mono (цифры)
- **Новые шрифты:** Satoshi (заголовки), Inter (текст + цифры с tabular-nums)

---

## 📚 Документация

В директории находятся 4 файла:

1. **DESIGN_MIGRATION_INSTRUCTIONS.md** — полная инструкция (читай для деталей)
2. **DESIGN_CHEATSHEET.md** — быстрый справочник замен (используй постоянно)
3. **MIGRATION_EXAMPLES.md** — примеры компонентов до/после (reference при работе)
4. **README_QUICK_START.md** — этот файл (начало работы)

---

## ⚡ Порядок действий

### Этап 1: Подготовка (5 мин)
```bash
# 1. Прочитай эти файлы по порядку:
# - DESIGN_MIGRATION_INSTRUCTIONS.md (шаги 1-3)
# - DESIGN_CHEATSHEET.md (весь файл)

# 2. Открой проект и найди:
# - index.html
# - tailwind.config.js (или .ts)
# - src/app/styles/globals.css (или аналог)
```

### Этап 2: Базовые изменения (15 мин)
```bash
# 3. Обнови index.html — добавь Satoshi font
# 4. Обнови tailwind.config.js — замени theme.extend
# 5. Обнови globals.css — добавь CSS variables
```

### Этап 3: Компоненты UI (30 мин)
```bash
# 6. Создай базовые компоненты в src/shared/ui/:
# - Button.tsx
# - Badge.tsx
# - Input.tsx
# - Card.tsx

# 7. Создай конфиги в src/shared/config/:
# - typography.ts
# - colors.ts
```

### Этап 4: Миграция существующих компонентов (60+ мин)
```bash
# 8. Начни с самых важных компонентов:
# - Календарь (src/widgets/Calendar/)
# - Навигация (src/widgets/Sidebar/ или Navigation/)
# - Дашборд (src/widgets/Dashboard/)

# 9. Используй DESIGN_CHEATSHEET.md для замен
# 10. Смотри MIGRATION_EXAMPLES.md для паттернов
```

---

## 🎯 Приоритеты

**Сначала сделай это:**
1. ✅ Установка шрифтов (index.html)
2. ✅ Обновление Tailwind config
3. ✅ Создание базовых UI компонентов
4. ✅ Миграция календаря (самый видимый модуль)
5. ✅ Миграция навигации/sidebar

**Потом это:**
6. ⚠️ Остальные виджеты
7. ⚠️ Формы
8. ⚠️ Модальные окна
9. ⚠️ Уведомления

**В конце:**
10. 🔧 Рефакторинг дублирующегося кода
11. 🔧 Тестирование
12. 🔧 Оптимизация

---

## 🔍 Как найти что менять

### Поиск по файлам (используй VS Code/grep):

```bash
# Найти все упоминания старых цветов:
gray-50, gray-100, gray-200, ... gray-900
purple-500, purple-600
blue-500, blue-600
green-500, green-600
red-500, red-600
yellow-500, yellow-600

# Найти старые шрифты:
font-mono
JetBrains Mono
Manrope

# Найти компоненты с кнопками:
<button
className.*bg-purple
className.*bg-blue

# Найти формы:
<input
type="text"
type="tel"
```

---

## 🚨 Частые ошибки (не делай так)

❌ **Не удаляй сразу старые цвета** — делай постепенно
❌ **Не забывай про tabular-nums** для цифр
❌ **Не используй purple/blue** для primary — только slate-900
❌ **Не забывай transition** для интерактивных элементов
❌ **Не делай компоненты в лоб** — используй готовые Button/Badge/Input

---

## ✅ Проверка прогресса

После каждого этапа проверяй:

### После Этапа 2:
```bash
# Открой браузер DevTools → Network
# Должны загружаться:
✓ Satoshi (от fontshare.com)
✓ Inter (от fonts.googleapis.com)
```

### После Этапа 3:
```bash
# Создай тестовую страницу с компонентами:
<Button variant="primary">Test</Button>
<Badge variant="success">Test</Badge>
<Input placeholder="Test" />

# Все должно рендериться без ошибок
```

### После Этапа 4:
```bash
# Открой календарь — визиты должны быть:
✓ Teal для confirmed
✓ Orange для pending
✓ Rose для cancelled
✓ Цифры времени с tabular-nums
```

---

## 💡 Полезные команды

```bash
# Найти все файлы с компонентами
find src -name "*.tsx" -o -name "*.ts"

# Найти все упоминания gray-
grep -r "gray-" src/

# Найти все button элементы
grep -r "<button" src/

# Найти все шрифты
grep -r "font-mono\|JetBrains\|Manrope" src/
```

---

## 📞 Если что-то непонятно

1. Посмотри **MIGRATION_EXAMPLES.md** — там готовые паттерны
2. Проверь **DESIGN_CHEATSHEET.md** — там все замены
3. Читай **DESIGN_MIGRATION_INSTRUCTIONS.md** — там детали

---

## 🎨 Итоговая проверка

Когда закончишь миграцию, проект должен:

✅ Использовать Satoshi для всех заголовков (H1-H6)
✅ Использовать Inter для всего текста
✅ Использовать tabular-nums для всех цифр
✅ Иметь slate-900 для primary actions
✅ Иметь teal/rose/orange для success/error/warning
✅ Не содержать упоминаний gray/purple/blue/green/red/yellow (кроме legacy)
✅ Иметь transitions на интерактивных элементах
✅ Быть консистентным во всех компонентах

---

## 🚀 Начинай!

**Первый шаг:** Открой **DESIGN_MIGRATION_INSTRUCTIONS.md** и начинай с Шага 1.

**Держи открытым:** **DESIGN_CHEATSHEET.md** — он понадобится постоянно.

**Удачи! Дизайн станет 🔥**
