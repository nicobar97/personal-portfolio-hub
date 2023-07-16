import styled from 'styled-components';
import { HomeTab } from '../components/tabs/HomeTab';
import { InfoTab } from '../components/tabs/InfoTab';
import { ArticlesTab } from '../components/tabs/ArticlesTab';
import { Tabs, TabsEnum } from '../model/Tabs';
import { AnimateFadeIn } from '../components/animations/Animations';
import { MobileFrame } from '../components/MobileFrame';
import { NavigationBar } from '../components/NavigationBar';
import { ReadArticleTab } from '../components/tabs/ReadArticleTab';
import { useState } from 'react';
import { getPathFromTab } from '../router';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  margin-top: 3rem;
`;

type Props = {
  startTab: TabsEnum;
};

const changeTab = (setCurrentTab: (tab: TabsEnum) => void, tab: TabsEnum) => {
  window.history.pushState(null, '', getPathFromTab(tab));
  setCurrentTab(tab);
};

const openArticle = (
  articleId: string,
  setCurrentTab: (tab: TabsEnum) => void,
  setArticleId: (articleId: string) => void,
) => {
  setArticleId(articleId);
  setCurrentTab(Tabs.ReadArticle);
  window.history.pushState(null, '', `/articles/read/${articleId}`);
};

export const TabManager: React.FC<Props> = (props: Props) => {
  const [currentTab, setCurrentTab] = useState<TabsEnum>(props.startTab);
  const [articleId, setArticleId] = useState<string | undefined>(useParams().articleId);
  return (
    <>
      <Container>
        <MobileFrame>
          <NavigationBar changeTab={(tab: TabsEnum) => changeTab(setCurrentTab, tab)} />

          {currentTab === Tabs.Articles && (
            <AnimateFadeIn trigger={currentTab === Tabs.Articles}>
              <ArticlesTab
                openArticle={(articleId: string) =>
                  openArticle(articleId, setCurrentTab, setArticleId)
                }
              />
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
          {currentTab === Tabs.ReadArticle && articleId && (
            <AnimateFadeIn trigger={currentTab === Tabs.ReadArticle}>
              <ReadArticleTab articleId={articleId} />
            </AnimateFadeIn>
          )}
        </MobileFrame>
      </Container>
    </>
  );
};
