import { primitiveColors } from '../primitives/colors';

export const borderTokens = {
  light: {
    default: primitiveColors.neutral[200],
    strong: primitiveColors.neutral[300],
    subtle: primitiveColors.neutral[100],
    brand: primitiveColors.brand[500],
    error: primitiveColors.error[500],
  },

  dark: {
    default: primitiveColors.neutral[700],
    strong: primitiveColors.neutral[600],
    subtle: primitiveColors.neutral[800],
    brand: primitiveColors.brand[600],
    error: primitiveColors.error[700],
  },
} as const;
