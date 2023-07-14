export const ThemeStyle = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

export type ThemeStyleEnum = (typeof ThemeStyle)[keyof typeof ThemeStyle];
