# ELVEUM Design System Migration — Инструкции для Claude Code

## Контекст проекта

**Проект:** ELVEUM — платформа для бьюти-индустрии Узбекистана  
**Стек:** React 18 + Vite 5 + TypeScript 5 + Tailwind CSS  
**Архитектура:** Feature-Sliced Design (FSD)  
**Текущее состояние:** Агрегатор с календарём, базовая типографика (Manrope/Inter/JetBrains Mono)

---

## Задача

Полностью заменить текущую дизайн-систему на **Slate Minimal** с новой типографикой:
- **Цвета:** Slate (серые) + Teal (success) + Rose (error) + Orange (warning)
- **Шрифты:** Satoshi (заголовки) + Inter (всё остальное, включая цифры с tabular-nums)
- **Отступы:** Система 4px base
- **Тени:** 5 уровней
- **Радиусы:** От 4px до 24px

---

## Шаг 1: Установка шрифтов

### 1.1 Добавить Satoshi через Fontshare API

**Файл:** `index.html`

```html
<head>
  <!-- Другие meta теги -->
  
  <!-- Fonts -->
  <link href="https://api.fontshare.com/v2/css?f[]=satoshi@700,800,900&display=swap" rel="stylesheet">
  
  <!-- Остальные ссылки -->
</head>
```

### 1.2 Обновить Google Fonts для Inter

**Файл:** `index.html`

Заменить текущий импорт Inter на:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 1.3 Удалить импорты старых шрифтов

Найти и удалить:
- Импорты Manrope (если есть)
- Импорты JetBrains Mono (если есть)

---

## Шаг 2: Обновить Tailwind конфигурацию

**Файл:** `tailwind.config.js` или `tailwind.config.ts`

Заменить секцию `theme.extend` на:

```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ===== ЦВЕТА =====
      colors: {
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
        },
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
      },

      // ===== ШРИФТЫ =====
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Satoshi', 'sans-serif'],
      },

      // ===== ОТСТУПЫ =====
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
      },

      // ===== РАДИУСЫ =====
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },

      // ===== ТЕНИ =====
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
```

---

## Шаг 3: Создать CSS Variables (дополнительно)

**Файл:** `src/app/styles/globals.css` или `src/shared/styles/globals.css`

Добавить в начало файла:

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@layer base {
  :root {
    /* ===== ЦВЕТА - SLATE ===== */
    --slate-50: #f8fafc;
    --slate-100: #f1f5f9;
    --slate-200: #e2e8f0;
    --slate-300: #cbd5e1;
    --slate-400: #94a3b8;
    --slate-500: #64748b;
    --slate-600: #475569;
    --slate-700: #334155;
    --slate-800: #1e293b;
    --slate-900: #0f172a;

    /* ===== ЦВЕТА - SUCCESS (TEAL) ===== */
    --teal-50: #f0fdfa;
    --teal-100: #ccfbf1;
    --teal-500: #14b8a6;
    --teal-600: #0d9488;
    --teal-700: #0f766e;

    /* ===== ЦВЕТА - ERROR (ROSE) ===== */
    --rose-50: #fff1f2;
    --rose-100: #ffe4e6;
    --rose-500: #f43f5e;
    --rose-600: #e11d48;

    /* ===== ЦВЕТА - WARNING (ORANGE) ===== */
    --orange-50: #fff7ed;
    --orange-100: #ffedd5;
    --orange-400: #fb923c;
    --orange-500: #f97316;

    /* ===== ШРИФТЫ ===== */
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-display: 'Satoshi', sans-serif;
  }

  /* Базовые стили для body */
  body {
    @apply font-sans text-slate-700 bg-slate-50;
    font-variant-numeric: tabular-nums;
  }

  /* Заголовки используют Satoshi */
  h1, h2, h3, h4, h5, h6 {
    @apply font-display text-slate-900;
  }

  /* Цифры с выравниванием */
  .tabular-nums {
    font-variant-numeric: tabular-nums;
  }
}
```

---

## Шаг 4: Создать типографическую шкалу

**Файл:** `src/shared/config/typography.ts` (создать если нет)

```typescript
export const typography = {
  display: {
    large: 'font-display text-5xl font-black leading-tight', // 48px / 900
    medium: 'font-display text-4xl font-black leading-tight', // 36px / 900
  },
  heading: {
    h1: 'font-display text-3xl font-extrabold leading-snug', // 32px / 800
    h2: 'font-display text-2xl font-extrabold leading-snug', // 24px / 800
    h3: 'font-display text-xl font-bold leading-normal', // 20px / 700
    h4: 'font-display text-lg font-bold leading-normal', // 18px / 700
  },
  body: {
    large: 'text-base font-normal leading-relaxed', // 16px / 400
    medium: 'text-sm font-normal leading-relaxed', // 14px / 400
    small: 'text-xs font-normal leading-normal', // 13px / 400
  },
  caption: 'text-xs font-medium leading-tight', // 12px / 500
  numbers: 'tabular-nums font-semibold', // tabular + 600
} as const;

