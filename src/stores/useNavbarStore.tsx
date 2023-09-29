import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { TabsEnum } from '../model/Tabs';
import { Bubbles, BubblesEnum } from '../model/Bubbles';

export type NavbarState = {
  bubbles: BubblesEnum[];
  setNavbarBubbles: (navbarBubbles: BubblesEnum[]) => void;
  removeNavbarBubble: (removeBubble: BubblesEnum) => void;
  addNavbarBubble: (bubble: BubblesEnum) => void;
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
        bubbles: [Bubbles.MENU, Bubbles.LOGO, Bubbles.INFO, Bubbles.DARK_LIGHT_THEME],
        setNavbarBubbles: (navbarBubbles: BubblesEnum[]) => set(() => ({ bubbles: navbarBubbles })),
        removeNavbarBubble: (removeBubble: BubblesEnum) =>
          set((state) => ({
            bubbles: state.bubbles.filter((bubble) => bubble !== removeBubble),
          })),
        addNavbarBubble: (bubble: BubblesEnum) =>
          set((state) => ({
            bubbles: [...state.bubbles, bubble],
          })),
      }),
      {
        name: 'navbar',
      },
    ),
  ),
);
