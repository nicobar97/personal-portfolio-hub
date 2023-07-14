import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ThemeStyle, ThemeStyleEnum } from '../model/Theme';

type ThemeState = {
  style: ThemeStyleEnum;
  setTheme: (theme: ThemeStyleEnum) => void;
  switchDarkMode: () => void;
};

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        style: ThemeStyle.DARK,
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
