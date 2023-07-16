import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { TabManager } from './views/TabManager';
import { Tabs, TabsEnum } from './model/Tabs';

export const routes: (RouteObject & { type: string })[] = [
  {
    path: '/info',
    type: Tabs.Info,
    element: <TabManager startTab={Tabs.Info} />,
  },
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
    path: '/home',
    type: Tabs.Home,
    element: <TabManager startTab={Tabs.Home} />,
  },
  {
    path: '*',
    type: Tabs.Info,
    element: <TabManager startTab={Tabs.Info} />,
  },
];

const getPath = (tab: TabsEnum): string => routes.find((route) => route.type === tab)?.path!;

export const getPathFromTab = (tab: TabsEnum): string =>
  getPath(tab) === '*' || !getPath(tab) ? '/' : getPath(tab);

export const router = createBrowserRouter(routes);
