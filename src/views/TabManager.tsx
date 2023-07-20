import styled from 'styled-components';
import { ProjectInfoTab } from '../components/tabs/ProjectInfoTab';
import { CvTab } from '../components/tabs/CvTab';
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
import { MenuTab } from '../components/tabs/MenuTab';
import { MangaTab } from '../components/tabs/MangaTab';
import { SupportedProvider, SupportedProviders } from '../model/Manga';
import { ChaptersTab } from '../components/tabs/ChaptersTab';
import { ReadChapterTab } from '../components/tabs/ReadChapterTab';

const Container = styled.div`
  margin-top: 3rem;
`;

type Props = {
  startTab: TabsEnum;
};

const bindNavigateStateListener = (setCurrentTab: (tab: TabsEnum) => void) => {
  window.onpopstate = () => {
    setCurrentTab(getTabFromPath(window.location.pathname) as TabsEnum);
  };
};

const changeTab = (
  setCurrentTab: (tab: TabsEnum) => void,
  navigate: NavigateFunction,
  tab: TabsEnum,
) => {
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
};

const openManga = (
  mangaId: string,
  setCurrentTab: (tab: TabsEnum) => void,
  setManga: (mangaUrl: string) => void,
  navigate: NavigateFunction,
) => {
  navigate(`/manga/chapters/${btoa(mangaId)}`);
  setManga(btoa(mangaId));
  setCurrentTab(Tabs.Chapters);
};

const openChapter = (
  chapterId: string,
  setCurrentTab: (tab: TabsEnum) => void,
  setChapter: (chapterUrl: string) => void,
  navigate: NavigateFunction,
) => {
  navigate(`/manga/chapters/read/${btoa(chapterId)}`);
  setChapter(btoa(chapterId));
  setCurrentTab(Tabs.ReadChapter);
};

export const TabManager: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<TabsEnum>(props.startTab);
  const [articleId, setArticleId] = useState<string | undefined>(useParams().articleId);
  const [providerId] = useState<SupportedProvider | undefined>(
    SupportedProviders.TCBScans,
  );
  const [mangaUrl, setMangaUrl] = useState<string | undefined>(useParams().mangaId);
  const [chapterUrl, setChapterUrl] = useState<string | undefined>(useParams().chapterId);
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
          {currentTab === Tabs.Cv && (
            <AnimateFadeIn trigger={currentTab === Tabs.Cv}>
              <CvTab />
            </AnimateFadeIn>
          )}
          {currentTab === Tabs.ProjectInfo && (
            <AnimateFadeIn trigger={currentTab === Tabs.ProjectInfo}>
              <ProjectInfoTab />
            </AnimateFadeIn>
          )}
          {currentTab === Tabs.GenerateArticle && (
            <AnimateFadeIn trigger={currentTab === Tabs.GenerateArticle}>
              <GenerateArticle />
            </AnimateFadeIn>
          )}
          {currentTab === Tabs.ReadArticle && articleId && (
            <AnimateFadeIn trigger={currentTab === Tabs.ReadArticle}>
              <ReadArticleTab articleId={articleId} />
            </AnimateFadeIn>
          )}
          {currentTab === Tabs.Menu && (
            <AnimateFadeIn trigger={currentTab === Tabs.Menu}>
              <MenuTab changeTab={(tab: TabsEnum) => changeTab(setCurrentTab, navigate, tab)} />
            </AnimateFadeIn>
          )}

          {currentTab === Tabs.Mangas && providerId && (
            <AnimateFadeIn trigger={currentTab === Tabs.Mangas}>
              <MangaTab
                openManga={(url: string) => openManga(url, setCurrentTab, setMangaUrl, navigate)}
                changeTab={(tab: TabsEnum) => changeTab(setCurrentTab, navigate, tab)}
                provider={providerId}
              />
            </AnimateFadeIn>
          )}
          {currentTab === Tabs.Chapters && providerId && mangaUrl && (
            <AnimateFadeIn trigger={currentTab === Tabs.Chapters}>
              <ChaptersTab
                url={atob(mangaUrl)}
                provider={providerId}
                openChapter={(url: string) =>
                  openChapter(url, setCurrentTab, setChapterUrl, navigate)
                }
                changeTab={(tab: TabsEnum) => changeTab(setCurrentTab, navigate, tab)}
              />
            </AnimateFadeIn>
          )}
          {currentTab === Tabs.ReadChapter && providerId && chapterUrl && (
            <AnimateFadeIn trigger={currentTab === Tabs.ReadChapter}>
              <ReadChapterTab
                url={atob(chapterUrl)}
                provider={providerId}
                changeTab={(tab: TabsEnum) => changeTab(setCurrentTab, navigate, tab)}
              />
            </AnimateFadeIn>
          )}
        </MobileFrame>
      </Container>
    </>
  );
};
