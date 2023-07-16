import styled from 'styled-components';
import infoIcon from '../assets/icons/info.png';
import lightModeIcon from '../assets/icons/light-mode.png';
import darkModeIcon from '../assets/icons/dark-mode.png';
import menuIcon from '../assets/icons/menu.png';
import { Tabs, TabsEnum } from '../model/Tabs';
import logo from '../assets/images/logo_black_fill.svg';
import { useState } from 'react';
import { useThemeStore } from '../stores/useThemeStore';
import { ThemeStyle, ThemeStyleEnum } from '../model/Theme';
import { BubbleButton } from './BubbleButton';
// import { getPathFromTab } from '../router';
// import { useNavbarStore } from '../stores/useNavbarStore';
// import { TabProps, TabState, useTabStore } from '../stores/useTabStore';

const NavbarBubblesContainer = styled.div<{ isFloating: boolean; bubblecount: number }>`
  display: flex;
  align-items: center;
  ${(props) => (props.bubblecount < 5 ? (props.isFloating ? `width: 25em;` : `width: 35em;`) : ``)}
  margin: 0 auto;
  z-index: 1;
  justify-content: space-between;
  transition: width 0.2s ease 0.1s;
`;

const NavbarContainer = styled.div<{ isFloating: boolean; themestyle: ThemeStyleEnum }>`
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
      : `background-color: ${props.theme.colors(props.themestyle).background}; box-shadow: ${
          props.theme.colors(props.themestyle).shadow
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

const initNavbarBubbles = (changeTab: (tab: TabsEnum) => void) => [
  {
    iconSrc: menuIcon,
    onBubbleClick: () => changeTab(Tabs.Articles),
    linkedTab: Tabs.Articles,
  },
  {
    iconSrc: logo,
    onBubbleClick: () => changeTab(Tabs.Cv),
    linkedTab: Tabs.Cv,
  },
  {
    iconSrc: infoIcon,
    onBubbleClick: () => changeTab(Tabs.ProjectInfo),
    linkedTab: Tabs.ProjectInfo,
  },
];

type Props = {
  changeTab: (tab: TabsEnum) => void;
};

export const NavigationBar: React.FC<Props> = (props: Props) => {
  const scrollTriggerY = 30;
  const theme = useThemeStore();
  const [isFloatingBar, setIsFloatingBar] = useState(false);
  // const navbar = useNavbarStore();

  const bubbles: NavbarBubbleContent[] = initNavbarBubbles(props.changeTab);
  // if (bubbles.length === 0 || bubbles[0].onBubbleClick === undefined) {
  //   navbar.setNavbarBubbles(initNavbarBubbles(tab));
  // }

  setUpScrolling(scrollTriggerY, setIsFloatingBar);

  return (
    <NavbarContainer isFloating={isFloatingBar} themestyle={theme.style}>
      <NavbarBubblesContainer isFloating={isFloatingBar} bubblecount={bubbles.length}>
        {bubbles.map((bubble: NavbarBubbleContent) => (
          <BubbleButton
            key={bubble.linkedTab}
            onBubbleClick={bubble.onBubbleClick}
            iconSrc={bubble.iconSrc}
            rounded={isFloatingBar}
            scale={1}
            darkModeInvert={true}                borderSize={1}

            style={theme.style}
          />
        ))}
        <BubbleButton
          onBubbleClick={() => {
            theme.switchDarkMode();
          }}
          iconSrc={theme.style === ThemeStyle.LIGHT ? lightModeIcon : darkModeIcon}
          rounded={isFloatingBar}
          darkModeInvert={false}
          scale={1}
          style={theme.style}
        />
      </NavbarBubblesContainer>
    </NavbarContainer>
  );
};
