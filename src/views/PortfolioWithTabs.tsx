import styled from 'styled-components';
import { useState } from 'react';
import { HomeTab } from '../components/tabs/HomeTab';
import { InfoTab } from '../components/tabs/InfoTab';
import { MenuTab } from '../components/tabs/MenuTab';
import { TabsEnum, Tabs } from '../model/Tabs';
import { AnimateFadeIn } from '../components/Animations';
import { FancyNavbar } from '../components/FancyNavbar';
import { MobileFrame } from '../components/MobileFrame';
import { getPathFromTab } from '../router';

const Container = styled.div`
  margin-top: 3rem;
`;

type Props = {
  currentTab: TabsEnum;
};

// const Button = styled.button`
//   position: fixed;
//   right: 0;
//   bottom: 0;
//   margin: 2rem;
//   border: none;
//   padding: 1rem;
//   border-radius: 20px;
// `;

const changeTab = (setCurrentTab: (tab: TabsEnum) => void, tab: TabsEnum) => {
  window.history.replaceState(null, '', getPathFromTab(tab));
  setCurrentTab(tab);
};

export const PortfolioWithTabs: React.FC<Props> = (props: Props) => {
  const [currentTab, setCurrentTab] = useState<TabsEnum>(props.currentTab);
  return (
    <>
      <Container>
        <MobileFrame>
          <FancyNavbar onBubbleClick={(tab: TabsEnum) => changeTab(setCurrentTab, tab)} />

          {currentTab === Tabs.Menu && (
            <AnimateFadeIn trigger={currentTab === Tabs.Menu}>
              <MenuTab />
            </AnimateFadeIn>
          )}
          {currentTab === Tabs.Info && (
            <AnimateFadeIn trigger={currentTab === Tabs.Info}>
              <InfoTab />
            </AnimateFadeIn>
          )}
          {currentTab === Tabs.Home && (
            <AnimateFadeIn trigger={currentTab === Tabs.Home}>
              <HomeTab />
            </AnimateFadeIn>
          )}
          {/* <Button onClick={() => setIsFloatingBar(!isFloatingBar)}>Switch</Button> */}
        </MobileFrame>
      </Container>
    </>
  );
};