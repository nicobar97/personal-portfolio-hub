import styled from 'styled-components';
import logoLight from '../../src/assets/images/logo_light.png';
import { MobileFrame } from '../components/MobileFrame';
import { NavigationBar } from '../components/NavigationBar';
import { useState } from 'react';
import { HomeTab } from '../components/tabs/HomeTab';
import { InfoTab } from '../components/tabs/InfoTab';
import { MenuTab } from '../components/tabs/MenuTab';
import { TabsEnum, Tabs } from '../model/Tabs';
import { AnimateFadeIn } from '../components/Animations';

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1.5rem;
  background-color: ${(props) => props.theme.colors.white};
  padding: 1rem;
  box-shadow: ${(props) => props.theme.hexToRgbA(props.theme.colors.black, 0.2)} 0px 7px 20px 0px;
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
  background-color: ${(props) => props.theme.colors.white};
  padding: 1rem;
  box-shadow: ${(props) => props.theme.hexToRgbA(props.theme.colors.black, 0.1)} 0px 7px 20px 0px;
`;

const Logo = styled.img`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 8rem;
`;

type Props = {
  currentTab: TabsEnum;
};

export const HomePage: React.FC<Props> = (props: Props) => {
  const [currentTab, setCurrentTab] = useState<TabsEnum>(props.currentTab);

  return (
    <>
      <AnimateFadeIn trigger={currentTab === Tabs.Menu}>
        <MenuTab />
      </AnimateFadeIn>

      <AnimateFadeIn trigger={currentTab === Tabs.Info}>
        <InfoTab />
      </AnimateFadeIn>

      <AnimateFadeIn trigger={currentTab === Tabs.Home}>
        <HomeTab />
      </AnimateFadeIn>

      <Header key="header">
        <Logo src={logoLight} />
      </Header>

      <Footer key="footer">
        <MobileFrame>
          <NavigationBar onClick={(tab: TabsEnum) => setCurrentTab(tab)} />
        </MobileFrame>
      </Footer>
    </>
  );
};
