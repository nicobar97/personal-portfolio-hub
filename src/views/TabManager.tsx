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
import { getPathFromTab, getTabFromPath } from '../router';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { GenerateArticle } from '../components/tabs/GenerateArticle';

const Container = styled.div`
  margin-top: 3rem;
`;

type Props = {
  startTab: TabsEnum;
};

const bindNavigateStateListener = (setCurrentTab: (tab: TabsEnum) => void) => {
  window.onpopstate = (event) => {
    console.log(event);
    setCurrentTab(getTabFromPath(window.location.pathname) as TabsEnum);
  };
};

const changeTab = (
  setCurrentTab: (tab: TabsEnum) => void,
  navigate: NavigateFunction,
  tab: TabsEnum,
) => {
  // window.history.replaceState(null, '', getPathFromTab(tab));
  setCurrentTab(tab);
  navigate(getPathFromTab(tab));
};

const openArticle = (
  articleId: string,
  setCurrentTab: (tab: TabsEnum) => void,
  setArticleId: (articleId: string) => void,
  navigate: NavigateFunction,
) => {
  navigate(`/articles/read/${articleId}`);
  setArticleId(articleId);
  setCurrentTab(Tabs.ReadArticle);
  // window.history.replaceState(null, '', `/articles/read/${articleId}`);
};

export const TabManager: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<TabsEnum>(props.startTab);
  const [articleId, setArticleId] = useState<string | undefined>(useParams().articleId);
  bindNavigateStateListener(setCurrentTab);
  return (
    <>
      <Container>
        <MobileFrame>
          <NavigationBar changeTab={(tab: TabsEnum) => changeTab(setCurrentTab, navigate, tab)} />
          {currentTab === Tabs.Articles && (
            <AnimateFadeIn trigger={currentTab === Tabs.Articles}>
              <ArticlesTab
                changeTab={(tab: TabsEnum) => changeTab(setCurrentTab, navigate, tab)}
                openArticle={(articleId: string) =>
                  openArticle(articleId, setCurrentTab, setArticleId, navigate)
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
          {currentTab === Tabs.GenerateArticle && (
            <AnimateFadeIn trigger={currentTab === Tabs.GenerateArticle}>
              <GenerateArticle />
            </AnimateFadeIn>
          )}
          {currentTab === Tabs.ReadArticle && articleId && (
            <AnimateFadeIn trigger={currentTab === Tabs.ReadArticle}>
              <ReadArticleTab articleId={articleId}/>
            </AnimateFadeIn>
          )}
        </MobileFrame>
      </Container>
    </>
  );
};
