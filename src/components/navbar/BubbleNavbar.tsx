import styled from 'styled-components';
import infoIcon from '../../assets/icons/info.png';
import lightModeIcon from '../../assets/icons/light-mode.png';
import darkModeIcon from '../../assets/icons/dark-mode.png';
import menuIcon from '../../assets/icons/menu.png';
import logo from '../../assets/images/logo_black_fill.svg';
import { ThemeState, useThemeStore } from '../../stores/useThemeStore';
import { ThemeStyle } from '../../model/Theme';
import { BubbleButton } from './BubbleButton';
import { Bubbles, BubblesEnum } from '../../model/Bubbles';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { RoutesEnum, Routes } from '../../Routes';
import { useNavigate } from 'react-router-dom';

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
  navigateTo: RoutesEnum;
};

const bubbles: Bubble[] = [
  {
    type: BubbleType.NAVIGATOR,
    bubble: Bubbles.MENU,
    iconSrc: menuIcon,
    navigateTo: Routes.Menu,
  },
  {
    type: BubbleType.NAVIGATOR,
    bubble: Bubbles.LOGO,
    iconSrc: logo,
    navigateTo: Routes.Cv,
  },
  {
    type: BubbleType.NAVIGATOR,
    bubble: Bubbles.INFO,
    iconSrc: infoIcon,
    navigateTo: Routes.Info,
  },
  {
    type: BubbleType.ACTION,
    bubble: Bubbles.INFO,
    iconSrc: lightModeIcon,
    altIconSrc: darkModeIcon,
    handler: 'switch_dark_mode',
  },
];

const NavbarBubblesContainer = styled.div<{ isFloating: boolean; isMobile: boolean }>`
  display: flex;
  align-items: center;
  ${(props) => (props.isMobile ? `` : props.isFloating ? `width: 25em` : `width: 35em`)};
  margin: 0 auto;
  z-index: 1;
  justify-content: space-between;
  transition: width 0.2s ease 0.1s;
`;

const NavbarContainer = styled.div<{ isFloating: boolean }>`
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
  linkedTab: RoutesEnum;
  iconSrc: string;
  onBubbleClick: () => void;
};

export type ReadArticleNavbarBubbleContent = NavbarBubbleContent & {
  articleId: string;
};

const createBubbleButton = (
  bubble: Bubble,
  changeTab: (tab: RoutesEnum) => void,
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

type Props = {
  bubbles: BubblesEnum[];
  isFloating: boolean;
  hidden: boolean;
};

export const BubbleNavbar: React.FC<Props> = (props: Props) => {
  const theme = useThemeStore();
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
  const activeBubbles: Bubble[] = bubbles.filter((bubble: Bubble) =>
    props.bubbles.includes(bubble.bubble),
  );
  return (
    <motion.div
      key={'navbar'}
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: props.hidden ? -50 : 0,
        opacity: props.hidden ? 0 : 1,
      }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
      }}
    >
      <NavbarContainer key="navbar-container" isFloating={props.isFloating} hidden={props.hidden}>
        <NavbarBubblesContainer
          key="navbar-bubbles-container"
          isFloating={props.isFloating}
          isMobile={windowWidth < 470}
        >
          {activeBubbles.map((bubble: Bubble) =>
            createBubbleButton(bubble, navigate, theme, props.isFloating),
          )}
        </NavbarBubblesContainer>
      </NavbarContainer>
    </motion.div>
  );
};
