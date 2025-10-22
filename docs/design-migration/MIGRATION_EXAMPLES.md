# Примеры миграции компонентов — ELVEUM

Этот файл показывает реальные примеры компонентов ДО и ПОСЛЕ миграции на Slate Minimal design system.

---

## Пример 1: Visit Card (Плашка визита в календаре)

### ❌ БЫЛО (старый дизайн):

```tsx
// src/widgets/Calendar/ui/VisitCard.tsx

import { FC } from 'react';

interface VisitCardProps {
  clientName: string;
  service: string;
  startTime: string;
  endTime: string;
  price: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export const VisitCard: FC<VisitCardProps> = ({
  clientName,
  service,
  startTime,
  endTime,
  price,
  status,
}) => {
  const statusColors = {
    confirmed: 'bg-green-50 border-green-500 text-green-900',
    pending: 'bg-yellow-50 border-yellow-500 text-yellow-900',
    cancelled: 'bg-red-50 border-red-500 text-red-900',
  };

  return (
    <div className={`border-l-4 rounded p-3 ${statusColors[status]}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-xs">
          {startTime} - {endTime}
        </span>
        <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">
          {status}
        </span>
      </div>
      <div className="font-bold text-sm mb-1">{clientName}</div>
      <div className="text-xs text-gray-600 mb-2">{service}</div>
      <div className="font-mono font-semibold text-base">
        {price.toLocaleString()} ₽
      </div>
    </div>
  );
};
```

### ✅ СТАЛО (новый дизайн):

```tsx
// src/widgets/Calendar/ui/VisitCard.tsx

import { FC } from 'react';
import { Badge } from '@/shared/ui/Badge';

interface VisitCardProps {
  clientName: string;
  service: string;
  startTime: string;
  endTime: string;
  price: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export const VisitCard: FC<VisitCardProps> = ({
  clientName,
  service,
  startTime,
  endTime,
  price,
  status,
}) => {
  const statusConfig = {
    confirmed: {
      bg: 'bg-teal-50',
      border: 'border-teal-500',
      badge: 'success' as const,
    },
    pending: {
      bg: 'bg-orange-50',
      border: 'border-orange-400',
      badge: 'warning' as const,
    },
    cancelled: {
      bg: 'bg-rose-50',
      border: 'border-rose-500',
      badge: 'error' as const,
    },
  };

  const config = statusConfig[status];

  return (
    <div className={`${config.bg} border-l-4 ${config.border} rounded-md p-3 transition-all hover:shadow-md`}>
      <div className="flex justify-between items-center mb-2">
        <span className="tabular-nums text-xs font-semibold text-slate-700">
          {startTime} - {endTime}
        </span>
        <Badge variant={config.badge}>{status}</Badge>
      </div>
      <div className="font-semibold text-sm text-slate-900 mb-1">
        {clientName}
      </div>
      <div className="text-xs text-slate-600 mb-2">{service}</div>
      <div className="tabular-nums font-semibold text-base text-slate-900">
        {price.toLocaleString()} ₽
      </div>
    </div>
  );
};
```

**Ключевые изменения:**
- ✅ `green-*` → `teal-*`
- ✅ `yellow-*` → `orange-*`
- ✅ `red-*` → `rose-*`
- ✅ `gray-*` → `slate-*`
- ✅ `font-mono` → `tabular-nums`
- ✅ Добавлен `transition-all hover:shadow-md`
- ✅ Используется компонент `Badge`
- ✅ Улучшена типизация статусов

---

## Пример 2: Dashboard Widget (Виджет дашборда)

### ❌ БЫЛО:

```tsx
// src/widgets/Dashboard/ui/RevenueWidget.tsx

import { FC } from 'react';

interface RevenueWidgetProps {
  revenue: number;
  growth: number;
}

export const RevenueWidget: FC<RevenueWidgetProps> = ({ revenue, growth }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="text-sm text-gray-500 mb-2">Выручка за месяц</div>
      <div className="flex items-end justify-between mb-4">
        <div className="font-mono text-3xl font-bold">
          {revenue.toLocaleString()} ₽
        </div>
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
          +{growth}%
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-green-500" 
          style={{ width: `${growth}%` }}
        />
      </div>
    </div>
  );
};
```

### ✅ СТАЛО:

```tsx
// src/widgets/Dashboard/ui/RevenueWidget.tsx

