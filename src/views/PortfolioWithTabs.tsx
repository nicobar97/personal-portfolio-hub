import styled from 'styled-components';
import { HomeTab } from '../components/tabs/HomeTab';
import { InfoTab } from '../components/tabs/InfoTab';
import { MenuTab } from '../components/tabs/MenuTab';
import { TabsEnum, Tabs } from '../model/Tabs';
import { AnimateFadeIn } from '../components/animations/Animations';
import { MobileFrame } from '../components/MobileFrame';
import { useParams } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar';
import { ReadArticleTab } from '../components/tabs/ReadArticleTab';
import { ArticleTabState, useTabStore } from '../stores/useTabStore';

const Container = styled.div`
  margin-top: 3rem;
`;

type Props = {
  currentTab: TabsEnum;
};

export const PortfolioWithTabs: React.FC<Props> = () => {
  const params = useParams();
  const articleId = params.articleId;
  const tab = useTabStore()
  return (
    <>
      <Container>
        <MobileFrame>
          <NavigationBar />

          {tab.currentTab === Tabs.Menu && (
            <AnimateFadeIn trigger={tab.currentTab === Tabs.Menu}>
              <MenuTab articleId={articleId ?? null} />
            </AnimateFadeIn>
          )}
          {tab.currentTab === Tabs.Info && (
            <AnimateFadeIn trigger={tab.currentTab === Tabs.Info}>
              <InfoTab />
            </AnimateFadeIn>
          )}
          {tab.currentTab === Tabs.Home && (
            <AnimateFadeIn trigger={tab.currentTab === Tabs.Home}>
              <HomeTab />
            </AnimateFadeIn>
          )}
          {tab.currentTab === Tabs.ReadArticle && (
            <AnimateFadeIn trigger={tab.currentTab === Tabs.ReadArticle}>
              <ReadArticleTab articleId={(tab as ArticleTabState).props.articleId}></ReadArticleTab>
            </AnimateFadeIn>
          )}

          {/* <Button onClick={() => setIsFloatingBar(!isFloatingBar)}>Switch</Button> */}
        </MobileFrame>
      </Container>
    </>
  );
};
