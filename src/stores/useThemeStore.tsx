import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ThemeStyle, ThemeStyleEnum } from '../model/Theme';

export type ThemeState = {
  style: ThemeStyleEnum;
  setTheme: (theme: ThemeStyleEnum) => void;
  switchDarkMode: () => void;
};

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        style: window.matchMedia('(prefers-color-scheme: dark)').matches
          ? ThemeStyle.DARK
          : ThemeStyle.LIGHT,
        setTheme: (style: ThemeStyleEnum) => set(() => ({ style })),
        switchDarkMode: () =>
          set((state) => ({
            style: state.style === ThemeStyle.DARK ? ThemeStyle.LIGHT : ThemeStyle.DARK,
          })),
      }),
      {
        name: 'theme',
      },
    ),
  ),
);
