import { backgroundTokens } from '../semantic/background';
import { textTokens } from '../semantic/text';
import { borderTokens } from '../semantic/border';
import { componentTokens } from '../semantic/component';

export const darkTheme = {
  id: 'dark',
  name: 'Dark',

  colors: {
    background: backgroundTokens.dark,
    text: textTokens.dark,
    border: borderTokens.dark,
    component: componentTokens.dark,
  },
} as const;
