import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { TabsEnum } from '../model/Tabs';
import { ThemeStyle, ThemeStyleEnum } from '../model/Theme';

export type NavbarState = {
  style: ThemeStyleEnum;
  navbarBubbles: NavbarBubbleContent[];
  setNavbarBubbles: (navbarBubbles: NavbarBubbleContent[]) => void;
  removeNavbarBubble: (tab: TabsEnum) => void;
  addNavbarBubble: (bubble: NavbarBubbleContent) => void;
  switchDarkMode: () => void;
};

export type NavbarBubbleContent = {
  linkedTab: TabsEnum;
  iconSrc: string;
  onBubbleClick: () => void;
};

export const useNavbarStore = create<NavbarState>()(
  devtools(
    persist(
      (set) => ({
        style: ThemeStyle.DARK,
        navbarBubbles: [],
        setTheme: (style: ThemeStyleEnum) => set(() => ({ style })),
        setNavbarBubbles: (navbarBubbles: NavbarBubbleContent[]) => set(() => ({ navbarBubbles })),
        removeNavbarBubble: (tab: TabsEnum) =>
          set((state) => ({
            navbarBubbles: state.navbarBubbles.filter((bubble) => bubble.linkedTab !== tab),
          })),
        addNavbarBubble: (bubble: NavbarBubbleContent) =>
          set((state) => ({
            navbarBubbles: [...state.navbarBubbles, bubble],
          })),
        switchDarkMode: () =>
          set((state) => ({
            style: state.style === ThemeStyle.DARK ? ThemeStyle.LIGHT : ThemeStyle.DARK,
          })),
      }),
      {
        name: 'navbar',
      },
    ),
  ),
);