import { FC } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';

interface RevenueWidgetProps {
  revenue: number;
  growth: number;
}

export const RevenueWidget: FC<RevenueWidgetProps> = ({ revenue, growth }) => {
  return (
    <Card variant="elevated" className="hover:shadow-lg transition-shadow">
      <div className="text-xs font-medium text-slate-500 mb-2">
        Выручка за месяц
      </div>
      <div className="flex items-end justify-between mb-4">
        <div className="tabular-nums text-3xl font-bold text-slate-900">
          {revenue.toLocaleString()} ₽
        </div>
        <Badge variant="success">+{growth}%</Badge>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-teal-500 transition-all duration-500" 
          style={{ width: `${growth}%` }}
        />
      </div>
    </Card>
  );
};
```

**Ключевые изменения:**
- ✅ Используется компонент `Card`
- ✅ `font-mono` → `tabular-nums`
- ✅ `gray-*` → `slate-*`
- ✅ `green-500` → `teal-500`
- ✅ Добавлены transition эффекты
- ✅ Используется компонент `Badge`

---

## Пример 3: Client List Item (Элемент списка клиентов)

### ❌ БЫЛО:

```tsx
// src/entities/Client/ui/ClientListItem.tsx

import { FC } from 'react';

interface ClientListItemProps {
  name: string;
  phone: string;
  visitsCount: number;
  avatar?: string;
}

export const ClientListItem: FC<ClientListItemProps> = ({
  name,
  phone,
  visitsCount,
  avatar,
}) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
      {avatar ? (
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
      ) : (
        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
          {initials}
        </div>
      )}
      <div className="flex-1">
        <div className="font-semibold text-gray-900">{name}</div>
        <div className="text-sm text-gray-500 font-mono">{phone}</div>
      </div>
      <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
        {visitsCount} визитов
      </div>
    </div>
  );
};
```

### ✅ СТАЛО:

```tsx
// src/entities/Client/ui/ClientListItem.tsx

import { FC } from 'react';
import { Badge } from '@/shared/ui/Badge';

interface ClientListItemProps {
  name: string;
  phone: string;
  visitsCount: number;
  avatar?: string;
}

export const ClientListItem: FC<ClientListItemProps> = ({
  name,
  phone,
  visitsCount,
  avatar,
}) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex items-center gap-3 p-4 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
      {avatar ? (
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
      ) : (
        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
          {initials}
        </div>
      )}
      <div className="flex-1">
        <div className="font-semibold text-sm text-slate-900">{name}</div>
        <div className="tabular-nums text-xs text-slate-500">{phone}</div>
      </div>
      <Badge variant="neutral">{visitsCount} визитов</Badge>
    </div>
  );
};
```

**Ключевые изменения:**
- ✅ `purple-600` → `slate-900` (для аватара)
- ✅ `gray-*` → `slate-*`
- ✅ `font-mono` → `tabular-nums` (для телефона)
- ✅ Добавлен `transition-colors`
- ✅ Используется компонент `Badge`

---

## Пример 4: Action Button (Кнопка действия)

### ❌ БЫЛО:

```tsx
// src/features/CreateAppointment/ui/CreateButton.tsx

import { FC } from 'react';

interface CreateButtonProps {
  onClick: () => void;
  loading?: boolean;
}

export const CreateButton: FC<CreateButtonProps> = ({ onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Загрузка...' : 'Записать клиента'}
    </button>
  );
};
```

### ✅ СТАЛО:

```tsx
// src/features/CreateAppointment/ui/CreateButton.tsx

import { FC } from 'react';
import { Button } from '@/shared/ui/Button';

interface CreateButtonProps {
  onClick: () => void;
  loading?: boolean;
}

export const CreateButton: FC<CreateButtonProps> = ({ onClick, loading }) => {
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      variant="primary"
      size="lg"
    >
      {loading ? 'Загрузка...' : 'Записать клиента'}
    </Button>
  );
};
```

**Ключевые изменения:**
- ✅ Используется готовый компонент `Button`
- ✅ Автоматически применяется `slate-900` для primary
- ✅ Все transition и focus states из компонента
- ✅ Код стал короче и консистентнее

---

## Пример 5: Form Input with Label

### ❌ БЫЛО:

```tsx
// src/features/CreateClient/ui/ClientForm.tsx

