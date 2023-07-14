import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './views/HomePage';
import { Tabs, TabsEnum } from './model/Tabs';

export const routes: (RouteObject & { type: string })[] = [
  {
    path: '/info',
    type: Tabs.Info,
    element: <HomePage currentTab={Tabs.Info} />,
  },
  {
    path: '/menu',
    type: Tabs.Menu,
    element: <HomePage currentTab={Tabs.Menu} />,
  },
  {
    path: '/home',
    type: Tabs.Home,
    element: <HomePage currentTab={Tabs.Home} />,
  },
  {
    path: '*',
    type: Tabs.Info,
    element: <HomePage currentTab={Tabs.Info} />,
  },
];

const getPath = (tab: TabsEnum): string =>
  routes.find((route) => route.type === tab)?.path!;

export const getPathFromTab = (tab: TabsEnum): string => getPath(tab) === '*' || !getPath(tab) ? '/' : getPath(tab);

export const router = createBrowserRouter(routes);
