import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './views/HomePage';

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
    element: <HomePage />,
  },
];

export const router = createBrowserRouter(routes);
