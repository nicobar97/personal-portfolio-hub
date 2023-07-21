import styled from 'styled-components';
import { ProjectInfoTab } from '../components/tabs/ProjectInfoTab';
import { CvTab } from '../components/tabs/CvTab';
import { ArticlesTab } from '../components/tabs/ArticlesTab';
import { Tabs, TabsEnum } from '../model/Tabs';
import { MobileFrame } from '../components/MobileFrame';
import { NavigationBar } from '../components/NavigationBar';
import { ReadArticleTab } from '../components/tabs/ReadArticleTab';
import {
  Navigate,
  NavigateFunction,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { GenerateArticle } from '../components/tabs/GenerateArticle';
import { MenuTab } from '../components/tabs/MenuTab';
import { MangaTab } from '../components/tabs/MangaTab';
import { ChaptersTab } from '../components/tabs/ChaptersTab';
import { ReadChapterTab } from '../components/tabs/ReadChapterTab';
import { ParamWrapper } from '../components/ParamsWrapper';
import { ErrorPopup } from '../components/errors/ErrorPopup';

const Container = styled.div`
  margin-top: 3rem;
`;

const changeTab = (navigate: NavigateFunction, tab: TabsEnum) => {
  navigate(getPathFromTab(tab));
};

const openArticle = (articleId: string, navigate: NavigateFunction) => {
  navigate(`/articles/read/${articleId}`);
};

const openManga = (mangaId: string, navigate: NavigateFunction) => {
  navigate(`/manga/chapters/${btoa(mangaId)}`);
};

const openChapter = (chapterId: string, navigate: NavigateFunction) => {
  navigate(`/manga/chapters/read/${btoa(chapterId)}`);
};

export const TabManager: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.articleId!);
  return (
    <>
      <Container>
        <MobileFrame>
          <NavigationBar changeTab={(tab: TabsEnum) => changeTab(navigate, tab)} />
          <Routes>
            <Route path="/cv" element={<CvTab />} />
            <Route
              path="/menu"
              element={<MenuTab changeTab={(tab: TabsEnum) => changeTab(navigate, tab)} />}
            />
            <Route
              path="/articles/"
              element={
                <ArticlesTab
                  changeTab={(tab: TabsEnum) => changeTab(navigate, tab)}
                  openArticle={(articleId: string) => openArticle(articleId, navigate)}
                />
              }
            />
            <Route
              path="/articles/read/:articleId"
              element={
                <ParamWrapper paramKey="articleId">
                  {(articleId) => <ReadArticleTab articleId={articleId} />}
                </ParamWrapper>
              }
            />
            <Route path="/articles/generate" element={<GenerateArticle />} />
            <Route path="/info" element={<ProjectInfoTab />} />
            <Route
              path="/manga"
              element={
                <MangaTab
                  openManga={(url: string) => openManga(url, navigate)}
                  changeTab={(tab: TabsEnum) => changeTab(navigate, tab)}
                />
              }
            />
            <Route
              path="/articles/read/:articleId"
              element={
                <ParamWrapper paramKey="articleId">
                  {(articleId) => <ReadArticleTab articleId={articleId} />}
                </ParamWrapper>
              }
            />
            <Route
              path="/manga/chapters/:mangaId"
              element={
                <ParamWrapper paramKey="mangaId">
                  {(mangaId) => (
                    <ChaptersTab
                      mangaId={mangaId}
                      openChapter={(url: string) => openChapter(url, navigate)}
                      changeTab={(tab: TabsEnum) => changeTab(navigate, tab)}
                    />
                  )}
                </ParamWrapper>
              }
            />
            <Route
              path="/manga/chapters/read/:chapterId"
              element={
                <ParamWrapper paramKey="chapterId">
                  {(chapterId) => <ReadChapterTab chapterId={chapterId} />}
                </ParamWrapper>
              }
            />
            <Route path="/" element={<Navigate to="/menu" />} />

            <Route
              path="*"
              element={<ErrorPopup title={'Page not found'} message={'this is not a valid url'} />}
            />
          </Routes>
        </MobileFrame>
      </Container>
    </>
  );
};

export const routes = [
  {
    path: '/articles/',
    type: Tabs.Articles,
  },
  {
    path: '/articles/read/:articleId',
    type: Tabs.ReadArticle,
  },
  {
    path: '/articles/generate',
    type: Tabs.GenerateArticle,
  },
  {
    path: '/cv',
    type: Tabs.Cv,
  },
  {
    path: '/menu',
    type: Tabs.Menu,
  },
  {
    path: '/manga',
    type: Tabs.Mangas,
  },
  {
    path: '/manga/chapters/:mangaId',
    type: Tabs.Chapters,
  },
  {
    path: '/manga/chapters/read/:chapterId',
    type: Tabs.ReadChapter,
  },
  {
    path: '/info',
    type: Tabs.ProjectInfo,
  },
  {
    path: '*',
    type: Tabs.ProjectInfo,
  },
];

const getPath = (tab: TabsEnum): string => routes.find((route) => route.type === tab)?.path!;

export const getPathFromTab = (tab: TabsEnum): string =>
  getPath(tab) === '*' || !getPath(tab) ? '/' : getPath(tab);

export const getTabFromPath = (path: string): string =>
  routes.find((route) => path.startsWith(route.path!.split(':')[0]))!.type;
