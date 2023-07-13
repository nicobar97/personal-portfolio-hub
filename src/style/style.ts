import 'styled-components';

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

export const theme = {
  colors: {
    white: '#ffffff',
    black: '#000000',
    gray: {
      100: '#f7f7f7',
      200: '#e6e6e6',
      300: '#d4d4d4',
      400: '#c3c3c3',
      500: '#b1b1b1',
      600: '#a0a0a0',
      700: '#8e8e8e',
      800: '#7d7d7d',
      900: '#6b6b6b',
    },
    purple: {
      '50': '#f2e8fb',
      '100': '#e5d1f7',
      '200': '#d9b9f2',
      '300': '#cc9ff0',
      '400': '#c182ed',
      '500': '#b466ea',
      '600': '#a748e6',
      '700': '#9628e3',
      '800': '#8218f5',
      '900': '#7300f3',
    },
    red: {
      '50': '#fde6e6',
      '100': '#fbc3c3',
      '200': '#f89f9f',
      '300': '#f57c7c',
      '400': '#f35959',
      '500': '#F13636',
      '600': '#dd2222',
      '700': '#c60e0e',
      '800': '#b30a0a',
      '900': '#9f0606',
    },
    darkGray: '#333333'
  },
  hexToRgbA: hexToRgbA,
} as const;

type Theme = typeof theme;
