import styled from 'styled-components';
import infoIcon from '../assets/icons/info.png';
import lightModeIcon from '../assets/icons/light-mode.png';
import darkModeIcon from '../assets/icons/dark-mode.png';
import menuIcon from '../assets/icons/menu.png';
import { Tabs, TabsEnum } from '../model/Tabs';
import logo from '../assets/images/logo_black_fill.svg';
import { useState } from 'react';
import { ThemeState, useThemeStore } from '../stores/useThemeStore';
import { ThemeStyle } from '../model/Theme';
import { BubbleButton } from './BubbleButton';
import { useNavbarStore } from '../stores/useNavbarStore';
import { Bubbles, BubblesEnum } from '../model/Bubbles';
// import { getPathFromTab } from '../router';
// import { useNavbarStore } from '../stores/useNavbarStore';
// import { TabProps, TabState, useTabStore } from '../stores/useTabStore';

export type Bubble = NavigatorBubble | ActionBubble;

export const BubbleType = {
  NAVIGATOR: 'navigator',
  ACTION: 'action',
};
export type BubbleTypeEnum = (typeof BubbleType)[keyof typeof BubbleType];

export type ActionBubble = {
  type: typeof BubbleType.ACTION;
  bubble: BubblesEnum;
  iconSrc: string;
  altIconSrc?: string;
  handler: string;
};
export type NavigatorBubble = {
  type: typeof BubbleType.NAVIGATOR;
  bubble: BubblesEnum;
  iconSrc: string;
  altIconSrc?: string;
  navigateTo: TabsEnum;
};

const bubbles: Bubble[] = [
  {
    type: BubbleType.NAVIGATOR,
    bubble: Bubbles.MENU,
    iconSrc: menuIcon,
    navigateTo: Tabs.Menu,
  },
  {
    type: BubbleType.NAVIGATOR,
    bubble: Bubbles.LOGO,
    iconSrc: logo,
    navigateTo: Tabs.Cv,
  },
  {
    type: BubbleType.NAVIGATOR,
    bubble: Bubbles.INFO,
    iconSrc: infoIcon,
    navigateTo: Tabs.ProjectInfo,
  },
  {
    type: BubbleType.ACTION,
    bubble: Bubbles.INFO,
    iconSrc: lightModeIcon,
    altIconSrc: darkModeIcon,
    handler: 'switch_dark_mode',
  },
];

const NavbarBubblesContainer = styled.div<{ isFloating: boolean; bubblecount: number }>`
  display: flex;
  align-items: center;
  ${(props) => (props.bubblecount < 5 ? (props.isFloating ? `width: 25em;` : `width: 35em;`) : ``)}
  margin: 0 auto;
  z-index: 1;
  justify-content: space-between;
  transition: width 0.2s ease 0.1s;
`;

const NavbarContainer = styled.div<{ isFloating: boolean }>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  transition:
    box-shadow ${(props) => (props.isFloating ? '0.2s' : '0.3s')} ease-in-out,
    background-color 0.2s ease-in,
    padding 0.3s ease-out ${(props) => (props.isFloating ? '0.25s' : '0s')};

  ${(props) =>
    props.isFloating
      ? `padding: 2rem`
      : `background-color: ${props.theme.background}; box-shadow: ${props.theme.shadow} 0px 7px 20px 0px;`}
`;

export type NavbarBubbleContent = {
  linkedTab: TabsEnum;
  iconSrc: string;
  onBubbleClick: () => void;
};

export type ReadArticleNavbarBubbleContent = NavbarBubbleContent & {
  articleId: string;
};

const setUpScrolling = (
  scrollTriggerY: number,
  setIsFloatingBar: (isFloatingBar: boolean) => void,
) => {
  window.addEventListener('scroll', handleScroll(scrollTriggerY, setIsFloatingBar));
};

const handleScroll =
  (scrollTriggerY: number, setIsFloatingBar: (isFloatingBar: boolean) => void) => () =>
    window.scrollY > scrollTriggerY ? setIsFloatingBar(true) : setIsFloatingBar(false);

type Props = {
  changeTab: (tab: TabsEnum) => void;
};

const handleAction = (handler: string) => {
  switch (handler) {
    case 'switch_dark_mode':
      useNavbarStore.getState().switchDarkMode();
      break;
  }
};

const createBubbleButton = (
  bubble: Bubble,
  changeTab: (tab: TabsEnum) => void,
  theme: ThemeState,
  floating: boolean,
) => (
  <BubbleButton
    onBubbleClick={
      bubble.type === BubbleType.NAVIGATOR
        ? () => changeTab((bubble as NavigatorBubble).navigateTo)
        : theme.switchDarkMode
    }
    iconSrc={
      bubble.altIconSrc
        ? theme.style === ThemeStyle.DARK
          ? bubble.altIconSrc
          : bubble.iconSrc
        : bubble.iconSrc
    }
    rounded={floating}
    scale={1}
    darkModeInvert={bubble.type === BubbleType.NAVIGATOR}
    borderSize={1}
  />
);

export const NavigationBar: React.FC<Props> = (props: Props) => {
  const scrollTriggerY = 30;
  const theme = useThemeStore();
  const navbar = useNavbarStore();
  const [isFloatingBar, setIsFloatingBar] = useState(false);
  setUpScrolling(scrollTriggerY, setIsFloatingBar);

  const activeBubbles: Bubble[] = bubbles.filter((bubble: Bubble) =>
    navbar.bubbles.includes(bubble.bubble),
  );

  return (
    <NavbarContainer isFloating={isFloatingBar}>
      <NavbarBubblesContainer isFloating={isFloatingBar} bubblecount={activeBubbles.length}>
        {activeBubbles.map((bubble: Bubble) =>
          createBubbleButton(bubble, props.changeTab, theme, isFloatingBar),
        )}
      </NavbarBubblesContainer>
    </NavbarContainer>
  );
};
