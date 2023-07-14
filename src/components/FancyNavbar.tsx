import styled from 'styled-components';
import infoIcon from '../assets/icons/info.png';
import lightModeIcon from '../assets/icons/light-mode.png';
import darkModeIcon from '../assets/icons/dark-mode.png';
import menuIcon from '../assets/icons/menu.png';
import { Tabs, TabsEnum } from '../model/Tabs';
import { motion } from 'framer-motion';
import logo from '../../src/assets/images/logo_black_fill.svg';
import { useState } from 'react';
import { useThemeStore } from '../stores/useThemeStore';
import { ThemeStyle, ThemeStyleEnum } from '../model/Theme';

const NavigationBar = styled.div<{ floating: boolean }>`
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

const Container = styled.div<{ floating: boolean; themeStyle: ThemeStyleEnum }>`
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

const Icon = styled(motion.img)<{ themeStyle: ThemeStyleEnum }>`
  height: 1.5rem;
  margin: 0;
  transition: filter 0.5s;
  ${(props) => (props.themeStyle === ThemeStyle.DARK ? `filter: invert(100%);` : ``)}
`;

const Bubble = styled(motion.div)<{ floating: boolean; themeStyle: ThemeStyleEnum }>`
  z-index: 5;
  display: flex;
  flex-direction: column;
  height: 1.5rem;
  padding: 1.1rem;
  border-radius: 100px;
  gap: 1rem;
  background-color: ${(props) => props.theme.colors(props.themeStyle).background};
  transition: box-shadow 0.3s ease-out ${(props) => (props.floating ? '0.2s' : '0s')};

  ${(props) =>
    props.floating
      ? `box-shadow: ${props.theme.colors(props.themeStyle).shadow} 0px 7px 20px 0px;
      background-color: ${props.theme.colors(props.themeStyle).background};
`
      : `background-color: transparent`}
`;

type Props = {
  onBubbleClick: (tab: TabsEnum) => void;
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

export const FancyNavbar: React.FC<Props> = (props: Props) => {
  const scrollTriggerY = 30;
  const theme = useThemeStore();
  const [isFloatingBar, setIsFloatingBar] = useState(false);

  setUpScrolling(scrollTriggerY, setIsFloatingBar);

  return (
    <Container floating={isFloatingBar} themeStyle={theme.style}>
      <NavigationBar floating={isFloatingBar}>
        <Bubble
          themeStyle={theme.style}
          floating={isFloatingBar}
          onClick={() => props.onBubbleClick(Tabs.Menu)}
          whileTap={{ scale: isFloatingBar ? 1.5 : 0 }}
        >
          <Icon
            themeStyle={theme.style}
            src={menuIcon}
            whileTap={{ scale: !isFloatingBar ? 1.5 : 0 }}
          />
        </Bubble>
        <Bubble
          themeStyle={theme.style}
          floating={isFloatingBar}
          whileTap={{ scale: isFloatingBar ? 1.5 : 0 }}
        >
          <Icon
            themeStyle={theme.style}
            onClick={() => props.onBubbleClick(Tabs.Home)}
            src={logo}
            whileTap={{ scale: !isFloatingBar ? 1.5 : 0 }}
          />
        </Bubble>
        <Bubble
          themeStyle={theme.style}
          floating={isFloatingBar}
          onClick={() => theme.switchDarkMode()}
          whileTap={{ scale: isFloatingBar ? 1.5 : 0 }}
        >
          <Icon
            themeStyle={theme.style}
            src={theme.style === ThemeStyle.LIGHT ? lightModeIcon : darkModeIcon}
            whileTap={{ scale: !isFloatingBar ? 1.5 : 0 }}
          />
        </Bubble>
        <Bubble
          themeStyle={theme.style}
          floating={isFloatingBar}
          onClick={() => props.onBubbleClick(Tabs.Info)}
          whileTap={{ scale: isFloatingBar ? 1.5 : 0 }}
        >
          <Icon
            themeStyle={theme.style}
            src={infoIcon}
            whileTap={{ scale: !isFloatingBar ? 1.5 : 0 }}
          />
        </Bubble>
      </NavigationBar>
    </Container>
  );
};
