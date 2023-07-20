import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { TabManager } from './views/TabManager';
import { Tabs, TabsEnum } from './model/Tabs';

export const routes: (RouteObject & { type: string })[] = [
  {
    path: '/articles/',
    type: Tabs.Articles,
    element: <TabManager startTab={Tabs.Articles} />,
  },
  {
    path: '/articles/read/:articleId',
    type: Tabs.ReadArticle,
    element: <TabManager startTab={Tabs.ReadArticle} />,
  },
  {
    path: '/articles/generate',
    type: Tabs.GenerateArticle,
    element: <TabManager startTab={Tabs.GenerateArticle} />,
  },
  {
    path: '/cv',
    type: Tabs.Cv,
    element: <TabManager startTab={Tabs.Cv} />,
  },
  {
    path: '/menu',
    type: Tabs.Menu,
    element: <TabManager startTab={Tabs.Menu} />,
  },
  {
    path: '/manga',
    type: Tabs.Mangas,
    element: <TabManager startTab={Tabs.Mangas} />,
  },
  {
    path: '/manga/chapters/:mangaId',
    type: Tabs.Chapters,
    element: <TabManager startTab={Tabs.Chapters} />,
  },
  {
    path: '/manga/chapters/read/:chapterId',
    type: Tabs.ReadChapter,
    element: <TabManager startTab={Tabs.ReadChapter} />,
  },
  {
    path: '*',
    type: Tabs.ProjectInfo,
    element: <TabManager startTab={Tabs.ProjectInfo} />,
  },
];

const getPath = (tab: TabsEnum): string => routes.find((route) => route.type === tab)?.path!;

export const getPathFromTab = (tab: TabsEnum): string =>
  getPath(tab) === '*' || !getPath(tab) ? '/' : getPath(tab);

export const getTabFromPath = (path: string): string =>
  routes.find((route) => path.startsWith(route.path!.split(':')[0]))!.type;
export const router = createBrowserRouter(routes);
