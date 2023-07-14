import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './views/HomePage';
import { Tabs } from './model/Tabs';

export const routes: RouteObject[] = [
  // {
  //   path: 'page/:helloId',
  //   element: <MainPage />,
  // },
  {
    path: '*',
    element: <HomePage currentTab={Tabs.Home} />,
  },
];

export const router = createBrowserRouter(routes);
