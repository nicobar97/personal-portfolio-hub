import styled from 'styled-components';
import homeIcon from '../assets/icons/home.png';
import infoIcon from '../assets/icons/info.png';
import menuIcon from '../assets/icons/menu.png';
import { Tabs, TabsEnum } from '../model/Tabs';
import { motion } from 'framer-motion';
import logoLight from '../../src/assets/images/logo_light.png';
import { useState } from 'react';

const NavigationBar = styled.div<{ floating: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  z-index: 1;
  transition: all 0.3s ease-in-out;

  ${(props) =>
    props.floating ? `justify-content: space-evenly;` : `justify-content: space-between;`};
`;

const Container = styled.div<{ floating: boolean }>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  transition: all 0.3s ease-in-out;

  ${(props) =>
    props.floating
      ? `padding: 2rem`
      : `background-color: ${props.theme.colors.white}; box-shadow: ${props.theme.hexToRgbA(
          props.theme.colors.black,
          0.1,
        )} 0px 7px 20px 0px;`}
`;

const Icon = styled(motion.img)`
  height: 1.5rem;
  margin: 0;
  /* filter: invert(100%); */
`;

const Logo = styled(motion.img)`
  margin: 0 auto;
  height: 1.5rem;
`;

const Bubble = styled(motion.div)<{ floating: boolean }>`
  z-index: 5;
  display: flex;
  flex-direction: column;
  height: 1.5rem;
  padding: 1.1rem;
  background-color: ${(props) => props.theme.colors.white};
  transition: all 0.3s ease-in-out;

  ${(props) =>
    props.floating
      ? `border-radius: 100px;  gap: 1rem; box-shadow: ${props.theme.hexToRgbA(
          props.theme.colors.black,
          0.2,
        )} 0px 7px 20px 0px;
`
      : ``}
`;

type Props = {
  onClick: (tab: TabsEnum) => void;
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
  const [isFloatingBar, setIsFloatingBar] = useState(false);

  setUpScrolling(scrollTriggerY, setIsFloatingBar);

  return (
    <Container floating={isFloatingBar}>
      <NavigationBar floating={isFloatingBar}>
        <Bubble
          floating={isFloatingBar}
          onClick={() => props.onClick(Tabs.Menu)}
          whileTap={{ scale: isFloatingBar ? 1.5 : 0 }}
        >
          <Icon src={menuIcon} whileTap={{ scale: !isFloatingBar ? 1.5 : 0 }} />
        </Bubble>
        <Bubble floating={isFloatingBar} whileTap={{ scale: isFloatingBar ? 1.5 : 0 }}>
          <Logo src={logoLight} whileTap={{ scale: !isFloatingBar ? 1.5 : 0 }} />
        </Bubble>
        <Bubble
          floating={isFloatingBar}
          onClick={() => props.onClick(Tabs.Info)}
          whileTap={{ scale: isFloatingBar ? 1.5 : 0 }}
        >
          <Icon src={infoIcon} whileTap={{ scale: !isFloatingBar ? 1.5 : 0 }} />
        </Bubble>
        <Bubble
          floating={isFloatingBar}
          onClick={() => props.onClick(Tabs.Home)}
          whileTap={{ scale: isFloatingBar ? 1.5 : 0 }}
        >
          <Icon src={homeIcon} whileTap={{ scale: !isFloatingBar ? 1.5 : 0 }} />
        </Bubble>
      </NavigationBar>
    </Container>
  );
};
