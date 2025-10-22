import { lightTheme } from './light';
import { darkTheme } from './dark';
import { mintTheme } from './mint';

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  mint: mintTheme,
} as const;

export type ThemeId = keyof typeof themes;
export type Theme = typeof lightTheme;

export { lightTheme, darkTheme, mintTheme };