import { FC } from 'react';

export const ClientForm: FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Имя клиента
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
          placeholder="Введите имя..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Телефон
        </label>
        <input
          type="tel"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 font-mono"
          placeholder="+998 XX XXX-XX-XX"
        />
      </div>
    </div>
  );
};
```

### ✅ СТАЛО:

```tsx
// src/features/CreateClient/ui/ClientForm.tsx

import { FC } from 'react';
import { Input } from '@/shared/ui/Input';

export const ClientForm: FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Имя клиента
        </label>
        <Input
          type="text"
          placeholder="Введите имя..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Телефон
        </label>
        <Input
          type="tel"
          placeholder="+998 XX XXX-XX-XX"
          className="tabular-nums"
        />
      </div>
    </div>
  );
};
```

**Ключевые изменения:**
- ✅ Используется компонент `Input`
- ✅ `gray-*` → `slate-*`
- ✅ `font-mono` → `tabular-nums` через className
- ✅ Focus states автоматически применяются
- ✅ Убран `focus:border-purple-500` (используется `slate-900`)

---

## Пример 6: Header/Page Title

### ❌ БЫЛО:

```tsx
// src/pages/Clients/ui/ClientsPage.tsx

import { FC } from 'react';

export const ClientsPage: FC = () => {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          База клиентов
        </h1>
        <p className="text-gray-600">
          Управляйте информацией о ваших клиентах
        </p>
      </div>
      {/* Rest of content */}
    </div>
  );
};
```

### ✅ СТАЛО:

```tsx
// src/pages/Clients/ui/ClientsPage.tsx

import { FC } from 'react';

export const ClientsPage: FC = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-extrabold text-slate-900 mb-2">
          База клиентов
        </h1>
        <p className="text-base text-slate-600">
          Управляйте информацией о ваших клиентах
        </p>
      </div>
      {/* Rest of content */}
    </div>
  );
};
```

**Ключевые изменения:**
- ✅ Добавлен `font-display` (Satoshi)
- ✅ `font-bold` → `font-extrabold` (800)
- ✅ `text-3xl` → `text-4xl` (более выразительно)
- ✅ `gray-*` → `slate-*`
- ✅ Увеличен отступ `mb-6` → `mb-8`

---

## Пример 7: Navigation Menu Item

### ❌ БЫЛО:

```tsx
// src/widgets/Sidebar/ui/MenuItem.tsx

import { FC } from 'react';
import { Link } from 'react-router-dom';

interface MenuItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

export const MenuItem: FC<MenuItemProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg
        ${isActive 
          ? 'bg-purple-600 text-white' 
          : 'text-gray-700 hover:bg-gray-100'
        }
      `}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};
```

### ✅ СТАЛО:

```tsx
// src/widgets/Sidebar/ui/MenuItem.tsx

import { FC } from 'react';
import { Link } from 'react-router-dom';

interface MenuItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

export const MenuItem: FC<MenuItemProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-md transition-colors
        ${isActive 
          ? 'bg-slate-900 text-white font-semibold' 
          : 'text-slate-700 hover:bg-slate-100'
        }
      `}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};
```

**Ключевые изменения:**
- ✅ `purple-600` → `slate-900`
- ✅ `gray-*` → `slate-*`
- ✅ `rounded-lg` → `rounded-md`
- ✅ Добавлен `transition-colors`
- ✅ Активный элемент стал `font-semibold`

---

## Итоговый чеклист для каждого компонента

При миграции компонента проверь:

- [ ] Все `gray-*` заменены на `slate-*`
- [ ] Все `purple-*/blue-*` primary actions → `slate-900`
- [ ] Все `green-*` → `teal-*` (success)
- [ ] Все `red-*` → `rose-*` (error)
- [ ] Все `yellow-*` → `orange-*` (warning)
- [ ] Все `font-mono` → `tabular-nums` (для цифр)
- [ ] Заголовки используют `font-display`
- [ ] Добавлены transitions (`transition-colors` / `transition-all`)
- [ ] Используются готовые компоненты (Button, Badge, Input, Card)
- [ ] Focus states обновлены (`focus:ring-slate-900`)
- [ ] Border radius согласован (`rounded-md` по умолчанию)

---

**Эти примеры — твой reference при миграции других компонентов! 🎯**
