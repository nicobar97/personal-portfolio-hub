import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Bubbles, BubblesEnum } from '../../model/Bubbles';
import { RoutesEnum } from '../../Routes';

export type NavbarState = {
  bubbles: BubblesEnum[];
  floating: boolean;
  hidden: boolean;
  toggleFloating: () => void;
  toggleHide: () => void;
  hide: () => void;
  show: () => void;
  setHidden: (isHidden: boolean) => void;
  setFloating: (floating: boolean) => void;
  setNavbarBubbles: (navbarBubbles: BubblesEnum[]) => void;
  removeNavbarBubble: (removeBubble: BubblesEnum) => void;
  addNavbarBubble: (bubble: BubblesEnum) => void;
};

export type NavbarBubbleContent = {
  linkedTab: RoutesEnum;
  iconSrc: string;
  onBubbleClick: () => void;
};

export const useNavbarStore = create<NavbarState>()(
  devtools(
    (set) => ({
      bubbles: [Bubbles.MENU, Bubbles.LOGO, Bubbles.INFO, Bubbles.DARK_LIGHT_THEME],
      floating: false,
      hidden: false,
      toggleFloating: () => set((state) => ({ floating: !state.floating })),
      hide: () => set(() => ({ hidden: true })),
      show: () => set(() => ({ hidden: false })),
      setHidden: (isHidden: boolean) => set(() => ({ hidden: isHidden })),
      toggleHide: () => set((state) => ({ hidden: !state.hidden })),
      setFloating: (floating: boolean) => set(() => ({ floating: floating })),
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
);
