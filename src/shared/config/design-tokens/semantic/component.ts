/**
 * Компонентные токены - специфичные для UI-элементов
 */

import { primitiveColors } from '../primitives/colors';

export const componentTokens = {
  light: {
    button: {
      primary: {
        bg: primitiveColors.brand[500],
        bgHover: primitiveColors.brand[600],
        text: primitiveColors.neutral[0],
      },
      secondary: {
        bg: primitiveColors.neutral[100],
        bgHover: primitiveColors.neutral[200],
        text: primitiveColors.neutral[900],
      },
      ghost: {
        bg: 'transparent',
        bgHover: primitiveColors.neutral[100],
        text: primitiveColors.neutral[700],
      },
    },

    input: {
      bg: primitiveColors.neutral[0],
      border: primitiveColors.neutral[300],
      borderFocus: primitiveColors.brand[500],
      text: primitiveColors.neutral[900],
      placeholder: primitiveColors.neutral[400],
    },

    card: {
      bg: primitiveColors.neutral[0],
      border: primitiveColors.neutral[200],
      shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
  },

  dark: {
    button: {
      primary: {
        bg: primitiveColors.brand[600],
        bgHover: primitiveColors.brand[700],
        text: primitiveColors.neutral[0],
      },
      secondary: {
        bg: primitiveColors.neutral[800],
        bgHover: primitiveColors.neutral[700],
        text: primitiveColors.neutral[0],
      },
      ghost: {
        bg: 'transparent',
        bgHover: primitiveColors.neutral[800],
        text: primitiveColors.neutral[300],
      },
    },

    input: {
      bg: primitiveColors.neutral[900],
      border: primitiveColors.neutral[700],
      borderFocus: primitiveColors.brand[600],
      text: primitiveColors.neutral[0],
      placeholder: primitiveColors.neutral[500],
    },

    card: {
      bg: primitiveColors.neutral[900],
      border: primitiveColors.neutral[800],
      shadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
    },
  },
} as const;
