import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { PortfolioWithTabs } from './views/PortfolioWithTabs';
import { Tabs, TabsEnum } from './model/Tabs';

export const routes: (RouteObject & { type: string })[] = [
  {
    path: '/info',
    type: Tabs.Info,
    element: <PortfolioWithTabs currentTab={Tabs.Info} />,
  },
  {
    path: '/menu',
    type: Tabs.Menu,
    element: <PortfolioWithTabs currentTab={Tabs.Menu} />,
  },
  {
    path: '/article/:articleId',
    type: Tabs.Menu,
    element: <PortfolioWithTabs currentTab={Tabs.Menu} />,
  },
  {
    path: '/home',
    type: Tabs.Home,
    element: <PortfolioWithTabs currentTab={Tabs.Home} />,
  },
  {
    path: '*',
    type: Tabs.Info,
    element: <PortfolioWithTabs currentTab={Tabs.Info} />,
  },
];

const getPath = (tab: TabsEnum): string => routes.find((route) => route.type === tab)?.path!;

export const getPathFromTab = (tab: TabsEnum): string =>
  getPath(tab) === '*' || !getPath(tab) ? '/' : getPath(tab);

export const router = createBrowserRouter(routes);
