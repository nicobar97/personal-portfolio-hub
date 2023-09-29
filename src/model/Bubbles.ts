export const Bubbles = {
  LOGO: 'logo',
  INFO: 'info',
  MENU: 'menu',
  DARK_LIGHT_THEME: 'dark_light_theme',
} as const;
export type BubblesEnum = (typeof Bubbles)[keyof typeof Bubbles];