export type TypographyVariant = keyof typeof typography;
```

---

## Шаг 5: Создать систему цветов

**Файл:** `src/shared/config/colors.ts` (создать если нет)

```typescript
export const colors = {
  // Основные серые
  background: {
    primary: 'bg-slate-50',
    secondary: 'bg-slate-100',
    tertiary: 'bg-white',
  },
  
  // Текст
  text: {
    primary: 'text-slate-900',
    secondary: 'text-slate-700',
    tertiary: 'text-slate-500',
    disabled: 'text-slate-400',
  },

  // Границы
  border: {
    light: 'border-slate-200',
    medium: 'border-slate-300',
    dark: 'border-slate-400',
  },

  // Семантические цвета
  semantic: {
    success: {
      bg: 'bg-teal-50',
      text: 'text-teal-700',
      border: 'border-teal-500',
      solid: 'bg-teal-500 text-white',
    },
    error: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-500',
      solid: 'bg-rose-500 text-white',
    },
    warning: {
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      border: 'border-orange-400',
      solid: 'bg-orange-400 text-white',
    },
    info: {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-300',
      solid: 'bg-slate-800 text-white',
    },
  },

  // Акценты (primary actions)
  primary: {
    bg: 'bg-slate-900',
    hover: 'hover:bg-slate-800',
    text: 'text-white',
    outline: 'border-slate-900 text-slate-900',
  },
} as const;
```

---

## Шаг 6: Обновить компоненты UI

### 6.1 Button Component

**Файл:** `src/shared/ui/Button/Button.tsx` (или аналогичный)

```tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/lib/utils'; // или твоя утилита для className

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variants = {
      primary: 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900',
      secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-500',
      success: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500',
      danger: 'bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-500',
      ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### 6.2 Badge Component

**Файл:** `src/shared/ui/Badge/Badge.tsx` (создать)

```tsx
import { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'neutral';
}

export const Badge = ({ className, variant = 'neutral', children, ...props }: BadgeProps) => {
  const variants = {
    success: 'bg-teal-100 text-teal-700',
    warning: 'bg-orange-100 text-orange-700',
    error: 'bg-rose-100 text-rose-700',
    neutral: 'bg-slate-100 text-slate-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
```

### 6.3 Input Component

**Файл:** `src/shared/ui/Input/Input.tsx` (обновить)

```tsx
import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full px-4 py-2 rounded-md border transition-all duration-200',
          'text-sm text-slate-900 placeholder:text-slate-400',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          error
            ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
            : 'border-slate-300 focus:border-slate-900 focus:ring-slate-900',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
```

### 6.4 Card Component

**Файл:** `src/shared/ui/Card/Card.tsx` (создать)

```tsx
import { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
}

export const Card = ({ className, variant = 'default', children, ...props }: CardProps) => {
  const variants = {
    default: 'bg-white border border-slate-200',
    bordered: 'bg-slate-50 border border-slate-300',
    elevated: 'bg-white shadow-md',
  };

  return (
    <div
      className={cn('rounded-lg p-6', variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
};
```

---

## Шаг 7: Миграция существующих компонентов

### 7.1 Найти все компоненты с цветами

Найти и заменить в **всех файлах** проекта:

**Старые цвета → Новые:**
```
purple-600 → slate-900
purple-500 → slate-800
blue-600 → teal-500
green-600 → teal-500
red-600 → rose-500
yellow-600 → orange-400
gray-* → slate-*
```

### 7.2 Обновить шрифты в компонентах

Найти в проекте:
- `font-sans` должен остаться (это уже Inter)
- Любые упоминания `Manrope` → заменить на `font-display` (Satoshi)
- Любые `font-mono` или `JetBrains Mono` → заменить на `font-sans tabular-nums`

### 7.3 Обновить типографику заголовков

Найти все заголовки и применить новые стили:

```tsx
// Было:
<h1 className="text-2xl font-bold">

// Стало:
<h1 className="font-display text-3xl font-extrabold text-slate-900">
```

### 7.4 Обновить отображение цифр

Найти все места с ценами/числами и добавить `tabular-nums`:

```tsx
// Было:
<span className="text-lg font-semibold">45 000 ₽</span>

// Стало:
<span className="tabular-nums text-lg font-semibold">45 000 ₽</span>
```

---

## Шаг 8: Обновить календарь

**Файл:** Компоненты календаря в `src/widgets/Calendar/` или аналог

### 8.1 Плашки визитов (visit cards)

```tsx
// Пример обновленной плашки визита
<div className="bg-teal-50 border-l-4 border-teal-500 rounded-md p-3">
  <div className="flex items-center justify-between mb-2">
    <span className="text-xs font-semibold text-teal-700 tabular-nums">
      14:30 - 15:30
    </span>
    <Badge variant="success">Подтверждено</Badge>
  </div>
  <div className="font-semibold text-sm text-slate-900 mb-1">
    Анна Иванова
  </div>
  <div className="text-xs text-slate-600">
    Стрижка • Мастер: Петров А.
  </div>
</div>
```

### 8.2 Сетка календаря

Обновить цвета линий и фонов:

```tsx
// Линии сетки
className="border-slate-200"

// Фон текущего времени
className="bg-teal-50"

// Фон выходных
className="bg-slate-100"

// Hover состояния
className="hover:bg-slate-50"
```

---

## Шаг 9: Обновить навигацию и сайдбар

### 9.1 Sidebar

```tsx
// Фон сайдбара
className="bg-white border-r border-slate-200"

// Активный элемент меню
className="bg-slate-900 text-white"

// Неактивный элемент
className="text-slate-700 hover:bg-slate-100"
```

### 9.2 Top Navigation

```tsx
// Фон навбара
className="bg-white border-b border-slate-200 shadow-sm"

// Кнопки навбара
<Button variant="ghost" size="sm">...</Button>
```

---

## Шаг 10: Проверка и тестирование

### Чеклист проверки:

- [ ] Шрифты загружаются корректно (проверить в DevTools → Network)
- [ ] Satoshi применяется к заголовкам (H1-H6)
- [ ] Inter применяется к тексту
- [ ] Цифры выровнены (tabular-nums) в таблицах/прайсах
- [ ] Цвета slate заменили старые gray/purple
- [ ] Semantic colors (teal/rose/orange) используются для статусов
- [ ] Кнопки имеют правильные варианты (primary = slate-900)
- [ ] Календарь использует новые цвета
- [ ] Все компоненты адаптивны (responsive)
- [ ] Нет консольных ошибок

---

## Шаг 11: Очистка

Удалить все упоминания:
- Старых цветовых схем (если были custom)
- Импортов Manrope
- Импортов JetBrains Mono
- Старых CSS переменных (если конфликтуют)

---

## Дополнительные утилиты

### Утилита для className (если нет)

**Файл:** `src/shared/lib/utils.ts` (создать)

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Установить зависимости:
```bash
npm install clsx tailwind-merge
```

---

## Приоритеты выполнения

1. **Критично:** Шаги 1-3 (шрифты, Tailwind config, CSS variables)
2. **Важно:** Шаги 4-6 (типографика, цвета, базовые компоненты)
3. **Средне:** Шаги 7-9 (миграция существующих компонентов)
4. **Низко:** Шаги 10-11 (тестирование, очистка)

---

## Контакты для вопросов

Если что-то непонятно или нужны уточнения — спрашивай в процессе выполнения.

---

## Финальная проверка

После выполнения всех шагов проект должен:
✅ Использовать Satoshi для заголовков
✅ Использовать Inter для текста и цифр
✅ Иметь Slate Minimal палитру
✅ Быть консистентным во всех компонентах
✅ Работать без ошибок
✅ Выглядеть премиально и современно

**Удачи! 🚀**
