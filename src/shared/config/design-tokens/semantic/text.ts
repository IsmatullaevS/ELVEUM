import { primitiveColors } from '../primitives/colors';

export const textTokens = {
  light: {
    primary: primitiveColors.neutral[900],      // Основной текст
    secondary: primitiveColors.neutral[600],    // Вторичный текст
    tertiary: primitiveColors.neutral[400],     // Третичный текст
    inverse: primitiveColors.neutral[0],        // Инверсный текст
    brand: primitiveColors.brand[600],          // Текст бренда
    success: primitiveColors.success[700],      // Текст успеха
    error: primitiveColors.error[700],          // Текст ошибки
    warning: primitiveColors.warning[700],      // Текст предупреждения
    link: primitiveColors.brand[600],           // Ссылки
  },

  dark: {
    primary: primitiveColors.neutral[0],
    secondary: primitiveColors.neutral[300],
    tertiary: primitiveColors.neutral[500],
    inverse: primitiveColors.neutral[900],
    brand: primitiveColors.brand[400],
    success: primitiveColors.success[500],
    error: primitiveColors.error[500],
    warning: primitiveColors.warning[500],
    link: primitiveColors.brand[400],
  },
} as const;
