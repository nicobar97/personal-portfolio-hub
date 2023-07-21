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

const pickColor = (themeType: ThemeStyleEnum): ThemeColor =>
  themeType === ThemeStyle.DARK ? dark : light;

export const theme = {
  colors: pickColor,
  hexToRgbA: hexToRgbA,
} as const;

type Theme = typeof theme;
