import 'styled-components';
import { ThemeStyle, ThemeStyleEnum } from '../model/Theme';

// and extend them!
declare module 'styled-components' {
  // eslint-ignore-next-line
  export interface DefaultTheme extends Theme {}
}

const hexToRgbA = (hex: string, alpha: number) => {
  // eslint-disable-next-line
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${alpha})`;
  }
  throw new Error('Bad Hex');
};

type ThemeColor = {
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

const light: ThemeColor = {
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

const dark: ThemeColor = {
  background: '#1a1a1a', // Dark background color
  text: '#f2f2f2', // Light text color
  border: '#2f2f2f', // Darker border color
  backdrop: '#272727', // Slightly darker backdrop color
  shadow: hexToRgbA('#000', 0.3), // Darker shadow color
  optionSelected: '#1f1f1f', // Darker optionSelected color
  accent: {
    color: '#d40f36', // Same accent color as in the light theme
    text: '#fff', // Light text color for the accent elements
  },
};

const pickColor = (themeType: ThemeStyleEnum): ThemeColor =>
  themeType === ThemeStyle.DARK ? dark : light;

export const theme = {
  colors: pickColor,
  hexToRgbA: hexToRgbA,
} as const;

type Theme = typeof theme;
