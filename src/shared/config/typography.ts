export const typography = {
  display: {
    large: 'font-display text-5xl font-black leading-tight', // 48px / 900
    medium: 'font-display text-4xl font-black leading-tight', // 36px / 900
  },
  heading: {
    h1: 'font-display text-3xl font-extrabold leading-snug', // 32px / 800
    h2: 'font-display text-2xl font-extrabold leading-snug', // 24px / 800
    h3: 'font-display text-xl font-bold leading-normal', // 20px / 700
    h4: 'font-display text-lg font-bold leading-normal', // 18px / 700
  },
  body: {
    large: 'text-base font-normal leading-relaxed', // 16px / 400
    medium: 'text-sm font-normal leading-relaxed', // 14px / 400
    small: 'text-xs font-normal leading-normal', // 13px / 400
  },
  caption: 'text-xs font-medium leading-tight', // 12px / 500
  numbers: 'tabular-nums font-semibold', // tabular + 600
} as const;

export type TypographyVariant = keyof typeof typography;
