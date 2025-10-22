'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeId, themes } from '@/shared/config/design-tokens/themes';

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeId;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'app-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeId>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Загрузка темы из localStorage при монтировании
  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as ThemeId;
    if (stored && themes[stored]) {
      setThemeState(stored);
    }
    setMounted(true);
  }, [storageKey]);

  // Применение темы
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Удаляем все классы тем
    Object.keys(themes).forEach((t) => {
      root.classList.remove(`theme-${t}`);
    });

    // Добавляем класс текущей темы
    root.classList.add(`theme-${theme}`);

    // Сохраняем в localStorage
    localStorage.setItem(storageKey, theme);

    // Применяем CSS-переменные
    const currentTheme = themes[theme];
    applyThemeVariables(currentTheme);
  }, [theme, mounted, storageKey]);

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Избегаем мерцания при SSR
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Применение CSS-переменных из темы
function applyThemeVariables(theme: any) {
  const root = document.documentElement;
  const { colors } = theme;

  // Background
  root.style.setProperty('--color-bg-primary', colors.background.primary);
  root.style.setProperty('--color-bg-secondary', colors.background.secondary);
  root.style.setProperty('--color-bg-tertiary', colors.background.tertiary);
  root.style.setProperty('--color-bg-inverse', colors.background.inverse);
  root.style.setProperty('--color-bg-brand', colors.background.brand);
  root.style.setProperty('--color-bg-success', colors.background.success);
  root.style.setProperty('--color-bg-error', colors.background.error);
  root.style.setProperty('--color-bg-warning', colors.background.warning);

  // Text
  root.style.setProperty('--color-text-primary', colors.text.primary);
  root.style.setProperty('--color-text-secondary', colors.text.secondary);
  root.style.setProperty('--color-text-tertiary', colors.text.tertiary);
  root.style.setProperty('--color-text-inverse', colors.text.inverse);
  root.style.setProperty('--color-text-brand', colors.text.brand);
  root.style.setProperty('--color-text-success', colors.text.success);
  root.style.setProperty('--color-text-error', colors.text.error);
  root.style.setProperty('--color-text-warning', colors.text.warning);
  root.style.setProperty('--color-text-link', colors.text.link);

  // Border
  root.style.setProperty('--color-border-default', colors.border.default);
  root.style.setProperty('--color-border-strong', colors.border.strong);
  root.style.setProperty('--color-border-subtle', colors.border.subtle);
  root.style.setProperty('--color-border-brand', colors.border.brand);
  root.style.setProperty('--color-border-error', colors.border.error);

  // Components - Button
  root.style.setProperty('--color-button-primary-bg', colors.component.button.primary.bg);
  root.style.setProperty('--color-button-primary-bg-hover', colors.component.button.primary.bgHover);
  root.style.setProperty('--color-button-primary-text', colors.component.button.primary.text);

  root.style.setProperty('--color-button-secondary-bg', colors.component.button.secondary.bg);
  root.style.setProperty('--color-button-secondary-bg-hover', colors.component.button.secondary.bgHover);
  root.style.setProperty('--color-button-secondary-text', colors.component.button.secondary.text);

  root.style.setProperty('--color-button-ghost-bg', colors.component.button.ghost.bg);
  root.style.setProperty('--color-button-ghost-bg-hover', colors.component.button.ghost.bgHover);
  root.style.setProperty('--color-button-ghost-text', colors.component.button.ghost.text);

  // Components - Input
  root.style.setProperty('--color-input-bg', colors.component.input.bg);
  root.style.setProperty('--color-input-border', colors.component.input.border);
  root.style.setProperty('--color-input-border-focus', colors.component.input.borderFocus);
  root.style.setProperty('--color-input-text', colors.component.input.text);
  root.style.setProperty('--color-input-placeholder', colors.component.input.placeholder);

  // Components - Card
  root.style.setProperty('--color-card-bg', colors.component.card.bg);
  root.style.setProperty('--color-card-border', colors.component.card.border);
  root.style.setProperty('--shadow-card', colors.component.card.shadow);
}

export { ThemeContext };
