# ELVEUM Design System — Шпаргалка замен

Быстрый справочник для миграции компонентов на новую дизайн-систему.

---

## 🎨 Цвета: Быстрая замена

### Основные цвета
```
gray-50   → slate-50
gray-100  → slate-100
gray-200  → slate-200
gray-300  → slate-300
gray-400  → slate-400
gray-500  → slate-500
gray-600  → slate-600
gray-700  → slate-700
gray-800  → slate-800
gray-900  → slate-900
```

### Акцентные цвета
```
purple-500    → slate-900     (primary actions)
purple-600    → slate-900     (primary actions)
blue-500      → teal-500      (success/info)
green-500     → teal-500      (success)
red-500       → rose-500      (error/danger)
yellow-500    → orange-400    (warning)
```

### Фоны
```
bg-gray-50    → bg-slate-50
bg-gray-100   → bg-slate-100
bg-white      → bg-white (оставить)
```

### Текст
```
text-gray-900 → text-slate-900
text-gray-700 → text-slate-700
text-gray-600 → text-slate-600
text-gray-500 → text-slate-500
text-gray-400 → text-slate-400
```

### Границы
```
border-gray-200 → border-slate-200
border-gray-300 → border-slate-300
```

---

## ✍️ Типографика: Паттерны замены

### Заголовки

```tsx
// БЫЛО:
<h1 className="text-3xl font-bold text-gray-900">

// СТАЛО:
<h1 className="font-display text-3xl font-extrabold text-slate-900">
```

```tsx
// БЫЛО:
<h2 className="text-2xl font-semibold">

// СТАЛО:
<h2 className="font-display text-2xl font-extrabold text-slate-900">
```

```tsx
// БЫЛО:
<h3 className="text-xl font-medium">

// СТАЛО:
<h3 className="font-display text-xl font-bold text-slate-900">
```

### Основной текст

```tsx
// БЫЛО:
<p className="text-base text-gray-700">

// СТАЛО:
<p className="text-base text-slate-700">
```

```tsx
// БЫЛО:
<span className="text-sm text-gray-600">

// СТАЛО:
<span className="text-sm text-slate-600">
```

### Цифры и цены

```tsx
// БЫЛО:
<span className="text-lg font-mono font-semibold">45 000 ₽</span>

// СТАЛО:
<span className="tabular-nums text-lg font-semibold">45 000 ₽</span>
```

```tsx
// БЫЛО:
<div className="font-mono text-2xl">1 250 000</div>

// СТАЛО:
<div className="tabular-nums text-2xl font-bold">1 250 000</div>
```

### Лейблы и caption

```tsx
// БЫЛО:
<span className="text-xs text-gray-500">

// СТАЛО:
<span className="text-xs font-medium text-slate-500">
```

---

## 🔘 Кнопки: Варианты

### Primary (главные действия)

```tsx
// БЫЛО:
<button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">

// СТАЛО:
<button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-md font-semibold transition-all">
```

### Secondary

```tsx
// БЫЛО:
<button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">

// СТАЛО:
<button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md font-semibold transition-all">
```

### Success

```tsx
// БЫЛО:
<button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">

// СТАЛО:
<button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md font-semibold transition-all">
```

### Danger

```tsx
// БЫЛО:
<button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">

// СТАЛО:
<button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md font-semibold transition-all">
```

### Ghost (прозрачная)

```tsx
// БЫЛО:
<button className="bg-transparent hover:bg-gray-100 text-gray-700 px-4 py-2 rounded">

// СТАЛО:
<button className="bg-transparent hover:bg-slate-100 text-slate-700 px-4 py-2 rounded-md font-semibold transition-all">
```

---

## 🏷️ Badges (бейджи)

### Success

```tsx
// БЫЛО:
<span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">

// СТАЛО:
<span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-md text-xs font-semibold">
```

### Warning

```tsx
// БЫЛО:
<span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">

// СТАЛО:
<span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-md text-xs font-semibold">
```

### Error

```tsx
// БЫЛО:
<span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">

// СТАЛО:
<span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-md text-xs font-semibold">
```

### Neutral

```tsx
// БЫЛО:
<span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">

// СТАЛО:
<span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-md text-xs font-semibold">
```

---

## 📝 Inputs (поля ввода)

### Default

```tsx
// БЫЛО:
<input className="border border-gray-300 rounded px-3 py-2 w-full" />

// СТАЛО:
<input className="border border-slate-300 rounded-md px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all" />
```

### With Error

```tsx
// БЫЛО:
<input className="border border-red-300 rounded px-3 py-2 w-full" />

// СТАЛО:
<input className="border border-rose-300 rounded-md px-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all" />
```

---

## 📦 Cards (карточки)

### Default Card

```tsx
// БЫЛО:
<div className="bg-white border border-gray-200 rounded-lg p-6">

// СТАЛО:
<div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
```

### Elevated Card

```tsx
// БЫЛО:
<div className="bg-white rounded-lg p-6 shadow">

// СТАЛО:
<div className="bg-white rounded-lg p-6 shadow-md">
```

### Accent Card (например, для визита)

```tsx
// БЫЛО:
<div className="bg-blue-50 border-l-4 border-blue-500 rounded p-4">

// СТАЛО:
<div className="bg-teal-50 border-l-4 border-teal-500 rounded-md p-4">
```

---

## 🚨 Alerts

### Success Alert

