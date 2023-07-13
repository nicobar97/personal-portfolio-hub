import styled from 'styled-components';
import homeIcon from '../assets/icons/home.png';
import infoIcon from '../assets/icons/info.png';
import menuIcon from '../assets/icons/menu.png';

const NavigationBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 2rem;
  margin-right: 2rem;
`;

const Icon = styled.img`
  width: 1.8rem;
  margin: 0 5px;
`;

export const NavigationBar: React.FC = () => (
  <NavigationBarContainer>
    <Icon src={homeIcon} />
    <Icon src={menuIcon} />
    <Icon src={infoIcon} />
  </NavigationBarContainer>
);
