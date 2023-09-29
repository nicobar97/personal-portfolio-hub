import 'styled-components';
import { hexToRgbA } from '../Utils';

export const ThemeStyle = {
  LIGHT: 'light' as keyof typeof theme,
  DARK: 'dark' as keyof typeof theme,
} as const;

export type ThemeStyleEnum = (typeof ThemeStyle)[keyof typeof ThemeStyle];

type Theme = {
  style: ThemeStyleEnum;
  background: string;
  text: string;
  border: string;
  backdrop: string;
  shadow: string;
  optionSelected: string;
  accent: {
    color: string;
    text: string;
  };
};

const light: Theme = {
  style: ThemeStyle.LIGHT,
  background: '#fff',
  text: '#27272a',
  border: '#f2f3f6',
  backdrop: '#e5e7eb',
  shadow: hexToRgbA('#000', 0.2),
  optionSelected: '#f4f4f5',
  accent: {
    color: '#d40f36',
    text: '#fff',
  },
};

const dark: Theme = {
  style: ThemeStyle.DARK,
  background: '#1a1a1a',
  text: '#f2f2f2',
  border: '#2f2f2f',
  backdrop: '#272727',
  shadow: hexToRgbA('#000', 0.3),
  optionSelected: '#1f1f1f',
  accent: {
    color: '#d40f36',
    text: '#fff',
  },
};

export const theme = {
  light,
  dark,
} as const;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