```tsx
// БЫЛО:
<div className="bg-green-50 border border-green-200 rounded p-4">
  <span className="text-green-800">Успешно!</span>
</div>

// СТАЛО:
<div className="bg-teal-50 border-l-4 border-teal-500 rounded-md p-4">
  <span className="text-teal-700 font-semibold">Успешно!</span>
</div>
```

### Error Alert

```tsx
// БЫЛО:
<div className="bg-red-50 border border-red-200 rounded p-4">
  <span className="text-red-800">Ошибка!</span>
</div>

// СТАЛО:
<div className="bg-rose-50 border-l-4 border-rose-500 rounded-md p-4">
  <span className="text-rose-700 font-semibold">Ошибка!</span>
</div>
```

### Warning Alert

```tsx
// БЫЛО:
<div className="bg-yellow-50 border border-yellow-200 rounded p-4">
  <span className="text-yellow-800">Внимание!</span>
</div>

// СТАЛО:
<div className="bg-orange-50 border-l-4 border-orange-400 rounded-md p-4">
  <span className="text-orange-700 font-semibold">Внимание!</span>
</div>
```

---

## 📅 Календарь: Специфичные паттерны

### Плашка визита (подтверждённого)

```tsx
// БЫЛО:
<div className="bg-blue-50 border-l-4 border-blue-500 rounded p-3">
  <div className="text-blue-900 font-semibold">Анна Иванова</div>
  <div className="text-blue-700 text-sm">Стрижка</div>
</div>

// СТАЛО:
<div className="bg-teal-50 border-l-4 border-teal-500 rounded-md p-3">
  <div className="text-slate-900 font-semibold">Анна Иванова</div>
  <div className="text-slate-600 text-sm">Стрижка</div>
</div>
```

### Время слота

```tsx
// БЫЛО:
<span className="font-mono text-sm">14:30</span>

// СТАЛО:
<span className="tabular-nums text-sm font-semibold text-teal-700">14:30</span>
```

### Линии сетки

```tsx
// БЫЛО:
<div className="border-gray-200">

// СТАЛО:
<div className="border-slate-200">
```

### Hover состояние слота

```tsx
// БЫЛО:
<div className="hover:bg-gray-100">

// СТАЛО:
<div className="hover:bg-slate-50 transition-colors">
```

---

## 🧭 Навигация и Sidebar

### Активный элемент меню

```tsx
// БЫЛО:
<a className="bg-purple-600 text-white px-4 py-2 rounded">

// СТАЛО:
<a className="bg-slate-900 text-white px-4 py-2 rounded-md font-semibold">
```

### Неактивный элемент меню

```tsx
// БЫЛО:
<a className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded">

// СТАЛО:
<a className="text-slate-700 hover:bg-slate-100 px-4 py-2 rounded-md transition-colors">
```

### Sidebar фон

```tsx
// БЫЛО:
<aside className="bg-gray-50 border-r border-gray-200">

// СТАЛО:
<aside className="bg-white border-r border-slate-200">
```

### Top navigation

```tsx
// БЫЛО:
<nav className="bg-white border-b border-gray-200 shadow-sm">

// СТАЛО:
<nav className="bg-white border-b border-slate-200 shadow-sm">
```

---

## 🎭 Тени (Shadows)

```
shadow-sm    → без изменений (или уточнить)
shadow       → shadow (0 1px 3px rgba(0,0,0,0.1))
shadow-md    → shadow-md (0 4px 6px rgba(0,0,0,0.1))
shadow-lg    → shadow-lg (0 10px 15px rgba(0,0,0,0.1))
shadow-xl    → shadow-xl (0 20px 25px rgba(0,0,0,0.1))
```

---

## 📐 Радиусы (Border Radius)

```
rounded      → rounded-md (6px)
rounded-sm   → rounded-sm (4px)
rounded-lg   → rounded-lg (12px)
rounded-xl   → rounded-xl (16px)
rounded-2xl  → rounded-2xl (24px)
```

---

## 💡 Общие правила

1. **Всегда добавляй transition:**
   - Для кнопок: `transition-all duration-200`
   - Для ховеров: `transition-colors duration-200`

2. **Цифры всегда с tabular-nums:**
   - Цены, суммы, телефоны, время → добавь `tabular-nums`

3. **Заголовки всегда с font-display:**
   - H1-H6 → используй `font-display` (Satoshi)

4. **Focus states:**
   - Добавляй `focus:outline-none focus:ring-2 focus:ring-slate-900`

5. **Font weights для Satoshi:**
   - Display: 900 (font-black)
   - H1-H2: 800 (font-extrabold)
   - H3-H4: 700 (font-bold)

---

## 🔍 Regex для поиска и замены

### VS Code / Claude Code

Найти старые gray классы:
```regex
(gray-)(50|100|200|300|400|500|600|700|800|900)
```

Заменить на:
```
slate-$2
```

Найти font-mono:
```regex
font-mono
```

Заменить на:
```
tabular-nums
```

---

## ✅ Быстрый чеклист

После замены в файле, проверь:
- [ ] Нет упоминаний `gray-*` (кроме legacy кода)
- [ ] Нет `font-mono` или `JetBrains Mono`
- [ ] Все заголовки используют `font-display`
- [ ] Цифры имеют `tabular-nums`
- [ ] Semantic colors (teal/rose/orange) для статусов
- [ ] Primary actions используют `slate-900`
- [ ] Все интерактивные элементы имеют `transition`

---

**Сохрани этот файл — он пригодится на протяжении всей миграции! 📋**
