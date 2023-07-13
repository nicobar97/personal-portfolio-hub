import styled from 'styled-components';
import homeIcon from '../assets/icons/home.png';
import infoIcon from '../assets/icons/info.png';
import menuIcon from '../assets/icons/menu.png';
import { Tabs, TabsEnum } from '../model/Tabs';
import { motion } from 'framer-motion';
import logoLight from '../../src/assets/images/logo_light.png';

const NavigationBarContainer = styled.div<{ floating: boolean }>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  z-index: 1;

  ${(props) =>
    props.floating
      ? `margin: 2rem auto;`
      : `background-color: ${
          props.theme.colors.white
        }; margin: 0 auto;box-shadow: ${props.theme.hexToRgbA(
          props.theme.colors.black,
          0.1,
        )} 0px 7px 20px 0px;
`};
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
  ${(props) =>
    props.floating
      ? `border-radius: 100px;  gap: 1rem; box-shadow: ${props.theme.hexToRgbA(
          props.theme.colors.black,
          0.2,
        )} 0px 7px 20px 0px;
`
      : ``} {
  }
`;

type Props = {
  onClick: (tab: TabsEnum) => void;
  isFloatingBar: boolean;
};

export const FancyNavbar: React.FC<Props> = (props: Props) => {
  return (
    <NavigationBarContainer floating={props.isFloatingBar}>
      <Bubble
        floating={props.isFloatingBar}
        onClick={() => props.onClick(Tabs.Menu)}
        whileTap={{ scale: props.isFloatingBar ? 1.5 : 0 }}
      >
        <Icon src={menuIcon} whileTap={{ scale: !props.isFloatingBar ? 1.5 : 0 }} />
      </Bubble>
      <Bubble floating={props.isFloatingBar} whileTap={{ scale: props.isFloatingBar ? 1.5 : 0 }}>
        <Logo src={logoLight} whileTap={{ scale: !props.isFloatingBar ? 1.5 : 0 }} />
      </Bubble>
      <Bubble
        floating={props.isFloatingBar}
        onClick={() => props.onClick(Tabs.Info)}
        whileTap={{ scale: props.isFloatingBar ? 1.5 : 0 }}
      >
        <Icon src={infoIcon} whileTap={{ scale: !props.isFloatingBar ? 1.5 : 0 }} />
      </Bubble>
      <Bubble
        floating={props.isFloatingBar}
        onClick={() => props.onClick(Tabs.Home)}
        whileTap={{ scale: props.isFloatingBar ? 1.5 : 0 }}
      >
        <Icon src={homeIcon} whileTap={{ scale: !props.isFloatingBar ? 1.5 : 0 }} />
      </Bubble>
    </NavigationBarContainer>
  );
};
