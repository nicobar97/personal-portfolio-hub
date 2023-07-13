import styled from 'styled-components';
import homeIcon from '../assets/icons/home.png';
import infoIcon from '../assets/icons/info.png';
import menuIcon from '../assets/icons/menu.png';
import { Tabs, TabsEnum } from '../model/Tabs';
import { motion } from 'framer-motion';
import { MobileFrame } from './MobileFrame';

const NavigationBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 2rem;
  margin-right: 2rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2rem;
  /* background-color: ${(props) => props.theme.colors.white}; */
  padding: 1rem;
  /* box-shadow: ${(props) =>
    props.theme.hexToRgbA(props.theme.colors.black, 0.1)} 0px 7px 20px 0px; */
`;

const Icon = styled(motion.img)`
  width: 1.5rem;
  margin: 0 5px;
`;

type Props = {
  onClick: (tab: TabsEnum) => void;
  setIsFloatingBar: (isFloatingTab: boolean) => void;
};

export const NavigationBar: React.FC<Props> = (props: Props) => (
  <Header key="footer">
    <MobileFrame>
      <NavigationBarContainer>
        <Icon src={homeIcon} onClick={() => props.onClick(Tabs.Home)} whileTap={{ scale: 2 }} />
        <Icon src={menuIcon} onClick={() => props.setIsFloatingBar(true)} whileTap={{ scale: 2 }} />
        <Icon src={infoIcon} onClick={() => props.onClick(Tabs.Info)} whileTap={{ scale: 2 }} />
      </NavigationBarContainer>
    </MobileFrame>
  </Header>
);
