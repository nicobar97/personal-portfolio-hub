import styled from 'styled-components';
import { ThemeState, useThemeStore } from '../../stores/useThemeStore';
import { ThemeStyle } from '../../model/Theme';
import { BubbleButton } from './BubbleButton';
import { BubblesEnum } from '../../model/Bubbles';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { RoutesEnum } from '../../Routes';
import { useNavigate } from 'react-router-dom';
import { BubbleNavbarMenu } from './BubbleNavbarMenu';
import { Bubble, bubbles } from './BubbleNavbarConfig';

const NavbarBubblesContainer = styled.div<{
  isFloating: boolean;
  isMobile: boolean;
  isMenuExpanded: boolean;
}>`
  display: flex;
  align-items: center;
  ${(props) => (props.isMobile ? `` : props.isFloating ? `width: 25em` : `width: 35em`)};
  margin: 0 auto;
  z-index: 1;
  justify-content: ${(props) =>
    props.isMenuExpanded && props.isMobile && props.isFloating ? 'center' : 'space-between'};
  align-items: flex-start;
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

const createBubbleButton = (
  bubble: Bubble,
  changeTab: (tab: RoutesEnum) => void,
  theme: ThemeState,
  floating: boolean,
  hide: boolean,
) => (
  <BubbleButton
    onBubbleClick={
      bubble.type === 'navigator' ? () => changeTab(bubble.navigateTo) : theme.switchDarkMode
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
    darkModeInvert={bubble.type === 'navigator'}
    borderSize={1}
    hide={hide}
  />
);

const navbarVariants = {
  hidden: { y: 0, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

type Props = {
  bubbles: BubblesEnum[];
  isFloating: boolean;
  isHidden: boolean;
  isMenuExpanded: boolean;
  toggleMenu: () => void;
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
      initial="visible"
      animate={props.isHidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.2 }}
      variants={navbarVariants}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
      }}
    >
      <NavbarContainer key="navbar-container" isFloating={props.isFloating} hidden={props.isHidden}>
        <NavbarBubblesContainer
          key="navbar-bubbles-container"
          isFloating={props.isFloating}
          isMobile={windowWidth < 470}
          isMenuExpanded={props.isMenuExpanded}
        >
          <div onClick={props.toggleMenu}>
            <BubbleNavbarMenu rounded={props.isFloating} isMenuShown={props.isMenuExpanded} />
          </div>
          {(windowWidth > 782 || !props.isMenuExpanded) &&
            activeBubbles.map((bubble: Bubble) =>
              createBubbleButton(bubble, navigate, theme, props.isFloating, false),
            )}
        </NavbarBubblesContainer>
      </NavbarContainer>
    </motion.div>
  );
};
