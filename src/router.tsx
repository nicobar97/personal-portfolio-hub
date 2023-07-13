import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './views/HomePage';
import { Tabs } from './model/Tabs';
import { MainPage } from './views/MainPage';

export const routes: RouteObject[] = [
  // {
  //   path: 'page/:helloId',
  //   element: <MainPage />,
  // },
  // {
  //   path: 'hello/:helloId',
  //   element: <HelloPage />,
  // },
  // {
  //   path: 'local/hello/:helloId',
  //   element: <LocalHelloPage />,
  // },
  {
    path: '*',
    element: <HomePage currentTab={Tabs.Home}/>,
  },
];

export const router = createBrowserRouter(routes);
