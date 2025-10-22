import { backgroundTokens } from '../semantic/background';
import { textTokens } from '../semantic/text';
import { borderTokens } from '../semantic/border';
import { componentTokens } from '../semantic/component';

export const lightTheme = {
  id: 'light',
  name: 'Light',

  colors: {
    background: backgroundTokens.light,
    text: textTokens.light,
    border: borderTokens.light,
    component: componentTokens.light,
  },
} as const;
