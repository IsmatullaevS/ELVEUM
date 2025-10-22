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
