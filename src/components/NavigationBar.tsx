import styled from 'styled-components';
import infoIcon from '../assets/icons/info.png';
import lightModeIcon from '../assets/icons/light-mode.png';
import darkModeIcon from '../assets/icons/dark-mode.png';
import menuIcon from '../assets/icons/menu.png';
import { Tabs, TabsEnum } from '../model/Tabs';
import logo from '../../src/assets/images/logo_black_fill.svg';
import { useState } from 'react';
import { useThemeStore } from '../stores/useThemeStore';
import { ThemeStyle, ThemeStyleEnum } from '../model/Theme';
import { NavbarBubble } from './NavbarBubble';
import { getPathFromTab } from '../router';
import { NavbarState, useNavbarStore } from '../stores/useNavbarStore';
import { TabState, useTabStore } from '../stores/useTabStore';

const NavbarBubblesContainer = styled.div<{ floating: boolean }>`
  display: flex;
  align-items: center;
  width: 35%;
  max-width: 500px;
  margin: 0 auto;
  z-index: 1;
  justify-content: space-between;
  transition: width 0.2s ease 0.1s;
  ${(props) => (props.floating ? `width: 25em;` : `width: 35em;`)}
`;

const NavbarContainer = styled.div<{ floating: boolean; themeStyle: ThemeStyleEnum }>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  transition:
    box-shadow ${(props) => (props.floating ? '0.2s' : '0.3s')} ease-in-out
      ${(props) => (props.floating ? '0s' : '0.35s')},
    background-color 0.2s ease-in,
    padding 0.3s ease-out ${(props) => (props.floating ? '0.25s' : '0s')};

  ${(props) =>
    props.floating
      ? `padding: 2rem`
      : `background-color: ${props.theme.colors(props.themeStyle).background}; box-shadow: ${
          props.theme.colors(props.themeStyle).shadow
        } 0px 7px 20px 0px;`}
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

const changeTab = (setCurrentTab: (tab: TabsEnum) => void, tab: TabsEnum) => {
  window.history.pushState(null, '', getPathFromTab(tab));
  setCurrentTab(tab);
};

export const NavigationBar: React.FC = () => {
  const scrollTriggerY = 30;
  const theme = useThemeStore();
  const [isFloatingBar, setIsFloatingBar] = useState(false);
  const navbar = useNavbarStore();
  const tab = useTabStore();

  if (!navbar.navbarBubbles) {
    navbar.setNavbarBubbles(initNavbarBubbles(navbar, tab));
  }

  setUpScrolling(scrollTriggerY, setIsFloatingBar);

  return (
    <NavbarContainer floating={isFloatingBar} themeStyle={theme.style}>
      <NavbarBubblesContainer floating={isFloatingBar}>
        <NavbarBubble
          onBubbleClick={() => changeTab(tab.setTab, Tabs.Menu)}
          iconSrc={menuIcon}
          isFloating={isFloatingBar}
          style={theme.style}
        />
        <NavbarBubble
          onBubbleClick={() => changeTab(tab.setTab, Tabs.Home)}
          iconSrc={logo}
          isFloating={isFloatingBar}
          style={theme.style}
        />
        <NavbarBubble
          onBubbleClick={() => theme.switchDarkMode()}
          iconSrc={theme.style === ThemeStyle.LIGHT ? lightModeIcon : darkModeIcon}
          isFloating={isFloatingBar}
          style={theme.style}
        />
        <NavbarBubble
          onBubbleClick={() => changeTab(tab.setTab, Tabs.Info)}
          iconSrc={infoIcon}
          isFloating={isFloatingBar}
          style={theme.style}
        />
      </NavbarBubblesContainer>
    </NavbarContainer>
  );
};

const initNavbarBubbles = (navbar: NavbarState, tab: TabState) => [
  {
    iconSrc: menuIcon,
    onBubbleClick: () => changeTab(tab.setTab, Tabs.Menu),
    linkedTab: Tabs.Menu,
  },
  {
    iconSrc: logo,
    onBubbleClick: () => changeTab(tab.setTab, Tabs.Home),
    linkedTab: Tabs.Home,
  },
  {
    iconSrc: navbar.style === ThemeStyle.LIGHT ? lightModeIcon : darkModeIcon,
    onBubbleClick: () => navbar.switchDarkMode(),
    linkedTab: Tabs.Info,
  },
  {
    iconSrc: infoIcon,
    onBubbleClick: () => () => changeTab(tab.setTab, Tabs.Info),
    linkedTab: Tabs.Info,
  },
];
