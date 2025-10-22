import { primitiveColors } from '../primitives/colors';

/**
 * Семантические токены для фонов
 * Они ССЫЛАЮТСЯ на примитивы и меняются в зависимости от темы
 */

export const backgroundTokens = {
  light: {
    primary: primitiveColors.neutral[0],      // Основной фон
    secondary: primitiveColors.neutral[50],   // Вторичный фон
    tertiary: primitiveColors.neutral[100],   // Третичный фон
    inverse: primitiveColors.neutral[900],    // Инверсный фон
    brand: primitiveColors.brand[500],        // Фон бренда
    success: primitiveColors.success[50],     // Фон успеха
    error: primitiveColors.error[50],         // Фон ошибки
    warning: primitiveColors.warning[50],     // Фон предупреждения
  },

  dark: {
    primary: primitiveColors.neutral[950],
    secondary: primitiveColors.neutral[900],
    tertiary: primitiveColors.neutral[800],
    inverse: primitiveColors.neutral[0],
    brand: primitiveColors.brand[600],
    success: primitiveColors.success[700],
    error: primitiveColors.error[700],
    warning: primitiveColors.warning[700],
  },
} as const;
