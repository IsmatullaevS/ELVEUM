import { primitiveColors } from '../primitives/colors';

export const mintTheme = {
  id: 'mint',
  name: 'Mint Fresh',

  colors: {
    background: {
      primary: '#F0FDF9',
      secondary: '#CCFBEF',
      tertiary: '#99F6E0',
      inverse: '#134E48',
      brand: '#14B8A6',
      success: primitiveColors.success[50],
      error: primitiveColors.error[50],
      warning: primitiveColors.warning[50],
    },

    text: {
      primary: '#134E48',
      secondary: '#0F766E',
      tertiary: '#5EEAD4',
      inverse: '#F0FDF9',
      brand: '#14B8A6',
      success: primitiveColors.success[700],
      error: primitiveColors.error[700],
      warning: primitiveColors.warning[700],
      link: '#0F766E',
    },

    border: {
      default: '#99F6E0',
      strong: '#5EEAD4',
      subtle: '#CCFBEF',
      brand: '#14B8A6',
      error: primitiveColors.error[500],
    },

    component: {
      button: {
        primary: {
          bg: '#14B8A6',
          bgHover: '#0F766E',
          text: '#FFFFFF',
        },
        secondary: {
          bg: '#CCFBEF',
          bgHover: '#99F6E0',
          text: '#134E48',
        },
        ghost: {
          bg: 'transparent',
          bgHover: '#CCFBEF',
          text: '#0F766E',
        },
      },

      input: {
        bg: '#FFFFFF',
        border: '#99F6E0',
        borderFocus: '#14B8A6',
        text: '#134E48',
        placeholder: '#5EEAD4',
      },

      card: {
        bg: '#FFFFFF',
        border: '#CCFBEF',
        shadow: '0 1px 3px rgba(20, 184, 166, 0.1)',
      },
    },
  },
} as const;
