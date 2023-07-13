import styled from 'styled-components';
import homeIcon from '../assets/icons/home.png';
import infoIcon from '../assets/icons/info.png';
import menuIcon from '../assets/icons/menu.png';
import { Tabs, TabsEnum } from '../model/Tabs';
import { motion } from 'framer-motion';

const NavigationBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 2rem;
  margin-right: 2rem;
`;

const Icon = styled(motion.img)`
  width: 1.5rem;
  margin: 0 5px;
`;

type Props = {
  onClick: (tab: TabsEnum) => void;
};

export const NavigationBar: React.FC<Props> = (props: Props) => (
  <NavigationBarContainer>
    <Icon src={homeIcon} onClick={() => props.onClick(Tabs.Home)} whileTap={{ scale: 1.5 }} />
    <Icon src={menuIcon} onClick={() => props.onClick(Tabs.Menu)} whileTap={{ scale: 1.5 }} />
    <Icon src={infoIcon} onClick={() => props.onClick(Tabs.Info)} whileTap={{ scale: 1.5 }} />
  </NavigationBarContainer>
);
